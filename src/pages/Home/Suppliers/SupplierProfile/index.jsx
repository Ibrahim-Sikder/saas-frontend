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
import {
  useGetSingleSupplierQuery,
  useGetSupplierWithBillPayQuery,
} from "../../../../redux/api/supplier";
import SupplierBillPay from "./SupplierBillPay";
import { useTenantDomain } from "../../../../hooks/useTenantDomain";
import PurchaseOrderModal from "../../../Inventory/PurchaseModal";

export default function EnhancedSupplierProfile() {
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const id = new URLSearchParams(location.search).get("id");
  const tenantDomain = useTenantDomain();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handlePurchaseClose = () => setOpen(false);
  const { data: supplierWithBillPay } = useGetSupplierWithBillPayQuery({
    tenantDomain,
    id,
  });
  const { data: singleSupplierResponse } = useGetSingleSupplierQuery({
    tenantDomain,
    id,
  });

  // Extract the supplier data from the response
  const singleSupplier = singleSupplierResponse?.data;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getStatusColor = (status) => {
    if (
      status === "Active" ||
      status === "active" ||
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
      status === "active" ||
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

  if (!supplierWithBillPay || !singleSupplier) {
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
                  singleSupplier?.company_logo ||
                  "/placeholder.svg?height=150&width=150"
                }
                alt={singleSupplier?.full_name || "Supplier"}
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
                    {singleSupplier?.full_name || "Loading..."}
                  </Typography>
                  <StatusChip
                    icon={getStatusIcon(
                      singleSupplier?.supplier_status || "Pending"
                    )}
                    label={singleSupplier?.supplier_status || "Pending"}
                    size="small"
                    statuscolor={getStatusColor(
                      singleSupplier?.supplier_status || "Pending"
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
                    {singleSupplier?.vendor || "Supplier"}
                  </span>
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <StyledRating
                    name="supplier-rating"
                    value={singleSupplier?.supplier_rating || 0}
                    precision={0.1}
                    readOnly
                    icon={<Star fontSize="inherit" />}
                    emptyIcon={<StarBorder fontSize="inherit" />}
                  />
                  <Typography variant="body2" sx={{ ml: 1, color: "#757575" }}>
                    ({singleSupplier?.supplier_rating || 0})
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
                  {open && <PurchaseOrderModal
        open={open}
        onClose={handlePurchaseClose}
          tenantDomain={tenantDomain}
      />}
                  <Button
                    onClick={handleOpen}
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
                 
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Chip
                    icon={<Phone fontSize="small" />}
                    label={singleSupplier?.phone_number || "N/A"}
                    variant="outlined"
                    sx={{ mr: 1, borderRadius: 20 }}
                    onClick={() => {}}
                  />
                  <Chip
                    icon={<Email fontSize="small" />}
                    label={singleSupplier?.email || "N/A"}
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
                    {singleSupplier?.supplierId || "N/A"}
                  </Typography>
                </Box>
                <Box sx={{ mr: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Joined
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {singleSupplier?.createdAt
                      ? new Date(singleSupplier.createdAt).toLocaleDateString()
                      : "N/A"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Tax ID
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {singleSupplier?.tax_id || "N/A"}
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
                {singleSupplier?.orders?.length || 0}
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
                {singleSupplier?.products?.length || 0}
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
                ৳
                {supplierWithBillPay?.data?.paymentStats?.totalAmount?.toLocaleString() ||
                  "0"}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ArrowUpward sx={{ color: "white", fontSize: 16, mr: 0.5 }} />
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.9)" }}
                >
                  ৳
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
            {/* <StyledTab icon={<Payments sx={{ mb: 0.5 }} />} label="Payments" /> */}
            {/* <StyledTab
              icon={<Description sx={{ mb: 0.5 }} />}
              label="Documents"
            />
            <StyledTab
              icon={<Assessment sx={{ mb: 0.5 }} />}
              label="Performance"
            />
            <StyledTab icon={<Star sx={{ mb: 0.5 }} />} label="Reviews" /> */}
          </StyledTabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ display: tabValue === 0 ? "block" : "none" }}>
          <ProfileOverview data={singleSupplier} />
        </Box>

        {/* Orders Tab Content */}
        <Box sx={{ display: tabValue === 1 ? "block" : "none" }}>
          <OrderTable orderData={singleSupplier?.orders} />
        </Box>

        {/* Products Tab Content */}
        <Box sx={{ display: tabValue === 2 ? "block" : "none" }}>
          <SupplierProduct productData={singleSupplier?.products} />
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
                                  ৳
                                </InputAdornment>
                              ),
                            }}
                          />
                        </TableCell>
                        <TableCell>৳0.00</TableCell>
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
                      <InputAdornment position="start">৳</InputAdornment>
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
                      {order.id} - ৳{order.amount}
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
                      <InputAdornment position="start">৳</InputAdornment>
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
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
