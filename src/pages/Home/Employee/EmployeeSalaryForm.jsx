/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-circular-progressbar/dist/styles.css";
import "./Employee.css";
import { useGetAllEmployeesQuery } from "../../../redux/api/employee";
import {
  useCreateSalaryMutation,
  useGetSingleSalaryQuery,
  useUpateSalaryMutation,
} from "../../../redux/api/salary";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
  Alert,
  CircularProgress,
  Autocomplete,
  Avatar,
} from "@mui/material";
import {
  CalendarMonth,
  CheckCircle,
  MonetizationOn,
  Person,
  Save,
  TimerOutlined,
  Warning,
  Edit,
  Add,
  FilterList,
  Clear,
  Group,
} from "@mui/icons-material";
import { allMonths } from "../../../utils/month";
import { useLocation, useNavigate } from "react-router-dom";

// Constants
const years = [{ value: "Select Year", label: "Select Year" }];
for (let year = 2024; year <= 2030; year++) {
  years.push({ value: String(year), label: String(year) });
}

const initialSelectedOption = allMonths[new Date().getMonth()];
const currentYear = new Date().getFullYear().toString();

const EmployeeSalaryForm = ({ tenantDomain }) => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState(initialSelectedOption);
  const limit = 100;
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  // New state for employee filtering
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: getAllEmployee, isLoading: employeesLoading } =
    useGetAllEmployeesQuery({
      limit,
      page: currentPage,
      searchTerm: searchTerm,
    });

  const {
    data: singleSalary,
    isLoading: singleSalaryLoading,
    error: singleSalaryError,
  } = useGetSingleSalaryQuery(id, {
    skip: !id,
  });

  const [createSalary, { isLoading: createLoading, error: createError }] =
    useCreateSalaryMutation();
  const [updateSalary, { isLoading: updateLoading, error: updateError }] =
    useUpateSalaryMutation();

  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);
  const [bonus, setBonus] = useState([]);
  const [overtimeHours, setOvertimeHours] = useState([]);
  const [overtimeAmount, setOvertimeAmount] = useState([]);
  const [salaryAmount, setSalaryAmount] = useState([]);
  const [previousDue, setPreviousDue] = useState([]);
  const [salaryCut, setSalaryCut] = useState([]);
  const [totalPayment, setTotalPayment] = useState([]);
  const [advance, setAdvance] = useState([]);
  const [pay, setPay] = useState([]);
  const [due, setDue] = useState([]);
  const [paid, setPaid] = useState([]);
  const [dataInitialized, setDataInitialized] = useState(false);

  const getFilteredEmployees = () => {
    if (!getAllEmployee?.data?.employees) return [];

    if (selectedEmployees.length === 0) {
      return getAllEmployee.data.employees;
    }

    return getAllEmployee.data.employees.filter((employee) =>
      selectedEmployees.some((selected) => selected._id === employee._id)
    );
  };

  const filteredEmployees = getFilteredEmployees();

  useEffect(() => {
    if (getAllEmployee?.data?.employees && !dataInitialized) {
      const employeeCount = getAllEmployee.data.employees.length;
      if (isEditMode && singleSalary?.data) {
        initializeWithAllSalaryData(employeeCount);
      } else {
        initializeWithDefaults(employeeCount);
      }
      setDataInitialized(true);
    }
  }, [
    getAllEmployee?.data?.employees,
    singleSalary?.data,
    isEditMode,
    dataInitialized,
  ]);

  const initializeWithDefaults = (employeeCount) => {
    setSelectedOption(new Array(employeeCount).fill(initialSelectedOption));
    setSelectedYear(new Array(employeeCount).fill(currentYear));
    setBonus(new Array(employeeCount).fill(0));
    setOvertimeAmount(new Array(employeeCount).fill(0));
    setOvertimeHours(new Array(employeeCount).fill(0));
    setSalaryAmount(new Array(employeeCount).fill(0));
    setPreviousDue(new Array(employeeCount).fill(0));
    setSalaryCut(new Array(employeeCount).fill(0));
    setTotalPayment(new Array(employeeCount).fill(0));
    setAdvance(new Array(employeeCount).fill(0));
    setPay(new Array(employeeCount).fill(0));
    setDue(new Array(employeeCount).fill(0));
    setPaid(new Array(employeeCount).fill(false));
  };

  // Initialize with ALL salary data for edit mode
  const initializeWithAllSalaryData = (employeeCount) => {
    try {
      const salariesArray = singleSalary.data?.salaries;
      if (
        !salariesArray ||
        !Array.isArray(salariesArray) ||
        salariesArray.length === 0
      ) {
        console.error("No salary data found in salaries array");
        initializeWithDefaults(employeeCount);
        return;
      }

      console.log("Found salary data array:", salariesArray);
      const employees = getAllEmployee.data.employees;

      // Initialize arrays with default values
      const monthArray = new Array(employeeCount).fill(initialSelectedOption);
      const yearArray = new Array(employeeCount).fill(currentYear);
      const bonusArray = new Array(employeeCount).fill(0);
      const overtimeAmountArray = new Array(employeeCount).fill(0);
      const overtimeHoursArray = new Array(employeeCount).fill(0);
      const salaryAmountArray = new Array(employeeCount).fill(0);
      const previousDueArray = new Array(employeeCount).fill(0);
      const salaryCutArray = new Array(employeeCount).fill(0);
      const totalPaymentArray = new Array(employeeCount).fill(0);
      const advanceArray = new Array(employeeCount).fill(0);
      const payArray = new Array(employeeCount).fill(0);
      const dueArray = new Array(employeeCount).fill(0);
      const paidArray = new Array(employeeCount).fill(false);

      // Process ALL salary records and populate corresponding employee data
      salariesArray.forEach((salaryData) => {
        // Find the employee index that matches this salary data
        let targetEmployeeId = null;
        if (
          salaryData.employee &&
          typeof salaryData.employee === "object" &&
          salaryData.employee._id
        ) {
          // Employee is an object with _id
          targetEmployeeId = salaryData.employee._id;
        } else if (typeof salaryData.employee === "string") {
          // Employee is just an ID string
          targetEmployeeId = salaryData.employee;
        } else if (salaryData.employeeId) {
          // Try to find by employeeId field
          const foundEmployee = employees.find(
            (emp) => emp.employeeId === salaryData.employeeId
          );
          targetEmployeeId = foundEmployee?._id;
        }

        const targetEmployeeIndex = targetEmployeeId
          ? employees.findIndex((emp) => emp._id === targetEmployeeId)
          : -1;

        console.log(
          `Processing salary for employee ID: ${targetEmployeeId}, index: ${targetEmployeeIndex}`
        );

        // Set the specific employee's data if found
        if (targetEmployeeIndex !== -1) {
          monthArray[targetEmployeeIndex] =
            salaryData.month_of_salary || initialSelectedOption;
          yearArray[targetEmployeeIndex] =
            salaryData.year_of_salary || currentYear;
          bonusArray[targetEmployeeIndex] = salaryData.bonus || 0;
          overtimeAmountArray[targetEmployeeIndex] =
            salaryData.overtime_rate || salaryData.overtime_amount || 0;
          overtimeHoursArray[targetEmployeeIndex] =
            salaryData.total_overtime || 0;
          salaryAmountArray[targetEmployeeIndex] =
            salaryData.salary_amount || 0;
          previousDueArray[targetEmployeeIndex] = salaryData.previous_due || 0;
          salaryCutArray[targetEmployeeIndex] = salaryData.cut_salary || 0;
          totalPaymentArray[targetEmployeeIndex] =
            salaryData.total_payment || 0;
          advanceArray[targetEmployeeIndex] = salaryData.advance || 0;
          payArray[targetEmployeeIndex] = salaryData.pay || 0;
          dueArray[targetEmployeeIndex] =
            salaryData.due_amount || salaryData.due || 0;
          paidArray[targetEmployeeIndex] =
            salaryData.payment_status === "completed";

          console.log(
            `Successfully populated data for employee at index: ${targetEmployeeIndex}`
          );
        } else {
          console.warn(`Employee not found for salary data:`, salaryData);
        }
      });

      // Set all state arrays
      setSelectedOption(monthArray);
      setSelectedYear(yearArray);
      setBonus(bonusArray);
      setOvertimeAmount(overtimeAmountArray);
      setOvertimeHours(overtimeHoursArray);
      setSalaryAmount(salaryAmountArray);
      setPreviousDue(previousDueArray);
      setSalaryCut(salaryCutArray);
      setTotalPayment(totalPaymentArray);
      setAdvance(advanceArray);
      setPay(payArray);
      setDue(dueArray);
      setPaid(paidArray);

      console.log("Successfully initialized all salary data");
    } catch (error) {
      console.error("Error initializing with salary data:", error);
      toast.error("Error loading salary data");
      initializeWithDefaults(employeeCount);
    }
  };

  useEffect(() => {
    setDataInitialized(false);
  }, [id]);

  // Handle employee filter selection
  const handleEmployeeFilterChange = (event, newValue) => {
    setSelectedEmployees(newValue);
  };

  // Clear employee filter
  const clearEmployeeFilter = () => {
    setSelectedEmployees([]);
  };

  // Get the actual index of an employee in the original array
  const getOriginalEmployeeIndex = (employee) => {
    return (
      getAllEmployee?.data?.employees?.findIndex(
        (emp) => emp._id === employee._id
      ) || 0
    );
  };

  const handleChange = (employee, value) => {
    const originalIndex = getOriginalEmployeeIndex(employee);
    const newMonth = [...selectedOption];
    newMonth[originalIndex] = value;
    setSelectedOption(newMonth);
  };

  const handleYearChange = (employee, value) => {
    const originalIndex = getOriginalEmployeeIndex(employee);
    const newYear = [...selectedYear];
    newYear[originalIndex] = value;
    setSelectedYear(newYear);
  };

  const handleBonus = (employee, value) => {
    const originalIndex = getOriginalEmployeeIndex(employee);
    const newBonus = [...bonus];
    newBonus[originalIndex] = Number.parseInt(value) || 0;
    setBonus(newBonus);
    updateTotalPayment(
      originalIndex,
      newBonus[originalIndex],
      overtimeAmount[originalIndex],
      salaryAmount[originalIndex],
      previousDue[originalIndex],
      salaryCut[originalIndex]
    );
  };

  const handleOvertimeAmount = (employee, value) => {
    const originalIndex = getOriginalEmployeeIndex(employee);
    const newOvertimeAmount = [...overtimeAmount];
    newOvertimeAmount[originalIndex] = Number.parseInt(value) || 0;
    setOvertimeAmount(newOvertimeAmount);
    updateTotalPayment(
      originalIndex,
      bonus[originalIndex],
      newOvertimeAmount[originalIndex],
      salaryAmount[originalIndex],
      previousDue[originalIndex],
      salaryCut[originalIndex]
    );
  };

  const handleSalaryAmount = (employee, value) => {
    const originalIndex = getOriginalEmployeeIndex(employee);
    const newSalaryAmount = [...salaryAmount];
    newSalaryAmount[originalIndex] = Number.parseInt(value) || 0;
    setSalaryAmount(newSalaryAmount);
    updateTotalPayment(
      originalIndex,
      bonus[originalIndex],
      overtimeAmount[originalIndex],
      newSalaryAmount[originalIndex],
      previousDue[originalIndex],
      salaryCut[originalIndex]
    );
  };

  const handlePreviousDue = (employee, value) => {
    const originalIndex = getOriginalEmployeeIndex(employee);
    const newPreviousDue = [...previousDue];
    newPreviousDue[originalIndex] = Number.parseInt(value) || 0;
    setPreviousDue(newPreviousDue);
    updateTotalPayment(
      originalIndex,
      bonus[originalIndex],
      overtimeAmount[originalIndex],
      salaryAmount[originalIndex],
      newPreviousDue[originalIndex],
      salaryCut[originalIndex]
    );
  };

  const handleSalaryCut = (employee, value) => {
    const originalIndex = getOriginalEmployeeIndex(employee);
    const newSalaryCut = [...salaryCut];
    newSalaryCut[originalIndex] = Number.parseInt(value) || 0;
    setSalaryCut(newSalaryCut);
    updateTotalPayment(
      originalIndex,
      bonus[originalIndex],
      overtimeAmount[originalIndex],
      salaryAmount[originalIndex],
      previousDue[originalIndex],
      newSalaryCut[originalIndex]
    );
  };

  const calculateOvertimePayment = (hours, rate) => {
    return hours * rate;
  };

  const updateTotalPayment = (
    index,
    bonusVal,
    overtimeRate,
    salaryVal,
    previousDueVal,
    salaryCutVal
  ) => {
    const newTotalPayment = [...totalPayment];
    const overtimeHoursVal = getOvertimeHours(
      getAllEmployee?.data?.employees[index],
      index
    );
    const overtimePayment = calculateOvertimePayment(
      overtimeHoursVal,
      overtimeRate
    );
    newTotalPayment[index] =
      bonusVal + overtimePayment + salaryVal + previousDueVal - salaryCutVal;
    setTotalPayment(newTotalPayment);
    updateDue(index, newTotalPayment[index], advance[index], pay[index]);
  };

  const handleAdvance = (employee, value) => {
    const originalIndex = getOriginalEmployeeIndex(employee);
    const newAdvance = [...advance];
    newAdvance[originalIndex] = Number.parseInt(value) || 0;
    setAdvance(newAdvance);
    updateDue(
      originalIndex,
      totalPayment[originalIndex],
      newAdvance[originalIndex],
      pay[originalIndex]
    );
  };

  const handlePay = (employee, value) => {
    const originalIndex = getOriginalEmployeeIndex(employee);
    const newPay = [...pay];
    newPay[originalIndex] = Number.parseInt(value) || 0;
    setPay(newPay);
    updateDue(
      originalIndex,
      totalPayment[originalIndex],
      advance[originalIndex],
      newPay[originalIndex]
    );
  };

  const updateDue = (index, totalPaymentVal, advanceVal, payVal) => {
    const newDue = [...due];
    newDue[index] = totalPaymentVal - (advanceVal + payVal);
    setDue(newDue);
    const newPaid = [...paid];
    newPaid[index] = newDue[index] <= 0;
    setPaid(newPaid);
  };

  const handlePaid = (employee, value) => {
    const originalIndex = getOriginalEmployeeIndex(employee);
    const newPaid = [...paid];
    newPaid[originalIndex] = value === "true";
    setPaid(newPaid);
  };

  const handleDue = (employee, value) => {
    const originalIndex = getOriginalEmployeeIndex(employee);
    const newDue = [...due];
    newDue[originalIndex] = Number.parseInt(value) || 0;
    setDue(newDue);
  };

  const getPaymentStatus = (totalPayment, paidAmount) => {
    if (paidAmount <= 0) return "pending";
    if (paidAmount >= totalPayment) return "completed";
    return "partial";
  };

  const handleSubmitSalary = async () => {
    if (isEditMode) {
      await handleUpdateAllSalaries();
    } else {
      await handleCreateSalary();
    }
  };

  const handleOvertimeHours = (employee, value) => {
    const originalIndex = getOriginalEmployeeIndex(employee);
    const newOvertimeHours = [...overtimeHours];
    newOvertimeHours[originalIndex] = Number.parseFloat(value) || 0;
    setOvertimeHours(newOvertimeHours);
    // Recalculate total payment when overtime hours change
    updateTotalPayment(
      originalIndex,
      bonus[originalIndex],
      overtimeAmount[originalIndex],
      salaryAmount[originalIndex],
      previousDue[originalIndex],
      salaryCut[originalIndex]
    );
  };

  const getOvertimeHours = (employee, index) => {
    if (overtimeHours[index] !== undefined && overtimeHours[index] !== null) {
      return overtimeHours[index];
    }
    return calculateOvertimeHours(employee);
  };


