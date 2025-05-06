import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { Dialog } from "@headlessui/react";
import { format } from "date-fns";
import dayjs from "dayjs";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Calendar, Clock } from "lucide-react";

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
  const navigate = useNavigate();
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
    queryKey: ["productDetails", id],
    queryFn: fetchProductDetails,
    enabled: !!id,
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError || !product)
    return <div className="p-4 text-red-500">Error loading product.</div>;

  const [priceOnly, duration] = product.price?.split(" ") || ["₹0.00", "0 min"];
  const slots = generateSlots();

  const handleConfirmBooking = () => {
    if (selectedSlot) {
      navigate("/checkout", {
        state: { product, selectedDate, selectedSlot },
      });
    } else {
      alert("Please select a slot.");
    }
  };
  const handleCancel = () => {
    // Logic to reset the selection if needed
    setSelectedDate(getTodayDate());
    setSelectedSlot(null);
    setIsOpen(false);
  };

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
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 w-[80%]"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white max-w-5xl w-full rounded-2xl shadow-lg p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-[45%] space-y-4">
                <h2 className="text-xl font-normal">{product.name}</h2>
                <p className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  {format(new Date(selectedDate), "PPP")}
                </p>
                {selectedSlot ? (
                  <p className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    {selectedSlot.start} - {selectedSlot.end} ({duration} min)
                  </p>
                ) : (
                  <p className="text-gray-500 italic">No slot selected</p>
                )}
              </div>

              {/* Left: Date Picker & Right: Time Slots */}
              <div className="flex flex-col md:flex-row gap-6 w-full">
                {/* Left: Date Picker */}
                <div
                  className="w-full md:w-1/2 p-4 bg-white rounded shadow ml-[-10px]"
                  onClick={(e) => e.stopPropagation()} // Prevent click propagation to the Dialog
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                      displayStaticWrapperAs="desktop"
                      value={dayjs(selectedDate)}
                      onChange={(newValue) => {
                        setSelectedDate(newValue);
                        setSelectedSlot(null); // Reset selected slot when a new date is picked
                      }}
                      slots={{
                        actionBar: () => null, // Hides the OK/Cancel buttons
                      }}
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          sx: { display: "none" },
                        },
                      }}
                      sx={{
                        width: "100%",
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: 0,
                        "& .MuiPickersDay-root": {
                          fontWeight: "bold",
                        },
                        "& .Mui-selected": {
                          backgroundColor: "#000",
                          color: "#fff",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>

                {/* Right: Time Slots */}
                <div className="w-full md:w-1/3 space-y-4">
                  <h4 className="font-semibold text-gray-800">
                    {selectedDate
                      ? dayjs(selectedDate).format("dddd, MMM D")
                      : "Select a date"}
                  </h4>
                  <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-2">
                    {slots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-3 py-2 rounded-md text-sm font-medium border transition-colors duration-200 w-full ${
                          selectedSlot?.start === slot.start
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {slot.start}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-4 py-2 bg-black text-white rounded hover:opacity-90 transition"
              >
                Book
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductDetails;
