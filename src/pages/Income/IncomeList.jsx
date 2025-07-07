"use client";

/* eslint-disable no-unused-vars */

import FilterListIcon from "@mui/icons-material/FilterList";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SearchIcon from "@mui/icons-material/Search";

import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import {
  useDeleteIncomeMutation,
  useGetAllIncomesQuery,
} from "../../redux/api/income";
import Loading from "../../components/Loading/Loading";
import { Pencil, Trash2 } from "lucide-react";
import { deleteIconStyle, editIconStyle } from "../../style/tableStyle";
import { useTenantDomain } from "../../hooks/useTenantDomain";

// Payment status colors
const statusColors = {
  paid: { bg: "#e6f7ee", color: "#0e9f6e", borderColor: "#0e9f6e" },
  partially_paid: { bg: "#fef3c7", color: "#d97706", borderColor: "#d97706" },
  pending: { bg: "#fee2e2", color: "#ef4444", borderColor: "#ef4444" },
};

// Payment method icons (simplified for example)
const getPaymentMethodIcon = (method) => {
  switch (method) {
    case "cash":
      return "💵";
    case "credit_card":
      return "💳";
    case "bank_transfer":
      return "🏦";
    case "check":
      return "📝";
    case "mobile_payment":
      return "📱";
    default:
      return "💰";
  }
};

