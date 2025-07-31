/* eslint-disable react/prop-types */
// DashboardSummary.tsx
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import {
  AttachMoney,
  TrendingUp,
  TrendingDown,
  Receipt,
  Assessment,
} from "@mui/icons-material";

const DashboardSummary = ({ data }) => {


  return (
    <Box p={2}>
      <Grid container spacing={3}>
        {/* === Income Overview === */}
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="bold" color="green">
            💰 Income Overview
          </Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: "#e8f5e9", boxShadow: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <AttachMoney color="success" />
                <Typography fontWeight="bold">Total Income</Typography>
              </Box>
              <Typography variant="h6" fontWeight="bold">
                ৳ {data?.incomes?.totalIncomeAmount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: "#f1f8e9", boxShadow: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <TrendingUp color="success" />
                <Typography fontWeight="bold">Invoice Income</Typography>
              </Box>
              <Typography variant="h6">
                ৳ {data?.incomes?.totalInvoiceIncome.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: "#fff3e0", boxShadow: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <Receipt color="warning" />
                <Typography fontWeight="bold">Service Income</Typography>
              </Box>
              <Typography variant="h6">
                ৳ {data?.incomes?.serviceIncomeAmount.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: "#ede7f6", boxShadow: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <Assessment color="primary" />
                <Typography fontWeight="bold">Parts Income</Typography>
              </Box>
              <Typography variant="h6">
                ৳ {data?.incomes?.partsIncomeAmount.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* === Expense Overview === */}
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="bold" color="red">
            💸 Expense Overview
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: "#ffebee", boxShadow: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <TrendingDown color="error" />
                <Typography fontWeight="bold">Total Expense</Typography>
              </Box>
              <Typography variant="h6">
                ৳ {data?.expense?.totalExpenseAmount.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: "#fbe9e7", boxShadow: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <Receipt color="error" />
                <Typography fontWeight="bold">Invoice Cost</Typography>
              </Box>
              <Typography variant="h6">
                ৳ {data?.expense?.totalInvoiceCost.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: "#f3e5f5", boxShadow: 3 }}>
            <CardContent>
              <Typography fontWeight="bold">Total Other Expense</Typography>
              <Typography variant="h6">
                ৳ {data?.expense?.totalOtherExpense.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardSummary;
