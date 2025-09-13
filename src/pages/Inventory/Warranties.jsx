/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Avatar,
  Card,
  CardContent,
  Divider,
  IconButton,
  Breadcrumbs,
  Link,
  TextField,
  useTheme,
  alpha,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";
import WarrantyModal from "./WarrandyModal";
import { useDeleteWarrantyMutation, useGetAllWarrantyQuery } from "../../redux/api/warrantyApi";
import { useTenantDomain } from "../../hooks/useTenantDomain";

export default function WarrantiesPage() {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [editingWarranty, setEditingWarranty] = useState(null);
  console.log('warranty id check',editingWarranty)
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tenantDomain = useTenantDomain();
  
  const queryParams = {
    tenantDomain,
    limit: 10,
    page: currentPage,
    searchTerm,
  };
  
  const { data: warrantyData, isLoading, refetch } = useGetAllWarrantyQuery(queryParams);
  const [deleteWarranty] = useDeleteWarrantyMutation();
  
  const warranties = warrantyData?.data || [];

  const handleOpenModal = () => {
    setEditingWarranty(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingWarranty(null);
  };

  const handleEditWarranty = (warranty) => {
    setEditingWarranty(warranty);
    setOpenModal(true);
  };

  const handleDeleteWarranty = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6a1b9a',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await deleteWarranty({ tenantDomain, id }).unwrap();
        refetch();
        
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The warranty has been deleted successfully.",
          showConfirmButton: false,
          timer: 2000,
          background: "#fff",
          customClass: {
            title: "text-purple-800 font-medium",
            content: "text-gray-600",
          },
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while deleting the warranty.",
        confirmButtonColor: "#6a1b9a",
      });
    }
  };

  const formatDuration = (duration, type) => {
    const units = { days: "days", months: "months", years: "years" };
    return `${duration} ${units[type] || type}`;
  };

  // Generate a consistent color based on warranty ID
  const generateColor = (id) => {
    const colors = ['#4CAF50', '#2196F3', '#FF9800', '#E91E63', '#9C27B0'];
    const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        background: `linear-gradient(to right, ${alpha(
          theme.palette.primary.light,
          0.1
        )}, ${alpha(theme.palette.background.default, 0.1)})`,
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3 }}
      >
        <Link color="inherit" href="/dashboard">
          Dashboard
        </Link>
        <Link color="inherit" href="/inventory">
          Inventory
        </Link>
        <Typography color="text.primary">Warranties</Typography>
      </Breadcrumbs>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: "text",
            textFillColor: "transparent",
          }}
        >
          <VerifiedUserIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Warranty Management
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            placeholder="Search..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
              ),
            }}
            sx={{ width: { xs: "100%", sm: 220 } }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            }}
          >
            New Warranty
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {warranties.map((warranty) => (
          <WarrantyCard
            key={warranty._id}
            warranty={warranty}
            onEdit={handleEditWarranty}
            onDelete={handleDeleteWarranty}
            formatDuration={formatDuration}
            generateColor={generateColor}
          />
        ))}
      </Grid>

      <WarrantyModal
        open={openModal}
        onClose={handleCloseModal}
        editingWarranty={editingWarranty}
        refetch={refetch}
        tenantDomain={tenantDomain}
      />
    </Box>
  );
}

// Extract Warranty Card component
const WarrantyCard = ({ warranty, onEdit, onDelete, formatDuration, generateColor }) => {
  const color = generateColor(warranty._id);
  
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -15,
            left: 20,
            width: 50,
            height: 50,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(45deg, ${color}, ${alpha(
              color,
              0.8
            )})`,
          }}
        >
          <VerifiedUserIcon fontSize="medium" />
        </Box>
        <CardContent sx={{ pt: 4, flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ color: color }}>
            {warranty.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {warranty.description}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <AccessTimeIcon
              fontSize="small"
              sx={{ mr: 1, color: color }}
            />
            <Typography variant="body2">
              {formatDuration(warranty.duration, warranty.durationType)}
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.8rem' }}>
            Terms: {warranty.terms}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", pt: 1 }}>
            <IconButton size="small" onClick={() => onEdit(warranty)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(warranty._id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};