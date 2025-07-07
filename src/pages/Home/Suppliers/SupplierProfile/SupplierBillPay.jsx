/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react"
import {
  Typography,
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
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  Menu,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material"
import {
  Receipt,
  FilterList,
  Search,
  Add,
  Download,
  Print,
  MoreVert,
  CheckCircle,
  Cancel,
  Timelapse,
  CalendarMonth,
  AttachMoney,
  AccountBalance,
  Payments,
  Refresh,
  ArrowUpward,
  ArrowDownward,
  Info,
  LocalAtm,
  CreditCard,
  AccountBalanceWallet,
  ReceiptLong,
  Edit,
  Delete,
  Visibility,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { GradientCard, StatusChip } from "../../../../utils/customStyle"


const PaymentMethodIcon = ({ method }) => {
  switch (method?.toLowerCase()) {
    case "cash":
      return <LocalAtm />
    case "credit card":
      return <CreditCard />
    case "bank transfer":
      return <AccountBalance />
    case "wallet":
      return <AccountBalanceWallet />
    case "nagad":
      return <Payments color="secondary" />
    case "bkash":
      return <Payments color="error" />
    default:
      return <Payments />
  }
}

const getStatusColor = (status) => {
  if (status === "paid" || status === "completed") {
    return "green"
  } else if (status === "pending" || status === "partial") {
    return "orange"
  } else if (status === "cancelled" || status === "failed") {
    return "red"
  }
  return "blue"
}

const getStatusIcon = (status) => {
  if (status === "paid" || status === "completed") {
    return <CheckCircle fontSize="small" />
  } else if (status === "pending" || status === "partial") {
    return <Timelapse fontSize="small" />
  } else if (status === "cancelled" || status === "failed") {
    return <Cancel fontSize="small" />
  }
  return <Info fontSize="small" />
}

const formatDate = (dateString) => {
  if (!dateString) return "N/A"
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount || 0)
}

const SupplierBillPay = ({ supplierWithBillPay }) => {
  const [filterAnchorEl, setFilterAnchorEl] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")
  const [paymentType, setPaymentType] = useState("all")
  const [dateRange, setDateRange] = useState("all")
  const [viewBillDialog, setViewBillDialog] = useState(false)
  const [selectedBill, setSelectedBill] = useState(null)
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null)
  const [selectedBillId, setSelectedBillId] = useState(null)
  const [addPaymentDialog, setAddPaymentDialog] = useState(false)

  const billPayments = supplierWithBillPay?.billPayments || []


  const paymentStats = supplierWithBillPay?.paymentStats || {
    totalPayments: 0,
    totalAmount: 0,
    paidAmount: 0,
    pendingAmount: 0,
    pendingCount: 0,
  }

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortDirection("asc")
    }
  }

  const handleViewBill = (bill) => {
    setSelectedBill(bill)
    setViewBillDialog(true)
  }

  const handleActionMenuOpen = (event, billId) => {
    setActionMenuAnchor(event.currentTarget)
    setSelectedBillId(billId)
  }

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null)
    setSelectedBillId(null)
  }

  const handleAddPayment = () => {
    setAddPaymentDialog(true)
  }

  // Filter and sort bills
  const filteredBills = billPayments
    .filter((bill) => {
      // Search filter
      const searchMatch =
        searchTerm === "" ||
        bill.bill_category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.payment_method?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.against_bill?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.name?.toLowerCase().includes(searchTerm.toLowerCase())

      // Payment type filter
      const paymentTypeMatch =
        paymentType === "all" ||
        (paymentType === "paid" && bill.status === "paid") ||
        (paymentType === "pending" && bill.status === "pending") ||
        (paymentType === "partial" && bill.partial_payment)

      // Date range filter
      let dateMatch = true
      if (dateRange !== "all") {
        const billDate = new Date(bill.bill_date)
        const now = new Date()
        const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30))
        const ninetyDaysAgo = new Date(now.setDate(now.getDate() - 90))

        if (dateRange === "30days" && billDate < thirtyDaysAgo) {
          dateMatch = false
        } else if (dateRange === "90days" && billDate < ninetyDaysAgo) {
          dateMatch = false
        }
      }

      return searchMatch && paymentTypeMatch && dateMatch
    })
    .sort((a, b) => {
      let comparison = 0
      if (sortBy === "date") {
        comparison = new Date(a.bill_date) - new Date(b.bill_date)
      } else if (sortBy === "amount") {
        comparison = a.amount - b.amount
      } else if (sortBy === "category") {
        comparison = (a.bill_category || "").localeCompare(b.bill_category || "")
      } else if (sortBy === "payment_method") {
        comparison = (a.payment_method || "").localeCompare(b.payment_method || "")
      }

      return sortDirection === "asc" ? comparison : -comparison
    })

  return (
    <Box sx={{ width: "100%" }}>
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <GradientCard>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" fontWeight="bold">
                  Total Bills
                </Typography>
                <Avatar sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }}>
                  <ReceiptLong />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ my: 2, fontWeight: "bold" }}>
                {paymentStats.totalPayments}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {paymentStats.pendingCount} bills pending
              </Typography>
            </CardContent>
          </GradientCard>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" color="text.secondary" fontWeight="bold">
                  Total Amount
                </Typography>
                <Avatar sx={{ bgcolor: "rgba(76, 175, 80, 0.1)", color: "#4CAF50" }}>
                  <AttachMoney />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ my: 2, fontWeight: "bold" }}>
                {formatCurrency(paymentStats.totalAmount)}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ArrowUpward sx={{ color: "#4CAF50", fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="success.main">
                  12% increase from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" color="text.secondary" fontWeight="bold">
                  Paid Amount
                </Typography>
                <Avatar sx={{ bgcolor: "rgba(33, 150, 243, 0.1)", color: "#2196F3" }}>
                  <CheckCircle />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ my: 2, fontWeight: "bold" }}>
                {formatCurrency(paymentStats.paidAmount)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {((paymentStats.paidAmount / paymentStats.totalAmount) * 100).toFixed(1)}% of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" color="text.secondary" fontWeight="bold">
                  Pending Amount
                </Typography>
                <Avatar sx={{ bgcolor: "rgba(255, 152, 0, 0.1)", color: "#FF9800" }}>
                  <Timelapse />
                </Avatar>
              </Box>
              <Typography variant="h3" sx={{ my: 2, fontWeight: "bold" }}>
                {formatCurrency(paymentStats.pendingAmount)}
              </Typography>
              <Typography variant="body2" color="warning.main">
                {paymentStats.pendingCount} bills awaiting payment
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bill Payments Table */}
      <Card sx={{ borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", mb: 4 }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Receipt sx={{ mr: 1, color: "#6B73FF" }} />
              <Typography variant="h6" fontWeight="bold">
                Bill Payments
              </Typography>
            </Box>
          }
          action={
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddPayment}
                sx={{
                  borderRadius: 20,
                  background: "linear-gradient(45deg, #6B73FF 30%, #000DFF 90%)",
                  boxShadow: "0 3px 5px 2px rgba(107, 115, 255, .3)",
                }}
              >
                Add Payment
              </Button>
              <Button variant="outlined" startIcon={<Download />} sx={{ borderRadius: 20 }}>
                Export
              </Button>
              <Button variant="outlined" startIcon={<Print />} sx={{ borderRadius: 20 }}>
                Print
              </Button>
            </Box>
          }
        />
        <Divider />
        <Box sx={{ p: 2, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <TextField
            placeholder="Search bills..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Payment Status</InputLabel>
            <Select value={paymentType} onChange={(e) => setPaymentType(e.target.value)} label="Payment Status">
              <MenuItem value="all">All Payments</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="partial">Partial</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Date Range</InputLabel>
            <Select value={dateRange} onChange={(e) => setDateRange(e.target.value)} label="Date Range">
              <MenuItem value="all">All Time</MenuItem>
              <MenuItem value="30days">Last 30 Days</MenuItem>
              <MenuItem value="90days">Last 90 Days</MenuItem>
            </Select>
          </FormControl>

          <Button startIcon={<FilterList />} variant="outlined" onClick={handleFilterClick} sx={{ borderRadius: 20 }}>
            More Filters
          </Button>

          <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose}>
            <MenuItem onClick={handleFilterClose}>
              <Typography variant="body2">Filter by Category</Typography>
            </MenuItem>
            <MenuItem onClick={handleFilterClose}>
              <Typography variant="body2">Filter by Payment Method</Typography>
            </MenuItem>
            <MenuItem onClick={handleFilterClose}>
              <Typography variant="body2">Filter by Amount Range</Typography>
            </MenuItem>
            <MenuItem onClick={handleFilterClose}>
              <Typography variant="body2">Custom Date Range</Typography>
            </MenuItem>
          </Menu>

          <Button
            startIcon={<Refresh />}
            sx={{ ml: "auto", borderRadius: 20 }}
            onClick={() => {
              setSearchTerm("")
              setPaymentType("all")
              setDateRange("all")
              setSortBy("date")
              setSortDirection("desc")
            }}
          >
            Reset Filters
          </Button>
        </Box>

        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>
                  <Box
                    sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                    onClick={() => handleSortChange("date")}
                  >
                    Bill Date
                    {sortBy === "date" && (
                      <Box component="span" sx={{ ml: 0.5 }}>
                        {sortDirection === "asc" ? (
                          <ArrowUpward fontSize="small" />
                        ) : (
                          <ArrowDownward fontSize="small" />
                        )}
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell>Bill #</TableCell>
                <TableCell>
                  <Box
                    sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                    onClick={() => handleSortChange("category")}
                  >
                    Category
                    {sortBy === "category" && (
                      <Box component="span" sx={{ ml: 0.5 }}>
                        {sortDirection === "asc" ? (
                          <ArrowUpward fontSize="small" />
                        ) : (
                          <ArrowDownward fontSize="small" />
                        )}
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                    onClick={() => handleSortChange("amount")}
                  >
                    Amount
                    {sortBy === "amount" && (
                      <Box component="span" sx={{ ml: 0.5 }}>
                        {sortDirection === "asc" ? (
                          <ArrowUpward fontSize="small" />
                        ) : (
                          <ArrowDownward fontSize="small" />
                        )}
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>
                  <Box
                    sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                    onClick={() => handleSortChange("payment_method")}
                  >
                    Payment Method
                    {sortBy === "payment_method" && (
                      <Box component="span" sx={{ ml: 0.5 }}>
                        {sortDirection === "asc" ? (
                          <ArrowUpward fontSize="small" />
                        ) : (
                          <ArrowDownward fontSize="small" />
                        )}
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBills.length > 0 ? (
                filteredBills.map((bill) => (
                  <TableRow
                    key={bill._id}
                    sx={{
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                      cursor: "pointer",
                    }}
                  >
                    <TableCell onClick={() => handleViewBill(bill)}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CalendarMonth sx={{ mr: 1, color: "#6B73FF", fontSize: 20 }} />
                        {formatDate(bill.bill_date)}
                      </Box>
                    </TableCell>
                    <TableCell onClick={() => handleViewBill(bill)}>
                      <Typography variant="body2" fontWeight="medium">
                        {bill.against_bill || "N/A"}
                      </Typography>
                    </TableCell>
                    <TableCell onClick={() => handleViewBill(bill)}>
                      <Chip
                        label={bill.bill_category || "General"}
                        size="small"
                        sx={{ borderRadius: 1, textTransform: "capitalize" }}
                      />
                    </TableCell>
                    <TableCell onClick={() => handleViewBill(bill)}>
                      <Typography variant="body2" fontWeight="bold">
                        {formatCurrency(bill.amount)}
                      </Typography>
                      {bill.discount_amount > 0 && (
                        <Typography variant="caption" color="text.secondary">
                          Discount: {formatCurrency(bill.discount_amount)}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell onClick={() => handleViewBill(bill)}>
                      <Typography
                        variant="body2"
                        color={new Date(bill.due_date) < new Date() ? "error.main" : "text.primary"}
                      >
                        {formatDate(bill.due_date)}
                      </Typography>
                    </TableCell>
                    <TableCell onClick={() => handleViewBill(bill)}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          sx={{
                            width: 24,
                            height: 24,
                            mr: 1,
                            bgcolor: "rgba(107, 115, 255, 0.1)",
                          }}
                        >
                          <PaymentMethodIcon method={bill.payment_method} />
                        </Avatar>
                        <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
                          {bill.payment_method || "N/A"}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell onClick={() => handleViewBill(bill)}>
                      <StatusChip
                        icon={getStatusIcon(bill.status || "pending")}
                        label={bill.partial_payment ? "Partial" : bill.status || "Pending"}
                        size="small"
                        statuscolor={getStatusColor(bill.status || "pending")}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={(e) => handleActionMenuOpen(e, bill._id)}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      No bill payments found
                    </Typography>
                    <Button variant="text" startIcon={<Add />} onClick={handleAddPayment} sx={{ mt: 1 }}>
                      Add a new payment
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Payment Trends Card */}
      <Card sx={{ borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", mb: 4 }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Payments sx={{ mr: 1, color: "#6B73FF" }} />
              <Typography variant="h6" fontWeight="bold">
                Payment Trends
              </Typography>
            </Box>
          }
        />
        <Divider />
        <CardContent>
          <Box sx={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="body1" color="text.secondary">
              Payment trend chart will be displayed here
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* View Bill Dialog */}
      <Dialog open={viewBillDialog} onClose={() => setViewBillDialog(false)} maxWidth="md" fullWidth>
        {selectedBill && (
          <>
            <DialogTitle>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h6">Bill Details - #{selectedBill.against_bill || "N/A"}</Typography>
                <StatusChip
                  icon={getStatusIcon(selectedBill.status || "pending")}
                  label={selectedBill.partial_payment ? "Partial" : selectedBill.status || "Pending"}
                  size="small"
                  statuscolor={getStatusColor(selectedBill.status || "pending")}
                />
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Bill Information
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Bill Number
                          </Typography>
                          <Typography variant="body1">{selectedBill.against_bill || "N/A"}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Category
                          </Typography>
                          <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
                            {selectedBill.bill_category || "General"}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Bill Date
                          </Typography>
                          <Typography variant="body1">{formatDate(selectedBill.bill_date)}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Due Date
                          </Typography>
                          <Typography
                            variant="body1"
                            color={new Date(selectedBill.due_date) < new Date() ? "error.main" : "text.primary"}
                          >
                            {formatDate(selectedBill.due_date)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="text.secondary">
                            Description
                          </Typography>
                          <Typography variant="body1">
                            {selectedBill.description || "No description provided"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Payment Details
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Amount
                          </Typography>
                          <Typography variant="body1" fontWeight="bold">
                            {formatCurrency(selectedBill.amount)}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Payment Method
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <PaymentMethodIcon method={selectedBill.payment_method} />
                            <Typography variant="body1" sx={{ ml: 1, textTransform: "capitalize" }}>
                              {selectedBill.payment_method || "N/A"}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Payment Date
                          </Typography>
                          <Typography variant="body1">{formatDate(selectedBill.payment_date)}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Transaction ID
                          </Typography>
                          <Typography variant="body1">{selectedBill.transaction_id || "N/A"}</Typography>
                        </Grid>
                        {selectedBill.discount_amount > 0 && (
                          <>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                Discount
                              </Typography>
                              <Typography variant="body1">
                                {selectedBill.discount_value}
                                {selectedBill.discount_type === "percentage" ? "%" : " flat"}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                Discount Amount
                              </Typography>
                              <Typography variant="body1" color="error.main">
                                -{formatCurrency(selectedBill.discount_amount)}
                              </Typography>
                            </Grid>
                          </>
                        )}
                        {selectedBill.tax_amount > 0 && (
                          <>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                Tax Rate
                              </Typography>
                              <Typography variant="body1">{selectedBill.tax_rate}%</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                Tax Amount
                              </Typography>
                              <Typography variant="body1">{formatCurrency(selectedBill.tax_amount)}</Typography>
                            </Grid>
                          </>
                        )}
                      </Grid>
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <Typography variant="subtitle1">Total Amount</Typography>
                        <Typography variant="h6" fontWeight="bold">
                          {formatCurrency(
                            selectedBill.amount + (selectedBill.tax_amount || 0) - (selectedBill.discount_amount || 0),
                          )}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Supplier Information
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <Typography variant="body2" color="text.secondary">
                            Supplier Name
                          </Typography>
                          <Typography variant="body1">{selectedBill.name}</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Typography variant="body2" color="text.secondary">
                            Supplier ID
                          </Typography>
                          <Typography variant="body1">{selectedBill.supplierId}</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Typography variant="body2" color="text.secondary">
                            Contact
                          </Typography>
                          <Typography variant="body1">{selectedBill.mobile_number}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="text.secondary">
                            Address
                          </Typography>
                          <Typography variant="body1">{selectedBill.address || "N/A"}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                {selectedBill.payment_note && (
                  <Grid item xs={12}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          Payment Notes
                        </Typography>
                        <Typography variant="body1">{selectedBill.payment_note}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setViewBillDialog(false)}>Close</Button>
              <Button variant="outlined" startIcon={<Print />}>
                Print
              </Button>
              <Button
                variant="contained"
                startIcon={<Edit />}
                sx={{
                  background: "linear-gradient(45deg, #6B73FF 30%, #000DFF 90%)",
                }}
              >
                Edit Bill
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Action Menu */}
      <Menu anchorEl={actionMenuAnchor} open={Boolean(actionMenuAnchor)} onClose={handleActionMenuClose}>
        <MenuItem onClick={handleActionMenuClose}>
          <Visibility fontSize="small" sx={{ mr: 1 }} /> View Details
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Edit fontSize="small" sx={{ mr: 1 }} /> Edit Bill
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Print fontSize="small" sx={{ mr: 1 }} /> Print Bill
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleActionMenuClose} sx={{ color: "error.main" }}>
          <Delete fontSize="small" sx={{ mr: 1 }} /> Delete Bill
        </MenuItem>
      </Menu>

      {/* Add Payment Dialog */}
      <Dialog open={addPaymentDialog} onClose={() => setAddPaymentDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6">Add New Bill Payment</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField label="Bill Number" fullWidth required margin="normal" placeholder="Enter bill number" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField select label="Bill Category" fullWidth required margin="normal" defaultValue="equipment">
                <MenuItem value="equipment">Equipment</MenuItem>
                <MenuItem value="supplies">Supplies</MenuItem>
                <MenuItem value="services">Services</MenuItem>
                <MenuItem value="reconditionparts">Recondition Parts</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Bill Date"
                type="date"
                fullWidth
                required
                margin="normal"
                InputLabelProps={{ shrink: true }}
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Due Date"
                type="date"
                fullWidth
                required
                margin="normal"
                InputLabelProps={{ shrink: true }}
                defaultValue={new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split("T")[0]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Amount"
                type="number"
                fullWidth
                required
                margin="normal"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField select label="Payment Method" fullWidth required margin="normal" defaultValue="nagad">
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="credit_card">Credit Card</MenuItem>
                <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
                <MenuItem value="nagad">Nagad</MenuItem>
                <MenuItem value="bkash">bKash</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Apply Discount</InputLabel>
                <Select label="Apply Discount" defaultValue={false}>
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Apply Tax</InputLabel>
                <Select label="Apply Tax" defaultValue={false}>
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField select label="Payment Terms" fullWidth margin="normal" defaultValue="net_30">
                <MenuItem value="net_15">Net 15</MenuItem>
                <MenuItem value="net_30">Net 30</MenuItem>
                <MenuItem value="net_45">Net 45</MenuItem>
                <MenuItem value="net_60">Net 60</MenuItem>
                <MenuItem value="due_on_receipt">Due on Receipt</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Is Recurring</InputLabel>
                <Select label="Is Recurring" defaultValue={false}>
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                rows={3}
                fullWidth
                margin="normal"
                placeholder="Enter bill description"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Payment Note"
                multiline
                rows={2}
                fullWidth
                margin="normal"
                placeholder="Add payment notes"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddPaymentDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #6B73FF 30%, #000DFF 90%)",
            }}
          >
            Save Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SupplierBillPay

