/* eslint-disable no-unused-vars */
"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
  Rating,
  Drawer,
  List,
  ListItem,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Tabs,
  Tab,
  CircularProgress,
  Fade,
  useTheme,
  alpha,
  Backdrop,
  Snackbar,
  Alert,
  LinearProgress,
  Menu,
  Checkbox,
  useMediaQuery,
} from "@mui/material";
import {
  Search as SearchIcon,
  Close as CloseIcon,
  Add as AddIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  CloudDownload as CloudDownloadIcon,
  Print as PrintIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  StarBorder as StarBorderIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Sort as SortIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";
import {
  AnimatedIconButton,
  GlassCard,
  GradientButton,
  mockSuppliers,
  SearchTextField,
  StatusChip,
  StyledTableCell,
  StyledTableContainer,
  StyledTableHead,
  StyledTableRow,
  SupplierAvatar,
} from "../../../utils/customStyle";
import { useGetAllSuppliersQuery } from "../../../redux/api/supplier";
import { Link } from "react-router-dom";

const WorldClassSupplierList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [filteredSuppliers, setFilteredSuppliers] = useState(mockSuppliers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("full_name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
  const [sortMenuAnchor, setSortMenuAnchor] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRating, setFilterRating] = useState(0);
  const [filterVendor, setFilterVendor] = useState("all");
  const [filterCountry, setFilterCountry] = useState("all");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [actionsMenuAnchor, setActionsMenuAnchor] = useState(null);
  const [viewMode, setViewMode] = useState("table");
  const [tabValue, setTabValue] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const searchInputRef = useRef(null);
  const itemsPerPage = 5;
  const [filterCategory, setFilterCategory] = useState("all");
  const limit = 15;

  const { data: allSuppliers, isLoading: incomeLoading } =
    useGetAllSuppliersQuery({
      limit,
      page: currentPage,
      search: searchTerm,
      category: filterCategory !== "all" ? filterCategory : undefined,
    });

  // Effect to update suppliers when data is fetched
  useEffect(() => {
    if (allSuppliers?.data?.suppliers) {
      setSuppliers(allSuppliers.data.suppliers);
      setFilteredSuppliers(allSuppliers.data.suppliers);
    }
  }, [allSuppliers]);

  // Effect to filter suppliers based on search and filters
  useEffect(() => {
    setLoading(true);

    // Simulate API call delay
    const timer = setTimeout(() => {
      if (!suppliers) {
        setLoading(false);
        return;
      }

      let result = [...suppliers];

      // Apply search filter
      if (searchTerm) {
        result = result.filter(
          (supplier) =>
            supplier.full_name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            supplier.shop_name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            supplier.supplierId
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            supplier.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply status filter
      if (filterStatus !== "all") {
        result = result.filter(
          (supplier) =>
            supplier.supplier_status?.toLowerCase() ===
            filterStatus.toLowerCase()
        );
      }

      // Apply rating filter
      if (filterRating > 0) {
        result = result.filter(
          (supplier) => supplier.supplier_rating >= filterRating
        );
      }

      // Apply vendor filter
      if (filterVendor !== "all") {
        result = result.filter((supplier) =>
          supplier.vendor?.toLowerCase().includes(filterVendor.toLowerCase())
        );
      }

      // Apply country filter
      if (filterCountry !== "all") {
        result = result.filter(
          (supplier) =>
            supplier.country?.toLowerCase() === filterCountry.toLowerCase()
        );
      }

      // Apply sorting
      result.sort((a, b) => {
        let valueA = a[sortBy] || "";
        let valueB = b[sortBy] || "";

        // Handle string comparison
        if (typeof valueA === "string") {
          valueA = valueA.toLowerCase();
          valueB = valueB.toLowerCase();
        }

        if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
        if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });

      setFilteredSuppliers(result);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [
    suppliers,
    searchTerm,
    filterStatus,
    filterRating,
    filterVendor,
    filterCountry,
    sortBy,
    sortOrder,
  ]);

  // Calculate pagination
  const totalPages =
    allSuppliers?.data?.meta?.totalPage ||
    Math.ceil(filteredSuppliers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSuppliers = filteredSuppliers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handlers
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === "asc";
    setSortBy(property);
    setSortOrder(isAsc ? "desc" : "asc");
  };

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

  const handleActionsMenuOpen = (event) => {
    setActionsMenuAnchor(event.currentTarget);
  };

  const handleActionsMenuClose = () => {
    setActionsMenuAnchor(null);
  };

  const handleQuickView = (supplier) => {
    setSelectedSupplier(supplier);
    setQuickViewOpen(true);
  };

  const handleQuickViewClose = () => {
    setQuickViewOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setFilterRating(0);
    setFilterVendor("all");
    setFilterCountry("all");
    setSortBy("full_name");
    setSortOrder("asc");
    setCurrentPage(1);

    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }

    showSnackbar("Filters have been reset", "info");
  };

  const handleDeleteSupplier = (id) => {
    // In a real app, this would be an API call
    setSuppliers(suppliers.filter((supplier) => supplier._id !== id));
    showSnackbar("Supplier moved to recycle bin", "success");
  };

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;

    // In a real app, this would be an API call
    setSuppliers(
      suppliers.filter((supplier) => !selectedRows.includes(supplier._id))
    );
    setSelectedRows([]);
    setSelectAll(false);
    showSnackbar(
      `${selectedRows.length} suppliers moved to recycle bin`,
      "success"
    );
    handleActionsMenuClose();
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedSuppliers.map((supplier) => supplier._id));
    }
    setSelectAll(!selectAll);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleExport = () => {
    setIsExporting(true);

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      showSnackbar("Suppliers exported successfully", "success");
      handleActionsMenuClose();
    }, 2000);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Get unique countries and vendors for filters
  const uniqueCountries = suppliers
    ? [
        ...new Set(
          suppliers.filter((s) => s.country).map((supplier) => supplier.country)
        ),
      ]
    : [];
  const uniqueVendors = suppliers
    ? [
        ...new Set(
          suppliers.filter((s) => s.vendor).map((supplier) => supplier.vendor)
        ),
      ]
    : [];

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return <CheckCircleIcon fontSize="small" />;
      case "inactive":
        return <CancelIcon fontSize="small" />;
      case "pending":
        return <WarningIcon fontSize="small" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (incomeLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [incomeLoading]);

  return (
    <div className="w-full mt-8 px-0 md:px-2">
      <GlassCard>
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
          <h2 className="text-xl md:text-2xl font-bold flex items-center">
            <BusinessIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            Supplier Management
          </h2>

          <div className="md:flex gap-2">
            <GradientButton
              to="/dashboard/add-supplier"
              component={Link}
              startIcon={<AddIcon />}
              color="primary"
            >
              Add Supplier
            </GradientButton>

            <GradientButton
              startIcon={<MoreVertIcon />}
              color="secondary"
              onClick={handleActionsMenuOpen}
              disabled={selectedRows.length === 0 && viewMode === "table"}
            >
              Actions
            </GradientButton>

            <Menu
              anchorEl={actionsMenuAnchor}
              open={Boolean(actionsMenuAnchor)}
              onClose={handleActionsMenuClose}
            >
              <MenuItem onClick={handleExport}>
                <CloudDownloadIcon fontSize="small" sx={{ mr: 1 }} />
                Export Selected
              </MenuItem>
              <MenuItem>
                <PrintIcon fontSize="small" sx={{ mr: 1 }} />
                Print Selected
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={handleBulkDelete}
                sx={{ color: theme.palette.error.main }}
              >
                <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                Delete Selected
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className="mb-2 overflow-x-auto">
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              minWidth: "100%",
              width: "max-content",
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTab-root": {
                minHeight: 48,
                fontWeight: "medium",
                minWidth: "unset",
                px: 2,
              },
            }}
          >
            <Tab
              label="All Suppliers"
              icon={<BusinessIcon />}
              iconPosition="start"
            />
            <Tab
              label="Active"
              icon={<CheckCircleIcon />}
              iconPosition="start"
            />
            <Tab label="Pending" icon={<WarningIcon />} iconPosition="start" />
            <Tab label="Inactive" icon={<CancelIcon />} iconPosition="start" />
          </Tabs>
        </div>

        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
          <SearchTextField
            placeholder="Search suppliers..."
            variant="outlined"
            size="small"
            fullWidth={isMobile}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleSearchChange}
            inputRef={searchInputRef}
          />

          <div className="md:flex gap-2">
            <Tooltip title="Advanced Filters">
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={toggleDrawer(true)}
                sx={{ borderRadius: 20 }}
              >
                Filters
              </Button>
            </Tooltip>

            <Tooltip title="Sort Options">
              <Button
                variant="outlined"
                startIcon={<SortIcon />}
                onClick={handleSortMenuOpen}
                sx={{ borderRadius: 20 }}
              >
                Sort
              </Button>
            </Tooltip>

            <Menu
              anchorEl={sortMenuAnchor}
              open={Boolean(sortMenuAnchor)}
              onClose={handleSortMenuClose}
            >
              <MenuItem
                onClick={() => {
                  handleSort("full_name");
                  handleSortMenuClose();
                }}
              >
                <Typography variant="body2">Name (A-Z)</Typography>
                {sortBy === "full_name" && sortOrder === "asc" && (
                  <ArrowUpwardIcon fontSize="small" sx={{ ml: 1 }} />
                )}
                {sortBy === "full_name" && sortOrder === "desc" && (
                  <ArrowDownwardIcon fontSize="small" sx={{ ml: 1 }} />
                )}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleSort("shop_name");
                  handleSortMenuClose();
                }}
              >
                <Typography variant="body2">Company (A-Z)</Typography>
                {sortBy === "shop_name" && sortOrder === "asc" && (
                  <ArrowUpwardIcon fontSize="small" sx={{ ml: 1 }} />
                )}
                {sortBy === "shop_name" && sortOrder === "desc" && (
                  <ArrowDownwardIcon fontSize="small" sx={{ ml: 1 }} />
                )}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleSort("supplier_rating");
                  handleSortMenuClose();
                }}
              >
                <Typography variant="body2">Rating</Typography>
                {sortBy === "supplier_rating" && sortOrder === "asc" && (
                  <ArrowUpwardIcon fontSize="small" sx={{ ml: 1 }} />
                )}
                {sortBy === "supplier_rating" && sortOrder === "desc" && (
                  <ArrowDownwardIcon fontSize="small" sx={{ ml: 1 }} />
                )}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleSort("annual_revenue");
                  handleSortMenuClose();
                }}
              >
                <Typography variant="body2">Annual Revenue</Typography>
                {sortBy === "annual_revenue" && sortOrder === "asc" && (
                  <ArrowUpwardIcon fontSize="small" sx={{ ml: 1 }} />
                )}
                {sortBy === "annual_revenue" && sortOrder === "desc" && (
                  <ArrowDownwardIcon fontSize="small" sx={{ ml: 1 }} />
                )}
              </MenuItem>
            </Menu>

            <Tooltip title="Reset Filters">
              <IconButton onClick={handleResetFilters} color="primary">
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        {/* Advanced Filter Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              width: 320,
              p: 3,
              background: alpha(theme.palette.background.paper, 0.95),
              backdropFilter: "blur(10px)",
            },
          }}
        >
          <Box sx={{ width: "100%" }} role="presentation">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Advanced Filters
              </Typography>
              <IconButton onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <List>
              <ListItem sx={{ mb: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="all">All Statuses</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>

              <ListItem sx={{ mb: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Vendor Type</InputLabel>
                  <Select
                    value={filterVendor}
                    onChange={(e) => setFilterVendor(e.target.value)}
                    label="Vendor Type"
                  >
                    <MenuItem value="all">All Vendor Types</MenuItem>
                    {uniqueVendors.map((vendor, index) => (
                      <MenuItem key={index} value={vendor}>
                        {vendor}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ListItem>

              <ListItem sx={{ mb: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select
                    value={filterCountry}
                    onChange={(e) => setFilterCountry(e.target.value)}
                    label="Country"
                  >
                    <MenuItem value="all">All Countries</MenuItem>
                    {uniqueCountries.map((country, index) => (
                      <MenuItem key={index} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ListItem>

              <ListItem sx={{ mb: 2 }}>
                <Box sx={{ width: "100%" }}>
                  <Typography gutterBottom>Minimum Rating</Typography>
                  <Rating
                    name="filter-rating"
                    value={filterRating}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setFilterRating(newValue);
                    }}
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  />
                </Box>
              </ListItem>
            </List>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button onClick={handleResetFilters} startIcon={<RefreshIcon />}>
                Reset
              </Button>
              <GradientButton onClick={toggleDrawer(false)}>
                Apply Filters
              </GradientButton>
            </Box>
          </Box>
        </Drawer>

        {/* Selected items info */}
        {selectedRows.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              p: 1,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              borderRadius: 1,
            }}
          >
            <Typography variant="body2">
              {selectedRows.length}{" "}
              {selectedRows.length === 1 ? "supplier" : "suppliers"} selected
            </Typography>
            <Button
              size="small"
              startIcon={<CloseIcon fontSize="small" />}
              onClick={() => {
                setSelectedRows([]);
                setSelectAll(false);
              }}
            >
              Clear selection
            </Button>
          </Box>
        )}

        {/* Loading indicator */}
        {(loading || incomeLoading) && <LinearProgress sx={{ mb: 2 }} />}

        {/* Suppliers Table */}
        {filteredSuppliers.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 5 }}>
            <Typography variant="h6" color="text.secondary">
              No suppliers found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try adjusting your search or filter criteria
            </Typography>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              sx={{ mt: 2 }}
              onClick={handleResetFilters}
            >
              Reset Filters
            </Button>
          </Box>
        ) : (
          <Fade in={!loading}>
            <Box
              sx={{
                width: "100%",
                overflowX: "auto",
                WebkitOverflowScrolling: "touch", 
                "&::-webkit-scrollbar": {
                  height: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.palette.divider,
                  borderRadius: "3px",
                },
              }}
            >
             
                <Table stickyHeader>
                  <StyledTableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectAll}
                          onChange={handleSelectAll}
                          indeterminate={
                            selectedRows.length > 0 &&
                            selectedRows.length < paginatedSuppliers.length
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortBy === "supplierId"}
                          direction={
                            sortBy === "supplierId" ? sortOrder : "asc"
                          }
                          onClick={() => handleSort("supplierId")}
                        >
                          ID
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortBy === "full_name"}
                          direction={sortBy === "full_name" ? sortOrder : "asc"}
                          onClick={() => handleSort("full_name")}
                        >
                          Supplier
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortBy === "shop_name"}
                          direction={sortBy === "shop_name" ? sortOrder : "asc"}
                          onClick={() => handleSort("shop_name")}
                        >
                          Company
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Contact</TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortBy === "supplier_status"}
                          direction={
                            sortBy === "supplier_status" ? sortOrder : "asc"
                          }
                          onClick={() => handleSort("supplier_status")}
                        >
                          Status
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortBy === "supplier_rating"}
                          direction={
                            sortBy === "supplier_rating" ? sortOrder : "asc"
                          }
                          onClick={() => handleSort("supplier_rating")}
                        >
                          Rating
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {paginatedSuppliers.map((supplier) => (
                      <StyledTableRow
                        key={supplier._id}
                        onClick={() => handleQuickView(supplier)}
                        selected={selectedRows.includes(supplier._id)}
                      >
                        <StyledTableCell
                          padding="checkbox"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Checkbox
                            checked={selectedRows.includes(supplier._id)}
                            onChange={() => handleRowSelect(supplier._id)}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          {supplier.supplierId || "N/A"}
                        </StyledTableCell>
                        <StyledTableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <SupplierAvatar
                              src={supplier.profile_image}
                              alt={supplier.full_name}
                            >
                              {supplier.full_name?.charAt(0) || "S"}
                            </SupplierAvatar>
                            <Box sx={{ ml: 2 }}>
                              <Typography variant="body2" fontWeight="medium">
                                {supplier.full_name || "Unknown"}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {supplier.vendor || "N/A"}
                              </Typography>
                            </Box>
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell>
                          {supplier.shop_name || "N/A"}
                        </StyledTableCell>
                        <StyledTableCell>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <PhoneIcon
                                fontSize="small"
                                sx={{
                                  mr: 0.5,
                                  color: theme.palette.text.secondary,
                                }}
                              />
                              {supplier.full_Phone_number ||
                                supplier.phone_number ||
                                "N/A"}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <EmailIcon
                                fontSize="small"
                                sx={{
                                  mr: 0.5,
                                  color: theme.palette.text.secondary,
                                }}
                              />
                              {supplier.email || "N/A"}
                            </Typography>
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell>
                          <StatusChip
                            icon={getStatusIcon(supplier.supplier_status)}
                            label={supplier.supplier_status || "Active"}
                            size="small"
                            status={supplier.supplier_status}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Rating
                              value={supplier.supplier_rating || 0}
                              readOnly
                              precision={0.5}
                              size="small"
                            />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                              ({supplier.supplier_rating || 0})
                            </Typography>
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Tooltip title="View Details">
                            <AnimatedIconButton
                              size="small"
                              to={`/dashboard/supplier-profile?id=${supplier._id}`}
                              component={Link}
                            >
                              <VisibilityIcon fontSize="small" />
                            </AnimatedIconButton>
                          </Tooltip>
                          <Tooltip title="Edit Supplier">
                            <AnimatedIconButton
                              to={`/dashboard/update-supplier?id=${supplier?._id}`}
                              component={Link}
                              size="small"
                            >
                              {" "}
                              <EditIcon fontSize="small" />{" "}
                            </AnimatedIconButton>{" "}
                          </Tooltip>
                          <Tooltip title="Delete Supplier">
                            <AnimatedIconButton
                              size="small"
                              onClick={() => handleDeleteSupplier(supplier._id)}
                              sx={{ color: theme.palette.error.main }}
                            >
                              <DeleteIcon fontSize="small" />
                            </AnimatedIconButton>
                          </Tooltip>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
          
            </Box>
          </Fade>
        )}

        {/* Pagination */}
        {filteredSuppliers.length > 0 && (
          <div className="flex justify-between items-center mt-6 flex-wrap gap-y-2">
            <p className="text-xs md:text-sm text-gray-500">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredSuppliers.length)} of{" "}
              {filteredSuppliers.length} suppliers
            </p>
            <div className="flex items-center">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                size="small"
                sx={{}}
              >
                Pre..
              </Button>

              <div className="mx-2">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={i}
                      variant={currentPage === pageNum ? "contained" : "text"}
                      size="small"
                      onClick={() => setCurrentPage(pageNum)}
                      sx={{ minWidth: 30, mx: 0.5 }}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {totalPages > 5 && (
                  <Typography variant="body2" sx={{ mx: 1 }}>
                    ...
                  </Typography>
                )}
              </div>

              <Button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </GlassCard>

      {/* Export Backdrop */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isExporting}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress color="inherit" />
          <Typography sx={{ mt: 2 }}>Exporting suppliers data...</Typography>
        </Box>
      </Backdrop>

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
    </div>
  );
};

export default WorldClassSupplierList;
