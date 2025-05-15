import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const validateEmail = (values) => {
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
};

const FooterEmailForm = () => {
  return (
    <Formik
      initialValues={{ email: "" }}
      validate={validateEmail}
      onSubmit={(values, { resetForm }) => {
        console.log("Submitted Email:", values.email);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-4 max-w-md mx-auto">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-gray-300 font-medium"
            >
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              className="w-full rounded-lg bg-gray-800 text-white px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 mt-1 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-amber-500 px-8 py-3 rounded-full font-semibold hover:bg-amber-600 transition"
          >
            Submit your request now
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FooterEmailForm;
