/* eslint-disable react/prop-types */
"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Tooltip,
  Fade,
} from "@mui/material"
import { motion } from "framer-motion"
import { Calendar, User, AlertCircle } from "lucide-react"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


const MonthlyTable = ({ attendanceData, employeeName }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const currentDate = new Date(2025, 1, 24)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const processAttendanceData = () => {
    const processedData = {}
    attendanceData.forEach((record) => {
      const [day, month, year] = record.date.split("-")
      const key = `${year}-${month}-${day}`
      if (record.absent) {
        processedData[key] = "A"
      } else if (record.late_status) {
        processedData[key] = "L"
      } else if (record.present) {
        processedData[key] = "P"
      }
    })
    return processedData
  }

  const attendanceMap = processAttendanceData()

  const getAttendanceStatus = (year, month, day) => {
    const key = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
    return attendanceMap[key] || "-"
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "P":
        return theme.palette.success.main
      case "A":
        return theme.palette.error.main
      case "L":
        return theme.palette.warning.main
      default:
        return theme.palette.grey[200]
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "P":
        return "Present"
      case "A":
        return "Absent"
      case "L":
        return "Late"
      default:
        return "No data"
    }
  }

  const MotionTableRow = motion(TableRow)

  return (
    <Paper
      elevation={3}
      sx={{ p: 4, borderRadius: 2, background: "linear-gradient(145deg, #f3f4f6 0%, #ffffff 100%)" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: theme.palette.primary.main, display: "flex", alignItems: "center", gap: 2 }}
        >
          <Calendar size={32} />
          Attendance Sheet
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: theme.palette.primary.light,
            p: 2,
            borderRadius: 2,
          }}
        >
          <User size={24} sx={{color:'white'}} />
          <Typography variant="h6" sx={{ color: 'white' }}>
            {employeeName} Rakib
          </Typography>
        </Box>
      </Box>
      <Box sx={{ overflowX: "auto", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}>
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Table size={isMobile ? "small" : "medium"} sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: theme.palette.primary.main }}>
                <TableCell align="center" sx={{ fontWeight: "bold", color: 'white' }} >
                  Day
                </TableCell>
                {months.map((month) => (
                  <TableCell
                    key={month}
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      color: 'white' ,
                      ...(month === months[currentDate.getMonth()] && {
                        bgcolor: theme.palette.secondary.main,
                      }),
                    }}
                  >
                    {month}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {days.map((day) => (
                <MotionTableRow
                  key={day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: day * 0.03 }}
                  sx={{
                    "&:nth-of-type(odd)": { bgcolor: theme.palette.action.hover },
                    "&:hover": { bgcolor: theme.palette.action.selected },
                  }}
                >
                  <TableCell align="center" sx={{ fontWeight: "bold", color: theme.palette.text.secondary }}>
                    {day}
                  </TableCell>
                  {months.map((_, monthIndex) => {
                    const status = getAttendanceStatus(currentDate.getFullYear(), monthIndex + 1, day)
                    return (
                      <TableCell key={monthIndex} align="center" sx={{ p: 1 }}>
                        <Tooltip
                          title={getStatusText(status)}
                          arrow
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 600 }}
                        >
                          <Box
                            component={motion.div}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              bgcolor: getStatusColor(status),
                              color: status === "-" ? theme.palette.text.secondary : theme.palette.common.white,
                              fontWeight: "bold",
                              cursor: "pointer",
                              transition: "all 0.2s ease-in-out",
                            }}
                          >
                            {status}
                          </Box>
                        </Tooltip>
                      </TableCell>
                    )
                  })}
                </MotionTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
        {["P", "L", "A", "-"].map((status) => (
          <Box key={status} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                bgcolor: getStatusColor(status),
              }}
            />
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {getStatusText(status)}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          color: theme.palette.text.secondary,
        }}
      >
        <AlertCircle size={16} />
        <Typography variant="caption">Attendance data shown for the year {currentDate.getFullYear()}</Typography>
      </Box>
    </Paper>
  )
}

export default MonthlyTable

