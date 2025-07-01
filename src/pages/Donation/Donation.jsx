/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Chip,
  LinearProgress,
  Fade,
  Slide,
  Divider,
  Stack,
  useTheme,
  alpha,
} from "@mui/material"
import {
  Favorite,
  Person,
  Payment,
  ArrowForward,
  ArrowBack,
  CheckCircle,
  VolunteerActivism,
  Phone,
  LocationOn,
  Email,
  Public,
  AttachMoney,
} from "@mui/icons-material"

const steps = ["Personal Info", "Donation Details", "Payment Method", "Review & Submit"]

const paymentMethods = [
  { value: "Bkash", label: "Bkash", icon: "📱", color: "#E2136E" },
  { value: "Nagad", label: "Nagad", icon: "💳", color: "#F99500" },
  { value: "Rocket", label: "Rocket", icon: "🚀", color: "#8B1538" },
  { value: "Check", label: "Bank Check", icon: "🏦", color: "#1976D2" },
  { value: "Card", label: "Credit Card", icon: "💳", color: "#4CAF50" },
  { value: "Bank Transfer", label: "Bank Transfer", icon: "🏛️", color: "#FF9800" },
  { value: "Other", label: "Other", icon: "💰", color: "#9C27B0" },
]

const bankOptions = [
  "Bangladesh Bank",
  "Sonali Bank",
  "Janata Bank",
  "Agrani Bank",
  "Rupali Bank",
  "Pubali Bank",
  "Uttara Bank",
  "Islami Bank Bangladesh Limited",
  "Dutch-Bangla Bank",
  "BRAC Bank",
  "Eastern Bank",
  "National Bank",
  "Prime Bank",
  "Standard Bank",
  "One Bank",
  "Bank Asia",
  "Trust Bank",
  "City Bank",
  "Southeast Bank",
]

