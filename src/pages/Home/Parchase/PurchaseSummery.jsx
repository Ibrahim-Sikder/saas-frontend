// components/InvoiceSummary.js
import { Box, Typography, Grid } from '@mui/material';

const PurchaseSummery = () => {
  const summaryData = [
    { label: 'Total Amount', value: '$1,220' },
    { label: 'Order Tax', value: '$61' },
    { label: 'Discount', value: '$77' },
    { label: 'Shipping', value: '$0' },
    { label: 'Grand Total', value: '$1,204', isBold: true },
  ];

  return (
   <div className="flex justify-end">
     <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#fff',
        padding: 2,
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',

      }}
    >
      {summaryData.map((item, index) => (
        <Grid
          container
          key={index}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            borderBottom: index < summaryData.length - 1 ? '1px solid #ddd' : 'none',
            paddingY: 1,
          }}
        >
          <Grid item>
            <Typography
              sx={{
                fontWeight: item.isBold ? 'bold' : 'normal',
              }}
            >
              {item.label}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              sx={{
                fontWeight: item.isBold ? 'bold' : 'normal',
              }}
            >
              {item.value}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Box>
   </div>
  );
};

export default PurchaseSummery;
