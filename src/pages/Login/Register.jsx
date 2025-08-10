/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
"use client"

import { useState } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import {
  Box,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  useTheme,
} from "@mui/material"
import {
  Person,
  Email,
  Phone,
  Business,
  LocationOn,
  Lock,
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  Info,
  CheckCircle,
  ErrorOutline,
} from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"
import Lottie from "lottie-react"
import AuthLayout from "../../auth/AuthLayout"
const PasswordStrength = ({ password }) => {
  const theme = useTheme()
  const getStrength = (pass) => {
    let score = 0

    // Length check
    if (pass.length >= 8) score += 1
    if (pass.length >= 12) score += 1

    // Complexity checks
    if (/[A-Z]/.test(pass)) score += 1
    if (/[0-9]/.test(pass)) score += 1
    if (/[^A-Za-z0-9]/.test(pass)) score += 1

    return score
  }

  const strength = getStrength(password)

  // Define colors and labels based on strength
  const getColor = () => {
    if (strength === 0) return theme.palette.grey[400]
    if (strength < 2) return theme.palette.error.main
    if (strength < 4) return theme.palette.warning.main
    return theme.palette.success.main
  }

  const getLabel = () => {
    if (password.length === 0) return ""
    if (strength < 2) return "Weak"
    if (strength < 4) return "Medium"
    return "Strong"
  }

  return (
    <Box sx={{ mt: 1, mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              height: 4,
              borderRadius: 2,
              bgcolor: theme.palette.grey[200],
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              component={motion.div}
              initial={{ width: 0 }}
              animate={{ width: `${(strength / 5) * 100}%` }}
              transition={{ duration: 0.5 }}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                borderRadius: 2,
                bgcolor: getColor(),
              }}
            />
          </Box>
        </Box>
        <Typography variant="caption" color="textSecondary" sx={{ ml: 1, minWidth: 50 }}>
          {getLabel()}
        </Typography>
      </Box>

      {password.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
          <PasswordCriteria met={password.length >= 8} label="8+ characters" />
          <PasswordCriteria met={/[A-Z]/.test(password)} label="Uppercase" />
          <PasswordCriteria met={/[0-9]/.test(password)} label="Number" />
          <PasswordCriteria met={/[^A-Za-z0-9]/.test(password)} label="Special character" />
        </Box>
      )}
    </Box>
  )
}

// Password criteria component
const PasswordCriteria = ({ met, label }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      fontSize: "0.75rem",
      color: met ? "success.main" : "text.secondary",
      bgcolor: met ? "success.light" : "background.paper",
      border: 1,
      borderColor: met ? "success.light" : "divider",
      borderRadius: 4,
      px: 1,
      py: 0.25,
    }}
  >
    {met ? <CheckCircle fontSize="inherit" sx={{ mr: 0.5 }} /> : <Info fontSize="inherit" sx={{ mr: 0.5 }} />}
    {label}
  </Box>
)

const RegisterPage = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    address: "",
    password: "",
    confirmPassword: "",
  })

  const steps = ["Personal Info", "Company Details", "Security"]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleNext = () => {
    // Validate current step
    if (activeStep === 0) {
      if (!formData.fullName || !formData.email) {
        setError("Please fill in all required fields")
        return
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address")
        return
      }
    } else if (activeStep === 2) {
      if (!formData.password) {
        setError("Please enter a password")
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
      }

      if (!agreeTerms) {
        setError("You must agree to the Terms of Service and Privacy Policy")
        return
      }

      // Submit the form
      handleSubmit()
      return
    }

    setError("")
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
    setError("")
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setCompleted(true)

      // Redirect after showing success animation
      setTimeout(() => {
        navigate("/tenant/register")
      }, 3000)
    } catch (err) {
      setError("Registration failed. Please try again.")
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
      y: 20,
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

  // Render step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" key="step1">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <TextField
                    required
                    fullWidth
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    value={formData.fullName}
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
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
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
                    fullWidth
                    id="phone"
                    name="phone"
                    label="Phone Number"
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
            </Grid>
          </motion.div>
        )
      case 1:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" key="step2">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    id="companyName"
                    name="companyName"
                    label="Company Name (Optional)"
                    value={formData.companyName}
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
                    fullWidth
                    id="address"
                    name="address"
                    label="Address (Optional)"
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
            </Grid>
          </motion.div>
        )
      case 2:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" key="step3">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <TextField
                    required
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
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
                  <PasswordStrength password={formData.password} />
                </motion.div>
              </Grid>

              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <TextField
                    required
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>
              </Grid>

              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I agree to the{" "}
                        <Link component={RouterLink} to="/terms" color="primary">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link component={RouterLink} to="/privacy" color="primary">
                          Privacy Policy
                        </Link>
                      </Typography>
                    }
                  />
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        )
      default:
        return null
    }
  }

  // Success screen
  if (completed) {
    return (
      <AuthLayout title="Registration Successful!" subtitle="Your account has been created successfully">
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Lottie 
        //   animationData={successAnimation}
           style={{ height: 200, width: 200, margin: "0 auto" }} />

          <Typography variant="h6" sx={{ mt: 2, mb: 4 }}>
            Welcome to Garage Master, {formData.fullName}!
          </Typography>

          <Typography variant="body1" paragraph>
            You'll be redirected to set up your garage business in a moment...
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => navigate("/tenant/register")}
              sx={{
                py: 1.5,
                background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
              }}
            >
              Continue to Business Setup
            </Button>
          </Box>
        </Box>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Create Your Account" subtitle="Join Garage Master and experience premium auto solutions">
      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Alert severity="error" sx={{ mb: 3 }} icon={<ErrorOutline />}>
            {error}
          </Alert>
        </motion.div>
      )}

      <Box>
        <AnimatePresence mode="wait">{getStepContent(activeStep)}</AnimatePresence>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined" sx={{ px: 3 }}>
            Back
          </Button>

          <Button
            variant="contained"
            onClick={handleNext}
            disabled={loading}
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
              "Create Account"
            ) : (
              "Next"
            )}
          </Button>
        </Box>

        <Divider sx={{ my: 4 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button fullWidth variant="outlined" startIcon={<Google />} sx={{ py: 1.5 }}>
              Sign up with Google
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button fullWidth variant="outlined" startIcon={<Facebook />} sx={{ py: 1.5 }}>
              Sign up with Facebook
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link component={RouterLink} to="/login" color="primary" fontWeight="medium">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </AuthLayout>
  )
}

export default RegisterPage