export default function DonationForm() {
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const [selectedPayment, setSelectedPayment] = useState("")
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const watchedValues = watch()
  const paymentMethod = watch("payment_method")

  const onSubmit = async (data) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success("Donation submitted successfully! Thank you for your generosity.")
      console.log("Donation data:", data)
    } catch (error) {
      toast.error("Failed to submit donation. Please try again.")
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const renderPaymentFields = () => {
    if (!paymentMethod) return null

    const commonFieldStyle = {
      "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        "&:hover fieldset": {
          borderColor: theme.palette.primary.main,
        },
      },
    }

    switch (paymentMethod) {
      case "Check":
        return (
          <Fade in timeout={500}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={commonFieldStyle}>
                  <InputLabel>Select Bank</InputLabel>
                  <Select label="Select Bank" {...register("payment_account")}>
                    {bankOptions.map((bank) => (
                      <MenuItem key={bank} value={bank}>
                        {bank}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Account Number" {...register("bank_account_no")} sx={commonFieldStyle} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Check Number" {...register("check_no")} sx={commonFieldStyle} />
              </Grid>
            </Grid>
          </Fade>
        )

      case "Bank Transfer":
        return (
          <Fade in timeout={500}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Bank Account Number"
                  {...register("bank_account_no")}
                  sx={commonFieldStyle}
                />
              </Grid>
            </Grid>
          </Fade>
        )

      case "Card":
        return (
          <Fade in timeout={500}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Card Number" {...register("card_number")} sx={commonFieldStyle} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Card Holder Name" {...register("card_holder_name")} sx={commonFieldStyle} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Expiry Month" {...register("month_first")} sx={commonFieldStyle} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Expiry Year" {...register("year")} sx={commonFieldStyle} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="CVV" {...register("security_code")} sx={commonFieldStyle} />
              </Grid>
            </Grid>
          </Fade>
        )

      case "Bkash":
      case "Nagad":
      case "Rocket":
      case "Other":
        return (
          <Fade in timeout={500}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Transaction Number" {...register("transaction_no")} sx={commonFieldStyle} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Transaction ID" {...register("transactionId")} sx={commonFieldStyle} />
              </Grid>
            </Grid>
          </Fade>
        )

      default:
        return null
    }
  }

  const getStepContent = (step) => {
    const fieldStyle = {
      "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        "&:hover fieldset": {
          borderColor: theme.palette.primary.main,
        },
      },
    }

    switch (step) {
      case 0:
        return (
          <Slide direction="left" in mountOnEnter unmountOnExit>
            <Card elevation={0} sx={{ bgcolor: "transparent" }}>
              <CardContent sx={{ p: 0 }}>
                <Box textAlign="center" mb={4}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: theme.palette.primary.main,
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    <Person sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Personal Information
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tell us about yourself to personalize your donation experience
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      {...register("name", { required: "Name is required" })}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      InputProps={{
                        startAdornment: <Person sx={{ color: "action.active", mr: 1 }} />,
                      }}
                      sx={fieldStyle}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Mobile Number"
                      {...register("mobile_number", { required: "Mobile number is required" })}
                      error={!!errors.mobile_number}
                      helperText={errors.mobile_number?.message}
                      InputProps={{
                        startAdornment: <Phone sx={{ color: "action.active", mr: 1 }} />,
                      }}
                      sx={fieldStyle}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputProps={{
                        startAdornment: <Email sx={{ color: "action.active", mr: 1 }} />,
                      }}
                      sx={fieldStyle}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Country"
                      {...register("donation_country")}
                      InputProps={{
                        startAdornment: <Public sx={{ color: "action.active", mr: 1 }} />,
                      }}
                      sx={fieldStyle}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      multiline
                      rows={3}
                      {...register("address")}
                      InputProps={{
                        startAdornment: <LocationOn sx={{ color: "action.active", mr: 1, mt: 1 }} />,
                      }}
                      sx={fieldStyle}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Slide>
        )

      case 1:
        return (
          <Slide direction="left" in mountOnEnter unmountOnExit>
            <Card elevation={0} sx={{ bgcolor: "transparent" }}>
              <CardContent sx={{ p: 0 }}>
                <Box textAlign="center" mb={4}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: theme.palette.secondary.main,
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    <VolunteerActivism sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Donation Details
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Share your generous contribution details
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Donation Purpose"
                      {...register("donation_purpose", { required: "Purpose is required" })}
                      error={!!errors.donation_purpose}
                      helperText={errors.donation_purpose?.message}
                      sx={fieldStyle}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Donation Amount"
                      type="number"
                      {...register("donation_amount", {
                        required: "Amount is required",
                        min: { value: 1, message: "Amount must be greater than 0" },
                      })}
                      error={!!errors.donation_amount}
                      helperText={errors.donation_amount?.message}
                      InputProps={{
                        startAdornment: <AttachMoney sx={{ color: "action.active", mr: 1 }} />,
                      }}
                      sx={fieldStyle}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Additional Message (Optional)"
                      multiline
                      rows={4}
                      {...register("description")}
                      placeholder="Share your thoughts or dedication message..."
                      sx={fieldStyle}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Slide>
        )

      case 2:
        return (
          <Slide direction="left" in mountOnEnter unmountOnExit>
            <Card elevation={0} sx={{ bgcolor: "transparent" }}>
              <CardContent sx={{ p: 0 }}>
                <Box textAlign="center" mb={4}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: theme.palette.success.main,
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    <Payment sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Payment Method
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Choose your preferred payment method
                  </Typography>
                </Box>

                <Grid container spacing={2} mb={4}>
                  {paymentMethods.map((method) => (
                    <Grid item xs={12} sm={6} md={4} key={method.value}>
                      <Card
                        sx={{
                          cursor: "pointer",
                          border: paymentMethod === method.value ? 2 : 1,
                          borderColor: paymentMethod === method.value ? method.color : "divider",
                          bgcolor: paymentMethod === method.value ? alpha(method.color, 0.1) : "background.paper",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: theme.shadows[8],
                          },
                        }}
                        onClick={() => setSelectedPayment(method.value)}
                      >
                        <CardContent sx={{ textAlign: "center", py: 3 }}>
                          <Typography variant="h4" mb={1}>
                            {method.icon}
                          </Typography>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {method.label}
                          </Typography>
                          <input
                            type="radio"
                            value={method.value}
                            {...register("payment_method", { required: "Payment method is required" })}
                            style={{ display: "none" }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {errors.payment_method && (
                  <Typography color="error" variant="body2" mb={2}>
                    {errors.payment_method.message}
                  </Typography>
                )}

                {paymentMethod && (
                  <Box
                    sx={{
                      p: 3,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      borderRadius: 2,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {paymentMethods.find((m) => m.value === paymentMethod)?.label} Details
                    </Typography>
                    {renderPaymentFields()}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Slide>
        )

      case 3:
        return (
          <Slide direction="left" in mountOnEnter unmountOnExit>
            <Card elevation={0} sx={{ bgcolor: "transparent" }}>
              <CardContent sx={{ p: 0 }}>
                <Box textAlign="center" mb={4}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: theme.palette.warning.main,
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    <CheckCircle sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Review Your Donation
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Please review your information before submitting
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                      <Typography variant="h6" gutterBottom color="primary">
                        Personal Information
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Stack spacing={1}>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Name:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {watchedValues.name || "Not provided"}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Email:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {watchedValues.email || "Not provided"}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Mobile:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {watchedValues.mobile_number || "Not provided"}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Country:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {watchedValues.donation_country || "Not provided"}
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                      <Typography variant="h6" gutterBottom color="secondary">
                        Donation Details
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Stack spacing={1}>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Purpose:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {watchedValues.donation_purpose || "Not provided"}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Amount:
                          </Typography>
                          <Typography variant="h6" color="success.main" fontWeight="bold">
                            ${watchedValues.donation_amount || "0"}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Payment:
                          </Typography>
                          <Chip label={watchedValues.payment_method || "Not selected"} size="small" color="primary" />
                        </Box>
                      </Stack>
                    </Paper>
                  </Grid>
                  {watchedValues.description && (
                    <Grid item xs={12}>
                      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          Your Message
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                          {watchedValues.description}
                        </Typography>
                      </Paper>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Slide>
        )

      default:
        return "Unknown step"
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      {/* Hero Section */}
     

      {/* Main Content */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, py: 6 }}>
        <Paper
          elevation={8}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          }}
        >
          {/* Stepper */}
          <Box sx={{ p: 4, bgcolor: "background.paper" }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconProps={{
                      sx: {
                        "&.Mui-active": {
                          color: theme.palette.primary.main,
                        },
                        "&.Mui-completed": {
                          color: theme.palette.success.main,
                        },
                      },
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight="medium">
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Divider />

          {/* Form Content */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ p: 4, minHeight: 600 }}>{getStepContent(activeStep)}</Box>

            <Divider />

            {/* Navigation Buttons */}
            <Box sx={{ p: 4, display: "flex", justifyContent: "space-between", bgcolor: "grey.50" }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBack />}
                variant="outlined"
                size="large"
                sx={{ borderRadius: 2 }}
              >
                Back
              </Button>

              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<Favorite />}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                    "&:hover": {
                      background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
                    },
                  }}
                >
                  Submit Donation
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{ borderRadius: 2, px: 4 }}
                >
                  Next
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  )
}
