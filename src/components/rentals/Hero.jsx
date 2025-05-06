import { Button, Grid } from "@mui/material";
import React from "react";

const Hero = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "column" },
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#4D4D4D",
        color:"white",
        mt: 6,
        padding: 4,
      }}
    >
      {/* First Grid - 40% */}
    
        <h2 className="text-6xl font-semibold mb-4" data-aos="fade-up">Camera Rentals Made Easy</h2>
        <p className="text-lg font-light text-center max-w-md" data-aos="fade-up">
        Experience top-quality camera rentals with expert support for all your content production needs in Kerala.        </p>
      


      {/* Second Grid - 60% */}
  
    </Grid>
  );
};

export default Hero;
