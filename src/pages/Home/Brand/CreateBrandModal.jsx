/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
  Dialog,
  DialogContent,
  CircularProgress,
  alpha,
  Fade,
  Zoom,
} from "@mui/material";

import {
  Category as CategoryIcon,
  CheckCircle as CheckCircleIcon,
  PhotoCamera as PhotoCameraIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  BrandingWatermark,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import GarageForm from "../../../components/form/Form";
import ImageUpload from "../../../components/form/ImageUpload";
import TASInput from "../../../components/form/Input";
import { useCreateBrandMutation } from "../../../redux/api/brandApi";

export const CreateBrandModal = ({ open, setOpen, categoryId }) => {
  const [createBrand, { isLoading, isSuccess }] = useCreateBrandMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brand: "",
    image: "",
  });

  const handleSubmit = async (data) => {
    console.log(data);
    try {

      const res = await createBrand({
        ...data,
      }).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Brand created successfully!");
        setOpen();
      }
    } catch (error) {
      toast.error(
        "Error creating brand: " + (error.message || "Something went wrong")
      );
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Dialog
      open={open}
      onClose={() => !isLoading && !isSuccess && setOpen(false)}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}
    >
      <Fade in={isSuccess} timeout={700}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(255, 255, 255, 0.9)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Zoom in={isSuccess} timeout={500}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: alpha("#2e7d32", 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 50, color: "#2e7d32" }} />
            </Box>
          </Zoom>
          <Typography variant="h6" color="#2e7d32" fontWeight={600}>
            Category Updated Successfully!
          </Typography>
        </Box>
      </Fade>

      <Box
        sx={{
          background: "linear-gradient(135deg, #6a1b9a 0%, #4a148c 100%)",
          py: 2,
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CategoryIcon sx={{ color: "white", mr: 1.5, fontSize: 28 }} />
          <Typography
            variant="h6"
            component="h2"
            sx={{ color: "white", fontWeight: 600 }}
          >
            Create Brand
          </Typography>
        </Box>
        <IconButton
          onClick={() => !isLoading && !isSuccess && setOpen(false)}
          sx={{
            color: "white",
            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          <GarageForm onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* <Grid item xs={12}>
                <ImageUpload
                  fullWidth
                  name="image"
                  label="Upload Brand Image"
                />
              </Grid> */}

              <Grid item xs={12}>
                <TASInput
                  name="brand"
                  label="Brand Name "
                  placeholder="Brand Name"
                  required
                  icon={BrandingWatermark}
                  iconPosition="start"
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  startIcon={
                    isLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <SaveIcon />
                    )
                  }
                  sx={{
                    borderRadius: 100,
                    background:
                      "linear-gradient(135deg, #6a1b9a 0%, #4a148c 100%)",
                    boxShadow: "0 4px 10px rgba(106, 27, 154, 0.3)",
                    py: 1.5,
                    textTransform: "none",
                    fontSize: "1rem",
                    color: "white",
                  }}
                >
                  Create Brand
                </Button>
              </Grid>
            </Grid>
          </GarageForm>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
