/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider } from "react-hook-form";
import {
  Grid,
  Typography,
  Paper,
  Box,
  Divider,
  Button,
  CircularProgress,
  Tabs,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";

import {
  FaFileInvoice,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaTag,
  FaFileAlt,
  FaFileInvoiceDollar,
  FaInfoCircle,
  FaUser,
  FaCar,
  FaTools,
  FaCreditCard,
  FaCheckCircle,
  FaPercentage,
  FaQuestionCircle,
  FaReceipt,
  FaBuilding,
  FaIdCard,
} from "react-icons/fa";
import { MdOutlinePayments, MdSave } from "react-icons/md";
import { useGetSingleIncomeQuery } from "../../redux/api/income";
import TASInput from "../../components/form/Input";
import {
  IncomeCategoriesOption,
  IncomeOption,
  PaymentMethodsOption,
  PaymentStatusOption,
  ServiceTypesOption,
} from "../../options";
import FormSelect from "../../components/form/FormSelect";
import FormAutocomplete from "../../components/form/FormAutocomplete";
import TASDatepicker from "../../components/form/Datepicker";

import TASSwitch from "../../components/form/switch";
import IncomeHeader from "./IncomeHeader";
import TASFileupload from "../../components/form/Fileupload";
import { CloudUpload } from "@mui/icons-material";
import {
  boxStyle,
  SectionTitle,
  StyledPaper,
  StyledTab,
  SubmitButton,
} from "../../utils";
import { useFormOptions } from "../../hooks/useFormOption";
import { useIncomeForm } from "../../hooks/useIncomeForm";
import FormTextArea from "../../components/form/FormTextArea";
import { useTenantDomain } from "../../hooks/useTenantDomain";

const IncomeForm = ({ id }) => {
 const tenantDomain = useTenantDomain();

  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();

  const { data: singleIncome, isLoading: incomeLoading } =
    useGetSingleIncomeQuery({tenantDomain, id});

  const { invoiceOption, jobcardOption, customerOption, vehicleOptions } =
    useFormOptions();

  const {
    methods,
    formSubmit,
    onSubmit,
    populateForm,
    createLoading,
    updateLoading,
    calculatedTax,
    totalAmount,
    watchAmount,
    applyTax,
    taxRate,
  } = useIncomeForm(id);

  
  const { handleSubmit } = methods;

  // Update form when singleIncome data is loaded
  useEffect(() => {
    if (id && singleIncome?.data) {
      populateForm(singleIncome);
    }
  }, [id, singleIncome, populateForm]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Show loading state while fetching data
  if (id && incomeLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <IncomeHeader />

        <StyledPaper elevation={3}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#42A1DA",
                },
              }}
            >
              <StyledTab
                icon={<FaFileInvoice />}
                iconPosition="start"
                label="Basic Info"
              />
              <StyledTab
                icon={<FaUser />}
                iconPosition="start"
                label="Customer & Vehicle"
              />
              <StyledTab
                icon={<FaCreditCard />}
                iconPosition="start"
                label="Payment Details"
              />
              <StyledTab
                icon={<FaFileAlt />}
                iconPosition="start"
                label="Documents"
              />
            </Tabs>
          </Box>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(id ? onSubmit : formSubmit)}>
              {/* Tab 1: Basic Information */}
              {tabValue === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <SectionTitle>
                      <FaInfoCircle className="mr-2" />
                      Basic Income Information
                    </SectionTitle>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <FaReceipt className="text-[#42A1DA] mr-2" />
                      <Typography variant="subtitle1" fontWeight="medium">
                        Receipt Number
                      </Typography>
                    </Box>

                    <TASInput
                      name="receipt_number"
                      label="Receipt Number"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <FaTag className="text-[#42A1DA] mt-1 mr-2" />
                      <Typography variant="subtitle1" fontWeight="medium">
                        Income Source
                      </Typography>
                    </Box>

                    <FormAutocomplete
                      name="income_source"
                      label="Select Income Source"
                      options={IncomeOption}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <FaFileInvoiceDollar className="text-[#42A1DA] mr-2" />
                      <Typography variant="subtitle1" fontWeight="medium">
                        Select Invoice
                      </Typography>
                    </Box>

                    <FormAutocomplete
                      name="invoice_number"
                      label="Select Invoice"
                      options={invoiceOption}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <FaTag className="text-[#42A1DA] mr-2" />
                      <Typography variant="subtitle1" fontWeight="medium">
                        Income Category
                      </Typography>
                    </Box>
                    <FormAutocomplete
                      name="category"
                      label="Select Categories"
                      options={IncomeCategoriesOption}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <FaMoneyBillWave className="text-[#42A1DA] mr-2" />
                      <Typography variant="subtitle1" fontWeight="medium">
                        Income Name
                      </Typography>
                    </Box>

                    <TASInput
                      name="income_name"
                      label="Enter Income Name"
                      placeholder="e.g., Service Fee, Parts Sale"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <FaCalendarAlt className="text-[#42A1DA]  mr-2" />
                      <Typography variant="subtitle1" fontWeight="medium">
                        Transaction Date
                      </Typography>
                    </Box>
                    <TASDatepicker
                      label="Select Date"
                      name="date"
                      fullWidth={true}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <FaTools className="text-[#42A1DA] mr-2" />
                      <Typography variant="subtitle1" fontWeight="medium">
                        Service Type
                      </Typography>
                    </Box>
                    <FormAutocomplete
                      name="service_type"
                      labelId="service-type-label"
                      label="Select Service Type"
                      options={ServiceTypesOption}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                    >
                      <FaInfoCircle className="text-[#42A1DA] mt-1 mr-2" />
                      <Typography variant="subtitle1" fontWeight="medium">
                        Description
                      </Typography>
                    </Box>
                    <FormTextArea
                      name="description"
                      label="Description"
                      placeholder="Add additional details about this income transaction..."
                      required={true}
                      minRows={4}
                    />
                  </Grid>
                </Grid>
              )}

              {/* Tab 2: Customer & Vehicle Information */}
              {tabValue === 1 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <SectionTitle>
                      <FaUser className="mr-2" />
                      Customer Information
                    </SectionTitle>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <FaUser className="text-[#42A1DA] mr-2" />
                      <Typography variant="subtitle1" fontWeight="medium">
                        Customer/Company/Showroom
                      </Typography>
                    </Box>

                    <FormAutocomplete
                      name="customer"
                      labelId="customer-label"
                      label="Select Customer"
                      options={customerOption}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <FaIdCard className="text-[#42A1DA] mr-2" />
                      <Typography variant="subtitle1" fontWeight="medium">
                        Job Card
                      </Typography>
                    </Box>

                    <FormAutocomplete
                      name="job_card"
                      labelId="jobcard-label"
                      label="Select Job Card"
                      options={jobcardOption}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <SectionTitle>
                      <FaCar className="mr-2" />
                      Vehicle Information
                    </SectionTitle>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <FaCar className="text-[#42A1DA] mr-2" />
                      <Typography variant="subtitle1" fontWeight="medium">
                        Vehicle
                      </Typography>
                    </Box>

                    <FormAutocomplete
                      name="vehicle"
                      labelId="vehicle-label"
                      label="Select Vehicle"
                      options={vehicleOptions}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <FaBuilding className="text-[#42A1DA] mr-2" />
                      <Typography variant="subtitle1" fontWeight="medium">
                        Department/Branch
                      </Typography>
                    </Box>
                    <TASInput
                      name="department"
                      label="Department/Branch"
                      placeholder="e.g., Service Center, Main Workshop"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              )}

              {/* Tab 3: Payment Details */}
              {tabValue === 2 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <SectionTitle>
                      <MdOutlinePayments className="mr-2" />
                      Payment Information
                    </SectionTitle>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <FaMoneyBillWave className="text-[#42A1DA] mr-2" />
                      <Typography variant="subtitle1" fontWeight="medium">
                        Amount
                      </Typography>
                    </Box>

                    <TASInput
                      name="amount"
                      label="Enter Amount"
                      placeholder="e.g., 1500.00"
                      fullWidth
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <FaCreditCard className="text-[#42A1DA] mr-2" />
                      <Typography variant="subtitle1" fontWeight="medium">
                        Payment Method
                      </Typography>
                    </Box>

                    <FormSelect
                      name="payment_method"
                      labelId="payment-method-label"
                      label="Select Payment Method"
                      options={PaymentMethodsOption}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                    >
                      <FaCheckCircle className="text-[#42A1DA] mt-1 mr-2" />
                      <Typography variant="subtitle1" fontWeight="medium">
                        Payment Status
                      </Typography>
                    </Box>

                    <FormSelect
                      name="payment_status"
                      labelId="payment-status-label"
                      label="Select Payment Status"
                      options={PaymentStatusOption}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                    >
                      <FaFileAlt className="text-[#42A1DA] mt-1 mr-2" />
                      <Typography variant="subtitle1" fontWeight="medium">
                        Reference Number
                      </Typography>
                      <Tooltip
                        title="For bank transfers, checks, or other payment references"
                        placement="top"
                      >
                        <IconButton size="small" sx={{ ml: 1 }}>
                          <FaQuestionCircle size={14} />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <TASInput
                      name="reference_number"
                      label="Reference Number"
                      placeholder="e.g., Check #, Transaction ID"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <SectionTitle>
                      <FaPercentage className="mr-2" />
                      Tax Information
                    </SectionTitle>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TASSwitch name="tax_applied" label="Apply Tax" />
                  </Grid>

                  {applyTax && (
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          mb: 1,
                        }}
                      >
                        <FaPercentage className="text-[#42A1DA] mt-1 mr-2" />
                        <Typography variant="subtitle1" fontWeight="medium">
                          Tax Rate (%)
                        </Typography>
                      </Box>
                      <TASInput
                        name="tax_rate"
                        label="Tax Rate (%)"
                        type="number"
                        fullWidth
                      />
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        mt: 2,
                        background: "rgba(66, 161, 218, 0.05)",
                        borderRadius: "8px",
                        border: "1px solid rgba(66, 161, 218, 0.2)",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                      >
                        Payment Summary
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2">Subtotal:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" align="right">
                            ${Number(watchAmount || 0).toFixed(2)}
                          </Typography>
                        </Grid>

                        {applyTax && (
                          <>
                            <Grid item xs={6}>
                              <Typography variant="body2">
                                Tax ({taxRate}%):
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2" align="right">
                                ${calculatedTax.toFixed(2)}
                              </Typography>
                            </Grid>
                          </>
                        )}

                        <Grid item xs={6}>
                          <Typography variant="subtitle2" fontWeight="bold">
                            Total:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            align="right"
                          >
                            ${totalAmount.toFixed(2)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              )}

              {/* Tab 4: Documents */}
              {tabValue === 3 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <SectionTitle>
                      <FaFileAlt className="mr-2" />
                      Supporting Documents
                    </SectionTitle>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TASFileupload
                      uploadBoxStyles={{ width: "300px", ...boxStyle }}
                      name="document"
                      label="Upload document"
                      icon={
                        <CloudUpload
                          sx={{
                            fontSize: 40,
                            color: theme.palette.primary.main,
                            mb: 1,
                          }}
                        />
                      }
                      helperText="Drag and drop files here or click to browse"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                    >
                      <FaFileInvoiceDollar className="text-[#42A1DA] mt-1 mr-2" />
                      <Typography variant="subtitle1" fontWeight="medium">
                        Invoice Number
                      </Typography>
                    </Box>

                    <TASInput
                      name="invoice_number"
                      label="Enter Invoice Number"
                      placeholder="e.g., INV-2023-001"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                    >
                      <FaInfoCircle className="text-[#42A1DA] mt-1 mr-2" />
                      <Typography variant="subtitle1" fontWeight="medium">
                        Document Notes
                      </Typography>
                    </Box>
                    <FormTextArea
                      name="document_notes"
                      placeholder="Add notes about the attached documents..."
                      required={true}
                      minRows={4}
                    />
                  </Grid>
                </Grid>
              )}

              <Divider sx={{ my: 4 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#42A1DA",
                    color: "#42A1DA",
                    borderRadius: "8px",
                    "&:hover": {
                      borderColor: "#2980b9",
                      backgroundColor: "rgba(66, 161, 218, 0.1)",
                    },
                  }}
                  onClick={() => {
                    if (tabValue > 0) {
                      setTabValue(tabValue - 1);
                    } else {
                      navigate("/dashboard/income-list");
                    }
                  }}
                >
                  {tabValue > 0 ? "Previous" : "Cancel"}
                </Button>

                {tabValue < 3 ? (
                  <Button
                    sx={{
                      background:
                        "linear-gradient(135deg, #42A1DA 0%, #2980b9 100%)",
                      color: "white",
                      borderRadius: "8px",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #2980b9 0%, #1e6091 100%)",
                      },
                    }}
                    onClick={() => setTabValue(tabValue + 1)}
                  >
                    Next
                  </Button>
                ) : (
                  <SubmitButton
                    type="submit"
                    disabled={createLoading || updateLoading}
                    endIcon={
                      createLoading || updateLoading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <MdSave />
                      )
                    }
                  >
                    {id
                      ? updateLoading
                        ? "Updating..."
                        : "Update Income"
                      : createLoading
                      ? "Saving..."
                      : "Save Income"}
                  </SubmitButton>
                )}
              </Box>
            </form>
          </FormProvider>
        </StyledPaper>
      </div>
    </section>
  );
};

export default IncomeForm;
