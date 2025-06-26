// /* eslint-disable no-unused-vars */
// import { useLocation, useNavigate } from "react-router-dom";
// import logo from "../../../../public/assets/logo.png";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Autocomplete, Button, TextField } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { cmDmOptions, countries } from "../../../constant";
// import TADatePickers from "../../../components/form/TADatePickers";
// import TrustAutoAddress from "../../../components/TrustAutoAddress/TrustAutoAddress";
// import { useUpdateInvoiceMutation } from "../../../redux/api/invoice";


// const UpdateInvoice = () => {
//   const [specificInvoice, setSpecificInvoice] = useState({});
//   const [partsTotal, setPartsTotal] = useState(0);
//   const [serviceTotal, setServiceTotal] = useState(0);
//   const [grandTotal, setGrandTotal] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [vat, setVAT] = useState(0);
//   const [advance, setAdvance] = useState(0);

//   const [error, setError] = useState("");
//   const [registrationError, setRegistrationError] = useState("");

//   const [reload, setReload] = useState(false);

//   const [removeButton, setRemoveButton] = useState("");
//   const [addButton, setAddButton] = useState(false);

//   // country code set
//   const [countryCode, setCountryCode] = useState(countries[0]);
//   const [phoneNumber, setPhoneNumber] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();
//   const id = new URLSearchParams(location.search).get("id");

//   const [items, setItems] = useState([
//     { description: "", quantity: "", rate: "", total: "" },
//   ]);
//   const [serviceItems, setServiceItems] = useState([
//     { servicesDescription: "", quantity: "", rate: "", total: "" },
//   ]);

//   const handlePhoneNumberChange = (e) => {
//     const newPhoneNumber = e.target.value;
//     if (
//       /^\d*$/.test(newPhoneNumber) &&
//       newPhoneNumber.length <= 11 &&
//       (newPhoneNumber === "" ||
//         !newPhoneNumber.startsWith("0") ||
//         newPhoneNumber.length > 1)
//     ) {
//       setPhoneNumber(newPhoneNumber);
//     }
//   };

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const [updateInvoice, { isLoading: updateLoading, error: updateError }] =
//     useUpdateInvoiceMutation();

//   const handleRemove = (index) => {
//     if (!index) {
//       const list = [...items];

//       setItems(list);
//     } else {
//       const list = [...items];
//       list.splice(index, 1);
//       setItems(list);
//     }
//   };

//   const handleAddClick = () => {
//     setItems([...items, { flyingFrom: "", flyingTo: "", date: "" }]);
//   };

//   const handleServiceDescriptionRemove = (index) => {
//     if (!index) {
//       const list = [...serviceItems];

//       setServiceItems(list);
//     } else {
//       const list = [...serviceItems];
//       list.splice(index, 1);
//       setServiceItems(list);
//     }
//   };

//   const handleServiceDescriptionAdd = () => {
//     setServiceItems([
//       ...serviceItems,
//       { servicesDescription: "", quantity: "", rate: "", total: "" },
//     ]);
//   };

//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_API_URL}/invoices/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setSpecificInvoice(data.data);
//       });
//   }, [id, reload]);

  
//   useEffect(() => {
//     const totalSum = specificInvoice.input_data?.reduce(
//       (sum, item) => sum + Number(item.total),
//       0
//     );

//     const totalSum2 = items.reduce((sum, item) => sum + Number(item.total), 0);

//     const serviceTotalSum = specificInvoice?.service_input_data?.reduce(
//       (sum, item) => sum + Number(item.total),
//       0
//     );

//     const serviceTotalSum2 = serviceItems.reduce(
//       (sum, item) => sum + Number(item.total),
//       0
//     );

//     const newTotalSum = isNaN(totalSum) ? 0 : totalSum;
//     const newTotalSum2 = isNaN(totalSum2) ? 0 : totalSum2;
//     const newServiceTotalSum = isNaN(serviceTotalSum) ? 0 : serviceTotalSum;
//     const newServiceTotalSum2 = isNaN(serviceTotalSum2) ? 0 : serviceTotalSum2;

//     const newGrandTotal = newTotalSum + newTotalSum2;
//     const newServiceGrandTotal = newServiceTotalSum + newServiceTotalSum2;

//     const totalGrand = parseFloat(newGrandTotal + newServiceGrandTotal).toFixed(
//       2
//     );
//     setPartsTotal(newGrandTotal);
//     setServiceTotal(newServiceGrandTotal);
//     setGrandTotal(totalGrand);
//   }, [
//     items,
//     serviceItems,
//     specificInvoice.input_data,
//     specificInvoice?.service_input_data,
//   ]);

//   // useEffect(() => {
//   //   const totalSum = specificInvoice.input_data?.reduce(
//   //     (sum, item) => sum + Number(item.total),
//   //     0
//   //   );

//   //   const totalSum2 = items.reduce((sum, item) => sum + Number(item.total), 0);

//   //   const newTotalSum = isNaN(totalSum) ? 0 : totalSum;
//   //   const newTotalSum2 = isNaN(totalSum2) ? 0 : totalSum2;

//   //   let newGrandTotal = newTotalSum + newTotalSum2;
//   //   newGrandTotal = parseFloat(newGrandTotal.toFixed(2));
//   //   setGrandTotal(newGrandTotal);
//   // }, [items, specificInvoice.input_data]);

//   const handleDescriptionChange = (index, value) => {
//     const newItems = [...specificInvoice.input_data];
//     newItems[index] = {
//       ...newItems[index],
//       description: value,
//     };
//     setSpecificInvoice((prevState) => ({
//       ...prevState,
//       input_data: newItems,
//     }));
//   };
//   const handleDescriptionChange2 = (index, value) => {
//     const newItems = [...items];

//     newItems[index].description = value;

//     setItems(newItems);
//   };

//   const handleServiceDescriptionChange = (index, value) => {
//     const newItems = [...specificInvoice.service_input_data];
//     newItems[index] = {
//       ...newItems[index],
//       description: value,
//     };
//     setSpecificInvoice((prevState) => ({
//       ...prevState,
//       service_input_data: newItems,
//     }));
//   };
//   const handleServiceDescriptionChange2 = (index, value) => {
//     const newItems = [...serviceItems];

