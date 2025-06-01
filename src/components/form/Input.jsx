/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Controller, useFormContext } from "react-hook-form";
import { TextField, InputAdornment } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    transition: "all 0.3s ease",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#42A1DA",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#42A1DA",
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#42A1DA",
  },
});

const TASInput = ({
  name,
  label,
  size = "medium",
  type = "text",
  fullWidth = true,
  sx,
  disabled,
  placeholder,
  required,
  variant = "outlined",
  margin = "normal",
  multiline = false,
  rows = 4,
  autoFocus = false,
  onChange,
  value,
  icon: Icon, 
  iconPosition = "start",
  InputProps,
}) => {
  
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <StyledTextField
          {...field}
          type={type}
          label={label}
          size={size}
          variant={variant}
          fullWidth={fullWidth}
          sx={{ ...sx }}
          placeholder={placeholder}
          required={required}
          margin={margin}
          error={!!error?.message}
          helperText={error?.message}
          multiline={multiline}
    
          rows={rows}
          autoFocus={autoFocus}
          disabled={disabled}
          InputProps={{
            startAdornment: Icon && iconPosition === "start" && (
              <InputAdornment position="start">
                <Icon />
              </InputAdornment>
            ),
            endAdornment: Icon && iconPosition === "end" && (
              <InputAdornment position="end">
                <Icon />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default TASInput;
