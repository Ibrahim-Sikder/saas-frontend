/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Divider,
  TextField,
  InputAdornment,
  Tooltip,
  Chip,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  alpha,
} from "@mui/material";
import {
  LocalShipping,
  FilterList,
  Add,
  Visibility,
  Edit,
  MoreVert,
  Search,
  Sort,
  CheckCircle,
  Cancel,
  Pending,
  AttachMoney,
  CalendarToday,
  Inventory,
  Timeline,
  ReceiptLong,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled components for unique design
const GlassCard = styled(Paper)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: "blur(10px)",
  borderRadius: 16,
  padding: theme.spacing(3),
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 12,
  "& .MuiTableCell-head": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    fontWeight: "bold",
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
  "& .MuiTableRow-root": {
    "&:nth-of-type(odd)": {
      backgroundColor: alpha(theme.palette.background.default, 0.04),
    },
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
    },
  },
}));

const StatusChip = styled(Chip)(({ theme, statuscolor }) => ({
  fontWeight: 600,
  borderRadius: 12,
  padding: "4px 8px",
  backgroundColor: alpha(statuscolor, 0.1),
  color: statuscolor,
  border: `1px solid ${statuscolor}`,
  "& .MuiChip-icon": {
    color: "inherit",
  },
}));

const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

const OrderTable = ({ orderData }) => {
  const theme = useTheme();
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
  const [sortMenuAnchor, setSortMenuAnchor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogAction, setDialogAction] = useState("");

  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };

  const handleSortMenuOpen = (event) => {
    setSortMenuAnchor(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setSortMenuAnchor(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenDialog = (action, order = null) => {
    setDialogAction(action);
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return theme.palette.success.main;
      case "Pending":
        return theme.palette.warning.main;
      case "Cancelled":
        return theme.palette.error.main;
      case "Paid":
        return theme.palette.success.main;
      case "Unpaid":
        return theme.palette.error.main;
      default:
        return theme.palette.info.main;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
      case "Paid":
        return <CheckCircle fontSize="small" />;
      case "Pending":
      case "Unpaid":
        return <Pending fontSize="small" />;
      case "Cancelled":
        return <Cancel fontSize="small" />;
      default:
        return null;
    }
  };

  // Format date to YYYY-MM-DD
  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  // Calculate total items in order
  const calculateTotalItems = (products) => {
    return products.reduce((total, product) => total + product.quantity, 0);
  };

  // Filter orders based on search term
  const filteredOrders = orderData?.filter(
    (order) =>
      order?.referenceNo
        ?.toString()
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase()) ||
      order?.status?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      order?.paymentStatus?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <GlassCard>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <LocalShipping sx={{ mr: 1, color: theme.palette.primary.main }} />
          Purchase Orders
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            size="small"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mr: 2, width: 200 }}
          />
          <Tooltip title="Filter orders">
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{ mr: 1, borderRadius: 20 }}
              onClick={handleFilterMenuOpen}
            >
              Filter
            </Button>
          </Tooltip>
          <Menu
            anchorEl={filterMenuAnchor}
            open={Boolean(filterMenuAnchor)}
            onClose={handleFilterMenuClose}
          >
            <MenuItem>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Delivered"
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Pending"
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Cancelled"
              />
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleFilterMenuClose}>Apply Filters</MenuItem>
          </Menu>
          <Tooltip title="Sort orders">
            <Button
              variant="outlined"
              startIcon={<Sort />}
              sx={{ mr: 1, borderRadius: 20 }}
              onClick={handleSortMenuOpen}
            >
              Sort
            </Button>
          </Tooltip>
          <Menu
            anchorEl={sortMenuAnchor}
            open={Boolean(sortMenuAnchor)}
            onClose={handleSortMenuClose}
          >
            <MenuItem onClick={handleSortMenuClose}>
              Date (Newest First)
            </MenuItem>
            <MenuItem onClick={handleSortMenuClose}>
              Date (Oldest First)
            </MenuItem>
            <MenuItem onClick={handleSortMenuClose}>
              Amount (High to Low)
            </MenuItem>
            <MenuItem onClick={handleSortMenuClose}>
              Amount (Low to High)
            </MenuItem>
          </Menu>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              borderRadius: 20,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
              boxShadow: `0 3px 5px 2px ${alpha(
                theme.palette.primary.main,
                0.3
              )}`,
            }}
            onClick={() => handleOpenDialog("create")}
          >
            Create Order
          </Button>
        </Box>
      </Box>

      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reference No</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders?.map((order) => (
              <TableRow key={order._id}>
                <TableCell sx={{ fontWeight: "medium" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ReceiptLong
                      sx={{ mr: 1, color: theme.palette.primary.main }}
                    />
                    {order.referenceNo}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarToday
                      sx={{ mr: 1, color: theme.palette.text.secondary }}
                    />
                    {formatDate(order.orderDate)}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Inventory sx={{ mr: 1, color: theme.palette.info.main }} />
                    {calculateTotalItems(order.products)}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AttachMoney sx={{ color: theme.palette.success.main }} />
                    {order.grandTotal.toLocaleString()}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Timeline
                      sx={{ mr: 1, color: theme.palette.secondary.main }}
                    />
                    {formatDate(order.expectedDeliveryDate)}
                  </Box>
                </TableCell>
                <TableCell>
                  <StatusChip
                    icon={getStatusIcon(order.status)}
                    label={order.status}
                    size="small"
                    statuscolor={getStatusColor(order.status)}
                  />
                </TableCell>
                <TableCell>
                  <StatusChip
                    icon={getStatusIcon(order.paymentStatus)}
                    label={order.paymentStatus}
                    size="small"
                    statuscolor={getStatusColor(order.paymentStatus)}
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="View Order">
                    <AnimatedIconButton
                      size="small"
                      onClick={() => handleOpenDialog("view", order)}
                    >
                      <Visibility fontSize="small" />
                    </AnimatedIconButton>
                  </Tooltip>
                  <Tooltip title="Edit Order">
                    <AnimatedIconButton
                      size="small"
                      onClick={() => handleOpenDialog("edit", order)}
                    >
                      <Edit fontSize="small" />
                    </AnimatedIconButton>
                  </Tooltip>
                  <Tooltip title="More Options">
                    <AnimatedIconButton size="small">
                      <MoreVert fontSize="small" />
                    </AnimatedIconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* Order Action Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {dialogAction === "create" && "Create New Order"}
          {dialogAction === "edit" && "Edit Order"}
          {dialogAction === "view" && "Order Details"}
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                Reference No: {selectedOrder.referenceNo}
              </Typography>
              <Typography variant="body1">
                Order Date: {formatDate(selectedOrder.orderDate)}
              </Typography>
              <Typography variant="body1">
                Items: {calculateTotalItems(selectedOrder.products)}
              </Typography>
              <Typography variant="body1">
                Amount: ${selectedOrder.grandTotal.toLocaleString()}
              </Typography>
              <Typography variant="body1">
                Delivery Date: {formatDate(selectedOrder.expectedDeliveryDate)}
              </Typography>
              <Typography variant="body1">
                Status: {selectedOrder.status}
              </Typography>
              <Typography variant="body1">
                Payment Status: {selectedOrder.paymentStatus}
              </Typography>
              <Typography variant="body1">
                Payment Method: {selectedOrder.paymentMethod}
              </Typography>
              <Typography variant="body1">
                Note: {selectedOrder.note}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {dialogAction !== "view" && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseDialog}
            >
              {dialogAction === "create" ? "Create" : "Save"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </GlassCard>
  );
};

export default OrderTable;
