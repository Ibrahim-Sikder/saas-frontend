/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Tabs,
  Typography,
  useTheme,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Zoom,
  Fade,
  Collapse,
  Alert,
  AlertTitle,
  Badge,
  alpha,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Backdrop,
  Snackbar,
} from "@mui/material";        
import {
  FaUsers,
  FaBuilding,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaIdCard,
  FaMoneyBillWave,
  FaPercentage,
  FaCreditCard,
  FaFileInvoiceDollar,
  FaBoxOpen,
  FaShippingFast,
  FaUserTie,
  FaFileContract,
  FaHandshake,
  FaCheck,
} from "react-icons/fa";
import {
  MdBusiness,
  MdCategory,
  MdLocalShipping,
  MdPayment,
  MdVerified,
  MdLocationOn,
  MdDescription,
  MdAttachMoney,
  MdAccessTime,
  MdClose,
  MdOutlineWarning,
} from "react-icons/md";
import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import SupplierListTable from "./SupplierListTable";
import SupplierHeader from "./SupplierHeader";
import TASInput from "../../../components/form/Input";
import CountryCodeAutocomplete from "../../../components/form/CountryCodeAutoComplete";
import {
  DeliveryTermsOption,
  PaymentTermsOption,
  SupplierStatusOption,
  VendorCategoriesOption,
} from "../../../options";
import FormSelect from "../../../components/form/FormSelect";
import TASFileupload from "../../../components/form/Fileupload";
import { SectionTitle, StyledTab } from "../../../../src/utils";
import {
  Cabin,
  CloudUpload,
  DeliveryDining,
  FolderZip,
  Language,
  LocationCity,
  WorkspacePremium,
  CheckCircle,
  Help,
  ArrowBack,
  ArrowForward,
  Save,
  Cancel,
  Visibility,
} from "@mui/icons-material";
import FormTextArea from "../../../components/form/FormTextArea";
import TASSwitch from "../../../components/form/switch";
import FormRating from "../../../components/form/FormRating";

import { useSupplierForm } from "../../../hooks/useSupplierForm"
import { countries } from "../../../constant"
import { AnimatedAvatar, AnimatedTab, EnhancedDivider, EnhancedSectionTitle, EnhancedStepper, FormSection, GlassBox, GradientButton, GradientCard, ProgressIndicator } from "../../../utils/customStyle"



