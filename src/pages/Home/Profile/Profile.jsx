/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";
import {
  Box,
  CircularProgress,
  Fade,
  Alert,
  Grid,
  Button,
} from "@mui/material";
import {
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "../../../redux/api/userApi";

// Import subcomponents
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import SubscriptionSection from "./SubscriptionSection";
import { useTenantDomain } from "../../../hooks/useTenantDomain";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tenantDomain = useTenantDomain();
  console.log("this test tenant domain ", tenantDomain);
  const { data, isLoading } = useGetAllUserQuery({ tenantDomain });
  const [updateUser] = useUpdateUserMutation();
  const userData = data?.data?.[0] || {};
  const tenantInfo = userData.tenantInfo || {};
  const subscription = tenantInfo.subscription || {};

  // Format dates utility
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate subscription progress
  const getSubscriptionProgress = () => {
    if (!subscription.startDate || !subscription.endDate) return 0;
    const start = new Date(subscription.startDate);
    const end = new Date(subscription.endDate);
    const now = new Date();
    const total = end - start;
    const elapsed = now - start;
    return Math.max(0, Math.min(100, (elapsed / total) * 100));
  };

  // Calculate days remaining
  const getDaysRemaining = () => {
    if (!subscription.endDate) return 0;
    const end = new Date(subscription.endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{ maxWidth: 1400, margin: "auto", padding: 3, minHeight: "100vh" }}
    >
      {/* Header Section */}
      <ProfileHeader
        tenantDomain={tenantDomain}
        userData={userData}
        tenantInfo={tenantInfo}
        subscription={subscription}
        updateUser={updateUser}
        getSubscriptionStatusColor={getSubscriptionStatusColor}
      />

      {/* Alerts Section */}
      <Box>
        {!subscription.isPaid && (
          <Fade in timeout={1000}>
            <Alert
              severity="error"
              icon={<FaMoneyBillWave />}
              action={
                <Button
                  color="inherit"
                  size="small"
                  startIcon={<FaCreditCard />}
                >
                  Pay Now
                </Button>
              }
              sx={{
                mb: 3,
                borderRadius: "12px",
                "& .MuiAlert-message": { fontSize: "1.1rem" },
                background: "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
              }}
            >
              Payment Required: Your subscription payment of $
              {subscription?.amount} is pending.
            </Alert>
          </Fade>
        )}

        {subscription.status === "Expired" && (
          <Fade in timeout={1000}>
            <Alert
              severity="warning"
              // icon={<FaExclamationTriangle/>}
              sx={{
                mb: 3,
                borderRadius: "12px",
                "& .MuiAlert-message": { fontSize: "1.1rem" },
              }}
            >
              Your subscription has expired on{" "}
              {formatDate(subscription?.endDate)}.
            </Alert>
          </Fade>
        )}
      </Box>

      {/* Main Content Grid */}
      <Grid container spacing={4}>
        {/* Left Column - Tabs */}
        <Grid item xs={12} lg={8}>
          <ProfileTabs
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            userData={userData}
            tenantInfo={tenantInfo}
            subscription={subscription}
            formatDate={formatDate}
          />
        </Grid>

        {/* Right Column - Subscription */}
        <Grid item xs={12} lg={4}>
          <SubscriptionSection
            subscription={subscription}
            getSubscriptionProgress={getSubscriptionProgress}
            getDaysRemaining={getDaysRemaining}
            getSubscriptionStatusColor={getSubscriptionStatusColor}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

// Utility function for status colors
const getSubscriptionStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "#4CAF50";
    case "expired":
      return "#f44336";
    case "pending":
      return "#FF9800";
    default:
      return "#9E9E9E";
  }
};

export default Profile;
