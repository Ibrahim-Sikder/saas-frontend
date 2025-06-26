/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Paper,
  Grid,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Container,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Person,
  Build,
  Lock,
  Business,
} from "@mui/icons-material";
import { useCreateUserMutation } from "../../redux/api/userApi";
import { useGetAllTenantQuery } from "../../redux/api/tenantApi";

const mockRoles = [
  { id: "role1", name: "Admin" },
  { id: "role2", name: "Manager" },
  { id: "role3", name: "Employee" },
];

const SignupPage = () => {

  const navigate = useNavigate();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const { data: tenantData, isLoading: isTenantLoading } =
    useGetAllTenantQuery();

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    tenantDomain: "",
    role: "",
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.tenantDomain) {
      newErrors.tenantDomain = "Please select a tenant";
    }
    if (!formData.role) {
      newErrors.role = "Please select a role";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSignup = async (event) => {
    event.preventDefault();
    setApiError("");

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      const submitData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.role,
        createdBy: "system",
        status: "active",
        tenantDomain: formData.tenantDomain,
      };
      console.log("submit data", submitData);
      const result = await createUser(submitData).unwrap();

      if (result.success) {
        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setApiError(
        error?.data?.message || "Registration failed. Please try again."
      );
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid
            item
            xs={12}
            md={6}
            lg={7}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Box sx={{ color: "white", p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Build sx={{ fontSize: 40, mr: 2 }} />
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  Garage ERP
                </Typography>
              </Box>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                Join Our Platform Today
              </Typography>
              <Typography variant="h6" paragraph>
                Create your account and start managing your garage operations
                with our comprehensive ERP solution.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Typography variant="body1" paragraph>
                  • Access to powerful garage management tools
                </Typography>
                <Typography variant="body1" paragraph>
                  • Real-time inventory tracking
                </Typography>
                <Typography variant="body1" paragraph>
                  • Customer relationship management
                </Typography>
                <Typography variant="body1" paragraph>
                  • Advanced reporting and analytics
                </Typography>
                <Typography variant="body1">
                  • 24/7 technical support
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 2,
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                maxHeight: "85vh",
                overflowY: "auto",
              }}
            >
              <Box sx={{ mb: 4, textAlign: "center" }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Create Your Account
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Join T.A.S and experience premium auto solutions
                </Typography>
              </Box>

              {apiError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {apiError}
                </Alert>
              )}

              {isTenantLoading && (
                <Alert severity="info" sx={{ mb: 3 }}>
                  Loading tenant data...
                </Alert>
              )}

              {!isTenantLoading &&
                (!tenantData?.data?.tenants ||
                  tenantData.data.tenants.length === 0) && (
                  <Alert severity="warning" sx={{ mb: 3 }}>
                    No tenants available. Please contact administrator.
                  </Alert>
                )}

              <Box component="form" onSubmit={handleSignup}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      label="Full Name"
                      variant="outlined"
                      fullWidth
                      required
                      value={formData.name}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person color="action" />
                          </InputAdornment>
                        ),
                      }}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      label="Email Address"
                      variant="outlined"
                      type="email"
                      fullWidth
                      required
                      value={formData.email}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email color="action" />
                          </InputAdornment>
                        ),
                      }}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      required
                      error={!!errors.tenantDomain}
                    >
                      <InputLabel>Select Tenant</InputLabel>
                      <Select
                        name="tenantDomain"
                        value={formData.tenantDomain}
                        onChange={handleChange}
                        label="Select Tenant"
                        startAdornment={
                          <InputAdornment position="start">
                            <Business color="action" />
                          </InputAdornment>
                        }
                        disabled={isLoading}
                      >
                        {tenantData?.data?.tenants?.map((tenant) => (
                          <MenuItem key={tenant._id} value={tenant.domain}>
                            {tenant.name} ({tenant.domain})
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.tenantDomain && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 0.5, ml: 2 }}
                        >
                          {errors.tenantDomain}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth required error={!!errors.role}>
                      <InputLabel>Select Role</InputLabel>
                      <Select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        label="Select Role"
                        startAdornment={
                          <InputAdornment position="start">
                            <Person color="action" />
                          </InputAdornment>
                        }
                      >
                        {mockRoles.map((role) => (
                          <MenuItem key={role.id} value={role.id}>
                            {role.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.role && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 0.5, ml: 2 }}
                        >
                          {errors.role}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      name="password"
                      label="Password"
                      variant="outlined"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      required
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
                              onClick={handleTogglePassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
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
                      name="confirmPassword"
                      label="Confirm Password"
                      variant="outlined"
                      type={showConfirmPassword ? "text" : "password"}
                      fullWidth
                      required
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
                              onClick={handleToggleConfirmPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                    />
                  </Grid>
                  <Typography
                    variant="body2"
                    sx={{
                      width: "100%",
                      display: "flex",
                      mt: 1,
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    Don't have a tenant?&nbsp;
                    <RouterLink
                      to="/create-tenant"
                      style={{ color: "#1976d2", textDecoration: "none" }}
                    >
                      Create Tenant
                    </RouterLink>
                  </Typography>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="body2">
                          I agree to the{" "}
                          <RouterLink to="/terms" style={{ color: "#1976d2" }}>
                            Terms of Service
                          </RouterLink>{" "}
                          and{" "}
                          <RouterLink
                            to="/privacy"
                            style={{ color: "#1976d2" }}
                          >
                            Privacy Policy
                          </RouterLink>
                        </Typography>
                      }
                    />
                    {errors.agreeTerms && (
                      <Typography
                        variant="caption"
                        color="error"
                        display="block"
                        sx={{ mt: 0.5 }}
                      >
                        {errors.agreeTerms}
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
                      disabled={isLoading || !tenantData?.data?.tenants?.length}
                      sx={{
                        py: 1.5,
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        borderRadius: 2,
                        textTransform: "none",
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, textAlign: "center" }}>
                  <Typography variant="body2">
                    Already have an account?{" "}
                    <RouterLink
                      to="/login"
                      style={{
                        color: "#1976d2",
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                    >
                      Login here
                    </RouterLink>
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignupPage;
