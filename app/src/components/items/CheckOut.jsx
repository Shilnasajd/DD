import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { product, selectedDates, selectedDate, selectedSlot, isRangeBooking } = location.state || {};

  const [contactInfo, setContactInfo] = useState({
    email: "",
    fullName: "",
    country: "India",
    phoneNumber: "",
    comment: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const isRange = isRangeBooking;

    const payload = {
      product: product?.product_id,
      email: contactInfo.email,
      name: contactInfo.fullName,
      phone: contactInfo.phoneNumber,
      comment: contactInfo.comment,
      ...(isRange
        ? { dates: selectedDates }
        : {
            date: dayjs(selectedDate).format("YYYY-MM-DD"),
            slot: selectedSlot?.id,
          }),
    };

    const apiEndpoint = isRange
      ? "https://dd-3ecg.onrender.com/api/book_multiple_dates/"
      : "https://dd-3ecg.onrender.com/api/bookings/";

    try {
      setSubmitting(true);
      const response = await axios.post(apiEndpoint, payload);

      if (response.status === 201) {
        console.log("Booking response:", response.data);
        setSuccess(true);   // ✅ Show success message
        setError("");       // ✅ Clear errors
        console.log("Booking successful:", response.data);
        setTimeout(() => {
          navigate("/rentals");
          console.log("Redirecting to rentals...");
        }, 3000);
      }
    } catch (err) {
      console.error("Error submitting booking:", err);
      setError("An error occurred while processing your booking.");
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  if (!product) {
    return <div className="text-center text-lg text-red-600">Product information is missing.</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg relative">
      <div
        className="flex items-center gap-2 mb-3 flex-row cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft /> Return to Home
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Product Details */}
        <div className="space-y-6">
          <div className="space-y-3 text-gray-600">
            <p className="text-xl font-semibold text-gray-800">{`Pay DD CAMERAS`}</p>
            <h1 className="text-3xl font-semibold text-gray-800">{product.price.split(" ")[0]}</h1>
            <div className="flex justify-between">
              <span>{product.name}</span>
              <span>{product.price.split(" ")[0]}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{product.price.split(" ")[0]}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold mt-6 text-gray-800">
              <span>Total due</span>
              <span>{product.price.split(" ")[0]}</span>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Contact Information</h2>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {success && (
            <div className="text-sm text-green-600">
              Booking Successful! Redirecting to rentals...
            </div>
          )}

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div>
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                value={contactInfo.email}
                onChange={handleContactInfoChange}
                placeholder="Your email"
                required
              />
            </div>

            <div>
              <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                value={contactInfo.fullName}
                onChange={handleContactInfoChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-gray-700">Country</label>
              <select
                id="country"
                name="country"
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                value={contactInfo.country}
                onChange={handleContactInfoChange}
              >
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
                <option>Canada</option>
              </select>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                value={contactInfo.phoneNumber}
                onChange={handleContactInfoChange}
                placeholder="Your phone number"
                required
              />
            </div>

            <div>
              <label htmlFor="comment" className="block text-gray-700">Your Comment</label>
              <textarea
                id="comment"
                name="comment"
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                value={contactInfo.comment}
                onChange={handleContactInfoChange}
                placeholder="Any additional comment"
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={submitting}
                className={`bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Booking...
                  </span>
                ) : (
                  "Book Now"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Fullscreen Loader Overlay */}
      {submitting && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="text-white text-lg font-semibold">Processing your booking...</div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
