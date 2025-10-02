// pages/FeatureAccess.js
import React, { useState } from 'react';
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
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Tabs,
  Tab,
  LinearProgress,
  useTheme,
  ListItemIcon,
  TextField,
  InputAdornment
} from '@mui/material';
import { 
  Add, 

  FeaturedPlayList,

  Receipt,
  LocalOffer,
  AssignmentTurnedIn,
  Star,
  Diamond,

  CheckCircle,
  Cancel,
  TrendingUp,


  Restore,
  Money,
  Inventory
} from '@mui/icons-material';

const FeatureAccess = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const features = [
    { 
      id: 1, 
      name: 'Client Management', 
      description: 'Add, edit, and manage clients', 
      status: 'Active',
      category: 'Core',
      access: 'All Roles',
      usage: 95,
      icon: <Money />
    },
    { 
      id: 2, 
      name: 'Jobcard Management', 
      description: 'Create and manage jobcards for services', 
      status: 'Active',
      category: 'Core',
      access: 'All Roles',
      usage: 85,
      icon: <AssignmentTurnedIn />
    },
    { 
      id: 3, 
      name: 'Invoice Management', 
      description: 'Generate and manage invoices', 
      status: 'Active',
      category: 'Core',
      access: 'Admin, Accountant',
      usage: 75,
      icon: <Receipt />
    },
    { 
      id: 4, 
      name: 'Quotation Management', 
      description: 'Create and manage quotations', 
      status: 'Active',
      category: 'Core',
      access: 'Admin, Accountant',
      usage: 70,
      icon: <Money />
    },
    { 
      id: 5, 
      name: 'Money Receipt Management', 
      description: 'Manage money receipts and payments', 
      status: 'Active',
      category: 'Core',
      access: 'Admin, Accountant',
      usage: 65,
      icon: <Money />
    },
    { 
      id: 6, 
      name: 'Supplier Management', 
      description: 'Manage suppliers and vendor information', 
      status: 'Limited',
      category: 'Premium',
      access: 'Admin',
      usage: 45,
      icon: <Money />
    },
    { 
      id: 7, 
      name: 'Inventory Management', 
      description: 'Track parts, supplies, and inventory levels', 
      status: 'Limited',
      category: 'Premium',
      access: 'Admin',
      usage: 40,
      icon: <Inventory />
    },
    { 
      id: 8, 
      name: 'Purchase Management', 
      description: 'Manage purchase orders and transactions', 
      status: 'Limited',
      category: 'Premium',
      access: 'Admin',
      usage: 35,
      icon: <Money />
    },
    { 
      id: 9, 
      name: 'HRM Management', 
      description: 'Manage employees and HR operations', 
      status: 'Limited',
      category: 'Premium',
      access: 'Admin',
      usage: 30,
      icon: <Money />
    },
    { 
      id: 10, 
      name: 'Account Management', 
      description: 'Manage financial accounts and transactions', 
      status: 'Disabled',
      category: 'Enterprise',
      access: 'Admin, Accountant',
      usage: 25,
      icon: <Money />
    },
    { 
      id: 11, 
      name: 'Recycle Bin', 
      description: 'Restore deleted items and records', 
      status: 'Disabled',
      category: 'Enterprise',
      access: 'Admin',
      usage: 20,
      icon: <Restore />
    },
  ];

  const featureCategories = [
    { value: 'all', label: 'All Categories' },
    { value: 'core', label: 'Core' },
    { value: 'premium', label: 'Premium' },
    { value: 'enterprise', label: 'Enterprise' },
  ];

  const plans = [
    {
      name: 'Basic',
      price: '$29',
      period: '/month',
      features: [
        'Client Management',
        'Jobcard Management',
        'Basic Dashboard',
        'Standard Reports',
        'Email Support'
      ],
      buttonText: 'Current Plan',
      buttonVariant: 'outlined',
      popular: false,
      icon: <LocalOffer />
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      features: [
        'All Basic Features',
        'Invoice Management',
        'Quotation Management',
        'Money Receipt Management',
        'Priority Support'
      ],
      buttonText: 'Upgrade',
      buttonVariant: 'contained',
      popular: true,
      icon: <Star />
    },
    {
      name: 'Premium',
      price: '$149',
      period: '/month',
      features: [
        'All Professional Features',
        'Supplier Management',
        'Inventory Management',
        'Purchase Management',
        'HRM Management',
        'Dedicated Account Manager'
      ],
      buttonText: 'Upgrade',
      buttonVariant: 'contained',
      popular: false,
      icon: <Diamond />
    }
  ];

  const getStatusColor = (status) => {
    return status === 'Active' ? 'success' : 
           status === 'Limited' ? 'warning' : 'error';
  };

  const getStatusIcon = (status) => {
    return status === 'Active' ? <CheckCircle /> : 
           status === 'Limited' ? <TrendingUp /> : <Cancel />;
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Feature Access Control
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Manage system features, access levels, and subscription plans
      </Typography>
      
      <Card elevation={0} sx={{ p: 3, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">
            System Features
          </Typography>
          <Box display="flex" gap={2}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                defaultValue="all"
              >
                {featureCategories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={handleDialogOpen}
            >
              Add Feature
            </Button>
          </Box>
        </Box>
        
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="feature tabs">
          <Tab label="All Features" />
          <Tab label="Active" />
          <Tab label="Limited" />
          <Tab label="Disabled" />
        </Tabs>
        
        <TableContainer component={Paper} elevation={0} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Feature</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Access</TableCell>
                <TableCell>Usage</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {features.map((feature) => (
                <TableRow key={feature.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar 
                        sx={{ 
                          bgcolor: 
                            feature.status === 'Active' ? 'primary.light' : 
                            feature.status === 'Limited' ? 'warning.light' : 'error.light',
                          color: 
                            feature.status === 'Active' ? 'primary.dark' : 
                            feature.status === 'Limited' ? 'warning.dark' : 'error.dark',
                          mr: 2
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                      <Typography variant="body1" fontWeight={500}>
                        {feature.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{feature.description}</TableCell>
                  <TableCell>
                    <Chip 
                      label={feature.category} 
                      size="small" 
                      color={
                        feature.category === 'Core' ? 'primary' : 
                        feature.category === 'Premium' ? 'secondary' : 'info'
                      }
                    />
                  </TableCell>
                  <TableCell>{feature.access}</TableCell>
                  <TableCell>
                    <Box sx={{ width: '100%' }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={feature.usage} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: 'rgba(0,0,0,0.05)',
                        }} 
                      />
                      <Box display="flex" justifyContent="space-between" mt={0.5}>
                        <Typography variant="caption">{feature.usage}%</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      icon={getStatusIcon(feature.status)} 
                      label={feature.status} 
                      size="small" 
                      color={getStatusColor(feature.status)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Switch
                      checked={feature.status === 'Active'}
                      color="primary"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Card elevation={0} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Feature Access by Role
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Admin Access
              </Typography>
              <List>
                {features.map((feature) => (
                  <ListItem key={feature.id} disablePadding>
                    <ListItemIcon>
                      {feature.access.includes('Admin') ? 
                        <CheckCircle color="success" /> : 
                        <Cancel color="error" />
                      }
                    </ListItemIcon>
                    <ListItemText 
                      primary={feature.name}
                      secondary={feature.access.includes('Admin') ? '' : 'Limited Access'}
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Accountant Access
              </Typography>
              <List>
                {features.map((feature) => (
                  <ListItem key={feature.id} disablePadding>
                    <ListItemIcon>
                      {feature.access.includes('Accountant') ? 
                        <CheckCircle color="success" /> : 
                        <Cancel color="error" />
                      }
                    </ListItemIcon>
                    <ListItemText 
                      primary={feature.name}
                      secondary={feature.access.includes('Accountant') ? '' : 'Limited Access'}
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Card>

      <Card elevation={0} sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Subscription Plans
        </Typography>
        
        <Grid container spacing={3}>
          {plans.map((plan, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  position: 'relative',
                  border: plan.popular ? `2px solid ${theme.palette.primary.main}` : '1px solid rgba(0,0,0,0.08)',
                  borderRadius: 3,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  }
                }}
              >
                {plan.popular && (
                  <Chip 
                    label="POPULAR" 
                    color="primary" 
                    size="small"
                    sx={{ 
                      position: 'absolute', 
                      top: -12, 
                      left: '50%', 
                      transform: 'translateX(-50%)',
                      fontWeight: 'bold',
                      zIndex: 1
                    }}
                  />
                )}
                <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 
                        plan.name === 'Basic' ? 'primary.light' : 
                        plan.name === 'Professional' ? 'secondary.light' : 'info.light',
                      color: 
                        plan.name === 'Basic' ? 'primary.dark' : 
                        plan.name === 'Professional' ? 'secondary.dark' : 'info.dark',
                      mr: 2
                    }}
                  >
                    {plan.icon}
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold">
                    {plan.name}
                  </Typography>
                </Box>
                <Box textAlign="center" mb={3}>
                  <Typography variant="h3" fontWeight="bold" color="primary">
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
                        <AssignmentTurnedIn color="success" />
                      </ListItemAvatar>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
                <Box textAlign="center" mt={3}>
                  <Button 
                    variant={plan.buttonVariant} 
                    color={plan.buttonVariant === 'contained' ? 'primary' : 'inherit'}
                    fullWidth
                    size="large"
                    sx={{ py: 1.5 }}
                  >
                    {plan.buttonText}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>

      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Feature</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3} mt={1}>
            <TextField
              label="Feature Name"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FeaturedPlayList />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                defaultValue=""
              >
                <MenuItem value="core">Core</MenuItem>
                <MenuItem value="premium">Premium</MenuItem>
                <MenuItem value="enterprise">Enterprise</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Access Level</InputLabel>
              <Select
                label="Access Level"
                defaultValue=""
              >
                <MenuItem value="all">All Roles</MenuItem>
                <MenuItem value="admin">Admin Only</MenuItem>
                <MenuItem value="accountant">Accountant Only</MenuItem>
                <MenuItem value="superadmin">Super Admin Only</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleDialogClose}>Add Feature</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FeatureAccess;