import { Button, Grid } from "@mui/material";
import React from "react";

const AddOn = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "center",
        mt: 6,
      }}
    >
      {/* First Grid - 40% */}
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
        data-aos="fade-up"
      >
        <h2 className="text-6xl font-semibold mb-4">Your Trusted Camera <br /> Rental Partner</h2>
        <p className="text-lg font-light text-left max-w-md">
        With over a decade of experience, we specialize in content production and camera rentals, ensuring exceptional results for all your photography and videography needs in Kerala.
        </p>
      
      </Grid>

      {/* Second Grid - 60% */}
      <Grid
        item
        xs={12}
        md={7}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
        data-aos="fade-up"  
      >
        <img
          src="/imgs/4.avif"
          alt="About us"
          style={{
            width: "100%",
            maxWidth: "380px",
            height: "420px",
            borderRadius: "20px",
          }}
        />

       
      </Grid>
    </Grid>
  );
};

export default AddOn;
