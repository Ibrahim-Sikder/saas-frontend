// /* eslint-disable react/prop-types */
// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable no-unused-vars */
// "use client";

// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import "react-circular-progressbar/dist/styles.css";
// import "./Employee.css";
// import { useGetAllEmployeesQuery } from "../../../redux/api/employee";
// import {
//   useCreateSalaryMutation,
//   useGetSingleSalaryQuery,
//   useUpateSalaryMutation,
// } from "../../../redux/api/salary";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   Container,
//   FormControl,
//   Grid,
//   InputAdornment,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import {
//   CalendarMonth,
//   CheckCircle,
//   MonetizationOn,
//   Person,
//   Save,
//   TimerOutlined,
//   Warning,
// } from "@mui/icons-material";
// import { allMonths } from "../../../utils/month";
// import { useLocation } from "react-router-dom";

// // Constants
// const years = [{ value: "Select Year", label: "Select Year" }];
// for (let year = 2024; year <= 2030; year++) {
//   years.push({ value: String(year), label: String(year) });
// }

// const initialSelectedOption = allMonths[new Date().getMonth()];
// const currentYear = new Date().getFullYear().toString();

// const EmployeeSalaryForm = () => {
//   const theme = useTheme();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filterType, setFilterType] = useState(initialSelectedOption);
//   const limit = 100;
//   const location = useLocation();
//   const id = new URLSearchParams(location.search).get("id");

//   // Queries and mutations
//   const { data: getAllEmployee, isLoading: employeesLoading } =
//     useGetAllEmployeesQuery({
//       limit,
//       page: currentPage,
//     });

//   const { data: singleSalary } = useGetSingleSalaryQuery(id);
//   console.log(singleSalary);
//   const [createSalary, { isLoading: createLoading, error: createError }] =
//     useCreateSalaryMutation();

//   const [updateSalary] = useUpateSalaryMutation();

//   // State for form fields
//   const [selectedOption, setSelectedOption] = useState([]);
//   const [selectedYear, setSelectedYear] = useState([]);
//   const [bonus, setBonus] = useState([]);
//   const [overtimeAmount, setOvertimeAmount] = useState([]);
//   const [salaryAmount, setSalaryAmount] = useState([]);
//   const [previousDue, setPreviousDue] = useState([]);
//   const [salaryCut, setSalaryCut] = useState([]);
//   const [totalPayment, setTotalPayment] = useState([]);
//   const [advance, setAdvance] = useState([]);
//   const [pay, setPay] = useState([]);
//   const [due, setDue] = useState([]);
//   const [paid, setPaid] = useState([]);

//   // Initialize arrays when employee data is loaded
//   useEffect(() => {
//     if (getAllEmployee?.data?.employees) {
//       const employeeCount = getAllEmployee.data.employees.length;
//       setSelectedOption(new Array(employeeCount).fill(initialSelectedOption));
//       setSelectedYear(new Array(employeeCount).fill(currentYear));
//       setBonus(new Array(employeeCount).fill(0));
//       setOvertimeAmount(new Array(employeeCount).fill(0));
//       setSalaryAmount(new Array(employeeCount).fill(0));
//       setPreviousDue(new Array(employeeCount).fill(0));
//       setSalaryCut(new Array(employeeCount).fill(0));
//       setTotalPayment(new Array(employeeCount).fill(0));
//       setAdvance(new Array(employeeCount).fill(0));
//       setPay(new Array(employeeCount).fill(0));
//       setDue(new Array(employeeCount).fill(0));
//       setPaid(new Array(employeeCount).fill(false));
//     }
//   }, [getAllEmployee?.data?.employees]);

//   // Handlers for form fields
//   const handleChange = (index, value) => {
//     const newMonth = [...selectedOption];
//     newMonth[index] = value;
//     setSelectedOption(newMonth);
//   };

//   const handleYearChange = (index, value) => {
//     const newYear = [...selectedYear];
//     newYear[index] = value;
//     setSelectedYear(newYear);
//   };

