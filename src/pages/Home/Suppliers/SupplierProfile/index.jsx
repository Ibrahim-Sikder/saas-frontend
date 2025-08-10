/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";
import {
  Typography,
  IconButton,
  Avatar,
  Box,
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
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Message,
  Edit,
  Phone,
  Email,
  Business,
  LocalShipping,
  Inventory,
  Assessment,
  MoreVert,
  Add,
  Star,
  StarBorder,
  CheckCircle,
  Cancel,
  Info,
  ArrowUpward,
  Print,
  Delete,
  Description,
  Category,
  VerifiedUser,
  Payments,
  ShoppingCart,
  Dashboard,
  LocalShippingOutlined,
  InventoryOutlined,
  ReceiptLongOutlined,
  AssessmentOutlined,
  Archive,
  CloudDownload,
  Timelapse,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import ProfileOverview from "./ProfileOverview";
import SupplierProduct from "./SupplierProduct";
import OrderTable from "./OrderTable";
import {
  GlassCard,
  GradientBox,
  inventoryItems,
  recentOrders,
  StatusChip,
  StyledRating,
  StyledTab,
  StyledTabs,
  supplierData,
} from "./supplier";
import { useGetSupplierWithBillPayQuery } from "../../../../redux/api/supplier";
import SupplierBillPay from "./SupplierBillPay";
import { useTenantDomain } from "../../../../hooks/useTenantDomain";

export default function EnhancedSupplierProfile() {
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
  const id = new URLSearchParams(location.search).get("id");
  const tenantDomain = useTenantDomain();

  const { data: supplierWithBillPay } = useGetSupplierWithBillPayQuery({
    tenantDomain,
    id,
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };

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

  if (!supplierWithBillPay) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h5">Loading supplier data...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}

      {/* Main Content */}
      <Box sx={{ p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
          >
            <Business sx={{ mr: 1 }} /> Supplier Profile
          </Typography>
          <Button
            variant="contained"
            startIcon={<Edit />}
            sx={{
              ml: "auto",
              borderRadius: 20,
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
            }}
          >
            Edit Profile
          </Button>
          <Button
            variant="outlined"
            startIcon={<Print />}
            sx={{ ml: 1, borderRadius: 20 }}
          >
            Print
          </Button>
          <IconButton onClick={handleMenuClick} sx={{ ml: 1 }}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Archive sx={{ mr: 1, fontSize: 18 }} /> Archive Supplier
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <CloudDownload sx={{ mr: 1, fontSize: 18 }} /> Export Data
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Delete sx={{ mr: 1, fontSize: 18 }} /> Delete Supplier
            </MenuItem>
          </Menu>
        </Box>

        {/* Profile Header with Gradient Background */}
        <GlassCard elevation={0} sx={{ mb: 3, overflow: "hidden" }}>
          <Box
            sx={{
              height: 150,
              background: "linear-gradient(135deg, #FF9800 0%, #FF5722 100%)",
              position: "relative",
              mb: -10,
              borderRadius: "16px 16px 0 0",
            }}
          />

          <Box sx={{ px: 4, pb: 3, position: "relative", zIndex: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                position: "relative",
              }}
            >
              <Avatar
                src={
                  supplierWithBillPay?.data?.supplier?.company_logo ||
                  "/placeholder.svg?height=150&width=150"
                }
                alt={
                  supplierWithBillPay?.data?.supplier?.full_name || "Supplier"
                }
                sx={{
                  width: 150,
                  height: 150,
                  border: "5px solid white",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  mt: -10,
                }}
              />

              <Box sx={{ ml: 3, mt: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h4" fontWeight="bold">
                    {supplierWithBillPay?.data?.supplier?.full_name ||
                      "Loading..."}
                  </Typography>
                  <StatusChip
                    icon={getStatusIcon(
                      supplierWithBillPay?.data?.supplier?.supplier_status ||
                        "Pending"
                    )}
                    label={
                      supplierWithBillPay?.data?.supplier?.supplier_status ||
                      "Pending"
                    }
                    size="small"
                    statuscolor={getStatusColor(
                      supplierWithBillPay?.data?.supplier?.supplier_status ||
                        "Pending"
                    )}
                    sx={{ ml: 2 }}
                  />
                  <Tooltip title="Verified Supplier">
                    <VerifiedUser sx={{ ml: 1, color: "#2196f3" }} />
                  </Tooltip>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
                >
                  <Category sx={{ fontSize: 18, mr: 0.5, color: "#757575" }} />
                  <span style={{ color: "#757575" }}>
                    {supplierWithBillPay?.data?.supplier?.vendor || "Supplier"}
                  </span>
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <StyledRating
                    name="supplier-rating"
                    value={
                      supplierWithBillPay?.data?.supplier?.supplier_rating || 0
                    }
                    precision={0.1}
                    readOnly
                    icon={<Star fontSize="inherit" />}
                    emptyIcon={<StarBorder fontSize="inherit" />}
                  />
                  <Typography variant="body2" sx={{ ml: 1, color: "#757575" }}>
                    ({supplierWithBillPay?.data?.supplier?.supplier_rating || 0}
                    )
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  ml: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  mt: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    sx={{
                      borderRadius: 20,
                      px: 3,
                      background:
                        "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                      boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                      mr: 1,
                    }}
                  >
                    New Order
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Message />}
                    sx={{
                      borderRadius: 20,
                      px: 3,
                      backgroundColor: "#4CAF50",
                      "&:hover": {
                        backgroundColor: "#388E3C",
                      },
                    }}
                  >
                    Message
                  </Button>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Chip
                    icon={<Phone fontSize="small" />}
                    label={
                      supplierWithBillPay?.data?.supplier?.phone_number || "N/A"
                    }
                    variant="outlined"
                    sx={{ mr: 1, borderRadius: 20 }}
                    onClick={() => {}}
                  />
                  <Chip
                    icon={<Email fontSize="small" />}
                    label={supplierWithBillPay?.data?.supplier?.email || "N/A"}
                    variant="outlined"
                    sx={{ borderRadius: 20 }}
                    onClick={() => {}}
                  />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                mt: 4,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ mr: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Supplier ID
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {supplierWithBillPay?.data?.supplier?.supplierId || "N/A"}
                  </Typography>
                </Box>
                <Box sx={{ mr: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Joined
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {supplierWithBillPay?.data?.supplier?.createdAt
                      ? new Date(
                          supplierWithBillPay?.data.supplier.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Tax ID
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {supplierWithBillPay?.data?.supplier?.tax_id || "N/A"}
                  </Typography>
                </Box>
              </Box>

              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ mr: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Credit Limit
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    $
                    {supplierWithBillPay?.data?.supplier?.credit_limit?.toLocaleString() ||
                      "0"}
                  </Typography>
                </Box>
                <Box sx={{ mr: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Available Credit
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="medium"
                    color={
                      (supplierWithBillPay?.data?.supplier?.credit_limit || 0) <
                      5000
                        ? "error.main"
                        : "inherit"
                    }
                  >
                    $
                    {(
                      supplierWithBillPay?.data?.supplier?.credit_limit || 0
                    ).toLocaleString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Payment Terms
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {supplierWithBillPay?.data?.supplier?.payment_terms ||
                      "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </GlassCard>

        {/* Key Metrics */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <GradientBox gradientColors="#4CAF50 0%, #8BC34A 100%">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  Total Orders
                </Typography>
                <LocalShippingOutlined sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", color: "white", my: 1 }}
              >
                {supplierWithBillPay?.data?.paymentStats?.totalPayments || 0}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ArrowUpward sx={{ color: "white", fontSize: 16, mr: 0.5 }} />
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.9)" }}
                >
                  12% increase from last month
                </Typography>
              </Box>
            </GradientBox>
          </Grid>
          <Grid item xs={12} md={3}>
            <GradientBox gradientColors="#2196F3 0%, #03A9F4 100%">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  Products
                </Typography>
                <InventoryOutlined sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", color: "white", my: 1 }}
              >
                243
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ArrowUpward sx={{ color: "white", fontSize: 16, mr: 0.5 }} />
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.9)" }}
                >
                  5 new products this month
                </Typography>
              </Box>
            </GradientBox>
          </Grid>
          <Grid item xs={12} md={3}>
            <GradientBox gradientColors="#FF9800 0%, #FFC107 100%">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  Total Spent
                </Typography>
                <ReceiptLongOutlined sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", color: "white", my: 1 }}
              >
                $
                {supplierWithBillPay?.data?.paymentStats?.totalAmount?.toLocaleString() ||
                  "0"}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ArrowUpward sx={{ color: "white", fontSize: 16, mr: 0.5 }} />
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.9)" }}
                >
                  $
                  {supplierWithBillPay?.data?.paymentStats?.paidAmount?.toLocaleString() ||
                    "0"}{" "}
                  paid
                </Typography>
              </Box>
            </GradientBox>
          </Grid>
          <Grid item xs={12} md={3}>
            <GradientBox gradientColors="#9C27B0 0%, #673AB7 100%">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  Performance
                </Typography>
                <AssessmentOutlined sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", color: "white", my: 1 }}
              >
                91%
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ArrowUpward sx={{ color: "white", fontSize: 16, mr: 0.5 }} />
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.9)" }}
                >
                  3% improvement from last quarter
                </Typography>
              </Box>
            </GradientBox>
          </Grid>
        </Grid>

        {/* Tabs Navigation */}
        <Box sx={{ mb: 3 }}>
          <StyledTabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#2196f3",
              },
            }}
          >
            <StyledTab icon={<Dashboard sx={{ mb: 0.5 }} />} label="Overview" />
            <StyledTab
              icon={<LocalShipping sx={{ mb: 0.5 }} />}
              label="Orders"
            />
            <StyledTab icon={<Inventory sx={{ mb: 0.5 }} />} label="Products" />
            <StyledTab icon={<Payments sx={{ mb: 0.5 }} />} label="Bill Pay" />
            <StyledTab icon={<Payments sx={{ mb: 0.5 }} />} label="Payments" />
            <StyledTab
              icon={<Description sx={{ mb: 0.5 }} />}
              label="Documents"
            />
            <StyledTab
              icon={<Assessment sx={{ mb: 0.5 }} />}
              label="Performance"
            />
            <StyledTab icon={<Star sx={{ mb: 0.5 }} />} label="Reviews" />
          </StyledTabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ display: tabValue === 0 ? "block" : "none" }}>
          <ProfileOverview supplierWithBillPay={supplierWithBillPay?.data} />
        </Box>

        {/* Orders Tab Content */}
        <Box sx={{ display: tabValue === 1 ? "block" : "none" }}>
          <OrderTable />
        </Box>

        {/* Footer */}
        <Box sx={{ display: tabValue === 2 ? "block" : "none" }}>
          <SupplierProduct />
        </Box>
        <Box sx={{ display: tabValue === 3 ? "block" : "none" }}>
          <SupplierBillPay supplierWithBillPay={supplierWithBillPay?.data} />
        </Box>
        <Box sx={{ display: tabValue === 4 ? "block" : "none" }}>
          {/* Payments Tab Content */}
          <GlassCard>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Payments History
            </Typography>
            <Typography variant="body1">
              Payments content will be displayed here.
            </Typography>
          </GlassCard>
        </Box>

        <Box sx={{ display: tabValue === 5 ? "block" : "none" }}>
          {/* Documents Tab Content */}
          <GlassCard>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Documents
            </Typography>
            <Typography variant="body1">
              Documents content will be displayed here.
            </Typography>
          </GlassCard>
        </Box>

        <Box sx={{ display: tabValue === 6 ? "block" : "none" }}>
          {/* Performance Tab Content */}
          <GlassCard>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Performance Metrics
            </Typography>
            <Typography variant="body1">
              Performance content will be displayed here.
            </Typography>
          </GlassCard>
        </Box>

        <Box sx={{ display: tabValue === 7 ? "block" : "none" }}>
          {/* Reviews Tab Content */}
          <GlassCard>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Customer Reviews
            </Typography>
            <Typography variant="body1">
              Reviews content will be displayed here.
            </Typography>
          </GlassCard>
        </Box>
      </Box>

      {/* Dialogs */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {dialogType === "newOrder" && "Create New Order"}
          {dialogType === "newItem" && "Add New Inventory Item"}
          {dialogType === "newPayment" && "Record New Payment"}
        </DialogTitle>
        <DialogContent>
          {dialogType === "newOrder" && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Order Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Expected Delivery Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Notes" multiline rows={3} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Order Items
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Unit Price</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <TextField
                            select
                            fullWidth
                            size="small"
                            label="Select Item"
                          >
                            {inventoryItems.map((item) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            size="small"
                            defaultValue={1}
                            inputProps={{ min: 1 }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            size="small"
                            defaultValue={0}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            }}
                          />
                        </TableCell>
                        <TableCell>$0.00</TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <Delete fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button startIcon={<Add />} sx={{ mt: 1 }}>
                  Add Item
                </Button>
              </Grid>
            </Grid>
          )}

          {dialogType === "newItem" && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField label="Item Name" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField select label="Category" fullWidth>
                  {supplierData.categories.map((category, index) => (
                    <MenuItem key={index} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Price"
                  type="number"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Current Stock" type="number" fullWidth />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Minimum Stock" type="number" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Description" multiline rows={3} fullWidth />
              </Grid>
            </Grid>
          )}

          {dialogType === "newPayment" && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Payment Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField select label="Reference Order" fullWidth>
                  {recentOrders.map((order) => (
                    <MenuItem key={order.id} value={order.id}>
                      {order.id} - ${order.amount}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Amount"
                  type="number"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField select label="Payment Method" fullWidth>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  <MenuItem value="Credit Card">Credit Card</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Check">Check</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Notes" multiline rows={3} fullWidth />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              handleCloseDialog();
              showSnackbar(
                `${
                  dialogType === "newOrder"
                    ? "Order"
                    : dialogType === "newItem"
                    ? "Item"
                    : "Payment"
                } created successfully!`
              );
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
