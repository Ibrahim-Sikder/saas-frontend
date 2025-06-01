"use client"

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState } from "react"
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
} from "@mui/material"
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
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { useTheme } from "@mui/material/styles"

const ProfileOverview = ({ supplierWithBillPay }) => {



  const { billPayments, paymentStats, supplier } = supplierWithBillPay
  // Add this after the useState declarations
  const paymentSummary = {
    totalPayments: paymentStats?.totalPayments || 0,
    totalAmount: paymentStats?.totalAmount || 0,
    paidAmount: paymentStats?.paidAmount || 0,
    pendingAmount: paymentStats?.pendingAmount || 0,
    pendingCount: paymentStats?.pendingCount || 0,
  }
  // Add this after the useState declarations
  const performanceMetrics = [
    {
      label: "Quality",
      value: supplier.supplier_rating ? (supplier.supplier_rating * 20).toFixed(0) : "75",
      color: "#4CAF50",
    },
    { label: "Delivery", value: "80", color: "#2196F3" },
    { label: "Price", value: "70", color: "#FF9800" },
    { label: "Service", value: "85", color: "#9C27B0" },
  ]
  // Add this after the useState declarations
  const inventoryItems = [
    { id: "INV001", name: "Product 1", stock: "25 units", price: "45.99", status: "In Stock" },
    { id: "INV002", name: "Product 2", stock: "10 units", price: "89.99", status: "Low Stock" },
    { id: "INV003", name: "Product 3", stock: "0 units", price: "129.99", status: "Out of Stock" },
  ]
  const theme = useTheme()
  const [tabValue, setTabValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState("")
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState("success")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [expandedAccordion, setExpandedAccordion] = useState(false)
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const GlassCard = styled(Paper)(({ theme }) => ({
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    borderRadius: 16,
    boxShadow: "0 8px 32px rgba(31, 38, 135, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    padding: theme.spacing(3),
  }))

  // Function to get status icon
  const getStatusIcon = (status) => {
    if (
      status === "Active" ||
      status === "Delivered" ||
      status === "Completed" ||
      status === "Paid" ||
      status === "Verified" ||
      status === "In Stock"
    ) {
      return <CheckCircle fontSize="small" />
    } else if (status === "Pending" || status === "Low Stock") {
      return <Timelapse fontSize="small" />
    } else if (status === "Inactive" || status === "Cancelled" || status === "Failed" || status === "Out of Stock") {
      return <Cancel fontSize="small" />
    }
    return <Info fontSize="small" />
  }
  // Function to get status color
  const getStatusColor = (status) => {
    if (
      status === "Active" ||
      status === "Delivered" ||
      status === "Completed" ||
      status === "Paid" ||
      status === "Verified" ||
      status === "In Stock"
    ) {
      return "green"
    } else if (status === "Pending" || status === "Low Stock") {
      return "orange"
    } else if (status === "Inactive" || status === "Cancelled" || status === "Failed" || status === "Out of Stock") {
      return "red"
    }
    return "blue"
  }

  const SupplierScoreCard = styled(Box)(({ theme, score }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    borderRadius: 16,
    backgroundColor:
      score >= 80 ? "rgba(46, 125, 50, 0.1)" : score >= 60 ? "rgba(237, 108, 2, 0.1)" : "rgba(211, 47, 47, 0.1)",
    color: score >= 80 ? "#2e7d32" : score >= 60 ? "#ed6c02" : "#d32f2f",
    border: `1px solid ${
      score >= 80 ? "rgba(46, 125, 50, 0.3)" : score >= 60 ? "rgba(237, 108, 2, 0.3)" : "rgba(211, 47, 47, 0.3)"
    }`,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  }))
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
  }))

  const handleOpenDialog = (type) => {
    setDialogType(type)
    setOpenDialog(true)
  }
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
            <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
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
                secondary={supplier.shop_name}
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
                secondary={supplier.full_name}
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
                secondary={supplier.email}
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
                secondary={supplier.phone_number}
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
                secondary={supplier.full_Phone_number || "N/A"}
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
                primary="Website"
                secondary={supplier.website}
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
                secondary={supplier.registration_number || "N/A"}
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
                primary="Operating Hours"
                secondary={"Business Hours" || "N/A"}
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
                    icon={getStatusIcon(supplier.supplier_status)}
                    label={supplier.supplier_status}
                    size="small"
                    statuscolor={getStatusColor(supplier.supplier_status)}
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
            <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
              <LocationOn sx={{ mr: 1, color: "#FF5722" }} /> Address Information
            </Typography>
            <IconButton size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Box>

          <List sx={{ p: 0 }}>
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Address"
                secondary={supplier.street_address}
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
                secondary={supplier.city}
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
                secondary={supplier.country}
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
                secondary={supplier.postal_code}
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
            <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
              <AccountBalance sx={{ mr: 1, color: "#4CAF50" }} /> Payment Information
            </Typography>
            <IconButton size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Box>

          <List sx={{ p: 0 }}>
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Bank Name"
                secondary={supplier.bank_name}
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
                secondary={supplier.account_number}
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
                secondary={supplier.full_name || "N/A"}
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
                primary="Bank Branch"
                secondary={"Main Branch" || "N/A"}
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
                secondary={supplier.swift_code}
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
            <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
              <Category sx={{ mr: 1, color: "#9C27B0" }} /> Product Categories
            </Typography>
            <IconButton size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {(supplier.business_type ? [supplier.business_type] : []).map((category, index) => (
              <Chip
                key={index}
                label={category}
                sx={{
                  backgroundColor: "#f3e5f5",
                  color: "#9c27b0",
                  fontWeight: "medium",
                  borderRadius: 20,
                  py: 2,
                }}
              />
            ))}
          </Box>

          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontWeight: "bold", color: "#757575" }}>
            Specialties
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {(supplier.vendor ? [supplier.vendor] : []).map((specialty, index) => (
              <Chip
                key={index}
                label={specialty}
                variant="outlined"
                sx={{
                  borderColor: "#9c27b0",
                  color: "#9c27b0",
                  borderRadius: 20,
                }}
              />
            ))}
          </Box>
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
            <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
              <ContactPhone sx={{ mr: 1, color: "#F44336" }} /> Emergency Contact
            </Typography>
            <IconButton size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Box>

          <List sx={{ p: 0 }}>
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary="Name"
                secondary={supplier.full_name || "N/A"}
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
                primary="Relationship"
                secondary={"Primary Contact" || "N/A"}
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
                secondary={supplier.phone_number || "N/A"}
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
                secondary={supplier.email || "N/A"}
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
            <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
              <Assessment sx={{ mr: 1, color: "#2196F3" }} /> Performance Metrics
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
                  <Typography variant="body2" sx={{ mt: 1, fontWeight: "medium" }}>
                    {metric.label}
                  </Typography>
                </SupplierScoreCard>
              </Grid>
            ))}
          </Grid>
        </GlassCard>
      </Grid>

      {/* Business Terms */}
      <Grid item xs={12}>
        <GlassCard sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
              <Handshake sx={{ mr: 1, color: "#FF9800" }} /> Business Terms
            </Typography>
            <IconButton size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  p: 2,
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Payment Terms
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {supplier.payment_terms || "N/A"}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  p: 2,
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Discount Terms
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {supplier.credit_terms ? "Available" : "Not Available"}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  p: 2,
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Lead Time
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {supplier.lead_time ? `${supplier.lead_time} days` : "N/A"}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  p: 2,
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Minimum Order Value
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  ${supplier.minimum_order_value || "N/A"}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Return Policy
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {supplier.delivery_terms || "N/A"}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Warranty Policy
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {supplier.quality_certification || "N/A"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </GlassCard>
      </Grid>

      {/* Recent Orders */}
      <Grid item xs={12} md={6}>
        <GlassCard>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ display: "flex", alignItems: "center" }}>
              <LocalShipping sx={{ mr: 1, color: "#2196F3" }} /> Recent Orders
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                borderRadius: 20,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
              }}
              onClick={() => handleOpenDialog("newOrder")}
            >
              New Order
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billPayments.slice(0, 3).map((payment, index) => (
                  <TableRow key={payment._id} sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
                    <TableCell sx={{ fontWeight: "medium" }}>
                      {payment.billNumber || payment.invoiceNumber || `ORD-${index + 1}`}
                    </TableCell>
                    <TableCell>
                      {new Date(payment.bill_date || payment.payment_date || payment.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{payment.against_bill || payment.bill_category || "Items"}</TableCell>
                    <TableCell>${payment.amount ? payment.amount.toLocaleString() : "0.00"}</TableCell>
                    <TableCell>
                      <StatusChip
                        icon={getStatusIcon(payment.paymentStatus || "Pending")}
                        label={payment.paymentStatus || "Pending"}
                        size="small"
                        statuscolor={getStatusColor(payment.paymentStatus || "Pending")}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button variant="text" sx={{ color: "#2196f3" }} onClick={() => setTabValue(1)}>
              View All Orders
            </Button>
          </Box>
        </GlassCard>
      </Grid>

      {/* Inventory Items */}
      <Grid item xs={12} md={6}>
        <GlassCard>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ display: "flex", alignItems: "center" }}>
              <Inventory sx={{ mr: 1, color: "#4CAF50" }} /> Inventory Items
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                borderRadius: 20,
                backgroundColor: "#4CAF50",
                "&:hover": {
                  backgroundColor: "#388E3C",
                },
              }}
              onClick={() => handleOpenDialog("newItem")}
            >
              Add Item
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventoryItems.slice(0, 3).map((item) => (
                  <TableRow key={item.id} sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
                    <TableCell sx={{ fontWeight: "medium" }}>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>
                      <StatusChip
                        icon={getStatusIcon(item.status)}
                        label={item.status}
                        size="small"
                        statuscolor={getStatusColor(item.status)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button variant="text" sx={{ color: "#4CAF50" }} onClick={() => setTabValue(2)}>
              View All Items
            </Button>
          </Box>
        </GlassCard>
      </Grid>

      {/* Payment History */}
      <Grid item xs={12}>
        <GlassCard>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ display: "flex", alignItems: "center" }}>
              <Payments sx={{ mr: 1, color: "#FF9800" }} /> Payment History
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                borderRadius: 20,
                backgroundColor: "#FF9800",
                "&:hover": {
                  backgroundColor: "#F57C00",
                },
              }}
              onClick={() => handleOpenDialog("newPayment")}
            >
              New Payment
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Payment ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Method</TableCell>
                  <TableCell>Reference</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billPayments.slice(0, 3).map((payment) => (
                  <TableRow key={payment._id} sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
                    <TableCell sx={{ fontWeight: "medium" }}>
                      {payment.paymentReference || payment.transactionId || payment._id.substring(0, 8)}
                    </TableCell>
                    <TableCell>
                      {new Date(payment.payment_date || payment.paid_on || payment.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>${payment.amount ? payment.amount.toLocaleString() : "0.00"}</TableCell>
                    <TableCell>{payment.payment_method || "Bank Transfer"}</TableCell>
                    <TableCell>{payment.transaction_no || payment.check_no || "N/A"}</TableCell>
                    <TableCell>
                      <StatusChip
                        icon={getStatusIcon(payment.paymentStatus || "Pending")}
                        label={payment.paymentStatus || "Pending"}
                        size="small"
                        statuscolor={getStatusColor(payment.paymentStatus || "Pending")}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button variant="text" sx={{ color: "#FF9800" }} onClick={() => setTabValue(3)}>
              View All Payments
            </Button>
          </Box>
        </GlassCard>
      </Grid>
    </Grid>
  )
}

export default ProfileOverview