const SupplierForm = ({ id }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
 
  const {
    methods,
    formSubmit,
    onSubmit,
    loading,
    createLoading,
    updateLoading,
    currentTab,
    setCurrentTab,
    handleTabChange,
    countryCode,
    phoneNumber,
    handlePhoneNumberChange,
    creditTerms,
    taxExempt,
    errors,
    isEditing,
  } = useSupplierForm(id);


  // Enhanced state
  const [formProgress, setFormProgress] = useState(0);
  const [showStepper, setShowStepper] = useState(!isMobile && !isTablet);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [formTouched, setFormTouched] = useState(false);
  const [showHelpTips, setShowHelpTips] = useState(true);
  const [loadingEffect, setLoadingEffect] = useState(false);

  // Calculate form progress
  useEffect(() => {
    const progressPercentage = ((currentTab + 1) / 6) * 100;
    setFormProgress(progressPercentage);
  }, [currentTab]);

  // Simulate loading effect when switching tabs
  const handleTabChangeWithEffect = (event, newValue) => {
    setLoadingEffect(true);
    setTimeout(() => {
      handleTabChange(event, newValue);
      setLoadingEffect(false);
    }, 300);
  };

  // Handle form submission with enhanced UX
  const handleEnhancedSubmit = (data) => {
    setSaveDialogOpen(true);
  };

  const confirmSubmit = () => {
    setSaveDialogOpen(false);
    setLoadingEffect(true);

    setTimeout(() => {
      if (isEditing) {
        onSubmit(methods.getValues());
      } else {
        formSubmit(methods.getValues());
      }

      setLoadingEffect(false);
    }, 1500);
  };

  const handleCancel = () => {
    if (formTouched) {
      setCancelDialogOpen(true);
    } else {
      navigate("/dashboard/supplier-list");
    }
  };

  const confirmCancel = () => {
    setCancelDialogOpen(false);
    navigate("/dashboard/supplier-list");
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Steps for the stepper
  const steps = [
    { label: "Basic Info", icon: <FaUserTie /> },
    { label: "Address", icon: <MdLocationOn /> },
    { label: "Business Details", icon: <MdBusiness /> },
    { label: "Financial Info", icon: <MdPayment /> },
    { label: "Supply Chain", icon: <MdLocalShipping /> },
    { label: "Evaluation", icon: <MdVerified /> },
  ];

  return (
    <section
      className="md:py-0"
      style={{
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.background.default,
          0.9
        )}, ${alpha(
          theme.palette.background.paper,
          0.8
        )}), url('/placeholder.svg?height=1080&width=1920') no-repeat center center`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingEffect}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="max-w-8xl mx-auto px-0 lg:px-8">
        <Fade in={true} timeout={800}>
          <div>
            <SupplierHeader />
            <div className="mb-4 flex justify-between items-center">
              <h2 className=" md:text-3xl font-[600] text-[#2980b9] block">
                {isEditing ? "Edit Supplier" : "+ Add New Supplier"}
              </h2>

              <div className="flex gap-2">
                <Tooltip title="Toggle help tips">
                  <IconButton
                    onClick={() => setShowHelpTips(!showHelpTips)}
                    sx={{
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      "&:hover": {
                        bgcolor: alpha(theme.palette.info.main, 0.2),
                      },
                    }}
                  >
                    <Help />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Toggle stepper view">
                  <IconButton
                    onClick={() => setShowStepper(!showStepper)}
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                      },
                    }}
                  >
                    <Visibility />
                  </IconButton>
                </Tooltip>
              </div>
            </div>

            {showHelpTips && (
              <Collapse in={true}>
                <Alert
                  severity="info"
                  variant="filled"
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    boxShadow: `0 4px 12px ${alpha(
                      theme.palette.info.main,
                      0.2
                    )}`,
                  }}
                  action={
                    <IconButton
                      color="inherit"
                      size="small"
                      onClick={() => setShowHelpTips(false)}
                    >
                      <MdClose />
                    </IconButton>
                  }
                >
                  <AlertTitle>Form Completion Tips</AlertTitle>
                  Complete all required fields in each tab. Use the
                  Next/Previous buttons or tab navigation to move between
                  sections. Your progress is automatically saved as you
                  navigate.
                </Alert>
              </Collapse>
            )}

            <ProgressIndicator variant="determinate" value={formProgress} />

            <Grid container spacing={3}>
              {showStepper && (
                <Grid item xs={12} md={3}>
                  <Zoom in={true} style={{ transitionDelay: "200ms" }}>
                    <GlassBox>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: 600, mb: 3 }}
                      >
                        Form Progress
                      </Typography>
                      <EnhancedStepper
                        activeStep={currentTab}
                        orientation="vertical"
                      >
                        {steps.map((step, index) => (
                          <Step key={step.label}>
                            <StepLabel
                              StepIconComponent={() => (
                                <AnimatedAvatar sx={{ width: 36, height: 36 }}>
                                  {index === currentTab ? (
                                    <Badge
                                      overlap="circular"
                                      anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                      }}
                                      badgeContent={
                                        <FaCheck
                                          style={{
                                            color: theme.palette.success.main,
                                            fontSize: 14,
                                          }}
                                        />
                                      }
                                    >
                                      {step.icon}
                                    </Badge>
                                  ) : index < currentTab ? (
                                    <CheckCircle color="success" />
                                  ) : (
                                    step.icon
                                  )}
                                </AnimatedAvatar>
                              )}
                              onClick={() =>
                                handleTabChangeWithEffect(null, index)
                              }
                              sx={{ cursor: "pointer" }}
                            >
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  fontWeight: currentTab === index ? 700 : 500,
                                  color:
                                    currentTab === index
                                      ? theme.palette.primary.main
                                      : "inherit",
                                }}
                              >
                                {step.label}
                              </Typography>
                            </StepLabel>
                            <StepContent>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {index === 0 &&
                                  "Enter basic supplier information and contact details."}
                                {index === 1 &&
                                  "Provide complete address and location information."}
                                {index === 2 &&
                                  "Add business details, size, and description."}
                                {index === 3 &&
                                  "Enter financial and payment information."}
                                {index === 4 &&
                                  "Specify supply chain and delivery details."}
                                {index === 5 &&
                                  "Rate and evaluate the supplier."}
                              </Typography>
                            </StepContent>
                          </Step>
                        ))}
                      </EnhancedStepper>

                      <div className="mt-16">
                        <p className="text-sm text-gray-500 mb-1">
                          Form Completion
                        </p>
                        <div className="flex items-center">
                          <div className="flex-grow mr-4">
                            <LinearProgress
                              variant="determinate"
                              value={formProgress}
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                "& .MuiLinearProgress-bar": {
                                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                },
                              }}
                            />
                          </div>
                          <Typography variant="body2" color="text.secondary">
                            {Math.round(formProgress)}%
                          </Typography>
                        </div>
                      </div>
                    </GlassBox>
                  </Zoom>
                </Grid>
              )}

              <Grid item xs={12} md={showStepper ? 9 : 12}>
                <GradientCard>
                  <CardContent sx={{ p: 0 }}>
                    <Box
                      sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
                    >
                      <Tabs
                        value={currentTab}
                        onChange={handleTabChangeWithEffect}
                        variant="scrollable"
                        scrollButtons="auto"
                        TabIndicatorProps={{
                          style: {
                            backgroundColor: theme.palette.primary.main,
                            height: 3,
                            borderRadius: 1.5,
                          },
                        }}
                        sx={{
                          "& .MuiTabs-flexContainer": {
                            borderBottom: `1px solid ${alpha(
                              theme.palette.divider,
                              0.1
                            )}`,
                          },
                        }}
                      >
                        <AnimatedTab
                          icon={<FaUserTie />}
                          iconPosition="start"
                          label="Basic Info"
                        />
                        <AnimatedTab
                          icon={<MdLocationOn />}
                          iconPosition="start"
                          label="Address"
                        />
                        <AnimatedTab
                          icon={<MdBusiness />}
                          iconPosition="start"
                          label="Business Details"
                        />
                        <AnimatedTab
                          icon={<MdPayment />}
                          iconPosition="start"
                          label="Financial Info"
                        />
                        <AnimatedTab
                          icon={<MdLocalShipping />}
                          iconPosition="start"
                          label="Supply Chain"
                        />
                        <AnimatedTab
                          icon={<MdVerified />}
                          iconPosition="start"
                          label="Evaluation"
                        />
                      </Tabs>
                    </Box>

                    <Box sx={{ px: {xs:1 , md:3}, pb: 3 }}>
                      <FormProvider {...methods}>
                        <form
                          onChange={() => setFormTouched(true)}
                          onSubmit={methods.handleSubmit(handleEnhancedSubmit)}
                        >
                          {/* Tab 1: Basic Information */}
                          {currentTab === 0 && (
                            <Fade in={true} timeout={500}>
                              <FormSection>
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                    <EnhancedSectionTitle>
                                      <FaUserTie className="mr-2" />
                                      Basic Information
                                    </EnhancedSectionTitle>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Box sx={{ textAlign: "center" }}>
                                      <TASFileupload
                                        uploadBoxStyles={{                                          
                                          border: `2px dashed ${alpha(
                                            theme.palette.primary.main,
                                            0.3
                                          )}`,
                                          borderRadius: 4,
                                          transition: "all 0.3s ease",
                                          "&:hover": {
                                            borderColor:
                                              theme.palette.primary.main,
                                            backgroundColor: alpha(
                                              theme.palette.primary.main,
                                              0.05
                                            ),
                                          },
                                        }}
                                        name="supplier_photo"
                                        label="Supplier Photo "
                                        icon={
                                          <CloudUpload
                                            sx={{
                                              fontSize: 60,
                                              color: theme.palette.primary.main,
                                              mb: 1,
                                            }}
                                          />
                                        }
                                        helperText="Drag and drop files here or click to browse"
                                      />
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ mt: 1, display: "block" }}
                                      >
                                        Recommended size: 400x400px, Max: 2MB
                                      </Typography>
                                    </Box>
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <Grid container spacing={1}>
                                      <Grid item xs={12}>
                                        <TASInput
                                          name="full_name"
                                          label="Full Name"
                                          icon={FaUserTie}
                                          iconPosition="start"
                                          InputProps={{
                                            sx: {
                                              borderRadius: 2,
                                              "&:hover": {
                                                boxShadow: `0 0 0 1px ${alpha(
                                                  theme.palette.primary.main,
                                                  0.3
                                                )}`,
                                              },
                                              "&.Mui-focused": {
                                                boxShadow: `0 0 0 2px ${alpha(
                                                  theme.palette.primary.main,
                                                  0.3
                                                )}`,
                                              },
                                            },
                                          }}
                                        />
                                      </Grid>

                                      <Grid item xs={12}>
                                        <TASInput
                                          name="shop_name"
                                          label="Shop/Company Name"
                                          icon={FaBuilding}
                                          iconPosition="start"
                                          InputProps={{
                                            sx: {
                                              borderRadius: 2,
                                              "&:hover": {
                                                boxShadow: `0 0 0 1px ${alpha(
                                                  theme.palette.primary.main,
                                                  0.3
                                                )}`,
                                              },
                                              "&.Mui-focused": {
                                                boxShadow: `0 0 0 2px ${alpha(
                                                  theme.palette.primary.main,
                                                  0.3
                                                )}`,
                                              },
                                            },
                                          }}
                                        />
                                      </Grid>
                                    </Grid>
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <Grid container spacing={1}>
                                      <Grid item xs={4}>
                                        <CountryCodeAutocomplete
                                          name="country_code"
                                          options={countries}
                                          defaultValue={countryCode}
                                          error={!!errors.country_code}
                                          helperText={
                                            errors.country_code?.message
                                          }
                                        />
                                      </Grid>
                                      <Grid item xs={8}>
                                        <TASInput
                                          name="phone_number"
                                          label="Phone Number"
                                          value={phoneNumber}
                                          icon={FaPhone}
                                          iconPosition="start"
                                          onChange={handlePhoneNumberChange}
                                          error={!!errors.phone_number}
                                          helperText={
                                            errors.phone_number?.message
                                          }
                                          InputProps={{
                                            sx: {
                                              borderRadius: 2,
                                              "&:hover": {
                                                boxShadow: `0 0 0 1px ${alpha(
                                                  theme.palette.primary.main,
                                                  0.3
                                                )}`,
                                              },
                                              "&.Mui-focused": {
                                                boxShadow: `0 0 0 2px ${alpha(
                                                  theme.palette.primary.main,
                                                  0.3
                                                )}`,
                                              },
                                            },
                                          }}
                                        />
                                      </Grid>
                                    </Grid>
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TASInput
                                      name="email"
                                      label="Email Address"
                                      type="email"
                                      icon={FaEnvelope}
                                      iconPosition="start"
                                      error={!!errors.email}
                                      helperText={errors.email?.message}
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TASInput
                                      name="website"
                                      label="Website"
                                      icon={FaGlobe}
                                      iconPosition="start"
                                      error={!!errors.website}
                                      helperText={errors.website?.message}
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <FormSelect
                                      name="vendor"
                                      label="Vendor Categories"
                                      options={VendorCategoriesOption}
                                      icon={MdCategory}
                                      error={!!errors.vendor}
                                      helperText={errors.vendor?.message}
                                      SelectProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TASInput
                                      name="tax_id"
                                      label="Tax ID/VAT Number"
                                      icon={FaIdCard}
                                      iconPosition="start"
                                      error={!!errors.tax_id}
                                      helperText={errors.tax_id?.message}
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TASInput
                                      name="registration_number"
                                      label="Business Registration Number"
                                      icon={FaFileContract}
                                      iconPosition="start"
                                      error={!!errors.registration_number}
                                      helperText={
                                        errors.registration_number?.message
                                      }
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </FormSection>
                            </Fade>
                          )}

                          {/* Tab 2: Address Information */}
                          {currentTab === 1 && (
                            <Fade in={true} timeout={500}>
                              <FormSection>
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                    <EnhancedSectionTitle>
                                      <MdLocationOn className="mr-2" />
                                      Address Information
                                    </EnhancedSectionTitle>
                                  </Grid>

                                  <Grid item xs={12}>
                                    <FormTextArea
                                      name="street_address"
                                      label="Street Address"
                                      placeholder="Street address..."
                                      minRows={4}
                                      error={!!errors.street_address}
                                      helperText={
                                        errors.street_address?.message
                                      }
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TASInput
                                      name="country"
                                      label="Country"
                                      icon={Language}
                                      iconPosition="start"
                                      error={!!errors.country}
                                      helperText={errors.country?.message}
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TASInput
                                      name="state"
                                      label="State/Province"
                                      icon={Cabin}
                                      iconPosition="start"
                                      error={!!errors.state}
                                      helperText={errors.state?.message}
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TASInput
                                      name="city"
                                      label="City"
                                      icon={LocationCity}
                                      iconPosition="start"
                                      error={!!errors.city}
                                      helperText={errors.city?.message}
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TASInput
                                      name="postal_code"
                                      label="Postal/ZIP Code"
                                      icon={FolderZip}
                                      iconPosition="start"
                                      error={!!errors.postal_code}
                                      helperText={errors.postal_code?.message}
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12}>
                                    <TASInput
                                      name="delivery_instructions"
                                      label="Delivery Instructions"
                                      icon={DeliveryDining}
                                      iconPosition="start"
                                      error={!!errors.delivery_instructions}
                                      helperText={
                                        errors.delivery_instructions?.message
                                      }
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </FormSection>
                            </Fade>
                          )}

                          {/* Tab 3: Business Details */}
                          {currentTab === 2 && (
                            <Fade in={true} timeout={500}>
                              <FormSection>
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                    <EnhancedSectionTitle>
                                      <MdBusiness className="mr-2" />
                                      Business Details
                                    </EnhancedSectionTitle>
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TASInput
                                      name="year_established"
                                      label="Year Established"
                                      type="number"
                                      icon={FaBuilding}
                                      iconPosition="start"
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TASInput
                                      name="number_of_employees"
                                      label="Number of Employees"
                                      type="number"
                                      icon={FaUsers}
                                      iconPosition="start"
                                      error={!!errors.number_of_employees}
                                      helperText={
                                        errors.number_of_employees?.message
                                      }
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TASInput
                                      name="annual_revenue"
                                      label="Annual Revenue"
                                      type="number"
                                      icon={FaMoneyBillWave}
                                      iconPosition="start"
                                      error={!!errors.annual_revenue}
                                      helperText={
                                        errors.annual_revenue?.message
                                      }
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <FormSelect
                                      name="business_type"
                                      label="Business Type"
                                      options={VendorCategoriesOption}
                                      icon={MdCategory}
                                      error={!!errors.business_type}
                                      helperText={errors.business_type?.message}
                                      SelectProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12}>
                                    <FormTextArea
                                      name="business_description"
                                      label="Business Description"
                                      placeholder="Business Description..."
                                      minRows={4}
                                      error={!!errors.business_description}
                                      helperText={
                                        errors.business_description?.message
                                      }
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </FormSection>
                            </Fade>
                          )}

                          {/* Tab 4: Financial Information */}
                          {currentTab === 3 && (
                            <Fade in={true} timeout={500}>
                              <FormSection>
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                    <EnhancedSectionTitle>
                                      <MdPayment className="mr-2" />
                                      Financial Information
                                    </EnhancedSectionTitle>
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TASInput
                                      name="bank_name"
                                      label="Bank Name"
                                      icon={FaCreditCard}
                                      iconPosition="start"
                                      error={!!errors.bank_name}
                                      helperText={errors.bank_name?.message}
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TASInput
                                      name="account_number"
                                      label="Account Number"
                                      icon={FaFileInvoiceDollar}
                                      iconPosition="start"
                                      error={!!errors.account_number}
                                      helperText={
                                        errors.account_number?.message
                                      }
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TASInput
                                      name="swift_code"
                                      label="SWIFT/BIC Code"
                                      icon={FaMoneyBillWave}
                                      iconPosition="start"
                                      error={!!errors.swift_code}
                                      helperText={errors.swift_code?.message}
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <FormSelect
                                      name="payment_terms"
                                      label="Payment Terms"
                                      options={PaymentTermsOption}
                                      icon={MdCategory}
                                      error={!!errors.payment_terms}
                                      helperText={errors.payment_terms?.message}
                                      SelectProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TASSwitch
                                      name="credit_terms"
                                      label="Credit Terms Available"
                                      defaultChecked={false}
                                      sx={{
                                        "& .MuiSwitch-switchBase.Mui-checked": {
                                          color: theme.palette.primary.main,
                                          "&:hover": {
                                            backgroundColor: alpha(
                                              theme.palette.primary.main,
                                              0.1
                                            ),
                                          },
                                        },
                                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                          {
                                            backgroundColor:
                                              theme.palette.primary.main,
                                          },
                                      }}
                                    />
                                  </Grid>

                                  {creditTerms && (
                                    <Grid item xs={12} md={6}>
                                      <TASInput
                                        name="credit_limit"
                                        label="Credit Limit"
                                        type="number"
                                        icon={MdAttachMoney}
                                        iconPosition="start"
                                        error={!!errors.credit_limit}
                                        helperText={
                                          errors.credit_limit?.message
                                        }
                                        InputProps={{
                                          sx: {
                                            borderRadius: 2,
                                            "&:hover": {
                                              boxShadow: `0 0 0 1px ${alpha(
                                                theme.palette.primary.main,
                                                0.3
                                              )}`,
                                            },
                                            "&.Mui-focused": {
                                              boxShadow: `0 0 0 2px ${alpha(
                                                theme.palette.primary.main,
                                                0.3
                                              )}`,
                                            },
                                          },
                                        }}
                                      />
                                    </Grid>
                                  )}

                                  <Grid item xs={12} md={6}>
                                    <TASSwitch
                                      color="primary"
                                      name="tax_exempt"
                                      label="Tax Exempt"
                                      defaultChecked={false}
                                      sx={{
                                        "& .MuiSwitch-switchBase.Mui-checked": {
                                          color: theme.palette.primary.main,
                                          "&:hover": {
                                            backgroundColor: alpha(
                                              theme.palette.primary.main,
                                              0.1
                                            ),
                                          },
                                        },
                                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                          {
                                            backgroundColor:
                                              theme.palette.primary.main,
                                          },
                                      }}
                                    />
                                  </Grid>

                                  {taxExempt && (
                                    <Grid item xs={12} md={6}>
                                      <TASInput
                                        name="tax_exemption_number"
                                        label="Tax Exemption Number"
                                        icon={FaPercentage}
                                        iconPosition="start"
                                        error={!!errors.tax_exemption_number}
                                        helperText={
                                          errors.tax_exemption_number?.message
                                        }
                                        InputProps={{
                                          sx: {
                                            borderRadius: 2,
                                            "&:hover": {
                                              boxShadow: `0 0 0 1px ${alpha(
                                                theme.palette.primary.main,
                                                0.3
                                              )}`,
                                            },
                                            "&.Mui-focused": {
                                              boxShadow: `0 0 0 2px ${alpha(
                                                theme.palette.primary.main,
                                                0.3
                                              )}`,
                                            },
                                          },
                                        }}
                                      />
                                    </Grid>
                                  )}
                                </Grid>
                              </FormSection>
                            </Fade>
                          )}

                          {/* Tab 5: Supply Chain Information */}
                          {currentTab === 4 && (
                            <Fade in={true} timeout={500}>
                              <FormSection>
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                    <EnhancedSectionTitle>
                                      <MdLocalShipping className="mr-2" />
                                      Supply Chain Information
                                    </EnhancedSectionTitle>
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <FormSelect
                                      name="delivery_terms"
                                      label="Delivery Terms"
                                      options={DeliveryTermsOption}
                                      icon={MdCategory}
                                      error={!!errors.delivery_terms}
                                      helperText={
                                        errors.delivery_terms?.message
                                      }
                                      SelectProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TASInput
                                      name="minimum_order_value"
                                      label="Minimum Order Value"
                                      type="number"
                                      icon={FaBoxOpen}
                                      iconPosition="start"
                                      error={!!errors.minimum_order_value}
                                      helperText={
                                        errors.minimum_order_value?.message
                                      }
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TASInput
                                      name="lead_time"
                                      label="Lead Time (Days)"
                                      type="number"
                                      icon={MdAccessTime}
                                      iconPosition="start"
                                      error={!!errors.lead_time}
                                      helperText={errors.lead_time?.message}
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TASInput
                                      name="shipping_method"
                                      label="Shipping Method"
                                      icon={FaShippingFast}
                                      iconPosition="start"
                                      error={!!errors.shipping_method}
                                      helperText={
                                        errors.shipping_method?.message
                                      }
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12}>
                                    <TASInput
                                      name="supply_chain_notes"
                                      label="Supply Chain Notes"
                                      icon={MdDescription}
                                      iconPosition="start"
                                      error={!!errors.supply_chain_notes}
                                      helperText={
                                        errors.supply_chain_notes?.message
                                      }
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </FormSection>
                            </Fade>
                          )}

                          {/* Tab 6: Evaluation */}
                          {currentTab === 5 && (
                            <Fade in={true} timeout={500}>
                              <FormSection>
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                    <EnhancedSectionTitle>
                                      <MdVerified className="mr-2" />
                                      Supplier Evaluation
                                    </EnhancedSectionTitle>
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <FormSelect
                                      name="supplier_status"
                                      label="Supplier Status"
                                      options={SupplierStatusOption}
                                      icon={MdCategory}
                                      error={!!errors.supplier_status}
                                      helperText={
                                        errors.supplier_status?.message
                                      }
                                      SelectProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <Box
                                      sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        border: `1px solid ${alpha(
                                          theme.palette.divider,
                                          0.1
                                        )}`,
                                        bgcolor: alpha(
                                          theme.palette.background.paper,
                                          0.5
                                        ),
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                          boxShadow: `0 4px 20px ${alpha(
                                            theme.palette.primary.main,
                                            0.1
                                          )}`,
                                        },
                                      }}
                                    >
                                      <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                      >
                                        Supplier Rating
                                      </Typography>
                                      <FormRating
                                        name="supplier_rating"
                                        precision={0.5}
                                        size="large"
                                        sx={{
                                          "& .MuiRating-iconFilled": {
                                            color: theme.palette.primary.main,
                                          },
                                          "& .MuiRating-iconHover": {
                                            color: theme.palette.primary.dark,
                                          },
                                        }}
                                      />
                                    </Box>
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TASInput
                                      name="quality_certification"
                                      label="Quality Certification"
                                      icon={WorkspacePremium}
                                      iconPosition="start"
                                      placeholder="e.g., ISO 9001, ISO 14001"
                                      error={!!errors.quality_certification}
                                      helperText={
                                        errors.quality_certification?.message
                                      }
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12}>
                                    <FormTextArea
                                      name="notes"
                                      label="Evaluation Notes"
                                      placeholder="Enter evaluation notes, performance history, etc."
                                      minRows={4}
                                      error={!!errors.notes}
                                      helperText={errors.notes?.message}
                                      InputProps={{
                                        sx: {
                                          borderRadius: 2,
                                          "&:hover": {
                                            boxShadow: `0 0 0 1px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                          "&.Mui-focused": {
                                            boxShadow: `0 0 0 2px ${alpha(
                                              theme.palette.primary.main,
                                              0.3
                                            )}`,
                                          },
                                        },
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </FormSection>
                            </Fade>
                          )}

                          <EnhancedDivider/>

                          {/* Form Actions */}
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mt: 2,
                              flexWrap: "wrap",
                              gap: 2,
                            }}
                          >
                            <GradientButton
                              variant="outlined"
                              color="secondary"
                              startIcon={
                                currentTab > 0 ? <ArrowBack /> : <Cancel />
                              }
                              onClick={() => {
                                if (currentTab > 0) {
                                  setCurrentTab(currentTab - 1);
                                } else {
                                  handleCancel();
                                }
                              }}
                              sx={{
                                background: "transparent",
                                border: `2px solid ${theme.palette.secondary.main}`,
                                color: theme.palette.secondary.main,
                                "&:hover": {
                                  background: alpha(
                                    theme.palette.secondary.main,
                                    0.1
                                  ),
                                  borderColor: theme.palette.secondary.dark,
                                },
                              }}
                            >
                              {currentTab > 0 ? "Previous" : "Cancel"}
                            </GradientButton>

                            {currentTab < 5 ? (
                              <GradientButton
                                type="button"
                                endIcon={<ArrowForward />}
                                onClick={() => setCurrentTab(currentTab + 1)}
                              >
                                Next
                              </GradientButton>
                            ) : (
                              <GradientButton
                                type="submit"
                                disabled={
                                  loading || createLoading || updateLoading
                                }
                                startIcon={
                                  createLoading || updateLoading ? (
                                    <CircularProgress
                                      size={20}
                                      color="inherit"
                                    />
                                  ) : (
                                    <FaHandshake />
                                  )
                                }
                              >
                                {createLoading || updateLoading
                                  ? "Processing..."
                                  : `${
                                      isEditing
                                        ? "Update Supplier"
                                        : "Add Supplier"
                                    }`}
                              </GradientButton>
                            )}
                          </Box>
                        </form>
                      </FormProvider>
                    </Box>
                  </CardContent>
                </GradientCard>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </div>

      {/* Save Confirmation Dialog */}
      <Dialog
        open={saveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
          },
        }}
      >
        <DialogTitle
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            color: theme.palette.common.white,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FaHandshake /> {isEditing ? "Update Supplier" : "Add New Supplier"}
        </DialogTitle>
        <DialogContent sx={{ mt: 2, minWidth: 400 }}>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to {isEditing ? "update" : "add"} this
            supplier?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please review all information before confirming.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setSaveDialogOpen(false)}
            sx={{
              borderColor: alpha(theme.palette.text.primary, 0.3),
              "&:hover": {
                borderColor: alpha(theme.palette.text.primary, 0.5),
                backgroundColor: alpha(theme.palette.text.primary, 0.05),
              },
            }}
          >
            Cancel
          </Button>
          <GradientButton onClick={confirmSubmit} startIcon={<Save />}>
            Confirm
          </GradientButton>
        </DialogActions>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: `0 8px 32px ${alpha(theme.palette.error.main, 0.2)}`,
          },
        }}
      >
        <DialogTitle
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
            color: theme.palette.common.white,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <MdOutlineWarning /> Discard Changes
        </DialogTitle>
        <DialogContent sx={{ mt: 2, minWidth: 400 }}>
          <Typography variant="body1" gutterBottom>
            You have unsaved changes. Are you sure you want to leave?
          </Typography>
          <Typography variant="body2" color="error">
            All unsaved changes will be lost.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setCancelDialogOpen(false)}
            sx={{
              borderColor: alpha(theme.palette.text.primary, 0.3),
              "&:hover": {
                borderColor: alpha(theme.palette.text.primary, 0.5),
                backgroundColor: alpha(theme.palette.text.primary, 0.05),
              },
            }}
          >
            Continue Editing
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={confirmCancel}
            sx={{
              boxShadow: `0 4px 14px ${alpha(theme.palette.error.main, 0.4)}`,
              "&:hover": {
                boxShadow: `0 6px 20px ${alpha(theme.palette.error.main, 0.6)}`,
              },
            }}
          >
            Discard Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <SupplierListTable />
    </section>
  );
};

export default SupplierForm;
