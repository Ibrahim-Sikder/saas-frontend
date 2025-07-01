/* eslint-disable no-unused-vars */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetAllExpensesQuery } from "../../redux/api/expense";
import { useGetAllIncomesQuery } from "../../redux/api/income";
import Loading from "../Loading/Loading";
import { Box, Typography } from "@mui/material";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function StackBars() {
  const tenantDomain = window.location.hostname.split(".")[0];

  const { data: expenseData, isLoading: expenseLoading } = useGetAllExpensesQuery({
    tenantDomain,
    limit: 10,
    page: 1,
  });

  const { data: incomeData, isLoading: incomeLoading } = useGetAllIncomesQuery({
    tenantDomain,
    limit: 10,
    page: 1,
  });

  if (incomeLoading || expenseLoading) {
    return <Loading />;
  }

  const incomeList = incomeData?.data?.incomes || [];
  const expenseList = expenseData?.data?.expenses || [];

  // If both income and expense are empty, show message
  if (incomeList.length === 0 && expenseList.length === 0) {
    return (
      <Box textAlign="center" py={5}>
        <Typography variant="h6" color="textSecondary">
          No data found for income and expense.
        </Typography>
      </Box>
    );
  }

  const monthlyIncom = incomeList.map((income) => income.amount);
  const monthlyExpense = expenseList.map((expense) => expense.amount);

  const maxLength = Math.max(monthlyIncom.length, monthlyExpense.length);
  const monthlyProfit = Array.from({ length: maxLength }, (_, i) => {
    const income = monthlyIncom[i] || 0;
    const expense = monthlyExpense[i] || 0;
    return income - expense;
  });

  const dynamicData = [];
  for (let i = 0; i < 5; i++) {
    dynamicData.push({
      month: monthNames[i],
      Earnings: monthlyIncom[i] || 0,
      Expense: monthlyExpense[i] || 0,
      Profit: monthlyProfit[i] || 0,
    });
  }

  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart
        data={dynamicData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        barCategoryGap="15%"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Earnings" fill="#8884d8" barSize={40} />
        <Bar dataKey="Expense" fill="#82ca9d" barSize={40} />
        <Bar dataKey="Profit" fill="#ffc658" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}
