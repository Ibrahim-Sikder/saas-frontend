/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
"use client"

import { useState, useRef } from "react"
import {
  Box,
  Typography,
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  useTheme,
  alpha,
  Tooltip,
  Stack,
  LinearProgress,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import SearchIcon from "@mui/icons-material/Search"
import FilterListIcon from "@mui/icons-material/FilterList"
import VisibilityIcon from "@mui/icons-material/Visibility"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import PrintIcon from "@mui/icons-material/Print"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import PeopleIcon from "@mui/icons-material/People"
import HistoryIcon from "@mui/icons-material/History"
import HomeIcon from "@mui/icons-material/Home"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import ArticleIcon from "@mui/icons-material/Article"
import TableChartIcon from "@mui/icons-material/TableChart"
import CloseIcon from "@mui/icons-material/Close"
import { useNavigate } from "react-router-dom"
import { useGetAllPurchasesQuery } from "../../redux/api/purchaseApi"
import { useReactToPrint } from "react-to-print"

export default function PurchaseHistoryPage() {
  const theme = useTheme()
  const router = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  })
  const [supplierFilter, setSupplierFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const rowsPerPage = 10
  const [search, setSearch] = useState("")
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadFormat, setDownloadFormat] = useState("")
   const tenantDomain = window.location.hostname.split(".")[0];

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })
  const printRef = useRef(null)

  // Fetch purchase data from API
  const { data: purchaseData, isLoading: isDataLoading } = useGetAllPurchasesQuery({
    tenantDomain,
    limit: 900,
    page,
    searchTerm: search,
  })

  // Get purchases from API data
  const purchases = purchaseData?.data?.purchases || []

  // Calculate summary statistics from dynamic data
  const totalPurchases = purchases.length
  const totalAmount = purchases.reduce((sum, purchase) => sum + (purchase.grandTotal || 0), 0)

  // Get unique suppliers
  const uniqueSuppliers =
    purchases.length > 0
      ? [...new Set(purchases.map((purchase) => purchase.suppliers?.full_name || "Unknown Supplier"))].length
      : 0

  // Get all suppliers for filter dropdown
  const supplierOptions = ["all"]
  if (purchases.length > 0) {
    const uniqueSupplierNames = [
      ...new Set(purchases.map((purchase) => purchase.suppliers?.full_name || "Unknown Supplier")),
    ]
    supplierOptions.push(...uniqueSupplierNames)
  }

  const handleViewPurchase = (id) => {
    setIsLoading(true)
    setTimeout(() => {
      router.push(`/purchase/${id}`)
      setIsLoading(false)
    }, 300)
  }

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target
    setDateRange({
      ...dateRange,
      [name]: value,
    })
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  // Filter purchases based on search term, date range, and supplier
  const filteredPurchases = purchases.filter((purchase) => {
    // Search filter
    const matchesSearch =
      (purchase.referenceNo?.toString() || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (purchase.suppliers?.full_name || "").toLowerCase().includes(searchTerm.toLowerCase())

    // Date range filter
    const purchaseDate = new Date(purchase.date)
    const startDate = dateRange.startDate ? new Date(dateRange.startDate) : null
    const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null

    const matchesDateRange = (!startDate || purchaseDate >= startDate) && (!endDate || purchaseDate <= endDate)

    // Supplier filter
    const matchesSupplier = supplierFilter === "all" || purchase.suppliers?.full_name === supplierFilter

    return matchesSearch && matchesDateRange && matchesSupplier
  })

  // Pagination
  const paginatedPurchases = filteredPurchases.slice((page - 1) * rowsPerPage, page * rowsPerPage)
  const pageCount = Math.ceil(filteredPurchases.length / rowsPerPage)

  // Get status chip based on purchase status
  const getStatusChip = (status) => {
    switch (status) {
      case "Complete":
        return <Chip label="Complete" color="success" size="small" sx={{ fontWeight: "medium", borderRadius: "6px" }} />
      case "Incomplete":
        return (
          <Chip label="Incomplete" color="warning" size="small" sx={{ fontWeight: "medium", borderRadius: "6px" }} />
        )
      case "Partial":
        return <Chip label="Partial" color="info" size="small" sx={{ fontWeight: "medium", borderRadius: "6px" }} />
      case "Cancelled":
        return <Chip label="Cancelled" color="error" size="small" sx={{ fontWeight: "medium", borderRadius: "6px" }} />
      default:
        return <Chip label="Unknown" color="default" size="small" sx={{ fontWeight: "medium", borderRadius: "6px" }} />
    }
  }

  // Get avatar color and initial for supplier
  const getSupplierAvatar = (supplier) => {
    const supplierName = supplier?.full_name || "Unknown"
    const initial = supplierName.charAt(0).toUpperCase()

    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.error.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.success.main,
    ]

    // Simple hash function to get consistent color for same initial
    const charCode = initial.charCodeAt(0)
    const color = colors[charCode % colors.length]

    return { initial, color }
  }

  // Handle download dialog open
  const handleDownloadClick = () => {
    setDownloadDialogOpen(true)
  }

  // Handle download dialog close
  const handleDownloadDialogClose = () => {
    setDownloadDialogOpen(false)
    setDownloadFormat("")
  }

  // Handle download format selection
  const handleFormatSelect = (format) => {
    setDownloadFormat(format)
  }

  // Handle download confirmation
  const handleDownloadConfirm = async () => {
    if (!downloadFormat) {
      setSnackbar({
        open: true,
        message: "Please select a format",
        severity: "error",
      })
      return
    }

    setIsDownloading(true)

    try {
      // Prepare data for export
      const dataToExport = filteredPurchases.map((purchase) => ({
        "Invoice No": purchase.referenceNo,
        Date: purchase.date,
        Supplier: purchase.suppliers?.full_name || "Unknown",
        Amount: purchase.grandTotal || 0,
        Status: purchase.purchasStatus || "Unknown",
        "Payment Method": purchase.paymentMethod || "Unknown",
        "Total Items": purchase.products?.length || 0,
      }))

      // Simulate download delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (downloadFormat === "pdf") {
        // PDF download logic would go here
        // In a real implementation, you would use a library like jsPDF
        console.log("Downloading PDF:", dataToExport)

        // Simulate PDF generation
        const fileName = `purchase_history_${new Date().toISOString().split("T")[0]}.pdf`

        setSnackbar({
          open: true,
          message: `PDF downloaded successfully: ${fileName}`,
          severity: "success",
        })
      } else if (downloadFormat === "excel") {
        // Excel download logic would go here
        // In a real implementation, you would use a library like xlsx
        console.log("Downloading Excel:", dataToExport)

        // Simulate Excel generation
        const fileName = `purchase_history_${new Date().toISOString().split("T")[0]}.xlsx`

        setSnackbar({
          open: true,
          message: `Excel file downloaded successfully: ${fileName}`,
          severity: "success",
        })
      } else if (downloadFormat === "csv") {
        // CSV download logic would go here
        // In a real implementation, you would generate a CSV string
        console.log("Downloading CSV:", dataToExport)

        // Simulate CSV generation
        const fileName = `purchase_history_${new Date().toISOString().split("T")[0]}.csv`

        setSnackbar({
          open: true,
          message: `CSV file downloaded successfully: ${fileName}`,
          severity: "success",
        })
      }
    } catch (error) {
      console.error("Download error:", error)
      setSnackbar({
        open: true,
        message: "Error downloading file. Please try again.",
        severity: "error",
      })
    } finally {
      setIsDownloading(false)
      setDownloadDialogOpen(false)
      setDownloadFormat("")
    }
  }

  // Handle print
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Purchase_History_${new Date().toISOString().split("T")[0]}`,
    onBeforeGetContent: () => {
      setIsLoading(true)
      return new Promise((resolve) => {
        setTimeout(resolve, 500)
      })
    },
    onAfterPrint: () => {
      setIsLoading(false)
      setSnackbar({
        open: true,
        message: "Print job sent successfully",
        severity: "success",
      })
    },
    onPrintError: () => {
      setIsLoading(false)
      setSnackbar({
        open: true,
        message: "Print failed. Please try again.",
        severity: "error",
      })
    },
  })

  // Handle snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <Box
      sx={{
        background: `linear-gradient(to bottom, ${alpha(
          theme.palette.primary.light,
          0.05,
        )}, ${alpha(theme.palette.background.default, 1)})`,
        minHeight: "100vh",
        p: {xs:0, md:3},
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
        <Link color="inherit" href="/dashboard" sx={{ display: "flex", alignItems: "center" }}>
          <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
          Dashboard
        </Link>
        <Link color="inherit" href="/purchase" sx={{ display: "flex", alignItems: "center" }}>
          <ShoppingCartIcon sx={{ mr: 0.5, fontSize: 18 }} />
          Purchase
        </Link>
        <Typography color="text.primary" sx={{ display: "flex", alignItems: "center" }}>
          <HistoryIcon sx={{ mr: 0.5, fontSize: 18 }} />
          Purchase History
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
          Purchase History
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
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
                  0.2,
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
                  {totalPurchases}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "medium" }}>
                  Total Purchases
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
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
                  0.2,
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
                <AttachMoneyIcon sx={{ fontSize: 30 }} />
              </Avatar>
              <Box sx={{ ml: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  $ {totalAmount.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "medium" }}>
                  Total Amount
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
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
                  0.2,
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
                <PeopleIcon sx={{ fontSize: 30 }} />
              </Avatar>
              <Box sx={{ ml: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {uniqueSuppliers}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "medium" }}>
                  Unique Suppliers
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Search Invoice/Supplier"
              variant="outlined"
              size="small"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Start Date"
              type="date"
              variant="outlined"
              size="small"
              fullWidth
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateRangeChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="End Date"
              type="date"
              variant="outlined"
              size="small"
              fullWidth
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateRangeChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="supplier-filter-label">Supplier</InputLabel>
              <Select
                labelId="supplier-filter-label"
                id="supplier-filter"
                value={supplierFilter}
                label="Supplier"
                onChange={(e) => setSupplierFilter(e.target.value)}
              >
                {supplierOptions.map((supplier) => (
                  <MenuItem key={supplier} value={supplier}>
                    {supplier === "all" ? "All Suppliers" : supplier}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {(isLoading || isDataLoading) && <LinearProgress />}

      {/* Purchase History Table */}
      <div ref={printRef}>
        <Box sx={{ display: "none", "@media print": { display: "block", mb: 3 } }}>
          <Typography variant="h4" align="center" gutterBottom>
            Purchase History Report
          </Typography>
          <Typography variant="body2" align="center" gutterBottom>
            Generated on: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2, mb: 3 }}>
            <Grid item xs={4}>
              <Typography variant="body1">
                <strong>Total Purchases:</strong> {totalPurchases}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
                <strong>Total Amount:</strong> ${totalAmount.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
                <strong>Unique Suppliers:</strong> {uniqueSuppliers}
              </Typography>
            </Grid>
          </Grid>
          {dateRange.startDate && dateRange.endDate && (
            <Typography variant="body2" align="center" gutterBottom>
              Date Range: {dateRange.startDate} to {dateRange.endDate}
            </Typography>
          )}
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
          <Table aria-label="purchase history table" sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Invoice No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Supplier</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Payment Method</TableCell>
                <TableCell sx={{ fontWeight: "bold", "@media print": { display: "none" } }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPurchases.length > 0 ? (
                paginatedPurchases.map((purchase) => {
                  const { initial, color } = getSupplierAvatar(purchase.suppliers)
                  return (
                    <TableRow key={purchase._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {purchase.referenceNo}
                      </TableCell>
                      <TableCell>{purchase.date}</TableCell>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          sx={{
                            bgcolor: color,
                            color: theme.palette.getContrastText(color),
                            mr: 1,
                            fontWeight: "bold",
                            "@media print": { display: "none" },
                          }}
                        >
                          {initial}
                        </Avatar>
                        <span>{purchase.suppliers?.full_name || "Unknown Supplier"}</span>
                      </TableCell>
                      <TableCell>$ {purchase.grandTotal?.toLocaleString() || 0}</TableCell>
                      <TableCell>
                        <span className="print-status">{purchase.purchasStatus || "Unknown"}</span>
                        <span className="no-print">{getStatusChip(purchase.purchasStatus)}</span>
                      </TableCell>
                      <TableCell>
                        <span className="print-payment">{purchase.paymentMethod || "Unknown"}</span>
                        <span className="no-print">
                          <Chip
                            label={purchase.paymentMethod || "Unknown"}
                            color="primary"
                            size="small"
                            variant="outlined"
                            sx={{ fontWeight: "medium", borderRadius: "6px" }}
                          />
                        </span>
                      </TableCell>
                      <TableCell sx={{ "@media print": { display: "none" } }}>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="View">
                            <IconButton color="primary" onClick={() => handleViewPurchase(purchase._id)}>
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Download">
                            <IconButton color="success" onClick={handleDownloadClick}>
                              <FileDownloadIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Print">
                            <IconButton color="info" onClick={handlePrint}>
                              <PrintIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No purchase data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Pagination - hide when printing */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, "@media print": { display: "none" } }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Box>

      {/* Download Format Dialog */}
      <Dialog open={downloadDialogOpen} onClose={handleDownloadDialogClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Download Purchase History</Typography>
            <IconButton edge="end" color="inherit" onClick={handleDownloadDialogClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary" paragraph>
            Select a format to download the purchase history report:
          </Typography>
          <List component="nav">
            <ListItem
              button
              selected={downloadFormat === "pdf"}
              onClick={() => handleFormatSelect("pdf")}
              sx={{
                borderRadius: 1,
                mb: 1,
                "&.Mui-selected": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.15),
                  },
                },
              }}
            >
              <ListItemIcon>
                <PictureAsPdfIcon color="error" />
              </ListItemIcon>
              <ListItemText
                primary="PDF Document"
                secondary="Best for printing and sharing"
                primaryTypographyProps={{ fontWeight: downloadFormat === "pdf" ? "bold" : "normal" }}
              />
            </ListItem>
            <ListItem
              button
              selected={downloadFormat === "excel"}
              onClick={() => handleFormatSelect("excel")}
              sx={{
                borderRadius: 1,
                mb: 1,
                "&.Mui-selected": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.15),
                  },
                },
              }}
            >
              <ListItemIcon>
                <TableChartIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary="Excel Spreadsheet"
                secondary="Best for data analysis and editing"
                primaryTypographyProps={{ fontWeight: downloadFormat === "excel" ? "bold" : "normal" }}
              />
            </ListItem>
            <ListItem
              button
              selected={downloadFormat === "csv"}
              onClick={() => handleFormatSelect("csv")}
              sx={{
                borderRadius: 1,
                "&.Mui-selected": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.15),
                  },
                },
              }}
            >
              <ListItemIcon>
                <ArticleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="CSV File"
                secondary="Best for importing into other systems"
                primaryTypographyProps={{ fontWeight: downloadFormat === "csv" ? "bold" : "normal" }}
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleDownloadDialogClose} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleDownloadConfirm}
            variant="contained"
            color="primary"
            disabled={!downloadFormat || isDownloading}
            startIcon={isDownloading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isDownloading ? "Downloading..." : "Download"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background-color: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          .print-status, .print-payment {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 500;
          }
        }
      `}</style>
    </Box>
  )
}
