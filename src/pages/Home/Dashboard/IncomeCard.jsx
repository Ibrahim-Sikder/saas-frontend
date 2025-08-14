/* eslint-disable react/prop-types */
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import {
  AttachMoney,
  TrendingUp,
  TrendingDown,
  Receipt,
  AccountBalance,
} from "@mui/icons-material";

const DashboardSummary = ({ data }) => {
  // Calculate net profit
  const totalIncome = data?.incomes?.totalIncomeAmount || 0;
  const totalExpense = data?.expense?.totalExpenseAmount || 0;
  const netProfit = totalIncome - totalExpense;
  const profitColor = netProfit >= 0 ? "success" : "error";
  const profitIcon = netProfit >= 0 ? <TrendingUp /> : <TrendingDown />;
  const profitLabel = netProfit >= 0 ? "Profit" : "Loss";

  return (
    <Box p={2}>
      <Grid container spacing={3}>
       

        {/* === Income & Expense Overviews - RIGHT SIDE === */}
        <Grid item xs={12} md={8}>
          {/* === Expense Overview === */}
          <Box mt={3}>
            <Typography variant="h5" fontWeight="bold" color="red" mb={2}>
              💸 Expense Overview
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ backgroundColor: "#ffebee", boxShadow: 3 }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1}>
                      <TrendingDown color="error" />
                      <Typography fontWeight="bold">Total Expense</Typography>
                    </Box>
                    <Typography variant="h6">
                      ৳{" "}
                      {data?.expense?.totalExpenseAmount?.toLocaleString() ||
                        "0"}
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
                      ৳{" "}
                      {data?.expense?.totalInvoiceCost?.toLocaleString() || "0"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ backgroundColor: "#f3e5f5", boxShadow: 3 }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Receipt color="secondary" />
                      <Typography fontWeight="bold">Other Expense</Typography>
                    </Box>
                    <Typography variant="h6">
                      ৳{" "}
                      {data?.expense?.totalOtherExpense?.toLocaleString() ||
                        "0"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
          {/* === Income Overview === */}
          <Box mb={3}>
            <Typography variant="h5" fontWeight="bold" color="green" mb={2}>
              💰 Income Overview
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ backgroundColor: "#e8f5e9", boxShadow: 3 }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1}>
                      <AttachMoney color="success" />
                      <Typography fontWeight="bold">Total Income</Typography>
                    </Box>
                    <Typography variant="h6" fontWeight="bold">
                      ৳{" "}
                      {data?.incomes?.totalIncomeAmount?.toLocaleString() ||
                        "0"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ backgroundColor: "#f1f8e9", boxShadow: 3 }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1}>
                      <TrendingUp color="success" />
                      <Typography fontWeight="bold">Invoice Income</Typography>
                    </Box>
                    <Typography variant="h6">
                      ৳{" "}
                      {data?.incomes?.totalInvoiceIncome?.toLocaleString() ||
                        "0"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ backgroundColor: "#fff3e0", boxShadow: 3 }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Receipt color="warning" />
                      <Typography fontWeight="bold">Other Income</Typography>
                    </Box>
                    <Typography variant="h6">
                      ৳{" "}
                      {data?.incomes?.totalOtherIncome?.toLocaleString() || "0"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>
         {/* === Financial Performance Highlight - LEFT SIDE === */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
            📊 Financial Performance
          </Typography>

          <Card
            sx={{
              backgroundColor: netProfit >= 0 ? "#e8f5e9" : "#ffebee",
              boxShadow: 5,
              borderLeft: `5px solid ${netProfit >= 0 ? "#4caf50" : "#f44336"}`,
              height: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <AccountBalance color={profitColor} />
                <Typography fontWeight="bold">Net {profitLabel}</Typography>
              </Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                color={profitColor}
                sx={{ mt: 2, mb: 1 }}
              >
                {profitIcon} ৳ {Math.abs(netProfit).toLocaleString()}
              </Typography>
              <Box display="flex" alignItems="center" mt={2}>
                <Typography variant="body2" color="text.secondary">
                  <Box component="span" color="success.main">
                    Income: ৳ {totalIncome.toLocaleString()}
                  </Box>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <Box component="span" color="error.main">
                    Expense: ৳ {totalExpense.toLocaleString()}
                  </Box>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardSummary;
