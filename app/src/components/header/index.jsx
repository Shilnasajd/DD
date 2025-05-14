import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { NavLink, useNavigate } from "react-router";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {/* Full Header */}
      <div className="w-full fixed top-0 left-0 z-30">
        {/* Top Notification */}
        <div className="bg-[#4D4D4D] text-white flex items-center justify-center w-full h-10">
          <h1 className="text-sm font-bold">
            EXCLUSIVE DISCOUNTS ON CAMERA RENTALS TODAY!
          </h1>
        </div>

        {/* Main Header */}
        <div className="bg-white w-full flex items-center justify-between px-4 md:px-16 h-24">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => { navigate("/") }}>
            <img
              src="/imgs/logo/1-removebg-preview.png"
              alt="Company Logo"
              style={{ height: "180px", width: "180px" }}
            // className="h-32 w-22 object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-black font-semibold">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? 'underline underline-offset-4' : ''} hover:underline focus:underline active:underline`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/rentals"
              className={({ isActive }) =>
                `${isActive ? 'underline underline-offset-4' : ''} hover:underline focus:underline active:underline`
              }
            >
              Rentals
            </NavLink>

            {/* Social Icons */}
            <div className="flex space-x-4 ml-4">
              <a href="#">
                <Icon icon="mdi:instagram" className="text-xl hover:text-gray-400" />
              </a>
              <a href="#">
                <Icon icon="mdi:facebook" className="text-xl hover:text-gray-400" />
              </a>
              <a href="#">
                <Icon icon="mdi:linkedin" className="text-xl hover:text-gray-400" />
              </a>
              <a href="#">
                <Icon icon="line-md:twitter-x" className="text-xl hover:text-gray-400" />
              </a>
            </div>

            {/* Shopping Bag */}
            <Icon icon="mdi:shopping-outline" className="ml-4 text-xl hover:text-gray-400" />

            {/* Button */}
            <button className="bg-black text-white font-semibold py-2 px-4 rounded ml-4">
              DD GRADE FILMS
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center space-x-4 text-black">
            <Icon
              icon="mdi:shopping-outline"
              className="text-2xl hover:text-gray-400"
            />
            {menuOpen ? (
              <Icon
                icon="mdi:close"
                onClick={() => setMenuOpen(false)}
                className="text-3xl cursor-pointer"
              />
            ) : (
              <Icon
                icon="mdi:menu"
                onClick={() => setMenuOpen(true)}
                className="text-3xl cursor-pointer"
              />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`bg-white text-black flex flex-col items-end space-y-4 py-4 px-4 md:hidden origin-top transition-all duration-300 ease-in-out transform ${menuOpen
              ? "scale-y-100 opacity-100"
              : "scale-y-0 opacity-0 pointer-events-none"
            }`}
        >
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${isActive ? 'underline underline-offset-4' : ''} hover:underline focus:underline active:underline`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/rentals"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${isActive ? 'underline underline-offset-4' : ''} hover:underline focus:underline active:underline`
            }
          >
            Rentals
          </NavLink>

          <div className="flex space-x-4">
            <a href="#">
              <Icon
                icon="mdi:instagram"
                className="text-xl hover:text-gray-400"
              />
            </a>
            <a href="#">
              <Icon
                icon="mdi:facebook"
                className="text-xl hover:text-gray-400"
              />
            </a>
            <a href="#">
              <Icon
                icon="mdi:linkedin"
                className="text-xl hover:text-gray-400"
              />
            </a>
            <a href="#">
              <Icon
                icon="line-md:twitter-x"
                className="text-xl hover:text-gray-400"
              />
            </a>
          </div>
          <button className="bg-black text-white font-semibold py-2 px-4 rounded">
            DD GRADE FILMS
          </button>
        </div>
      </div>

      {/* Push down the page content so header doesn't overlap */}
      <div className="h-[120px]"></div>
    </>
  );
};

export default Header;
