/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Divider,
  Chip,
  Avatar,
  Paper,
  IconButton,
  Skeleton,
  Stack, // Added Stack for better layout control
} from "@mui/material";
import {
  Edit as EditIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  Language as WebsiteIcon,
  LocationOn as LocationIcon,
  Launch as LaunchIcon,
} from "@mui/icons-material";
import { useGetCompanyProfileQuery } from "../../../redux/api/companyProfile";
import CompanyProfileModal from "./UpdateModal";

// Default company profile data for display
const defaultCompanyProfile = {
  companyName: "Your Company Name",
  email: "contact@yourcompany.com",
  phone: "+1 (555) 123-4567",
  whatsapp: "+1 (555) 123-4567",
  website: "https://yourcompany.com",
  address: "123 Business Street, City, State 12345",
  description: "Tell us about your company and what services you provide...",
  logo: "",
  _id: null, // Add _id to default for consistency
};

export default function CompanyProfileDisplay() {
  const tenantDomain =
    typeof window !== "undefined" ? window.location.hostname.split(".")[0] : "";
  const { data, isLoading, refetch } = useGetCompanyProfileQuery({
    tenantDomain,
  });
  const [modalOpen, setModalOpen] = useState(false);
  
  // Use backend data if available, otherwise use defaults
  const profileData = data?.data || defaultCompanyProfile;
  const isFirstTime = !data?.data;

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveProfile = () => {
    refetch(); // Refresh data after save
  };

  const InfoItem = ({
    icon: Icon,
    label,
    value,
    isLink = false,
    linkPrefix = "",
  }) => {
    // Check if the value is essentially the default or empty, considering isFirstTime
    const isEmptyOrDefault =
      !value ||
      (isFirstTime &&
        value ===
          defaultCompanyProfile[label.toLowerCase().replace(/\s+/g, "")]);

    if (isEmptyOrDefault && label !== "Company Name" && label !== "Description") { // Keep company name and description visible even if default
      return (
        <Box display="flex" alignItems="center" mb={1.5}> {/* Reduced margin-bottom */}
          <Icon sx={{ mr: 2, color: "text.secondary", opacity: 0.6 }} /> {/* Dimmer icon for not set */}
          <Box>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            <Typography
              variant="body2"
              color="text.disabled"
              fontStyle="italic"
            >
              Not set
            </Typography>
          </Box>
        </Box>
      );
    }

    return (
      <Box display="flex" alignItems="center" mb={1.5}> {/* Reduced margin-bottom */}
        <Icon sx={{ mr: 2, color: "primary.main" }} />
        <Box flex={1}>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          {isLink ? (
            <Box display="flex" alignItems="center">
              <Typography variant="body1" component="span">
                {value}
              </Typography>
              <IconButton
                size="small"
                onClick={() => window.open(`${linkPrefix}${value}`, "_blank")}
                sx={{ ml: 1 }}
              >
                <LaunchIcon fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>{value}</Typography> 
          )}
        </Box>
      </Box>
    );
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Card elevation={3} sx={{ borderRadius: 3 }}> {/* Increased elevation and border radius for a modern feel */}
          <CardContent sx={{ p: 4 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Skeleton variant="text" width={250} height={45} />
              <Skeleton variant="rectangular" width={150} height={45} borderRadius={1} />
            </Box>
            <Divider sx={{ mb: 4 }} />
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Stack alignItems="center" spacing={2}>
                  <Skeleton variant="circular" width={180} height={180} />
                  <Skeleton variant="text" width="80%" height={30} />
                  <Skeleton variant="text" width="100%" height={80} />
                </Stack>
              </Grid>
              <Grid item xs={12} md={8}>
                <Skeleton variant="text" width="100%" height={30} sx={{ mb: 2 }} />
                <Stack spacing={2}>
                  {[...Array(5)].map((_, i) => (
                    <Box key={i} display="flex" alignItems="center">
                      <Skeleton variant="circular" width={24} height={24} sx={{ mr: 2 }} />
                      <Skeleton variant="text" width="70%" height={20} />
                    </Box>
                  ))}
                </Stack>
                <Skeleton variant="text" width="100%" height={30} sx={{ mt: 4, mb: 2 }} />
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} variant="rectangular" width={100} height={30} borderRadius={5} />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}> {/* Increased elevation and border radius, added overflow hidden */}
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Box>
              <Typography
                variant="h4"
                component="h1"
                color="primary"
                fontWeight={700} // Bolder heading
                gutterBottom
              >
                Company Profile
              </Typography>
              {isFirstTime && (
                <Typography variant="body2" color="text.secondary">
                  Set up your company information to appear on all documents
                </Typography>
              )}
            </Box>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleOpenModal}
              size="large"
              sx={{
                borderRadius: 2, // Slightly rounded button
                px: 3, // More padding
                py: 1.5,
                textTransform: 'none', // Keep text as is
              }}
            >
              {isFirstTime ? "Set Up Profile" : "Edit Profile"}
            </Button>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={4}>
            {/* Logo and Company Name */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={2} // Slightly increased elevation
                sx={{
                  p: 3,
                  textAlign: "center",
                  height: "100%", // Make paper fill the height of the grid item
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2, // Rounded corners for paper
                  bgcolor: 'background.paper', // Ensure consistent background
                }}
              >
                <Avatar
                  src={profileData.logo}
                  alt={profileData.companyName}
                  sx={{
                    width: 150, // Larger avatar
                    height: 150,
                    mx: "auto",
                    mb: 2,
                    bgcolor: "primary.light",
                    border: '3px solid', // Add a border
                    borderColor: 'primary.main', // Border color matching primary
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', // Subtle shadow for avatar
                  }}
                >
                  {!profileData.logo && <BusinessIcon sx={{ fontSize: 70, color: 'primary.contrastText' }} />} {/* Larger icon inside avatar */}
                </Avatar>
                <Typography variant="h5" gutterBottom color="primary" fontWeight={600}> {/* Bolder company name */}
                  {profileData.companyName}
                </Typography>
                {profileData.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, px: 2 }} // Added horizontal padding for description
                  >
                    {profileData.description}
                  </Typography>
                )}
              </Paper>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom color="primary" fontWeight={600} mb={2}> {/* Bolder heading, increased margin */}
                Contact Information
              </Typography>
              <Stack spacing={1}> {/* Use Stack for consistent spacing */}
                <InfoItem
                  icon={EmailIcon}
                  label="Email Address"
                  value={profileData.email}
                  isLink
                  linkPrefix="mailto:"
                />
                <InfoItem
                  icon={PhoneIcon}
                  label="Phone Number"
                  value={profileData.phone}
                  isLink
                  linkPrefix="tel:"
                />
                <InfoItem
                  icon={WhatsAppIcon}
                  label="WhatsApp"
                  value={profileData.whatsapp}
                  isLink
                  linkPrefix="https://wa.me/"
                />
                <InfoItem
                  icon={WebsiteIcon}
                  label="Website"
                  value={profileData.website}
                  isLink
                />
                <InfoItem
                  icon={LocationIcon}
                  label="Address"
                  value={profileData.address}
                />
              </Stack>

              {/* Document Usage */}
              <Typography variant="h6" gutterBottom color="primary" fontWeight={600} mt={4} mb={2}> {/* Bolder heading, increased margins */}
                Document Usage
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                This information appears on the following documents:
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                <Chip label="Job Cards" color="primary" variant="outlined" sx={{ borderRadius: 1.5 }} /> {/* Rounded chips */}
                <Chip label="Invoices" color="primary" variant="outlined" sx={{ borderRadius: 1.5 }} />
                <Chip label="Quotations" color="primary" variant="outlined" sx={{ borderRadius: 1.5 }} />
                <Chip
                  label="Money Receipts"
                  color="primary"
                  variant="outlined"
                  sx={{ borderRadius: 1.5 }}
                />
                <Chip
                  label="Customer Communications"
                  color="primary"
                  variant="outlined"
                  sx={{ borderRadius: 1.5 }}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Status Alert */}
          {isFirstTime && (
            <Box mt={4}>
              <Paper
                sx={{
                  p: 2.5, // Increased padding
                  bgcolor: "info.light",
                  color: "info.contrastText",
                  borderRadius: 2, // Rounded corners
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <BusinessIcon sx={{ fontSize: 30, color: 'info.main' }} /> {/* Info icon */}
                <Typography variant="body2">
                  <strong>Note:</strong> This is sample data. Click "Set Up
                  Profile" to customize your company information and make it
                  appear on all your business documents.
                </Typography>
              </Paper>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Modal */}
      <CompanyProfileModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProfile}
        initialData={data?.data} // Pass the entire backend data to the modal
      />
    </Box>
  );
}