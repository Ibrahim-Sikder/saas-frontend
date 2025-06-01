"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Breadcrumbs,
  Link,
  Chip,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Card,
  CardContent,
  Divider,
  Tooltip,
  useTheme,
  alpha,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoIcon from "@mui/icons-material/Info";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";

const initialWarranties = [
  {
    id: 1,
    name: "Standard Warranty",
    description: "Standard warranty for all products",
    duration: 6,
    durationType: "months",
    terms:
      "Only applicable for manufacturing defects. Not applicable if damaged due to user error.",
    productCount: 145,
    color: "#4CAF50",
  },
  {
    id: 2,
    name: "Extended Warranty",
    description: "Extended warranty for premium products",
    duration: 1,
    durationType: "years",
    terms:
      "Only applicable for manufacturing defects. Not applicable if damaged due to user error.",
    productCount: 32,
    color: "#2196F3",
  },
  {
    id: 3,
    name: "Premium Warranty",
    description: "Premium warranty for high-end products",
    duration: 2,
    durationType: "years",
    terms:
      "Applicable for all types of defects. Also applicable if damaged due to user error.",
    productCount: 28,
    color: "#9C27B0",
  },
  {
    id: 4,
    name: "Lifetime Warranty",
    description: "Lifetime warranty for special products",
    duration: 99,
    durationType: "years",
    terms:
      "Only applicable for manufacturing defects. Not applicable if damaged due to user error.",
    productCount: 15,
    color: "#FF5722",
  },
];

