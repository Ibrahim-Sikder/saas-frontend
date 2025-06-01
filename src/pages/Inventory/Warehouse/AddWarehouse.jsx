/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
"use client";
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Warehouse as WarehouseIcon,
  LocationOn as LocationOnIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Map as MapIcon,
  Business as BusinessIcon,
  LocalPostOffice as PostalIcon,
  Public as CountryIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import GarageForm from "../../../components/form/Form";
import TASInput from "../../../components/form/Input";
import TASSelect from "../../../components/form/Select";
import {
  cityOptions,
  divisionOptions,
  warehouseTypes,
} from "../../../utils/options";
import TASAutocomplete from "../../../components/form/Autocomplete";
import FormTextArea from "../../../components/form/FormTextArea";
import {
  useCreateWarehouseMutation,
  useGetSingleWarehouseQuery,
  useUpdateWarehouseMutation,
} from "../../../redux/api/warehouseApi";
import { toast } from "react-toastify";

const AddWarehouseModal = ({ open, onClose, warehouseId }) => {
  const theme = useTheme();
  const [createWarehouse] = useCreateWarehouseMutation();
  const [updateWarehouse] = useUpdateWarehouseMutation();
  const { data: singleWarehouse, isLoading } =
    useGetSingleWarehouseQuery(warehouseId);

  const handleClose = () => {
    onClose(false);
  };

  const handleSubmit = async (data) => {
    const modifiedData = {
      ...data,
      city: data.city[0],
      division: data.division[0],
    };
    try {
      if (warehouseId) {
        const res = await updateWarehouse({
          id: warehouseId,
          ...modifiedData,
        }).unwrap();
        if (res.success) {
          toast.success("Warehouse update successfully!");
          handleClose();
        }
      } else {
        const res = await createWarehouse(modifiedData).unwrap();
        if (res.success) {
          toast.success(`Warehouse added successfully!`);
          handleClose();
        }
      }
    } catch (error) {
      const apiError = error?.data || error;
      if (apiError?.errorSources?.length > 0) {
        apiError.errorSources.forEach((source) => {
          toast.error(`${source.path}: ${source.message}`);
        });
      } else if (apiError?.message) {
        toast.error(apiError.message);
      } else {
        toast.error("Failed to create warehouse");
      }
    }
  };
  const defaultValue = {
    name: singleWarehouse?.data?.name || "",
    type: singleWarehouse?.data?.type || "",
    manager: singleWarehouse?.data?.manager || "",
    email: singleWarehouse?.data?.email || "",
    phone: singleWarehouse?.data?.phone || "",
    address: singleWarehouse?.data?.address || "",
    city: [singleWarehouse?.data?.city] || [],
    division: [singleWarehouse?.data?.division] || [],
    country: singleWarehouse?.data?.country || "",
    postalCode: singleWarehouse?.data?.postalCode || "",
    code: singleWarehouse?.data?.code || "",
    description: singleWarehouse?.data?.description || "",
    latitude: singleWarehouse?.data?.latitude || "",
    longitude: singleWarehouse?.data?.longitude || "",
    status: singleWarehouse?.data?.status || "active",
  };

  return (
    <>
      {isLoading ? (
        <h3>loading.....</h3>
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <GarageForm onSubmit={handleSubmit} defaultValues={defaultValue}>
            <DialogTitle sx={{ pb: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {warehouseId ? "Update" : "Add New"} Warehouse
              </Typography>
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ pb: 4 }}>
              <Grid container spacing={3} sx={{ mt: 0 }}>
                {/* Basic Information */}
                <Grid item xs={12} md={6}>
                  <TASInput
                    name="name"
                    label="Warehouse Name"
                    icon={WarehouseIcon}
                    fullWidth
                    placeholder="Main Warehouse"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TASInput
                    name="code"
                    label="Warehouse Code"
                    icon={WarehouseIcon}
                    fullWidth
                    placeholder="WH-001"
                  />
                </Grid>

                {/* Warehouse Type */}
                <Grid item xs={12} md={6}>
                  <TASSelect
                    name="type"
                    label="Warehouse Type"
                    items={warehouseTypes}
                    icon={BusinessIcon}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TASSelect
                    name="status"
                    label="Warehouse Status "
                    items={["active", "inactive"]}
                    icon={BusinessIcon}
                  />
                </Grid>

                {/* Location Information */}
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <LocationOnIcon /> Location Details
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <TASInput
                    name="address"
                    label="Street Address"
                    icon={LocationOnIcon}
                    fullWidth
                    placeholder="123 Industrial Area"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TASAutocomplete
                    name="city"
                    label="City"
                    options={cityOptions}
                    icon={LocationOnIcon}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TASAutocomplete
                    name="division"
                    label="Division"
                    options={divisionOptions}
                    icon={BusinessIcon}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TASInput
                    name="postalCode"
                    label="Postal Code"
                    icon={PostalIcon}
                    fullWidth
                    placeholder="12345"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TASInput
                    name="country"
                    label="Country"
                    icon={CountryIcon}
                    fullWidth
                    placeholder="United States"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TASInput
                    name="latitude"
                    label="Latitude"
                    icon={MapIcon}
                    fullWidth
                    placeholder="40.7128° N"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TASInput
                    name="longitude"
                    label="Longitude"
                    icon={MapIcon}
                    fullWidth
                    placeholder="74.0060° W"
                  />
                </Grid>

                {/* Contact Information */}
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <PersonIcon /> Contact Details
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TASInput
                    name="manager"
                    label="Manager Name"
                    icon={PersonIcon}
                    fullWidth
                    placeholder="John Doe"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TASInput
                    name="phone"
                    label="Contact Phone"
                    icon={PhoneIcon}
                    fullWidth
                    placeholder="+1 234 567 890"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TASInput
                    name="email"
                    label="Contact Email"
                    icon={EmailIcon}
                    fullWidth
                    placeholder="contact@warehouse.com"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextArea
                    name="description"
                    label="Additional Notes"
                    icon={DescriptionIcon}
                    fullWidth
                    placeholder="Special storage requirements or other notes..."
                    rows={4}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button
                onClick={handleClose}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  py: 1,
                  px: 3,
                  borderWidth: 2,
                  "&:hover": { borderWidth: 2 },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  borderRadius: 2,
                  py: 1,
                  px: 3,
                  color: "white",
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.light} 90%)`,
                  "&:hover": {
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 40%, ${theme.palette.primary.light} 90%)`,
                  },
                }}
              >
                {warehouseId ? " Update Warehouse" : " Create Warehouse"}
              </Button>
            </DialogActions>
          </GarageForm>
        </Dialog>
      )}
    </>
  );
};

export default AddWarehouseModal;

