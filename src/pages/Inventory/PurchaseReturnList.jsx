/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
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
  Avatar,
  useTheme,
  alpha,
  Tooltip,
  LinearProgress,
  Pagination,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PrintIcon from "@mui/icons-material/Print";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { useNavigate } from "react-router-dom";
import {
  useDeletePurchaseReturnMutation,
  useGetAllPurchaseReturnsQuery,
} from "../../redux/api/purchaseReturnApi";

export default function PurchaseReturnList() {
  const theme = useTheme();
  const router = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterWarehouse, setFilterWarehouse] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const tenantDomain = window.location.hostname.split(".")[0];

  const [search, setSearch] = useState("");
  const [deletePurchaseReturn] = useDeletePurchaseReturnMutation();
  const {
    data: purchaseReturnData,
    isLoading: purchaseLoading,
    refetch,
  } = useGetAllPurchaseReturnsQuery({
    tenantDomain,
    limit: 10,
    page,
    searchTerm: search,
  });

  // Calculate summary statistics from the backend data
  const totalReturns = purchaseReturnData?.data?.meta?.total || 0;

  // Count returns by status
  const pendingReturns =
    purchaseReturnData?.data?.returns?.filter((ret) => ret.status === "pending")
      .length || 0;

  const completedReturns =
    purchaseReturnData?.data?.returns?.filter(
      (ret) => ret.status === "completed"
    ).length || 0;

  const cancelledReturns =
    purchaseReturnData?.data?.returns?.filter(
      (ret) => ret.status === "cancelled"
    ).length || 0;

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedReturn(null);
  };

  const handleViewReturn = () => {
    if (selectedReturn) {
      setIsLoading(true);
      setTimeout(() => {
        router.push(`/purchase/return/${selectedReturn._id}`);
        setIsLoading(false);
      }, 300);
    }
    handleMenuClose();
  };

  const handleEditReturn = () => {
    if (selectedReturn) {
      setIsLoading(true);
      setTimeout(() => {
        router.push(`/purchase/return/edit/${selectedReturn._id}`);
        setIsLoading(false);
      }, 300);
    }
    handleMenuClose();
  };

  const handleDeleteReturn = async () => {
    if (selectedReturn) {
      try {
        setIsLoading(true);
        await deletePurchaseReturn({
          tenantDomain,
          id: selectedReturn._id,
        }).unwrap();
        toast.success("Purchase return deleted successfully!");
        refetch(); // Refresh the data after deletion
      } catch (error) {
        console.error("Failed to delete purchase return:", error);
        toast.error("Failed to delete purchase return");
      } finally {
        setIsLoading(false);
      }
    }
    handleMenuClose();
  };

  const handleAddReturn = () => {
    navigate("/dashboard/purchase-return-add");
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(() => {
      setSearch(e.target.value);
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "pending":
        return (
          <Chip
            label="Pending"
            color="warning"
            size="small"
            sx={{ fontWeight: "medium", borderRadius: "6px" }}
          />
        );
      case "completed":
        return (
          <Chip
            label="Completed"
            color="success"
            size="small"
            sx={{ fontWeight: "medium", borderRadius: "6px" }}
          />
        );
      case "cancelled":
        return (
          <Chip
            label="Cancelled"
            color="error"
            size="small"
            sx={{ fontWeight: "medium", borderRadius: "6px" }}
          />
        );
      default:
        return (
          <Chip
            label="Unknown"
            color="default"
            size="small"
            sx={{ fontWeight: "medium", borderRadius: "6px" }}
          />
        );
    }
  };

  // Get avatar color based on supplier initial
  const getAvatarColor = (initial) => {
    if (!initial) return theme.palette.primary.main;

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

  const statsData = [
    {
      id: 1,
      value: totalReturns,
      title: "Total Returns",
      icon: <AssignmentReturnIcon className="text-[30px]" />,
      gradient: `linear-gradient(135deg, ${alpha(
        theme.palette.primary.light,
        0.2
      )}, ${alpha(theme.palette.primary.main, 0.05)})`,
      avatarColor: theme.palette.primary.main,
    },
    {
      id: 2,
      value: pendingReturns,
      title: "Pending Returns",
      icon: <ReceiptIcon className="text-[30px]" />,
      gradient: `linear-gradient(135deg, ${alpha(
        theme.palette.warning.light,
        0.2
      )}, ${alpha(theme.palette.warning.main, 0.05)})`,
      avatarColor: theme.palette.warning.main,
    },
    {
      id: 3,
      value: completedReturns,
      title: "Completed Returns",
      icon: <AssignmentReturnIcon className="text-[30px]" />,
      gradient: `linear-gradient(135deg, ${alpha(
        theme.palette.success.light,
        0.2
      )}, ${alpha(theme.palette.success.main, 0.05)})`,
      avatarColor: theme.palette.success.main,
    },
    {
      id: 4,
      value: cancelledReturns,
      title: "Cancelled Returns",
      icon: <DeleteIcon className="text-[30px]" />,
      gradient: `linear-gradient(135deg, ${alpha(
        theme.palette.error.light,
        0.2
      )}, ${alpha(theme.palette.error.main, 0.05)})`,
      avatarColor: theme.palette.error.main,
    },
  ];

  return (
    <Box
      sx={{
        background: `linear-gradient(to bottom, ${alpha(
          theme.palette.primary.light,
          0.05
        )}, ${alpha(theme.palette.background.default, 1)})`,
        minHeight: "100vh",
        p: { xs: 0, md: 2 },
        borderRadius: 2,
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
          <AssignmentReturnIcon sx={{ mr: 0.5, fontSize: 18 }} />
          Purchase Returns
        </Typography>
      </Breadcrumbs>

      <div className="flex justify-between mb-3 items-center bg-paper p-2 rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
        <h1
          className="font-bold"
          style={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Purchase Returns
        </h1>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddReturn}
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
          New Return
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 lg:gap-3 mb-6">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className="rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)]"
          >
            <div
              className="flex items-center p-3 md:p-4 lg:py-6 rounded-xl h-full"
              style={{ background: stat.gradient }}
            >
              <div
                className="flex items-center justify-center w-14 h-14 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
                style={{ backgroundColor: stat.avatarColor }}
              >
                {stat.icon}
              </div>
              <div className="ml-4">
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <Paper
        sx={{
          p: 3,
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
              placeholder="Search by return no, purchase no, or supplier..."
              value={searchTerm}
              onChange={handleSearchChange}
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

      {/* Status and Warehouse Filters */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              height: "100%",
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
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              height: "100%",
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Warehouse Filter</InputLabel>
              <Select
                value={filterWarehouse}
                label="Warehouse Filter"
                onChange={(e) => setFilterWarehouse(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Warehouses</MenuItem>
                <MenuItem value="main">Main Warehouse</MenuItem>
                <MenuItem value="secondary">Secondary Warehouse</MenuItem>
                <MenuItem value="workshop">Workshop Storage</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>

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

      {/* Purchase Returns Table */}
      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          mb: 3,
        }}
      >
        {(isLoading || purchaseLoading) && <LinearProgress />}

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead
              sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05) }}
            >
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Return No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Purchase No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Supplier</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Warehouse</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Items
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Amount
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchaseReturnData?.data?.returns?.map((ret) => {

                return (
                  <TableRow
                    key={ret._id}
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
                        {ret.referenceNo}
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
                        {ret.returnDate}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/purchase/${ret.purchaseId}`}
                        color="primary"
                        sx={{ textDecoration: "none" }}
                      >
                        {ret.purchaseId}
                      </Link>
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
                              ret.supplier?.full_name?.charAt(0)
                            ),
                          }}
                        >
                          {ret.supplier?.full_name?.charAt(0) || "?"}
                        </Avatar>
                        {ret.supplier?.full_name ||
                          ret.supplierName ||
                          "Unknown"}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <WarehouseIcon
                          fontSize="small"
                          sx={{
                            mr: 1,
                            color: theme.palette.text.secondary,
                            opacity: 0.7,
                          }}
                        />
                        {ret.warehouse}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={ret.items?.length || 0}
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
                        $ {ret.totalReturnAmount?.toLocaleString() || "0"}
                      </Typography>
                    </TableCell>
                    <TableCell>{getStatusChip(ret.status)}</TableCell>
                    <TableCell align="right">
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <VisibilityIcon
                          fontSize="small"
                          sx={{ mr: 1, color: theme.palette.primary.main }}
                        />

                        <Link
                          href={`/dashboard/purchase-return-update?id=${ret._id}`}
                          passHref
                        >
                          <IconButton
                            component="a"
                            sx={{ color: theme.palette.warning.main }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Link>

                        <DeleteIcon
                          onClick={handleDeleteReturn}
                          fontSize="small"
                          sx={{ mr: 1, color: theme.palette.error.main }}
                        />
                      </Box>
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
            count={purchaseReturnData?.data?.meta?.totalPage || 1}
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
        <MenuItem onClick={handleViewReturn} sx={{ py: 1.5 }}>
          <VisibilityIcon
            fontSize="small"
            sx={{ mr: 1, color: theme.palette.primary.main }}
          />
          View Details
        </MenuItem>
        <MenuItem onClick={handleEditReturn} sx={{ py: 1.5 }}>
          <EditIcon
            fontSize="small"
            sx={{ mr: 1, color: theme.palette.warning.main }}
          />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteReturn} sx={{ py: 1.5 }}>
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

      {/* Toast notifications */}
      <Toaster position="top-right" />
    </Box>
  );
}
