// pages/ClientManagement.js
import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Tabs,
  Tab,
  Badge,
  TextField,
  InputAdornment,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import {
  Search,
  Add,
  MoreVert,
  Edit,
  Delete,
  Visibility,
  FilterList,
  Person,
  Email,
  Phone,
  Business,
  Shield,
  Key,
  CheckCircle,
  Cancel,
  Star,
  LocalOffer,
} from "@mui/icons-material";

const ClientManagement = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [filterPlan, setFilterPlan] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const clients = [
    {
      id: 1,
      name: "ABC Motors",
      email: "contact@abcmotors.com",
      phone: "+1 (555) 123-4567",
      plan: "Premium",
      status: "Active",
      users: 12,
      features: [
        "Client Management",
        "Jobcard",
        "Invoice",
        "Quotation",
        "Money Receipt",
      ],
      created: "2023-01-15",
    },
    {
      id: 2,
      name: "XYZ Garage",
      email: "info@xyzgarage.com",
      phone: "+1 (555) 987-6543",
      plan: "Professional",
      status: "Active",
      users: 8,
      features: ["Client Management", "Jobcard", "Invoice"],
      created: "2023-02-20",
    },
    {
      id: 3,
      name: "Quick Auto",
      email: "hello@quickauto.com",
      phone: "+1 (555) 456-7890",
      plan: "Basic",
      status: "Active",
      users: 5,
      features: ["Client Management", "Jobcard"],
      created: "2023-03-10",
    },
    {
      id: 4,
      name: "Super Auto",
      email: "admin@superauto.com",
      phone: "+1 (555) 234-5678",
      plan: "Premium",
      status: "Inactive",
      users: 15,
      features: [
        "Client Management",
        "Jobcard",
        "Invoice",
        "Quotation",
        "Money Receipt",
        "Supplier",
      ],
      created: "2023-04-05",
    },
  ];

  const plans = [
    { value: "all", label: "All Plans" },
    { value: "basic", label: "Basic" },
    { value: "professional", label: "Professional" },
    { value: "premium", label: "Premium" },
  ];

  const subscriptionPlans = [
    {
      name: "Basic",
      price: "$29",
      period: "/month",
      features: [
        "Client Management",
        "Jobcard Management",
        "Basic Dashboard",
        "Standard Reports",
        "Email Support",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      features: [
        "All Basic Features",
        "Invoice Management",
        "Quotation Management",
        "Money Receipt Management",
        "Priority Support",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "$149",
      period: "/month",
      features: [
        "All Professional Features",
        "Supplier Management",
        "Inventory Management",
        "Purchase Management",
        "HRM Management",
        "Account Management",
        "Dedicated Account Manager",
      ],
      popular: false,
    },
  ];

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan =
      filterPlan === "all" ||
      client.plan.toLowerCase().includes(filterPlan.toLowerCase());
    return matchesSearch && matchesPlan;
  });

  const getPlanColor = (plan) => {
    return plan === "Premium"
      ? "primary"
      : plan === "Professional"
      ? "secondary"
      : "info";
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Client Management
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Manage your tenants (clients) and their subscription plans
      </Typography>

      <Card elevation={0} sx={{ p: 3, mb: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="bold">
            Clients
          </Typography>
          <Box display="flex" gap={2}>
            <TextField
              placeholder="Search clients..."
              size="small"
              sx={{ width: 250 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Filter by Plan</InputLabel>
              <Select
                value={filterPlan}
                label="Filter by Plan"
                onChange={(e) => setFilterPlan(e.target.value)}
              >
                {plans.map((plan) => (
                  <MenuItem key={plan.value} value={plan.value}>
                    {plan.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleDialogOpen}
            >
              Add Client
            </Button>
          </Box>
        </Box>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="client tabs"
        >
          <Tab label="All Clients" />
          <Tab label="Active" />
          <Tab label="Inactive" />
        </Tabs>

        <TableContainer component={Paper} elevation={0} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Client</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Plan</TableCell>
                <TableCell>Features</TableCell>
                <TableCell>Users</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ mr: 2 }}>{client.name.charAt(0)}</Avatar>
                      <Typography variant="body1" fontWeight={500}>
                        {client.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Box display="flex" alignItems="center" mb={0.5}>
                        <Email fontSize="small" color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2">{client.email}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <Phone fontSize="small" color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2">{client.phone}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={<LocalOffer />}
                      label={client.plan}
                      size="small"
                      color={getPlanColor(client.plan)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                      {client.features.slice(0, 2).map((feature, idx) => (
                        <Chip
                          key={idx}
                          label={feature}
                          size="small"
                          variant="outlined"
                          color={getPlanColor(client.plan)}
                        />
                      ))}
                      {client.features.length > 2 && (
                        <Chip
                          label={`+${client.features.length - 2} more`}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={<Person />}
                      label={`${client.users} users`}
                      size="small"
                      variant="outlined"
                      color={getPlanColor(client.plan)}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={client.status}
                      size="small"
                      color={client.status === "Active" ? "success" : "error"}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={handleMenuClick}>
                      <MoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleMenuClose}>
                        <Visibility fontSize="small" sx={{ mr: 1 }} /> View
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>
                        <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>
                        <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Card elevation={0} sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Subscription Plans
        </Typography>

        <Grid container spacing={3}>
          {subscriptionPlans.map((plan, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  position: "relative",
                  border: plan.popular
                    ? `2px solid ${theme.palette.primary.main}`
                    : "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 3,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                {plan.popular && (
                  <Chip
                    label="POPULAR"
                    color="primary"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontWeight: "bold",
                      zIndex: 1,
                    }}
                  />
                )}
                <Box textAlign="center" mb={2}>
                  <Typography variant="h5" fontWeight="bold">
                    {plan.name}
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color="primary"
                    mt={1}
                  >
                    {plan.price}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {plan.period}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <List dense>
                  {plan.features.map((feature, idx) => (
                    <ListItem key={idx} disablePadding>
                      <ListItemAvatar>
                        <CheckCircle color="success" />
                      </ListItemAvatar>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
                <Box textAlign="center" mt={3}>
                  <Button
                    variant={plan.popular ? "contained" : "outlined"}
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ py: 1.5 }}
                  >
                    {plan.popular ? "Choose Plan" : "Upgrade"}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Client</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3} mt={1}>
            <TextField
              label="Client Name"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Business />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl fullWidth>
              <InputLabel>Subscription Plan</InputLabel>
              <Select label="Subscription Plan" defaultValue="">
                <MenuItem value="basic">Basic - $29/month</MenuItem>
                <MenuItem value="professional">
                  Professional - $79/month
                </MenuItem>
                <MenuItem value="premium">Premium - $149/month</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleDialogClose}>
            Add Client
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClientManagement;
