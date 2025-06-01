/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const AutocompleteSelect = ({
  name,
  label = "Autocomplete",
  options = [],
  fullWidth = true,
  sx,
  required = false,
  size = "small",
  multiple = false,
  freeSolo = false,
  defaultValue = null,
  placeholder = "",
  margin = "normal",
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          multiple={multiple}
          freeSolo={freeSolo}
          options={options}
          margin={margin}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option?.label || ""
          }
          value={null}
          onChange={(_, newValue) => {
            field.onChange(
              multiple
                ? newValue.map((option) =>
                    typeof option === "string" ? option : option?.label || ""
                  )
                : typeof newValue === "string"
                ? newValue
                : newValue?.label || ""
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              fullWidth={fullWidth}
              required={required}
              error={!!error}
              helperText={error?.message}
              variant="outlined"
              size={size}
              sx={sx}
            />
          )}
        />
      )}
    />
  );
};

export default AutocompleteSelect;
