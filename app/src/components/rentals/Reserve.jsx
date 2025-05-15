import { Button, Grid } from "@mui/material";
import React from "react";

const Reserve = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0D1B2B", // same as homepage
        color: "#ffffff",
        mt: 6,
        py: 8,
        px: 2,
        textAlign: "center",
      }}
    >
      <h2
        className="text-5xl md:text-6xl font-bold mb-6"
        data-aos="fade-up"
        style={{ color: "#D4AF37" }} // gold accent
      >
        Reserve Your Equipment
      </h2>

      <p
        className="text-lg font-light max-w-xl mb-6"
        data-aos="fade-up"
        style={{ color: "#ffffffcc" }} // semi-white for readability
      >
        Book high-quality cameras and equipment easily online. Experience our
        expert service and exceptional results.
      </p>

      <Button
        type="submit"
        variant="contained"
        fullWidth={false}
        sx={{
          mt: 2,
          px: 5,
          py: 1.5,
          fontSize: "1rem",
          fontWeight: "bold",
          borderRadius: "30px",
          backgroundColor: "#D4AF37",
          color: "#0D1B2B",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#b9972d",
            color: "#fff",
          },
        }}
        data-aos="zoom-in"
      >
        Reserve Now
      </Button>
    </Grid>
  );
};

export default Reserve;
