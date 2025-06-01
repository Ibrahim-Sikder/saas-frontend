// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// "use client";

// import {
//   Box,
//   Button,
//   CircularProgress,
//   Divider,
//   Grid,
//   Tabs,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import {
//   FaUsers,
//   FaBuilding,
//   FaPhone,
//   FaEnvelope,
//   FaGlobe,
//   FaIdCard,
//   FaMoneyBillWave,
//   FaPercentage,
//   FaCreditCard,
//   FaFileInvoiceDollar,
//   FaBoxOpen,
//   FaShippingFast,
//   FaUserTie,
//   FaFileContract,
//   FaHandshake,
// } from "react-icons/fa";
// import {
//   MdBusiness,
//   MdCategory,
//   MdLocalShipping,
//   MdPayment,
//   MdVerified,
//   MdLocationOn,
//   MdDescription,
//   MdAttachMoney,
//   MdAccessTime,
// } from "react-icons/md";
// import { FormProvider } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// import SupplierListTable from "./SupplierListTable";
// import SupplierHeader from "./SupplierHeader";
// import TASInput from "../../../components/form/Input";
// import CountryCodeAutocomplete from "../../../components/form/CountryCodeAutoComplete";
// import {
//   DeliveryTermsOption,
//   PaymentTermsOption,
//   SupplierStatusOption,
//   VendorCategoriesOption,
// } from "../../../options";
// import FormSelect from "../../../components/form/FormSelect";
// import TASFileupload from "../../../components/form/Fileupload";
// import {
//   boxStyle,
//   SectionTitle,
//   StyledButton,
//   StyledCard,
//   StyledTab,
// } from "../../../../src/utils";
// import {
//   Cabin,
//   CloudUpload,
//   DeliveryDining,
//   FolderZip,
//   Language,
//   LocationCity,
//   WorkspacePremium,
// } from "@mui/icons-material";
// import FormTextArea from "../../../components/form/FormTextArea";
// import TASSwitch from "../../../components/form/switch";
// import FormRating from "../../../components/form/FormRating";

// import { useSupplierForm } from "../../../hooks/useSupplierForm";
// import { countries } from "../../../constant";

// const SupplierForm = ({ id }) => {
//   const navigate = useNavigate();
//   const theme = useTheme();

//   const {
//     methods,
//     formSubmit,
//     onSubmit,
//     loading,
//     createLoading,
//     updateLoading,
//     currentTab,
//     setCurrentTab,
//     handleTabChange,
//     countryCode,
//     phoneNumber,
//     handlePhoneNumberChange,
//     creditTerms,
//     taxExempt,
//     errors,
//     isEditing,
//   } = useSupplierForm(id);

  
//   return (
//     <section className="py-6">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <SupplierHeader />

//         {/* Main Content */}
//         <StyledCard>
//           <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
//             <Tabs
//               value={currentTab}
//               onChange={handleTabChange}
//               variant="scrollable"
//               scrollButtons="auto"
//               TabIndicatorProps={{
//                 style: {
//                   backgroundColor: "#42A1DA",
//                 },
//               }}
//             >
//               <StyledTab
//                 icon={<FaUserTie />}
//                 iconPosition="start"
//                 label="Basic Info"
//               />
//               <StyledTab
//                 icon={<MdLocationOn />}
//                 iconPosition="start"
//                 label="Address"
//               />
//               <StyledTab
//                 icon={<MdBusiness />}
//                 iconPosition="start"
//                 label="Business Details"
//               />
//               <StyledTab
//                 icon={<MdPayment />}
//                 iconPosition="start"
//                 label="Financial Info"
//               />
//               <StyledTab
//                 icon={<MdLocalShipping />}
//                 iconPosition="start"
//                 label="Supply Chain"
//               />
//               <StyledTab
//                 icon={<MdVerified />}
//                 iconPosition="start"
//                 label="Evaluation"
//               />
//             </Tabs>
//           </Box>

