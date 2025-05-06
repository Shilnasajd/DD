import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { product, selectedDate, selectedSlot } = location.state || {};

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
    if (!selectedDate || !selectedSlot) {
      setError("Please select a date and time slot before booking.");
      return;
    }

    setSubmitting(true);
    setError("");

    console.log("Product from location:", product);
    const payload = {
      date: selectedDate,
      slot: selectedSlot?.id,
      product: product?.product_id,
      email: contactInfo.email,
      name: contactInfo.fullName,
      phone: contactInfo.phoneNumber,
      comment: contactInfo.comment,
    };
    console.log(payload)

    try {
      const resp = await fetch("https://dd-3ecg.onrender.com/api/bookings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(errData.message || "Booking failed");
      }

      const data = await resp.json();
      console.log("Booking success:", data);

      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!product) {
    return <div className="text-center text-lg text-red-600">Product information is missing.</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Product Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold text-gray-800">{`Pay ${product.name}`}</h1>
          <div className="space-y-3 text-gray-600">
            <div className="flex justify-between">
              <span>Price</span>
              <span>{product.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{product.price}</span>
            </div>
            <div className="flex justify-between font-semibold mt-6 text-gray-800">
              <span>Total due</span>
              <span>{product.price}</span>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Contact Information</h2>
          
          {error && <div className="text-sm text-red-600">{error}</div>}
          {success && <div className="text-sm text-green-600">Booking Successful! Redirecting...</div>}

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
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
                className={`bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {submitting ? (
                  <div className="spinner-border spinner-border-sm text-white" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Book Now"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Loader (when submitting) */}
      {submitting && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="text-white">Processing your booking...</div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
