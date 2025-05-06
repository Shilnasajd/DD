// FooterEmailForm.jsx
import React from "react";
import { Formik, Form } from "formik";
import { z } from "zod";
import { Grid, Typography, Box, Button } from "@mui/material";
import FormikInput from "../fields/FormikInput";


// Define Zod schema
const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const FooterEmailForm = () => {
  return (
    <Formik
      initialValues={{ email: "" }}
      validate={(values) => {
        try {
          emailSchema.parse(values);
        } catch (err) {
          const errors = {};
          if (err.errors) {
            err.errors.forEach((error) => {
              errors[error.path[0]] = error.message;
            });
          }
          return errors;
        }
      }}
      onSubmit={(values, { resetForm }) => {
        console.log("Submitted Email:", values.email);
        resetForm();
      }}
    >
      {() => (
        <Form>
          <Box mt={2}>
            <FormikInput name="email" label="Email Address" type="email" />
            <Button
              type="submit"
              variant="contained"
      
              sx={{ mt: 2,color: "white",borderRadius:4,px:4,py:2, backgroundColor: "#000000", "&:hover": { backgroundColor: "#333333" } }}
            >
             Submit your request now
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default FooterEmailForm;
