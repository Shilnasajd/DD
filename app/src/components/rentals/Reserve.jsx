import { Button, Grid } from "@mui/material";
import React from "react";

const Reserve = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "column" },
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0D1B2B",
        color: "white",
        mt: 6,
        padding: 4,
      }}
    >
      {/* First Grid - 40% */}

      <h2 className="text-6xl font-semibold mb-4" data-aos="fade-up">Reserve Your Equipment</h2>
      <p className="text-lg font-light text-center max-w-md" data-aos="fade-up">
        Book high-quality cameras and equipment easily online. Experience our
        expert service and exceptional results.{" "}
      </p>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mt: 2,
          borderRadius: "20px",
        //   backgroundColor: "#000",
          width: "300px",
        //   color: "#fff",
          "&:hover": {
            backgroundColor: "#f0f0f0",
            color: "#000",
          },
        }}
        data-aos="zoom-in"  
      >
        Reserve
      </Button>

      {/* Second Grid - 60% */}
    </Grid>
  );
};

export default Reserve;