//     newItems[index].description = value;

//     setServiceItems(newItems);
//   };


//   const handleQuantityChange = (index, value) => {
//     if (!isNaN(value)) {
//       const newItems = [...specificInvoice.input_data];
//       const roundedValue = Math.round(value);
//       newItems[index].quantity = Number(roundedValue);

//       newItems[index].total = Number(roundedValue) * newItems[index].rate;
//       newItems[index].total = Number(newItems[index].total.toFixed(2));
//       setSpecificInvoice((prevState) => ({
//         ...prevState,
//         input_data: newItems,
//       }));
//     }
//   };

//   const handleQuantityChange2 = (index, value) => {
//     const newItems = [...items];
//     const roundedValue = Math.round(value);
//     newItems[index].quantity = Number(roundedValue);

//     newItems[index].total = Number(roundedValue) * newItems[index].rate;
//     newItems[index].total = Number(newItems[index].total.toFixed(2));
//     setItems(newItems);
//   };
//   const handleServiceQuantityChange = (index, value) => {
//     if (!isNaN(value)) {
//       const newItems = [...specificInvoice.service_input_data];
//       const roundedValue = Math.round(value);
//       newItems[index].quantity = Number(roundedValue);

//       newItems[index].total = Number(roundedValue) * newItems[index].rate;
//       newItems[index].total = Number(newItems[index].total.toFixed(2));
//       setSpecificInvoice((prevState) => ({
//         ...prevState,
//         service_input_data: newItems,
//       }));
//     }
//   };

//   const handleServiceQuantityChange2 = (index, value) => {
//     const newItems = [...serviceItems];
//     const roundedValue = Math.round(value);
//     newItems[index].quantity = Number(roundedValue);

//     newItems[index].total = Number(roundedValue) * newItems[index].rate;
//     newItems[index].total = Number(newItems[index].total.toFixed(2));
//     setServiceItems(newItems);
//   };

//   const handleRateChange = (index, value) => {
//     const newItems = [...specificInvoice.input_data];
//     newItems[index].rate = Number(value).toFixed(2);
//     newItems[index].total = Number(
//       newItems[index].quantity * newItems[index].rate
//     );
//     newItems[index].total = Number(newItems[index].total.toFixed(2));
//     setSpecificInvoice((prevState) => ({
//       ...prevState,
//       input_data: newItems,
//     }));
//   };

//   const handleRateChange2 = (index, value) => {
//     const newItems = [...items];
//     newItems[index].rate = Number(value).toFixed(2);
//     newItems[index].total = Number(
//       newItems[index].quantity * newItems[index].rate
//     );
//     newItems[index].total = Number(newItems[index].total.toFixed(2));
//     setItems(newItems);
//   };
//   const handleServiceRateChange = (index, value) => {
//     const newItems = [...specificInvoice.service_input_data];
//     newItems[index].rate = Number(value).toFixed(2);
//     newItems[index].total = Number(
//       newItems[index].quantity * newItems[index].rate
//     );
//     newItems[index].total = Number(newItems[index].total.toFixed(2));
//     setSpecificInvoice((prevState) => ({
//       ...prevState,
//       service_input_data: newItems,
//     }));
//   };

//   const handleServiceRateChange2 = (index, value) => {
//     const newItems = [...serviceItems];
//     newItems[index].rate = Number(value).toFixed(2);
//     newItems[index].total = Number(
//       newItems[index].quantity * newItems[index].rate
//     );
//     newItems[index].total = Number(newItems[index].total.toFixed(2));
//     setServiceItems(newItems);
//   };


//   // const handleQuantityChange = (index, value) => {
//   //   // Ensure value is a valid number
//   //   if (!isNaN(value)) {
//   //     const newItems = [...specificInvoice.input_data];
//   //     // Round the quantity to the nearest integer
//   //     const roundedQuantity = Math.round(Number(value));
//   //     newItems[index] = {
//   //       ...newItems[index],
//   //       quantity: roundedQuantity,
//   //       total: (roundedQuantity * newItems[index].rate).toFixed(2),
//   //     };
//   //     setSpecificInvoice((prevState) => ({
//   //       ...prevState,
//   //       input_data: newItems,
//   //     }));
//   //   }
//   // };

//   // const handleQuantityChange2 = (index, value) => {
//   //   if (!isNaN(value)) {
//   //     const newItems = [...items];
//   //     const roundedValue = Math.round(value);
//   //     newItems[index].quantity = Number(roundedValue);
//   //     newItems[index].total = roundedValue * newItems[index].rate;
//   //     newItems[index].total = parseFloat(newItems[index].total.toFixed(2));
//   //     setItems(newItems);
//   //   }
//   // };

//   // const handleRateChange = (index, value) => {
//   //   if (!isNaN(value)) {
//   //     const newItems = [...specificInvoice.input_data];
//   //     newItems[index] = {
//   //       ...newItems[index],
//   //       rate: Number(value).toFixed(2),
//   //       total: (newItems[index].quantity * Number(value)).toFixed(2),
//   //     };
//   //     setSpecificInvoice((prevState) => ({
//   //       ...prevState,
//   //       input_data: newItems,
//   //     }));
//   //   }
//   // };

//   // const handleRateChange2 = (index, value) => {
//   //   if (!isNaN(value)) {
//   //     const newItems = [...items];
//   //     newItems[index].rate = parseFloat(value).toFixed(2);
//   //     newItems[index].total = newItems[index].quantity * newItems[index].rate;
//   //     newItems[index].total = parseFloat(newItems[index].total.toFixed(2));
//   //     setItems(newItems);
//   //   }
//   // };

//   const handleDiscountChange = (value) => {
//     const parsedValue = Number(value);

//     if (!isNaN(parsedValue)) {
//       setDiscount(parsedValue);
//     }
//   };

//   const handleVATChange = (value) => {
//     const parsedValue = Number(value);

//     if (!isNaN(parsedValue)) {
//       setVAT(parsedValue);
//     }
//   };

//   const handleAdvance = (value) => {
//     const parsedValue = Number(value);

//     if (!isNaN(parsedValue)) {
//       setAdvance(parsedValue);
//     }
//   };

