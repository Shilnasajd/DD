import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const CameraRentals = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 8 },
        backgroundImage: 'url("/imgs/bg-camera.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        zIndex: 1,
        color: "#212121",
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 400,
            letterSpacing: 3,
            color: "text.secondary",
            mb: 1,
          }}
        >
          QUALITY ASSURANCE
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            letterSpacing: 1,
            mb: 2,
            color: "primary.main",
          }}
        >
          Camera Rentals
        </Typography>

        <Box
          sx={{
            maxWidth: 600,
            mx: "auto",
            bgcolor: "#f5f5f5",
            borderRadius: 2,
            p: 3,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            Expert Equipment Rental
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 400 }}>
            Explore our extensive range of cameras and production equipment available.
          </Typography>
        </Box>
      </Container>

      <Container maxWidth="lg">
        <Grid container spacing={6} justifyContent="center">
          {[
            {
              image: "/imgs/photo-1587050007609-d9686b217bd6.avif",
              title: "Professional Equipment Choices",
            },
            {
              image: "/imgs/photo-1673540617751-4bee7425a389.avif",
              title: "Premium Camera Rental Services",
            },
          ].map(({ image, title }, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  maxWidth: 345,
                  borderRadius: 3,
                  boxShadow: 4,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                  },
                }}
                elevation={6}
              >
                <CardActionArea>
<CardMedia
  component="img"
  height="180"
  image={image}
  alt={title}
  sx={{ 
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    objectFit: "cover",
    width: "100%",       // ensure full width
    display: "block",    // remove inline gaps if any
  }}
/>
                  <CardContent sx={{ bgcolor: "#f5f5f5" }}>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: 700, textAlign: "center" }}
                    >
                      {title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CameraRentals;
