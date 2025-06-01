/* eslint-disable no-unused-vars */
import { Box, Typography, Paper, Grid, useTheme, useMediaQuery, Divider } from "@mui/material"
import { styled } from "@mui/material/styles"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import DateRangeIcon from "@mui/icons-material/DateRange"
import WeekendIcon from "@mui/icons-material/Weekend"
import "../Employee.css"

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

const GlowingBorder = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: 4,
  background: "linear-gradient(90deg, #42A1DA, #F77F00, #42A1DA)",
  backgroundSize: "200% 100%",
  animation: "glow 3s linear infinite",
}))

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
}))

const EmployeeOvertime = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // Mock data - replace with actual data in your implementation
  const overtimeData = [
    { day: "Saturday", date: "10-05-2024", hours: 3 },
    { day: "Sunday", date: "11-05-2024", hours: 2 },
    { day: "Monday", date: "12-05-2024", hours: 1 },
  ]

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={4} className="gradient-text">
        Employee Overtime
      </Typography>

      <Grid container spacing={3}>
        {overtimeData.map((entry, index) => (
          <Grid item xs={12} md={4} key={index}>
            <StyledPaper elevation={5} sx={{ height: "100%" }}>
              <GlowingBorder />
              <Box sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <IconWrapper sx={{ bgcolor: "primary.light" }}>
                      <WeekendIcon sx={{ fontSize: 30, color: "primary.main" }} />
                    </IconWrapper>
                    <Typography variant="h6" fontWeight="bold">
                      {entry.day}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <DateRangeIcon sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        Date
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      {entry.date}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <AccessTimeIcon sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        Hours
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      {entry.hours}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </StyledPaper>
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Divider />
        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="medium">
            Total Overtime Hours
          </Typography>
          <Typography variant="h4" fontWeight="bold" className="gradient-text">
            {overtimeData.reduce((total, entry) => total + entry.hours, 0)}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default EmployeeOvertime

