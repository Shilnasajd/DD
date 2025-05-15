import React from 'react';
import Header from '../header';
import Footer from '../footer';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

const AboutUs = () => {
  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 -mt-10">Our Story</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Capturing moments that matter with the finest equipment in the industry.
          </p>
        </div>

        {/* About Content */}
        <div className="bg-[#fefefe] shadow-lg rounded-2xl p-10 max-w-7xl mx-auto mb-10">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <center>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 -mt-10">Who We Are</h2>
              </center>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded in 2015, DD Grade Films has grown from a small rental house to one of the most trusted names in professional camera equipment. Our passion for cinematography drives us to provide filmmakers with top-tier gear that helps bring their creative visions to life.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We pride ourselves on maintaining an extensive inventory of the latest cameras, lenses, and accessories, all meticulously maintained by our team of certified technicians.
              </p>
              <NavLink
                to="/rentals"
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 px-8 rounded-full inline-block shadow-md hover:shadow-lg transition-all duration-300"
              >
                Browse Our Gear
              </NavLink>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
              <img
                src="/imgs/4.avif"
                alt="Our studio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div><br /><br />

        {/* Team Section */}
        <div className="mb-24">
          <center><h2 className="text-3xl font-bold text-gray-900 mb-6 -mt-10">Meet the team</h2></center><br />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Morgan",
                role: "Founder & CEO",
                bio: "With over 15 years in the film industry, Alex ensures we stay at the cutting edge of cinematography technology.",
                img: "/imgs/users/ravi.png"
              },
              {
                name: "Sarah Chen",
                role: "Head Technician",
                bio: "Our equipment whisperer with a keen eye for detail and perfection in gear maintenance.",
                img: "/imgs/users/lena.jpg"
              },
              {
                name: "Jamal Wright",
                role: "Client Relations",
                bio: "Your go-to person for recommendations and ensuring you get exactly what you need for your project.",
                img: "/imgs/users/ravi.png"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-amber-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                  <div className="flex space-x-4 mt-4">
                    <a href="#" className="text-gray-500 hover:text-amber-600">
                      <Icon icon="mdi:linkedin" className="text-xl" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-blue-500">
                      <Icon icon="mdi:twitter" className="text-xl" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gray-50 rounded-2xl p-12 mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "mdi:quality-high",
                title: "Quality",
                description: "We maintain our equipment to the highest standards, ensuring reliability on every shoot."
              },
              {
                icon: "mdi:handshake",
                title: "Integrity",
                description: "Honest advice and transparent pricing - we treat your projects as our own."
              },
              {
                icon: "mdi:lightbulb-on",
                title: "Innovation",
                description: "Constantly updating our inventory with the latest technology in the industry."
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Icon icon={value.icon} className="text-amber-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Something Amazing?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're shooting a feature film, commercial, or passion project, we have the gear you need.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <NavLink
              to="/rentals"
              className="bg-amber-500 text-white font-semibold py-3 px-8 rounded-full inline-block shadow-md hover:bg-amber-600 transition-all duration-300"
            >
              Browse Equipment
            </NavLink>
            <NavLink
              to="/contact"
              className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full inline-block hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;