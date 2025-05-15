import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

const Contact = () => {
  return (
        <>
      <Header />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 -mt-10">Get In Touch</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions about our equipment or services? We're here to help.
        </p>
      </div>

      {/* Contact Content */}
      <div className="grid md:grid-cols-2 gap-16 mb-24 shadow-xl rounded-2xl  ">
        {/* Contact Form */}
        <div className="bg-white p-8 md:p-10 -mt-11">
          <center><h2 className="text-2xl font-bold text-gray-900 mb-8">Send Us a Message</h2></center>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  placeholder="Your last name"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                placeholder="00 00 00 00 00"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <select
                id="subject"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              >
                <option value="">Select a subject</option>
                <option value="rental-inquiry">Equipment Rental Inquiry</option>
                <option value="technical-support">Technical Support</option>
                <option value="billing">Billing Question</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
          
          <div className="space-y-8">
            {/* Location */}
            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <Icon icon="mdi:map-marker" className="text-amber-600 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Our Studio</h3>
                <p className="text-gray-600">123 Film District Avenue<br />Los Angeles, CA 90028</p>
                <NavLink 
                  to="#" 
                  className="inline-block text-amber-600 font-medium mt-2 hover:underline"
                >
                  Get Directions
                </NavLink>
              </div>
            </div>
            
            {/* Phone */}
            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <Icon icon="mdi:phone" className="text-amber-600 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Call Us</h3>
                <p className="text-gray-600">Main: (310) 555-1234<br />Support: (310) 555-5678</p>
                <p className="text-sm text-gray-500 mt-2">Mon-Fri: 9am-6pm PST</p>
              </div>
            </div>
            
            {/* Email */}
            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <Icon icon="mdi:email" className="text-amber-600 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Email Us</h3>
                <p className="text-gray-600">info@ddgradefilms.com<br />support@ddgradefilms.com</p>
                <p className="text-sm text-gray-500 mt-2">Typically respond within 24 hours</p>
              </div>
            </div>
          </div>
          
          {/* Social Media */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-amber-100 transition-colors">
                <Icon icon="mdi:instagram" className="text-gray-700 text-xl hover:text-amber-600" />
              </a>
              <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-amber-100 transition-colors">
                <Icon icon="mdi:facebook" className="text-gray-700 text-xl hover:text-amber-600" />
              </a>
              <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-amber-100 transition-colors">
                <Icon icon="mdi:linkedin" className="text-gray-700 text-xl hover:text-amber-600" />
              </a>
              <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-amber-100 transition-colors">
                <Icon icon="mdi:twitter" className="text-gray-700 text-xl hover:text-amber-600" />
              </a>
              <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-amber-100 transition-colors">
                <Icon icon="mdi:youtube" className="text-gray-700 text-xl hover:text-amber-600" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mb-24 rounded-2xl overflow-hidden shadow-xl">
        <div className="h-96 w-full bg-gray-200">
          {/* Replace with your actual map embed */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.453895146942!2d-118.3268419243311!3d34.08388807314336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b8b6b6b6b6b7%3A0x6b6b6b6b6b6b6b6b!2s123%20Film%20District%20Ave%2C%20Los%20Angeles%2C%20CA%2090028!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="DD Grade Films Location"
          ></iframe>
        </div>
      </div>

      {/* FAQ CTA */}
      <div className="bg-gray-50 rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Looking for Quick Answers?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Check out our FAQ section for common questions about rentals, reservations, and equipment.
        </p>
        <NavLink 
          to="/faq" 
          className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 px-8 rounded-full inline-block shadow-md hover:shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
        >
          Visit FAQ Page
        </NavLink>
      </div>
    </div>
          <Footer />
    </>
  );
};

export default Contact;