//   // const calculateFinalTotal = () => {
//   //   const discountAsPercentage = discount;

//   //   let totalAfterDiscount;
//   //   if (grandTotal) {
//   //     totalAfterDiscount = grandTotal - discountAsPercentage;
//   //   } else {
//   //     totalAfterDiscount = specificInvoice.total_amount - discountAsPercentage;
//   //   }

//   //   const vatAsPercentage = vat / 100;
//   //   let finalTotal = totalAfterDiscount + totalAfterDiscount * vatAsPercentage;

//   //   finalTotal = parseFloat(finalTotal.toFixed(2));
//   //   return finalTotal;
//   // };


//   const calculateFinalTotal = () => {
//     let finalTotal;
//     let differenceExistAndNewGrandTotal;
//     let vatAsPercentage;
//     let discountAsPercentage;

//     let totalAfterDiscount;

//     if (grandTotal > specificInvoice.total_amount) {
//       differenceExistAndNewGrandTotal =
//         grandTotal - specificInvoice.total_amount;
//     } else if (grandTotal < specificInvoice.total_amount) {
//       differenceExistAndNewGrandTotal =
//         grandTotal - specificInvoice.total_amount;
//     } else {
//       differenceExistAndNewGrandTotal = 0;
//     }

//     if (discount > 0) {
//       discountAsPercentage = discount;
//     }
//     if (discount === 0) {
//       discountAsPercentage = 0;
//     }
//     if (discount === "") {
//       discountAsPercentage = specificInvoice.discount;
//     }

//     const differenceWithoutDiscount =
//     specificInvoice.total_amount + differenceExistAndNewGrandTotal;

//     if (discountAsPercentage === 0) {
//       totalAfterDiscount = differenceWithoutDiscount;
//     } else if (discountAsPercentage === "") {
//       totalAfterDiscount =
//         differenceWithoutDiscount - specificInvoice.discount;
//     } else {
//       totalAfterDiscount = differenceWithoutDiscount - discountAsPercentage;
//     }

//     if (vat > 0) {
//       vatAsPercentage = vat;
//     }
//     if (vat === 0) {
//       vatAsPercentage = 0;
//     }

//     if (vat === "") {
//       vatAsPercentage = specificInvoice.vat;
//     }

//     const totalAfterTax =
//       totalAfterDiscount + totalAfterDiscount * (vatAsPercentage / 100);

//     finalTotal = parseFloat(totalAfterTax).toFixed(2);

//     return finalTotal;
//   };

//   const calculateDue = () => {
//     if (advance && advance !== 0) {
//       const due = calculateFinalTotal() - advance;
//       return due;
//     } else {
//       const due = calculateFinalTotal() - specificInvoice.advance;
//       return due;
//     }
//   };

//   const handleRemoveButton = (i) => {
//     if (!specificInvoice.Id) {
//       return toast.error("Unauthorized");
//     }
//     axios
//       .put(`${import.meta.env.VITE_API_URL}/invoice/${id}`, { index: i })
//       .then((response) => {
//         if (response.data.message === "Deleted successful") {
//           setReload(!reload);
//         }
//       })
//       .catch((error) => {});
//   };

//   const input_data = [
//     ...(specificInvoice?.input_data || []),
//     ...items
//       .filter((item) => item.total !== undefined && item.total !== "")
//       .map((item) => ({
//         description: item.description,
//         quantity: item.quantity,
//         rate: item.rate,
//         total: item.total,
//       })),
//   ];
//   const service_input_data = [
//     ...(specificInvoice?.service_input_data || []),
//     ...serviceItems
//       .filter((item) => item.total !== undefined && item.total !== "")
//       .map((item) => ({
//         description: item.description,
//         quantity: item.quantity,
//         rate: item.rate,
//         total: item.total,
//       })),
//   ];

//   const onSubmit = async (data) => {
//     setRemoveButton("");
//     try {
//       const values = {
//         parts_total: partsTotal || specificInvoice.parts_total,
//         service_total: serviceTotal || specificInvoice.serviceTotal,
//         total_amount: grandTotal || specificInvoice?.total_amount,
//         discount: discount || specificInvoice?.discount,
//         vat: vat || specificInvoice?.vat,
//         net_total: calculateFinalTotal() || specificInvoice.net_total,
//         advance: advance || specificInvoice.advance,
//         due: calculateDue() || specificInvoice.due,
//         input_data: input_data,
//         service_input_data: service_input_data,
//       };

//       const newValue = {
//         id: id,
//         data: values,
//       };

//       if (removeButton === "") {
//         const res = await updateInvoice(newValue).unwrap();
//         if (res.success) {
//           toast.success(res.message);
//           setReload(!reload);
//           // navigate("/dashboard/quotation-list");
//         }
//       }

//       if (removeButton === "remove") {
//         handleRemoveButton();
//       }
//     } catch (error) {
//       if (error.response) {
//         setError(error.response.data.message);
//       }
//     }
//   };

//   // const onSubmit = async (data) => {
//   //   if (!specificInvoice.Id) {
//   //     return toast.error("Unauthorized");
//   //   }
//   //   setRemoveButton("");
//   //   try {
//   //     const values = {
//   //       username: specificInvoice.username || data.username,
//   //       Id: data.customerId || specificInvoice.Id,
//   //       job_no: data.job_no || specificInvoice.job_no,
//   //       date: specificInvoice.date,

//   //       company_name: data.company_name || specificInvoice.company_name,
//   //       customer_name: data.customer_name || specificInvoice.customer_name,
//   //       customer_contact:
//   //         data.customer_contact || specificInvoice.customer_contact,
//   //       customer_address:
//   //         data.customer_address || specificInvoice.customer_address,

//   //       car_registration_no:
//   //         data.car_registration_no || specificInvoice.car_registration_no,
//   //       chassis_no: data.chassis_no || specificInvoice.chassis_no,
//   //       engine_no: data.engine_no || specificInvoice.engine_no,
//   //       vehicle_name: data.vehicle_name || specificInvoice.vehicle_name,
//   //       mileage: data.mileage || specificInvoice.mileage,

//   //       total_amount: grandTotal || specificInvoice?.total_amount,
//   //       discount: discount || specificInvoice?.discount,