export default function WarrantiesPage() {
  const theme = useTheme();
  const [warranties, setWarranties] = useState(initialWarranties);
  const [open, setOpen] = useState(false);
  const [editingWarranty, setEditingWarranty] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: 0,
    durationType: "months",
    terms: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleClickOpen = () => {
    setFormData({
      name: "",
      description: "",
      duration: 0,
      durationType: "months",
      terms: "",
    });
    setEditingWarranty(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditWarranty = (warranty) => {
    setFormData({
      name: warranty.name,
      description: warranty.description,
      duration: warranty.duration,
      durationType: warranty.durationType,
      terms: warranty.terms,
    });
    setEditingWarranty(warranty);
    setOpen(true);
  };

  const handleDeleteWarranty = (id) => {
    setWarranties(warranties.filter((warranty) => warranty.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "duration" ? Number(value) : value,
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (editingWarranty) {
      // Update existing warranty
      setWarranties(
        warranties.map((warranty) =>
          warranty.id === editingWarranty.id
            ? { ...warranty, ...formData, color: warranty.color }
            : warranty
        )
      );
    } else {
      // Add new warranty
      const colors = [
        "#4CAF50",
        "#2196F3",
        "#9C27B0",
        "#FF5722",
        "#FF9800",
        "#03A9F4",
        "#E91E63",
      ];
      const newWarranty = {
        id: Math.max(...warranties.map((w) => w.id), 0) + 1,
        name: formData.name,
        description: formData.description,
        duration: formData.duration,
        durationType: formData.durationType,
        terms: formData.terms,
        productCount: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setWarranties([...warranties, newWarranty]);
    }
    handleClose();
  };

  const formatDuration = (duration, type) => {
    if (type === "days") return `${duration} days`;
    if (type === "months") return `${duration} months`;
    if (type === "years") return `${duration} years`;
    return `${duration} ${type}`;
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const filteredWarranties = warranties
    .filter(
      (warranty) =>
        warranty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warranty.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "duration") {
        const aDuration =
          a.duration *
          (a.durationType === "years"
            ? 365
            : a.durationType === "months"
            ? 30
            : 1);
        const bDuration =
          b.duration *
          (b.durationType === "years"
            ? 365
            : b.durationType === "months"
            ? 30
            : 1);
        comparison = aDuration - bDuration;
      } else if (sortBy === "productCount") {
        comparison = a.productCount - b.productCount;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  return (
    <Box
      sx={{
        background: `linear-gradient(to right, ${alpha(
          theme.palette.primary.light,
          0.1
        )}, ${alpha(theme.palette.background.default, 0.1)})`,
        minHeight: "100vh",
        p: 3,
        borderRadius: 2,
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
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
          alignItems: "center",
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
            display: "inline-block",
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
            onClick={handleClickOpen}
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
              transition: "all 0.3s",
              "&:hover": {
                boxShadow: `0 6px 15px ${alpha(
                  theme.palette.primary.main,
                  0.4
                )}`,
                transform: "translateY(-2px)",
              },
            }}
          >
            New Warranty
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {warranties.map((warranty) => (
          <Grid item xs={12} sm={6} md={3} key={warranty.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "visible",
                boxShadow: `0 8px 24px ${alpha(warranty.color, 0.15)}`,
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 12px 28px ${alpha(warranty.color, 0.25)}`,
                },
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
                  background: `linear-gradient(45deg, ${
                    warranty.color
                  }, ${alpha(warranty.color, 0.8)})`,
                  boxShadow: `0 4px 12px ${alpha(warranty.color, 0.4)}`,
                  color: "#fff",
                }}
              >
                <VerifiedUserIcon fontSize="medium" />
              </Box>

              <CardContent
                sx={{
                  pt: 4,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, color: warranty.color }}
                >
                  {warranty.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {warranty.description}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <AccessTimeIcon
                    fontSize="small"
                    sx={{ mr: 1, color: warranty.color }}
                  />
                  <Typography variant="body2">
                    <strong>Duration:</strong>{" "}
                    {formatDuration(warranty.duration, warranty.durationType)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LocalOfferIcon
                    fontSize="small"
                    sx={{ mr: 1, color: warranty.color }}
                  />
                  <Typography variant="body2">
                    <strong>Products:</strong> {warranty.productCount}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box
                  sx={{
                    mt: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    pt: 1,
                  }}
                >
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={() => handleEditWarranty(warranty)}
                      sx={{
                        color: theme.palette.primary.main,
                        "&:hover": {
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.1
                          ),
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteWarranty(warranty.id)}
                      sx={{
                        color: theme.palette.error.main,
                        "&:hover": {
                          backgroundColor: alpha(theme.palette.error.main, 0.1),
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: `0 5px 15px ${alpha(theme.palette.common.black, 0.08)}`,
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${theme.palette.divider}`,
            background: `linear-gradient(to right, ${alpha(
              theme.palette.primary.light,
              0.1
            )}, ${alpha(theme.palette.background.default, 0.05)})`,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            All Warranties
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Sort">
              <Button
                size="small"
                startIcon={<SortIcon />}
                onClick={() => handleSort(sortBy)}
                variant="outlined"
                sx={{ borderRadius: 4 }}
              >
                {sortBy === "name"
                  ? "Name"
                  : sortBy === "duration"
                  ? "Duration"
                  : "Product Count"}
                {sortOrder === "asc" ? " ⬆" : " ⬇"}
              </Button>
            </Tooltip>

            <Tooltip title="Filter">
              <IconButton size="small">
                <FilterListIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead
              sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05) }}
            >
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Terms</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  Product Count
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredWarranties.map((warranty) => (
                <TableRow
                  key={warranty.id}
                  sx={{
                    "&:hover": { backgroundColor: alpha(warranty.color, 0.05) },
                    transition: "background-color 0.2s",
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          mr: 1.5,
                          bgcolor: warranty.color,
                          fontSize: "0.875rem",
                        }}
                      >
                        {warranty.name.charAt(0)}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {warranty.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{warranty.description}</TableCell>
                  <TableCell>
                    <Chip
                      icon={<AccessTimeIcon />}
                      label={formatDuration(
                        warranty.duration,
                        warranty.durationType
                      )}
                      size="small"
                      sx={{
                        bgcolor: alpha(warranty.color, 0.1),
                        color: warranty.color,
                        fontWeight: 500,
                        border: `1px solid ${alpha(warranty.color, 0.3)}`,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title={warranty.terms}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            maxWidth: 200,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {warranty.terms}
                        </Typography>
                        <InfoIcon
                          fontSize="small"
                          sx={{ ml: 0.5, color: "text.secondary" }}
                        />
                      </Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={warranty.productCount}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        bgcolor: alpha(warranty.color, 0.1),
                        color: warranty.color,
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleEditWarranty(warranty)}
                          sx={{
                            color: theme.palette.primary.main,
                            "&:hover": {
                              backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.1
                              ),
                            },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteWarranty(warranty.id)}
                          sx={{
                            color: theme.palette.error.main,
                            "&:hover": {
                              backgroundColor: alpha(
                                theme.palette.error.main,
                                0.1
                              ),
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: `0 10px 40px ${alpha(theme.palette.common.black, 0.15)}`,
          },
        }}
      >
        <DialogTitle
          sx={{
            pb: 1,
            borderBottom: `1px solid ${theme.palette.divider}`,
            background: `linear-gradient(to right, ${alpha(
              theme.palette.primary.light,
              0.1
            )}, ${alpha(theme.palette.background.default, 0.05)})`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <VerifiedUserIcon
              sx={{ mr: 1, color: theme.palette.primary.main }}
            />
            <Typography variant="h6">
              {editingWarranty
                ? "Update Warranty"
                : "Add New Warranty"}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                name="name"
                label="Warranty Name"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="duration"
                label="Duration"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.duration}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Duration Type</InputLabel>
                <Select
                  name="durationType"
                  value={formData.durationType}
                  label="Duration Type"
                  onChange={handleSelectChange}
                  required
                >
                  <MenuItem value="days">Days</MenuItem>
                  <MenuItem value="months">Months</MenuItem>
                  <MenuItem value="years">Years</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="terms"
                label="Terms & Conditions"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                value={formData.terms}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{ px: 3, py: 2, borderTop: `1px solid ${theme.palette.divider}` }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              borderRadius: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
              transition: "all 0.3s",
              "&:hover": {
                boxShadow: `0 6px 15px ${alpha(
                  theme.palette.primary.main,
                  0.4
                )}`,
              },
            }}
          >
            {editingWarranty ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}