//   const handleBonus = (index, value) => {
//     const newBonus = [...bonus];
//     newBonus[index] = Number.parseInt(value) || 0;
//     setBonus(newBonus);
//     updateTotalPayment(
//       index,
//       newBonus[index],
//       overtimeAmount[index],
//       salaryAmount[index],
//       previousDue[index],
//       salaryCut[index]
//     );
//   };

//   const handleOvertimeAmount = (index, value) => {
//     const newOvertimeAmount = [...overtimeAmount];
//     newOvertimeAmount[index] = Number.parseInt(value) || 0;
//     setOvertimeAmount(newOvertimeAmount);
//     updateTotalPayment(
//       index,
//       bonus[index],
//       newOvertimeAmount[index],
//       salaryAmount[index],
//       previousDue[index],
//       salaryCut[index]
//     );
//   };

//   const handleSalaryAmount = (index, value) => {
//     const newSalaryAmount = [...salaryAmount];
//     newSalaryAmount[index] = Number.parseInt(value) || 0;
//     setSalaryAmount(newSalaryAmount);
//     updateTotalPayment(
//       index,
//       bonus[index],
//       overtimeAmount[index],
//       newSalaryAmount[index],
//       previousDue[index],
//       salaryCut[index]
//     );
//   };

//   const handlePreviousDue = (index, value) => {
//     const newPreviousDue = [...previousDue];
//     newPreviousDue[index] = Number.parseInt(value) || 0;
//     setPreviousDue(newPreviousDue);
//     updateTotalPayment(
//       index,
//       bonus[index],
//       overtimeAmount[index],
//       salaryAmount[index],
//       newPreviousDue[index],
//       salaryCut[index]
//     );
//   };

//   const handleSalaryCut = (index, value) => {
//     const newSalaryCut = [...salaryCut];
//     newSalaryCut[index] = Number.parseInt(value) || 0;
//     setSalaryCut(newSalaryCut);
//     updateTotalPayment(
//       index,
//       bonus[index],
//       overtimeAmount[index],
//       salaryAmount[index],
//       previousDue[index],
//       newSalaryCut[index]
//     );
//   };

//   // Auto-calculate total payment
//   const updateTotalPayment = (
//     index,
//     bonusVal,
//     overtimeVal,
//     salaryVal,
//     previousDueVal,
//     salaryCutVal
//   ) => {
//     const newTotalPayment = [...totalPayment];
//     newTotalPayment[index] =
//       bonusVal + overtimeVal + salaryVal + previousDueVal - salaryCutVal;
//     setTotalPayment(newTotalPayment);
//     updateDue(index, newTotalPayment[index], advance[index], pay[index]);
//   };

//   const handleAdvance = (index, value) => {
//     const newAdvance = [...advance];
//     newAdvance[index] = Number.parseInt(value) || 0;
//     setAdvance(newAdvance);
//     updateDue(index, totalPayment[index], newAdvance[index], pay[index]);
//   };

//   const handlePay = (index, value) => {
//     const newPay = [...pay];
//     newPay[index] = Number.parseInt(value) || 0;
//     setPay(newPay);
//     updateDue(index, totalPayment[index], advance[index], newPay[index]);
//   };

//   // Auto-calculate due amount
//   const updateDue = (index, totalPaymentVal, advanceVal, payVal) => {
//     const newDue = [...due];
//     newDue[index] = totalPaymentVal - (advanceVal + payVal);
//     setDue(newDue);

//     // Auto-update paid status based on due amount
//     const newPaid = [...paid];
//     newPaid[index] = newDue[index] <= 0;
//     setPaid(newPaid);
//   };

//   const handlePaid = (index, value) => {
//     const newPaid = [...paid];
//     newPaid[index] = value === "true";
//     setPaid(newPaid);
//   };

//   const handleDue = (index, value) => {
//     const newDue = [...due];
//     newDue[index] = Number.parseInt(value) || 0;
//     setDue(newDue);
//   };

//   // Calculate payment status based on amounts
//   const getPaymentStatus = (totalPayment, paidAmount) => {
//     if (paidAmount <= 0) return "pending";
//     if (paidAmount >= totalPayment) return "completed";
//     return "partial";
//   };

