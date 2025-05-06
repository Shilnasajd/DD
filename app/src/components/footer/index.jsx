import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/X"; // X is Twitter now
import { Icon } from "@iconify/react";
import { Grid, Box, Typography } from "@mui/material";
import FooterEmailForm from "./FooterEmailForm";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#4D4D4D",
        color: "white",
        width: "100%",
        height: { xs: "auto", md: "18rem" }, 
        px: { xs: 4, md: 14 },
        py: 5,
      }}
     
    >
      <Grid
        container
        spacing={4}
        sx={{
          height: "100%", // Make Grid fill the parent Box height
        }}
      >
        {/* First Box - Always 50% */}
        <Grid
          item
          sm={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "100%",
            width:{md:200}
          }}
          
        >
          <Box >
            <Typography variant="h4" fontWeight="bold">
              Experience
            </Typography>
            <Typography variant="body1" mt={2} sx={{ maxWidth: 400 }}>
              Expert team delivering stunning content production results.
            </Typography>
            <Box mt={3} display="flex" gap={2} alignItems="center">
        <FacebookIcon sx={{ color: "white" }} />
        <InstagramIcon sx={{ color: "white" }} />
        <TwitterIcon sx={{ color: "white" }} />
        <Icon
                icon="ic:baseline-tiktok"
                className="text-3xl hover:text-gray-400"
              />
      </Box>

          </Box>
          <Typography variant="body1" mt={2}>
            © 2025. All rights reserved.
          </Typography>
        </Grid>

        {/* Second Box - 25% */}
        <Grid
          item
          sm={12}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            minHeight: "100%",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Rental
          </Typography>
          <Typography variant="body1" mt={2}>
            +91 9562156703
          </Typography>
          <Typography variant="body1" mt={0}>
            dronedude@ddcameras.com
          </Typography>
        </Grid>

        {/* Third Box - 25% */}
        <Grid
          item
          sm={12}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            minHeight: "100%",
            width:{md:300}
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Cameras
          </Typography>
          <Typography variant="body1" mt={2}>
            Enter your email address
          </Typography>
          <FooterEmailForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