//   //       vat: vat || specificInvoice?.vat,
//   //       advance: advance || specificInvoice.advance,
//   //       due: calculateDue() || specificInvoice.due,

//   //       net_total: calculateFinalTotal(),
//   //       input_data: input_data,
//   //     };

//   //     if (removeButton === "") {
//   //       const response = await axios.put(
//   //         `${import.meta.env.VITE_API_URL}/invoice/one/${id}`,
//   //         values
//   //       );

//   //       if (response.data.message === "Successfully update card.") {
//   //         setError("");
//   //         navigate("/dashboard/invoice-view");
//   //       }
//   //     }
//   //     if (removeButton === "remove") {
//   //       handleRemoveButton();
//   //     }
//   //   } catch (error) {
//   //     if (error.response) {
//   //       setError(error.response.data.message);
//   //     }
//   //   }
//   // };
//   const handleOnSubmit = () => {
//     handleSubmit(onSubmit)();
//   };
//   return (
//     <div className="px-5 py-10">
//       <div className="flex md:flex-row flex-col items-center justify-between w-full mt-5 mb-2 border-b-2 border-[#42A1DA]">
//         <img
//           src={logo}
//           alt="logo"
//           className="md:block hidden w-[70px] md:w-[210px]"
//         />
//         <div>
//           <h2 className=" trustAutoTitle trustAutoTitleQutation">
//             Softypy Garage{" "}
//           </h2>
//           <span className="mt-5 block text-center">
//             Office: Ka-93/4/C, Kuril Bishawroad, Dhaka-1229
//           </span>
//         </div>
//         <TrustAutoAddress />
//       </div>
//       <div className="flex flex-col md:flex-row justify-between items-center">
//         <div className="hidden"></div>
//         <div className="vehicleCard">Update Invoice </div>

//         <div>
//           <TADatePickers />
//         </div>
//       </div>

//       <div className="mt-5">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-10 jobCardFieldWraps">
//             <div className="jobCardFieldLeftSide">
//               <h3 className="text-xl lg:text-3xl  font-bold">Customer Info</h3>
//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   label="Serial No"
//                   {...register("job_no")}
//                   value={specificInvoice?.job_no}
//                   focused={specificInvoice?.job_no}
//                 />
//               </div>
//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   label="Customer Id"
//                   {...register("customerId")}
//                   value={specificInvoice?.Id}
//                   focused={specificInvoice?.Id}
//                   required
//                 />
//               </div>

//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   label="Company"
//                   value={specificInvoice?.company_name}
//                   focused={specificInvoice?.company_name}
//                   {...register("company_name")}
//                 />
//               </div>
//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   label="Customer"
//                   value={specificInvoice?.customer_name}
//                   focused={specificInvoice?.customer_name}
//                   {...register("customer_name")}
//                 />
//               </div>
//               {/* <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   label="Phone"
//                   value={specificInvoice?.customer_contact}
//                   focused={specificInvoice?.customer_contact}
//                   {...register("customer_contact")}
//                 />
//               </div> */}
//               <div className="flex items-center mt-3 ">
//                 <Autocomplete
//                   className="jobCardSelect2"
//                   freeSolo
//                   options={countries}
//                   getOptionLabel={(option) => option.label}
//                   value={countryCode}
//                   onChange={(event, newValue) => {
//                     setCountryCode(newValue);
//                     setPhoneNumber(""); // Reset the phone number when changing country codes
//                   }}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Select Country Code"
//                       variant="outlined"
//                     />
//                   )}
//                 />
//                 <TextField
//                   className="carRegField"
//                   label="Phone"
//                   value={specificInvoice?.customer_contact}
//                   {...register("customer_contact")}
//                   onChange={(e) => {
//                     const inputValue = e.target.value;
//                     if (inputValue.length <= 11) {
//                       setSpecificInvoice({
//                         ...specificInvoice,
//                         customer_contact: inputValue,
//                       });
//                     }
//                   }}
//                   InputLabelProps={{
//                     shrink: !!specificInvoice.customer_contact,
//                   }}
//                 />
//               </div>
//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   label="Address"
//                   value={specificInvoice?.customer_address}
//                   focused={specificInvoice?.customer_address}
//                   {...register("customer_address")}
//                 />
//               </div>
//             </div>

//             <div className="mt-3 lg:mt-0 jobCardFieldRightSide">
//               <h3 className="text-xl lg:text-3xl font-bold">Vehicle Info</h3>
//               <div className="flex mt-3  md:gap-0 gap-4 items-center">
//                 <Autocomplete
//                   sx={{ marginRight: "5px" }}
//                   freeSolo
//                   className="jobCardSelect2 "
//                   id="free-solo-demo"
//                   options={cmDmOptions.map((option) => option.label)}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Vehicle Reg No ( New field ) "
//                       {...register("carReg_no")}
//                     />
//                   )}
//                 />

//                 <TextField
//                   className="carRegField"
//                   label="Car R (N)"
//                   {...register("car_registration_no", {
//                     pattern: {
//                       value: /^[\d-]+$/,
//                       message: "Only numbers and hyphens are allowed",
//                     },
//                     minLength: {
//                       value: 7,
//                       message:
//                         "Car registration number must be exactly 6 digits",
//                     },
//                     maxLength: {
//                       value: 7,
//                       message:
//                         "Car registration number must be exactly 6 digits",
//                     },
//                   })}
//                   value={specificInvoice?.car_registration_no}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     if (value.length === 7) {
//                       setRegistrationError("");
//                     } else if (value.length < 7) {
//                       setRegistrationError(
//                         "Car registration number must be 7 characters"
//                       );
//                     }
//                     const formattedValue = value
//                       .replace(/\D/g, "")
//                       .slice(0, 6)
//                       .replace(/(\d{2})(\d{1,4})/, "$1-$2");
//                     setSpecificInvoice({
//                       ...specificInvoice,
//                       car_registration_no: formattedValue,
//                     });
//                   }}
//                   InputLabelProps={{
//                     shrink: !!specificInvoice?.car_registration_no,
//                   }}
//                   error={!!errors.car_registration_no || !!registrationError}
//                 />
//               </div>

