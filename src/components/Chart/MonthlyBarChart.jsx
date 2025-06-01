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
  const { data: expenseData, isLoading: incomeLoading } =
    useGetAllExpensesQuery({
      limit: 10,
      page: 1,
    });

  const { data: incomeData, isLoading: expenseLoading } = useGetAllIncomesQuery(
    {
      limit: 10,
      page: 1,
    }
  );

  if (incomeLoading || expenseLoading) {
    return <Loading />;
  }

  const monthlyIncom = incomeData?.data?.incomes.map((income) => income.amount);
  const monthlyExpense = expenseData?.data?.expenses.map(
    (expense) => expense.amount
  );

  const maxLength = Math.max(monthlyIncom?.length, monthlyExpense?.length);

  const monthlyProfit = new Array(maxLength)?.fill(0);

  // Calculate profit for each month
  for (let i = 0; i < maxLength; i++) {
    const income = monthlyIncom[i] || 0;
    const expense = monthlyExpense[i] || 0;
    monthlyProfit[i] = income - expense;
  }

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
