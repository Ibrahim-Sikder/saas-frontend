/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";

const TASTimePicker = ({
  name,
  label,
  required,
  fullWidth = true,
  margin = "normal",
  sx,
  value,
  disableFuture = true,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs().format("HH:mm")}
      render={({ field: { onChange, value, ...field } }) => {
        const timeValue = value ? dayjs(field?.value, "HH:mm") : dayjs();
      
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label={label}
              {...field}
              defaultValue={value}
              value={value ? dayjs(value, "HH:mm") : null}
              onChange={(time) => {
                const finalTime = time || dayjs();
                onChange(finalTime.format("HH:mm"));
              }}
              slotProps={{
                textField: {
                  required: required,
                  sx: {
                    ...sx,
                  },

                  fullWidth: fullWidth,
                  margin: margin,
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default TASTimePicker;
