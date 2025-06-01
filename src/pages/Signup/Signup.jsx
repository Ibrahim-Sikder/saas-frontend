"use client"

import { useState, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"
import { toast } from "react-toastify"
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Paper,
  Avatar,
  Grid,
  Divider,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material"
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  Email,
  Person,
  Phone,
  Business,
  LocationOn,
} from "@mui/icons-material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import "./Signup.css"



const Signup = () => {
  const navigate = useNavigate()

  // Form refs
  const nameRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const companyRef = useRef()
  const addressRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  // Form states
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [agreeTerms, setAgreeTerms] = useState(false)

  // Password visibility toggles
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  // Form validation
  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!nameRef.current.value.trim()) {
      newErrors.name = "Name is required"
    } else if (nameRef.current.value.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRef.current.value.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(emailRef.current.value.trim())) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/
    if (phoneRef.current.value.trim() && !phoneRegex.test(phoneRef.current.value.trim())) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    // Password validation
    if (!passwordRef.current.value) {
      newErrors.password = "Password is required"
    } else if (passwordRef.current.value.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(passwordRef.current.value)) {
      newErrors.password = "Password must include uppercase, lowercase, number and special character"
    }

    // Confirm password validation
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Terms agreement validation
    if (!agreeTerms) {
      newErrors.terms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSignup = async (event) => {
    event.preventDefault()

    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    setLoading(true)

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would send the form data to your API here
      // const response = await fetch('/api/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: nameRef.current.value,
      //     email: emailRef.current.value,
      //     phone: phoneRef.current.value,
      //     company: companyRef.current.value,
      //     address: addressRef.current.value,
      //     password: passwordRef.current.value
      //   })
      // });

      // For demo purposes, we'll just set a cookie and navigate
      Cookies.set("tas-auth", "51RSM78du77QnlJy86LgWSEUpVM", { expires: 7 })

      toast.success("Account created successfully!")
      navigate("/dashboard")
    } catch (error) {
      toast.error("Registration failed. Please try again.")
      console.error("Signup error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box className="signupWrap">
        <Box className="py-5 min-h-screen flex items-center justify-center">
          <Paper elevation={10} className="signupFormContainer">
            <Box className="signupHeader">
              <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56, mb: 2 }}>
                <LockOutlined fontSize="large" />
              </Avatar>
              <Typography variant="h4" component="h1" gutterBottom>
                Create Your Account
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Join T.A.S and experience premium auto solutions
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSignup} className="signupForm">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    inputRef={nameRef}
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    inputRef={emailRef}
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    fullWidth
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    inputRef={phoneRef}
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    inputRef={companyRef}
                    label="Company Name (Optional)"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Business color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    inputRef={addressRef}
                    label="Address (Optional)"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    inputRef={passwordRef}
                    label="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end" aria-label="toggle password visibility">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    inputRef={confirmPasswordRef}
                    label="Confirm Password"
                    variant="outlined"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleToggleConfirmPassword}
                            edge="end"
                            aria-label="toggle confirm password visibility"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="I agree to the Terms of Service and Privacy Policy"
                  />
                  {errors.terms && (
                    <Typography variant="caption" color="error">
                      {errors.terms}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    disabled={loading}
                    className="signupButton"
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
                  </Button>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </Divider>

              <Box className="socialSignup">
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      alt="Google"
                      width="18"
                      height="18"
                    />
                  }
                  sx={{ mb: 2 }}
                >
                  Sign up with Google
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/800px-2021_Facebook_icon.svg.png"
                      alt="Facebook"
                      width="18"
                      height="18"
                    />
                  }
                >
                  Sign up with Facebook
                </Button>
              </Box>

              <Box className="loginLink" mt={3} textAlign="center">
                <Typography variant="body2">
                  Already have an account?{" "}
                  <Link to="/login" className="loginRedirect">
                    Login here
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
  )
}

export default Signup

