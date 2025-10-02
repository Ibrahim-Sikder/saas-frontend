// pages/RoleManagement.js
import { useState } from "react";
import {
  Box,
  Grid,
  Card,
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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Divider,
  Tabs,
  Tab,
  Badge,
  useTheme,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  Visibility,
  Settings,
  Person,
  AssignmentTurnedIn,
  Business,
} from "@mui/icons-material";

const RoleManagement = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);

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

  const roles = [
    {
      id: 1,
      name: "Admin",
      description: "Full access to client operations and user management",
      users: 12,
      status: "Active",
      permissions: 18,
      client: "ABC Motors",
    },
    {
      id: 2,
      name: "Accountant",
      description: "Access to financial operations and reporting",
      users: 8,
      status: "Active",
      permissions: 12,
      client: "XYZ Garage",
    },
    {
      id: 3,
      name: "User",
      description: "Basic access to client and jobcard management",
      users: 48,
      status: "Active",
      permissions: 8,
      client: "Quick Auto",
    },
    {
      id: 4,
      name: "Mechanic",
      description: "Access to jobcard and service operations",
      users: 15,
      status: "Active",
      permissions: 10,
      client: "Super Auto",
    },
  ];

  const permissions = [
    {
      category: "Client Management",
      items: [
        { name: "View Clients", checked: true },
        { name: "Create Clients", checked: true },
        { name: "Edit Clients", checked: true },
        { name: "Delete Clients", checked: false },
      ],
    },
    {
      category: "Jobcard Management",
      items: [
        { name: "View Jobcards", checked: true },
        { name: "Create Jobcards", checked: true },
        { name: "Edit Jobcards", checked: true },
        { name: "Delete Jobcards", checked: false },
      ],
    },
    {
      category: "Invoice Management",
      items: [
        { name: "View Invoices", checked: true },
        { name: "Create Invoices", checked: true },
        { name: "Edit Invoices", checked: true },
        { name: "Delete Invoices", checked: false },
      ],
    },
    {
      category: "Quotation Management",
      items: [
        { name: "View Quotations", checked: true },
        { name: "Create Quotations", checked: true },
        { name: "Edit Quotations", checked: true },
        { name: "Delete Quotations", checked: false },
      ],
    },
    {
      category: "Money Receipt Management",
      items: [
        { name: "View Money Receipts", checked: true },
        { name: "Create Money Receipts", checked: true },
        { name: "Edit Money Receipts", checked: true },
        { name: "Delete Money Receipts", checked: false },
      ],
    },
  ];

  const getRoleColor = (role) => {
    return role === "Admin"
      ? "primary"
      : role === "Accountant"
      ? "secondary"
      : role === "User"
      ? "info"
      : "warning";
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Role Management
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Create and manage user roles with specific permissions for each client
      </Typography>

      <Card elevation={0} sx={{ p: 3, mb: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="bold">
            Roles
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleDialogOpen}
          >
            Add Role
          </Button>
        </Box>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="role tabs"
        >
          <Tab label="All Roles" />
          <Tab label="System Roles" />
          <Tab label="Custom Roles" />
        </Tabs>

        <TableContainer component={Paper} elevation={0} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Role</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Users</TableCell>
                <TableCell>Permissions</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        sx={{
                          bgcolor: getRoleColor(role.name) + ".main",
                          mr: 2,
                        }}
                      >
                        <Settings />
                      </Avatar>
                      <Typography variant="body1" fontWeight={500}>
                        {role.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={<Business />}
                      label={role.client}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <Chip
                      icon={<Person />}
                      label={`${role.users} users`}
                      size="small"
                      variant="outlined"
                      color={getRoleColor(role.name)}
                    />
                  </TableCell>
                  <TableCell>
                    <Badge badgeContent={role.permissions} color="primary">
                      <AssignmentTurnedIn />
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Chip label={role.status} size="small" color="success" />
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
          Permission Matrix
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Admin Permissions
              </Typography>
              <List dense>
                {permissions.map((category, index) => (
                  <div key={index}>
                    <Typography variant="body1" fontWeight={500} mt={1} mb={1}>
                      {category.category}
                    </Typography>
                    {category.items.map((permission, idx) => (
                      <ListItem key={idx} disablePadding>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={true}
                            tabIndex={-1}
                            disableRipple
                          />
                        </ListItemIcon>
                        <ListItemText primary={permission.name} />
                      </ListItem>
                    ))}
                    {index < permissions.length - 1 && (
                      <Divider component="li" />
                    )}
                  </div>
                ))}
              </List>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Accountant Permissions
              </Typography>
              <List dense>
                {permissions.map((category, index) => (
                  <div key={index}>
                    <Typography variant="body1" fontWeight={500} mt={1} mb={1}>
                      {category.category}
                    </Typography>
                    {category.items.map((permission, idx) => (
                      <ListItem key={idx} disablePadding>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={permission.checked}
                            tabIndex={-1}
                            disableRipple
                          />
                        </ListItemIcon>
                        <ListItemText primary={permission.name} />
                      </ListItem>
                    ))}
                    {index < permissions.length - 1 && (
                      <Divider component="li" />
                    )}
                  </div>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Card>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create New Role</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3} mt={1}>
            <TextField
              label="Role Name"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Settings />
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
              <InputLabel>Client</InputLabel>
              <Select label="Client" defaultValue="">
                <MenuItem value="abc">ABC Motors</MenuItem>
                <MenuItem value="xyz">XYZ Garage</MenuItem>
                <MenuItem value="quick">Quick Auto</MenuItem>
                <MenuItem value="super">Super Auto</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="h6" fontWeight="bold" mt={1}>
              Permissions
            </Typography>

            <List dense>
              {permissions.map((category, index) => (
                <div key={index}>
                  <Typography variant="body1" fontWeight={500} mt={1} mb={1}>
                    {category.category}
                  </Typography>
                  {category.items.map((permission, idx) => (
                    <ListItem key={idx} disablePadding>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={false}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText primary={permission.name} />
                    </ListItem>
                  ))}
                  {index < permissions.length - 1 && <Divider component="li" />}
                </div>
              ))}
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleDialogClose}>
            Create Role
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoleManagement;
