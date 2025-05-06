import React from "react";
import { Box, Button, Card, Grid } from "@mui/material";
import { Formik, Form } from "formik";
import * as z from "zod";
import FormikInput from "../fields/FormikInput";

// Zod schema
const contactSchema = z.object({
  firstName: z.string().optional(),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  message: z.string().nonempty("Message is required"),
});

// Custom Zod validator for Formik
const validateWithZod = (schema) => (values) => {
  const result = schema.safeParse(values);
  if (result.success) return {};
  const errors = {};
  result.error.errors.forEach((err) => {
    if (err.path[0]) errors[err.path[0]] = err.message;
  });
  return errors;
};

const GetInTouch = () => {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: 'url("/imgs/3.avif")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        // borderRadius: "20px",
        minHeight: { xs: "100vh", md: "80vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 4 },
        py: { xs: 4, md: 8 },
        mt:3
      }}
   
    >
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "20px",
          p: 4,
          maxWidth: "1200px",
          margin: "0 auto",
          boxShadow: 4,
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
            justifyContent: "center",
          }}
             data-aos="fade-up"
        >
          <h2 className="text-5xl font-semibold mb-4 text-black">Get in Touch</h2>
          <p className="text-lg font-light text-left max-w-md text-black">
            Reach out to our expert team for inquiries about camera rentals and
            content production services.
          </p>
        </Grid>

        {/* Second Grid - 60% */}
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Card
            sx={{
              p: 3,
              borderRadius: "20px",
              backgroundColor: "#fff",
              width: "100%",
              maxWidth: "500px",
            }}
          >
            <Formik
              initialValues={{
                firstName: "",
                email: "",
                message: "",
              }}
              validate={validateWithZod(contactSchema)}
              onSubmit={(values, { resetForm }) => {
                console.log("Form submitted:", values);
                resetForm();
              }}
            >
              {() => (
                <Form>
                  <FormikInput name="firstName" label="First Name" />
                  <FormikInput name="email" label="Email Address" />
                  <FormikInput name="message" label="Message" multiline rows={4} />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      borderRadius: "20px",
                      backgroundColor: "#000",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                        color: "#000",
                      },
                    }}
                  >
                    Submit your inquiry
                  </Button>
                </Form>
              )}
            </Formik>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GetInTouch;
