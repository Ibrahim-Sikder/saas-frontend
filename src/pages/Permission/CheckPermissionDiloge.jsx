/* eslint-disable react/prop-types */

import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, FormControl, InputLabel, Select, MenuItem, Avatar, Typography, Box, Button, Alert, useTheme, alpha } from "@mui/material";
import { Pageview, Person, Add, Edit, Delete, Visibility, GppGood, GppBad } from "@mui/icons-material";

const CheckPermissionDialog = ({ 
  open, 
  handleClose, 
  checkPermissionForm, 
  handleCheckFormChange, 
  handleCheckPermission, 
  users, 
  pages, 
  showResult, 
  permissionResult 
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, overflow: "hidden" },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: alpha(theme.palette.secondary.main, 0.05),
          py: 3,
        }}
      >
        <Box display="flex" alignItems="center">
          <Avatar
            sx={{
              width: 56,
              height: 56,
              mr: 2,
              bgcolor: alpha(theme.palette.secondary.main, 0.1),
              color: theme.palette.secondary.main,
            }}
          >
            <Pageview />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Check Permission
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Verify if a user has permission to perform an action
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>User</InputLabel>
              <Select
                name="userId"
                value={checkPermissionForm.userId}
                onChange={handleCheckFormChange}
                label="User"
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          mr: 2,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                        }}
                      >
                        <Person fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography variant="body2">{user.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Page</InputLabel>
              <Select
                name="pageId"
                value={checkPermissionForm.pageId}
                onChange={handleCheckFormChange}
                label="Page"
              >
                {pages.map((page) => (
                  <MenuItem key={page.id} value={page.id}>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          mr: 2,
                          bgcolor: alpha(theme.palette.info.main, 0.1),
                          color: theme.palette.info.main,
                        }}
                      >
                        {page.icon}
                      </Avatar>
                      {page.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Action</InputLabel>
              <Select
                name="action"
                value={checkPermissionForm.action}
                onChange={handleCheckFormChange}
                label="Action"
              >
                <MenuItem value="create">
                  <Box display="flex" alignItems="center">
                    <Add fontSize="small" sx={{ mr: 1 }} />
                    Create
                  </Box>
                </MenuItem>
                <MenuItem value="edit">
                  <Box display="flex" alignItems="center">
                    <Edit fontSize="small" sx={{ mr: 1 }} />
                    Edit
                  </Box>
                </MenuItem>
                <MenuItem value="view">
                  <Box display="flex" alignItems="center">
                    <Visibility fontSize="small" sx={{ mr: 1 }} />
                    View
                  </Box>
                </MenuItem>
                <MenuItem value="delete">
                  <Box display="flex" alignItems="center">
                    <Delete fontSize="small" sx={{ mr: 1 }} />
                    Delete
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {showResult && (
          <Alert
            severity={permissionResult ? "success" : "error"}
            sx={{ mt: 3 }}
            icon={permissionResult ? <GppGood /> : <GppBad />}
          >
            <Typography variant="body1" fontWeight={500}>
              {permissionResult
                ? "Permission Granted"
                : "Permission Denied"}
            </Typography>
            <Typography variant="body2">
              {permissionResult
                ? "The user has permission to perform this action."
                : "The user does not have permission to perform this action."}
            </Typography>
          </Alert>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose}>Close</Button>
        <Button
          variant="contained"
          onClick={handleCheckPermission}
          startIcon={<Pageview />}
          sx={{ borderRadius: 2 }}
        >
          Check Permission
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckPermissionDialog;