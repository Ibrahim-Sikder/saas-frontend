"use client";

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState } from "react";
import {
  Typography,
  IconButton,
  Box,
  Paper,
  Grid,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import {
  Edit,
  LocationOn,
  Business,
  LocalShipping,
  Inventory,
  Assessment,
  MoreVert,
  Add,
  Visibility,
  CheckCircle,
  Cancel,
  Info,
  AccountBalance,
  Category,
  Payments,
  ContactPhone,
  Handshake,
  Timelapse,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

const ProfileOverview = ({ supplier }) => {
  // Use the supplier data directly

  console.log("supplier over", supplier);
  // Add this after the useState declarations
  const performanceMetrics = [
    {
      label: "Quality",
      value: supplier?.supplier_rating
        ? (supplier?.supplier_rating * 20).toFixed(0)
        : "75",
      color: "#4CAF50",
    },
    { label: "Delivery", value: "80", color: "#2196F3" },
    { label: "Price", value: "70", color: "#FF9800" },
    { label: "Service", value: "85", color: "#9C27B0" },
  ];

  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const GlassCard = styled(Paper)(({ theme }) => ({
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    borderRadius: 16,
    boxShadow: "0 8px 32px rgba(31, 38, 135, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    padding: theme.spacing(3),
  }));

  // Function to get status icon
  const getStatusIcon = (status) => {
    if (
      status === "Active" ||
      status === "Delivered" ||
      status === "Completed" ||
      status === "Paid" ||
      status === "Verified" ||
      status === "In Stock" ||
      status === "active"
    ) {
      return <CheckCircle fontSize="small" />;
    } else if (status === "Pending" || status === "Low Stock") {
      return <Timelapse fontSize="small" />;
    } else if (
      status === "Inactive" ||
      status === "Cancelled" ||
      status === "Failed" ||
      status === "Out of Stock"
    ) {
      return <Cancel fontSize="small" />;
    }
    return <Info fontSize="small" />;
  };

  // Function to get status color
  const getStatusColor = (status) => {
    if (
      status === "Active" ||
      status === "Delivered" ||
      status === "Completed" ||
      status === "Paid" ||
      status === "Verified" ||
      status === "In Stock" ||
      status === "active"
    ) {
      return "green";
    } else if (status === "Pending" || status === "Low Stock") {
      return "orange";
    } else if (
      status === "Inactive" ||
      status === "Cancelled" ||
      status === "Failed" ||
      status === "Out of Stock"
    ) {
      return "red";
    }
    return "blue";
  };

  const SupplierScoreCard = styled(Box)(({ theme, score }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    borderRadius: 16,
    backgroundColor:
      score >= 80
        ? "rgba(46, 125, 50, 0.1)"
        : score >= 60
        ? "rgba(237, 108, 2, 0.1)"
        : "rgba(211, 47, 47, 0.1)",
    color: score >= 80 ? "#2e7d32" : score >= 60 ? "#ed6c02" : "#d32f2f",
    border: `1px solid ${
      score >= 80
        ? "rgba(46, 125, 50, 0.3)"
        : score >= 60
        ? "rgba(237, 108, 2, 0.3)"
        : "rgba(211, 47, 47, 0.3)"
    }`,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  }));

  const StatusChip = styled(Chip)(({ theme, statuscolor }) => ({
    fontWeight: 600,
    backgroundColor:
      statuscolor === "green"
        ? "rgba(46, 125, 50, 0.1)"
        : statuscolor === "orange"
        ? "rgba(237, 108, 2, 0.1)"
        : statuscolor === "red"
        ? "rgba(211, 47, 47, 0.1)"
        : "rgba(25, 118, 210, 0.1)",
    color:
      statuscolor === "green"
        ? "#2e7d32"
        : statuscolor === "orange"
        ? "#ed6c02"
        : statuscolor === "red"
        ? "#d32f2f"
        : "#1976d2",
    "& .MuiChip-icon": {
      color: "inherit",
    },
  }));

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  return (
    <Grid container spacing={3}>
      {/* Supplier Information */}
      <Grid item xs={12} md={4}>
        <GlassCard sx={{ height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
            >
              <Business sx={{ mr: 1, color: "#2196f3" }} /> Supplier Information
            </Typography>
            <IconButton size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Box>

          <List sx={{ p: 0 }}>
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Company Name"
                secondary={supplier?.vendor || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Contact Person"
                secondary={
                  supplier?.contact_person_name || supplier?.full_name || "N/A"
                }
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Email"
                secondary={supplier?.email || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Phone"
                secondary={supplier?.phone_number || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Alternate Phone"
                secondary={supplier?.full_Phone_number || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Business License"
                secondary={supplier?.tax_id || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Status"
                secondary={
                  <StatusChip
                    icon={getStatusIcon(supplier?.supplier_status)}
                    label={supplier?.supplier_status}
                    size="small"
                    statuscolor={getStatusColor(supplier?.supplier_status)}
                  />
                }
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
              />
            </ListItem>
          </List>
        </GlassCard>
      </Grid>

      {/* Address & Payment Information */}
      <Grid item xs={12} md={4}>
        <GlassCard sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
            >
              <LocationOn sx={{ mr: 1, color: "#FF5722" }} /> Address
              Information
            </Typography>
            <IconButton size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Box>

          <List sx={{ p: 0 }}>
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Address"
                secondary={supplier?.street_address || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="City"
                secondary={supplier?.city || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="State"
                secondary={supplier?.state || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Country"
                secondary={supplier?.country || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Postal Code"
                secondary={supplier?.postal_code || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
          </List>
        </GlassCard>

        <GlassCard>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
            >
              <AccountBalance sx={{ mr: 1, color: "#4CAF50" }} /> Payment
              Information
            </Typography>
            <IconButton size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Box>

          <List sx={{ p: 0 }}>
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Bank Name"
                secondary={supplier?.bank_name || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Account Number"
                secondary={supplier?.account_number || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Account Holder"
                secondary={supplier?.full_name || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Swift Code"
                secondary={supplier?.swift_code || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
          </List>
        </GlassCard>
      </Grid>

      {/* Categories & Emergency Contact */}
      <Grid item xs={12} md={4}>
        <GlassCard sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
            >
              <Category sx={{ mr: 1, color: "#9C27B0" }} /> Business Information
            </Typography>
            <IconButton size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Box>

          <List sx={{ p: 0 }}>
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Vendor Type"
                secondary={supplier?.vendor || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Supplier ID"
                secondary={supplier?.supplierId || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Tax ID"
                secondary={supplier?.tax_id || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
          </List>
        </GlassCard>

        <GlassCard sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
            >
              <ContactPhone sx={{ mr: 1, color: "#F44336" }} /> Contact
              Information
            </Typography>
            <IconButton size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Box>

          <List sx={{ p: 0 }}>
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Primary Contact"
                secondary={supplier?.full_name || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Phone"
                secondary={supplier?.phone_number || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Email"
                secondary={supplier?.email || "N/A"}
                primaryTypographyProps={{
                  color: "text.secondary",
                  variant: "body2",
                }}
                secondaryTypographyProps={{
                  color: "text.primary",
                  variant: "body1",
                  fontWeight: "medium",
                }}
              />
            </ListItem>
          </List>
        </GlassCard>

        <GlassCard>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
            >
              <Assessment sx={{ mr: 1, color: "#2196F3" }} /> Performance
              Metrics
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {performanceMetrics.map((metric, index) => (
              <Grid item xs={6} key={index}>
                <SupplierScoreCard score={Number.parseInt(metric.value) || 80}>
                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <CircularProgress
                      variant="determinate"
                      value={Number.parseInt(metric.value) || 80}
                      size={80}
                      thickness={5}
                      sx={{ color: metric.color }}
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
                      <Typography variant="body1" fontWeight="bold">
                        {metric.value}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, fontWeight: "medium" }}
                  >
                    {metric.label}
                  </Typography>
                </SupplierScoreCard>
              </Grid>
            ))}
          </Grid>
        </GlassCard>
      </Grid>
    </Grid>
  );
};

export default ProfileOverview;
