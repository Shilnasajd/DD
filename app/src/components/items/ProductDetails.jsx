import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Dialog } from "@headlessui/react";
import { format } from "date-fns";
import dayjs from 'dayjs';
import { StaticDatePicker } from "@mui/x-date-pickers";

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const generateSlots = () => {
  const slots = [];
  for (let hour = 0; hour <= 22; hour++) {
    const start = new Date();
    start.setHours(hour, 0);
    const end = new Date();
    end.setHours(hour + 1, 0);
    slots.push({
      start: format(start, "h:mm a"),
      end: format(end, "h:mm a"),
    });
  }
  return slots;
};

const ProductDetails = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [selectedSlot, setSelectedSlot] = useState(null);

  const fetchProductDetails = async () => {
    const res = await axios.get(
      `https://dd-3ecg.onrender.com/api/get_product/?product=${id}&date=${selectedDate}`
    );
    return res.data[0];
  };

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productDetails", id, selectedDate],
    queryFn: fetchProductDetails,
    enabled: !!id,
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError || !product)
    return <div className="p-4 text-red-500">Error loading product.</div>;

  const [priceOnly, duration] = product.price?.split(" ") || ["₹0.00", "0 min"];
  const slots = generateSlots();

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Image */}
        <div className="w-full">
          <img
            src={product.image?.trim()}
            alt={product.name}
            className="w-full h-96 object-contain rounded shadow"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-700 text-base">{product.short_description}</p>
          <p className="text-xl font-semibold">
            {priceOnly} | {duration}
          </p>
          <button
            className="bg-black text-white px-6 py-2 rounded hover:opacity-90 transition cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            Book Now
          </button>
          <div>
            <h2 className="font-semibold text-lg mt-4 mb-2">Description</h2>
            <p className="text-gray-600 whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Book Now Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white max-w-4xl w-full rounded shadow-lg p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex flex-col md:flex-row gap-6">
 
              <div className="md:w-1/3 space-y-4">
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {format(new Date(selectedDate), "PPP")}
                </p>
                {selectedSlot ? (
                  <p>
                    <span className="font-semibold">Slot:</span>{" "}
                    {selectedSlot.start} - {selectedSlot.end} ({duration} min)
                  </p>
                ) : (
                  <p className="text-gray-500 italic">No slot selected</p>
                )}
              </div>

   
              <div className="flex flex-col md:flex-row gap-4">
  {/* Left: Date Picker */}
  <div className="md:w-1/2">
    <StaticDatePicker
      defaultValue={dayjs('2022-04-17')}
      onChange={(e) => {
        setSelectedDate(e.target.value);
        setSelectedSlot(null);
      }}
    />
  </div>

  {/* Right: Time Slots */}
  <div className="md:w-1/2 space-y-4">
    <h4 className="font-semibold">
      {selectedDate ? dayjs(selectedDate).format("dddd, MMM D") : "Select a date"}
    </h4>
    <div className=" gap-2 max-h-[300px] overflow-y-auto pr-2">
      {slots.map((slot, index) => (
        <button
          key={index}
          onClick={() => setSelectedSlot(slot)}
          className={`px-3 py-2 border rounded text-sm w-full ${
            selectedSlot?.start === slot.start
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {slot.start}
        </button>
      ))}
    </div>
  </div>
</div>

            </div>

 
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductDetails;
