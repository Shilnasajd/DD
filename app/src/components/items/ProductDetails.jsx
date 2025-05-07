import React, { useState, useEffect } from "react";
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

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [multiDateMode, setMultiDateMode] = useState(false);
  const [dateRangeAvailability, setDateRangeAvailability] = useState({});

  const fetchSlots = async () => {
    const res = await axios.get("https://dd-3ecg.onrender.com/api/slots/");
    return res.data;
  };

  const {
    data: slots = [],
    isLoading: slotsLoading,
  } = useQuery({
    queryKey: ["slots"],
    queryFn: fetchSlots,
  });

  const fetchProductDetails = async (date, showSpinner = false) => {
    try {
      if (showSpinner) setModalLoading(true);
      setIsLoading(true);
      const res = await axios.get(
        `https://dd-3ecg.onrender.com/api/get_product/?product=${id}&date=${date}`
      );
      const prod = res.data[0];
      setProduct(prod);
      setIsOutOfStock(prod.available === "Out of stock");
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setProduct(null);
    } finally {
      setIsLoading(false);
      if (showSpinner) setModalLoading(false);
    }
  };

  const checkDateRangeAvailability = async (dates) => {
    try {
      setModalLoading(true);
      const availability = {};

      // Check each date in the range
      for (const date of dates) {
        const res = await axios.get(
          `https://dd-3ecg.onrender.com/api/get_product/?product=${id}&date=${date}`
        );
        const prod = res.data[0];
        availability[date] = prod.available !== "Out of stock";
      }

      setDateRangeAvailability(availability);
    } catch (error) {
      console.error("Error checking date range availability:", error);
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails(selectedDate);
    }
  }, [id]);

  const handleDateChange = (newDate) => {
    const formattedDate = newDate.format("YYYY-MM-DD");
    if (multiDateMode) {
      // For range selection
      if (selectedDates.length === 0 || selectedDates.length >= 2) {
        setSelectedDates([formattedDate]);
      } else {
        const [startDate] = selectedDates;
        const start = dayjs(startDate);
        const end = dayjs(formattedDate);

        if (end.isBefore(start)) {
          // If selected end date is before start date, swap them
          setSelectedDates([formattedDate, startDate]);
        } else {
          setSelectedDates([startDate, formattedDate]);
        }
      }
    } else {
      // For single date selection
      setSelectedDate(formattedDate);
      setSelectedSlot(null);
      fetchProductDetails(formattedDate, true);
    }
  };

  const handleConfirmBooking = () => {
    if (multiDateMode) {
      if (selectedDates.length < 2) {
        alert("Please select a date range (start and end date).");
        return;
      }
  
      // Check if any date in the range is out of stock
      const [start, end] = selectedDates;
      const startDate = dayjs(start);
      const endDate = dayjs(end);
      let currentDate = startDate;
      const allDates = [];
  
      while (currentDate.isBefore(endDate)) {
        allDates.push(currentDate.format("YYYY-MM-DD"));
        currentDate = currentDate.add(1, 'day');
      }
      allDates.push(endDate.format("YYYY-MM-DD"));
  
      const unavailableDates = allDates.filter(date => !dateRangeAvailability[date]);
  
      if (unavailableDates.length > 0) {
        alert(`Product is out of stock on: ${unavailableDates.join(", ")}`);
        return;
      }
  
      // Navigate and call API for multiple dates
      navigate("/checkout", {
        state: {
          product,
          selectedDates: allDates,
          isRangeBooking: true
        },
      });
    } else {
      if (selectedSlot) {
        // Call API for single date booking
        navigate("/checkout", {
          state: { product, selectedDate, selectedSlot },
        });
      }
    }
  };
    
  const handleCancel = () => {
    setSelectedDate(getTodayDate());
    setSelectedDates([]);
    setSelectedSlot(null);
    setIsOpen(false);
    setMultiDateMode(false);
    setDateRangeAvailability({});
  };

  const toggleDateMode = () => {
    setMultiDateMode(!multiDateMode);
    setSelectedDates([]);
    setSelectedSlot(null);
    setDateRangeAvailability({});
  };

  useEffect(() => {
    if (multiDateMode && selectedDates.length === 2) {
      const [start, end] = selectedDates;
      const startDate = dayjs(start);
      const endDate = dayjs(end);
      let currentDate = startDate;
      const allDates = [];

      while (currentDate.isBefore(endDate)) {
        allDates.push(currentDate.format("YYYY-MM-DD"));
        currentDate = currentDate.add(1, 'day');
      }
      allDates.push(endDate.format("YYYY-MM-DD"));

      checkDateRangeAvailability(allDates);
    }
  }, [selectedDates, multiDateMode]);

  if (isLoading && !modalLoading)
    return <div className="p-4">Loading product details...</div>;
  if (isError || !product)
    return <div className="p-4 text-red-500">Error loading product.</div>;

  const [priceOnly, duration] = product.price?.split(" ") || ["₹0.00", "0 min"];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="w-full">
          <img
            src={product.image?.trim()}
            alt={product.name}
            className="w-full h-96 object-contain rounded shadow"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-700 text-base">{product.short_description}</p>
          <p className="text-xl font-semibold">
            {priceOnly} | {duration}
          </p>
          <div className="flex gap-4">
            <button
              className="bg-black text-white px-6 py-2 rounded hover:opacity-90 transition cursor-pointer"
              onClick={() => {
                setIsOpen(true);
                setMultiDateMode(false);
              }}
            >
              Book
            </button>
            {/* <button
              className="bg-black text-white px-6 py-2 rounded hover:opacity-90 transition cursor-pointer"
              onClick={() => {
                setIsOpen(true);
                setMultiDateMode(true);
              }}
            >
              Book Date Range
            </button> */}
          </div>
          <div>
            <h2 className="font-semibold text-lg mt-4 mb-2">Description</h2>
            <p className="text-gray-600 whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 w-[80%]"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white max-w-5xl w-full rounded-2xl shadow-lg p-6 overflow-y-auto max-h-[90vh] relative">
            {/* Spinner Overlay */}
            {modalLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-[45%] space-y-4">
                <h2 className="text-xl font-normal">{product.name}</h2>

                {multiDateMode ? (
                  <>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-600" />
                      {selectedDates.length > 0 ? (
                        selectedDates.length === 1 ? (
                          <>
                            {format(new Date(selectedDates[0]), "PPP")} (Select end date)
                          </>
                        ) : (
                          <>
                            {format(new Date(selectedDates[0]), "PPP")} - {format(new Date(selectedDates[1]), "PPP")}
                          </>
                        )
                      ) : (
                        "Select start and end dates"
                      )}
                    </p>
                    {selectedDates.length === 2 && (
                      <div className="text-sm">
                        <p className="font-medium">Availability:</p>
                        <ul className="max-h-40 overflow-y-auto">
                          {Object.entries(dateRangeAvailability).map(([date, available]) => (
                            <li key={date} className="flex items-center">
                              <span className="w-24">{format(new Date(date), "MMM d")}:</span>
                              <span className={available ? "text-green-600" : "text-red-600"}>
                                {available ? "Available" : "Out of stock"}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-600" />
                      {format(new Date(selectedDate), "PPP")}
                    </p>
                    {selectedSlot ? (
                      <p className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-600" />
                        {selectedSlot.slot} ({duration} min)
                      </p>
                    ) : (
                      <p className="text-gray-500 italic">No slot selected</p>
                    )}
                    {isOutOfStock && (
                      <p className="text-red-600 text-sm">
                        Product is out of stock for this date
                      </p>
                    )}
                  </>
                )}

                <button
                  onClick={toggleDateMode}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {multiDateMode ? "Select single date" : "Select multiple dates"}
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6 w-full">
                {/* Left Date Picker */}
                <div
                  className="w-full md:w-1/2 p-4 bg-white rounded shadow ml-[-10px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                      displayStaticWrapperAs="desktop"
                      value={multiDateMode ? null : dayjs(selectedDate)}
                      onChange={handleDateChange}
                      minDate={dayjs()}
                      slots={{
                        actionBar: () => null,
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

                {/* Right Time Slots */}
                {(!multiDateMode || selectedDates.length === 2) && (
                  <div className="w-full md:w-1/3 space-y-4">
                    <h4 className="font-semibold text-gray-800">
                      {multiDateMode
                        ? "Select Time Slot"
                        : dayjs(selectedDate).format("dddd, MMM D")}
                    </h4>
                    <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-2">
                      {slots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => {
                            if (multiDateMode) {
                              // For range booking, just select the slot
                              setSelectedSlot(slot);
                            } else {
                              // For single date, check availability first
                              !isOutOfStock && setSelectedSlot(slot);
                            }
                          }}
                          className={`px-3 py-2 rounded-md text-sm font-medium border transition-colors duration-200 w-full ${selectedSlot?.id === slot.id
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                            } ${multiDateMode
                              ? ""
                              : isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          disabled={!multiDateMode && isOutOfStock}
                        >
                          {slot.slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
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
                {multiDateMode ? "Book Date Range" : "Book"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductDetails;