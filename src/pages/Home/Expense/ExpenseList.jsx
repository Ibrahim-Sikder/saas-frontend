"use client"

import {
  Box,
  Button,
  Pagination,
  Stack,
  Chip,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Skeleton,
} from "@mui/material"
import { ControlPoint, Payment, TrendingUp, Receipt } from "@mui/icons-material"
import { Link } from "react-router-dom"
import EditIcon from "@mui/icons-material/Edit"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import Swal from "sweetalert2"
import { useState } from "react"
import { useDeleteExpenseMutation, useGetAllExpensesQuery } from "../../../redux/api/expense"
import { useTenantDomain } from "../../../hooks/useTenantDomain"

export default function ExpenseList() {
  const tenantDomain = useTenantDomain()
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")

  const { data, isLoading } = useGetAllExpensesQuery({
    tenantDomain,
    limit: 10,
    page: currentPage,
    searchTerm: search,
  })

  const [deleteExpense] = useDeleteExpenseMutation()

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1976d2",
      cancelButtonColor: "#d32f2f",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteExpense({ tenantDomain, id }).unwrap()
          Swal.fire("Deleted!", "The expense has been deleted.", "success")
        } catch (error) {
          Swal.fire("Error!", "An error occurred while deleting the expense.", "error")
        }
      }
    })
  }

  const rows =
    data?.data?.expenses?.map((expense) => ({
      id: expense._id,
      date: expense.date,
      reference_no: expense.transactionNumber,
      amount: expense.totalAmount, // Use totalAmount instead of invoiceCost
      payment_method: expense.payment_method,
      invoice_id: expense.invoice_id,
      note: expense.note,
      expense_items: expense.expense_items,
    })) || []

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }

  const { meta = {} } = data?.data || {}
  const { totalPage = 1, total = 0 } = meta
  const totalAmount = rows.reduce((sum, expense) => sum + (expense.amount || 0), 0)

  const LoadingSkeleton = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton variant="text" width={100} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rectangular" width={80} height={24} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={80} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={100} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={120} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rectangular" width={80} height={32} />
          </TableCell>
        </TableRow>
      ))}
    </>
  )

  return (
    <Box sx={{ p: 3, backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e293b", mb: 1 }}>
          Expense Management
        </Typography>
        <Typography variant="body1" sx={{ color: "#64748b" }}>
          Dashboard › Expenses › Expense List
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ borderRadius: 3, border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="body2" sx={{ color: "#64748b", mb: 1 }}>
                    Total Expenses
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "#059669" }}>
                    ${totalAmount.toLocaleString()}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "#dcfce7", color: "#059669", width: 48, height: 48 }}>
                  <TrendingUp />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ borderRadius: 3, border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="body2" sx={{ color: "#64748b", mb: 1 }}>
                    Total Records
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "#2563eb" }}>
                    {total}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "#dbeafe", color: "#2563eb", width: 48, height: 48 }}>
                  <Receipt />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Table */}
      <Card sx={{ borderRadius: 3, border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
        <Box sx={{ p: 3, borderBottom: "1px solid #e2e8f0" }}>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" spacing={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b" }}>
              Expense List
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Box
                component="input"
                onChange={handleSearch}
                type="text"
                placeholder="Search expenses..."
                sx={{
                  width: { xs: "100%", sm: "300px" },
                  p: "12px 16px",
                  borderRadius: 2,
                  border: "1px solid #d1d5db",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.2s",
                  "&:focus": {
                    borderColor: "#2563eb",
                    boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
                  },
                }}
              />
              <Button
                component={Link}
                to="/dashboard/add-expense"
                variant="contained"
                startIcon={<ControlPoint />}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  bgcolor: "#2563eb",
                  "&:hover": { bgcolor: "#1d4ed8" },
                }}
              >
                Add Expense
              </Button>
            </Stack>
          </Stack>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f8fafc" }}>
                <TableCell sx={{ fontWeight: 600, color: "#374151", py: 2 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151", py: 2 }}>Reference</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151", py: 2 }}>Total Amount</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151", py: 2 }}>Payment Method</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151", py: 2 }}>Expense Items</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#374151", py: 2, textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <LoadingSkeleton />
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: "center", py: 6 }}>
                    <Typography variant="h6" sx={{ color: "#64748b", mb: 1 }}>
                      No expenses found
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                      Try adjusting your search criteria
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:hover": { bgcolor: "#f8fafc" },
                      borderBottom: "1px solid #f1f5f9",
                    }}
                  >
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: "#374151" }}>
                        {row.date
                          ? new Date(row.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "N/A"}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Chip
                        label={row.reference_no || "N/A"}
                        size="small"
                        sx={{
                          bgcolor: "#eff6ff",
                          color: "#2563eb",
                          fontWeight: 500,
                          border: "1px solid #bfdbfe",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#059669", fontSize: "0.95rem" }}>
                        ${row.amount?.toLocaleString() || "0"}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Chip
                        label={row.payment_method || "N/A"}
                        size="small"
                        icon={<Payment sx={{ fontSize: "14px !important" }} />}
                        sx={{
                          bgcolor: "#f0f9ff",
                          color: "#0369a1",
                          border: "1px solid #bae6fd",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {Array.isArray(row.expense_items) && row.expense_items.length > 0 ? (
                          <>
                            {row.expense_items.slice(0, 2).map((item, idx) => (
                              <Chip
                                key={idx}
                                label={`${item.name}: $${item.amount?.toLocaleString() || "0"}`}
                                size="small"
                                sx={{
                                  bgcolor: "#fef3c7",
                                  color: "#92400e",
                                  fontSize: "0.75rem",
                                  height: 24,
                                  border: "1px solid #fde68a",
                                }}
                              />
                            ))}
                            {row.expense_items.length > 2 && (
                              <Chip
                                label={`+${row.expense_items.length - 2} items`}
                                size="small"
                                sx={{
                                  bgcolor: "#f3f4f6",
                                  color: "#6b7280",
                                  fontSize: "0.75rem",
                                  height: 24,
                                }}
                              />
                            )}
                          </>
                        ) : (
                          <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                            No items
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton
                          component={Link}
                          to={`/dashboard/update-expense/?id=${row.id}`}
                          size="small"
                          sx={{
                            bgcolor: "#eff6ff",
                            color: "#2563eb",
                            "&:hover": { bgcolor: "#dbeafe" },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(row.id)}
                          sx={{
                            bgcolor: "#fef2f2",
                            color: "#dc2626",
                            "&:hover": { bgcolor: "#fee2e2" },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {totalPage > 1 && (
          <Box sx={{ p: 3, display: "flex", justifyContent: "flex-end", borderTop: "1px solid #e2e8f0" }}>
            <Pagination
              count={totalPage}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontWeight: 500,
                  borderRadius: 2,
                },
              }}
            />
          </Box>
        )}
      </Card>
    </Box>
  )
}