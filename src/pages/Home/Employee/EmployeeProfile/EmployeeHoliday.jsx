/* eslint-disable no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { Box, Typography, Paper, Grid, Chip, useTheme, useMediaQuery, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import EventIcon from "@mui/icons-material/Event"
import GroupIcon from "@mui/icons-material/Group"
import DescriptionIcon from "@mui/icons-material/Description"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import axios from "axios" // Assuming you're using axios for API calls
import { useGetAllHolidaysQuery } from "../../../../redux/api/holidayApi"

const localizer = momentLocalizer(moment)

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 20,
  overflow: "hidden",
  position: "relative",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 20px 30px rgba(0,0,0,0.1)",
  },
}))

const GradientBorder = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: 4,
  background: "linear-gradient(90deg, #42A1DA, #F77F00, #42A1DA)",
  backgroundSize: "200% 100%",
  animation: "gradientMove 5s ease infinite",
}))

const StyledCalendar = styled(Calendar)(({ theme }) => ({
  "& .rbc-today": {
    backgroundColor: theme.palette.primary.light,
  },
  "& .rbc-event": {
    backgroundColor: theme.palette.secondary.main,
  },
  "& .rbc-header": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}))

const EmployeeHoliday = () => {
  const [holidays, setHolidays] = useState([])
  const [selectedHoliday, setSelectedHoliday] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, SetSearch] = useState("")
  const theme = useTheme()
  const { data, isLoading } = useGetAllHolidaysQuery({
    limit: 10,
    page: currentPage,
    searchTerm: search,
  })
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get("/api/holidays")
        setHolidays(response.data)
      } catch (error) {
        console.error("Error fetching holidays:", error)
      }
    }

    fetchHolidays()
  }, [])

  const events = Array.isArray(holidays)
    ? holidays.map((holiday) => ({
        title: holiday?.holidayName || "Unnamed Holiday",
        start: holiday?.fromDate ? new Date(holiday.fromDate) : new Date(),
        end: holiday?.toDate ? new Date(holiday.toDate) : new Date(),
        resource: holiday || {},
      }))
    : []

  const handleSelectEvent = (event) => {
    setSelectedHoliday(event.resource)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={4} className="gradient-text">
        Employee Holidays
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <StyledPaper elevation={5}>
            <GradientBorder />
            <Box sx={{ p: 3, height: 600 }}>
              <StyledCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "100%" }}
                onSelectEvent={handleSelectEvent}
                components={{
                  toolbar: CustomToolbar,
                }}
              />
            </Box>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledPaper elevation={5}>
            <GradientBorder />
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Holiday Details
              </Typography>
              {selectedHoliday ? (
                <>
                  <Typography variant="h5" fontWeight="medium" mb={2}>
                    {selectedHoliday.holidayName}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <EventIcon sx={{ mr: 1, color: "primary.main" }} />
                    <Typography>
                      {moment(selectedHoliday.fromDate).format("MMMM D, YYYY")} -{" "}
                      {moment(selectedHoliday.toDate).format("MMMM D, YYYY")}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <GroupIcon sx={{ mr: 1, color: "primary.main" }} />
                    <Box>
                      {selectedHoliday.applicableEmployees && Array.isArray(selectedHoliday.applicableEmployees) ? (
                        selectedHoliday.applicableEmployees.map((employee, index) => (
                          <Chip key={index} label={employee} size="small" sx={{ mr: 1, mb: 1 }} />
                        ))
                      ) : (
                        <Typography>No applicable employees</Typography>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                    <DescriptionIcon sx={{ mr: 1, color: "primary.main", mt: 0.5 }} />
                    <Typography>{selectedHoliday.description || "No description available"}</Typography>
                  </Box>
                </>
              ) : (
                <Typography color="text.secondary">Select a holiday on the calendar to view details.</Typography>
              )}
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  )
}

const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate("PREV")
  }

  const goToNext = () => {
    toolbar.onNavigate("NEXT")
  }

  const goToCurrent = () => {
    toolbar.onNavigate("TODAY")
  }

  const label = () => {
    const date = moment(toolbar?.date)
    return (
      <span>
        {date?.format("MMMM")} <span>{date?.format("YYYY")}</span>
      </span>
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box>
        <IconButton onClick={goToBack}>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton onClick={goToNext}>
          <NavigateNextIcon />
        </IconButton>
      </Box>
      <Typography variant="h6" fontWeight="bold">
        {label()}
      </Typography>
      <Chip label="Today" onClick={goToCurrent} color="primary" sx={{ cursor: "pointer" }} />
    </Box>
  )
}

export default EmployeeHoliday