//           <FormProvider {...methods}>
//             <form
//               onSubmit={methods.handleSubmit(isEditing ? onSubmit : formSubmit)}
//             >
//               {/* Tab 1: Basic Information */}
//               {currentTab === 0 && (
//                 <Grid container spacing={3}>
//                   <Grid item xs={12}>
//                     <SectionTitle>
//                       <FaUserTie className="mr-2" />
//                       Basic Information
//                     </SectionTitle>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TASFileupload
//                       uploadBoxStyles={{ width: "300px", ...boxStyle }}
//                       name="company_logo"
//                       label="Company Logo"
//                       icon={
//                         <CloudUpload
//                           sx={{
//                             fontSize: 40,
//                             color: theme.palette.primary.main,
//                             mb: 1,
//                           }}
//                         />
//                       }
//                       helperText="Drag and drop files here or click to browse"
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="full_name"
//                       label="Full Name"
//                       icon={FaUserTie}
//                       iconPosition="start"
//                       error={!!errors.full_name}
//                       helperText={errors.full_name?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="shop_name"
//                       label="Shop/Company Name"
//                       icon={FaBuilding}
//                       iconPosition="start"
//                       error={!!errors.shop_name}
//                       helperText={errors.shop_name?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <Grid container spacing={1}>
//                       <Grid item xs={4}>
//                         <CountryCodeAutocomplete
//                           name="country_code"
//                           options={countries}
//                           defaultValue={countryCode}
//                           error={!!errors.country_code}
//                           helperText={errors.country_code?.message}
//                         />
//                       </Grid>
//                       <Grid item xs={8}>
//                         <TASInput
                 
//                           name="phone_number"
//                           label="Phone Number"
//                           value={phoneNumber}
//                           icon={FaPhone}
//                           iconPosition="start"
//                           onChange={handlePhoneNumberChange}
//                           error={!!errors.phone_number}
//                           helperText={errors.phone_number?.message}
//                         />

//                       </Grid>
//                     </Grid>
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="email"
//                       label="Email Address"
//                       type="email"
//                       icon={FaEnvelope}
//                       iconPosition="start"
//                       error={!!errors.email}
//                       helperText={errors.email?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="website"
//                       label="Website"
//                       icon={FaGlobe}
//                       iconPosition="start"
//                       error={!!errors.website}
//                       helperText={errors.website?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <FormSelect
//                       name="vendor"
//                       label="Vendor Categories"
//                       options={VendorCategoriesOption}
//                       icon={MdCategory}
//                       defaultValue="new_parts"
//                       error={!!errors.vendor}
//                       helperText={errors.vendor?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="tax_id"
//                       label="Tax ID/VAT Number"
//                       icon={FaIdCard}
//                       iconPosition="start"
//                       error={!!errors.tax_id}
//                       helperText={errors.tax_id?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="registration_number"
//                       label="Business Registration Number"
//                       icon={FaFileContract}
//                       iconPosition="start"
//                       error={!!errors.registration_number}
//                       helperText={errors.registration_number?.message}
//                     />
//                   </Grid>
//                 </Grid>
//               )}

//               {/* Tab 2: Address Information */}
//               {currentTab === 1 && (
//                 <Grid container spacing={3}>
//                   <Grid item xs={12}>
//                     <SectionTitle>
//                       <MdLocationOn className="mr-2" />
//                       Address Information
//                     </SectionTitle>
//                   </Grid>

//                   <Grid item xs={12}>
//                     <FormTextArea
//                       name="street_address"
//                       label="Street Address"
//                       placeholder="Street address..."
//                       minRows={4}
//                       error={!!errors.street_address}
//                       helperText={errors.street_address?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="country"
//                       label="Country"
//                       icon={Language}
//                       iconPosition="start"
//                       error={!!errors.country}
//                       helperText={errors.country?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="state"
//                       label="State/Province"
//                       icon={Cabin}
//                       iconPosition="start"
//                       error={!!errors.state}
//                       helperText={errors.state?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="city"
//                       label="City"
//                       icon={LocationCity}
//                       iconPosition="start"
//                       error={!!errors.city}
//                       helperText={errors.city?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="postal_code"
//                       label="Postal/ZIP Code"
//                       icon={FolderZip}
//                       iconPosition="start"
//                       error={!!errors.postal_code}
//                       helperText={errors.postal_code?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TASInput
//                       name="delivery_instructions"
//                       label="Delivery Instructions"
//                       icon={DeliveryDining}
//                       iconPosition="start"
//                       error={!!errors.delivery_instructions}
//                       helperText={errors.delivery_instructions?.message}
//                     />
//                   </Grid>
//                 </Grid>
//               )}