//   // Submit salary data
//   const handleSubmitSalary = async () => {
//     const newSalaryData = getAllEmployee?.data?.employees?.map(
//       (employee, index) => {
//         const totalPaymentAmount = totalPayment[index] || 0;
//         const paidAmount = (advance[index] || 0) + (pay[index] || 0);
//         const dueAmount = totalPaymentAmount - paidAmount;
//         const paymentStatus = getPaymentStatus(totalPaymentAmount, paidAmount);

//         return {
//           employee: employee._id,
//           full_name: employee.full_name,
//           employeeId: employee.employeeId,
//           month_of_salary: selectedOption[index] || initialSelectedOption,
//           year_of_salary: selectedYear[index] || currentYear,
//           bonus: bonus[index] || 0,
//           total_overtime: calculateOvertimeHours(employee),
//           overtime_amount: overtimeAmount[index] || 0,
//           salary_amount: salaryAmount[index] || 0,
//           previous_due: previousDue[index] || 0,
//           cut_salary: salaryCut[index] || 0,
//           total_payment: totalPaymentAmount,
//           advance: advance[index] || 0,
//           pay: pay[index] || 0,
//           due: dueAmount,
//           paid: paidAmount,
//           paid_amount: paidAmount,
//           due_amount: dueAmount,
//           payment_status: paymentStatus,
//         };
//       }
//     );

//     try {
//       const response = await createSalary(newSalaryData).unwrap();
//       if (response.success) {
//         toast.success(response.message);
//       }
//     } catch (error) {
//       // Handle the specific error structure
//       if (error.data && error.data.message) {
//         toast.error(error.data.message);
//       } else if (error.message) {
//         toast.error(error.message);
//       } else {
//         toast.error("An error occurred while adding salary");
//       }

//       // If there are specific error sources, display those as well
//       if (
//         error.data &&
//         error.data.errorSources &&
//         error.data.errorSources.length > 0
//       ) {
//         error.data.errorSources.forEach((errorSource) => {
//           if (errorSource.message) {
//             toast.error(errorSource.message);
//           }
//         });
//       }
//     }
//   };

//   // Calculate overtime hours for each employee
//   const calculateOvertimeHours = (employee) => {
//     let totalOvertime = 0;
//     if (employee.attendance && Array.isArray(employee.attendance)) {
//       employee.attendance.forEach((attendanceRecord) => {
//         if (
//           attendanceRecord.overtime &&
//           typeof attendanceRecord.overtime === "number"
//         ) {
//           totalOvertime += attendanceRecord.overtime;
//         }
//       });
//     }
//     return totalOvertime;
//   };

//   return (
//     <Container maxWidth="7xl">
//       <Box sx={{ pt: 4, pb: 8 }}>
//         <Paper
//           elevation={3}
//           sx={{
//             p: 3,
//             mb: 4,
//             borderRadius: 2,
//             background: `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.background.paper})`,
//           }}
//         >
//           <Grid container alignItems="center" spacing={2}>
//             <Grid item>
//               <MonetizationOn fontSize="large" color="primary" />
//             </Grid>
//             <Grid item xs>
//               <Typography variant="h4" fontWeight="bold" color="primary">
//                 Employee Salary Management
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Dashboard / Employee Salary
//               </Typography>
//             </Grid>
//             <Grid item>
//               <Chip
//                 icon={<CalendarMonth />}
//                 label={`${new Date().toLocaleString("default", {
//                   month: "long",
//                 })} ${new Date().getFullYear()}`}
//                 color="primary"
//                 variant="outlined"
//               />
//             </Grid>
//           </Grid>
//         </Paper>

