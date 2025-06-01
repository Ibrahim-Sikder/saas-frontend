/* eslint-disable no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaCloudUploadAlt,
  FaEdit,
  FaCog,
  FaChartLine,
  FaCalendarAlt,
  FaUserCog,
  FaCrown,
  FaRocket,
  FaLightbulb,
  FaTrophy,
  FaUserFriends,
} from "react-icons/fa";
import {
  Box,
  Typography,
  Button,
  TextField,
  TextareaAutosize,
  Avatar,
  Chip,
  Grid,
  Paper,
  Divider,
  LinearProgress,
  Tooltip,
  CircularProgress,
  Tabs,
  Tab,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  backgroundColor: theme.palette.background.default,
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
  },
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const GlowingBadge = styled(Box)(({ theme }) => ({
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: "linear-gradient(45deg, #ff00ea, #00fffb)",
    zIndex: -1,
    filter: "blur(5px)",
    borderRadius: "50%",
    animation: "glowing 1.5s linear infinite",
  },
  "@keyframes glowing": {
    "0%": { opacity: 0.5 },
    "50%": { opacity: 1 },
    "100%": { opacity: 0.5 },
  },
}));

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("/assets/team.jpeg");
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);

  // Mock user data - replace with actual data from your backend
  const userData = {
    name: "MD. ALAMIN",
    role: "Managing Director",
    email: "alamin@example.com",
    about:
      "I am so grateful that you have taken the time to consider partnering with T A Solution to serve you. While we are proud of our work and the results we will help you achieve, it is the relationships we build that will endure. I look forward to working closely with you and your team.",
    subscriptionPlan: "Ultimate Pro",
    subscriptionStatus: "Active",
    subscriptionExpiry: "2024-12-31",
    usageStats: {
      storageUsed: 75,
      projectsCreated: 12,
      activeUsers: 8,
      efficiency: 92,
    },
    achievements: [
      {
        icon: <FaTrophy />,
        title: "Top Performer",
        description: "Ranked in the top 5% of users",
      },
      {
        icon: <FaLightbulb />,
        title: "Innovator",
        description: "10 new features suggested",
      },
      {
        icon: <FaUserFriends />,
        title: "Team Player",
        description: "Collaborated on 50+ projects",
      },
    ],
    recentActivity: [
      { action: "Created new project", date: "2023-06-15" },
      { action: "Updated team settings", date: "2023-06-14" },
      { action: "Achieved 90% efficiency", date: "2023-06-10" },
    ],
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    setIsEditing(false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", padding: 3 }}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            bgcolor: "#42A1DA",
            color: "white",
            borderRadius: "16px",
            padding: 4,
            marginBottom: 4,
            boxShadow: "0 4px 20px rgba(66, 161, 218, 0.2)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "100%",
              background:
                "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
              zIndex: 1,
            }}
          />
          <Grid
            container
            spacing={3}
            alignItems="center"
            sx={{ position: "relative", zIndex: 2 }}
          >
            <Grid item>
              <GlowingBadge>
                <Avatar
                  src={profileImage}
                  alt={userData.name}
                  sx={{ width: 120, height: 120, border: "4px solid white" }}
                />
              </GlowingBadge>
            </Grid>
            <Grid item xs>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                {userData.name}
                <Tooltip title="Verified Account">
                  <FaCheckCircle />
                </Tooltip>
              </Typography>
              <Typography variant="h6">{userData.role}</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {userData.email}
              </Typography>
              <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip
                  icon={<FaCrown />}
                  label={`${userData.subscriptionPlan}`}
                  color="secondary"
                  sx={{
                    background: "linear-gradient(45deg, #FFD700, #FFA500)",
                    color: "black",
                    fontWeight: "bold",
                  }}
                />
                <Chip
                  icon={<FaCalendarAlt />}
                  label={`Expires: ${userData.subscriptionExpiry}`}
                  color="primary"
                />
                <Chip
                  icon={<FaRocket />}
                  label={`${userData.usageStats.efficiency}% Efficient`}
                  color="success"
                />
              </Box>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<FaEdit />}
                onClick={() => setIsEditing(!isEditing)}
                sx={{
                  bgcolor: "white",
                  color: "#42A1DA",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.8)",
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </motion.div>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column - About and Edit Form */}
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
              <Tab label="About" />
              <Tab label="Achievements" />
              <Tab label="Recent Activity" />
            </Tabs>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 0 && (
                  <>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      About Me
                    </Typography>
                    {isEditing ? (
                      <form onSubmit={handleSubmit}>
                        <TextField
                          fullWidth
                          label="Name"
                          defaultValue={userData.name}
                          margin="normal"
                        />
                        <TextField
                          fullWidth
                          label="Email"
                          defaultValue={userData.email}
                          margin="normal"
                        />
                        <TextareaAutosize
                          minRows={4}
                          placeholder="About me"
                          defaultValue={userData.about}
                          style={{
                            width: "100%",
                            marginTop: 16,
                            padding: 8,
                            borderColor: "#ccc",
                          }}
                        />
                        <Box sx={{ mt: 2 }}>
                          <Button
                            component="label"
                            variant="contained"
                            startIcon={<FaCloudUploadAlt />}
                          >
                            Upload New Picture
                            <VisuallyHiddenInput
                              type="file"
                              onChange={handleImageUpload}
                            />
                          </Button>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            Save Changes
                          </Button>
                        </Box>
                      </form>
                    ) : (
                      <Typography>{userData.about}</Typography>
                    )}
                  </>
                )}
                {activeTab === 1 && (
                  <Grid container spacing={2}>
                    {userData.achievements.map((achievement, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                              }}
                            >
                              {React.cloneElement(achievement.icon, {
                                style: {
                                  fontSize: 24,
                                  marginRight: 8,
                                  color: "#42A1DA",
                                },
                              })}
                              <Typography variant="h6">
                                {achievement.title}
                              </Typography>
                            </Box>
                            <Typography variant="body2">
                              {achievement.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
                {activeTab === 2 && (
                  <Box>
                    {userData.recentActivity.map((activity, index) => (
                      <Box
                        key={index}
                        sx={{ mb: 2, display: "flex", alignItems: "center" }}
                      >
                        <FaChartLine
                          style={{ marginRight: 8, color: "#42A1DA" }}
                        />
                        <Box>
                          <Typography variant="body1">
                            {activity.action}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {activity.date}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </motion.div>
            </AnimatePresence>
          </StyledPaper>
        </Grid>

        {/* Right Column - Subscription and Usage Info */}
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Subscription Insights
            </Typography>
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                variant="determinate"
                value={progress}
                size={100}
                thickness={4}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="text.secondary"
                >
                  {`${Math.round(progress)}%`}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                <strong>Plan:</strong> {userData.subscriptionPlan}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {userData.subscriptionStatus}
              </Typography>
              <Typography variant="body1">
                <strong>Expires:</strong> {userData.subscriptionExpiry}
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<FaCog />}
              fullWidth
              sx={{
                mt: 2,
                background: "linear-gradient(45deg, #42A1DA, #2980b9)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(45deg, #2980b9, #42A1DA)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 10px rgba(66, 161, 218, 0.3)",
                },
              }}
            >
              Upgrade Plan
            </Button>
          </StyledPaper>

          <StyledPaper>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Usage Analytics
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2">Storage Utilization</Typography>
              <LinearProgress
                variant="determinate"
                value={userData.usageStats.storageUsed}
                sx={{ height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" align="right">
                {userData.usageStats.storageUsed}%
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">
              <FaChartLine /> Projects Created:{" "}
              {userData.usageStats.projectsCreated}
            </Typography>
            <Typography variant="body1">
              <FaUserCog /> Active Users: {userData.usageStats.activeUsers}
            </Typography>
          </StyledPaper>

          <StyledPaper>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FaRocket />}
                  sx={{
                    borderColor: "#42A1DA",
                    color: "#42A1DA",
                    "&:hover": {
                      backgroundColor: "rgba(66, 161, 218, 0.1)",
                      borderColor: "#2980b9",
                    },
                  }}
                >
                  New Project
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FaUserFriends />}
                  sx={{
                    borderColor: "#42A1DA",
                    color: "#42A1DA",
                    "&:hover": {
                      backgroundColor: "rgba(66, 161, 218, 0.1)",
                      borderColor: "#2980b9",
                    },
                  }}
                >
                  Invite Team
                </Button>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