//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   label="Chassis No"
//                   value={specificInvoice?.chassis_no}
//                   focused={specificInvoice?.chassis_no}
//                   {...register("chassis_no")}
//                 />
//               </div>
//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   label="Engine & CC"
//                   value={specificInvoice?.engine_no}
//                   focused={specificInvoice?.engine_no}
//                   {...register("engine_no")}
//                 />
//               </div>
//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   label="Vehicle Name"
//                   value={specificInvoice?.vehicle_name}
//                   focused={specificInvoice?.vehicle_name}
//                   {...register("vehicle_name")}
//                 />
//               </div>
//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   label="Mileage"
//                   value={specificInvoice?.mileage}
//                   focused={specificInvoice?.mileage}
//                   {...register("mileage")}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center justify-around labelWrap">
//             <label>SL No </label>
//             <label> Parts description </label>
//             <label>Qty </label>
//             <label>Rate</label>
//             <label>Amount </label>
//           </div>
//           <div>
//             {specificInvoice?.input_data?.length > 0 && (
//               <>
//                 {specificInvoice?.input_data?.map((item, i) => {
//                   return (
//                     <div key={i}>
//                       <div className="qutationForm">
//                         <div onClick={() => setRemoveButton("remove")}>
//                           {items.length !== 0 && (
//                             <button
//                               onClick={() => handleRemoveButton(i)}
//                               className="  bg-[#42A1DA] hover:bg-[#42A1DA] text-white rounded-md px-2 py-2"
//                             >
//                               Remove
//                             </button>
//                           )}
//                         </div>
//                         <div>
//                           <input
//                             className="firstInputField"
//                             autoComplete="off"
//                             type="text"
//                             placeholder="SL No "
//                             defaultValue={`${i + 1 < 10 ? `0${i + 1}` : i + 1}`}
//                             required
//                           />
//                         </div>
//                         <div>
//                           <input
//                             className="secondInputField"
//                             autoComplete="off"
//                             type="text"
//                             placeholder="Description"
//                             onChange={(e) =>
//                               handleDescriptionChange(
//                                 i,
//                                 e.target.value || item.description
//                               )
//                             }
//                             defaultValue={item.description}
//                             required
//                           />
//                         </div>
//                         <div>
//                           <input
//                             className="firstInputField"
//                             autoComplete="off"
//                             type="number"
//                             placeholder="Qty"
//                             onChange={(e) =>
//                               handleQuantityChange(i, e.target.value)
//                             }
//                             required
//                             defaultValue={item.quantity}
//                           />
//                         </div>
//                         <div>
//                           <input
//                             className="thirdInputField"
//                             autoComplete="off"
//                             type="number"
//                             placeholder="Rate"
//                             onChange={(e) =>
//                               handleRateChange(i, e.target.value)
//                             }
//                             required
//                             defaultValue={item.rate}
//                           />
//                         </div>
//                         <div>
//                           <input
//                             className="thirdInputField"
//                             autoComplete="off"
//                             type="text"
//                             placeholder="Amount"
//                             value={item.total}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </>
//             )}
//           </div>
//           <div>
//             {!addButton && (
//               <button
//                 onClick={() => setAddButton(!addButton)}
//                 className="bg-[#42A1DA] hover:bg-[#42A1DA] text-white rounded-md px-2 py-2 mb-2"
//               >
//                 Add new
//               </button>
//             )}
//             {addButton && (
//               <button
//                 onClick={() => setAddButton(!addButton)}
//                 className="border border-[#42A1DA] hover:border-[#42A1DA] text-black rounded-md px-2 py-2 mb-2"
//               >
//                 Cancel
//               </button>
//             )}
//             {addButton && (
//               <>
//                 {serviceItems.map((item, i) => {
//                   return (
//                     <div key={i}>
//                       <div className="qutationForm">
//                         <div>
//                           {serviceItems.length !== 0 && (
//                             <button
//                               onClick={() => handleServiceDescriptionRemove(i)}
//                               className="  bg-[#42A1DA] hover:bg-[#42A1DA] text-white rounded-md px-2 py-2"
//                             >
//                               Remove
//                             </button>
//                           )}
//                         </div>
//                         <div>
//                           <input
//                             className="firstInputField"
//                             autoComplete="off"
//                             type="text"
//                             placeholder="SL No "
//                             defaultValue={`${i + 1 < 10 ? `0${i + 1}` : i + 1}`}
//                             required
//                           />
//                         </div>
//                         <div>
//                           <input
//                             className="secondInputField"
//                             autoComplete="off"
//                             type="text"
//                             placeholder="Description"
//                             onChange={(e) =>
//                               handleDescriptionChange2(i, e.target.value)
//                             }
//                             required
//                           />
//                         </div>
//                         <div>
//                           <input
//                             className="firstInputField"
//                             autoComplete="off"
//                             type="number"
//                             placeholder="Qty"
//                             onChange={(e) =>
//                               handleQuantityChange2(i, e.target.value)
//                             }
//                             required
//                           />
//                         </div>
//                         <div>
//                           <input
//                             className="thirdInputField"
//                             autoComplete="off"
//                             type="number"
//                             placeholder="Rate"
//                             onChange={(e) =>
//                               handleRateChange2(i, e.target.value)
//                             }
//                             required
//                           />
//                         </div>
//                         <div>
//                           <input
//                             className="thirdInputField"
//                             autoComplete="off"
//                             type="text"
//                             placeholder="Amount"
//                             value={item.total}
//                             readOnly
//                           />
//                         </div>
//                       </div>

//                       <div className="addInvoiceItem">
//                         {serviceItems.length - 1 === i && (
//                           <div
//                             onClick={handleServiceDescriptionAdd}
//                             className="flex justify-end mt-2"
//                           >
//                             <button className="bg-[#42A1DA] hover:bg-[#42A1DA] text-white rounded-md px-2 py-2">
//                               Add
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </>
//             )}
//           </div>

//           <div className="flex items-center justify-around labelWrap">
//             <label>SL No </label>
//             <label> Service description </label>
//             <label>Qty </label>
//             <label>Rate</label>
//             <label>Amount </label>
//           </div>

