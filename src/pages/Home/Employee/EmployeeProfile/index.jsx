/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";
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
  Divider,
  IconButton,
  useTheme,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import { useGetSingleEmployeeQuery } from "../../../../redux/api/employee";
import Loading from "../../../../components/Loading/Loading";
import EmployeeAccount from "./EmployeeAccount";
import SingleEmployeeLeaveList from "./SingleEmployeeLeaveList";
import EmployeeSalary from "./EmployeeSalary";
import EmployeeOvertime from "./EmployeeOvertime";
import EmployeeAttendance from "./EmployeeAttendance";
import "../Employee.css";
import avatar from "../../../../../public/assets/chat3.jpg";
import {
  AnimatedAvatar,
  tabsStyles,
  tabStyles,
} from "../../../../utils/customStyle";
import { GlassmorphicBox, StyledPaper } from "../../../../utils";
import { useTenantDomain } from "../../../../hooks/useTenantDomain";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
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
  );
};

const EmployeeProfile = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const theme = useTheme();
  const id = new URLSearchParams(location.search).get("id");
  const tenantDomain = useTenantDomain();

  const { data, isLoading, error } = useGetSingleEmployeeQuery({
    tenantDomain,
    id,
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    toast.error(error?.status);
  }

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("default", { month: "long" });
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const formattedCurrentMonth =
    currentMonth < 10 ? `0${currentMonth}` : currentMonth;
  const monthName = getMonthName(currentMonth);

  const totalOvertime = data?.data?.attendance
    .filter((record) => {
      const [, month, year] = record.date.split("-");
      return (
        month === String(formattedCurrentMonth) && year === String(currentYear)
      );
    })
    .reduce((total, record) => total + record.overtime, 0);

  const totalSalary = data?.data?.salary?.reduce((total, record) => {
    return total + (record.total_payment || 0);
  }, 0);

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const attendanceCount =
    data?.data?.attendance.filter((record) => {
      const [, month, year] = record.date.split("-");
      return (
        month === String(formattedCurrentMonth) && year === String(currentYear)
      );
    }).length || 0;

  const attendancePercentage = Math.round(
    (attendanceCount / daysInMonth) * 100
  );

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: "#f0f4f8" }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Employee Profile
      </Typography>

      <StyledPaper elevation={5}>
        <Box
          sx={{
            height: 200,
            background: "linear-gradient(135deg, #42A1DA 0%, #F77F00 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -50,
              left: -50,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -30,
              right: -30,
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
            }}
          />
        </Box>

        <Box sx={{ mt: -10, px: 4, pb: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <AnimatedAvatar
                  src={data?.data?.image || avatar}
                  alt={data?.data?.full_name}
                  className="profile-image-pulse"
                />
                <Typography variant="h5" fontWeight="bold" mt={2}>
                  {data?.data?.full_name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {data?.data?.designation}
                </Typography>
                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    startIcon={<SendIcon />}
                    sx={{
                      borderRadius: 20,
                      textTransform: "none",
                    }}
                  >
                    Message
                  </Button>
                  <IconButton
                    sx={{
                      bgcolor: "background.paper",
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <GlassmorphicBox>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Chip
                        icon={<CalendarTodayIcon />}
                        label={`Joined: ${data?.data?.join_date}`}
                        sx={{ borderRadius: 20, px: 1 }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <EmailIcon sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography>{data?.data?.email}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <PhoneIcon sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography>{data?.data?.phone}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationOnIcon sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography>{data?.data?.address}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </GlassmorphicBox>

              <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
                <StyledPaper elevation={3} sx={{ flex: 1, minWidth: 200 }}>
                  <Box sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6">Overtime</Typography>
                      <Avatar
                        sx={{
                          bgcolor: "primary.light",
                          width: 40,
                          height: 40,
                        }}
                      >
                        <AccessTimeIcon />
                      </Avatar>
                    </Box>
                    <Typography variant="h4" fontWeight="bold">
                      {totalOvertime || 0} hrs
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {monthName}, {currentYear}
                    </Typography>
                  </Box>
                </StyledPaper>

                <StyledPaper elevation={3} sx={{ flex: 1, minWidth: 200 }}>
                  <Box sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6">Total Salary</Typography>
                      <Avatar
                        sx={{
                          bgcolor: "secondary.light",
                          width: 40,
                          height: 40,
                        }}
                      >
                        <AttachMoneyIcon />
                      </Avatar>
                    </Box>
                    <Typography variant="h4" fontWeight="bold">
                      ৳ {totalSalary || 0}
                    </Typography>
                  </Box>
                </StyledPaper>

                <StyledPaper elevation={3} sx={{ flex: 1, minWidth: 200 }}>
                  <Box sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6">Attendance</Typography>
                      <CircularProgress
                        variant="determinate"
                        value={attendancePercentage}
                        size={40}
                      />
                    </Box>
                    <Typography variant="h4" fontWeight="bold">
                      {attendancePercentage}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {attendanceCount} / {daysInMonth} days
                    </Typography>
                  </Box>
                </StyledPaper>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        <div className="text-black mt-14">
          <Tabs
            sx={tabsStyles}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab sx={tabStyles} label="Account" />
            <Tab sx={tabStyles} label="Attendance" />
            <Tab sx={tabStyles} label="Leave" />
            <Tab sx={tabStyles} label="Salary" />
            <Tab sx={tabStyles} label="Overtime" />
          </Tabs>

          <TabPanel value={value} index={0}>
            <EmployeeAccount id={id} accountInfo={data?.data} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <EmployeeAttendance
              id={id}
              attendanceData={data?.data?.attendance}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <SingleEmployeeLeaveList tenantDomain={tenantDomain} id={id} />
          </TabPanel>

          <TabPanel value={value} index={3}>
            <EmployeeSalary tenantDomain={tenantDomain} id={id} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <EmployeeOvertime tenantDomain={tenantDomain} id={id} />
          </TabPanel>

          <div>
            <p className="my-5 text-center">
              © Copyright 2024 | Softypy Garage | All Rights Reserved
            </p>
          </div>
        </div>
      </StyledPaper>
    </Box>
  );
};

export default EmployeeProfile;
