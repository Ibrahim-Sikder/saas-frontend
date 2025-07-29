/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider } from "react-hook-form";
import {
  Grid,
  Typography,
  Box,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaTag,
  FaFileAlt,
  FaFileInvoiceDollar,
  FaUser,
  FaCreditCard,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import {
  useCreateIncomeMutation,
  useGetSingleIncomeQuery,
  useUpdateIncomeMutation,
} from "../../redux/api/income";
import TASInput from "../../components/form/Input";
import { IncomeOption, PaymentMethodsOption } from "../../options";
import FormAutocomplete from "../../components/form/FormAutocomplete";
import TASDatepicker from "../../components/form/Datepicker";
import IncomeHeader from "./IncomeHeader";
import { StyledPaper, SubmitButton } from "../../utils";
import { useFormOptions } from "../../hooks/useFormOption";
import { useIncomeForm } from "../../hooks/useIncomeForm";
import FormTextArea from "../../components/form/FormTextArea";
import { useTenantDomain } from "../../hooks/useTenantDomain";
import GarageForm from "../../components/form/Form";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import dayjs from "dayjs";

const IncomeForm = ({ id }) => {
  const tenantDomain = useTenantDomain();
  const navigate = useNavigate();
  const { invoiceOption, customerOption } = useFormOptions();
  const [createIncome, { isLoading: createLoading }] =
    useCreateIncomeMutation();
  const [updateIncome, { isLoading: updateLoading }] =
    useUpdateIncomeMutation();

  const {
    data: singleIncome,
    isLoading: incomeLoading,
    error,
  } = useGetSingleIncomeQuery(
    {
      tenantDomain,
      id,
    },
    {
      skip: !id || !tenantDomain,
    }
  );

  console.log("single income", singleIncome);

  const handleSubmit = async (data) => {
    try {
      if (id) {
        const res = await updateIncome({
          tenantDomain,
          id,
          ...data,
        }).unwrap();

        if (res.success) {
          toast.success(res.message);
          navigate("/dashboard/income-list");
        }
      } else {
        const res = await createIncome({
          tenantDomain,
          ...data,
        }).unwrap();

        if (res.success) {
          toast.success(res.message);
          navigate("/dashboard/income-list");
        }
      }
    } catch (err) {
      toast.error(err.message || "Failed to create income");
    }
  };

  if (incomeLoading) {
    return <h3>Loading........</h3>;
  }

  const defaultValue = {
    date: singleIncome?.data?.date
      ? dayjs(singleIncome?.data?.date).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD"),

    // Multiple selection
    invoice_number: singleIncome?.data?.invoice_number
      ? Array.isArray(singleIncome?.data?.invoice_number)
        ? singleIncome.data.invoice_number
        : [singleIncome.data.invoice_number]
      : [],

    // Single selections (if you set multiple={false})
    customer: singleIncome?.data?.customer || "",
    income_source: singleIncome?.data?.income_source || "",
    payment_method: singleIncome?.data?.payment_method || "",

    amount: singleIncome?.data?.amount || 0,
    reference_number: singleIncome?.data?.reference_number || "",
    description: singleIncome?.data?.description || "",
  };

  return (
    <section className="py-6">
      {incomeLoading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IncomeHeader />
          <StyledPaper elevation={3}>
            <GarageForm onSubmit={handleSubmit} defaultValues={defaultValue}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                  >
                    <FaCalendarAlt className="text-[#42A1DA] mr-2" />
                    <Typography variant="subtitle1" fontWeight="medium">
                      Date
                    </Typography>
                  </Box>
                  <TASDatepicker
                    label={
                      <>
                        Select Date
                        <span style={{ color: "red", fontSize: "25px" }}>
                          {" "}
                          *
                        </span>
                      </>
                    }
                    name="date"
                    fullWidth={true}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                  >
                    <FaFileInvoiceDollar className="text-[#42A1DA] mr-2" />
                    <Typography variant="subtitle1" fontWeight="medium">
                      Invoice ID
                    </Typography>
                  </Box>
                  <FormAutocomplete
                    multiple={true}
                    label={
                      <>
                        Select Invoice
                        <span style={{ color: "red", fontSize: "25px" }}>
                          {" "}
                          *
                        </span>
                      </>
                    }
                    name="invoice_number"
                    options={invoiceOption}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                  >
                    <FaUser className="text-[#42A1DA] mr-2" />
                    <Typography variant="subtitle1" fontWeight="medium">
                      Customer Name
                    </Typography>
                  </Box>
                  <FormAutocomplete
                    label={
                      <>
                        Select Customer
                        <span style={{ color: "red", fontSize: "25px" }}>
                          {" "}
                          *
                        </span>
                      </>
                    }
                    name="customer"
                    labelId="customer-label"
                    options={customerOption}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                  >
                    <FaTag className="text-[#42A1DA] mr-2" />
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
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                  >
                    <FaMoneyBillWave className="text-[#42A1DA] mr-2" />
                    <Typography variant="subtitle1" fontWeight="medium">
                      Amount
                    </Typography>
                  </Box>
                  <TASInput
                    name="amount"
                    label={
                      <>
                        Enter Amount
                        <span style={{ color: "red", fontSize: "25px" }}>
                          {" "}
                          *
                        </span>
                      </>
                    }
                    placeholder="e.g., 1500.00"
                    fullWidth
                    type="number"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                  >
                    <FaCreditCard className="text-[#42A1DA] mr-2" />
                    <Typography variant="subtitle1" fontWeight="medium">
                      Payment Method
                    </Typography>
                  </Box>
                  <FormAutocomplete
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
                    <FaFileAlt className="text-[#42A1DA] mr-2" />
                    <Typography variant="subtitle1" fontWeight="medium">
                      Reference No
                    </Typography>
                  </Box>
                  <TASInput
                    name="reference_number"
                    label="Reference Number"
                    placeholder="e.g., Check #, Transaction ID"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                  >
                    <FaFileAlt className="text-[#42A1DA] mr-2" />
                    <Typography variant="subtitle1" fontWeight="medium">
                      Note
                    </Typography>
                  </Box>
                  <FormTextArea
                    name="description"
                    label="Note"
                    placeholder="Add additional details about this income transaction..."
                    minRows={4}
                  />
                </Grid>
              </Grid>

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
                    navigate("/dashboard/income-list");
                  }}
                >
                  Cancel
                </Button>

                <SubmitButton type="submit">
                  {id ? "Update Income" : "Save Income"}
                </SubmitButton>
              </Box>
            </GarageForm>
          </StyledPaper>
        </div>
      )}
    </section>
  );
};

export default IncomeForm;