//           <div>
//             {specificInvoice?.service_input_data?.length > 0 && (
//               <>
//                 {specificInvoice?.service_input_data?.map((item, i) => {
//                   return (
//                     <div key={i}>
//                       <div className="qutationForm">
//                         <div onClick={() => setRemoveButton("remove")}>
//                           {items.length !== 0 && (
//                             <button
//                               onClick={() => handleRemoveButton(i)}
//                               className="  bg-[#42A1DA] hover:bg-[#42A1DA] text-white rounded-md px-2 py-2"
//                             >
//                               Remove
//                             </button>
//                           )}
//                         </div>
//                         <div>
//                           <input
//                             className="firstInputField"
//                             autoComplete="off"
//                             type="text"
//                             placeholder="SL No "
//                             defaultValue={`${i + 1 < 10 ? `0${i + 1}` : i + 1}`}
//                             required
//                           />
//                         </div>
//                         <div>
//                           <input
//                             className="secondInputField"
//                             autoComplete="off"
//                             type="text"
//                             placeholder="Description"
//                             onChange={(e) =>
//                               handleServiceDescriptionChange(
//                                 i,
//                                 e.target.value  
//                               )
//                             }
//                             defaultValue={item.description}
//                             required
//                           />
//                         </div>
//                         <div>
//                           <input
//                             className="firstInputField"
//                             autoComplete="off"
//                             type="number"
//                             placeholder="Qty"
//                             onChange={(e) =>
//                               handleServiceQuantityChange(i, e.target.value)
//                             }
//                             required
//                             defaultValue={item.quantity}
//                           />
//                         </div>
//                         <div>
//                           <input
//                             className="thirdInputField"
//                             autoComplete="off"
//                             type="number"
//                             placeholder="Rate"
//                             onChange={(e) =>
//                               handleServiceRateChange(i, e.target.value)
//                             }
//                             required
//                             defaultValue={item.rate}
//                           />
//                         </div>
//                         <div>
//                           <input
//                             className="thirdInputField"
//                             autoComplete="off"
//                             type="text"
//                             placeholder="Amount"
//                             value={item.total}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </>
//             )}
//           </div>
//         </form>
//         <div>
//           {!addButton && (
//             <button
//               onClick={() => setAddButton(!addButton)}
//               className="bg-[#42A1DA] hover:bg-[#42A1DA] text-white rounded-md px-2 py-2 mb-2"
//             >
//               Add new
//             </button>
//           )}
//           {addButton && (
//             <button
//               onClick={() => setAddButton(!addButton)}
//               className="border border-[#42A1DA] hover:border-[#42A1DA] text-black rounded-md px-2 py-2 mb-2"
//             >
//               Cancel
//             </button>
//           )}
//           {addButton && (
//             <>
//               {items.map((item, i) => {
//                 return (
//                   <div key={i}>
//                     <div className="qutationForm">
//                       <div>
//                         {items.length !== 0 && (
//                           <button
//                             onClick={() => handleRemove(i)}
//                             className="  bg-[#42A1DA] hover:bg-[#42A1DA] text-white rounded-md px-2 py-2"
//                           >
//                             Remove
//                           </button>
//                         )}
//                       </div>
//                       <div>
//                         <input
//                           className="firstInputField"
//                           autoComplete="off"
//                           type="text"
//                           placeholder="SL No "
//                           defaultValue={`${i + 1 < 10 ? `0${i + 1}` : i + 1}`}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <input
//                           className="secondInputField"
//                           autoComplete="off"
//                           type="text"
//                           placeholder="Parts Description"
//                           onChange={(e) =>
//                             handleServiceDescriptionChange2(i, e.target.value)
//                           }
//                           required
//                         />
//                       </div>
//                       <div>
//                         <input
//                           className="firstInputField"
//                           autoComplete="off"
//                           type="number"
//                           placeholder="Qty"
//                           onChange={(e) =>
//                             handleServiceQuantityChange2(i, e.target.value)
//                           }
//                           required
//                         />
//                       </div>
//                       <div>
//                         <input
//                           className="thirdInputField"
//                           autoComplete="off"
//                           type="number"
//                           placeholder="Rate"
//                           onChange={(e) => handleServiceRateChange2(i, e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <input
//                           className="thirdInputField"
//                           autoComplete="off"
//                           type="text"
//                           placeholder="Amount"
//                           value={item.total}
//                           readOnly
//                         />
//                       </div>
//                     </div>

//                     <div className="addInvoiceItem">
//                       {items.length - 1 === i && (
//                         <div
//                           onClick={handleAddClick}
//                           className="flex justify-end mt-2"
//                         >
//                           <button className="bg-[#42A1DA] hover:bg-[#42A1DA] text-white rounded-md px-2 py-2">
//                             Add
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </>
//           )}
//         </div>

//         <div className="discountFieldWrap">
//           <div className="flex items-center">
//             <b className="mr-2"> Total Amount: </b>
//             <span>
//               {grandTotal ? grandTotal : specificInvoice.total_amount}
//             </span>
//           </div>
//           <div>
//             <b className="mr-2"> Discount: </b>
//             <input
//               className="py-1 text-center"
//               onChange={(e) => handleDiscountChange(e.target.value)}
//               autoComplete="off"
//               type="text"
//               placeholder="Discount"
//               defaultValue={specificInvoice.discount}
//             />
//           </div>
//           <div>
//             <b className="mr-2">Vat: </b>
//             <input
//               className="text-center"
//               onChange={(e) => handleVATChange(e.target.value)}
//               autoComplete="off"
//               type="text"
//               placeholder="Vat"
//               defaultValue={specificInvoice.vat}
//             />
//           </div>
//           <div className="flex items-center ">
//             <b className="mr-3">Final Total: </b>
//             <span>
//               {calculateFinalTotal()
//                 ? calculateFinalTotal()
//                 : specificInvoice.net_total}
//             </span>
//             {/* <b>Net Total: </b> */}
//           </div>
         
//         </div>
//         <div className="mb-12 flex justify-center ">
//           <Button
//             sx={{ background: "#42A1DA" }}
//             onClick={handleOnSubmit}
//             className="addJobBtn"
//           >
//             Update Invoice{" "}
//           </Button>
//         </div>

//         {error && <div className="pt-6 text-center text-red-400">{error}</div>}
//       </div>
//     </div>
//   );
// };

