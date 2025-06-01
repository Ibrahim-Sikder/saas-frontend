/* eslint-disable react/prop-types */
import { useState } from 'react';
import dayjs from 'dayjs'; // Import Day.js library
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField } from '@mui/material';

export default function ShiftTimePicker({
  handleAttendanceOutTime,
  index,
}) {
  // Initialize state for the time value
  const [selectedTime, setSelectedTime] = useState(dayjs());

  // Handler for when the time changes
  const handleTimeChange = (time) => {
    setSelectedTime(time);
    handleAttendanceOutTime(index, time);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          "DatePicker",
          "TimePicker",
          "DateTimePicker",
          "DateRangePicker",
        ]}
      >
        <DemoItem>
          <TimePicker
            value={selectedTime}
            onChange={handleTimeChange}
            renderInput={(params) => (
              <TextField
                {...params}
                helperText="Select time"
                // Apply MUI sx styling
                sx={{
                  width: 300, // Set the width of the input
                  bgcolor: 'background.paper', // Use theme colors for background
                  boxShadow: 1, // Apply box shadow
                  borderRadius: 1, // Rounded corners
                  '& .MuiInputBase-input': { // Target the input element for more specific styles
                    color: 'text.primary', // Use theme colors for text
                  },
                  '& .MuiSvgIcon-root': { // Style icons within the TextField
                    color: 'action.active', // Use theme colors for icon
                  }
                }}
              />
            )}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
