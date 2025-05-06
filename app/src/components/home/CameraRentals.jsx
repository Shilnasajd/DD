import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";

const CameraRentals = () => {
  return (
    <div className="md:px-16 sm:px-4 flex flex-col items-center justify-center n bg-cover bg-center relative z-10" data-aos="fade-up">
      {" "}
      <h2 className=" text-lg font-light mb-1 text-center">QUALITY ASSURANCE</h2>
      <h2 className=" text-6xl font-semibold mb-4 text-center">Camera Rentals</h2>
      <Box sx={{ display: "flex",mt:2,flexDirection:"column", justifyContent: "center", mb: 4,backgroundColor:"#F2F2F2",borderRadius:"2px",padding:2 }}>
        <h1 className="text-lg font-bold mb-2 text-center">
        Expert Equipment Rental
        </h1>
        <p className="text-lg font-light text-center max-w-2xl">
        Explore our extensive range of cameras and production equipment available.          </p>

      </Box>
      <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center",mt:2 }}>
        <Grid  sx={{ display: "flex", justifyContent: "center" }} spacing={4} container>
        <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/imgs/photo-1587050007609-d9686b217bd6.avif"
          alt="green iguana"
        />
       <CardContent sx={{backgroundColor:"#F2F2F2"}}>
          <Typography gutterBottom variant="body1" component="div" sx={{ fontWeight: 'bold' }}  >
          Professional Equipment Choices
          </Typography>
    
        </CardContent>
      </CardActionArea>
    </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/imgs/photo-1673540617751-4bee7425a389.avif"
          alt="green iguana"
        />
        <CardContent sx={{backgroundColor:"#F2F2F2"}}>
          <Typography gutterBottom variant="body1"   component="div" sx={{ fontWeight: 'bold' }} >
          Camera Rental Services
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        </Grid>
        </Grid>
      </Grid>
    
    </div>
  );
};

export default CameraRentals;
