/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Pagination,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Card,
  CardContent,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Breadcrumbs,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  ControlPoint,
  Search,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList,
  MoreVert,
  Refresh,
  Download,
  Home,
  Category,
} from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useGetAllICategoryQuery } from "../../../redux/api/categoryApi";
import {
  useDeleteExpenseCategoryMutation,
  useGetAllExpensesCategoryQuery,
} from "../../../redux/api/expense";
import CreateExpenseCategoryModal from "./CreateExpenseCategoryModal";
import UpdateExpenseCategoryModal from "./UpdateExpenseCategoryModal";
import { styled } from "@mui/material/styles";
import { ActionButton, StyledDataGrid } from "../../../utils/customStyle";
import { StyledCard } from "../../../utils";
import { useTenantDomain } from "../../../hooks/useTenantDomain";



export default function ExpenseCategoryList() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
const tenantDomain = useTenantDomain();

  // Fetch data
  const { data, isLoading, refetch } = useGetAllICategoryQuery({
    tenantDomain, 
    limit: pageSize,
    page: currentPage,
    searchTerm: search,
  });

  const { data: expenseCategoryData, isLoading: categoryLoading } =
    useGetAllExpensesCategoryQuery({
      tenantDomain, 
      limit: 9999999999,
      page: currentPage,
      searchTerm: search,
    });

  const [deleteExpenseCategory, { isLoading: isDeleting }] =
    useDeleteExpenseCategoryMutation();

  const expenseCategories = expenseCategoryData?.data || [];

  // Modal handlers
  const handleOpen = () => setOpen(true);
  const handleUpdateClose = () => setUpdate(false);
  const handleUpdateOpen = () => setUpdate(true);
  const handleClose = () => setOpen(false);

  // Menu handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterMenuOpen = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterAnchorEl(null);
  };

  // Delete handlers
  const handleDeleteClick = (id) => {
    setCategoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteExpenseCategory({tenantDomain, id:categoryToDelete}).unwrap();
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  // Filter handlers
  const handleFilterChange = (filter) => {
    setStatusFilter(filter);
    handleFilterMenuClose();
  };

  // Search handler
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Pagination handler
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Name", "Code", "Status"];
    const data = expenseCategories.map((category) => [
      category.name,
      category.code,
      category.status || "Active",
    ]);

    const csvContent = [
      headers.join(","),
      ...data.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "expense_categories.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // DataGrid columns
  const columns = [
    {
      field: "name",
      headerName: "Category Name",
      flex: 2,
      renderCell: (params) => (
        <Typography fontWeight="500">{params.value}</Typography>
      ),
    },
    {
      field: "code",
      headerName: "Code",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            backgroundColor: "#e3f2fd",
            color: "#1976d2",
            fontWeight: "500",
          }}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value || "Active"}
          size="small"
          color={params.value === "Inactive" ? "error" : "success"}
          sx={{ fontWeight: "500" }}
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      flex: 1.5,
      valueGetter: (params) => {
        return params.row?.createdAt
          ? new Date(params.row?.createdAt).toLocaleDateString()
          : "N/A";
      },
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit Category">
            <ActionButton
              onClick={() => {
                setSelectedId(params.id);
                handleUpdateOpen();
              }}
              variant="outlined"
              startIcon={<EditIcon />}
              sx={{
                color: "#6D5BFF",
                borderColor: "#6D5BFF",
                "&:hover": {
                  backgroundColor: "rgba(109, 91, 255, 0.1)",
                  borderColor: "#6D5BFF",
                },
              }}
            >
              Edit
            </ActionButton>
          </Tooltip>

          <Tooltip title="Delete Category">
            <ActionButton
              variant="outlined"
              startIcon={<DeleteIcon />}
              sx={{
                color: "#FF3B3B",
                borderColor: "#FF3B3B",
                "&:hover": {
                  backgroundColor: "rgba(255, 59, 59, 0.1)",
                  borderColor: "#FF3B3B",
                },
              }}
              onClick={() => handleDeleteClick(params.id)}
            >
              Delete
            </ActionButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  // Filter rows based on status
  const filteredRows = expenseCategories
    .filter((category) => {
      if (statusFilter === "all") return true;
      return (category.status || "Active") === statusFilter;
    })
    .map((category) => ({
      id: category?._id,
      code: category?.code,
      name: category?.name,
      status: category?.status || "Active",
      createdAt: category?.createdAt,
    }));

  const { meta } = data?.data || { meta: {} };
  const { totalPage = 10 } = meta || {};

  return (
    <>
      <Box sx={{ padding: "24px" }}>
        {/* Header */}
        <Box mb={3}>
          <Typography variant="h5" fontWeight="600" color="#333" mb={1}>
            Expense Categories
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="#"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Home sx={{ mr: 0.5 }} fontSize="inherit" />
              Dashboard
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="#"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Category sx={{ mr: 0.5 }} fontSize="inherit" />
              Categories
            </Link>
            <Typography color="text.primary" sx={{ fontWeight: 500 }}>
              Expense Categories
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* Main Content */}
        <StyledCard>
          <CardContent sx={{ p: 0 }}>
            {/* Toolbar */}
            <Box sx={{ p: 3, borderBottom: "1px solid #eee" }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                spacing={2}
              >
                <TextField
                  placeholder="Search categories..."
                  variant="outlined"
                  size="small"
                  value={search}
                  onChange={handleSearch}
                  sx={{ minWidth: 300 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <Stack direction="row" spacing={1}>
                  <Tooltip title="Refresh">
                    <IconButton onClick={() => refetch()}>
                      <Refresh />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Filter">
                    <IconButton onClick={handleFilterMenuOpen}>
                      <FilterList />
                    </IconButton>
                  </Tooltip>

                  <Menu
                    anchorEl={filterAnchorEl}
                    open={Boolean(filterAnchorEl)}
                    onClose={handleFilterMenuClose}
                  >
                    <MenuItem
                      onClick={() => handleFilterChange("all")}
                      selected={statusFilter === "all"}
                    >
                      All Categories
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleFilterChange("Active")}
                      selected={statusFilter === "Active"}
                    >
                      Active
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleFilterChange("Inactive")}
                      selected={statusFilter === "Inactive"}
                    >
                      Inactive
                    </MenuItem>
                  </Menu>

                  <Tooltip title="More options">
                    <IconButton onClick={handleMenuOpen}>
                      <MoreVert />
                    </IconButton>
                  </Tooltip>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={exportToCSV}>
                      <Download fontSize="small" sx={{ mr: 1 }} />
                      Export to CSV
                    </MenuItem>
                  </Menu>

                  <Button
                    variant="contained"
                    startIcon={<ControlPoint />}
                    onClick={handleOpen}
                    sx={{
                      bgcolor: "#42A1DA",
                      "&:hover": { bgcolor: "#3589b9" },
                      textTransform: "none",
                      fontWeight: "600",
                      boxShadow: "0 4px 12px rgba(66, 161, 218, 0.2)",
                    }}
                  >
                    Add Category
                  </Button>
                </Stack>
              </Stack>
            </Box>

            {/* Data Grid */}
            {isLoading || categoryLoading ? (
              <Box p={3}>
                {[...Array(5)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    height={60}
                    sx={{ my: 1, borderRadius: 1 }}
                  />
                ))}
              </Box>
            ) : filteredRows.length === 0 ? (
              <Box p={5} textAlign="center">
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No expense categories found
                </Typography>
                <Typography color="text.secondary" mb={2}>
                  {search ? "Try a different search term or" : "Get started by"}{" "}
                  creating a new category
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<ControlPoint />}
                  onClick={handleOpen}
                  sx={{
                    bgcolor: "#42A1DA",
                    "&:hover": { bgcolor: "#3589b9" },
                    textTransform: "none",
                  }}
                >
                  Add Category
                </Button>
              </Box>
            ) : (
              <StyledDataGrid
                rows={filteredRows}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 25]}
                checkboxSelection
                disableSelectionOnClick
                autoHeight
                components={{
                  Toolbar: GridToolbar,
                }}
                componentsProps={{
                  toolbar: {
                    showQuickFilter: false,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
                getRowHeight={() => "auto"}
                sx={{
                  "& .MuiDataGrid-cell": {
                    py: 1.5,
                  },
                }}
              />
            )}

            {/* Pagination */}
            <Box p={2} display="flex" justifyContent="center">
              <Pagination
                count={totalPage}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
              />
            </Box>
          </CardContent>
        </StyledCard>
      </Box>

      {/* Modals */}
      {open && <CreateExpenseCategoryModal open={open} setOpen={handleClose} />}
      {update && (
        <UpdateExpenseCategoryModal
          open={update}
          setOpen={handleUpdateClose}
          categoryId={selectedId}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this expense category? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteCancel}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            autoFocus
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