//               {/* Tab 3: Business Details */}
//               {currentTab === 2 && (
//                 <Grid container spacing={3}>
//                   <Grid item xs={12}>
//                     <SectionTitle>
//                       <MdBusiness className="mr-2" />
//                       Business Details
//                     </SectionTitle>
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="year_established"
//                       label="Year Established"
//                       type="number"
//                       icon={FaBuilding}
//                       iconPosition="start"
//                       defaultValue={new Date().getFullYear() - 5}
//                       error={!!errors.year_established}
//                       helperText={errors.year_established?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="number_of_employees"
//                       label="Number of Employees"
//                       type="number"
//                       icon={FaUsers}
//                       iconPosition="start"
//                       defaultValue={10}
//                       error={!!errors.number_of_employees}
//                       helperText={errors.number_of_employees?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="annual_revenue"
//                       label="Annual Revenue"
//                       type="number"
//                       icon={FaMoneyBillWave}
//                       iconPosition="start"
//                       defaultValue={100000}
//                       error={!!errors.annual_revenue}
//                       helperText={errors.annual_revenue?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <FormSelect
//                       name="business_type"
//                       label="Business Type"
//                       options={VendorCategoriesOption}
//                       icon={MdCategory}
//                       defaultValue="new_parts"
//                       error={!!errors.business_type}
//                       helperText={errors.business_type?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <FormTextArea
//                       name="business_description"
//                       label="Business Description"
//                       placeholder="Business Description..."
//                       minRows={4}
//                       error={!!errors.business_description}
//                       helperText={errors.business_description?.message}
//                     />
//                   </Grid>
//                 </Grid>
//               )}

//               {/* Tab 4: Financial Information */}
//               {currentTab === 3 && (
//                 <Grid container spacing={3}>
//                   <Grid item xs={12}>
//                     <SectionTitle>
//                       <MdPayment className="mr-2" />
//                       Financial Information
//                     </SectionTitle>
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="bank_name"
//                       label="Bank Name"
//                       icon={FaCreditCard}
//                       iconPosition="start"
//                       error={!!errors.bank_name}
//                       helperText={errors.bank_name?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="account_number"
//                       label="Account Number"
//                       icon={FaFileInvoiceDollar}
//                       iconPosition="start"
//                       error={!!errors.account_number}
//                       helperText={errors.account_number?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="swift_code"
//                       label="SWIFT/BIC Code"
//                       icon={FaMoneyBillWave}
//                       iconPosition="start"
//                       error={!!errors.swift_code}
//                       helperText={errors.swift_code?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <FormSelect
//                       name="payment_terms"
//                       label="Payment Terms"
//                       options={PaymentTermsOption}
//                       icon={MdCategory}
//                       defaultValue="net_30"
//                       error={!!errors.payment_terms}
//                       helperText={errors.payment_terms?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASSwitch
//                       name="credit_terms"
//                       label="Credit Terms Available"
//                       defaultChecked={false}
//                     />
//                   </Grid>

//                   {creditTerms && (
//                     <Grid item xs={12} md={6}>
//                       <TASInput
//                         name="credit_limit"
//                         label="Credit Limit"
//                         type="number"
//                         icon={MdAttachMoney}
//                         iconPosition="start"
//                         defaultValue={10000}
//                         error={!!errors.credit_limit}
//                         helperText={errors.credit_limit?.message}
//                       />
//                     </Grid>
//                   )}

//                   <Grid item xs={12} md={6}>
//                     <TASSwitch
//                       color="primary"
//                       name="tax_exempt"
//                       label="Tax Exempt"
//                       defaultChecked={false}
//                     />
//                   </Grid>

//                   {taxExempt && (
//                     <Grid item xs={12} md={6}>
//                       <TASInput
//                         name="tax_exemption_number"
//                         label="Tax Exemption Number"
//                         icon={FaPercentage}
//                         iconPosition="start"
//                         error={!!errors.tax_exemption_number}
//                         helperText={errors.tax_exemption_number?.message}
//                       />
//                     </Grid>
//                   )}
//                 </Grid>
//               )}

