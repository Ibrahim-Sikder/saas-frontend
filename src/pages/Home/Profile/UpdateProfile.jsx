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
  Stack,
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
import CompanyProfileModal from "./CreateCompanyProfileModal";
import Loading from "../../../components/Loading/Loading";

export default function CompanyProfileDisplay() {
  const tenantDomain =
    typeof window !== "undefined" ? window.location.hostname.split(".")[0] : "";
  const { data, isLoading, refetch } = useGetCompanyProfileQuery({
    tenantDomain,
  });

  const [modalOpen, setModalOpen] = useState(false);

  const profileData = data?.data;
  const isFirstTime = !data?.data;

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveProfile = () => {
    refetch();
  };

  const InfoItem = ({
    icon: Icon,
    label,
    value,
    isLink = false,
    linkPrefix = "",
  }) => {
    return (
      <Box display="flex" alignItems="center" mb={1.5}>
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
            <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
              {value}
            </Typography>
          )}
        </Box>
      </Box>
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
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
                fontWeight={700}
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
                borderRadius: 2,
                px: 3,
                py: 1.5,
                textTransform: "none",
                color: "#fff",
              }}
            >
              Crate Profile
            </Button>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                  bgcolor: "background.paper",
                }}
              >
                <Avatar
                  src={profileData?.logo}
                  alt={profileData?.companyName}
                  sx={{
                    width: 150,
                    height: 150,
                    mx: "auto",
                    mb: 2,
                    bgcolor: "primary.light",
                    border: "3px solid",
                    borderColor: "primary.main",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {!profileData?.logo && (
                    <BusinessIcon
                      sx={{ fontSize: 70, color: "primary.contrastText" }}
                    />
                  )}
                </Avatar>
                <Typography
                  variant="h5"
                  gutterBottom
                  color="primary"
                  fontWeight={600}
                >
                  {profileData?.companyName}
                </Typography>
                {profileData?.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, px: 2 }}
                  >
                    {profileData?.description}
                  </Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography
                variant="h6"
                gutterBottom
                color="primary"
                fontWeight={600}
                mb={2}
              >
                Contact Information
              </Typography>
              <Stack spacing={1}>
                <InfoItem
                  icon={EmailIcon}
                  label="Email Address"
                  value={profileData?.email}
                  isLink
                  linkPrefix="mailto:"
                />
                <InfoItem
                  icon={PhoneIcon}
                  label="Phone Number"
                  value={profileData?.phone}
                  isLink
                  linkPrefix="tel:"
                />
                <InfoItem
                  icon={WhatsAppIcon}
                  label="WhatsApp"
                  value={profileData?.whatsapp}
                  isLink
                  linkPrefix="https://wa.me/"
                />
                <InfoItem
                  icon={WebsiteIcon}
                  label="Website"
                  value={profileData?.website}
                  isLink
                />
                <InfoItem
                  icon={LocationIcon}
                  label="Address"
                  value={profileData?.address}
                />
              </Stack>

              <Typography
                variant="h6"
                gutterBottom
                color="primary"
                fontWeight={600}
                mt={4}
                mb={2}
              >
                Document Usage
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                This information appears on the following documents:
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                <Chip
                  label="Job Cards"
                  color="primary"
                  variant="outlined"
                  sx={{ borderRadius: 1.5 }}
                />
                <Chip
                  label="Invoices"
                  color="primary"
                  variant="outlined"
                  sx={{ borderRadius: 1.5 }}
                />
                <Chip
                  label="Quotations"
                  color="primary"
                  variant="outlined"
                  sx={{ borderRadius: 1.5 }}
                />
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
        </CardContent>
      </Card>
      <CompanyProfileModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProfile}
      />
    </Box>
  );
}
