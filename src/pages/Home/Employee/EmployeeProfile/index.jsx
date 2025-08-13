/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Button,
  Chip,
  Tabs,
  Tab,
  CircularProgress,
  IconButton,
  useTheme,
} from "@mui/material"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import SendIcon from "@mui/icons-material/Send"
import EditIcon from "@mui/icons-material/Edit"
import { useGetSingleEmployeeQuery } from "../../../../redux/api/employee"
import Loading from "../../../../components/Loading/Loading"
import EmployeeAccount from "./EmployeeAccount"
import SingleEmployeeLeaveList from "./SingleEmployeeLeaveList"
import EmployeeSalary from "./EmployeeSalary"
import EmployeeOvertime from "./EmployeeOvertime"
import EmployeeAttendance from "./EmployeeAttendance"
import "../Employee.css"
import avatar from "../../../../../public/assets/chat3.jpg"
import { AnimatedAvatar, tabsStyles, tabStyles } from "../../../../utils/customStyle"
import { StyledPaper } from "../../../../utils"
import { useTenantDomain } from "../../../../hooks/useTenantDomain"

const TabPanel = (props) => {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`employee-tabpanel-${index}`}
      aria-labelledby={`employee-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const EmployeeProfile = () => {
  const [value, setValue] = useState(0)
  const location = useLocation()
  const theme = useTheme()
  const id = new URLSearchParams(location.search).get("id")
  const tenantDomain = useTenantDomain()

  const { data, isLoading, error } = useGetSingleEmployeeQuery({
    tenantDomain,
    id,
  })
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  if (isLoading) {
    return <Loading />
  }
  if (error) {
    toast.error(error?.status)
  }

  const getMonthName = (monthNumber) => {
    const date = new Date()
    date.setMonth(monthNumber - 1)
    return date.toLocaleString("default", { month: "long" })
  }

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  const formattedCurrentMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth
  const monthName = getMonthName(currentMonth)

  const totalOvertime = data?.data?.attendance
    .filter((record) => {
      const [, month, year] = record.date.split("-")
      return month === String(formattedCurrentMonth) && year === String(currentYear)
    })
    .reduce((total, record) => total + record.overtime, 0)

  const totalSalary = data?.data?.salary?.reduce((total, record) => {
    return total + (record.total_payment || 0)
  }, 0)

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()
  const attendanceCount =
    data?.data?.attendance.filter((record) => {
      const [, month, year] = record.date.split("-")
      return month === String(formattedCurrentMonth) && year === String(currentYear)
    }).length || 0

  const attendancePercentage = Math.round((attendanceCount / daysInMonth) * 100)

  return (
    <Box
      sx={{
        p: { xs: 2, md: 5 },
        minHeight: "50vh",
      }}
    >
      

      <StyledPaper
        elevation={24}
        sx={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: 200,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #667eea 75%, #764ba2 100%)",
            backgroundSize: "400% 400%",
            animation: "gradientShift 8s ease infinite",
            position: "relative",
            overflow: "hidden",
            "@keyframes gradientShift": {
              "0%": { backgroundPosition: "0% 50%" },
              "50%": { backgroundPosition: "100% 50%" },
              "100%": { backgroundPosition: "0% 50%" },
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -30,
              left: -30,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              animation: "float 6s ease-in-out infinite",
              "@keyframes float": {
                "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                "50%": { transform: "translateY(-20px) rotate(180deg)" },
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -50,
              right: -50,
              width: 250,
              height: 250,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              animation: "float 8s ease-in-out infinite reverse",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "20%",
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              animation: "pulse 4s ease-in-out infinite",
              "@keyframes pulse": {
                "0%, 100%": { transform: "scale(1)", opacity: 0.8 },
                "50%": { transform: "scale(1.2)", opacity: 0.4 },
              },
            }}
          />
        </Box>

        <Box sx={{ mt: -12, px: 4, pb: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <AnimatedAvatar
                    src={data?.data?.image || avatar}
                    alt={data?.data?.full_name}
                    className="profile-image-pulse"
                    sx={{
                      width: 160,
                      height: 160,
                      border: "6px solid rgba(255,255,255,0.9)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2), 0 0 0 4px rgba(255,255,255,0.1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 25px 50px rgba(0,0,0,0.3), 0 0 0 6px rgba(255,255,255,0.2)",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 10,
                      right: 10,
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "linear-gradient(45deg, #4CAF50, #8BC34A)",
                      border: "3px solid white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    }}
                  />
                </Box>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  mt={3}
                  sx={{
                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textAlign: "center",
                  }}
                >
                  {data?.data?.full_name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#666",
                    fontWeight: 500,
                    textAlign: "center",
                    mt: 1,
                  }}
                >
                  {data?.data?.designation}
                </Typography>

                <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<SendIcon />}
                    sx={{
                      borderRadius: "25px",
                      textTransform: "none",
                      px: 3,
                      py: 1.5,
                      background: "linear-gradient(45deg, #667eea, #764ba2)",
                      boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #764ba2, #667eea)",
                        boxShadow: "0 12px 25px rgba(102, 126, 234, 0.6)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Message
                  </Button>
                  <IconButton
                    sx={{
                      background: "linear-gradient(45deg, #f093fb, #f5576c)",
                      color: "white",
                      width: 50,
                      height: 50,
                      boxShadow: "0 8px 20px rgba(240, 147, 251, 0.4)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #f5576c, #f093fb)",
                        boxShadow: "0 12px 25px rgba(240, 147, 251, 0.6)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  p: 3,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        borderRadius: "12px",
                        background: "rgba(102, 126, 234, 0.1)",
                      }}
                    >
                      <Chip
                        icon={<CalendarTodayIcon />}
                        label={`Joined: ${data?.data?.join_date}`}
                        sx={{
                          borderRadius: "20px",
                          px: 2,
                          background: "linear-gradient(45deg, #667eea, #764ba2)",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        borderRadius: "12px",
                        background: "rgba(240, 147, 251, 0.1)",
                      }}
                    >
                      <EmailIcon sx={{ mr: 2, color: "#f093fb", fontSize: 28 }} />
                      <Typography fontWeight="500">{data?.data?.email}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        borderRadius: "12px",
                        background: "rgba(118, 75, 162, 0.1)",
                      }}
                    >
                      <PhoneIcon sx={{ mr: 2, color: "#764ba2", fontSize: 28 }} />
                      <Typography fontWeight="500">{data?.data?.phone}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        borderRadius: "12px",
                        background: "rgba(245, 87, 108, 0.1)",
                      }}
                    >
                      <LocationOnIcon sx={{ mr: 2, color: "#f5576c", fontSize: 28 }} />
                      <Typography fontWeight="500">{data?.data?.address}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mt: 4, display: "flex", gap: 3, flexWrap: "wrap" }}>
                <Box
                  sx={{
                    flex: 1,
                    minWidth: 200,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "20px",
                    p: 3,
                    color: "white",
                    boxShadow: "0 15px 35px rgba(102, 126, 234, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(102, 126, 234, 0.4)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      Overtime
                    </Typography>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 50, height: 50 }}>
                      <AccessTimeIcon sx={{ fontSize: 28 }} />
                    </Avatar>
                  </Box>
                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                    {totalOvertime || 0} hrs
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {monthName}, {currentYear}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    minWidth: 200,
                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    borderRadius: "20px",
                    p: 3,
                    color: "white",
                    boxShadow: "0 15px 35px rgba(240, 147, 251, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(240, 147, 251, 0.4)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      Total Salary
                    </Typography>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 50, height: 50 }}>
                      <AttachMoneyIcon sx={{ fontSize: 28 }} />
                    </Avatar>
                  </Box>
                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                    ৳ {totalSalary || 0}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    minWidth: 200,
                    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    borderRadius: "20px",
                    p: 3,
                    color: "white",
                    boxShadow: "0 15px 35px rgba(79, 172, 254, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(79, 172, 254, 0.4)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      Attendance
                    </Typography>
                    <CircularProgress
                      variant="determinate"
                      value={attendancePercentage}
                      size={50}
                      thickness={6}
                      sx={{
                        color: "rgba(255,255,255,0.9)",
                        "& .MuiCircularProgress-circle": {
                          strokeLinecap: "round",
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                    {attendancePercentage}%
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {attendanceCount} / {daysInMonth} days
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            height: "2px",
            background: "linear-gradient(90deg, transparent, #667eea, #764ba2, #f093fb, transparent)",
            my: 4,
          }}
        />

        <div className="text-black mt-14">
          <Box
            sx={{
              background: "rgba(102, 126, 234, 0.05)",
              borderRadius: "20px",
              p: 1,
              mb: 3,
            }}
          >
            <Tabs
              sx={{
                ...tabsStyles,
                "& .MuiTab-root": {
                  ...tabStyles,
                  borderRadius: "15px",
                  margin: "0 4px",
                  transition: "all 0.3s ease",
                  "&.Mui-selected": {
                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                    color: "white",
                    fontWeight: "bold",
                  },
                },
              }}
              value={value}
              onChange={handleChange}
              aria-label="employee tabs"
            >
              <Tab label="Account" />
              <Tab label="Attendance" />
              <Tab label="Leave" />
              <Tab label="Salary" />
              <Tab label="Overtime" />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <EmployeeAccount id={id} accountInfo={data?.data} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <EmployeeAttendance id={id} attendanceData={data?.data?.attendance} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <SingleEmployeeLeaveList tenantDomain={tenantDomain} id={id} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <EmployeeSalary tenantDomain={tenantDomain} id={id} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <EmployeeOvertime accountInfo={data?.data}  tenantDomain={tenantDomain} id={id} />
          </TabPanel>

          <Box
            sx={{
              textAlign: "center",
              mt: 6,
              p: 3,
              background: "rgba(102, 126, 234, 0.05)",
              borderRadius: "15px",
            }}
          >
            <Typography
              sx={{
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
              }}
            >
              © Copyright 2024 | Softypy Garage | All Rights Reserved
            </Typography>
          </Box>
        </div>
      </StyledPaper>
    </Box>
  )
}

export default EmployeeProfile
