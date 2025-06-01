/* eslint-disable no-unused-vars */
"use client";

import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

const PricingPage = () => {
  const theme = useTheme();

  const plans = [
    {
      name: "Monthly",
      price: "$49.99",
      period: "per month",
      description: "Perfect for small garages just getting started",
      features: [
        { name: "Up to 5 users", included: true },
        { name: "Customer management", included: true },
        { name: "Vehicle management", included: true },
        { name: "Job card management", included: true },
        { name: "Basic invoicing", included: true },
        { name: "Email support", included: true },
        { name: "Advanced reporting", included: false },
        { name: "Inventory management", included: false },
        { name: "API access", included: false },
        { name: "White-label option", included: false },
      ],
      buttonText: "Get Started",
      buttonVariant: "outlined",
    },
    {
      name: "Half Yearly",
      price: "$269.99",
      period: "$44.99/month (Save 10%)",
      description: "Great for growing businesses with more needs",
      features: [
        { name: "Up to 10 users", included: true },
        { name: "Customer management", included: true },
        { name: "Vehicle management", included: true },
        { name: "Job card management", included: true },
        { name: "Advanced invoicing", included: true },
        { name: "Priority email support", included: true },
        { name: "Advanced reporting", included: true },
        { name: "Inventory management", included: true },
        { name: "API access", included: false },
        { name: "White-label option", included: false },
      ],
      buttonText: "Get Started",
      buttonVariant: "outlined",
      popular: false,
    },
    {
      name: "Yearly",
      price: "$499.99",
      period: "$41.67/month (Save 15%)",
      description: "For established businesses needing all features",
      features: [
        { name: "Unlimited users", included: true },
        { name: "Customer management", included: true },
        { name: "Vehicle management", included: true },
        { name: "Job card management", included: true },
        { name: "Advanced invoicing", included: true },
        { name: "24/7 phone & email support", included: true },
        { name: "Advanced reporting", included: true },
        { name: "Inventory management", included: true },
        { name: "API access", included: true },
        { name: "White-label option", included: true },
      ],
      buttonText: "Get Started",
      buttonVariant: "contained",
      popular: true,
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Pricing Plans
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Choose the plan that works best for your garage business
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="flex-end">
          {plans.map((plan) => (
            <Grid
              item
              key={plan.name}
              xs={12}
              sm={plan.popular ? 12 : 6}
              md={4}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  ...(plan.popular && {
                    borderColor: "primary.main",
                    borderWidth: 2,
                  }),
                }}
                variant={plan.popular ? "outlined" : "elevation"}
              >
                {plan.popular && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "secondary.main",
                      color: "white",
                      px: 2,
                      py: 0.5,
                      borderBottomLeftRadius: 8,
                    }}
                  >
                    Best Value
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {plan.name}
                  </Typography>
                  <Typography
                    variant="h3"
                    component="div"
                    sx={{ my: 2, fontWeight: "bold" }}
                  >
                    {plan.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {plan.period}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{ mb: 3 }}
                  >
                    {plan.description}
                  </Typography>

                  <Divider sx={{ my: 3 }} />

                  <List sx={{ mb: 2 }}>
                    {plan.features.map((feature) => (
                      <ListItem key={feature.name} disableGutters>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {feature.included ? (
                            <CheckCircle color="success" fontSize="small" />
                          ) : (
                            <Cancel color="disabled" fontSize="small" />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={feature.name}
                          sx={{
                            "& .MuiListItemText-primary": {
                              color: feature.included
                                ? "text.primary"
                                : "text.disabled",
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Box sx={{ mt: "auto", pt: 2 }}>
                    <Button
                      fullWidth
                      variant={plan.buttonVariant}
                      color="primary"
                      component={RouterLink}
                      to="/tenant/register"
                      size="large"
                    >
                      {plan.buttonText}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Need a custom plan?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Contact our sales team for a customized solution that fits your
            specific business needs.
          </Typography>
          <Button
            variant="outlined"
            size="large"
            component={RouterLink}
            to="/contact"
          >
            Contact Sales
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PricingPage;
