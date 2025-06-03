"use client";

import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  InputAdornment,
  Alert,
  Paper,
  Grid,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  CardHeader,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Container,
} from "@mui/material";
import {
  Business,
  Domain,
  CheckCircle,
  ArrowForward,
  ArrowBack,
  Build,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { subscriptionPlans } from "../../data";
import { useCreateTenantMutation } from "../../redux/api/tenantApi";
import toast from "react-hot-toast";

const TenantRegisterPage = () => {
  const navigate = useNavigate();
  const { registerTenant } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [createTenant] = useCreateTenantMutation();

  // Form state
  const [tenantData, setTenantData] = useState({
    name: "",
    domain: "",
    businessType: "independent",
    selectedPlan: "HalfYearly",
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setTenantData({
      ...tenantData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const validateStep = () => {
    if (activeStep === 0) {
      return tenantData.name.trim() !== "" && tenantData.domain.trim() !== "";
    } else if (activeStep === 1) {
      return tenantData.selectedPlan !== "";
    } else if (activeStep === 2) {
      return tenantData.agreeToTerms;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const tenantPayload = {
        name: tenantData.name,
        domain: tenantData.domain,
        businessType: tenantData.businessType,
        plan: tenantData.selectedPlan,
      };
      console.log(tenantPayload);

      const result = await createTenant(tenantPayload);
      if (result.success) {
        toast.success(result.message || "Tenant create successfully!");
      }
      console.log(result);
      if ("error" in result) {
        throw new Error(
          result.error.data?.message ||
            "Failed to register tenant. Please try again."
        );
      }
      if (result.data) {
        registerTenant(result.data);
      }

      navigate("/tenant/success");
    } catch (err) {
      setError(
        err.message ||
          "Failed to register tenant. Please check your information and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const steps = ["Business Information", "Choose Plan", "Review & Confirm"];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Business Name"
              name="name"
              autoComplete="organization"
              autoFocus
              value={tenantData.name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Business color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="domain"
              label="Domain Name"
              name="domain"
              placeholder="your-garage"
              helperText="This will be your unique identifier: your-garage.ourplatform.com"
              value={tenantData.domain}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Domain color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl component="fieldset" sx={{ mt: 3 }}>
              <FormLabel component="legend">Business Type</FormLabel>
              <RadioGroup
                name="businessType"
                value={tenantData.businessType}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="independent"
                  control={<Radio />}
                  label="Independent Garage"
                />
                <FormControlLabel
                  value="chain"
                  control={<Radio />}
                  label="Chain/Multiple Locations"
                />
                <FormControlLabel
                  value="dealership"
                  control={<Radio />}
                  label="Dealership Service"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Select a Subscription Plan
            </Typography>
            <Box sx={{ mt: 2, maxHeight: "400px", overflowY: "auto" }}>
              {subscriptionPlans.map((plan) => (
                <Card
                  key={plan.id}
                  variant="outlined"
                  onClick={() =>
                    setTenantData({ ...tenantData, selectedPlan: plan.id })
                  }
                  sx={{
                    mb: 2,
                    position: "relative",
                    border:
                      tenantData.selectedPlan === plan.id
                        ? "2px solid #1976d2"
                        : plan.recommended
                        ? "2px solid #1976d2"
                        : "1px solid rgba(0, 0, 0, 0.12)",
                    boxShadow:
                      tenantData.selectedPlan === plan.id
                        ? "0 0 10px rgba(25, 118, 210, 0.5)"
                        : plan.recommended
                        ? "0 0 10px rgba(25, 118, 210, 0.3)"
                        : "none",
                    transition: "all 0.2s ease-in-out",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  {plan.recommended && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        bgcolor: "primary.main",
                        color: "white",
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: "0.7rem",
                        fontWeight: "bold",
                      }}
                    >
                      RECOMMENDED
                    </Box>
                  )}
                  <CardHeader
                    title={plan.name}
                    titleTypographyProps={{ align: "center", variant: "h6" }}
                    sx={{
                      bgcolor:
                        tenantData.selectedPlan === plan.id
                          ? "primary.light"
                          : "grey.50",
                      color:
                        tenantData.selectedPlan === plan.id
                          ? "white"
                          : "inherit",
                      transition: "all 0.2s ease-in-out",
                      py: 1,
                    }}
                  />
                  <CardContent sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: "center" }}>
                          <Typography component="h3" variant="h5">
                            {plan.price}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {plan.period}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={8}>
                        <Box>
                          {plan.features.slice(0, 3).map((feature) => (
                            <Box
                              key={feature}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 0.5,
                              }}
                            >
                              <CheckCircle
                                fontSize="small"
                                color="primary"
                                sx={{ mr: 1, flexShrink: 0 }}
                              />
                              <Typography variant="caption">
                                {feature}
                              </Typography>
                            </Box>
                          ))}
                          {plan.features.length > 3 && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              +{plan.features.length - 3} more features
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Radio
                        checked={tenantData.selectedPlan === plan.id}
                        onChange={handleChange}
                        name="selectedPlan"
                        value={plan.id}
                        sx={{ mr: 1 }}
                      />
                      <Typography
                        variant="body2"
                        fontWeight={
                          tenantData.selectedPlan === plan.id
                            ? "bold"
                            : "normal"
                        }
                      >
                        {tenantData.selectedPlan === plan.id
                          ? "Selected"
                          : "Select This Plan"}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Review Your Information
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Business Name
                  </Typography>
                  <Typography variant="body1">{tenantData.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Domain
                  </Typography>
                  <Typography variant="body1">
                    {tenantData.domain}.ourplatform.com
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Business Type
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {tenantData.businessType}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Selected Plan
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {subscriptionPlans.find(
                      (p) => p.id === tenantData.selectedPlan
                    )?.name || tenantData.selectedPlan}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Box sx={{ mt: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="agreeToTerms"
                    checked={tenantData.agreeToTerms}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the{" "}
                    <Link component={RouterLink} to="/terms">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link component={RouterLink} to="/privacy">
                      Privacy Policy
                    </Link>
                  </Typography>
                }
              />
            </Box>
          </Box>
        );
      default:
        return "Unknown step";
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
                Start Your Garage Business Journey
              </Typography>
              <Typography variant="h6" paragraph>
                Join thousands of garage owners who trust our platform to manage
                their operations efficiently and grow their business.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Typography variant="body1" paragraph>
                  • Multi-tenant architecture for scalability
                </Typography>
                <Typography variant="body1" paragraph>
                  • Complete business management suite
                </Typography>
                <Typography variant="body1" paragraph>
                  • Advanced reporting and analytics
                </Typography>
                <Typography variant="body1" paragraph>
                  • 24/7 customer support
                </Typography>
                <Typography variant="body1">
                  • Secure cloud-based platform
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
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              <Box sx={{ mb: 4, textAlign: "center" }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Register Your Business
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Create your tenant account to get started
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                {getStepContent(activeStep)}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 4,
                  }}
                >
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    startIcon={<ArrowBack />}
                  >
                    Back
                  </Button>

                  {activeStep === steps.length - 1 ? (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={loading || !validateStep()}
                      endIcon={<CheckCircle />}
                    >
                      {loading ? "Creating..." : "Complete Registration"}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      disabled={!validateStep()}
                      endIcon={<ArrowForward />}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </Box>

              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="body2">
                  Already have a tenant account?{" "}
                  <Link component={RouterLink} to="/login" variant="body2">
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TenantRegisterPage;
