import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/X"; // Twitter icon
import { Icon } from "@iconify/react";
import { Grid, Box, Typography, Link } from "@mui/material";
import FooterEmailForm from "./FooterEmailForm";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#222",
        color: "#eee",
        py: 8,
        px: { xs: 3, md: 10 },
        textAlign: "center",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Grid
        container
        spacing={6}
        justifyContent="center"
        alignItems="flex-start"
      >
        {/* Left Section */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="700"
            sx={{ mb: 2, letterSpacing: 1 }}
          >
            Experience
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: 420,
              mb: 4,
              color: "rgba(255, 255, 255, 0.75)",
              lineHeight: 1.6,
            }}
          >
            Expert team delivering stunning content production results.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              fontSize: 28,
            }}
          >
            <FacebookIcon
              sx={{
                cursor: "pointer",
                color: "#eee",
                transition: "color 0.3s",
                "&:hover": { color: "#3b5998" },
              }}
            />
            <InstagramIcon
              sx={{
                cursor: "pointer",
                color: "#eee",
                transition: "color 0.3s",
                "&:hover": { color: "#e4405f" },
              }}
            />
            {/* <TwitterIcon
              sx={{
                cursor: "pointer",
                color: "#eee",
                transition: "color 0.3s",
                "&:hover": { color: "#1da1f2" }, */}
              {/* }}
            /> */}
            {/* <Icon
              icon="ic:baseline-tiktok"
              style={{
                cursor: "pointer",
                color: "#eee",
                fontSize: 28,
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#69C9D0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#eee")}
            /> */}
          </Box>
          <Typography
            variant="body2"
            sx={{ mt: 5, color: "rgba(255,255,255,0.5)" }}
          >
            © 2025. All rights reserved.
          </Typography>
        </Grid>

        {/* Contact Section */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{ mb: 3, letterSpacing: 0.7 }}
          >
            Rental
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 1, fontWeight: "medium" }}
          >
            Phone:
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            +91 9562156703
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 1, fontWeight: "medium" }}
          >
            Email:
          </Typography>
          <Link
            href="mailto:dronedude@ddcameras.com"
            underline="hover"
            sx={{ color: "#90caf9" }}
          >
            dronedude@ddcameras.com
          </Link>
        </Grid>

        {/* Email Signup Section */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{ mb: 3, letterSpacing: 0.7 }}
          >
            Cameras
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 2, color: "rgba(255,255,255,0.7)" }}
          >
            Enter your email address
          </Typography>
          <FooterEmailForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
