/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CalendarToday, Cancel, CheckCircle, Inventory } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Typography,
  Divider,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { useTenantDomain } from "../../../hooks/useTenantDomain";
import { toast } from "react-toastify";
import { useUpdatePurchaseMutation } from "../../../redux/api/purchaseApi";

const ReceiveDialog = ({
  open,
  receiveDate,
  receiveStatus,
  receiveNote,
  purchaseId, // Receive purchase ID from parent
  onClose,
  onReceiveDateChange,
  onReceiveStatusChange,
  onReceiveNoteChange,
}) => {
  const theme = useTheme();
  const tenantDomain = useTenantDomain();
  const [updatePurchase, { isLoading }] = useUpdatePurchaseMutation();

  const handleReceiveOrder = async () => {
    try {
      const res = await updatePurchase({
        tenantDomain,
        id: purchaseId, // Use the passed purchase ID
        receiveDate,
        receiveStatus,
        receiveNote,
      }).unwrap();

      toast.success("Order received successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: "#10B981",
          color: "#fff",
          borderRadius: "10px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        },
      });
      onClose(); // Close the dialog on success
    } catch (error) {
      const errorMessage =
        error.data?.errorSources?.[0]?.message ||
        error.data?.err?.issues?.[0]?.message ||
        error.data?.message ||
        "Failed to receive order";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: "#ef4444",
          color: "#fff",
          borderRadius: "10px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        },
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, display: "flex", alignItems: "center" }}>
        <Avatar
          sx={{
            bgcolor: theme.palette.success.main,
            mr: 2,
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          }}
        >
          <Inventory />
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Receive Order
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Receive Date"
              type="date"
              value={receiveDate}
              onChange={(e) => onReceiveDateChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday fontSize="small" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2 },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Receive Status</InputLabel>
              <Select
                value={receiveStatus}
                label="Receive Status"
                onChange={(e) => onReceiveStatusChange(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="received">Fully Received</MenuItem>
                <MenuItem value="partial">Partially Received</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={3}
              value={receiveNote}
              onChange={(e) => onReceiveNoteChange(e.target.value)}
              InputProps={{ sx: { borderRadius: 2 } }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          startIcon={<Cancel />}
          sx={{ borderRadius: 2 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleReceiveOrder} // Use the new handler
          variant="contained"
          color="primary"
          disabled={isLoading} // Disable while loading
          startIcon={<CheckCircle/>}
          sx={{
            borderRadius: 2,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            "&:disabled": {
              background: theme.palette.grey[300],
            },
          }}
        >
          {isLoading ? "Processing..." : "Confirm Receipt"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReceiveDialog;