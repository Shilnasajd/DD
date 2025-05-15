import React from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as z from "zod";
import FormikInput from "../fields/FormikInput";

// Zod schema
const contactSchema = z.object({
  firstName: z.string().optional(),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  message: z.string().nonempty("Message is required"),
});

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
        backgroundImage: 'url("/imgs/3.avif")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: { xs: "100vh", md: "80vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 3, md: 6 },
        py: { xs: 6, md: 10 },
        mt: 3,
      }}
    >
      <Grid
        container
        spacing={6}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "24px",
          padding: { xs: 4, md: 6 },
          maxWidth: 1100,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
          margin: "0 auto",
        }}
      >
        {/* Left Content */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            pr: { md: 4 },
          }}
        >
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Get in Touch
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 400, lineHeight: 1.6 }}
          >
            Reach out to our expert team for inquiries about camera rentals and
            content production services.
          </Typography>
        </Grid>

        {/* Form Side */}
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: 500,
              borderRadius: "20px",
              padding: 4,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
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
                      mt: 3,
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "1rem",
                      backgroundColor: "#1976d2",
                      "&:hover": {
                        backgroundColor: "#115293",
                      },
                    }}
                  >
                    Submit Your Inquiry
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
