/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
"use client"

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Button,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Alert,
  InputAdornment,
  IconButton,
  Paper,
  useTheme,
  CircularProgress,
  Container,
  styled,
  stepConnectorClasses,
} from "@mui/material"
import {
  Business,
  Person,
  Email,
  Phone,
  LocationOn,
  Lock,
  Visibility,
  VisibilityOff,
  Info,
  CheckCircle,
  CreditCard,
  CalendarToday,
  Domain,
  Check,
  ArrowForward,
  ArrowBack,
  ErrorOutline,
  Security,
  Payments,
} from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(95deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(95deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}))

// Custom styled step icon
const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
  }),
}))

// Step icon component
function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props

  const icons = {
    1: <Business />,
    2: <Person />,
    3: <Security />,
    4: <Payments />,
  }

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <Check /> : icons[String(icon)]}
    </ColorlibStepIconRoot>
  )
}

// Credit card component
const CreditCardDisplay = ({ cardNumber, cardName, expiryDate }) => {

  return (
    <Box
      sx={{
        width: "100%",
        height: 200,
        borderRadius: 4,
        p: 3,
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
        boxShadow: "0 20px 30px -10px rgba(59, 130, 246, 0.5)",
        color: "white",
        mb: 4,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 25px 35px -12px rgba(59, 130, 246, 0.6)",
        },
      }}
    >
      {/* Card chip */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          width: 50,
          height: 40,
          borderRadius: 1,
          bgcolor: "rgba(255, 255, 255, 0.2)",
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)",
          backgroundSize: "10px 10px",
        }}
      />

      {/* Card network logo */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          width: 60,
          height: 40,
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "1.2rem",
          color: "white",
        }}
      >
        VISA
      </Box>

      {/* Card number */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          transform: "translateY(-50%)",
          px: 3,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontFamily="monospace" letterSpacing={2}>
          {cardNumber || "•••• •••• •••• ••••"}
        </Typography>
      </Box>

      {/* Card holder name and expiry */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: 0,
          width: "100%",
          px: 3,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            CARD HOLDER
          </Typography>
          <Typography variant="body2" fontWeight="medium" textTransform="uppercase">
            {cardName || "YOUR NAME"}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            EXPIRES
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {expiryDate || "MM/YY"}
          </Typography>
        </Box>
      </Box>

      {/* Background pattern */}
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -100,
          left: -50,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
        }}
      />
    </Box>
  )
}

