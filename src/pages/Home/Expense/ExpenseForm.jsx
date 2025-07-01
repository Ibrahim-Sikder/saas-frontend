/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
"use client"

import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Box,
  Grid,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Divider,
  Card,
  CardContent,
  useTheme,
  alpha,
  Stack,
  Chip,
} from "@mui/material"
import {
  Receipt,
  Warehouse,
  Category,
  AttachMoney,
  Payment,
  Description,
  CloudUpload,
  Save,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material"
import {
  useCreateExpenseMutation,
  useGetAllExpensesCategoryQuery,
  useGetSingleExpenseQuery,
  useUpdateExpenseMutation,
} from "../../../redux/api/expense"
import TASDatepicker from "../../../components/form/Datepicker"
import TASForm from "../../../components/form/Form"
import TASInput from "../../../components/form/Input"
import TASSelect from "../../../components/form/Select"
import { bankNames, paymentMethods, warehouseCategory } from "../../../constant"
import TASTextarea from "../../../components/form/Textarea"
import TASFileupload from "../../../components/form/Fileupload"
import TASAutocomplete from "../../../components/form/Autocomplete"
import { boxStyle } from "../../../utils"

// Validation schema
const expenseValidationSchema = z.object({
  date: z.string({ required_error: "Date is required" }),
  warehouse: z.string({ required_error: "Warehouse is required" }),
  category: z.array(z.string()).optional(),
  voucher_no: z.string({ required_error: "Voucher number is required" }),
  tax: z.string({ required_error: "Tax is required" }),
  expense_note: z.string().optional(),
  amount: z.union([z.number(), z.string()]),
  payment_individual_markup: z.string().optional(),
  payment_method: z.string({ required_error: "Payment method is required" }),
  payment_account: z.string().optional(),
  bank_account_no: z.string().optional(),
  check_no: z.string().optional(),
  card_number: z.string().optional(),
  card_holder_name: z.string().optional(),
  card_transaction_no: z.string().optional(),
  card_type: z.string().optional(),
  month_first: z.string().optional(),
  year: z.string().optional(),
  month_second: z.string().optional(),
  security_code: z.string().optional(),
  transaction_no: z.string().optional(),
  transactionId: z.string().optional(),
})

const ExpenseForm = ({ id }) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const [payment, setPayment] = useState("")
  const [formData, setFormData] = useState({})
  const tenantDomain = window.location.hostname.split(".")[0]

  const { data: singleExpense, isLoading } = useGetSingleExpenseQuery({
    tenantDomain,
    id,
  })

  console.log(singleExpense)

  const [createExpense, { isLoading: createLoading }] = useCreateExpenseMutation()
  const [updateExpense] = useUpdateExpenseMutation()

  const { data } = useGetAllExpensesCategoryQuery({
    tenantDomain,
    limit: 99999999999,
    page: 1,
    searchTerm: "",
  })

  const categoryOptions = useMemo(() => {
    if (!data?.data) return []
    return data.data.map((category) => ({
      label: category.name,
      value: category._id,
    }))
  }, [data])

  const steps = ["Basic Information", "Payment Details", "Review & Submit"]

  const defaultValues = {
    document: singleExpense?.data?.document || "",
    category: singleExpense?.data?.category ? [singleExpense.data.category.name] : [],
    date: singleExpense?.data?.date || "",
    expense_type: singleExpense?.data?.expense_type || "",
    cash_by: singleExpense?.data?.cash_by || "",
    transactionId: singleExpense?.data?.transactionId || "",
    transaction_no: singleExpense?.data?.transaction_no || "",
    security_code: singleExpense?.data?.security_code || "",
    month_second: singleExpense?.data?.month_second || "",
    month_first: singleExpense?.data?.month_first || "",
    year: singleExpense?.data?.year || "",
    card_type: singleExpense?.data?.card_type || "",
    card_transaction_no: singleExpense?.data?.card_transaction_no || "",
    card_holder_name: singleExpense?.data?.card_holder_name || "",
    card_number: singleExpense?.data?.card_number || "",
    check_no: singleExpense?.data?.check_no || "",
    bank_account_no: singleExpense?.data?.bank_account_no || "",
    payment_account: singleExpense?.data?.payment_account || "",
    payment_method: singleExpense?.data?.payment_method || "",
    payment_individual_markup: singleExpense?.data?.payment_individual_markup || "",
    expense_note: singleExpense?.data?.expense_note || "",
    amount: singleExpense?.data?.amount || "",
    voucher_no: singleExpense?.data?.voucher_no || "",
    tax: singleExpense?.data?.tax || "",
    warehouse: singleExpense?.data?.warehouse || "",
  }

  const handlePaymentChange = (value) => {
    setPayment(value)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  // Consolidated submit handler
  const handleSubmit = async (data, reset) => {
    const docUrl = Array.isArray(data.document) ? data.document[0] : data.document
    const modifyValues = {
      ...data,
      document: docUrl,
      category:
        data.category && data.category[0] && categoryOptions.find((cat) => cat.label === data.category[0])?.value
          ? [categoryOptions.find((cat) => cat.label === data.category[0]).value]
          : [],
      amount: Number(data.amount),
    }

    const toastId = toast.loading(id ? "Updating Expense..." : "Creating Expense...")

    try {
      let res
      if (id) {
        res = await updateExpense({tenantDomain,  id, ...modifyValues }).unwrap()
      } else {
        res = await createExpense({
          tenantDomain,
          expenseInfo: modifyValues,
        }).unwrap()
      }

      toast.update(toastId, {
        render: res.message || `Expense ${id ? "updated" : "created"} successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      })
      navigate("/dashboard/expense-list")
      reset()
    } catch (error) {
      toast.update(toastId, {
        render: `Error ${id ? "updating" : "creating"} expense: ` + (error.message || "Something went wrong!"),
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
    } finally {
      toast.dismiss(toastId)
    }
  }

  const collectFormData = (data) => {
    setFormData(data)
    if (activeStep === steps.length - 1) {
      handleSubmit(data, () => {})
    } else {
      handleNext()
    }
  }

  const renderPaymentFields = () => {
    if (!payment) return null

    const commonFields = {
      Check: (
        <>
          <Grid item xs={12} md={4}>
            <TASSelect items={bankNames} size="medium" fullWidth name="payment_account" label="Payment Account" />
          </Grid>
          <Grid item xs={12} md={4}>
            <TASInput size="medium" fullWidth name="bank_account_no" label="Account Number" />
          </Grid>
          <Grid item xs={12} md={4}>
            <TASInput size="medium" fullWidth name="check_no" label="Check No" />
          </Grid>
        </>
      ),
      "Bank Transfer": (
        <Grid item xs={12} md={6}>
          <TASInput size="medium" fullWidth name="bank_account_no" label="Bank Account No" />
        </Grid>
      ),
      Card: (
        <>
          <Grid item xs={12} md={6}>
            <TASInput size="medium" fullWidth name="card_number" label="Card Number" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TASInput size="medium" fullWidth name="card_holder_name" label="Card Holder Name" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TASInput size="medium" fullWidth name="card_transaction_no" label="Card Transaction No" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TASInput size="medium" fullWidth name="card_type" label="Card Type" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom mt={2}>
              Card Expiration
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <TASInput size="medium" fullWidth name="month_first" label="Month" />
          </Grid>
          <Grid item xs={12} md={3}>
            <TASInput size="medium" fullWidth name="year" label="Year" />
          </Grid>
          <Grid item xs={12} md={3}>
            <TASInput size="medium" fullWidth name="month_second" label="Month" />
          </Grid>
          <Grid item xs={12} md={3}>
            <TASInput size="medium" fullWidth name="security_code" label="Security Code" />
          </Grid>
        </>
      ),
    }

    if (["Bkash", "Nagad", "Rocket", "Other"].includes(payment)) {
      return (
        <>
          <Grid item xs={12} md={6}>
            <TASInput size="medium" fullWidth name="transaction_no" label="Transaction No" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TASInput size="medium" fullWidth name="transactionId" label="Transaction ID" />
          </Grid>
        </>
      )
    }

    return commonFields[payment] || null
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <Receipt color="primary" />
                    <Typography variant="h6" fontWeight="medium">
                      Basic Details
                    </Typography>
                  </Stack>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TASDatepicker size="medium" fullWidth name="date" label="Date" />
                    </Grid>
                    <Grid item xs={12}>
                      <TASInput size="medium" fullWidth name="voucher_no" label="Voucher No" />
                    </Grid>
                    <Grid item xs={12}>
                      <TASInput size="medium" fullWidth name="tax" label="Tax Applicable" />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <Category color="primary" />
                    <Typography variant="h6" fontWeight="medium">
                      Classification
                    </Typography>
                  </Stack>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TASSelect
                        items={warehouseCategory}
                        size="medium"
                        fullWidth
                        name="warehouse"
                        label="Select Warehouse"
                        startAdornment={<Warehouse fontSize="small" color="action" />}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TASAutocomplete
                        options={categoryOptions}
                        size="medium"
                        fullWidth
                        name="category"
                        label="Category"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <Description color="primary" />
                    <Typography variant="h6" fontWeight="medium">
                      Additional Information
                    </Typography>
                  </Stack>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Upload Document
                        </Typography>
                        <TASFileupload
                          uploadBoxStyles={boxStyle}
                          fullWidth
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
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Expense Note
                      </Typography>
                      <TASTextarea
                        fullWidth
                        name="expense_note"
                        minRows={5}
                        placeholder="Add any additional notes about this expense..."
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <AttachMoney color="primary" />
                    <Typography variant="h6" fontWeight="medium">
                      Amount Details
                    </Typography>
                  </Stack>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TASInput
                        size="medium"
                        fullWidth
                        name="amount"
                        label="Amount"
                        startAdornment={<AttachMoney fontSize="small" color="action" />}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TASInput size="medium" fullWidth name="payment_individual_markup" label="Individual Markup" />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <Payment color="primary" />
                    <Typography variant="h6" fontWeight="medium">
                      Payment Method
                    </Typography>
                  </Stack>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TASSelect
                        items={paymentMethods}
                        size="medium"
                        fullWidth
                        name="payment_method"
                        onChange={handlePaymentChange}
                        label="Payment Method"
                        startAdornment={<Payment fontSize="small" color="action" />}
                      />
                    </Grid>
                  </Grid>
                  {payment && (
                    <Box mt={3} p={2} bgcolor={alpha(theme.palette.primary.main, 0.05)} borderRadius={1}>
                      <Typography variant="subtitle1" fontWeight="medium" mb={2}>
                        {payment} Details
                      </Typography>
                      <Grid container spacing={2}>
                        {renderPaymentFields()}
                      </Grid>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )

      case 2:
        return (
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" fontWeight="medium" gutterBottom>
                Review Expense Details
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Please review all the information you've entered before submitting.
              </Typography>
              <Box mt={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                        Basic Information
                      </Typography>
                      <Stack spacing={2}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Date
                          </Typography>
                          <Typography variant="body2">{formData.date || "Not specified"}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Voucher No
                          </Typography>
                          <Typography variant="body2">{formData.voucher_no || "Not specified"}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Warehouse
                          </Typography>
                          <Typography variant="body2">{formData.warehouse || "Not specified"}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Category
                          </Typography>
                          <Typography variant="body2">
                            {formData.category && formData.category.length > 0
                              ? formData.category.join(", ")
                              : "Not specified"}
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                        Payment Details
                      </Typography>
                      <Stack spacing={2}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Amount
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            ${formData.amount || "0.00"}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Payment Method
                          </Typography>
                          <Typography variant="body2">{formData.payment_method || "Not specified"}</Typography>
                        </Box>
                        {formData.payment_method && (
                          <Chip
                            label={`${formData.payment_method} details included`}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        )}
                      </Stack>
                    </Paper>
                  </Grid>
                  {formData.expense_note && (
                    <Grid item xs={12}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                          Notes
                        </Typography>
                        <Typography variant="body2">{formData.expense_note}</Typography>
                      </Paper>
                    </Grid>
                  )}
                  {formData.document && (
                    <Grid item xs={12}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                          Attached Document
                        </Typography>
                        <Chip
                          icon={<CloudUpload fontSize="small" />}
                          label="Document attached"
                          size="small"
                          color="success"
                        />
                      </Paper>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </CardContent>
          </Card>
        )

      default:
        return "Unknown step"
    }
  }

  return (
   <>
   
    {
        isLoading ? (
            <h3>Loading</h3>
        ):(
             <Box sx={{ maxWidth: "80%", mx: "auto", p: { xs: 2, md: 3 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          mb: 3,
          borderRadius: 2,
          bgcolor: theme.palette.primary.main,
          color: "white",
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
          <Receipt sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {id ? "Edit Expense" : "Add Expense"}
            </Typography>
            <Typography variant="body2">Dashboard / Expense Management</Typography>
          </Box>
        </Stack>
      </Paper>

      <Paper elevation={1} sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 2 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Divider sx={{ mb: 3 }} />

        <TASForm
          onSubmit={collectFormData}
          resolver={zodResolver(expenseValidationSchema)}
          defaultValues={defaultValues}
        >
          {getStepContent(activeStep)}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button disabled={activeStep === 0} onClick={handleBack} startIcon={<ArrowBack />} variant="outlined">
              Back
            </Button>
            <Button
              type={activeStep === steps.length - 1 ? "submit" : "button"}
              onClick={activeStep === steps.length - 1 ? undefined : handleNext}
              variant="contained"
              color="primary"
              disabled={createLoading}
              endIcon={activeStep === steps.length - 1 ? <Save /> : <ArrowForward />}
            >
              {activeStep === steps.length - 1 ? (id ? "Update Expense" : "Create Expense") : "Next"}
            </Button>
          </Box>
        </TASForm>
      </Paper>
    </Box>
        )
    }
   </>
  )
  
}

export default ExpenseForm