const handleCreateSalary = async () => {
  const newSalaryData = getAllEmployee?.data?.employees?.map((employee, index) => {
    const overtimeHoursVal = getOvertimeHours(employee, index);
    const overtimePayment = calculateOvertimePayment(overtimeHoursVal, overtimeAmount[index] || 0);
    const totalPaymentAmount = totalPayment[index] || 0;
    const paidAmount = (advance[index] || 0) + (pay[index] || 0);
    const dueAmount = totalPaymentAmount - paidAmount;
    const paymentStatus = getPaymentStatus(totalPaymentAmount, paidAmount);

    return {
      employee: employee._id,
      full_name: employee.full_name,
      employeeId: employee.employeeId,
      month_of_salary: selectedOption[index] || initialSelectedOption,
      year_of_salary: selectedYear[index] || currentYear,
      bonus: bonus[index] || 0,
      total_overtime: overtimeHoursVal,
      overtime_rate: overtimeAmount[index] || 0,
      overtime_amount: overtimePayment,
      salary_amount: salaryAmount[index] || 0,
      previous_due: previousDue[index] || 0,
      cut_salary: salaryCut[index] || 0,
      total_payment: totalPaymentAmount,
      advance: advance[index] || 0,
      pay: pay[index] || 0,
      due: dueAmount,
      paid: paidAmount,
      paid_amount: paidAmount,
      due_amount: dueAmount,
      payment_status: paymentStatus,
    };
  }) || [];

  try {
    const response = await createSalary({
      tenantDomain,
      salaries: newSalaryData, // ✅ correctly wrapped
    }).unwrap();

    if (response.success) {
      toast.success(response.message);
      navigate("/dashboard/employee-salary");
    }
  } catch (error) {
    handleApiError(error);
  }
};


  const handleUpdateAllSalaries = async () => {
    try {
      const salariesArray = singleSalary.data?.salaries;

      if (!salariesArray || !Array.isArray(salariesArray)) {
        toast.error("Invalid salary data structure");
        return;
      }

      const employees = getAllEmployee.data.employees;

      const updatePromises = salariesArray.map(async (salaryData) => {
        let targetEmployeeId = null;

        if (
          salaryData.employee &&
          typeof salaryData.employee === "object" &&
          salaryData.employee._id
        ) {
          targetEmployeeId = salaryData.employee._id;
        } else if (typeof salaryData.employee === "string") {
          targetEmployeeId = salaryData.employee;
        } else if (salaryData.employeeId) {
          const foundEmployee = employees.find(
            (emp) => emp.employeeId === salaryData.employeeId
          );
          targetEmployeeId = foundEmployee?._id;
        }

        const targetEmployeeIndex = targetEmployeeId
          ? employees.findIndex((emp) => emp._id === targetEmployeeId)
          : -1;

        if (targetEmployeeIndex === -1) {
          return null;
        }

        const totalPaymentAmount = totalPayment[targetEmployeeIndex] || 0;
        const paidAmount =
          (advance[targetEmployeeIndex] || 0) + (pay[targetEmployeeIndex] || 0);
        const dueAmount = totalPaymentAmount - paidAmount;
        const paymentStatus = getPaymentStatus(totalPaymentAmount, paidAmount);

        const updateData = {
          month_of_salary:
            selectedOption[targetEmployeeIndex] || initialSelectedOption,
          year_of_salary: selectedYear[targetEmployeeIndex] || currentYear,
          bonus: bonus[targetEmployeeIndex] || 0,
          total_overtime: getOvertimeHours(
            employees[targetEmployeeIndex],
            targetEmployeeIndex
          ),
          overtime_rate: overtimeAmount[targetEmployeeIndex] || 0,
          overtime_amount: calculateOvertimePayment(
            getOvertimeHours(
              employees[targetEmployeeIndex],
              targetEmployeeIndex
            ),
            overtimeAmount[targetEmployeeIndex] || 0
          ),
          salary_amount: salaryAmount[targetEmployeeIndex] || 0,
          previous_due: previousDue[targetEmployeeIndex] || 0,
          cut_salary: salaryCut[targetEmployeeIndex] || 0,
          total_payment: totalPaymentAmount,
          advance: advance[targetEmployeeIndex] || 0,
          pay: pay[targetEmployeeIndex] || 0,
          due: dueAmount,
          paid: paidAmount,
          paid_amount: paidAmount,
          due_amount: dueAmount,
          payment_status: paymentStatus,
        };

        return updateSalary({
          tenantDomain,
          id: salaryData._id,
          data: updateData,
        }).unwrap();
      });

      const results = await Promise.allSettled(updatePromises.filter(Boolean));

      const successCount = results.filter(
        (result) => result.status === "fulfilled"
      ).length;
      const errorCount = results.filter(
        (result) => result.status === "rejected"
      ).length;

      if (successCount > 0) {
        toast.success(`Successfully updated ${successCount} salary record(s)`);
        navigate("/dashboard/employee-salary");
      }

      if (errorCount > 0) {
        toast.error(`Failed to update ${errorCount} salary record(s)`);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    if (error.data && error.data.message) {
      toast.error(error.data.message);
    } else if (error.message) {
      toast.error(error.message);
    } else {
      toast.error(
        `An error occurred while ${isEditMode ? "updating" : "adding"} salary`
      );
    }
    if (
      error.data &&
      error.data.errorSources &&
      error.data.errorSources.length > 0
    ) {
      error.data.errorSources.forEach((errorSource) => {
        if (errorSource.message) {
          toast.error(errorSource.message);
        }
      });
    }
  };

  const calculateOvertimeHours = (employee) => {
    let totalOvertime = 0;
    if (employee && employee.attendance && Array.isArray(employee.attendance)) {
      employee.attendance.forEach((attendanceRecord) => {
        if (
          attendanceRecord.overtime &&
          typeof attendanceRecord.overtime === "number"
        ) {
          totalOvertime += attendanceRecord.overtime;
        }
      });
    }
    return totalOvertime;
  };

  const getEmployeesWithSalaryData = () => {
    if (!isEditMode || !singleSalary?.data?.salaries) return [];
    const salariesArray = singleSalary.data.salaries;
    const employees = getAllEmployee?.data?.employees || [];
    return salariesArray
      .map((salaryData) => {
        let targetEmployeeId = null;
        if (
          salaryData.employee &&
          typeof salaryData.employee === "object" &&
          salaryData.employee._id
        ) {
          targetEmployeeId = salaryData.employee._id;
        } else if (typeof salaryData.employee === "string") {
          targetEmployeeId = salaryData.employee;
        } else if (salaryData.employeeId) {
          const foundEmployee = employees.find(
            (emp) => emp.employeeId === salaryData.employeeId
          );
          targetEmployeeId = foundEmployee?._id;
        }
        return targetEmployeeId;
      })
      .filter(Boolean);
  };

  if (employeesLoading || (isEditMode && singleSalaryLoading)) {
    return (
      <Container maxWidth="7xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  // Error state for single salary
  if (isEditMode && singleSalaryError) {
    return (
      <Container maxWidth="7xl">
        <Alert severity="error" sx={{ mt: 4 }}>
          Error loading salary data. Please try again.
        </Alert>
      </Container>
    );
  }

  // Check if we have the required data
  if (!getAllEmployee?.data?.employees) {
    return (
      <Container maxWidth="7xl">
        <Alert severity="warning" sx={{ mt: 4 }}>
          No employee data available. Please ensure employees are loaded.
        </Alert>
      </Container>
    );
  }

  const employeesWithSalaryData = getEmployeesWithSalaryData();
  const tableCellStyle = {
    color: "white",
    fontWeight: "bold",
    width: "180px",
    backgroundColor: theme.palette.primary.main,
    position: "sticky",
    top: 0,
    zIndex: 1,
  };
  return (
    <Container maxWidth="7xl">
      <Box sx={{ pt: 4, pb: 8 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.background.paper})`,
          }}
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <MonetizationOn fontSize="large" color="primary" />
            </Grid>
            <Grid item xs>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {isEditMode
                  ? "Update Employee Salaries"
                  : "Employee Salary Management"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Dashboard / Employee Salary {isEditMode ? "/ Update" : ""}
              </Typography>
              {isEditMode && singleSalary?.data?.salaries && (
                <Chip
                  icon={<Edit />}
                  label={`Editing ${singleSalary.data.salaries.length} salary record(s)`}
                  color="warning"
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              )}
            </Grid>
            <Grid item>
              <Chip
                icon={isEditMode ? <Edit /> : <Add />}
                label={isEditMode ? "Edit Mode" : "Create Mode"}
                color={isEditMode ? "warning" : "primary"}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Employee Filter Section */}
        <Card elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <FilterList color="primary" />
              </Grid>
              <Grid item xs={12} md={8}>
                <Autocomplete
                  multiple
                  id="employee-filter"
                  options={getAllEmployee?.data?.employees || []}
                  getOptionLabel={(option) =>
                    `${option.full_name} (${option.employeeId})`
                  }
                  value={selectedEmployees}
                  onChange={handleEmployeeFilterChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Filter Employees"
                      placeholder="Select employees to add salary for..."
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <Group color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <Avatar
                        sx={{ mr: 2, bgcolor: theme.palette.primary.main }}
                      >
                        {option.full_name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="body1">
                          {option.full_name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {option.employeeId}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={option._id}
                        label={`${option.full_name} (${option.employeeId})`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))
                  }
                  sx={{ minWidth: 300 }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<Clear />}
                  onClick={clearEmployeeFilter}
                  disabled={selectedEmployees.length === 0}
                >
                  Clear Filter
                </Button>
              </Grid>
              <Grid item>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Showing:
                  </Typography>
                  <Chip
                    label={`${filteredEmployees.length} of ${
                      getAllEmployee?.data?.employees?.length || 0
                    } employees`}
                    size="small"
                    color={selectedEmployees.length > 0 ? "primary" : "default"}
                    variant="outlined"
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {isEditMode && singleSalary?.data?.salaries && (
          <Alert severity="info" sx={{ mb: 3 }}>
            You are editing{" "}
            <strong>
              {singleSalary.data.salaries.length} salary record(s)
            </strong>{" "}
            for{" "}
            <strong>
              {singleSalary.data.salaries[0]?.month_of_salary}{" "}
              {singleSalary.data.salaries[0]?.year_of_salary}
            </strong>
            . All loaded salary data will be updated.
          </Alert>
        )}

        {selectedEmployees.length > 0 && (
          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Filter Active:</strong> You are working with{" "}
              {selectedEmployees.length} selected employee(s). Only these
              employees will be processed when you submit the form.
            </Typography>
          </Alert>
        )}

        <Card elevation={4} sx={{ mb: 4, borderRadius: 2, overflow: "auto" }}>
          <CardContent sx={{ p: 0 }}>
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                "& .MuiTableCell-root": {
                  padding: "8px",
                  whiteSpace: "nowrap",
                },

                maxHeight: 600,
                overflow: "auto",
              }}
            >
              <Table sx={{ minWidth: 1400 }} stickyHeader>
                <TableHead>
                  <TableRow
                    sx={{ backgroundColor: theme.palette.primary.main }}
                  >
                    <TableCell sx={tableCellStyle}>Employee</TableCell>
                    <TableCell sx={tableCellStyle}>Employee ID</TableCell>
                    <TableCell sx={tableCellStyle}>Month of Salary</TableCell>
                    <TableCell sx={tableCellStyle}>Year</TableCell>
                    <TableCell sx={tableCellStyle}>Salary Amount</TableCell>
                    <TableCell sx={tableCellStyle}>Bonus</TableCell>
                    <TableCell sx={tableCellStyle}>Overtime Hours</TableCell>
                    <TableCell sx={tableCellStyle}>
                      Overtime Rate (per hour)
                    </TableCell>
                    <TableCell sx={tableCellStyle}>
                      Total Overtime Payment
                    </TableCell>
                    <TableCell sx={tableCellStyle}>Previous Due</TableCell>
                    <TableCell sx={tableCellStyle}>Cut Salary</TableCell>
                    <TableCell sx={tableCellStyle}>Total Payment</TableCell>
                    <TableCell sx={tableCellStyle}>Advance</TableCell>
                    <TableCell sx={tableCellStyle}>Pay</TableCell>
                    <TableCell sx={tableCellStyle}>Due</TableCell>
                    <TableCell sx={tableCellStyle}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(filteredEmployees) &&
                    filteredEmployees?.map((employee) => {
                      const originalIndex = getOriginalEmployeeIndex(employee);
                      const overtimeHoursValue = getOvertimeHours(
                        employee,
                        originalIndex
                      );
                      const currentDue = due[originalIndex] || 0;
                      const currentPaid = paid[originalIndex];
                      const hasExistingSalaryData =
                        employeesWithSalaryData.includes(employee._id);

                      return (
                        <TableRow
                          key={employee._id}
                          sx={{
                            "&:nth-of-type(odd)": {
                              backgroundColor: theme.palette.action.hover,
                            },
                            "&:hover": {
                              backgroundColor: theme.palette.action.selected,
                            },
                            ...(hasExistingSalaryData && {
                              backgroundColor:
                                theme.palette.success.light + "15",
                              border: `1px solid ${theme.palette.success.main}`,
                            }),
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Person color="primary" sx={{ mr: 1 }} />
                              <Typography variant="body2" fontWeight="medium">
                                {employee.full_name}
                                {hasExistingSalaryData && (
                                  <Chip
                                    size="small"
                                    label="HAS DATA"
                                    color="success"
                                    sx={{ ml: 1, fontSize: "0.7rem" }}
                                  />
                                )}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              size="small"
                              label={employee.employeeId}
                              variant="outlined"
                              color="primary"
                            />
                          </TableCell>
                          <TableCell>
                            <FormControl fullWidth size="small">
                              <InputLabel>Month</InputLabel>
                              <Select
                                value={
                                  selectedOption[originalIndex] ||
                                  initialSelectedOption
                                }
                                label="Month"
                                onChange={(e) =>
                                  handleChange(employee, e.target.value)
                                }
                                startAdornment={
                                  <InputAdornment position="start">
                                    <CalendarMonth fontSize="small" />
                                  </InputAdornment>
                                }
                              >
                                {allMonths.map((month) => (
                                  <MenuItem value={month} key={month}>
                                    {month}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell>
                            <FormControl fullWidth size="small">
                              <InputLabel>Year</InputLabel>
                              <Select
                                value={
                                  selectedYear[originalIndex] || currentYear
                                }
                                label="Year"
                                onChange={(e) =>
                                  handleYearChange(employee, e.target.value)
                                }
                              >
                                {years.slice(1).map((year) => (
                                  <MenuItem value={year.value} key={year.value}>
                                    {year.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              type="number"
                              placeholder="0"
                              value={salaryAmount[originalIndex] || ""}
                              onChange={(e) =>
                                handleSalaryAmount(employee, e.target.value)
                              }
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Typography
                                      variant="body2"
                                      fontWeight="medium"
                                    >
                                      ৳
                                    </Typography>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                width: "120px",
                                "& input": {
                                  textAlign: "right",
                                  paddingRight: "8px",
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              type="number"
                              placeholder="0"
                              value={bonus[originalIndex] || ""}
                              onChange={(e) =>
                                handleBonus(employee, e.target.value)
                              }
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Typography
                                      variant="body2"
                                      fontWeight="medium"
                                    >
                                      ৳
                                    </Typography>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                width: "120px",
                                "& input": {
                                  textAlign: "right",
                                  paddingRight: "8px",
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              type="number"
                              placeholder="0"
                              label="Hours"
                              value={overtimeHours[originalIndex] || ""}
                              onChange={(e) =>
                                handleOvertimeHours(employee, e.target.value)
                              }
                              inputProps={{
                                step: "0.5",
                                min: "0",
                                max: "24",
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <TimerOutlined fontSize="small" />
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      hrs
                                    </Typography>
                                  </InputAdornment>
                                ),
                              }}
                              helperText="e.g., 5.5 for 5½ hours"
                              sx={{
                                width: "140px",
                                "& input": {
                                  textAlign: "center",
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              type="number"
                              placeholder="0"
                              value={overtimeAmount[originalIndex] || ""}
                              onChange={(e) =>
                                handleOvertimeAmount(employee, e.target.value)
                              }
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Typography
                                      variant="body2"
                                      fontWeight="medium"
                                    >
                                      ৳
                                    </Typography>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                width: "120px",
                                "& input": {
                                  textAlign: "right",
                                  paddingRight: "8px",
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              type="number"
                              placeholder="0"
                              value={calculateOvertimePayment(
                                getOvertimeHours(employee, originalIndex),
                                overtimeAmount[originalIndex] || 0
                              )}
                              InputProps={{
                                readOnly: true,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Typography
                                      variant="body2"
                                      fontWeight="medium"
                                    >
                                      ৳
                                    </Typography>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                width: "120px",
                                "& input": {
                                  textAlign: "right",
                                  paddingRight: "8px",
                                  fontWeight: "bold",
                                  color: theme.palette.info.main,
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              type="number"
                              placeholder="0"
                              value={previousDue[originalIndex] || ""}
                              onChange={(e) =>
                                handlePreviousDue(employee, e.target.value)
                              }
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Typography
                                      variant="body2"
                                      fontWeight="medium"
                                    >
                                      ৳
                                    </Typography>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                width: "120px",
                                "& input": {
                                  textAlign: "right",
                                  paddingRight: "8px",
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              type="number"
                              placeholder="0"
                              value={salaryCut[originalIndex] || ""}
                              onChange={(e) =>
                                handleSalaryCut(employee, e.target.value)
                              }
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Typography
                                      variant="body2"
                                      fontWeight="medium"
                                    >
                                      ৳
                                    </Typography>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                width: "120px",
                                "& input": {
                                  textAlign: "right",
                                  paddingRight: "8px",
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              type="number"
                              placeholder="0"
                              value={totalPayment[originalIndex] || ""}
                              InputProps={{
                                readOnly: true,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Typography
                                      variant="body2"
                                      fontWeight="medium"
                                    >
                                      ৳
                                    </Typography>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                width: "120px",
                                "& input": {
                                  textAlign: "right",
                                  paddingRight: "8px",
                                  fontWeight: "bold",
                                  color: theme.palette.success.main,
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              type="number"
                              placeholder="0"
                              value={advance[originalIndex] || ""}
                              onChange={(e) =>
                                handleAdvance(employee, e.target.value)
                              }
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Typography
                                      variant="body2"
                                      fontWeight="medium"
                                    >
                                      ৳
                                    </Typography>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                width: "120px",
                                "& input": {
                                  textAlign: "right",
                                  paddingRight: "8px",
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              type="number"
                              placeholder="0"
                              value={pay[originalIndex] || ""}
                              onChange={(e) =>
                                handlePay(employee, e.target.value)
                              }
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Typography
                                      variant="body2"
                                      fontWeight="medium"
                                    >
                                      ৳
                                    </Typography>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                width: "120px",
                                "& input": {
                                  textAlign: "right",
                                  paddingRight: "8px",
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              type="number"
                              placeholder="0"
                              value={due[originalIndex] || ""}
                              InputProps={{
                                readOnly: true,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Typography
                                      variant="body2"
                                      fontWeight="medium"
                                    >
                                      ৳
                                    </Typography>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                width: "120px",
                                "& input": {
                                  textAlign: "right",
                                  paddingRight: "8px",
                                  fontWeight: "bold",
                                  color:
                                    currentDue > 0
                                      ? theme.palette.error.main
                                      : theme.palette.success.main,
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              size="small"
                              icon={
                                currentDue <= 0 ? <CheckCircle /> : <Warning />
                              }
                              label={currentDue <= 0 ? "Paid" : "Due"}
                              color={currentDue <= 0 ? "success" : "error"}
                              variant={currentDue <= 0 ? "filled" : "outlined"}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color={isEditMode ? "warning" : "primary"}
            size="large"
            disabled={createLoading || updateLoading}
            onClick={handleSubmitSalary}
            startIcon={isEditMode ? <Edit /> : <Save />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            {createLoading || updateLoading
              ? isEditMode
                ? "Updating..."
                : "Submitting..."
              : isEditMode
              ? "Update All Salaries"
              : `Submit Salary ${
                  selectedEmployees.length > 0
                    ? `(${selectedEmployees.length} employees)`
                    : ""
                }`}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EmployeeSalaryForm;