// export default UpdateInvoice;




/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-dupe-else-if */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";
import logo from "../../../../public/assets/logo.png";
import { useReactToPrint } from "react-to-print";
import { usePDF } from "react-to-pdf";
import { Link, useLocation } from "react-router-dom";
import "./Invoice.css";
import { formatDate } from "../../../utils/formateDate";
import { Divider } from "@mui/material";

const Detail = () => {
  const componentRef = useRef();
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [invoicePreview, setInvoicePreview] = useState({});


  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`${import.meta.env.VITE_API_URL}/invoice/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setInvoicePreview(data);
          setLoading(false);
        });
    }
  }, [id]);

  const [totalPages, setTotalPages] = useState(1);
  const [pagesData, setPagesData] = useState([]);

  const calculateItemsPerPage = (pageNumber) => {
    const itemHeight = 50;
    const pageHeight = 1800;
    const marginHeight = 50;
    const headerHeight = 100;
    const footerHeight = 100;

    const availableHeight =
      pageHeight - marginHeight - headerHeight - footerHeight;

    if (pageNumber !== undefined && pageNumber === 1) {
      return 28;
    }

    return Math.floor(availableHeight / itemHeight);
  };

  useEffect(() => {
    // const itemsPerPage = calculateItemsPerPage();
    const totalPagesCount = Math.ceil(invoicePreview?.input_data?.length / 28);
    setTotalPages(totalPagesCount || 1);
  }, [invoicePreview?.input_data]);

  useEffect(() => {
    const allPagesData = [];
    let startIndex = 0;

    for (let i = 1; i <= totalPages; i++) {
      const itemsPerPage = calculateItemsPerPage(i);
      const endIndex = startIndex + itemsPerPage;
      const pageData = invoicePreview?.input_data?.slice(startIndex, endIndex);
      allPagesData.push(pageData);
      startIndex = endIndex;
    }

    setPagesData(allPagesData);
  }, [totalPages, invoicePreview?.input_data]);

  const amountInWords = (amount) => {
    const numberWords = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    const tensWords = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const convertLessThanOneThousand = (num) => {
      if (num === 0) {
        return "";
      }

      let result = "";

      if (num >= 100) {
        result += numberWords[Math.floor(num / 100)] + " Hundred ";
        num %= 100;
      }

      if (num >= 20) {
        result += tensWords[Math.floor(num / 10)] + " ";
        num %= 10;
      }

      if (num > 0) {
        result += numberWords[num] + " ";
      }

      return result;
    };

    const convert = (num) => {
      if (num === 0) {
        return "Zero";
      }

      let result = "";

      let integerPart = Math.floor(num);
      const decimalPart = Math.round((num - integerPart) * 100);

      if (integerPart >= 10000000) {
        result +=
          convertLessThanOneThousand(Math.floor(integerPart / 10000000)) +
          "Crore ";
        integerPart %= 10000000;
      }

      if (integerPart >= 100000) {
        result +=
          convertLessThanOneThousand(Math.floor(integerPart / 100000)) +
          "Lakh ";
        integerPart %= 100000;
      }

      if (integerPart >= 1000) {
        result +=
          convertLessThanOneThousand(Math.floor(integerPart / 1000)) +
          "Thousand ";
        integerPart %= 1000;
      }

      result += convertLessThanOneThousand(integerPart);

      if (decimalPart > 0) {
        result +=
          "Taka " +
          " " +
          "and" +
          " " +
          convertLessThanOneThousand(decimalPart) +
          "Paisa ";
      } else {
        result += "Taka";
      }

      return result;
    };

    const takaInWords = convert(amount);
    return `${takaInWords} only`;
  };

  const totalAmountInWords = amountInWords(invoicePreview?.due);

  return (
    <div ref={componentRef} className="h-screen">
      {pagesData.map((pageData, pageNumber) => (
        <main ref={targetRef} className="invoicePrintWrap" key={pageNumber}>
          <div>
            <div className="pb-5 px-14 invoicePrint">
              <div>
                <div className=" mb-2 mx-auto text-center border-b-2 border-[#351E98] pb-2">
                  <div className="flex items-center justify-between w-full mt-5 mb-2">
                    <img className="w-[120px] " src={logo} alt="logo" />
                    <div>
                      <h2 className="trustAutoTitle qoutationTitle">
                        Softypy Garage{" "}
                      </h2>
                      <small className="block">
                        Office: Ka-93/4/C, Kuril Bishawroad, Dhaka-1229
                      </small>
                    </div>
                    <div className="text-left">
                      <small className="block">
                        <small className="font-bold">Mobile:</small> +880
                        1821-216465
                      </small>
                      <small className="block">
                        <small className="font-bold">Email:</small>{" "}
                        trustautosolution@gmail.com
                      </small>
                      <small className="block font-bold ">
                        www.trustautosolution.com
                      </small>
                    </div>
                  </div>
                </div>

                <div className="px-10">
                  <div className="flex text-[12px] items-center justify-between border-b-2 pb-1 border-[#351E98]">
                    <span className="w-[200px]">
                      {" "}
                      <b>Customer ID: </b>
                      {invoicePreview?.Id}
                    </span>
                    <b className="mr-[88px] uppercase">Invoice</b>
                    <b>Date: {formatDate(invoicePreview?.createdAt)}</b>
                  </div>

                  {pageNumber === 0 && (
                    <div className="flex items-center justify-between mx-auto mt-2 ">
                      <div className="flex justify-between w-[280px] overflow-hidden ">
                        <div className="invoiceCustomerInfo">
                          <b>Invoice No</b>
                          <b>Company</b>
                          <b>Customer</b>
                          <b>Phone</b>
                          <b>Address</b>
                        </div>
                        <div className="invoiceCustomerInfo">
                          <small>
                            : {invoicePreview?.job_no}55555555555555
                          </small>
                          <small>: {invoicePreview?.company_name}</small>
                          <small>: {invoicePreview?.customer_name}</small>
                          <small>: {invoicePreview?.customer_contact}</small>
                          <small>
                            : {invoicePreview?.customer_address}5555555555555
                          </small>
                        </div>
                      </div>
                      <div className="invoiceLine"></div>
                      <div className="flex w-[280px] overflow-hidden  justify-between ">
                        <div className="invoiceCustomerInfo">
                          <b>Registration No </b>
                          <b>Chassis No </b>
                          <b>Engine & CC </b>
                          <b>Vehicle Name </b>
                          <b>Mileage </b>
                        </div>
                        <div className="invoiceCustomerInfo">
                          <small>: {invoicePreview?.car_registration_no}</small>
                          <small>: {invoicePreview?.chassis_no}</small>
                          <small>: {invoicePreview?.engine_no}</small>
                          <small>: {invoicePreview?.vehicle_name}</small>
                          <small>
                            : {invoicePreview?.mileage}5555555555555
                          </small>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <table className="mt-5 invoiceTable2 qutationTables pt-10">
                  <thead className="tableWrap">
                    <tr>
                      <th className="serialNo">SL No</th>
                      <th>Parts description</th>
                      <th>Qty </th>
                      <th>Rate</th>
                      <th>Amount </th>
                    </tr>
                  </thead>
                  <tbody>
                    <>
                      {pageData?.map((data, index) => (
                        <tr key={data?._id}>
                          <td>
                            {pageNumber === 0 && index + 1}
                            {pageNumber === 1 && 28 + index + 1}
                            {pageNumber === 2 && pageNumber * 30 + index}
                            {pageNumber === 3 && pageNumber * 30 + index + 1}
                            {pageNumber === 4 && pageNumber * 30 + index + 2}
                            {pageNumber === 5 && pageNumber * 30 + index + 3}
                            {pageNumber === 6 && pageNumber * 30 + index + 4}
                          </td>
                          <td>{data?.description}</td>
                          <td>{data?.quantity}</td>
                          <td>{data?.rate}</td>
                          <td>{data?.total}</td>
                        </tr>
                      ))}
                    </>
                  </tbody>
                </table>
                <div className="flex items-center justify-end text-[12px] mt-2">
                  <span>Total Amount :</span>
                  <b className="ml-3 ">৳ 5456765</b>
                </div>
                <table className="mt-5 invoiceTable2 qutationTables pt-10">
                  <thead className="tableWrap">
                    <tr>
                      <th className="serialNo">SL No</th>
                      <th>Service description</th>
                      <th>Qty </th>
                      <th>Rate</th>
                      <th>Amount </th>
                    </tr>
                  </thead>
                  <tbody>
                    <>
                      {pageData?.map((data, index) => (
                        <tr key={data?._id}>
                          <td>
                            {pageNumber === 0 && index + 1}
                            {pageNumber === 1 && 28 + index + 1}
                            {pageNumber === 2 && pageNumber * 30 + index}
                            {pageNumber === 3 && pageNumber * 30 + index + 1}
                            {pageNumber === 4 && pageNumber * 30 + index + 2}
                            {pageNumber === 5 && pageNumber * 30 + index + 3}
                            {pageNumber === 6 && pageNumber * 30 + index + 4}
                          </td>
                          <td>{data?.description}</td>
                          <td>{data?.quantity}</td>
                          <td>{data?.rate}</td>
                          <td>{data?.total}</td>
                        </tr>
                      ))}
                    </>
                  </tbody>
                </table>
                <div className="flex items-center justify-end text-[12px] mt-2">
                  <span>Total Amount :</span>
                  <b className="ml-3 ">৳ 5456765</b>
                </div>
                <table className="mt-5 invoiceTable2 qutationTables pt-10">
                  <thead className="tableWrap">
                    <tr>
                      <th colSpan={3}>Summary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <>
                      {pageData?.map((data, index) => (
                        <>
                          <tr rowSpan={2} key={data?._id}>
                            <td >Total parts amount </td>

                            <td className="specificWidth">87654356</td>
                          </tr>
                          <tr rowSpan={3} key={data?._id}>
                            <td >Total parts amount </td>

                            <td className="specificWidth">87654356</td>
                          </tr>
                         
                        </>
                      ))}
                    </>
                  </tbody>
                </table>

                {/* <div className="flex  justify-end ">
                  <Divider sx={{ width: "200px", marginTop: "5px" }} />
                </div> */}
                {pageNumber === pagesData?.length - 1 && (
                  <div className="flex justify-between items-end mt-5 border-b-[1px] pb-3 border-[#ddd]">
                    <div className="mt-5 text-[12px] invisible">
                      <b className="">In words:</b> {totalAmountInWords}
                    </div>
                    <div className="flex netTotalAmounts">
                      <div className="">
                        <b> Sub Total </b>
                        <b> Discount </b>
                        <b> VAT </b>
                        <b> Net Total </b>
                        <b> Advance</b>
                        <b> Due </b>
                      </div>
                      <div>
                        <small> : ৳{invoicePreview?.total_amount}</small>
                        <small> : {invoicePreview?.discount}</small>
                        <small> : {invoicePreview?.vat}%</small>
                        <small> : ৳{invoicePreview?.net_total}</small>
                        <small> : ৳{invoicePreview?.advance}</small>
                        <small> : ৳{invoicePreview?.due}</small>
                      </div>
                    </div>
                  </div>
                )}
                {pageNumber === pagesData?.length - 1 && (
                  <div className="mt-1 text-[12px]">
                    <b className="">In words:</b> {totalAmountInWords}
                  </div>
                )}
              </div>

              {/* {pageNumber === pagesData?.length - 1 && (
                <div>
                  <div className="customerSignatureWrap pt-5">
                    <b className="text-sm customerSignatur">
                      Customer Signature :{" "}
                    </b>
                    <b className="text-sm customerSignatur">
                      Softypy Garage
                    </b>
                  </div>
                </div>
              )} */}
            </div>
          </div>

          {pageNumber === pagesData.length - 1 && (
            <div className="printInvoiceBtnGroup">
              <button onClick={handlePrint}>Print </button>
              {/* <button onClick={() => toPDF()}>Pdf </button> */}

              <Link to={`/dashboard/update-invoice?id=${id}`}>
                <button> Edit </button>
              </Link>

              <Link to="/dashboard/qutation">
                {" "}
                <button> Qutation </button>
              </Link>
            </div>
          )}
        </main>
      ))}
    </div>
  );
};

export default Detail;
