/* eslint-disable no-unused-vars */
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    styled,
    TextField,
    Typography,
  } from "@mui/material";
  import { FaFileInvoice } from "react-icons/fa";
  import HeaderButton from "../../components/CommonButton/HeaderButton";
  import { NotificationAdd } from "@mui/icons-material";
  import { FaUserGear } from "react-icons/fa6";
  import { useForm } from "react-hook-form";
  

  const UpdateDonation = () => {
    const { register, watch, handleSubmit } = useForm();
    const payment = watch("payment_method");
  
    const onSubmit = async (data) => {
      //   data.payment_method = payment;
      //   data.image = url;
      //   data.amount = Number(data.amount);
      //   try {
      //     const response = await createBillPay(data).unwrap();
      //     if (response.success) {
      //       toast.success(response.message);
      //     }
      //   } catch (error) {
      //     toast.error(error.message);
      //   }
    };
  
    return (
      <Box>
        <section className="py-5 xl:py-0">
          <div className="addProductWraps">
            <div className="flex justify-between  border-b-2">
              <HeaderButton />
              <div className="flex items-end justify-end">
                <NotificationAdd size={30} className="mr-2" />
                <FaUserGear size={30} />
              </div>
            </div>
            <div className="productHeadWrap">
              <div className="flex items-center md:justify-center ">
                <FaFileInvoice className="invoicIcon" />
                <div className="ml-2">
                  <h3 className="md:text-2xl font-bold">Donation </h3>
                  <span className="text-sm">Dashboard / Donation </span>
                </div>
              </div>
            </div>
  
            <form onSubmit={handleSubmit(onSubmit)}>
              <Paper
                sx={{
                  width: {
                    lg: "1200px",
                    md: "100%",
                  },
                  margin: "auto",
                  padding: "30px",
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    textAlign="center"
                    marginBottom="20px"
                  >
                    Donation Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Name"
                        id="Tax"
                        {...register("name")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Mobile"
                        id="Tax"
                        {...register("mobile_number")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Address"
                        id="Tax"
                        {...register("address")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        id="Tax"
                        {...register("email")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Donate Purpose"
                        id="Tax"
                        {...register("donation_purpose")}
                      />
                    </Grid>
  
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Donation Amount"
                        id="Tax"
                        {...register("donation_amount")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Country"
                        id="Tax"
                        {...register("donation_country")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="payment-method-select">
                          Payment Method
                        </InputLabel>
                        <Select
                          //   onChange={handlePaymentChange}
                          label="Payment Method"
                          id="payment-method-select"
                          {...register("payment_method")}
                        >
                          <MenuItem value="Bkash">Bkash</MenuItem>
                          <MenuItem value="Nagad">Nagad</MenuItem>
                          <MenuItem value="Rocket">Rocket</MenuItem>
                          <MenuItem value="Check">Check</MenuItem>
                          <MenuItem value="Card">Card</MenuItem>
                          <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid container spacing={2}></Grid>
                  <Box marginTop={4} md={6} sm={12} xs={12}>
                    <Grid container spacing={2}>
                      {payment && (
                        <>
                          {payment === "Check" && (
                            <>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormControl fullWidth>
                                  <InputLabel htmlFor="payment-account-select">
                                    Select Bank
                                  </InputLabel>
                                  <Select
                                    label="Payment Account"
                                    id="payment-account-select"
                                    {...register("payment_method")}
                                  >
                                    <MenuItem value="Bangladesh Bank">
                                      Bangladesh Bank
                                    </MenuItem>
                                    <MenuItem value="Sonali Bank">
                                      Sonali Bank
                                    </MenuItem>
                                    <MenuItem value="Janata Bank">
                                      Janata Bank
                                    </MenuItem>
                                    <MenuItem value="Agrani Bank">
                                      Agrani Bank
                                    </MenuItem>
                                    <MenuItem value="Rupali Bank">
                                      Rupali Bank
                                    </MenuItem>
                                    <MenuItem value="Pubali Bank">
                                      Pubali Bank
                                    </MenuItem>
                                    <MenuItem value="Uttara Bank">
                                      Uttara Bank
                                    </MenuItem>
                                    <MenuItem value="Islami Bank Bangladesh Limited">
                                      Islami Bank Bangladesh Limited
                                    </MenuItem>
                                    <MenuItem value="Dutch-Bangla Bank">
                                      Dutch-Bangla Bank
                                    </MenuItem>
                                    <MenuItem value="BRAC Bank">
                                      BRAC Bank
                                    </MenuItem>
                                    <MenuItem value="Eastern Bank">
                                      Eastern Bank
                                    </MenuItem>
                                    <MenuItem value="National Bank">
                                      National Bank
                                    </MenuItem>
                                    <MenuItem value="Prime Bank">
                                      Prime Bank
                                    </MenuItem>
                                    <MenuItem value="South Bangla Agriculture and Commerce Bank">
                                      South Bangla Agriculture and Commerce Bank
                                    </MenuItem>
                                    <MenuItem value="Standard Bank">
                                      Standard Bank
                                    </MenuItem>
                                    <MenuItem value="One Bank">One Bank</MenuItem>
                                    <MenuItem value="Bank Asia">
                                      Bank Asia
                                    </MenuItem>
                                    <MenuItem value="Trust Bank">
                                      Trust Bank
                                    </MenuItem>
                                    <MenuItem value="Jamuna Bank">
                                      Jamuna Bank
                                    </MenuItem>
                                    <MenuItem value="Shahjalal Islami Bank">
                                      Shahjalal Islami Bank
                                    </MenuItem>
                                    <MenuItem value="City Bank">
                                      City Bank
                                    </MenuItem>
                                    <MenuItem value="Southeast Bank">
                                      Southeast Bank
                                    </MenuItem>
                                    <MenuItem value="Social Islami Bank">
                                      Social Islami Bank
                                    </MenuItem>
                                    <MenuItem value="AB Bank">AB Bank</MenuItem>
                                    <MenuItem value="IFIC Bank">
                                      IFIC Bank
                                    </MenuItem>
                                    <MenuItem value="Mercantile Bank">
                                      Mercantile Bank
                                    </MenuItem>
                                    <MenuItem value="Mutual Trust Bank">
                                      Mutual Trust Bank
                                    </MenuItem>
                                    <MenuItem value="EXIM Bank">
                                      EXIM Bank
                                    </MenuItem>
                                    <MenuItem value="NCC Bank">NCC Bank</MenuItem>
                                    <MenuItem value="SBAC Bank">
                                      SBAC Bank
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Account Number "
                                  {...register("bank_account_no")}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Check No"
                                  {...register("check_no")}
                                />
                              </Grid>
                            </>
                          )}
                          {payment === "Bank Transfer" && (
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                              <TextField
                                fullWidth
                                label="Bank Account No"
                                {...register("bank_account_no")}
                                marginTop={2}
                              />
                            </Grid>
                          )}
                         
                          {payment === "Card" && (
                            <>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Card Number"
                                  {...register("card_number")}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Card Holder Name"
                                  {...register("card_holder_name")}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Card Transaction No."
                                  {...register("card_transaction_no")}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Card Type"
                                  {...register("card_type")}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Month"
                                  {...register("month_first")}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Year"
                                  {...register("year")}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Month"
                                  {...register("month_second")}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Security Code"
                                  {...register("security_code")}
                                />
                              </Grid>
                            </>
                          )}
                          {payment === "Other" && (
                            <>
                              <Grid item lg={6} >
                                <TextField
                                  fullWidth
                                  label="Transition No"
                                  {...register("transaction_no")}
                                  marginTop={2}
                                />
                              </Grid>
                              <Grid item lg={6}>
                                <TextField
                                  fullWidth
                                  label="Transition ID"
                                  {...register("transactionId")}
                                  marginTop={2}
                                />
                              </Grid>
                            </>
                          )}
                          {(payment === "Bkash" ||
                            payment === "Nagad" ||
                            payment === "Rocket") && (
                            <>
                              <Grid item lg={6}>
                                <TextField
                                  fullWidth
                                  label="Transition No"
                                  {...register("transaction_no")}
                                  marginTop={2}
                                />
                              </Grid>
                              <Grid item lg={6}>
                                <TextField
                                  fullWidth
                                  label="Transition ID"
                                  {...register("transactionId")}
                                  marginTop={2}
                                />
                              </Grid>
                            </>
                          )}
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <textarea
                              placeholder="Description"
                              className="border p-3 rounded-md w-full h-[150px]"
                              id=""
                              cols="30"
                              rows="10"
                              {...register("description")}
                            />
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Box>
                  <div className="flex justify-end mt-3">
                    <button className="bg-[#42A1DA] text-white px-5 py-2 rounded-md">
                      Submit
                    </button>
                  </div>
                </Box>
              </Paper>
            </form>
          </div>
          {/* <BillPayList allBillPays={allBillPays} /> */}
        </section>
      </Box>
    );
  };
  
  export default UpdateDonation;
  