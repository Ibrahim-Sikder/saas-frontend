/* eslint-disable no-unused-vars */
"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Grid,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
  Stack,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material"
import { CheckCircle, Cancel, Visibility, Refresh, Search, AttachMoney, Schedule } from "@mui/icons-material"
import { motion } from "framer-motion"


const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState([])
  const [stats, setStats] = useState({
    totalActive: 0,
    totalExpired: 0,
    totalPending: 0,
    monthlyRevenue: 0,
  })
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubscription, setSelectedSubscription] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  const fetchSubscriptions = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/subscriptions?page=${page}&status=${statusFilter}&search=${searchTerm}`)
      const data = await response.json()

      if (data.success) {
        setSubscriptions(data.data.subscriptions)
        setStats(data.data.stats)
        setTotalPages(data.data.pagination.total)
      }
    } catch (error) {
      console.error("Error fetching subscriptions:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscriptions()
  }, [page, statusFilter, searchTerm])

  const handleApprove = async (subscriptionId) => {
    try {
      setActionLoading(true)
      const response = await fetch(`/api/admin/subscriptions/${subscriptionId}/approve`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (data.success) {
        fetchSubscriptions()
        setDialogOpen(false)
      }
    } catch (error) {
      console.error("Error approving subscription:", error)
    } finally {
      setActionLoading(false)
    }
  }

  const handleSuspend = async (subscriptionId) => {
    try {
      setActionLoading(true)
      const response = await fetch(`/api/admin/subscriptions/${subscriptionId}/suspend`, {
        method: "PATCH",
      })

      const data = await response.json()

      if (data.success) {
        fetchSubscriptions()
        setDialogOpen(false)
      }
    } catch (error) {
      console.error("Error suspending subscription:", error)
    } finally {
      setActionLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success"
      case "Expired":
        return "error"
      case "Pending":
        return "warning"
      default:
        return "default"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getDaysRemaining = (endDate) => {
    const now = new Date()
    const end = new Date(endDate)
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          🎯 Subscription Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage all customer subscriptions, approvals, and payments
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            title: "Active Subscriptions",
            value: stats.totalActive,
            icon: <CheckCircle />,
            color: "#4caf50",
            bgColor: "rgba(76, 175, 80, 0.1)",
          },
          {
            title: "Pending Approvals",
            value: stats.totalPending,
            icon: <Schedule />,
            color: "#ff9800",
            bgColor: "rgba(255, 152, 0, 0.1)",
          },
          {
            title: "Expired",
            value: stats.totalExpired,
            icon: <Cancel />,
            color: "#f44336",
            bgColor: "rgba(244, 67, 54, 0.1)",
          },
          {
            title: "Monthly Revenue",
            value: `$${stats.monthlyRevenue.toLocaleString()}`,
            icon: <AttachMoney />,
            color: "#2196f3",
            bgColor: "rgba(33, 150, 243, 0.1)",
          },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  background: stat.bgColor,
                  border: `1px solid ${stat.color}20`,
                  borderRadius: 3,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      background: stat.color,
                      borderRadius: "50%",
                      p: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {React.cloneElement(stat.icon, {
                      sx: { color: "#ffffff", fontSize: 24 },
                    })}
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight="bold" sx={{ color: stat.color }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Filters */}
      <Card elevation={0} sx={{ mb: 3, p: 3, borderRadius: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label="Status Filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Expired">Expired</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Refresh />}
              onClick={fetchSubscriptions}
              sx={{
                py: 1.5,
                borderRadius: 2,
                borderWidth: 2,
                "&:hover": {
                  borderWidth: 2,
                },
              }}
            >
              Refresh
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Subscriptions Table */}
      <Card elevation={0} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: "grey.50" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Plan</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Start Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>End Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Days Left</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription._id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: "primary.main" }}>{subscription.user.name.charAt(0).toUpperCase()}</Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {subscription.user.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {subscription.user.email}
                        </Typography>
                        {subscription.user.company && (
                          <Typography variant="caption" color="text.secondary" display="block">
                            {subscription.user.company}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={subscription.plan}
                      variant="outlined"
                      size="small"
                      sx={{
                        fontWeight: "bold",
                        borderWidth: 2,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={subscription.status}
                      color={getStatusColor(subscription.status)}
                      size="small"
                      sx={{ fontWeight: "bold" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold">
                      ${subscription.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{formatDate(subscription.startDate)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{formatDate(subscription.endDate)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={getDaysRemaining(subscription.endDate) <= 7 ? "error" : "text.primary"}
                      fontWeight="bold"
                    >
                      {getDaysRemaining(subscription.endDate)} days
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setSelectedSubscription(subscription)
                            setDialogOpen(true)
                          }}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      {subscription.status === "Pending" && (
                        <Tooltip title="Approve">
                          <IconButton size="small" color="success" onClick={() => handleApprove(subscription._id)}>
                            <CheckCircle fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}

                      {subscription.status === "Active" && (
                        <Tooltip title="Suspend">
                          <IconButton size="small" color="error" onClick={() => handleSuspend(subscription._id)}>
                            <Cancel fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, newPage) => setPage(newPage)}
            color="primary"
            size="large"
          />
        </Box>
      </Card>

      {/* Subscription Details Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        {selectedSubscription && (
          <>
            <DialogTitle>
              <Typography variant="h5" fontWeight="bold">
                Subscription Details
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <Card elevation={0} sx={{ p: 3, bgcolor: "grey.50", borderRadius: 2 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Customer Information
                    </Typography>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Name
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {selectedSubscription.user.name}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Email
                        </Typography>
                        <Typography variant="body1">{selectedSubscription.user.email}</Typography>
                      </Box>
                      {selectedSubscription.user.phone && (
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Phone
                          </Typography>
                          <Typography variant="body1">{selectedSubscription.user.phone}</Typography>
                        </Box>
                      )}
                      {selectedSubscription.user.company && (
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Company
                          </Typography>
                          <Typography variant="body1">{selectedSubscription.user.company}</Typography>
                        </Box>
                      )}
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card elevation={0} sx={{ p: 3, bgcolor: "grey.50", borderRadius: 2 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Subscription Details
                    </Typography>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Plan
                        </Typography>
                        <Chip label={selectedSubscription.plan} color="primary" sx={{ fontWeight: "bold" }} />
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Status
                        </Typography>
                        <Chip
                          label={selectedSubscription.status}
                          color={getStatusColor(selectedSubscription.status)}
                          sx={{ fontWeight: "bold" }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Amount
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" color="primary.main">
                          ${selectedSubscription.amount}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Period
                        </Typography>
                        <Typography variant="body1">
                          {formatDate(selectedSubscription.startDate)} - {formatDate(selectedSubscription.endDate)}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Days Remaining
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color={getDaysRemaining(selectedSubscription.endDate) <= 7 ? "error.main" : "success.main"}
                        >
                          {getDaysRemaining(selectedSubscription.endDate)} days
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>

              {selectedSubscription.status === "Pending" && (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircle />}
                  onClick={() => handleApprove(selectedSubscription._id)}
                  disabled={actionLoading}
                >
                  Approve Subscription
                </Button>
              )}

              {selectedSubscription.status === "Active" && (
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<Cancel />}
                  onClick={() => handleSuspend(selectedSubscription._id)}
                  disabled={actionLoading}
                >
                  Suspend Subscription
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default SubscriptionManagement
