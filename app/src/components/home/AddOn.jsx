import React from "react";
import { Button, Grid, Typography, Box } from "@mui/material";

const AddOn = () => {
  return (
    <Grid
      container
      spacing={4}
      sx={{
        mt: 8,
        px: { xs: 2, md: 6 },
        justifyContent: "center",
        alignItems: "center",
        minHeight: { md: "420px" },
      }}
    >
      {/* Left Section: Text */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          textAlign: { xs: "center", md: "left" },
        }}
        data-aos="fade-up"
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 3,
            lineHeight: 1.1,
            color: "primary.main",
            letterSpacing: 1,
          }}
        >
          Your Trusted Camera <br /> Rental Partner
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontWeight: 400, maxWidth: 520, mx: { xs: "auto", md: "unset" } }}
        >
          With over a decade of experience, we specialize in content production
          and camera rentals, ensuring exceptional results for all your
          photography and videography needs in Kerala.
        </Typography>
      </Grid>

      {/* Right Section: Image */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: { xs: 4, md: 0 },
        }}
        data-aos="fade-up"
      >
        <Box
          component="img"
          src="/imgs/4.avif"
          alt="About us"
          sx={{
            width: "100%",
            maxWidth: 380,
            height: 420,
            borderRadius: 4,
            boxShadow: 6,
            objectFit: "cover",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default AddOn;
