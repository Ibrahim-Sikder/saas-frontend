/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
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


export default function YearlyIncomeChart() {
  const [radius, setRadius] = React.useState(50);
  const [itemNb, setItemNb] = React.useState(12);
  const [skipAnimation, setSkipAnimation] = React.useState(false);

  const { data: incomeData, isLoading: expenseLoading } = useGetAllIncomesQuery(
    {
      limit: 10,
      page: 1,
    }
  );

  if (expenseLoading) {
    return <Loading />;
  }

  const monthlyIncom = incomeData?.data?.incomes.map((income) => income.amount);

  const dynamicData = monthlyIncom?.map((amount, index) => ({
    label: monthNames[index], 
    value: amount,
  }));

  return (
    <Box sx={{ width: "100%" }}>
      <PieChart
        height={400}
        series={[
          { data: dynamicData, outerRadius: radius },
          {
            data: dynamicData?.slice(0, itemNb),
            innerRadius: radius,
          
            arcLabel: () => "", 
          },
        ]}
        skipAnimation={skipAnimation}
      />
    </Box>
  );
}
