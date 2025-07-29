/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
"use client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  useTheme,
  Stack,
} from "@mui/material";
import {
  Receipt,
  AttachMoney,
  Description,
  CloudUpload,
  Save,
} from "@mui/icons-material";
import {
  useCreateExpenseMutation,
  useGetSingleExpenseQuery,
  useUpdateExpenseMutation,
} from "../../../redux/api/expense";
import TASDatepicker from "../../../components/form/Datepicker";
import TASForm from "../../../components/form/Form";
import TASInput from "../../../components/form/Input";
import TASSelect from "../../../components/form/Select";
import { paymentMethods } from "../../../constant";
import TASTextarea from "../../../components/form/Textarea";
import TASFileupload from "../../../components/form/Fileupload";
import { boxStyle } from "../../../utils";
import { useTenantDomain } from "../../../hooks/useTenantDomain";

import FormAutocomplete from "../../../components/form/FormAutocomplete";
import { useFormOptions } from "../../../hooks/useFormOption";

const ExpenseForm = ({ id }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const tenantDomain = useTenantDomain();
  const { invoiceOption, supplierOption, categoryOptions } = useFormOptions();
  const { data: singleExpense, isLoading } = useGetSingleExpenseQuery({
    tenantDomain,
    id,
  });
  const [createExpense, ] =
    useCreateExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();

  const defaultValues = {
    attachment: singleExpense?.data?.attachment || "",
    expense_category: singleExpense?.data?.expense_category || "",
    invoice_id: singleExpense?.data?.invoice_id || "",
    date: singleExpense?.data?.date || "",
    vendor: singleExpense?.data?.vendor || "",
    amount: singleExpense?.data?.amount || "",
    payment_method: singleExpense?.data?.payment_method || "",
    reference_no: singleExpense?.data?.reference_no || "",
    note: singleExpense?.data?.note || "",
    voucher_no: singleExpense?.data?.voucher_no || "",
  };

  const handleSubmit = async (data, reset) => {

    console.log(data)
    const docUrl = Array.isArray(data.document)
      ? data.document[0]
      : data.document;

    const modifyValues = {
      ...data,
      document: docUrl,
      amount: Number(data.amount),
    };

    const toastId = toast.loading(
      id ? "Updating Expense..." : "Creating Expense..."
    );

    try {
      let res;
      if (id) {
        res = await updateExpense({
          tenantDomain,
          id,
          ...modifyValues,
        }).unwrap();
      } else {
        res = await createExpense({
          tenantDomain,
          expenseInfo: modifyValues,
        }).unwrap();
      }

      toast.update(toastId, {
        render:
          res.message || `Expense ${id ? "updated" : "created"} successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate("/dashboard/expense-list");
      reset();
    } catch (error) {
      toast.update(toastId, {
        render:
          `Error ${id ? "updating" : "creating"} expense: ` +
          (error.message || "Something went wrong!"),
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      toast.dismiss(toastId);
    }
  };

  console.log('single expense', singleExpense)
  return (
    <>
      {isLoading ? (
        <h3>Loading</h3>
      ) : (
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
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems="center"
            >
              <Receipt sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {id ? "Edit Expense" : "Add Expense"}
                </Typography>
                <Typography variant="body2">
                  Dashboard / Expense Management
                </Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper
            elevation={1}
            sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 2 }}
          >
            <TASForm onSubmit={handleSubmit} defaultValues={defaultValues}>
              <Grid container spacing={3}>
                {/* Basic Information Section */}
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mb={2}
                      >
                        <Receipt color="primary" />
                        <Typography variant="h6" fontWeight="medium">
                          Expense Details
                        </Typography>
                      </Stack>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TASDatepicker
                            size="medium"
                            fullWidth
                            name="date"
                            label="Date"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormAutocomplete
                          
                            label={
                              <>
                                Select Invoice
                                <span
                                  style={{ color: "red", fontSize: "25px" }}
                                >
                                  {" "}
                                  *
                                </span>
                              </>
                            }
                            name="invoice_id"
                            options={invoiceOption}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormAutocomplete
                            name="expense_category"
                            label="Expense Category"
                            options={categoryOptions}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <FormAutocomplete
                            name="vendor"
                            label={
                              <>
                                Vendor/Supplier
                                <span
                                  style={{ color: "red", fontSize: "25px" }}
                                >
                                  {" "}
                                  *
                                </span>
                              </>
                            }
                            options={supplierOption}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Additional Information Section */}
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mb={2}
                      >
                        <Description color="primary" />
                        <Typography variant="h6" fontWeight="medium">
                          Additional Information
                        </Typography>
                      </Stack>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Attachment
                            </Typography>
                            <TASFileupload
                              uploadBoxStyles={boxStyle}
                              fullWidth
                              name="attachment"
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
                            Note
                          </Typography>
                          <TASTextarea
                            fullWidth
                            name="note"
                            minRows={3}
                            placeholder="Add any additional notes about this expense..."
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Payment Details Section */}
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mb={2}
                      >
                        <AttachMoney color="primary" />
                        <Typography variant="h6" fontWeight="medium">
                          Amount & Payment
                        </Typography>
                      </Stack>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <TASInput
                            size="medium"
                            fullWidth
                            name="amount"
                            label="Amount *"
                            type="number"
                            startAdornment={
                              <AttachMoney fontSize="small" color="action" />
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TASSelect
                            items={paymentMethods}
                            size="medium"
                            fullWidth
                            name="payment_method"
                            label="Payment Method"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TASInput
                            size="medium"
                            fullWidth
                            name="reference_no"
                            label="Reference No"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<Save />}
                >
                  {id ? "Update Expense" : "Create Expense"}
                </Button>
              </Box>
            </TASForm>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default ExpenseForm;
