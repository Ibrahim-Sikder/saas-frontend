"use client";
import { useState, useEffect } from "react";
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
  Grid,
  InputAdornment,
  Card,
  CardContent,
  Avatar,
  Tooltip,
  Zoom,
  LinearProgress,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  TextField,
} from "@mui/material";
import {
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  NavigateNext as NavigateNextIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  Warehouse as WarehouseIcon,
  LocationOn as LocationOnIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Inventory as InventoryIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { useJsApiLoader } from "@react-google-maps/api";

import {
  useDeleteWarehouseMutation,
  useGetAllWarehousesQuery,
} from "../../redux/api/warehouseApi";
import swal from "sweetalert";
import ViewWarehouseDetails from "./Warehouse/WarehouseDetailsModal";
import AddWarehouseModal from "./Warehouse/AddWarehouse";

const warehouseTypes = [
  { value: "primary", label: "Primary Warehouse" },
  { value: "secondary", label: "Secondary Warehouse" },
  { value: "showroom", label: "Showroom" },
  { value: "service", label: "Service Center" },
  { value: "distribution", label: "Distribution Center" },
];

export default function WarehouseManagementBangladesh() {
  const theme = useTheme();
  const [warehouses, setWarehouses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editWarehouseId, setEditWarehouseId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
    const tenantDomain = window.location.hostname.split(".")[0];

  const { data: warehouseData, isLoading: isDataLoading } =
    useGetAllWarehousesQuery({tenantDomain});
  const [deleteWarehouse] = useDeleteWarehouseMutation();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 23.8103, lng: 90.4125 });

  // Google Maps API loading
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY",
  });

  // Set loading state based on API loading
  useEffect(() => {
    setLoading(isDataLoading);
  }, [isDataLoading]);

  // Update warehouses when data is loaded
  useEffect(() => {
    if (warehouseData?.data?.warehouses) {
      setWarehouses(warehouseData.data.warehouses);
    }
  }, [warehouseData]);

  const handleClickOpen = () => {
    setEditWarehouseId(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditWarehouseId(null);
  };

  const handleEditOpen = (id) => {
    setEditWarehouseId(id);
    setOpen(true);
  };

  const handleViewDetails = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setMapCenter({
      lat: Number.parseFloat(warehouse.latitude) || 23.8103,
      lng: Number.parseFloat(warehouse.longitude) || 90.4125,
    });
    setViewDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setViewDetailsOpen(false);
    setSelectedWarehouse(null);
  };

  const handleDeleteWarehouse = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "You want to move this warehouse to Recycle bin?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await deleteWarehouse({tenantDomain,id}).unwrap();
        swal(
          "Move to Recycle bin!",
          "Move to Recycle bin successful.",
          "success"
        );
      } catch (error) {
        swal(
          "Error",
          "An error occurred while deleting the warehouse.",
          "error"
        );
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const refreshData = () => {
    setLoading(true);
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "active":
        return (
          <Chip
            icon={<CheckCircleIcon />}
            label="Active"
            color="success"
            size="small"
            sx={{
              fontWeight: "bold",
              background: alpha(theme.palette.success.main, 0.1),
              "& .MuiChip-icon": { color: theme.palette.success.main },
            }}
          />
        );
      case "inactive":
        return (
          <Chip
            icon={<CancelIcon />}
            label="Inactive"
            color="error"
            size="small"
            sx={{
              fontWeight: "bold",
              background: alpha(theme.palette.error.main, 0.1),
              "& .MuiChip-icon": { color: theme.palette.error.main },
            }}
          />
        );
      default:
        return (
          <Chip
            icon={<CheckCircleIcon />}
            label="Active"
            color="success"
            size="small"
            sx={{
              fontWeight: "bold",
              background: alpha(theme.palette.success.main, 0.1),
              "& .MuiChip-icon": { color: theme.palette.success.main },
            }}
          />
        );
    }
  };

  const getTypeChip = (type) => {
    const typeObj = warehouseTypes.find((t) => t.value === type) || {
      value: type,
      label: type,
    };

    let color;
    switch (type) {
      case "primary":
        color = "primary";
        break;
      case "secondary":
        color = "secondary";
        break;
      case "showroom":
        color = "info";
        break;
      case "service":
        color = "warning";
        break;
      case "distribution":
        color = "success";
        break;
      default:
        color = "default";
    }

    return <Chip label={typeObj.label} color={color} size="small" />;
  };


  // Calculate summary statistics
  const summaryStats = {
    totalWarehouses: warehouses.length,
    activeWarehouses: warehouses.filter((w) => w.status === "active").length,
    totalItems: warehouses.reduce((sum, w) => sum + (w.totalItems || 0), 0),
    totalValue: warehouses.reduce((sum, w) => sum + (w.totalValue || 0), 0),
  };

  // Format currency in BDT (Bangladeshi Taka)
  const formatBDT = (amount) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Box>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 3, mt: 3, boxShadow:2, py:3 }} 
      >
        <Link
          color="inherit"
          href="/dashboard"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Typography variant="body2">Dashboard</Typography>
        </Link>
        <Link
          color="inherit"
          href="/inventory"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Typography variant="body2">Inventory</Typography>
        </Link>
        <Typography color="text.primary" variant="body2">
          Warehouse Management
        </Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #006a4e 30%, #00a651 90%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            mb: 1,
          }}
        >
          Warehouse Management - Bangladesh
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Manage your warehouses, showrooms, and service centers across
          Bangladesh
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 12px 20px rgba(0, 0, 0, 0.15)",
              },
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: "#006a4e", // Bangladesh flag green
                    width: 48,
                    height: 48,
                    boxShadow: "0 4px 8px rgba(0, 106, 78, 0.3)",
                  }}
                >
                  <WarehouseIcon />
                </Avatar>
                <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>
                  Total Warehouses
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                {loading ? (
                  <LinearProgress sx={{ my: 2 }} />
                ) : (
                  summaryStats.totalWarehouses
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total number of warehouses and locations
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 12px 20px rgba(0, 0, 0, 0.15)",
              },
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: "#4caf50",
                    width: 48,
                    height: 48,
                    boxShadow: "0 4px 8px rgba(76, 175, 80, 0.3)",
                  }}
                >
                  <CheckCircleIcon />
                </Avatar>
                <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>
                  Active Warehouses
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                {loading ? (
                  <LinearProgress sx={{ my: 2 }} />
                ) : (
                  summaryStats.activeWarehouses
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Number of active warehouses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              background: "linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 12px 20px rgba(0, 0, 0, 0.15)",
              },
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: "#ff9800",
                    width: 48,
                    height: 48,
                    boxShadow: "0 4px 8px rgba(255, 152, 0, 0.3)",
                  }}
                >
                  <InventoryIcon />
                </Avatar>
                <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>
                  Total Items
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                {loading ? (
                  <LinearProgress sx={{ my: 2 }} />
                ) : (
                  summaryStats.totalItems.toLocaleString()
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total inventory items across all warehouses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              background: "linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 12px 20px rgba(0, 0, 0, 0.15)",
              },
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: "#f44336", // Red from Bangladesh flag
                    width: 48,
                    height: 48,
                    boxShadow: "0 4px 8px rgba(244, 67, 54, 0.3)",
                  }}
                >
                  <BusinessIcon />
                </Avatar>
                <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>
                  Total Value
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                {loading ? (
                  <LinearProgress sx={{ my: 2 }} />
                ) : (
                  formatBDT(summaryStats.totalValue)
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total inventory value across all warehouses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Warehouse List
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
          sx={{
            borderRadius: 2,
            py: 1,
            px: 3,
            boxShadow: `0 4px 14px ${alpha("#006a4e", 0.4)}`,
            background: `linear-gradient(45deg, #006a4e 30%, #00a651 90%)`, // Bangladesh flag green colors
            transition: "transform 0.2s",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: `0 6px 20px ${alpha("#006a4e", 0.6)}`,
            },
          }}
        >
          Add New Warehouse
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: "linear-gradient(to right, #f5f7fa, #e4e7eb)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Filters and Search
          </Typography>
          <Box>
            <Tooltip title="Show/Hide Filters">
              <IconButton onClick={() => setShowFilters(!showFilters)}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh">
              <IconButton onClick={refreshData}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <TextField
          variant="outlined"
          placeholder="Search warehouses by name, code, address, or manager..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "white",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              },
              "&.Mui-focused": {
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {showFilters && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "white",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "white",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                <InputLabel>Type</InputLabel>
                <Select
                  value={typeFilter}
                  label="Type"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  {warehouseTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}
      </Paper>

      {loading ? (
        <Paper sx={{ p: 5, borderRadius: 2, textAlign: "center" }}>
          <LinearProgress sx={{ mb: 2 }} />
          <Typography>Loading warehouse data...</Typography>
        </Paper>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow
                sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.1) }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Code</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Manager</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Items
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Value
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {warehouseData?.data?.warehouses?.map((warehouse) => (
                <TableRow
                  key={warehouse?._id}
                  sx={{
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    },
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <TableCell>
                    <Chip
                      label={warehouse?.code}
                      size="small"
                      sx={{
                        fontWeight: "medium",
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: "medium" }}>
                    {warehouse?.name}
                  </TableCell>
                  <TableCell>{getTypeChip(warehouse?.type)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationOnIcon
                        fontSize="small"
                        sx={{ mr: 0.5, color: "text.secondary" }}
                      />
                      <Typography variant="body2">{`${warehouse?.city}, ${warehouse?.division}`}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <PersonIcon
                        fontSize="small"
                        sx={{ mr: 0.5, color: "text.secondary" }}
                      />
                      <Typography variant="body2">
                        {warehouse?.manager}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {warehouse?.totalItems
                      ? warehouse.totalItems.toLocaleString()
                      : "0"}
                  </TableCell>
                  <TableCell align="right">
                    {formatBDT(warehouse?.totalValue || 0)}
                  </TableCell>
                  <TableCell>{getStatusChip(warehouse?.status)}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Details" TransitionComponent={Zoom}>
                      <IconButton
                        size="small"
                        onClick={() => handleViewDetails(warehouse)}
                        sx={{
                          color: theme.palette.primary.main,
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.1
                          ),
                          mr: 1,
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.2
                            ),
                          },
                        }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit" TransitionComponent={Zoom}>
                      <IconButton
                        size="small"
                        onClick={() => handleEditOpen(warehouse._id)}
                        sx={{
                          color: theme.palette.warning.main,
                          backgroundColor: alpha(
                            theme.palette.warning.main,
                            0.1
                          ),
                          mr: 1,
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.warning.main,
                              0.2
                            ),
                          },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" TransitionComponent={Zoom}>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteWarehouse(warehouse._id)}
                        sx={{
                          color: theme.palette.error.main,
                          backgroundColor: alpha(theme.palette.error.main, 0.1),
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.error.main,
                              0.2
                            ),
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Warehouse Dialog */}
      <AddWarehouseModal
        open={open}
        onClose={handleClose}
        warehouseId={editWarehouseId}
      />

      {/* View Warehouse Details Dialog */}
      <ViewWarehouseDetails
        open={viewDetailsOpen}
        onClose={handleCloseDetails}
        warehouse={selectedWarehouse}
        isLoaded={isLoaded}
        mapCenter={mapCenter}
        getTypeChip={getTypeChip}
        getStatusChip={getStatusChip}
        formatBDT={formatBDT}
        onEdit={handleEditOpen}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
