import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Home from '../../components/home';
import { Button } from '@mui/material';
import CameraRentals from './CameraRentals';
import AboutUs from './AboutUs';
import GetinTouch from './GetinTouch';
import AddOn from './AddOn';

const HomePage = () => {
  return (
    <>
      {/* <Header /> */}

      {/* Home section */}
      <div className="relative w-full">
        {/* Background Image (fixed position) */}
        <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
          <img
            src="https://photofocus.com/wp-content/uploads/2014/10/hold-camera.jpg"
            alt="camera"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Foreground content */}
        <div className="relative z-10 h-screen flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4"  data-aos="fade-up">
            Camera Rentals in Kerala
          </h1>
          <p className="text-xl md:text-2xl mb-6" data-aos="fade-up">
            Expert Content Production & Equipment Rental Services
          </p>
          <div className="flex gap-4" data-aos="fade-up">
            <Button
              variant="outlined"
              sx={{
                color: "black",
                backgroundColor: "white",
                borderRadius: "20px",
                padding:1,
                paddingX: 4,
                width: "150px",
                borderColor: "white",
             
              }}
            >
              Rent
            </Button>
            <Button
              variant="text"
              sx={{
                color: "white",
                border: "1px solid white",
                borderRadius: "20px",
                width: "150px",
                padding:1,
                paddingX: 4,
                borderColor: "white",
              
              }}
            >
              Explore
            </Button>
          </div>
        </div>

        {/* White section that scrolls over image */}
        <div className="relative z-20 bg-white text-black w-full p-10" >
        <CameraRentals/>
        </div>
      
        <div className="relative z-20 bg-white text-black w-full p-10">
        <AddOn/>
        </div>
        <div className="relative z-20 bg-white text-black w-full p-10">
        <AboutUs/>
        </div>
        <div className="relative z-20 bg-white text-black w-full pt-1 ">
          <GetinTouch/>
          </div>
        
      
         
          {/* Push content to force footer into view */}
  
   
      </div>

 
    </>
  );
};

export default HomePage;
