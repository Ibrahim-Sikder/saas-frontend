import {
  CalendarToday,
  Close,
  CreditCard,
  Download,
  Info,
  Lock,
  Person,
  Visibility,
} from "@mui/icons-material";
import {
  Alert,
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion"

const SubscriptionPage = () => {
  const theme = useTheme();
  const [subscription, setSubscription] = useState({
    plan: "Monthly",
    status: "Active",
    startDate: "2023-06-01",
    endDate: "2023-07-01",
    daysLeft: 15,
    totalDays: 30,
    autoRenew: true,
  });

  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: "1",
      date: "2023-06-01",
      amount: 49.99,
      status: "Completed",
      method: "Visa ending in 4242",
      invoice: "INV-2023-001",
    },
    {
      id: "2",
      date: "2023-05-01",
      amount: 49.99,
      status: "Completed",
      method: "Visa ending in 4242",
      invoice: "INV-2023-002",
    },
    {
      id: "3",
      date: "2023-04-01",
      amount: 49.99,
      status: "Completed",
      method: "Visa ending in 4242",
      invoice: "INV-2023-003",
    },
  ]);

  const [openUpgradeDialog, setOpenUpgradeDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: "John Doe",
    cardNumber: "•••• •••• •••• 4242",
    expiryDate: "12/25",
    cvv: "",
  });

  const handleUpgrade = (plan) => {
    setSelectedPlan(plan);
    setOpenUpgradeDialog(true);
  };

  const handleConfirmUpgrade = () => {
    setOpenUpgradeDialog(false);
    setOpenPaymentDialog(true);
  };

  const handlePaymentSubmit = () => {
    // In a real app, you would process the payment here
    setOpenPaymentDialog(false);

    // Update subscription
    setSubscription({
      ...subscription,
      plan: selectedPlan,
      endDate:
        selectedPlan === "Monthly"
          ? "2023-07-01"
          : selectedPlan === "HalfYearly"
          ? "2023-12-01"
          : "2024-06-01",
    });

    // Add to payment history
    const amount =
      selectedPlan === "Monthly"
        ? 49.99
        : selectedPlan === "HalfYearly"
        ? 269.99
        : 499.99;

    setPaymentHistory([
      {
        id: (paymentHistory.length + 1).toString(),
        date: new Date().toISOString().split("T")[0],
        amount,
        status: "Completed",
        method: "Visa ending in 4242",
        invoice: `INV-2023-00${paymentHistory.length + 1}`,
      },
      ...paymentHistory,
    ]);
  };

  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value,
    });
  };

  const calculateProgress = () => {
    return (subscription.daysLeft / subscription.totalDays) * 100;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        p: 3,
        background: "linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%)",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Subscription Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your subscription plan and payment details
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <motion.div variants={itemVariants}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                mb: 4,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: 3,
                  background:
                    "linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Current Subscription
                  </Typography>
                  <Chip
                    label={subscription.status}
                    color={
                      subscription.status === "Active" ? "success" : "error"
                    }
                    size="small"
                    sx={{
                      borderRadius: 1,
                      fontWeight: "medium",
                      "& .MuiChip-label": { px: 1.5 },
                    }}
                  />
                </Box>
              </Box>

              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Plan
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                        {subscription.plan} Plan
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Billing Cycle
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                        {subscription.plan === "Monthly"
                          ? "Monthly"
                          : subscription.plan === "HalfYearly"
                          ? "Every 6 months"
                          : "Yearly"}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Start Date
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                        {new Date(subscription.startDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Renewal Date
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                        {new Date(subscription.endDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ mt: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2" fontWeight="medium">
                          {subscription.daysLeft} days left until renewal
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {calculateProgress().toFixed(0)}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={calculateProgress()}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          "& .MuiLinearProgress-bar": {
                            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Auto-renewal
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                      {subscription.autoRenew ? "Enabled" : "Disabled"}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ borderRadius: 2 }}
                  >
                    {subscription.autoRenew ? "Disable" : "Enable"} Auto-renewal
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: 3,
                  background:
                    "linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Payment History
                </Typography>
              </Box>

              <CardContent sx={{ p: 3 }}>
                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{ borderRadius: 2, boxShadow: "none" }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Payment Method</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paymentHistory.map((payment) => (
                        <TableRow key={payment.id} hover>
                          <TableCell>
                            {new Date(payment.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>${payment.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Chip
                              label={payment.status}
                              color={
                                payment.status === "Completed"
                                  ? "success"
                                  : payment.status === "Pending"
                                  ? "warning"
                                  : "error"
                              }
                              size="small"
                              sx={{
                                borderRadius: 1,
                                "& .MuiChip-label": { px: 1 },
                              }}
                            />
                          </TableCell>
                          <TableCell>{payment.method}</TableCell>
                          <TableCell align="right">
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="flex-end"
                            >
                              <Tooltip title="View Invoice">
                                <IconButton size="small" color="primary">
                                  <Visibility />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Download Invoice">
                                <IconButton size="small" color="primary">
                                  <Download />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={4}>
          <motion.div variants={itemVariants}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                mb: 4,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: 3,
                  background:
                    "linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Upgrade Your Plan
                </Typography>
              </Box>

              <CardContent sx={{ p: 3 }}>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Get more features and benefits with our premium plans
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <Card
                    variant="outlined"
                    sx={{
                      mb: 3,
                      borderRadius: 2,
                      borderColor:
                        subscription.plan === "Monthly"
                          ? "primary.main"
                          : "divider",
                      borderWidth: subscription.plan === "Monthly" ? 2 : 1,
                      transition: "all 0.3s ease",
                      transform:
                        subscription.plan === "Monthly"
                          ? "scale(1.02)"
                          : "scale(1)",
                      boxShadow:
                        subscription.plan === "Monthly"
                          ? "0 8px 24px rgba(0, 0, 0, 0.12)"
                          : "none",
                      "&:hover": {
                        borderColor: "primary.main",
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            Monthly
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ my: 1, fontWeight: "bold" }}
                          >
                            $49.99
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            per month
                          </Typography>
                        </Box>
                        {subscription.plan === "Monthly" ? (
                          <Chip
                            label="Current Plan"
                            color="primary"
                            size="small"
                            sx={{
                              borderRadius: 1,
                              fontWeight: "medium",
                              "& .MuiChip-label": { px: 1.5 },
                            }}
                          />
                        ) : (
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleUpgrade("Monthly")}
                            sx={{ borderRadius: 2 }}
                          >
                            Downgrade
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>

                  <Card
                    variant="outlined"
                    sx={{
                      mb: 3,
                      borderRadius: 2,
                      borderColor:
                        subscription.plan === "HalfYearly"
                          ? "primary.main"
                          : "divider",
                      borderWidth: subscription.plan === "HalfYearly" ? 2 : 1,
                      transition: "all 0.3s ease",
                      transform:
                        subscription.plan === "HalfYearly"
                          ? "scale(1.02)"
                          : "scale(1)",
                      boxShadow:
                        subscription.plan === "HalfYearly"
                          ? "0 8px 24px rgba(0, 0, 0, 0.12)"
                          : "none",
                      "&:hover": {
                        borderColor: "primary.main",
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            Half Yearly
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ my: 1, fontWeight: "bold" }}
                          >
                            $269.99
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            $44.99/month (Save 10%)
                          </Typography>
                        </Box>
                        {subscription.plan === "HalfYearly" ? (
                          <Chip
                            label="Current Plan"
                            color="primary"
                            size="small"
                            sx={{
                              borderRadius: 1,
                              fontWeight: "medium",
                              "& .MuiChip-label": { px: 1.5 },
                            }}
                          />
                        ) : (
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleUpgrade("HalfYearly")}
                            sx={{ borderRadius: 2 }}
                          >
                            {subscription.plan === "Yearly"
                              ? "Downgrade"
                              : "Upgrade"}
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>

                  <Card
                    variant="outlined"
                    sx={{
                      position: "relative",
                      borderRadius: 2,
                      borderColor:
                        subscription.plan === "Yearly"
                          ? "primary.main"
                          : "divider",
                      borderWidth: subscription.plan === "Yearly" ? 2 : 1,
                      transition: "all 0.3s ease",
                      transform:
                        subscription.plan === "Yearly"
                          ? "scale(1.02)"
                          : "scale(1)",
                      boxShadow:
                        subscription.plan === "Yearly"
                          ? "0 8px 24px rgba(0, 0, 0, 0.12)"
                          : "none",
                      "&:hover": {
                        borderColor: "primary.main",
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        background:
                          "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                        color: "white",
                        px: 2,
                        py: 0.5,
                        borderBottomLeftRadius: 8,
                        fontWeight: "bold",
                        fontSize: "0.75rem",
                      }}
                    >
                      Best Value
                    </Box>
                    <CardContent sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            Yearly
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ my: 1, fontWeight: "bold" }}
                          >
                            $499.99
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            $41.67/month (Save 15%)
                          </Typography>
                        </Box>
                        {subscription.plan === "Yearly" ? (
                          <Chip
                            label="Current Plan"
                            color="primary"
                            size="small"
                            sx={{
                              borderRadius: 1,
                              fontWeight: "medium",
                              "& .MuiChip-label": { px: 1.5 },
                            }}
                          />
                        ) : (
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleUpgrade("Yearly")}
                            sx={{
                              borderRadius: 2,
                              background:
                                "linear-gradient(135deg, #2563eb 0%, #10b981 100%)",
                            }}
                          >
                            Upgrade
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: 3,
                  background:
                    "linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Payment Method
                </Typography>
              </Box>

              <CardContent sx={{ p: 3 }}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    p: 2,
                    mb: 2,
                    background:
                      "linear-gradient(135deg, rgba(37, 99, 235, 0.02) 0%, rgba(16, 185, 129, 0.02) 100%)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        mr: 2,
                      }}
                    >
                      <CreditCard />
                    </Avatar>
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {paymentInfo.cardNumber}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Expires {paymentInfo.expiryDate}
                      </Typography>
                    </Box>
                  </Box>
                </Card>

                <Button
                  variant="outlined"
                  fullWidth
                  size="medium"
                  onClick={() => setOpenPaymentDialog(true)}
                  sx={{ borderRadius: 2 }}
                >
                  Update payment method
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Upgrade Confirmation Dialog */}
      <Dialog
        open={openUpgradeDialog}
        onClose={() => setOpenUpgradeDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <DialogTitle sx={{ pb: 1, fontWeight: "bold" }}>
          Confirm Subscription Change
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenUpgradeDialog(false)}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "text.secondary",
          }}
        >
          <Close />
        </IconButton>
        <DialogContent>
          <Alert
            severity="info"
            sx={{
              mb: 3,
              borderRadius: 2,
            }}
            icon={<Info />}
          >
            You are about to change your subscription to the {selectedPlan}{" "}
            plan.
          </Alert>

          <Typography variant="body1" paragraph>
            {selectedPlan === "Monthly"
              ? "You will be charged $49.99 monthly."
              : selectedPlan === "HalfYearly"
              ? "You will be charged $269.99 every 6 months."
              : "You will be charged $499.99 yearly."}
          </Typography>

          <Typography variant="body1">
            Your new billing cycle will start immediately.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setOpenUpgradeDialog(false)}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmUpgrade}
            variant="contained"
            sx={{
              borderRadius: 2,
              background: "linear-gradient(135deg, #2563eb 0%, #10b981 100%)",
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog
        open={openPaymentDialog}
        onClose={() => setOpenPaymentDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <DialogTitle sx={{ pb: 1, fontWeight: "bold" }}>
          Update Payment Method
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenPaymentDialog(false)}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "text.secondary",
          }}
        >
          <Close />
        </IconButton>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="cardName"
                name="cardName"
                label="Name on Card"
                value={paymentInfo.cardName}
                onChange={handlePaymentInfoChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="cardNumber"
                name="cardNumber"
                label="Card Number"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentInfoChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCard color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="expiryDate"
                name="expiryDate"
                label="Expiry Date (MM/YY)"
                value={paymentInfo.expiryDate}
                onChange={handlePaymentInfoChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarToday color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="cvv"
                name="cvv"
                label="CVV"
                value={paymentInfo.cvv}
                onChange={handlePaymentInfoChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setOpenPaymentDialog(false)}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePaymentSubmit}
            variant="contained"
            sx={{
              borderRadius: 2,
              background: "linear-gradient(135deg, #2563eb 0%, #10b981 100%)",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubscriptionPage;