//         <Card elevation={4} sx={{ mb: 4, borderRadius: 2, overflow: "auto" }}>
//           <CardContent sx={{ p: 0 }}>
//             <TableContainer
//               component={Paper}
//               elevation={0}
//               sx={{
//                 "& .MuiTableCell-root": {
//                   padding: "8px",
//                   whiteSpace: "nowrap",
//                 },
//               }}
//             >
//               <Table sx={{ minWidth: 1400 }}>
//                 <TableHead>
//                   <TableRow
//                     sx={{ backgroundColor: theme.palette.primary.main }}
//                   >
//                     <TableCell
//                       sx={{
//                         color: "white",
//                         fontWeight: "bold",
//                         width: "180px",
//                       }}
//                     >
//                       Employee
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         color: "white",
//                         fontWeight: "bold",
//                         width: "120px",
//                       }}
//                     >
//                       Employee ID
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         color: "white",
//                         fontWeight: "bold",
//                         width: "150px",
//                       }}
//                     >
//                       Month of Salary
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         color: "white",
//                         fontWeight: "bold",
//                         width: "120px",
//                       }}
//                     >
//                       Year
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         color: "white",
//                         fontWeight: "bold",
//                         width: "120px",
//                       }}
//                     >
//                       Bonus
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         color: "white",
//                         fontWeight: "bold",
//                         width: "120px",
//                       }}
//                     >
//                       Overtime Hours
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         color: "white",
//                         fontWeight: "bold",
//                         width: "120px",
//                       }}
//                     >
//                       Overtime Amount
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         color: "white",
//                         fontWeight: "bold",
//                         width: "120px",
//                       }}
//                     >
//                       Salary Amount
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         color: "white",
//                         fontWeight: "bold",
//                         width: "120px",
//                       }}
//                     >
//                       Previous Due
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         color: "white",
//                         fontWeight: "bold",
//                         width: "120px",
//                       }}
//                     >
//                       Cut Salary
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         color: "white",
//                         fontWeight: "bold",
//                         width: "120px",
//                       }}
//                     >
//                       Total Payment
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         color: "white",
//                         fontWeight: "bold",
//                         width: "120px",
//                       }}
//                     >
//                       Advance
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         color: "white",
//                         fontWeight: "bold",
//                         width: "120px",
//                       }}
//                     >
//                       Pay
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         color: "white",
//                         fontWeight: "bold",
//                         width: "120px",
//                       }}
//                     >
//                       Due
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         color: "white",
//                         fontWeight: "bold",
//                         width: "120px",
//                       }}
//                     >
//                       Status
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {Array.isArray(getAllEmployee?.data?.employees) &&
//                     getAllEmployee?.data?.employees?.map((employee, index) => {
//                       const overtimeHours = calculateOvertimeHours(employee);
//                       const currentDue = due[index] || 0;
//                       const currentPaid = paid[index];

//                       return (
//                         <TableRow
//                           key={employee._id}
//                           sx={{
//                             "&:nth-of-type(odd)": {
//                               backgroundColor: theme.palette.action.hover,
//                             },
//                             "&:hover": {
//                               backgroundColor: theme.palette.action.selected,
//                             },
//                           }}
//                         >
//                           <TableCell>
//                             <Box sx={{ display: "flex", alignItems: "center" }}>
//                               <Person color="primary" sx={{ mr: 1 }} />
//                               <Typography variant="body2" fontWeight="medium">
//                                 {employee.full_name}
//                               </Typography>
//                             </Box>
//                           </TableCell>

//                           <TableCell>
//                             <Chip
//                               size="small"
//                               label={employee.employeeId}
//                               variant="outlined"
//                               color="primary"
//                             />
//                           </TableCell>

//                           <TableCell>
//                             <FormControl fullWidth size="small">
//                               <InputLabel>Month</InputLabel>
//                               <Select
//                                 value={
//                                   selectedOption[index] || initialSelectedOption
//                                 }
//                                 label="Month"
//                                 onChange={(e) =>
//                                   handleChange(index, e.target.value)
//                                 }
//                                 startAdornment={
//                                   <InputAdornment position="start">
//                                     <CalendarMonth fontSize="small" />
//                                   </InputAdornment>
//                                 }
//                               >
//                                 {allMonths.map((month) => (
//                                   <MenuItem value={month} key={month}>
//                                     {month}
//                                   </MenuItem>
//                                 ))}
//                               </Select>
//                             </FormControl>
//                           </TableCell>

//                           <TableCell>
//                             <FormControl fullWidth size="small">
//                               <InputLabel>Year</InputLabel>
//                               <Select
//                                 value={selectedYear[index] || currentYear}
//                                 label="Year"
//                                 onChange={(e) =>
//                                   handleYearChange(index, e.target.value)
//                                 }
//                               >
//                                 {years.slice(1).map((year) => (
//                                   <MenuItem value={year.value} key={year.value}>
//                                     {year.label}
//                                   </MenuItem>
//                                 ))}
//                               </Select>
//                             </FormControl>
//                           </TableCell>

//                           <TableCell>
//                             <TextField
//                               size="small"
//                               type="number"
//                               placeholder="0"
//                               value={bonus[index] || ""}
//                               onChange={(e) =>
//                                 handleBonus(index, e.target.value)
//                               }
//                               InputProps={{
//                                 startAdornment: (
//                                   <InputAdornment position="start">
//                                     <Typography
//                                       variant="body2"
//                                       fontWeight="medium"
//                                     >
//                                       ৳
//                                     </Typography>
//                                   </InputAdornment>
//                                 ),
//                               }}
//                               sx={{
//                                 width: "120px",
//                                 "& input": {
//                                   textAlign: "right",
//                                   paddingRight: "8px",
//                                 },
//                               }}
//                             />
//                           </TableCell>

//                           <TableCell>
//                             <Chip
//                               size="small"
//                               icon={<TimerOutlined />}
//                               label={`${overtimeHours} h`}
//                               color={overtimeHours > 0 ? "success" : "default"}
//                             />
//                           </TableCell>

//                           <TableCell>
//                             <TextField
//                               size="small"
//                               type="number"
//                               placeholder="0"
//                               value={overtimeAmount[index] || ""}
//                               onChange={(e) =>
//                                 handleOvertimeAmount(index, e.target.value)
//                               }
//                               InputProps={{
//                                 startAdornment: (
//                                   <InputAdornment position="start">
//                                     <Typography
//                                       variant="body2"
//                                       fontWeight="medium"
//                                     >
//                                       ৳
//                                     </Typography>
//                                   </InputAdornment>
//                                 ),
//                               }}
//                               sx={{
//                                 width: "120px",
//                                 "& input": {
//                                   textAlign: "right",
//                                   paddingRight: "8px",
//                                 },
//                               }}
//                             />
//                           </TableCell>

//                           <TableCell>
//                             <TextField
//                               size="small"
//                               type="number"
//                               placeholder="0"
//                               value={salaryAmount[index] || ""}
//                               onChange={(e) =>
//                                 handleSalaryAmount(index, e.target.value)
//                               }
//                               InputProps={{
//                                 startAdornment: (
//                                   <InputAdornment position="start">
//                                     <Typography
//                                       variant="body2"
//                                       fontWeight="medium"
//                                     >
//                                       ৳
//                                     </Typography>
//                                   </InputAdornment>
//                                 ),
//                               }}
//                               sx={{
//                                 width: "120px",
//                                 "& input": {
//                                   textAlign: "right",
//                                   paddingRight: "8px",
//                                 },
//                               }}
//                             />
//                           </TableCell>

//                           <TableCell>
//                             <TextField
//                               size="small"
//                               type="number"
//                               placeholder="0"
//                               value={previousDue[index] || ""}
//                               onChange={(e) =>
//                                 handlePreviousDue(index, e.target.value)
//                               }
//                               InputProps={{
//                                 startAdornment: (
//                                   <InputAdornment position="start">
//                                     <Typography
//                                       variant="body2"
//                                       fontWeight="medium"
//                                     >
//                                       ৳
//                                     </Typography>
//                                   </InputAdornment>
//                                 ),
//                               }}
//                               sx={{
//                                 width: "120px",
//                                 "& input": {
//                                   textAlign: "right",
//                                   paddingRight: "8px",
//                                 },
//                               }}
//                             />
//                           </TableCell>

//                           <TableCell>
//                             <TextField
//                               size="small"
//                               type="number"
//                               placeholder="0"
//                               value={salaryCut[index] || ""}
//                               onChange={(e) =>
//                                 handleSalaryCut(index, e.target.value)
//                               }
//                               InputProps={{
//                                 startAdornment: (
//                                   <InputAdornment position="start">
//                                     <Typography
//                                       variant="body2"
//                                       fontWeight="medium"
//                                     >
//                                       ৳
//                                     </Typography>
//                                   </InputAdornment>
//                                 ),
//                               }}
//                               sx={{
//                                 width: "120px",
//                                 "& input": {
//                                   textAlign: "right",
//                                   paddingRight: "8px",
//                                 },
//                               }}
//                             />
//                           </TableCell>

//                           <TableCell>
//                             <TextField
//                               size="small"
//                               type="number"
//                               placeholder="0"
//                               value={totalPayment[index] || ""}
//                               InputProps={{
//                                 readOnly: true,
//                                 startAdornment: (
//                                   <InputAdornment position="start">
//                                     <Typography
//                                       variant="body2"
//                                       fontWeight="medium"
//                                     >
//                                       ৳
//                                     </Typography>
//                                   </InputAdornment>
//                                 ),
//                               }}
//                               sx={{
//                                 width: "120px",
//                                 "& input": {
//                                   textAlign: "right",
//                                   paddingRight: "8px",
//                                   fontWeight: "bold",
//                                   color: theme.palette.success.main,
//                                 },
//                               }}
//                             />
//                           </TableCell>

//                           <TableCell>
//                             <TextField
//                               size="small"
//                               type="number"
//                               placeholder="0"
//                               value={advance[index] || ""}
//                               onChange={(e) =>
//                                 handleAdvance(index, e.target.value)
//                               }
//                               InputProps={{
//                                 startAdornment: (
//                                   <InputAdornment position="start">
//                                     <Typography
//                                       variant="body2"
//                                       fontWeight="medium"
//                                     >
//                                       ৳
//                                     </Typography>
//                                   </InputAdornment>
//                                 ),
//                               }}
//                               sx={{
//                                 width: "120px",
//                                 "& input": {
//                                   textAlign: "right",
//                                   paddingRight: "8px",
//                                 },
//                               }}
//                             />
//                           </TableCell>

//                           <TableCell>
//                             <TextField
//                               size="small"
//                               type="number"
//                               placeholder="0"
//                               value={pay[index] || ""}
//                               onChange={(e) => handlePay(index, e.target.value)}
//                               InputProps={{
//                                 startAdornment: (
//                                   <InputAdornment position="start">
//                                     <Typography
//                                       variant="body2"
//                                       fontWeight="medium"
//                                     >
//                                       ৳
//                                     </Typography>
//                                   </InputAdornment>
//                                 ),
//                               }}
//                               sx={{
//                                 width: "120px",
//                                 "& input": {
//                                   textAlign: "right",
//                                   paddingRight: "8px",
//                                 },
//                               }}
//                             />
//                           </TableCell>

//                           <TableCell>
//                             <TextField
//                               size="small"
//                               type="number"
//                               placeholder="0"
//                               value={due[index] || ""}
//                               InputProps={{
//                                 readOnly: true,
//                                 startAdornment: (
//                                   <InputAdornment position="start">
//                                     <Typography
//                                       variant="body2"
//                                       fontWeight="medium"
//                                     >
//                                       ৳
//                                     </Typography>
//                                   </InputAdornment>
//                                 ),
//                               }}
//                               sx={{
//                                 width: "120px",
//                                 "& input": {
//                                   textAlign: "right",
//                                   paddingRight: "8px",
//                                   fontWeight: "bold",
//                                   color:
//                                     currentDue > 0
//                                       ? theme.palette.error.main
//                                       : theme.palette.success.main,
//                                 },
//                               }}
//                             />
//                           </TableCell>

//                           <TableCell>
//                             <Chip
//                               size="small"
//                               icon={
//                                 currentDue <= 0 ? <CheckCircle /> : <Warning />
//                               }
//                               label={currentDue <= 0 ? "Paid" : "Due"}
//                               color={currentDue <= 0 ? "success" : "error"}
//                               variant={currentDue <= 0 ? "filled" : "outlined"}
//                             />
//                           </TableCell>
//                         </TableRow>
//                       );
//                     })}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </CardContent>
//         </Card>

//         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             size="large"
//             disabled={createLoading}
//             onClick={handleSubmitSalary}
//             startIcon={<Save />}
//             sx={{
//               px: 4,
//               py: 1.5,
//               borderRadius: 2,
//               boxShadow: 3,
//             }}
//           >
//             {createLoading ? "Submitting..." : "Submit Salary"}
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default EmployeeSalaryForm;
