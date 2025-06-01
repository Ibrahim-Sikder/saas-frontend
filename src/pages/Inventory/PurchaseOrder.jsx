/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Breadcrumbs,
  Link,
  Chip,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  Avatar,
  useTheme,
  alpha,
  Tooltip,
  Divider,
  LinearProgress,
  Pagination,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PrintIcon from "@mui/icons-material/Print";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PurchaseOrderModal from "./PurchaseModal";
import {
  useDeletePurchaseOrderMutation,
  useGetAllPurchaseOrdersQuery,
} from "../../redux/api/purchaseOrderApi";
import UpdatePurchaseOrderModal from "./UpdatePurchaseOrderModal";


export default function PurchaseOrdersPage() {
  const theme = useTheme();
  const router = useNavigate();
  const [purchaseOrders, setPurchaseOrders] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openReceiveDialog, setOpenReceiveDialog] = useState(false);
  const [receiveDate, setReceiveDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [search, setSearch] = useState("");

  const [receiveStatus, setReceiveStatus] = useState("received");
  const [receiveNote, setReceiveNote] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [deletePurchase] = useDeletePurchaseOrderMutation();
  const { data: purchaseOrderData, refetch } = useGetAllPurchaseOrdersQuery({
    limit: 10,
    page,
    searchTerm: search,
  });

  
  const [openPurchaseModal, setOpenPurchaseModal] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handlePurchaseClose = () => setOpenPurchaseModal(false);


  const handleMenuOpen = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleViewOrder = () => {
    if (selectedOrder) {
      setIsLoading(true);
      setTimeout(() => {
        router.push(`/purchase/${selectedOrder.id}`);
        setIsLoading(false);
      }, 300);
    }
    handleMenuClose();
  };

  const handleEditOrder = () => {
    if (selectedOrder) {
      setOpen(true);

      setAnchorEl(null);
    }
  };

  const handleDeleteOrder = async () => {
    if (selectedOrder) {
      try {
        const res = await deletePurchase(selectedOrder._id).unwrap();
        if (res.success) {
          toast.success("Purchase order deleted successfully!");
          refetch(); 
        }
      } catch (error) {
        toast.error("Failed to delete purchase order");
        console.error(error);
      }
    }
    handleMenuClose();
  };

  const handleAddOrder = () => {
    setOpenPurchaseModal(true);
  };

  const handleOpenReceiveDialog = () => {
    setOpenReceiveDialog(true);
    handleMenuClose();
  };

  const handleCloseReceiveDialog = () => {
    setOpenReceiveDialog(false);
  };

  const handleReceiveOrder = () => {
    
  };

  const handleSavePurchaseOrder = (purchaseData) => {
   
  
  };

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange({
      ...dateRange,
      [name]: value,
    });
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };



  // Get avatar color based on supplier initial
  const getAvatarColor = (initial) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.error.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.success.main,
    ];

    // Simple hash function to get consistent color for same initial
    const charCode = initial.charCodeAt(0);
    return colors[charCode % colors.length];
  };



  // Add this function to handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(to bottom, ${alpha(
          theme.palette.primary.light,
          0.05
        )}, ${alpha(theme.palette.background.default, 1)})`,
        minHeight: "100vh",
        p: 1,
        borderRadius: 2,
        mt:2
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          mb: 3,
          "& .MuiBreadcrumbs-ol": {
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            p: 1,
            borderRadius: 1,
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          },
        }}
      >
        <Link
          color="inherit"
          href="/dashboard"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
          Dashboard
        </Link>
        <Link
          color="inherit"
          href="/purchase"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <ShoppingCartIcon sx={{ mr: 0.5, fontSize: 18 }} />
          Purchase
        </Link>
        <Typography
          color="text.primary"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <ReceiptIcon sx={{ mr: 0.5, fontSize: 18 }} />
          Purchase Orders
        </Typography>
      </Breadcrumbs>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "center",
          backgroundColor: theme.palette.background.paper,
          p: 2,
          borderRadius: 2,
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{
            m: 0,
            fontWeight: "bold",
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Purchase Orders
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddOrder}
          sx={{
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            transition: "all 0.3s",
            "&:hover": {
              boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
              transform: "translateY(-2px)",
            },
          }}
        >
          New Order
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
              },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.primary.light,
                  0.2
                )}, ${alpha(theme.palette.primary.main, 0.05)})`,
                p: 3,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: 56,
                  height: 56,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: 30 }} />
              </Avatar>
              <Box sx={{ ml: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {purchaseOrderData?.data?.meta?.total || 0}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: "medium" }}
                >
                  Total Orders
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
              },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.warning.light,
                  0.2
                )}, ${alpha(theme.palette.warning.main, 0.05)})`,
                p: 3,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.warning.main,
                  width: 56,
                  height: 56,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                }}
              >
                <LocalShippingIcon sx={{ fontSize: 30 }} />
              </Avatar>
              <Box sx={{ ml: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {purchaseOrderData?.data?.orders?.filter(order => order.status === "Pending").length || 0}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: "medium" }}
                >
                  Pending Orders
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
              },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.info.light,
                  0.2
                )}, ${alpha(theme.palette.info.main, 0.05)})`,
                p: 3,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.info.main,
                  width: 56,
                  height: 56,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                }}
              >
                <CheckIcon sx={{ fontSize: 30 }} />
              </Avatar>
              <Box sx={{ ml: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {purchaseOrderData?.data?.orders?.filter(order => order.status === "Approved").length || 0}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: "medium" }}
                >
                  Confirmed Orders
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
              },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.success.light,
                  0.2
                )}, ${alpha(theme.palette.success.main, 0.05)})`,
                p: 3,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.success.main,
                  width: 56,
                  height: 56,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                }}
              >
                <InventoryIcon sx={{ fontSize: 30 }} />
              </Avatar>
              <Box sx={{ ml: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {purchaseOrderData?.data?.orders?.filter(order => order.status === "Shipped").length || 0}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: "medium" }}
                >
                  Shipped Orders
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper
        sx={{
          p: 1,
          mb: 3,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 2,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FilterListIcon sx={{ mr: 1 }} />
          Filter Options
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2 },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  name="startDate"
                  value={dateRange.startDate}
                  onChange={handleDateRangeChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 2 },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  name="endDate"
                  value={dateRange.endDate}
                  onChange={handleDateRangeChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 2 },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Status Filter */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <FormControl fullWidth>
          <InputLabel>Status Filter</InputLabel>
          <Select
            value={filterStatus}
            label="Status Filter"
            onChange={(e) => setFilterStatus(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="shipped">Shipped</MenuItem>
            <MenuItem value="received">Received</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2, gap: 1 }}>
        <Tooltip title="Export">
          <Button
            startIcon={<FileDownloadIcon />}
            variant="outlined"
            size="small"
            sx={{ borderRadius: 2 }}
          >
            Export
          </Button>
        </Tooltip>
        <Tooltip title="Print">
          <Button
            startIcon={<PrintIcon />}
            variant="outlined"
            size="small"
            sx={{ borderRadius: 2 }}
          >
            Print
          </Button>
        </Tooltip>
        <Tooltip title="Filter">
          <Button
            startIcon={<FilterListIcon />}
            variant="outlined"
            size="small"
            sx={{ borderRadius: 2 }}
          >
            Filter
          </Button>
        </Tooltip>
      </Box>

      {/* Purchase Orders Table */}
      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          mb: 3,
        }}
      >
        {isLoading && <LinearProgress />}

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead
              sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05) }}
            >
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Order No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Supplier</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Items
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Total Amount
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Expected Delivery
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchaseOrderData?.data?.orders?.map((order) => {
         
                return (
                  <TableRow
                    key={order._id}
                    sx={{
                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.04
                        ),
                        cursor: "pointer",
                      },
                      transition: "background-color 0.2s",
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                        {order.referenceNo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CalendarTodayIcon
                          fontSize="small"
                          sx={{
                            mr: 1,
                            color: theme.palette.text.secondary,
                            opacity: 0.7,
                          }}
                        />
                        {new Date(order.orderDate).toLocaleDateString()}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          sx={{
                            width: 30,
                            height: 30,
                            mr: 1,
                            fontSize: "0.875rem",
                            bgcolor: getAvatarColor(
                              order.suppliers?.full_name?.charAt(0) || "U"
                            ),
                          }}
                        >
                          {order.suppliers?.full_name?.charAt(0) || "U"}
                        </Avatar>
                        {order.suppliers?.full_name || "Unknown Supplier"}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={order.products?.length || 0}
                        size="small"
                        sx={{
                          fontWeight: "bold",
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.1
                          ),
                          color: theme.palette.primary.main,
                          borderRadius: "6px",
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography sx={{ fontWeight: "bold" }}>
                        $ {order.grandTotal?.toLocaleString() || 0}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={
                          order.status === "Approved"
                            ? "success"
                            : order.status === "Cancelled"
                            ? "error"
                            : order.status === "Pending"
                            ? "warning"
                            : order.status === "Shipped"
                            ? "info"
                            : order.status === "Received"
                            ? "primary"
                            : "default"
                        }
                        size="small"
                        sx={{ fontWeight: "medium", borderRadius: "6px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CalendarTodayIcon
                          fontSize="small"
                          sx={{
                            mr: 1,
                            color: theme.palette.text.secondary,
                            opacity: 0.7,
                          }}
                        />
                        {new Date(
                          order.expectedDeliveryDate
                        ).toLocaleDateString()}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, order)}
                        sx={{
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.1
                          ),
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.2
                            ),
                          },
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 2,
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <Pagination
            count={purchaseOrderData?.data?.meta?.totalPage || 1}
            page={page}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: 1,
              },
            }}
          />
        </Box>
      </Paper>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          },
        }}
      >
        <MenuItem onClick={handleViewOrder} sx={{ py: 1.5 }}>
          <VisibilityIcon
            fontSize="small"
            sx={{ mr: 1, color: theme.palette.primary.main }}
          />
          View Details
        </MenuItem>
        <MenuItem onClick={handleEditOrder} sx={{ py: 1.5 }}>
          <EditIcon
            fontSize="small"
            sx={{ mr: 1, color: theme.palette.warning.main }}
          />
          Edit
        </MenuItem>
        <MenuItem
          onClick={handleOpenReceiveDialog}
          disabled={
            !selectedOrder ||
            selectedOrder.status === "received" ||
            selectedOrder.status === "cancelled"
          }
          sx={{ py: 1.5 }}
        >
          <CheckCircleIcon
            fontSize="small"
            sx={{ mr: 1, color: theme.palette.success.main }}
          />
          Receive
        </MenuItem>
        <MenuItem onClick={handleDeleteOrder} sx={{ py: 1.5 }}>
          <DeleteIcon
            fontSize="small"
            sx={{ mr: 1, color: theme.palette.error.main }}
          />
          Delete
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <PrintIcon
            fontSize="small"
            sx={{ mr: 1, color: theme.palette.info.main }}
          />
          Print
        </MenuItem>
      </Menu>

      {/* Receive Dialog */}
      <Dialog
        open={openReceiveDialog}
        onClose={handleCloseReceiveDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          },
        }}
      >
        <DialogTitle
          sx={{
            pb: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: theme.palette.success.main,
              mr: 2,
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            }}
          >
            <InventoryIcon />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Receive Order
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Receive Date"
                type="date"
                value={receiveDate}
                onChange={(e) => setReceiveDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Receive Status</InputLabel>
                <Select
                  value={receiveStatus}
                  label="Receive Status"
                  onChange={(e) => setReceiveStatus(e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="received">Fully Received</MenuItem>
                  <MenuItem value="partial">Partially Received</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                value={receiveNote}
                onChange={(e) => setReceiveNote(e.target.value)}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleCloseReceiveDialog}
            variant="outlined"
            startIcon={<CancelIcon />}
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleReceiveOrder}
            variant="contained"
            color="primary"
            startIcon={<CheckCircleIcon />}
            sx={{
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            }}
          >
            Confirm Receipt
          </Button>
        </DialogActions>
      </Dialog>

      {/* Purchase Order Modal */}
      <PurchaseOrderModal
        open={openPurchaseModal}
        onClose={handlePurchaseClose}
        onSave={handleSavePurchaseOrder}
      />
      {open && selectedOrder && (
        <UpdatePurchaseOrderModal
          onClose={handleClose}
          open={open}
          orderId={selectedOrder._id}
        />
      )}
    </Box>
  );
}
