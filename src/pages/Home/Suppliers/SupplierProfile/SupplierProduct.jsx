/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
  Button,
  Menu,
  MenuItem,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Edit,
  Delete,
  Visibility,
  Search,
  FilterList,
  Sort,
  AddCircle,
  Category,
  Inventory,
  AttachMoney,
  CalendarToday,
  Star,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { StyledIconButton } from "@mui/joy/IconButton/IconButton";
import { StyledChip, StyledTableContainer } from "../../../../utils/customStyle";



// Mock data for supplier products
const mockProducts = [
  {
    id: "P001",
    name: "Premium Brake Pads",
    category: "Brake System",
    price: 89.99,
    stock: 150,
    minStock: 50,
    lastOrdered: "2025-03-15",
    rating: 4.8,
  },
  {
    id: "P002",
    name: "High-Performance Oil Filter",
    category: "Engine",
    price: 15.99,
    stock: 300,
    minStock: 100,
    lastOrdered: "2025-03-10",
    rating: 4.5,
  },
  {
    id: "P003",
    name: "LED Headlight Set",
    category: "Lighting",
    price: 199.99,
    stock: 75,
    minStock: 30,
    lastOrdered: "2025-03-05",
    rating: 4.9,
  },
  {
    id: "P004",
    name: 'Alloy Wheel Set (18")',
    category: "Wheels & Tires",
    price: 599.99,
    stock: 40,
    minStock: 20,
    lastOrdered: "2025-02-28",
    rating: 4.7,
  },
  {
    id: "P005",
    name: "Performance Exhaust System",
    category: "Exhaust",
    price: 349.99,
    stock: 25,
    minStock: 15,
    lastOrdered: "2025-02-20",
    rating: 4.6,
  },
];

const SupplierBillPay = () => {
  const theme = useTheme();
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState("");

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleProductAction = (action, product) => {
    setSelectedProduct(product);
    setDialogAction(action);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const getStockStatus = (stock, minStock) => {
    if (stock === 0) return "out-of-stock";
    if (stock <= minStock) return "low-stock";
    return "in-stock";
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
        >
          Supplier Product Catalog
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          onClick={() => handleProductAction("add")}
          sx={{
            borderRadius: 20,
            px: 3,
            py: 1,
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
            boxShadow: `0 3px 5px 2px ${alpha(
              theme.palette.primary.main,
              0.3
            )}`,
          }}
        >
          Add New Product
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
        <Box>
          <Tooltip title="Filter products">
            <StyledIconButton onClick={handleFilterClick}>
              <FilterList />
            </StyledIconButton>
          </Tooltip>
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleFilterClose}>All Products</MenuItem>
            <MenuItem onClick={handleFilterClose}>In Stock</MenuItem>
            <MenuItem onClick={handleFilterClose}>Low Stock</MenuItem>
            <MenuItem onClick={handleFilterClose}>Out of Stock</MenuItem>
          </Menu>
          <Tooltip title="Sort products">
            <StyledIconButton onClick={handleSortClick}>
              <Sort />
            </StyledIconButton>
          </Tooltip>
          <Menu
            anchorEl={sortAnchorEl}
            open={Boolean(sortAnchorEl)}
            onClose={handleSortClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleSortClose}>Name (A-Z)</MenuItem>
            <MenuItem onClick={handleSortClose}>Name (Z-A)</MenuItem>
            <MenuItem onClick={handleSortClose}>Price (Low to High)</MenuItem>
            <MenuItem onClick={handleSortClose}>Price (High to Low)</MenuItem>
            <MenuItem onClick={handleSortClose}>Stock (Low to High)</MenuItem>
            <MenuItem onClick={handleSortClose}>Stock (High to Low)</MenuItem>
          </Menu>
        </Box>
      </Box>
      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell>Last Ordered</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Category
                      sx={{ mr: 1, color: theme.palette.primary.main }}
                    />
                    {product.name}
                  </Box>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell align="right">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <AttachMoney sx={{ color: theme.palette.success.main }} />
                    {product.price.toFixed(2)}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Inventory sx={{ mr: 1, color: theme.palette.info.main }} />
                    <StyledChip
                      label={`${product.stock} pcs`}
                      className={getStockStatus(
                        product.stock,
                        product.minStock
                      )}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarToday
                      sx={{ mr: 1, color: theme.palette.secondary.main }}
                    />
                    {product.lastOrdered}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Star sx={{ mr: 0.5, color: theme.palette.warning.main }} />
                    {product.rating.toFixed(1)}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="View Details">
                    <StyledIconButton
                      onClick={() => handleProductAction("view", product)}
                    >
                      <Visibility />
                    </StyledIconButton>
                  </Tooltip>
                  <Tooltip title="Edit Product">
                    <StyledIconButton
                      onClick={() => handleProductAction("edit", product)}
                    >
                      <Edit />
                    </StyledIconButton>
                  </Tooltip>
                  <Tooltip title="Delete Product">
                    <StyledIconButton
                      onClick={() => handleProductAction("delete", product)}
                    >
                      <Delete />
                    </StyledIconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* Product Action Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {dialogAction === "add" && "Add New Product"}
          {dialogAction === "edit" && "Edit Product"}
          {dialogAction === "view" && "Product Details"}
          {dialogAction === "delete" && "Delete Product"}
        </DialogTitle>
        <DialogContent>
          {/* Add your form fields or product details here based on the dialogAction */}
          {dialogAction === "delete" && (
            <Typography>
              Are you sure you want to delete the product:{" "}
              {selectedProduct?.name}?
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {dialogAction !== "view" && (
            <Button
              variant="contained"
              color={dialogAction === "delete" ? "error" : "primary"}
              onClick={handleCloseDialog}
            >
              {dialogAction === "add" && "Add"}
              {dialogAction === "edit" && "Save"}
              {dialogAction === "delete" && "Delete"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SupplierBillPay;
