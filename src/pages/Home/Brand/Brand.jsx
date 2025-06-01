/* eslint-disable no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Avatar,
  TextField,
  InputAdornment,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
  Chip,
  Card,
  CardContent,
  Skeleton,
  useTheme,
  alpha,
} from "@mui/material";
import {
  ControlPoint,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  Sort as SortIcon,
  Bookmark as BookmarkIcon,
  Star as StarIcon,
  MoreVert as MoreIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  useDeleteBrandMutation,
  useGetAllIBrandQuery,
} from "../../../redux/api/brandApi";
import { CreateBrandModal } from "./CreateBrandModal";
import { UpdateBrand } from "./UpdateBrand";

// Custom animated components using framer-motion
const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function BrandList() {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(12);
  // Grid view removed as requested
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    id: null,
  });
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(null);
  const handleUpdateOpen = (id) => setUpdateOpen(id);
  const handleUpdateClose = () => setUpdateOpen(null);
  const [sortBy, setSortBy] = useState("recent"); // "name" or "recent"
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { data, isLoading, refetch } = useGetAllIBrandQuery({
    limit: pageSize,
    page: currentPage,
    searchTerm: search,
  });

  const [deleteBrand, { isLoading: isDeleting }] = useDeleteBrandMutation();

  // Safely extract brands and meta data with fallbacks
  const brands = data?.data?.brands || [];
  const meta = data?.data?.meta || {};
  const totalPage = meta.totalPage || 1;
  const total = meta.total || 0;

  // Simulate initial loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteConfirm = (id) => {
    setConfirmDelete({ open: true, id });
  };

  const handleDeleteCancel = () => {
    setConfirmDelete({ open: false, id: null });
  };

  const handleDeleteBrand = async () => {
    if (!confirmDelete.id) return;

    try {
      await deleteBrand(confirmDelete.id).unwrap();
      Swal.fire({
        title: "Deleted!",
        text: "The brand has been deleted successfully.",
        icon: "success",
        confirmButtonColor: "#6366f1",
        iconColor: "#6366f1",
        showClass: {
          popup: "animate__animated animate__fadeInUp",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown",
        },
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the brand.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setConfirmDelete({ open: false, id: null });
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleSortBy = () => {
    setSortBy((prev) => (prev === "name" ? "recent" : "name"));
  };

  // Sort brands based on current sort setting
  const sortedBrands = [...brands].sort((a, b) => {
    if (sortBy === "name") {
      return a.brand.localeCompare(b.brand);
    }
    // For "recent" sort, we'll use the ID as a proxy for creation time
    return b._id.localeCompare(a._id);
  });

  // Generate random colors for brand cards
  const getRandomColor = (id) => {
    const colors = [
      "#6366f1", // Indigo
      "#8b5cf6", // Violet
      "#ec4899", // Pink
      "#f43f5e", // Rose
      "#f97316", // Orange
      "#eab308", // Yellow
      "#10b981", // Emerald
      "#06b6d4", // Cyan
      "#3b82f6", // Blue
    ];
    // Use the id to deterministically select a color
    const index =
      id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      colors.length;
    return colors[index];
  };

  // Pagination component
  const Pagination = () => (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        {/* Create an array of the appropriate length for pagination buttons */}
        {Array.from({ length: Math.min(totalPage, 5) }, (_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? "contained" : "outlined"}
            onClick={() => handlePageChange(i + 1)}
            sx={{
              minWidth: "40px",
              height: "40px",
              p: 0,
              borderRadius: "10px",
              backgroundColor:
                currentPage === i + 1 ? "#6366f1" : "transparent",
              borderColor: currentPage === i + 1 ? "#6366f1" : "#e2e8f0",
              color: currentPage === i + 1 ? "white" : "#64748b",
              "&:hover": {
                backgroundColor: currentPage === i + 1 ? "#4f46e5" : "#f8fafc",
                borderColor: currentPage === i + 1 ? "#4f46e5" : "#cbd5e1",
              },
            }}
          >
            {i + 1}
          </Button>
        ))}
        {totalPage > 5 && (
          <Button
            disabled
            sx={{
              minWidth: "40px",
              height: "40px",
              p: 0,
              borderRadius: "10px",
              backgroundColor: "transparent",
              color: "#64748b",
            }}
          >
            ...
          </Button>
        )}
      </Box>
    </Box>
  );

  // Empty state component
  const EmptyState = () => (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        px: 3,
        textAlign: "center",
      }}
    >
      <Box
        component="img"
        src="/placeholder.svg?height=200&width=200"
        alt="No brands found"
        sx={{ mb: 3, width: 200, height: 200 }}
      />
      <Typography variant="h5" fontWeight="700" color="#1e293b" gutterBottom>
        {search ? "No matching brands found" : "No brands yet"}
      </Typography>
      <Typography variant="body1" color="#64748b" sx={{ maxWidth: 500, mb: 4 }}>
        {search
          ? "We couldn't find any brands matching your search. Try a different search term or clear the search."
          : "Get started by creating your first brand. Brands help you organize your products and make them easier to find."}
      </Typography>
      <Button
        variant="contained"
        onClick={handleOpen}
        startIcon={<ControlPoint />}
        sx={{
          borderRadius: "12px",
          backgroundColor: "#6366f1",
          px: 4,
          py: 1.5,
          boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3)",
          "&:hover": {
            backgroundColor: "#4f46e5",
            boxShadow: "0 15px 20px -3px rgba(99, 102, 241, 0.4)",
          },
        }}
      >
        Create Your First Brand
      </Button>
    </MotionBox>
  );

  // List view for brands
  const ListView = () => (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{ mt: 3 }}
    >
      {sortedBrands.map((brand, index) => {
        const brandColor = getRandomColor(brand._id);

        return (
          <MotionCard
            key={brand._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{
              x: 5,
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              transition: { duration: 0.2 },
            }}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #e2e8f0",
              backgroundColor: "#fff",
              mb: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                backgroundColor: alpha(brandColor, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                m: 2,
                borderRadius: "12px",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.5,
                  backgroundImage: `radial-gradient(circle at 20% 30%, ${alpha(
                    brandColor,
                    0.4
                  )} 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${alpha(
                    brandColor,
                    0.3
                  )} 0%, transparent 50%)`,
                }}
              />
              <Avatar
                src={brand.image}
                alt={brand.brand}
                variant="rounded"
                sx={{
                  width: 50,
                  height: 50,
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  border: "3px solid #fff",
                  backgroundColor: "#fff",
                  zIndex: 1,
                }}
              />
            </Box>
            <Box sx={{ flex: 1, p: 2 }}>
              <Typography
                variant="h6"
                fontWeight="700"
                color="#1e293b"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {brand.brand}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
              >
                <Chip
                  size="small"
                  label="Active"
                  sx={{
                    backgroundColor: alpha(brandColor, 0.1),
                    color: brandColor,
                    fontWeight: 600,
                    borderRadius: "8px",
                  }}
                />
                <Typography variant="body2" color="#64748b">
                  {/* In a real app, you'd show the product count */}
                  {Math.floor(Math.random() * 50) + 1} Products
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1, p: 2 }}>
              <Tooltip title="Edit Brand">
                <IconButton
                  onClick={() => handleUpdateOpen(brand._id)}
                  size="small"
                  sx={{
                    backgroundColor: "#f8fafc",
                    "&:hover": {
                      backgroundColor: "#f1f5f9",
                    },
                  }}
                >
                  <EditIcon fontSize="small" sx={{ color: "#64748b" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Brand">
                <IconButton
                  size="small"
                  onClick={() => handleDeleteConfirm(brand._id)}
                  sx={{
                    backgroundColor: "#f8fafc",
                    "&:hover": {
                      backgroundColor: "#f1f5f9",
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" sx={{ color: "#64748b" }} />
                </IconButton>
              </Tooltip>
            </Box>
          </MotionCard>
        );
      })}
    </MotionBox>
  );

  // Loading skeleton
  const LoadingSkeleton = () => (
    <Box sx={{ mt: 3 }}>
      <Box>
        {/* Create an array of the appropriate length for skeleton list items */}
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Card
              key={index}
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #e2e8f0",
                mb: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ m: 2 }}>
                <Skeleton
                  variant="rectangular"
                  width={80}
                  height={80}
                  animation="wave"
                  sx={{ borderRadius: "12px" }}
                />
              </Box>
              <Box sx={{ flex: 1, p: 2 }}>
                <Skeleton
                  variant="text"
                  width="40%"
                  height={30}
                  animation="wave"
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 0.5,
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={60}
                    height={24}
                    animation="wave"
                    sx={{ borderRadius: "8px" }}
                  />
                  <Skeleton
                    variant="text"
                    width="20%"
                    height={20}
                    animation="wave"
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 1, p: 2 }}>
                <Skeleton
                  variant="circular"
                  width={36}
                  height={36}
                  animation="wave"
                />
                <Skeleton
                  variant="circular"
                  width={36}
                  height={36}
                  animation="wave"
                />
              </Box>
            </Card>
          ))}
      </Box>
    </Box>
  );

  return (
    <Fade in={true} timeout={500}>
      <Box sx={{ padding: { xs: "4px", md: "24px" } }}>
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight="800"
              sx={{
                background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              Brand Management
            </Typography>
            <Typography variant="body1" color="#64748b">
              Manage your product brands and organize your inventory
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleOpen}
            startIcon={<ControlPoint />}
            sx={{
              mt: { xs: 2, md: 0 },
              borderRadius: "12px",
              backgroundColor: "#6366f1",
              px: 3,
              py: 1.5,
              boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3)",
              "&:hover": {
                backgroundColor: "#4f46e5",
                boxShadow: "0 15px 20px -3px rgba(99, 102, 241, 0.4)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s ease",
              color: "white",
            }}
          >
            Create Brand
          </Button>
        </MotionBox>

        {/* Stats Cards */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            gap: 3,
            mb: 4,
          }}
        >
          <Card
            sx={{
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              backgroundColor: "#fff",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: "30%",
                background:
                  "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0) 100%)",
                zIndex: 0,
              }}
            />
            <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  sx={{
                    backgroundColor: "rgba(99, 102, 241, 0.1)",
                    color: "#6366f1",
                    width: 48,
                    height: 48,
                  }}
                >
                  <BookmarkIcon />
                </Avatar>
              </Box>
              <Typography variant="h5" fontWeight="700" color="#1e293b">
                {isLoading ? <Skeleton width={60} /> : total}
              </Typography>
              <Typography variant="body2" color="#64748b">
                Total Brands
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              backgroundColor: "#fff",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: "30%",
                background:
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0) 100%)",
                zIndex: 0,
              }}
            />
            <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  sx={{
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                    color: "#8b5cf6",
                    width: 48,
                    height: 48,
                  }}
                >
                  <StarIcon />
                </Avatar>
              </Box>
              <Typography variant="h5" fontWeight="700" color="#1e293b">
                {isLoading ? (
                  <Skeleton width={60} />
                ) : (
                  Math.floor(Math.random() * 100) + 50
                )}
              </Typography>
              <Typography variant="body2" color="#64748b">
                Active Products
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              backgroundColor: "#fff",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: "30%",
                background:
                  "linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(236, 72, 153, 0) 100%)",
                zIndex: 0,
              }}
            />
            <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  sx={{
                    backgroundColor: "rgba(236, 72, 153, 0.1)",
                    color: "#ec4899",
                    width: 48,
                    height: 48,
                  }}
                >
                  <MoreIcon />
                </Avatar>
              </Box>
              <Typography variant="h5" fontWeight="700" color="#1e293b">
                {isLoading ? (
                  <Skeleton width={60} />
                ) : (
                  Math.floor(Math.random() * 5) + 3
                )}
              </Typography>
              <Typography variant="body2" color="#64748b">
                Brand
              </Typography>
            </CardContent>
          </Card>
        </MotionBox>

        {/* Main Content */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #e2e8f0",
              backgroundColor: "#fff",
            }}
          >
            {/* Toolbar */}
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 2,
                borderBottom: "1px solid #e2e8f0",
                backgroundColor: "#f8fafc",
              }}
            >
              <TextField
                placeholder="Search brands..."
                variant="outlined"
                size="small"
                value={search}
                onChange={handleSearch}
                sx={{
                  minWidth: { xs: "100%", sm: "300px" },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                    "&:hover": {
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ display: "flex", gap: 1 }}>
                <Tooltip
                  title={`Sort by ${sortBy === "name" ? "Recent" : "Name"}`}
                >
                  <IconButton
                    onClick={toggleSortBy}
                    size="small"
                    sx={{
                      backgroundColor: "#f1f5f9",
                      "&:hover": { backgroundColor: "#e2e8f0" },
                    }}
                  >
                    <SortIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Refresh">
                  <IconButton
                    onClick={() => refetch()}
                    size="small"
                    sx={{
                      backgroundColor: "#f1f5f9",
                      "&:hover": { backgroundColor: "#e2e8f0" },
                    }}
                  >
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Filter">
                  <IconButton
                    size="small"
                    sx={{
                      backgroundColor: "#f1f5f9",
                      "&:hover": { backgroundColor: "#e2e8f0" },
                    }}
                  >
                    <FilterIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Content */}
            <Box sx={{ p: 3 }}>
              {isInitialLoad || isLoading ? (
                <LoadingSkeleton />
              ) : sortedBrands.length === 0 ? (
                <EmptyState />
              ) : (
                <ListView />
              )}

              {/* Pagination */}
              {sortedBrands.length > 0 && totalPage > 1 && <Pagination />}
            </Box>
          </Card>
        </MotionBox>

        {/* Create Brand Modal */}
        {open && <CreateBrandModal open={open} setOpen={setOpen} />}
        {updateOpen && (
          <UpdateBrand
            open={Boolean(updateOpen)}
            setOpen={handleUpdateClose}
            brandId={updateOpen}
          />
        )}
        {/* Delete Confirmation Dialog */}
        <Dialog
          open={confirmDelete.open}
          onClose={handleDeleteCancel}
          PaperProps={{
            sx: {
              borderRadius: "16px",
              maxWidth: "400px",
              width: "100%",
              overflow: "hidden",
            },
          }}
        >
          <DialogTitle sx={{ pb: 1, pt: 3, px: 3 }}>
            <Typography variant="h5" fontWeight="700">
              Delete Brand
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ px: 3 }}>
            <Typography variant="body1" color="#475569">
              Are you sure you want to delete this brand? This action cannot be
              undone and will remove all associated data.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 2 }}>
            <Button
              onClick={handleDeleteCancel}
              variant="outlined"
              sx={{
                borderRadius: "12px",
                color: "#64748b",
                borderColor: "#cbd5e1",
                "&:hover": {
                  borderColor: "#94a3b8",
                  backgroundColor: "#f8fafc",
                },
                px: 3,
                py: 1,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteBrand}
              variant="contained"
              disabled={isDeleting}
              sx={{
                borderRadius: "12px",
                backgroundColor: "#ef4444",
                "&:hover": {
                  backgroundColor: "#dc2626",
                },
                px: 3,
                py: 1,
                boxShadow: "0 4px 6px -1px rgba(239, 68, 68, 0.2)",
              }}
            >
              {isDeleting ? "Deleting..." : "Delete Brand"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fade>
  );
}
