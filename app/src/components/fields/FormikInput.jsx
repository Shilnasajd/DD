// components/FormikInput.js
import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

const FormikInput = ({ name, label, type = "text", ...props }) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      type={type}
      label={label}
      variant="outlined"
      size="small"
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      InputLabelProps={{
        style: { color: "#B5B7B9" },
      }}
      InputProps={{
        style: { color: "white" },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#B5B7B9",
          },
          "&:hover fieldset": {
            borderColor: "#B5B7B9",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#B5B7B9",
          },
        },
        "& .MuiFormHelperText-root": {
          color: "#ffaaaa",
        },
        mt: 1,
      }}
    />
  );
};

export default FormikInput;
