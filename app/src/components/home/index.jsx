import React from 'react';
import Header from '../header';
import Footer from '../footer';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

const HomePage = () => {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="relative h-[600px] w-full bg-black -mt-25">
        <img
          src="/imgs/photo-1673540617751-4bee7425a389.avif"
          alt="Camera Setup"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Capture the Moment with Top-Tier Gear</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Rent professional-grade cameras and equipment for your next big shoot.
          </p>
          <NavLink
            to="/rentals"
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-2 px-6 rounded-full ml-6 shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
          >
            Book Now
          </NavLink>
        </div>
      </div>

      {/* Introduction */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center ">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Bring Your Vision to Life</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          At DD Grade Films, we’re passionate about empowering storytellers like you.
          Whether you’re an indie filmmaker, photographer, or content creator,
          our professional-grade equipment and flexible rental options are designed
          to support your creative journey every step of the way.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose DD Grade Films?</h2>
          <div className="grid md:grid-cols-3 gap-10 ">
            {[
              {
                icon: "mdi:camera-iris",
                title: "Top-Tier Equipment",
                description: "Industry-leading gear for any level of production."
              },
              {
                icon: "mdi:truck-fast-outline",
                title: "Fast Delivery",
                description: "We offer doorstep delivery and pickup for your convenience."
              },
              {
                icon: "mdi:account-star-outline",
                title: "Trusted by Creators",
                description: "Backed by filmmakers, photographers, and creators across the country."
              }
            ].map((item, index) => (
              <div key={index} className="p-6 bg-amber-50 rounded-xl shadow">
                <Icon icon={item.icon} className="text-4xl text-amber-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
          {[
            { step: "1", title: "Browse Gear", icon: "mdi:camera-outline" },
            { step: "2", title: "Select Dates", icon: "mdi:calendar-check-outline" },
            { step: "3", title: "Pickup or Delivery", icon: "mdi:truck-outline" },
            { step: "4", title: "Shoot & Return", icon: "mdi:check-circle-outline" }
          ].map((item, i) => (
            <div key={i} className="p-6 border rounded-xl shadow-sm bg-amber-50">
              <Icon icon={item.icon} className="text-amber-600 text-4xl mb-4" />
              <h4 className="text-xl font-semibold">{item.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Collaborations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Short Film - “Eclipse”",
                description: "Used our RED Komodo camera kit with Zeiss CP.3 lenses.",
                image: "/imgs/Eclipse.png"
              },
              {
                title: "Ad Campaign - “Streetwear Vibes”",
                description: "Captured dynamic product shots with our Sony FX6 setup.",
                image: "/imgs/add.png"
              },
              {
                title: "Music Video - “Lost in Light”",
                description: "Filmed using our complete gimbal and lighting package.",
                image: "/imgs/1.avif"
              }
            ].map((project, index) => (
              <div key={index} className="bg-amber-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
                <img src={project.image} alt={project.title} className="w-full h-48 object-contain mt-8" />
                <div className="p-4">
                  <h4 className="font-bold text-lg mb-1">{project.title}</h4>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Reviews */}
      <section className="py-20 max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Wedding Junction.",
              text: "The gear was fantastic and the service even better. Made our shoot seamless!",
              img: "/imgs/wj.jpg"
            },
            {
              name: "Reelman Productions.",
              text: "Quick delivery, quality equipment, and reasonable pricing. Will book again!",
              img: "/imgs/rm.jpg"
            },
            {
              name: "Thirdeye Photography.",
              text: "Supportive team and top-tier rentals. We shot our indie short using their RED kit!",
              img: "/imgs/muneer.jpg"
            }
          ].map((review, index) => (
            <div key={index} className="bg-amber-50 p-6 shadow rounded-xl">
              <img
                src={review.img}
                alt={review.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-contain"
              />
              <p className="italic text-gray-700 mb-2">"{review.text}"</p>
              <h4 className="font-semibold">{review.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "Do you offer delivery and pickup?",
                answer: "Yes! We offer both delivery and pickup in select locations. Choose this option during checkout."
              },
              {
                question: "What ID or deposit is needed?",
                answer: "A valid government-issued ID and a refundable deposit may be required depending on the rental."
              },
              {
                question: "Can I rent for a single day?",
                answer: "Absolutely. We offer flexible durations — from one-day rentals to long-term bookings."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-amber-50 p-5 rounded-xl shadow">
                <h4 className="font-semibold text-lg">{faq.question}</h4>
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Let’s Make Your Vision a Reality</h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Start booking your camera equipment today. Professional service, fast delivery, and gear you can trust.
        </p>
        <NavLink
          to="/contact"
          className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-2 px-6 rounded-full ml-6 shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
        >
          Contact Us Now
        </NavLink>
      </section>
    </>
  );
};

export default HomePage;
