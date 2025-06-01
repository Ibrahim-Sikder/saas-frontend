"use client"

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react"
import { useGetSalaryForProfileQuery } from "../../../../redux/api/salary"
import {
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
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
  Typography,
  useTheme,
  IconButton,
  Tooltip,
  LinearProgress,
  Button,
} from "@mui/material"
import {
  AttachMoney,
  CalendarMonth,
  MonetizationOn,
  CheckCircle,
  TimerOutlined,
  Add,
  History,
  Edit,
  Delete,
  Payment,
  HourglassEmpty,
  Clear,
} from "@mui/icons-material"
import Loading from "../../../../components/Loading/Loading"
import { allMonths } from "../../../../utils/month"
import PartialPaymentModal from "../PartialSalaryPaymentModal"
import PaymentHistoryModal from './PaymentHistoryModal.jsx'

const EmployeeSalary = ({ id }) => {
  const theme = useTheme()
  const [currentPage, setCurrentPage] = useState(1)
  const [filterMonth, setFilterMonth] = useState("")
  const [selectedSalary, setSelectedSalary] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [paymentHistoryOpen, setPaymentHistoryOpen] = useState(false)
  const [selectedPaymentHistory, setSelectedPaymentHistory] = useState(null)
  const limit = 10

  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString("default", { month: "long" })
  const currentYear = currentDate.getFullYear()

  const { data, isLoading, refetch } = useGetSalaryForProfileQuery({
    id,
    limit,
    page: currentPage,
    searchTerm: filterMonth,
  })

  const handleMonthChange = (event) => {
    setFilterMonth(event.target.value)
    setCurrentPage(1)
  }

  const handleResetFilter = () => {
    setFilterMonth("")
    setCurrentPage(1)
  }

  const handleOpenPaymentModal = (salary) => {
    // Use the actual data structure from API
    const transformedSalary = {
      _id: salary._id,
      month_of_salary: salary.month_of_salary,
      year_of_salary: salary.year_of_salary,
      total_payment: salary.total_payment,
      paid_amount: salary.paid_amount,
      due_amount: salary.due_amount,
      payment_status: salary.payment_status,
      payment_history: salary.payment_history || [],
    }

    const employee = {
      _id: salary.employee?._id || id,
      full_name: salary.full_name,
      employeeId: salary.employeeId,
    }

    setSelectedSalary({ ...transformedSalary, employee })
    setModalOpen(true)
  }

  const handleOpenPaymentHistory = (salary) => {
    setSelectedPaymentHistory({
      paymentHistory: salary.payment_history || [],
      employeeName: salary.full_name,
      employeeId: salary.employeeId,
      month: salary.month_of_salary,
      year: salary.year_of_salary,
    })
    setPaymentHistoryOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedSalary(null)
  }

  const handleClosePaymentHistory = () => {
    setPaymentHistoryOpen(false)
    setSelectedPaymentHistory(null)
  }

  const handlePaymentSuccess = async () => {
    await refetch()
    handleCloseModal()
  }

  const getPaymentProgress = (paidAmount, totalAmount) => {
    if (!totalAmount || totalAmount === 0) return 0
    return Math.min((paidAmount / totalAmount) * 100, 100)
  }

  const getPaymentStatusDisplay = (salary) => {
    const status = salary.payment_status || "pending"

    switch (status) {
      case "completed":
        return {
          status: "completed",
          label: "Fully Paid",
          color: "success",
          icon: <CheckCircle />,
        }
      case "partial":
        return {
          status: "partial",
          label: "Partial",
          color: "warning",
          icon: <Payment />,
        }
      case "pending":
      default:
        return {
          status: "pending",
          label: "Pending",
          color: "error",
          icon: <HourglassEmpty />,
        }
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Box sx={{ pt: 2, pb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.background.paper})`,
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <MonetizationOn fontSize="large" color="primary" />
          </Grid>
          <Grid item xs>
            <Typography variant="h5" fontWeight="bold" color="primary">
              Salary History with Payment Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filterMonth ? filterMonth : currentMonth} {currentYear} - Employee ID: {id}
            </Typography>
          </Grid>
          <Grid item>
            <Chip
              icon={<CalendarMonth />}
              label={`${currentMonth} ${currentYear}`}
              color="primary"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="month-select-label">Filter by Month</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              value={filterMonth}
              label="Filter by Month"
              onChange={handleMonthChange}
            >
              <MenuItem value="">All Months</MenuItem>
              {allMonths.map((month) => (
                <MenuItem value={month} key={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleResetFilter}
            startIcon={<Clear />}
            fullWidth
            sx={{ height: "56px" }}
          >
            Reset Filter
          </Button>
        </Grid>
      </Grid>

      <Card elevation={4} sx={{ mb: 4, borderRadius: 2, overflow: "auto" }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              "& .MuiTableCell-root": {
                padding: "12px",
                whiteSpace: "nowrap",
              },
            }}
          >
            <Table sx={{ minWidth: 1400 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold", width: "120px" }}>Employee ID</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", width: "150px" }}>Month of Salary</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", width: "120px" }}>Bonus</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", width: "120px" }}>Overtime</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", width: "120px" }}>Salary Amount</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", width: "120px" }}>Total Payment</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", width: "120px" }}>Paid Amount</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", width: "120px" }}>Due Amount</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", width: "150px" }}>Payment Progress</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", width: "120px" }}>Status</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", width: "150px" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data?.salaries?.map((salary) => {
                  // Remove the calculation lines and use direct fields:
                  const paidAmount = salary.paid_amount || 0
                  const dueAmount = salary.due_amount || 0
                  const paymentProgress = getPaymentProgress(paidAmount, salary.total_payment)
                  const paymentStatus = getPaymentStatusDisplay(salary)

                  return (
                    <TableRow
                      key={salary._id}
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: theme.palette.action.hover,
                        },
                        "&:hover": {
                          backgroundColor: theme.palette.action.selected,
                        },
                      }}
                    >
                      <TableCell>
                        <Chip size="small" label={salary.employeeId} variant="outlined" color="primary" />
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CalendarMonth fontSize="small" color="primary" sx={{ mr: 1 }} />
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {salary.month_of_salary}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {salary.year_of_salary}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <AttachMoney fontSize="small" color="primary" sx={{ mr: 1 }} />
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: salary.bonus > 0 ? "bold" : "normal",
                            }}
                          >
                            {salary.bonus || "0"}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            gap: 0.5,
                          }}
                        >
                          <Chip
                            size="small"
                            icon={<TimerOutlined />}
                            label={`${salary.total_overtime || "0"}h`}
                            color={salary.total_overtime > 0 ? "success" : "default"}
                          />
                          <Typography variant="caption" color="text.secondary">
                            ৳{salary.overtime_amount || "0"}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <AttachMoney fontSize="small" color="success" sx={{ mr: 1 }} />
                          <Typography variant="body2" fontWeight="bold">
                            {salary.salary_amount || "0"}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            bgcolor: "primary.light",
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                          }}
                        >
                          <MonetizationOn fontSize="small" color="primary" sx={{ mr: 1 }} />
                          <Typography variant="body2" fontWeight="bold" color="primary.main">
                            {salary.total_payment || "0"}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color="success.main"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <AttachMoney fontSize="small" />
                          {paidAmount.toLocaleString()}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color={dueAmount > 0 ? "error.main" : "success.main"}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <AttachMoney fontSize="small" />
                          {dueAmount.toLocaleString()}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Box sx={{ width: "120px" }}>
                          <LinearProgress
                            variant="determinate"
                            value={paymentProgress}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              mb: 0.5,
                            }}
                            color={paymentStatus.status === "completed" ? "success" : "primary"}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {Math.round(paymentProgress)}%
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Chip
                          icon={paymentStatus.icon}
                          label={paymentStatus.label}
                          color={paymentStatus.color}
                          size="small"
                          variant={paymentStatus.status === "completed" ? "filled" : "outlined"}
                        />
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                          <Tooltip title={dueAmount <= 0 ? "Fully Paid" : "Add Payment"}>
                            <span>
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => handleOpenPaymentModal(salary)}
                                disabled={dueAmount <= 0}
                                sx={{
                                  bgcolor: theme.palette.primary.light + "20",
                                  "&:hover": {
                                    bgcolor: theme.palette.primary.light + "40",
                                  },
                                  "&:disabled": {
                                    bgcolor: theme.palette.grey[200],
                                  },
                                }}
                              >
                                <Add fontSize="small" />
                              </IconButton>
                            </span>
                          </Tooltip>

                          <Tooltip title="Payment History">
                            <IconButton
                              size="small"
                              color="info"
                              onClick={() => handleOpenPaymentHistory(salary)}
                              sx={{
                                bgcolor: theme.palette.info.light + "20",
                                "&:hover": {
                                  bgcolor: theme.palette.info.light + "40",
                                },
                              }}
                            >
                              <History fontSize="small" />
                            </IconButton>
                          </Tooltip>

                         
                         
                        </Box>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {data?.data?.salaries?.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={data?.data?.meta?.totalPages}
            page={currentPage}
            color="primary"
            onChange={(_, page) => setCurrentPage(page)}
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      {/* Partial Payment Modal */}
      {selectedSalary && (
        <PartialPaymentModal
          open={modalOpen}
          onClose={handleCloseModal}
          employee={selectedSalary.employee}
          salaryRecord={selectedSalary}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Payment History Modal */}
      {selectedPaymentHistory && (
        <PaymentHistoryModal
          open={paymentHistoryOpen}
          onClose={handleClosePaymentHistory}
          paymentHistory={selectedPaymentHistory.paymentHistory}
          employeeName={selectedPaymentHistory.employeeName}
          employeeId={selectedPaymentHistory.employeeId}
          month={selectedPaymentHistory.month}
          year={selectedPaymentHistory.year}
        />
      )}
    </Box>
  )
}

export default EmployeeSalary
