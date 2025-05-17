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
    <div className="p-6 max-w-5xl mx-auto bg-white  rounded-lg relative">
      <div
        className="flex items-center gap-2 mb-3 flex-row cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft /> Return to Home
      </div>

      <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Booking Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Booking Summary</h2>
                <p className="text-gray-500">Pay DD CAMERAS</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <h3 className="text-3xl font-bold text-gray-900">₹{total.toFixed(2)}</h3>
                  <span className="text-sm text-gray-500">Total</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">{product.name}</span>
                    <span className="font-medium">
                      ₹{priceValue.toFixed(2)}
                      {isRangeBooking && selectedDates?.length > 1 && (
                        <span className="text-gray-500 ml-1">× {selectedDates.length} days</span>
                      )}
                    </span>
                  </div>
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
                        className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Enter promo code"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-sm text-red-500 mt-1">{promoError}</p>
                    )}
                    {discountedAmount && (
                      <p className="text-sm text-green-600 mt-1">
                        Promo applied! Discount: ₹{discountedAmount}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between font-bold text-lg text-gray-900">
                    <span>Total due</span>
                    <span>₹{total.toFixed(2)}</span>
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