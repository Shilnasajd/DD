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
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-24 shadow-xl rounded-2xl bg-white p-8 md:p-10 -mt-11 relative z-10">
          {/* Left Column - Address and Social Media */}
          <div className="flex flex-col justify-center">
            {/* Location */}
            <div className="flex items-start mb-8 group">
              <div className="bg-amber-100 p-3 rounded-full mr-4 flex-shrink-0 group-hover:bg-amber-200 transition-colors -mt-14">
                <Icon icon="mdi:map-marker" className="text-amber-600 text-xl" />
              </div>
              <div className='-mt-14'>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Our Studio</h3>
                <p className="text-gray-600 leading-relaxed">
                  DDGRADE FILMS
                  CHERPULASSERY<br />
                  Kerala, 679503
                </p>
                {/* <NavLink
                  to="#"
                  className="inline-block text-amber-600 font-medium mt-2 hover:underline hover:text-amber-700 transition-colors"
                >
                  Get Directions →
                </NavLink> */}
              </div>
            </div>

            {/* Social Media - Now with icon like other sections */}
            <div className="flex items-start mt-8 group">
              <div className="bg-amber-100 p-3 rounded-full mr-4 flex-shrink-0 group-hover:bg-amber-200 transition-colors">
                <Icon icon="mdi:share-variant" className="text-amber-600 text-xl" />
              </div>
              <div className='-mt-1'>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h3>
                <div className="flex space-x-3">
                  {[
                    { icon: 'mdi:instagram', label: 'Instagram' },
                    { icon: 'mdi:facebook', label: 'Facebook' },
                    { icon: 'mdi:linkedin', label: 'LinkedIn' },
                    { icon: 'mdi:twitter', label: 'Twitter' },
                    { icon: 'mdi:youtube', label: 'YouTube' }
                  ].map((social) => (
                    <a
                      key={social.icon}
                      href="#"
                      className="bg-gray-100 p-3 rounded-full hover:bg-amber-100 transition-colors group"
                      aria-label={social.label}
                    >
                      <Icon
                        icon={social.icon}
                        className="text-gray-700 text-xl group-hover:text-amber-600 transition-colors"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Phone and Email */}
          <div>
            {/* Phone */}
            <div className="flex items-start mb-8 group">
              <div className="bg-amber-100 p-3 rounded-full mr-4 flex-shrink-0 group-hover:bg-amber-200 transition-colors">
                <Icon icon="mdi:phone" className="text-amber-600 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Call Us</h3>
                <p className="text-gray-600 leading-relaxed">
                  Main: <a href="tel:3105551234" className="hover:text-amber-600 transition-colors">(310) 555-1234</a><br />
                  Support: <a href="tel:3105555678" className="hover:text-amber-600 transition-colors">(310) 555-5678</a>
                </p>
                <p className="text-sm text-gray-500 mt-2">Everyday: 9am-9pm PST</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start mb-8 group">
              <div className="bg-amber-100 p-3 rounded-full mr-4 flex-shrink-0 group-hover:bg-amber-200 transition-colors">
                <Icon icon="mdi:email" className="text-amber-600 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Email Us</h3>
                <p className="text-gray-600 leading-relaxed">
                  <a href="mailto:info@ddgradefilms.com" className="hover:text-amber-600 transition-colors">info@ddgradefilms.com</a><br />
                  <a href="mailto:support@ddgradefilms.com" className="hover:text-amber-600 transition-colors">support@ddgradefilms.com</a>
                </p>
                <p className="text-sm text-gray-500 mt-2">Typically respond within 24 hours</p>
              </div>
            </div>
          </div>
        </div>        {/* Map Section */}
        <div className="mb-24 rounded-2xl overflow-hidden shadow-xl">
          <div className="h-96 w-full bg-gray-200">
            {/* Replace with your actual map embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.4764463122027!2d76.3098127746913!3d10.876779557519736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85e9b86555555%3A0xaaa58e07d5b86555!2sCherpulassery%2C%20Kerala%20679603%2C%20India!5e0!3m2!1sen!2sin!4v1715944358765!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
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
            to=""
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