const IncomeList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const limit = 15;
 const tenantDomain = useTenantDomain();

  const { data: allIncomes, isLoading: incomeLoading } = useGetAllIncomesQuery({
    tenantDomain,
    limit,
    page: currentPage,
    search: searchTerm,
    category: filterCategory !== "all" ? filterCategory : undefined,
  });

  const [deleteIncome, { isLoading: deleteLoading }] =
    useDeleteIncomeMutation();

  const deletePackage = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this income record?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await deleteIncome({tenantDomain, id}).unwrap();
        swal("Deleted!", "Income record deleted successfully.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the record.", "error");
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleCategoryFilter = (e) => {
    setFilterCategory(e.target.value);
    setCurrentPage(1); // Reset to first page on new filter
  };

  if (incomeLoading) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        bgcolor: "white",
        padding: 3,
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ReceiptIcon sx={{ fontSize: 28, color: "#42A1DA", mr: 1.5 }} />
          <Typography variant="h5" fontWeight="bold">
            Income History
          </Typography>
        </Box>

        <Link to="/dashboard/add-income">
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #42A1DA 0%, #2980b9 100%)",
              boxShadow: "0 4px 12px rgba(66, 161, 218, 0.3)",
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(135deg, #2980b9 0%, #1e6091 100%)",
              },
            }}
          >
            Add New Income
          </Button>
        </Link>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
          alignItems: "center",
        }}
      >
        <TextField
          placeholder="Search by name, invoice, or amount..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ flexGrow: 1, minWidth: "200px", maxWidth: "400px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#42A1DA" }} />
              </InputAdornment>
            ),
          }}
        />

        <FormControl size="small" sx={{ minWidth: "180px" }}>
          <InputLabel id="category-filter-label">Filter by Category</InputLabel>
          <Select
            labelId="category-filter-label"
            value={filterCategory}
            onChange={handleCategoryFilter}
            label="Filter by Category"
            startAdornment={<FilterListIcon sx={{ color: "#42A1DA", mr: 1 }} />}
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="service">Service</MenuItem>
            <MenuItem value="parts">Parts</MenuItem>
            <MenuItem value="repair">Repair</MenuItem>
            <MenuItem value="maintenance">Maintenance</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="income table">
          <TableHead
            sx={{
              background: "linear-gradient(135deg, #f0f7ff 0%, #e6f2ff 100%)",
            }}
          >
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                SL
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Receipt/Invoice
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Income Category
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Income Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Customer
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Amount
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Payment Method
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allIncomes?.data?.incomes?.map((row, index) => {
              const globalIndex = (currentPage - 1) * limit + (index + 1);

              // Mock data for demonstration - in real app, use actual data from API
              const paymentMethod = row.payment_method || "cash";
              const paymentStatus = row.payment_status || "paid";
              const customer = row.customer_name || "Customer";

              return (
                <TableRow
                  key={row._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "rgba(66, 161, 218, 0.04)" },
                    transition: "background-color 0.2s",
                  }}
                >
                  <TableCell align="center">{globalIndex}</TableCell>

                  <TableCell align="center">
                    <Tooltip title={row.receipt_number || "View Receipt"}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Badge
                          color="primary"
                          variant="dot"
                          invisible={!row.image}
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontFamily: "monospace" }}
                          >
                            {row.invoice_number ||
                              `INV-${String(globalIndex).padStart(4, "0")}`}
                          </Typography>
                        </Badge>
                      </Box>
                    </Tooltip>
                  </TableCell>

                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        justifyContent: "center",
                      }}
                    >
                      {row?.category?.map((category, idx) => (
                        <Chip
                          key={idx}
                          label={category}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(66, 161, 218, 0.1)",
                            borderColor: "#42A1DA",
                            color: "#2980b9",
                            fontWeight: "medium",
                            fontSize: "0.75rem",
                          }}
                        />
                      ))}
                    </Box>
                  </TableCell>

                  <TableCell align="center">{row.income_name}</TableCell>

                  <TableCell align="center">
                    <Tooltip title={`Customer: ${customer}`}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 28,
                            height: 28,
                            fontSize: "0.875rem",
                            bgcolor: "#42A1DA",
                            mr: 1,
                          }}
                        >
                          {customer.charAt(0)}
                        </Avatar>
                        <Typography
                          variant="body2"
                          noWrap
                          sx={{ maxWidth: "100px" }}
                        >
                          {customer}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        color: "#2980b9",
                      }}
                    >
                      $
                      {Number(row.amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Typography>
                    {row.tax_applied && (
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{ color: "text.secondary" }}
                      >
                        +$
                        {Number(row.tax_amount || 0).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{" "}
                        tax
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell align="center">
                    <Tooltip title={paymentMethod}>
                      <Chip
                        label={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <span style={{ marginRight: "4px" }}>
                              {getPaymentMethodIcon(paymentMethod)}
                            </span>
                            <span>{paymentMethod.replace("_", " ")}</span>
                          </Box>
                        }
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                      />
                    </Tooltip>
                  </TableCell>

                  <TableCell align="center">
                    <Chip
                      label={paymentStatus.replace("_", " ")}
                      size="small"
                      sx={{
                        backgroundColor:
                          statusColors[paymentStatus]?.bg || "#f3f4f6",
                        color: statusColors[paymentStatus]?.color || "#6b7280",
                        border: `1px solid ${
                          statusColors[paymentStatus]?.borderColor || "#d1d5db"
                        }`,
                        textTransform: "capitalize",
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="body2">
                      {new Date(row.date).toLocaleDateString()}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Link to={`/dashboard/update-income?id=${row?._id}`}>
                        <Tooltip title="Edit">
                          <Box sx={editIconStyle}>
                            <Pencil size={18} />
                          </Box>
                        </Tooltip>
                      </Link>

                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          disabled={deleteLoading}
                          onClick={() => deletePackage(row?._id)}
                        >
                          <Box component="span" sx={deleteIconStyle}>
                            <Trash2 size={18} />
                          </Box>
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {allIncomes?.data?.incomes?.length === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 5,
          }}
        >
          <ReceiptIcon sx={{ fontSize: 48, color: "#d1d5db", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No income records found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Try changing your search or filter criteria
          </Typography>
          <Link to="/dashboard/add-income">
            <Button
              variant="outlined"
              sx={{
                borderColor: "#42A1DA",
                color: "#42A1DA",
                "&:hover": {
                  borderColor: "#2980b9",
                  backgroundColor: "rgba(66, 161, 218, 0.04)",
                },
              }}
            >
              Add Your First Income
            </Button>
          </Link>
        </Box>
      )}

      {allIncomes?.data?.incomes?.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {(currentPage - 1) * limit + 1} to{" "}
            {Math.min(
              currentPage * limit,
              allIncomes?.data?.meta?.totalItems || 0
            )}{" "}
            of {allIncomes?.data?.meta?.totalItems || 0} entries
          </Typography>

          <Pagination
            count={allIncomes?.data?.meta?.totalPages || 1}
            page={currentPage}
            color="primary"
            onChange={(_, page) => setCurrentPage(page)}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#42A1DA",
              },
              "& .Mui-selected": {
                backgroundColor: "rgba(66, 161, 218, 0.1) !important",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default IncomeList;
