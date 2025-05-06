import { Button, Grid } from "@mui/material";
import React from "react";

const AboutUs = () => {
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
      data-aos="fade-up"
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
      >
        <h2 className="text-6xl font-semibold mb-4">About Us</h2>
        <p className="text-lg font-light text-left max-w-md">
          Expert camera rental services with over 10 years of experience in
          content production, based in Kerala.
        </p>
        <Button
          variant="text"
          sx={{
            color: "black",
            border: "1px solid black",
            borderRadius: "20px",
            maxWidth: "150px",
            mt: 2,
            px: 4,
            py: 1,
            borderColor: "black",
          }}
        >
          Explore
        </Button>
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
      >
        <img
          src="/imgs/1.avif"
          alt="About us"
          style={{
            width: "100%",
            maxWidth: "380px",
            height: "420px",
            borderRadius: "20px",
          }}
        />

        <img
          src="/imgs/2.avif"
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

export default AboutUs;