// Auth Layout component
const AuthLayout = ({ children, title, subtitle }) => {
  const theme = useTheme()

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Left side - Background design */}
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          width: "50%",
          position: "relative",
          background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
          color: "white",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(2px)",
          }}
        >
          {/* Background pattern elements */}
          <Box
            sx={{
              position: "absolute",
              top: "25%",
              left: "25%",
              width: 250,
              height: 250,
              borderRadius: "50%",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              mixBlendMode: "overlay",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "33%",
              right: "25%",
              width: 300,
              height: 300,
              borderRadius: "50%",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              mixBlendMode: "overlay",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "66%",
              left: "33%",
              width: 150,
              height: 150,
              borderRadius: "50%",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              mixBlendMode: "overlay",
            }}
          />
        </Box>

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            p: 6,
          }}
        >
          <Box sx={{ mb: 4 }}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
            Garage Master
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, textAlign: "center" }}>
            The complete solution for your garage business management
          </Typography>

          <Grid container spacing={3} sx={{ maxWidth: "md" }}>
            <Grid item xs={6}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(4px)",
                  borderRadius: 4,
                  p: 2,
                }}
              >
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                  500+
                </Typography>
                <Typography variant="body2">Businesses trust us</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(4px)",
                  borderRadius: 4,
                  p: 2,
                }}
              >
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                  99%
                </Typography>
                <Typography variant="body2">Customer satisfaction</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(4px)",
                  borderRadius: 4,
                  p: 2,
                }}
              >
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                  24/7
                </Typography>
                <Typography variant="body2">Customer support</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(4px)",
                  borderRadius: 4,
                  p: 2,
                }}
              >
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                  30%
                </Typography>
                <Typography variant="body2">Efficiency increase</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Right side - Form */}
      <Box
        sx={{
          width: { xs: "100%", lg: "50%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "md" }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" fontWeight="bold">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {children}
        </Box>
      </Box>
    </Box>
  )
}

const steps = ["Business Information", "Admin Account", "Subscription Plan", "Payment"]

const TenantRegistrationPage = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [completed, setCompleted] = useState(false)
  const { width, height } = useWindowSize()
  const confettiRef = useRef(null)

  // Form state
  const [formData, setFormData] = useState({
    // Business Information
    businessName: "",
    domain: "",
    phone: "",
    address: "",
    taxId: "",

    // Admin Account
    adminName: "",
    adminEmail: "",
    adminPassword: "",

    // Subscription Plan
    plan: "Monthly",

    // Payment
    paymentMethod: "creditCard", // Add payment method selection
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",

    // Mobile Banking
    mobileNumber: "",
    transactionId: "",

    // Manual Payment
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    preferredContactMethod: "email",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Update the handleNext function to validate based on payment method
  const handleNext = () => {
    // Validate current step
    if (activeStep === 0) {
      if (!formData.businessName || !formData.domain || !formData.phone) {
        setError("Please fill in all required fields")
        return
      }
    } else if (activeStep === 1) {
      if (!formData.adminName || !formData.adminEmail || !formData.adminPassword) {
        setError("Please fill in all required fields")
        return
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.adminEmail)) {
        setError("Please enter a valid email address")
        return
      }

      // Validate password strength
      if (formData.adminPassword.length < 8) {
        setError("Password must be at least 8 characters long")
        return
      }
    } else if (activeStep === 3) {
      // Validate payment information based on selected payment method
      if (formData.paymentMethod === "creditCard") {
        if (!formData.cardName || !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
          setError("Please fill in all credit card details")
          return
        }
      } else if (formData.paymentMethod === "mobileBanking") {
        if (!formData.mobileNumber || !formData.transactionId) {
          setError("Please fill in all mobile banking details")
          return
        }
      } else if (formData.paymentMethod === "manual") {
        if (!formData.contactName || !formData.contactEmail || !formData.contactPhone) {
          setError("Please fill in all contact details")
          return
        }

        // Validate contact email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.contactEmail)) {
          setError("Please enter a valid contact email address")
          return
        }
      }

      // Submit the form
      handleSubmit()
      return
    }

    setError("")
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    setError("")
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setCompleted(true)
    } catch (err) {
      setError("Failed to create tenant. Please try again.")
      setLoading(false)
    }
  }

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
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" key="step1">
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Box sx={{ mr: 3 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)",
                  }}
                >
                  <Business sx={{ fontSize: 40, color: "primary.main" }} />
                </Box>
              </Box>
              <Box>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Business Information
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Please provide your business details to set up your account.
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <TextField
                    required
                    fullWidth
                    id="businessName"
                    name="businessName"
                    label="Business Name"
                    value={formData.businessName}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Business color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>
              </Grid>

              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <TextField
                    required
                    fullWidth
                    id="domain"
                    name="domain"
                    label="Domain Name"
                    value={formData.domain}
                    onChange={handleChange}
                    helperText="This will be your unique identifier (e.g., yourcompany)"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Domain color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: <InputAdornment position="end">.garageapp.com</InputAdornment>,
                    }}
                  />
                </motion.div>
              </Grid>

              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    name="phone"
                    label="Business Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>
              </Grid>

              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    id="address"
                    name="address"
                    label="Business Address"
                    value={formData.address}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5 }}>
                          <LocationOn color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>
              </Grid>

              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    id="taxId"
                    name="taxId"
                    label="Tax ID (Optional)"
                    value={formData.taxId}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Business color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        )
      case 1:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" key="step2">
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Box sx={{ mr: 3 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)",
                  }}
                >
                  <Person sx={{ fontSize: 40, color: "primary.main" }} />
                </Box>
              </Box>
              <Box>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Admin Account
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Create an administrator account to manage your business.
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <TextField
                    required
                    fullWidth
                    id="adminName"
                    name="adminName"
                    label="Admin Name"
                    value={formData.adminName}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>
              </Grid>

              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <TextField
                    required
                    fullWidth
                    id="adminEmail"
                    name="adminEmail"
                    label="Admin Email"
                    type="email"
                    value={formData.adminEmail}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>
              </Grid>

              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <TextField
                    required
                    fullWidth
                    id="adminPassword"
                    name="adminPassword"
                    label="Admin Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.adminPassword}
                    onChange={handleChange}
                    helperText="Password must be at least 8 characters long"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        )
      case 2:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" key="step3">
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Box sx={{ mr: 3 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)",
                  }}
                >
                  <Payments sx={{ fontSize: 40, color: "primary.main" }} />
                </Box>
              </Box>
              <Box>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Choose a Subscription Plan
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Select the plan that best fits your business needs.
                </Typography>
              </Box>
            </Box>

            <FormControl component="fieldset" sx={{ width: "100%" }}>
              <RadioGroup aria-label="subscription-plan" name="plan" value={formData.plan} onChange={handleChange}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <Card
                        variant="outlined"
                        sx={{
                          height: "100%",
                          borderRadius: 4,
                          borderColor: formData.plan === "Monthly" ? "primary.main" : "divider",
                          borderWidth: formData.plan === "Monthly" ? 2 : 1,
                          transition: "all 0.3s ease",
                          transform: formData.plan === "Monthly" ? "scale(1.02)" : "scale(1)",
                          boxShadow: formData.plan === "Monthly" ? "0 15px 30px rgba(59, 130, 246, 0.2)" : "none",
                          "&:hover": {
                            borderColor: "primary.main",
                            transform: "scale(1.02)",
                            boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <FormControlLabel
                            value="Monthly"
                            control={<Radio />}
                            label={
                              <Box>
                                <Typography variant="h6" component="div" fontWeight="bold">
                                  Monthly
                                </Typography>
                                <Typography variant="h4" component="div" sx={{ my: 2, fontWeight: "bold" }}>
                                  $49.99
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  per month
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ mt: 2 }}>
                                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                    <CheckCircle fontSize="small" color="success" sx={{ mr: 1 }} />
                                    All core features
                                  </Typography>
                                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                    <CheckCircle fontSize="small" color="success" sx={{ mr: 1 }} />
                                    Up to 5 users
                                  </Typography>
                                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                                    <CheckCircle fontSize="small" color="success" sx={{ mr: 1 }} />
                                    Email support
                                  </Typography>
                                </Box>
                              </Box>
                            }
                            sx={{ m: 0, width: "100%", alignItems: "flex-start" }}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>

                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <Card
                        variant="outlined"
                        sx={{
                          height: "100%",
                          borderRadius: 4,
                          borderColor: formData.plan === "HalfYearly" ? "primary.main" : "divider",
                          borderWidth: formData.plan === "HalfYearly" ? 2 : 1,
                          transition: "all 0.3s ease",
                          transform: formData.plan === "HalfYearly" ? "scale(1.02)" : "scale(1)",
                          boxShadow: formData.plan === "HalfYearly" ? "0 15px 30px rgba(59, 130, 246, 0.2)" : "none",
                          "&:hover": {
                            borderColor: "primary.main",
                            transform: "scale(1.02)",
                            boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <FormControlLabel
                            value="HalfYearly"
                            control={<Radio />}
                            label={
                              <Box>
                                <Typography variant="h6" component="div" fontWeight="bold">
                                  Half Yearly
                                </Typography>
                                <Typography variant="h4" component="div" sx={{ my: 2, fontWeight: "bold" }}>
                                  $269.99
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  $44.99/month (Save 10%)
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ mt: 2 }}>
                                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                    <CheckCircle fontSize="small" color="success" sx={{ mr: 1 }} />
                                    All core features
                                  </Typography>
                                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                    <CheckCircle fontSize="small" color="success" sx={{ mr: 1 }} />
                                    Up to 10 users
                                  </Typography>
                                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                                    <CheckCircle fontSize="small" color="success" sx={{ mr: 1 }} />
                                    Priority email support
                                  </Typography>
                                </Box>
                              </Box>
                            }
                            sx={{ m: 0, width: "100%", alignItems: "flex-start" }}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>

                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <Card
                        variant="outlined"
                        sx={{
                          height: "100%",
                          borderRadius: 4,
                          borderColor: formData.plan === "Yearly" ? "primary.main" : "divider",
                          borderWidth: formData.plan === "Yearly" ? 2 : 1,
                          position: "relative",
                          transition: "all 0.3s ease",
                          transform: formData.plan === "Yearly" ? "scale(1.02)" : "scale(1)",
                          boxShadow: formData.plan === "Yearly" ? "0 15px 30px rgba(59, 130, 246, 0.2)" : "none",
                          "&:hover": {
                            borderColor: "primary.main",
                            transform: "scale(1.02)",
                            boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
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
                        <CardContent sx={{ p: 3 }}>
                          <FormControlLabel
                            value="Yearly"
                            control={<Radio />}
                            label={
                              <Box>
                                <Typography variant="h6" component="div" fontWeight="bold">
                                  Yearly
                                </Typography>
                                <Typography variant="h4" component="div" sx={{ my: 2, fontWeight: "bold" }}>
                                  $499.99
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  $41.67/month (Save 15%)
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ mt: 2 }}>
                                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                    <CheckCircle fontSize="small" color="success" sx={{ mr: 1 }} />
                                    All core features
                                  </Typography>
                                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                    <CheckCircle fontSize="small" color="success" sx={{ mr: 1 }} />
                                    Unlimited users
                                  </Typography>
                                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                                    <CheckCircle fontSize="small" color="success" sx={{ mr: 1 }} />
                                    24/7 phone & email support
                                  </Typography>
                                </Box>
                              </Box>
                            }
                            sx={{ m: 0, width: "100%", alignItems: "flex-start" }}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </motion.div>
        )
      case 3:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" key="step4">
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Box sx={{ mr: 3 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)",
                  }}
                >
                  <CreditCard sx={{ fontSize: 40, color: "primary.main" }} />
                </Box>
              </Box>
              <Box>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Payment Information
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Choose your preferred payment method.
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                mb: 4,
                p: 3,
                borderRadius: 3,
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)",
                border: "1px solid rgba(59, 130, 246, 0.2)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Info sx={{ mr: 2, color: "primary.main" }} />
              <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                You will be charged $
                {formData.plan === "Monthly" ? "49.99" : formData.plan === "HalfYearly" ? "269.99" : "499.99"} for the{" "}
                {formData.plan.toLowerCase()} plan.
              </Typography>
            </Box>

            <motion.div variants={itemVariants}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 3 }}>
                Select Payment Method
              </Typography>

              <FormControl component="fieldset" sx={{ width: "100%", mb: 4 }}>
                <RadioGroup
                  aria-label="payment-method"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Paper
                        elevation={formData.paymentMethod === "creditCard" ? 3 : 1}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          cursor: "pointer",
                          border: formData.paymentMethod === "creditCard" ? "2px solid" : "1px solid",
                          borderColor: formData.paymentMethod === "creditCard" ? "primary.main" : "divider",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: "primary.main",
                            transform: "translateY(-5px)",
                            boxShadow: 3,
                          },
                        }}
                        onClick={() => setFormData({ ...formData, paymentMethod: "creditCard" })}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Radio
                            checked={formData.paymentMethod === "creditCard"}
                            onChange={() => setFormData({ ...formData, paymentMethod: "creditCard" })}
                            value="creditCard"
                            name="paymentMethod"
                            sx={{ p: 0, mr: 1 }}
                          />
                          <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              Credit Card
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Pay securely with your card
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                          <CreditCard sx={{ fontSize: 40, color: "primary.main" }} />
                        </Box>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Paper
                        elevation={formData.paymentMethod === "mobileBanking" ? 3 : 1}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          cursor: "pointer",
                          border: formData.paymentMethod === "mobileBanking" ? "2px solid" : "1px solid",
                          borderColor: formData.paymentMethod === "mobileBanking" ? "primary.main" : "divider",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: "primary.main",
                            transform: "translateY(-5px)",
                            boxShadow: 3,
                          },
                        }}
                        onClick={() => setFormData({ ...formData, paymentMethod: "mobileBanking" })}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Radio
                            checked={formData.paymentMethod === "mobileBanking"}
                            onChange={() => setFormData({ ...formData, paymentMethod: "mobileBanking" })}
                            value="mobileBanking"
                            name="paymentMethod"
                            sx={{ p: 0, mr: 1 }}
                          />
                          <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              Mobile Banking
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Pay via mobile banking app
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                          <Phone sx={{ fontSize: 40, color: "primary.main" }} />
                        </Box>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Paper
                        elevation={formData.paymentMethod === "manual" ? 3 : 1}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          cursor: "pointer",
                          border: formData.paymentMethod === "manual" ? "2px solid" : "1px solid",
                          borderColor: formData.paymentMethod === "manual" ? "primary.main" : "divider",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: "primary.main",
                            transform: "translateY(-5px)",
                            boxShadow: 3,
                          },
                        }}
                        onClick={() => setFormData({ ...formData, paymentMethod: "manual" })}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Radio
                            checked={formData.paymentMethod === "manual"}
                            onChange={() => setFormData({ ...formData, paymentMethod: "manual" })}
                            value="manual"
                            name="paymentMethod"
                            sx={{ p: 0, mr: 1 }}
                          />
                          <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              Manual Payment
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Contact us directly
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                          <Person sx={{ fontSize: 40, color: "primary.main" }} />
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </motion.div>

            {/* Credit Card Payment Form */}
            {formData.paymentMethod === "creditCard" && (
              <>
                <CreditCardDisplay
                  cardNumber={formData.cardNumber}
                  cardName={formData.cardName}
                  expiryDate={formData.expiryDate}
                />

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        required
                        fullWidth
                        id="cardName"
                        name="cardName"
                        label="Name on Card"
                        value={formData.cardName}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        required
                        fullWidth
                        id="cardNumber"
                        name="cardNumber"
                        label="Card Number"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CreditCard color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>
                  </Grid>

                  <Grid item xs={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        required
                        fullWidth
                        id="expiryDate"
                        name="expiryDate"
                        label="Expiry Date (MM/YY)"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarToday color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>
                  </Grid>

                  <Grid item xs={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        required
                        fullWidth
                        id="cvv"
                        name="cvv"
                        label="CVV"
                        value={formData.cvv}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>
                  </Grid>
                </Grid>
              </>
            )}

            {/* Mobile Banking Payment Form */}
            {formData.paymentMethod === "mobileBanking" && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <Box
                  sx={{
                    mb: 4,
                    p: 3,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    border: "1px dashed",
                    borderColor: "primary.main",
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                    Mobile Banking Instructions:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    1. Open your mobile banking app
                  </Typography>
                  <Typography variant="body2" paragraph>
                    2. Send payment to our account: <b>1234-5678-9012-3456</b>
                  </Typography>
                  <Typography variant="body2" paragraph>
                    3. Use your business name as reference
                  </Typography>
                  <Typography variant="body2">4. Enter the transaction details below</Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        required
                        fullWidth
                        id="mobileNumber"
                        name="mobileNumber"
                        label="Mobile Number Used for Payment"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        required
                        fullWidth
                        id="transactionId"
                        name="transactionId"
                        label="Transaction ID/Reference"
                        value={formData.transactionId}
                        onChange={handleChange}
                        helperText="Enter the transaction ID or reference number from your payment"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Info color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {/* Manual Payment Form */}
            {formData.paymentMethod === "manual" && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <Box
                  sx={{
                    mb: 4,
                    p: 3,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    border: "1px dashed",
                    borderColor: "primary.main",
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                    Manual Payment Information:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Our team will contact you to arrange payment. Please provide your contact details below.
                  </Typography>
                  <Typography variant="body2" paragraph>
                    You can also reach us directly at <b>payments@garageapp.com</b> or <b>+1 (555) 123-4567</b>
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        required
                        fullWidth
                        id="contactName"
                        name="contactName"
                        label="Contact Name"
                        value={formData.contactName}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        required
                        fullWidth
                        id="contactEmail"
                        name="contactEmail"
                        label="Contact Email"
                        type="email"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        required
                        fullWidth
                        id="contactPhone"
                        name="contactPhone"
                        label="Contact Phone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <Typography variant="subtitle2" gutterBottom>
                        Preferred Contact Method
                      </Typography>
                      <RadioGroup
                        row
                        aria-label="preferred-contact"
                        name="preferredContactMethod"
                        value={formData.preferredContactMethod}
                        onChange={handleChange}
                      >
                        <FormControlLabel value="email" control={<Radio />} label="Email" />
                        <FormControlLabel value="phone" control={<Radio />} label="Phone" />
                        <FormControlLabel value="both" control={<Radio />} label="Both" />
                      </RadioGroup>
                    </motion.div>
                  </Grid>
                </Grid>
              </motion.div>
            )}
          </motion.div>
        )
      default:
        return null
    }
  }

  // Success screen with confetti
  if (completed) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdf4 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Confetti width={width} height={height} recycle={false} numberOfPieces={500} gravity={0.05} />

        <Container maxWidth="md">
          <Paper
            elevation={5}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              textAlign: "center",
              py: 6,
              px: 4,
            }}
          >
            <Box sx={{ height: 200, width: 200, margin: "0 auto" }}>
              <CheckCircle sx={{ fontSize: 100, color: "success.main" }} />
            </Box>

            <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ mt: 2 }}>
              Congratulations!
            </Typography>

            <Typography variant="h5" gutterBottom color="text.secondary">
              Your garage business is now set up and ready to go
            </Typography>

            <Box sx={{ my: 4 }}>
              <Typography variant="body1" paragraph>
                You can now access your dashboard at:
              </Typography>

              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  mb: 4,
                  display: "inline-block",
                  borderRadius: 3,
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)",
                  border: "1px dashed rgba(59, 130, 246, 0.3)",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {formData.domain}.garageapp.com
                </Typography>
              </Paper>
            </Box>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/login")}
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: 3,
                background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                fontSize: "1.1rem",
              }}
            >
              Go to Dashboard
            </Button>
          </Paper>
        </Container>
      </Box>
    )
  }

  return (
    <AuthLayout title="Register Your Business" subtitle="Create a new tenant for your garage management system">
      {activeStep < steps.length && (
        <Stepper activeStep={activeStep} alternativeLabel connector={<ColorlibConnector />} sx={{ mb: 5 }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}

      {error && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Alert severity="error" sx={{ mb: 3 }} icon={<ErrorOutline />}>
            {error}
          </Alert>
        </motion.div>
      )}

      <Box >
        <AnimatePresence mode="wait">{getStepContent(activeStep)}</AnimatePresence>

        {activeStep < steps.length && (
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4,}}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              startIcon={<ArrowBack />}
              sx={{ px: 3 }}
            >
              Back
            </Button>

            <Button
              variant="contained"
              onClick={handleNext}
              disabled={loading}
              endIcon={loading ? null : <ArrowForward />}
              sx={{
                px: 3,
                background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
              }}
            >
              {loading ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                  Processing...
                </Box>
              ) : activeStep === steps.length - 1 ? (
                "Complete Registration"
              ) : (
                "Next"
              )}
            </Button>
          </Box>
        )}
      </Box>
    </AuthLayout>
  )
}

export default TenantRegistrationPage

