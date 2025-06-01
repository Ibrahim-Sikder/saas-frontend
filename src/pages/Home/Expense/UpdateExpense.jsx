/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { FaFileInvoice } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAllExpensesCategoryQuery,
  useGetSingleExpenseQuery,
  useUpdateExpenseMutation,
} from "../../../redux/api/expense";
import { Box, Grid, Typography } from "@mui/material";
import TASDatepicker from "../../../components/form/Datepicker";
import TASForm from "../../../components/form/Form";
import TASInput from "../../../components/form/Input";
import TASSelect from "../../../components/form/Select";
import {
  bankNames,
  paymentMethods,
  warehouseCategory,
} from "../../../constant";
import TASTextarea from "../../../components/form/Textarea";
import "../Products/Product.css";
import TASFileupload from "../../../components/form/Fileupload";
import TASAutocomplete from "../../../components/form/Autocomplete";
import { useForm } from "react-hook-form";
const AddExpense = () => {
  const navigate = useNavigate();
  const id = new URLSearchParams(location.search).get("id");
  const [payment, setPayment] = useState("");
  const { data: singleExpense, isLoading } = useGetSingleExpenseQuery(id);
  const [updateExpense, { isLoading: updatingLoading }] =
    useUpdateExpenseMutation();

  const handlePaymentChange = (value) => {
    setPayment(value);
  };

  const { data } = useGetAllExpensesCategoryQuery({
    limit: 99999999999,
    page: 1,
    searchTerm: "",
  });
  const categoryOptions = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((category) => ({
      label: category.name,
      value: category._id,
    }));
  }, [data]);
  const { reset } = useForm();
  const handleSubmit = async (data, reset) => {
    const docUrl = Array.isArray(data.document)
      ? data.document[0]
      : data.document;
    const modifyValues = {
      ...data,
      document: docUrl,

      category:
        data.category &&
        data.category[0] &&
        categoryOptions.find((cat) => cat.label === data.category[0])?.value
          ? [
              categoryOptions.find((cat) => cat.label === data.category[0])
                .value,
            ]
          : [],

      amount: Number(data.amount),
    };

    const toastId = toast.loading("Updating Expense...");

    try {
      const res = await updateExpense({ id, ...modifyValues }).unwrap();

      if (res.success) {
        toast.update(toastId, {
          render: res.message || "Expense update successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }

      navigate("/dashboard/expense-list");
      reset();
    } catch (error) {
      toast.update(toastId, {
        render:
          "Error creating product: " +
          (error.message || "Something went wrong!"),
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      toast.dismiss(toastId);
    }
  };
  const boxStyle = {
    width: "200px",
    height: "100px",
    background: "#eaf4f9",
    border: "3px dashed #007bff",
  };

  const defaultValues = {
    document: singleExpense?.data?.document || " ",
    category: singleExpense?.data?.category
      ? [singleExpense.data.category.name]
      : [],
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
    payment_individual_markup:
      singleExpense?.data?.payment_individual_markup || "",
    expense_note: singleExpense?.data?.expense_note || "",
    amount: singleExpense?.data?.amount || "",
    voucher_no: singleExpense?.data?.voucher_no || "",
    tax: singleExpense?.data?.tax || "",
    warehouse: singleExpense?.data?.warehouse || "",
  };

  useEffect(() => {
    if (singleExpense?.data) {
      reset({
        ...defaultValues,
        document: singleExpense.data.document,
      });
    }
  }, [singleExpense, reset]);
  return (
    <section>
      <div className="addProductWraps">
        <div className="productHeadWrap">
          <div className="flex items-center md:justify-center ">
            <FaFileInvoice className="invoicIcon" />
            <div className="ml-2">
              <h3 className="md:text-2xl font-bold">Add Expense </h3>
              <span className="text-sm">Dashboard / Expense </span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <p>Loading</p>
        ) : (
          <>
            <div className="addProductWrap">
              <TASForm onSubmit={handleSubmit} defaultValues={defaultValues}>
                <div>
                  <div className="productFieldWrap">
                    <Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TASDatepicker
                            size="medium"
                            fullWidth
                            name="date"
                            label="Date"
                          />
                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12}>
                          <TASSelect
                            items={warehouseCategory}
                            size="medium"
                            fullWidth
                            name="warehouse"
                            label="Select Warehouse"
                          />
                        </Grid>
                        <Grid item lg={6} md={6} sm={4} xs={12}>
                          <TASAutocomplete
                            options={categoryOptions}
                            size="medium"
                            fullWidth
                            name="category"
                            label="Category"
                          />
                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12}>
                          <TASInput
                            size="medium"
                            fullWidth
                            name="voucher_no"
                            label="Voucher No "
                          />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                          <TASInput
                            size="medium"
                            fullWidth
                            name="tax"
                            label="Tax Applicable"
                          />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                          <TASFileupload
                            uploadBoxStyles={boxStyle}
                            fullWidth
                            name="document"
                            label="Upload document"
                            defaultValue={singleExpense?.data?.document}
                          />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                          <TASTextarea
                            fullWidth
                            name="expense_note"
                            label="Expense Note "
                            minRows={4}
                            placeholder="Type Text..."
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </div>
                </div>

                <Box marginTop="20px">
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    marginBottom="20px"
                  >
                    Payment Method
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TASInput
                        size="medium"
                        fullWidth
                        name="amount"
                        label="Amount"
                      />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TASInput
                        size="medium"
                        fullWidth
                        name="payment_individual_markup"
                        label="Individual Markup"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TASSelect
                        items={paymentMethods}
                        size="medium"
                        fullWidth
                        name="payment_method"
                        onChange={handlePaymentChange}
                        label="Payment Method"
                      />
                    </Grid>
                  </Grid>
                  <Box marginTop={4}>
                    <Grid container spacing={2}>
                      {payment && (
                        <>
                          {payment === "Check" && (
                            <>
                              <Grid item lg={6}>
                                <TASSelect
                                  items={bankNames}
                                  size="medium"
                                  fullWidth
                                  name="payment_account"
                                  label="Payment Account"
                                />
                              </Grid>
                              <Grid item lg={6}>
                                <TASInput
                                  size="medium"
                                  fullWidth
                                  name="bank_account_no"
                                  label="Account Number"
                                />
                              </Grid>
                              <Grid item lg={6}>
                                <TASInput
                                  size="medium"
                                  fullWidth
                                  name="check_no"
                                  label="Check No"
                                />
                              </Grid>
                            </>
                          )}
                          {payment === "Bank Transfer" && (
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                              <TASInput
                                size="medium"
                                fullWidth
                                name="bank_account_no"
                                label="Bank Account No"
                              />
                            </Grid>
                          )}

                          {payment === "Card" && (
                            <>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TASInput
                                  size="medium"
                                  fullWidth
                                  name="card_number"
                                  label="Card Number"
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TASInput
                                  size="medium"
                                  fullWidth
                                  name="card_holder_name"
                                  label="Card Holder Name"
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TASInput
                                  size="medium"
                                  fullWidth
                                  name="card_transaction_no"
                                  label="Card Transaction No"
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TASInput
                                  size="medium"
                                  fullWidth
                                  name="card_type"
                                  label="Card Type"
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TASInput
                                  size="medium"
                                  fullWidth
                                  name="month_first"
                                  label="Month"
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TASInput
                                  size="medium"
                                  fullWidth
                                  name="year"
                                  label="Year"
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TASInput
                                  size="medium"
                                  fullWidth
                                  name="month_second"
                                  label="Month"
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TASInput
                                  size="medium"
                                  fullWidth
                                  name="security_code"
                                  label="Security Code"
                                />
                              </Grid>
                            </>
                          )}
                          {payment === "Other" && (
                            <>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TASInput
                                  size="medium"
                                  fullWidth
                                  name="transaction_no"
                                  label="Transition No"
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TASInput
                                  size="medium"
                                  fullWidth
                                  name="transactionId"
                                  label="Transition ID"
                                />
                              </Grid>
                            </>
                          )}
                          {(payment === "Bkash" ||
                            payment === "Nagad" ||
                            payment === "Rocket") && (
                            <>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TASInput
                                  size="medium"
                                  fullWidth
                                  name="transaction_no"
                                  label="Transition No"
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TASInput
                                  size="medium"
                                  fullWidth
                                  name="transactionId"
                                  label="Transition ID"
                                />
                              </Grid>
                            </>
                          )}
                        </>
                      )}
                    </Grid>
                  </Box>
                  <div className="flex justify-end mt-3">
                    <button
                      disabled={updatingLoading}
                      className="bg-[#42A1DA] text-white px-5 py-2 rounded-md"
                    >
                      Update Expense
                    </button>
                  </div>
                </Box>
              </TASForm>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AddExpense;
