/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";
import { useGetAllIncomesQuery } from "../../redux/api/income";
import Loading from "../Loading/Loading";
import { useTenantDomain } from "../../hooks/useTenantDomain";

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
   const tenantDomain = useTenantDomain();
 
  const { data: incomeData, isLoading: incomeLoading } = useGetAllIncomesQuery({
    tenantDomain,
    limit: 10,
    page: 1,
  });

  if (incomeLoading) {
    return <Loading />;
  }

  const incomeList = incomeData?.data?.incomes || [];

  if (incomeList.length === 0) {
    return (
      <Box textAlign="center" py={5}>
        <Typography variant="h6" color="textSecondary">
          No income data found.
        </Typography>
      </Box>
    );
  }

  const monthlyIncom = incomeList.map((income) => income.amount || 0);

  const dynamicData = monthlyIncom.map((amount, index) => ({
    label: monthNames[index] || `Month ${index + 1}`,
    value: amount,
  }));

  return (
    <Box sx={{ width: "100%" }}>
      <PieChart
        height={400}
        series={[
          { data: dynamicData, outerRadius: radius },
          {
            data: dynamicData.slice(0, itemNb),
            innerRadius: radius,
            arcLabel: () => "",
          },
        ]}
        skipAnimation={skipAnimation}
      />
    </Box>
  );
}
