/* eslint-disable react/prop-types */
import { Grid, Typography, Box } from "@mui/material";
import {
  LocalShippingOutlined,
  InventoryOutlined,
  ReceiptLongOutlined,
  AssessmentOutlined,
  ArrowUpward,
} from "@mui/icons-material";
import { GradientBox } from "./supplier";

const SupplierMetrics = ({ supplier, paymentStats }) => {
 

const totalGrandTotal = supplier?.purchases?.reduce(
  (sum, purchase) => sum + (purchase?.grandTotal || 0),
  0
);
  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={3}>
        <GradientBox gradientColors="#4CAF50 0%, #8BC34A 100%">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Total Orders
            </Typography>
            <LocalShippingOutlined sx={{ fontSize: 40, opacity: 0.8 }} />
          </Box>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "white", my: 1 }}
          >
            {supplier?.orders?.length || 0}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ArrowUpward sx={{ color: "white", fontSize: 16, mr: 0.5 }} />
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>
              12% increase from last month
            </Typography>
          </Box>
        </GradientBox>
      </Grid>
      <Grid item xs={12} md={3}>
        <GradientBox gradientColors="#2196F3 0%, #03A9F4 100%">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Products
            </Typography>
            <InventoryOutlined sx={{ fontSize: 40, opacity: 0.8 }} />
          </Box>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "white", my: 1 }}
          >
            {supplier?.products?.length || 0}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ArrowUpward sx={{ color: "white", fontSize: 16, mr: 0.5 }} />
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>
              5 new products this month
            </Typography>
          </Box>
        </GradientBox>
      </Grid>
      <Grid item xs={12} md={3}>
        <GradientBox gradientColors="#FF9800 0%, #FFC107 100%">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Total Purchase
            </Typography>
            <ReceiptLongOutlined sx={{ fontSize: 40, opacity: 0.8 }} />
          </Box>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "white", my: 1 }}
          >
              {supplier?.purchases?.length || 0}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ArrowUpward sx={{ color: "white", fontSize: 16, mr: 0.5 }} />
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>
              ৳{paymentStats?.paidAmount?.toLocaleString() || "0"} paid
            </Typography>
          </Box>
        </GradientBox>
      </Grid>
      <Grid item xs={12} md={3}>
        <GradientBox gradientColors="#9C27B0 0%, #673AB7 100%">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Total Spent
            </Typography>
            <AssessmentOutlined sx={{ fontSize: 40, opacity: 0.8 }} />
          </Box>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "white", my: 1 }}
          >
           {totalGrandTotal}
          </Typography>
         
        </GradientBox>
      </Grid>
    </Grid>
  );
};

export default SupplierMetrics;