//               {/* Tab 5: Supply Chain Information */}
//               {currentTab === 4 && (
//                 <Grid container spacing={3}>
//                   <Grid item xs={12}>
//                     <SectionTitle>
//                       <MdLocalShipping className="mr-2" />
//                       Supply Chain Information
//                     </SectionTitle>
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <FormSelect
//                       name="delivery_terms"
//                       label="Delivery Terms"
//                       options={DeliveryTermsOption}
//                       icon={MdCategory}
//                       defaultValue="ex_works"
//                       error={!!errors.delivery_terms}
//                       helperText={errors.delivery_terms?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="minimum_order_value"
//                       label="Minimum Order Value"
//                       type="number"
//                       icon={FaBoxOpen}
//                       iconPosition="start"
//                       defaultValue={100}
//                       error={!!errors.minimum_order_value}
//                       helperText={errors.minimum_order_value?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="lead_time"
//                       label="Lead Time (Days)"
//                       type="number"
//                       icon={MdAccessTime}
//                       iconPosition="start"
//                       defaultValue={7}
//                       error={!!errors.lead_time}
//                       helperText={errors.lead_time?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="shipping_method"
//                       label="Shipping Method"
//                       icon={FaShippingFast}
//                       iconPosition="start"
//                       error={!!errors.shipping_method}
//                       helperText={errors.shipping_method?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TASInput
//                       name="supply_chain_notes"
//                       label="Supply Chain Notes"
//                       icon={MdDescription}
//                       iconPosition="start"
//                       error={!!errors.supply_chain_notes}
//                       helperText={errors.supply_chain_notes?.message}
//                     />
//                   </Grid>
//                 </Grid>
//               )}

//               {/* Tab 6: Evaluation */}
//               {currentTab === 5 && (
//                 <Grid container spacing={3}>
//                   <Grid item xs={12}>
//                     <SectionTitle>
//                       <MdVerified className="mr-2" />
//                       Supplier Evaluation
//                     </SectionTitle>
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <FormSelect
//                       name="supplier_status"
//                       label="Supplier Status"
//                       options={SupplierStatusOption}
//                       icon={MdCategory}
//                       defaultValue="active"
//                       error={!!errors.supplier_status}
//                       helperText={errors.supplier_status?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <Box>
//                       <Typography variant="subtitle1" gutterBottom>
//                         Supplier Rating
//                       </Typography>
//                       <FormRating
//                         name="supplier_rating"
//                         precision={0.5}
//                         size="large"
//                         defaultValue={3}
//                       />
//                     </Box>
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TASInput
//                       name="quality_certification"
//                       label="Quality Certification"
//                       icon={WorkspacePremium}
//                       iconPosition="start"
//                       placeholder="e.g., ISO 9001, ISO 14001"
//                       error={!!errors.quality_certification}
//                       helperText={errors.quality_certification?.message}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <FormTextArea
//                       name="notes"
//                       label="Evaluation Notes"
//                       placeholder="e.g., ISO 9001, ISO 14001"
//                       minRows={4}
//                       error={!!errors.notes}
//                       helperText={errors.notes?.message}
//                     />
//                   </Grid>
//                 </Grid>
//               )}

//               <Divider sx={{ my: 4 }} />

//               {/* Form Actions */}
//               <Box
//                 sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
//               >
//                 <Button
//                   variant="outlined"
//                   sx={{
//                     borderColor: "#42A1DA",
//                     color: "#42A1DA",
//                     "&:hover": {
//                       borderColor: "#2980b9",
//                       backgroundColor: "rgba(66, 161, 218, 0.1)",
//                     },
//                   }}
//                   onClick={() => {
//                     if (currentTab > 0) {
//                       setCurrentTab(currentTab - 1);
//                     } else {
//                       navigate("/dashboard/supplier-list");
//                     }
//                   }}
//                 >
//                   {currentTab > 0 ? "Previous" : "Cancel"}
//                 </Button>

//                 {currentTab < 5 ? (
//                   <StyledButton
//                     type="button"
//                     onClick={() => setCurrentTab(currentTab + 1)}
//                   >
//                     Next
//                   </StyledButton>
//                 ) : (
//                   <StyledButton
//                     type="submit"
//                     disabled={loading || createLoading || updateLoading}
//                     startIcon={
//                       createLoading || updateLoading ? (
//                         <CircularProgress size={20} />
//                       ) : (
//                         <FaHandshake />
//                       )
//                     }
//                   >
//                     {createLoading || updateLoading
//                       ? "Processing..."
//                       : `${isEditing ? "Update Supplier" : "Add Supplier"}`}
//                   </StyledButton>
//                 )}
//               </Box>
//             </form>
//           </FormProvider>
//         </StyledCard>
//       </div>
//       <SupplierListTable />
//     </section>
//   );
// };

// export default SupplierForm;
