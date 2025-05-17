import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import TermsAndConditionsModel from './TermsAndConditionsModel';

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
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(null);


  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const isFormComplete = () => {
    return (
      contactInfo.email &&
      contactInfo.fullName &&
      contactInfo.phoneNumber &&
      contactInfo.country
    );
  };

  const priceValue = parseFloat(product.price.split(" ")[0].replace(/[^0-9.]/g, ''));
  // Calculate price based on booking type
  const calculatePrice = () => {
    const priceValue = parseFloat(product.price.split(" ")[0].replace(/[^0-9.]/g, ''));

    let finalPrice = priceValue;

    if (isRangeBooking && selectedDates?.length) {
      finalPrice = priceValue * selectedDates.length;
    }

    // Subtract the promo discount from the total
    const discountedPrice = finalPrice - discountedAmount;

    return discountedPrice > 0 ? discountedPrice : 0; // Ensure price doesn't go below zero
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    try {
      const response = await axios.get(`https://ddcameras.com/backend/api/get_promo_amount/?code=${promoCode}`);

      if (response.data?.amount && response.data?.is_valid === true) {
        const promoAmount = parseFloat(response.data.amount);
        setDiscountedAmount(promoAmount);
        setPromoError("");
      } else {
        setPromoError("Promo code expired.");
      }
    } catch (error) {
      console.error("Promo code validation error:", error);
      setPromoError("Failed to validate promo code.");
    }
  };

  const handleSubmit = async () => {
    const isRange = isRangeBooking;
    const totalDue = calculatePrice();

    const payload = {
      product: product?.product_id,
      email: contactInfo.email,
      name: contactInfo.fullName,
      phone: contactInfo.phoneNumber,
      comment: contactInfo.comment,
      price: totalDue,
      ...(isRange
        ? { dates: selectedDates }
        : {
          date: dayjs(selectedDate).format("YYYY-MM-DD"),
          slot: selectedSlot?.id,
        }),
    };

    const apiEndpoint = isRange
      ? "https://ddcameras.com/backend/api/book_multiple_dates/"
      : "https://ddcameras.com/backend/api/bookings/";

    try {
      setSubmitting(true);
      const response = await axios.post(apiEndpoint, payload);

      if (response.status === 201) {
        console.log("Booking response:", response.data);
        setSuccess(true);
        setError("");
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

  const handleTermsAccepted = () => {
    setTermsAccepted(true);
    setShowTermsModal(false);
  };

  if (!product) {
    return <div className="text-center text-lg text-red-600">Product information is missing.</div>;
  }

  const subtotal = calculatePrice();
  const total = subtotal;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg relative">
      <div
        className="flex items-center gap-2 mb-3 flex-row cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} /> Return to Home
      </div>

      <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Left: Booking Summary */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="space-y-8">
              <div className="pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Summary</h2>
                <p className="text-gray-500 text-sm">Review your order details</p>
              </div>

              <div className="space-y-6">
                {/* Product Card */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-xs">
                  <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <div className="mt-1 text-sm text-gray-500">
                      {isRangeBooking ? (
                        <span>{selectedDates.length} day{selectedDates.length > 1 ? 's' : ''}</span>
                      ) : (
                        <span>{dayjs(selectedDate).format('MMM D, YYYY')} • {selectedSlot?.time}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      ₹{priceValue.toFixed(2)}
                      {isRangeBooking && selectedDates?.length > 1 && (
                        <span className="text-gray-500 text-xs ml-1"></span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3">


                  {isRangeBooking ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Dates</span>
                        <span className="font-medium text-right">
                          {selectedDates.map((date, index) => (
                            <div key={index}>
                              {dayjs(date).format('MMM D, YYYY')}
                            </div>
                          ))}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm border-t border-gray-100 pt-2">
                        <span className="text-gray-600">Total Days</span>
                        <span className="font-medium">{selectedDates.length} days</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium">
                        {dayjs(selectedDate).format('MMM D, YYYY')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ₹{(priceValue * selectedDates.length).toFixed(2)} ({priceValue.toFixed(2)} × {selectedDates.length})
                    </span>

                  </div>
                  {discountedAmount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600 font-medium">-₹{discountedAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Promo Code Section */}
                <div className="pt-4">
                  <div className="space-y-3">
                    <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="promoCode"
                        name="promoCode"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                        placeholder="Enter promo code"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm font-medium"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-xs text-red-500 mt-1">{promoError}</p>
                    )}
                  </div>
                </div>

                {/* Total Section */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700 font-medium">Total</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">₹{total.toFixed(2)}</div>
                      <div className="text-xs text-gray-500 mt-1">including all taxes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="p-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm">
                  Booking Successful! Redirecting to rentals...
                </div>
              )}

              <form className="space-y-5" onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      value={contactInfo.email}
                      onChange={handleContactInfoChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      value={contactInfo.fullName}
                      onChange={handleContactInfoChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        value={contactInfo.phoneNumber}
                        onChange={handleContactInfoChange}
                        placeholder="+91 9876543210"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      rows={3}
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      value={contactInfo.comment}
                      onChange={handleContactInfoChange}
                      placeholder="Special requests or instructions"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  {!termsAccepted ? (
                    <button
                      type="button"
                      className={`w-full bg-amber-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-amber-600 transition-all duration-300 ${!isFormComplete() ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"
                        }`}
                      onClick={() => isFormComplete() && setShowTermsModal(true)}
                      disabled={!isFormComplete()}
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`w-full bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-all ${submitting ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"
                        }`}
                    >
                      {submitting ? (
                        <span className="flex items-center justify-center gap-2">
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
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing Booking...
                        </span>
                      ) : (
                        "Confirm Booking"
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Terms and Conditions Modal */}
      <TermsAndConditionsModel
        open={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        email={contactInfo.email}
        onAccept={handleTermsAccepted}
      />

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