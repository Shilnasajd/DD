import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/gallery");
  };

  // Handle clicks outside the search area to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Search API call with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        performSearch();
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const performSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://ddcameras.com/backend/api/products/search/?search=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      setSearchResults(data);
      setShowResults(data.length > 0);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const handleResultClick = (productId) => {
    // Get current date in YYYY-MM-DD format
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];

    // Navigate to product page with ID and current date
    navigate(`/${productId}`, {
      state: {
        apiUrl: `https://ddcameras.com/backend/api/get_product/?product=${productId}&date=${dateString}`
      }
    });

    setSearchQuery("");
    setShowResults(false);
    setMenuOpen(false);
  };

  const handleErr = (productId) => {
    // Get current date in YYYY-MM-DD format
    console.log("handle err working");

  };


  return (
    <>
      {/* Full Header */}
      <div className="w-full fixed top-0 left-0 z-50">
        {/* Top Notification Bar */}
        <div className="bg-gradient-to-r from-gray-900 to-black text-white flex items-center justify-center w-full h-10">
          <div className="flex items-center space-x-2">
            <span className="animate-pulse">✨</span>
            <h1 className="text-sm font-medium tracking-wider">
              EXCLUSIVE DISCOUNTS ON CAMERA RENTALS!
            </h1>
            <span className="animate-pulse">✨</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-amber-50 backdrop-blur-md w-full flex items-center justify-between px-4 md:px-16 h-24 border-b border-gray-100 shadow-sm">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer transition-transform hover:scale-105"
            onClick={() => navigate("/")}
          >
            <img
              src="/imgs/logo/1-removebg-preview.png"
              alt="Company Logo"
              className="h-20 w-20 sm:h-50 sm:w-50 object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8 text-gray-800 font-medium">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `transition-colors duration-300 ${isActive
                    ? "text-black font-semibold border-b-2 border-amber-500"
                    : "hover:text-amber-600"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/rentals"
                className={({ isActive }) =>
                  `transition-colors duration-300 ${isActive
                    ? "text-black font-semibold border-b-2 border-amber-500"
                    : "hover:text-amber-600"
                  }`
                }
              >
                Rental Store
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `transition-colors duration-300 ${isActive
                    ? "text-black font-semibold border-b-2 border-amber-500"
                    : "hover:text-amber-600"
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `transition-colors duration-300 ${isActive
                    ? "text-black font-semibold border-b-2 border-amber-500"
                    : "hover:text-amber-600"
                  }`
                }
              >
                Contact
              </NavLink>
            </div>

            {/* Social Icons and Search */}
            <div className="flex space-x-5 ml-8 border-l border-gray-200 pl-8">
              <a
                href="https://www.instagram.com/dd_grade/?hl=en"
                className="text-gray-500 hover:text-amber-600 transition-colors duration-300"
              >
                <Icon icon="mdi:instagram" className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
              >
                <Icon icon="mdi:facebook" className="text-xl" />
              </a>
              <div className="relative" ref={searchRef}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  className="pl-2 pr-8 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Icon
                  icon="mdi:magnify"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
                />
                {isLoading && (
                  <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                  </div>
                )}
                {showResults && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 flex items-center"
                        onClick={() => handleErr(product.id)}
                      >
                        <img
                          src={product.image.split("\n")[0]}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded mr-3"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {product.one_line}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Premium Button */}
            <button
              onClick={handleRedirect}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-2 px-6 rounded-full ml-6 shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
            >
              DD GRADE FILMS
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center space-x-6">
            {menuOpen ? (
              <Icon
                icon="mdi:close"
                onClick={() => setMenuOpen(false)}
                className="text-3xl cursor-pointer text-gray-700"
              />
            ) : (
              <Icon
                icon="mdi:menu"
                onClick={() => setMenuOpen(true)}
                className="text-3xl cursor-pointer text-gray-700"
              />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`bg-white/95 backdrop-blur-lg w-full flex flex-col items-center space-y-6 py-6 px-4 md:hidden origin-top transition-all duration-300 ease-in-out transform border-b border-gray-100 shadow-lg ${menuOpen
              ? "scale-y-100 opacity-100"
              : "scale-y-0 opacity-0 h-0 overflow-hidden"
            }`}
        >
          {/* Navigation Links */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg ${isActive
                ? "text-amber-600 font-semibold"
                : "text-gray-700 hover:text-amber-500"
              } transition-colors duration-300`
            }
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/rentals"
            className={({ isActive }) =>
              `text-lg ${isActive
                ? "text-amber-600 font-semibold"
                : "text-gray-700 hover:text-amber-500"
              } transition-colors duration-300`
            }
            onClick={() => setMenuOpen(false)}
          >
            Rental Store
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-lg ${isActive
                ? "text-amber-600 font-semibold"
                : "text-gray-700 hover:text-amber-500"
              } transition-colors duration-300`
            }
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-lg ${isActive
                ? "text-amber-600 font-semibold"
                : "text-gray-700 hover:text-amber-500"
              } transition-colors duration-300`
            }
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>

          <div className="flex space-x-6 pt-4">
            <a
              href="https://www.instagram.com/dd_grade/?hl=en"
              className="text-gray-500 hover:text-amber-600 transition-colors duration-300"
            >
              <Icon icon="mdi:instagram" className="text-2xl" />
            </a>

            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
            >
              <Icon icon="mdi:facebook" className="text-2xl" />
            </a>
            <div className="relative flex items-center" ref={searchRef}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                className="pl-2 pr-8 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-32 transition-all duration-300 hover:w-36"
              />
              <Icon
                icon="mdi:magnify"
                className="absolute right-2 text-gray-400 text-xl"
              />

              {isLoading && (
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                </div>
              )}
              {showResults && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 flex items-center"
                      onClick={() => handleResultClick(product.id)}
                    >
                      <img
                        src={product.image.split("\n")[0]}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.one_line}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 px-8 rounded-full mt-4 shadow-md hover:shadow-lg transition-all duration-300"
            onClick={handleRedirect}
          >
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