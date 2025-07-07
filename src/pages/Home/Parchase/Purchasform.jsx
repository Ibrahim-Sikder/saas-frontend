"use client";

/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo, useRef } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  IconButton,
  Avatar,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  Tooltip,
  InputAdornment,
  alpha,
  useTheme,
  Autocomplete,
  Collapse,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Inventory as InventoryIcon,
  Receipt as ReceiptIcon,
  LocalShipping as LocalShippingIcon,
  Discount as DiscountIcon,
  AttachMoney as AttachMoneyIcon,
  ReceiptLong as ReceiptLongIcon,
  Store as StoreIcon,
  Person as PersonIcon,
  CalendarMonth as CalendarMonthIcon,
  Numbers as NumbersIcon,
  Payment as PaymentIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreatePurchaseMutation,
  useGetSinglePurchaseQuery,
  useUpdatePurchaseMutation,
} from "../../../redux/api/purchaseApi";
import { useGetAllIProductQuery } from "../../../redux/api/productApi";
import { useGetAllSuppliersQuery } from "../../../redux/api/supplier";
import TASForm from "../../../components/form/Form";
import TASInput from "../../../components/form/Input";
import TASDatepicker from "../../../components/form/Datepicker";
import TASSelect from "../../../components/form/Select";
import TASTextarea from "../../../components/form/Textarea";
import TASAutocomplete from "../../../components/form/Autocomplete";
import { productCategory, purchaseStatus } from "../../../constant";
import ImageUpload from "../../../components/form/ImageUpload";
import {
  inputFieldSx,
  outlinedInputSx,
  outlinedInputWrapperSx,
  productBox,
  productStyle,
  textInuptStyle,
} from "../../../utils/customStyle";
import { formatCurrency } from "../../../utils/formatter";
import { useGetAllWarehousesQuery } from "../../../redux/api/warehouseApi";
import { useTenantDomain } from "../../../hooks/useTenantDomain";
const MotionCard = motion(Card);

const Purchasform = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [params, setParams] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productFields, setProductFields] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [totalShipping, setTotalShipping] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [expandedSummary, setExpandedSummary] = useState(true);
  const productSearchRef = useRef(null);
  const tenantDomain = useTenantDomain();
  const [updatePurchase] = useUpdatePurchaseMutation();
  const {
    data: productsData,
    isLoading: productsLoading,
    isFetching: productsFetching,
  } = useGetAllIProductQuery({
    tenantDomain,
    limit: 100,
    page: 1,
    searchTerm: "",
  });

  const { data: supplierData } = useGetAllSuppliersQuery({
    tenantDomain,
    limit: 1000000,
    page: 1,
    searchTerm: "",
  });
  const { data: warehouseData } = useGetAllWarehousesQuery({
    tenantDomain,
    limit: 1000000,
    page: 1,
    searchTerm: "",
  });
  const id = new URLSearchParams(location.search).get("id");

  const { data: singlePurchase, isLoading } = useGetSinglePurchaseQuery({
    tenantDomain,
    id,
  });
  const [createPurchase, { isLoading: isSubmitting }] =
    useCreatePurchaseMutation();

  // Prepare supplier options
  const suppliersOptions = useMemo(() => {
    if (!supplierData?.data?.suppliers) return [];
    return supplierData.data.suppliers.map((supplier) => ({
      label: supplier.full_name,
      value: supplier._id,
    }));
  }, [supplierData?.data?.suppliers]);
  const wareHouseOptions = useMemo(() => {
    if (!warehouseData?.data?.warehouses) return [];
    return warehouseData.data.warehouses.map((warehouse) => ({
      label: warehouse.name,
      value: warehouse._id,
    }));
  }, [warehouseData?.data?.warehouses]);

  // Prepare product options
  const productOptions = useMemo(() => {
    if (!productsData?.data?.products) return [];
    return productsData.data.products.map((product) => ({
      label: product.product_name,
      value: product._id,
      product,
    }));
  }, [productsData?.data?.products]);

  // Calculate totals whenever product fields change
  useEffect(() => {
    const newTotalAmount = productFields.reduce(
      (acc, item) => acc + item.productPrice * item.quantity,
      0
    );

    const newTotalDiscount = productFields.reduce(
      (acc, item) => acc + item.discount * item.quantity,
      0
    );

    const newTotalTax = productFields.reduce(
      (acc, item) =>
        acc + ((item.productPrice * item.tax) / 100) * item.quantity,
      0
    );

    const newTotalShipping = productFields.reduce(
      (acc, item) => acc + item.shipping,
      0
    );

    setTotalAmount(newTotalAmount);
    setTotalDiscount(newTotalDiscount);
    setTotalTax(newTotalTax);
    setTotalShipping(newTotalShipping);
    setGrandTotal(
      newTotalAmount + newTotalTax + newTotalShipping - newTotalDiscount
    );
  }, [productFields]);

  // Handle product search
  const handleProductSearch = (value) => {
    setSearchTerm(value);
    setParams([{ name: "searchTerm", value }]);
  };

  // Add product to the list
  const handleAddProduct = (product) => {
    if (!product) return;

    const existingProductIndex = productFields.findIndex(
      (field) => field.productId === product.product._id
    );

    if (existingProductIndex !== -1) {
      // Product already exists, update quantity
      const updatedFields = [...productFields];
      updatedFields[existingProductIndex].quantity += 1;
      setProductFields(updatedFields);
      toast.info("Product quantity updated", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      // Add new product
      const newProduct = {
        productId: product.product._id,
        productName: product.product.product_name,
        productUnit: product.product?.unit?.unit || "Pcs",
        productPrice: Number(product.product.purchasePrice) || 0,
        tax: Number(product.product.product_tax) || 0,
        discount: Number(product.product.discount) || 0,
        shipping: Number(product.product.shipping) || 0,
        quantity: Number(product.product.product_quantity) || 0,
      };

      setProductFields([...productFields, newProduct]);
      toast.success("Product added", {
        position: "top-right",
        autoClose: 2000,
      });
    }

    // Clear search
    setSearchTerm("");
    if (productSearchRef.current) {
      productSearchRef.current.value = "";
    }
  };

  // Remove product from the list
  const handleRemoveProduct = (index) => {
    const newFields = [...productFields];
    newFields.splice(index, 1);
    setProductFields(newFields);
    toast.info("Product removed", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Update product quantity
  const handleQuantityChange = (index, change) => {
    const updatedFields = [...productFields];
    const newQuantity = Math.max(1, updatedFields[index].quantity + change);
    updatedFields[index].quantity = newQuantity;
    setProductFields(updatedFields);
  };

  // Update product price
  const handlePriceChange = (index, value) => {
    const updatedFields = [...productFields];
    updatedFields[index].productPrice = Number(value) || 0;
    setProductFields(updatedFields);
  };

  // Update product discount
  const handleDiscountChange = (index, value) => {
    const updatedFields = [...productFields];
    updatedFields[index].discount = Number(value) || 0;
    setProductFields(updatedFields);
  };

  // Update product tax
  const handleTaxChange = (index, value) => {
    const updatedFields = [...productFields];
    updatedFields[index].tax = Number(value) || 0;
    setProductFields(updatedFields);
  };

  const defaultValues = {
    referenceNo: singlePurchase?.data?.referenceNo || "",
    shipping: singlePurchase?.data?.shipping || "",

    date: singlePurchase?.data?.date || "",
    purchasStatus: singlePurchase?.data?.purchasStatus || "",
    paymentMethod: singlePurchase?.data?.paymentMethod || "",
    attachDocument: singlePurchase?.data?.attachDocument || "",
    suppliers: singlePurchase?.data?.suppliers
      ? [singlePurchase.data.suppliers.full_name]
      : [],
    warehouse: singlePurchase?.data?.warehouse
      ? [singlePurchase.data.warehouse.name]
      : [],
    note: singlePurchase?.data?.note || "",
    products:
      singlePurchase?.data?.products?.map((product) => ({
        productId: product.productId,
        productName: product.productName,
        productUnit: product.productUnit,
        productPrice: product.productPrice,
        tax: product.tax,
        discount: product.discount,
        quantity: product.quantity,
        shipping: product.shipping,
      })) || [],
  };
  useEffect(() => {
    if (singlePurchase?.data?.products) {
      setProductFields(
        singlePurchase.data.products.map((product) => ({
          productId: product.productId,
          productName: product.productName,
          productUnit: product.productUnit,
          productPrice: product.productPrice,
          tax: product.tax,
          discount: product.discount,
          quantity: product.quantity,
          shipping: product.shipping,
        }))
      );
    }
  }, [singlePurchase]);

  // Handle form submission
  const handleSubmit = async (data) => {
    if (productFields.length === 0) {
      toast.error("Please add at least one product", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const modifyData = {
      ...data,
      attachDocument: Array.isArray(data.attachDocument)
        ? data.attachDocument[0]
        : data.attachDocument,
      shipping: Number(data.shipping),
      products: productFields.map((product) => ({
        ...product,
        productPrice: Number(product.productPrice),
        tax: Number(product.tax),
        discount: Number(product.discount),
        quantity: Number(product.quantity),
        shipping: Number(product.shipping),
      })),
      suppliers:
        data.suppliers &&
        data.suppliers[0] &&
        suppliersOptions.find((cat) => cat.label === data.suppliers[0])?.value
          ? [
              suppliersOptions.find((cat) => cat.label === data.suppliers[0])
                .value,
            ]
          : [],
      warehouse:
        data.warehouse &&
        data.warehouse[0] &&
        wareHouseOptions.find((cat) => cat.label === data.warehouse[0])?.value
          ? [
              wareHouseOptions.find((cat) => cat.label === data.warehouse[0])
                .value,
            ]
          : [],
      totalAmount,
      totalDiscount,
      totalTax,
      totalShipping,
      grandTotal,
    };

    try {
      setShowSuccessAnimation(true);
      if (id) {
        const res = await updatePurchase({
          tenantDomain,
          id,
          ...modifyData,
        }).unwrap();

        if (res.success) {
          toast.success(res.message || "Purchase update successfully!");
          navigate("/dashboard/purchase-list");
        }
      } else {
        const res = await createPurchase({
          tenantDomain,
          ...modifyData,
        }).unwrap();
        if (res.success) {
          toast.success(res.message || "Purchase create successfully!");
          navigate("/dashboard/purchase-list");
        }
      }
    } catch (error) {
      setShowSuccessAnimation(false);
      setShowSuccessAnimation(false);

      // Extract the main error message
      const errorMessage =
        error.data?.errorSources?.[0]?.message ||
        error.data?.err?.issues?.[0]?.message ||
        error.data?.message ||
        `Failed to ${id ? "update" : "create"} purchase`;

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
    <>
      {isLoading ? (
        <h3>Loading..... </h3>
      ) : (
        <Box sx={{ padding: { xs: "4px", md: "24px" } }}>
          {/* Header with 3D effect */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              mb: 4,
              position: "relative",
            }}
          >
            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Typography
                variant="h4"
                fontWeight="800"
                sx={{
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1,
                  textShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                  letterSpacing: "-0.5px",
                }}
              >
                Create New Purchase
              </Typography>
              <Typography
                variant="body1"
                color="#64748b"
                sx={{
                  position: "relative",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: "60px",
                    height: "3px",
                    background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
                    borderRadius: "10px",
                  },
                }}
              >
                Add new items to your inventory with detailed tracking
              </Typography>
            </Box>

            <Button
              variant="contained"
              component={Link}
              to="/dashboard/purchase-list"
              startIcon={<ArrowBackIcon />}
              sx={{
                mt: { xs: 2, md: 0 },
                borderRadius: "12px",
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                color: "#475569",
                border: "1px solid rgba(203, 213, 225, 0.5)",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                "&:hover": {
                  background: "rgba(255,255,255,1)",
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Back to Purchase List
            </Button>
          </Box>

          <TASForm onSubmit={handleSubmit} defaultValues={defaultValues}>
            <Box sx={{ p: { xs: 0, sm: 4 } }}>
              <Grid container spacing={4}>
                {/* Left Column - Document Upload */}
                <Grid item xs={12} md={3}>
                  <MotionCard
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    elevation={0}
                    sx={{
                      borderRadius: "20px",
                      border: "1px solid rgba(226, 232, 240, 0.8)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                      background:
                        "linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%)",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow:
                          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        background:
                          "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                        py: 2,
                        px: 3,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ReceiptLongIcon sx={{ color: "white", mr: 1.5 }} />
                      <Typography variant="h6" fontWeight="700" color="white">
                        Document
                      </Typography>
                    </Box>
                    <CardContent
                      sx={{
                        p: 3,
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="#64748b"
                        sx={{ mb: 3 }}
                      >
                        Attach invoice or related documents for this purchase
                        order
                      </Typography>

                      <Box
                        sx={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <ImageUpload
                          defaultValues={singlePurchase?.data?.attachDocument}
                          fullWidth
                          name="attachDocument"
                          label="Attach Document"
                        />
                      </Box>
                    </CardContent>
                  </MotionCard>
                </Grid>

                {/* Right Column - Purchase Details */}
                <Grid item xs={12} md={9}>
                  <MotionCard
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    elevation={0}
                    sx={{
                      borderRadius: "20px",
                      border: "1px solid rgba(226, 232, 240, 0.8)",
                      overflow: "hidden",
                      background:
                        "linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%)",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                    }}
                  >
                    <Box
                      sx={{
                        background:
                          "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                        py: 2,
                        px: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ShoppingCartIcon sx={{ color: "white", mr: 1.5 }} />
                      <Typography variant="h6" fontWeight="700" color="white">
                        Purchase Details
                      </Typography>
                    </Box>
                    <CardContent sx={{ p: 1 }}>
                      <Typography
                        variant="body2"
                        color="#64748b"
                        sx={{ mb: 3 }}
                      >
                        Enter the purchase information below
                      </Typography>

                      <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                          <TASDatepicker
                            name="date"
                            label="Purchase Date"
                            fullWidth
                            size="medium"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CalendarMonthIcon color="action" />
                                </InputAdornment>
                              ),
                              sx: outlinedInputSx,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TASInput
                            name="referenceNo"
                            label="Reference No"
                            fullWidth
                            size="medium"
                            placeholder="PO-0001"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <NumbersIcon color="action" />
                                </InputAdornment>
                              ),
                              sx: outlinedInputSx,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TASAutocomplete
                            options={wareHouseOptions}
                            size="medium"
                            fullWidth
                            name="warehouse"
                            label="Select Warehouse"
                            sx={outlinedInputWrapperSx}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <StoreIcon color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TASAutocomplete
                            options={suppliersOptions}
                            size="medium"
                            fullWidth
                            name="suppliers"
                            label="Supplier"
                            sx={outlinedInputWrapperSx}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TASInput
                            type="number"
                            size="medium"
                            fullWidth
                            name="shipping"
                            label="Shipping"
                            placeholder="0.00"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LocalShippingIcon
                                    color="action"
                                    sx={{ mr: 1 }}
                                  />
                                  $
                                </InputAdornment>
                              ),
                              sx: outlinedInputSx,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TASSelect
                            items={purchaseStatus}
                            size="medium"
                            fullWidth
                            name="purchasStatus"
                            label="Purchase Status"
                            sx={outlinedInputWrapperSx}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <ReceiptIcon color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TASInput
                            size="medium"
                            fullWidth
                            name="paymentMethod"
                            label="Payment Method"
                            placeholder="Bank Transfer"
                            sx={outlinedInputWrapperSx}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PaymentIcon color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </MotionCard>
                </Grid>
              </Grid>

              {/* Product Search */}
              <Card sx={productStyle}>
                <Box sx={productBox}>
                  <InventoryIcon sx={{ color: "white", mr: 1.5 }} />
                  <Typography variant="h6" fontWeight="700" color="white">
                    Add Products
                  </Typography>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="body2" color="#64748b" sx={{ mb: 3 }}>
                    Search and add products to your purchase order
                  </Typography>

                  <Autocomplete
                    freeSolo
                    disableClearable
                    options={productOptions}
                    value={null}
                    onChange={(event, newValue) => handleAddProduct(newValue)}
                    onInputChange={(event, newValue) =>
                      handleProductSearch(newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search Product"
                        placeholder="Type to search products..."
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon color="action" />
                            </InputAdornment>
                          ),
                          sx: inputFieldSx,
                        }}
                        inputRef={productSearchRef}
                      />
                    )}
                    renderOption={(props, option) => (
                      <li {...props}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <Avatar
                            src={option.product.image}
                            alt={option.label}
                            variant="rounded"
                            sx={{
                              width: 50,
                              height: 50,
                              mr: 2,
                              backgroundColor: alpha("#8b5cf6", 0.1),
                              borderRadius: "12px",
                              border: "1px solid",
                              borderColor: alpha("#8b5cf6", 0.2),
                            }}
                          >
                            <InventoryIcon sx={{ color: "#8b5cf6" }} />
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body1" fontWeight="600">
                              {option.label}
                            </Typography>
                            <Typography variant="body2" color="#64748b">
                              Price: ${option.product.purchasePrice} | Stock:{" "}
                              {option.product.stock || "N/A"}
                            </Typography>
                          </Box>
                          <Chip
                            label="Add"
                            size="small"
                            color="primary"
                            sx={{
                              borderRadius: "8px",
                              fontWeight: 600,
                              background:
                                "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                              boxShadow: "0 2px 5px rgba(139, 92, 246, 0.3)",
                            }}
                          />
                        </Box>
                      </li>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Product Table */}
              <Card
                sx={{
                  borderRadius: "20px",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  mt: 4,
                  overflow: "hidden",
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%)",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                }}
              >
                <Box
                  sx={{
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                    py: 2,
                    px: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ShoppingCartIcon sx={{ color: "white", mr: 1.5 }} />
                    <Typography variant="h6" fontWeight="700" color="white">
                      Purchase Items
                    </Typography>
                  </Box>
                  {productFields.length > 0 && (
                    <Chip
                      label={`${productFields.length} ${
                        productFields.length === 1 ? "item" : "items"
                      }`}
                      size="small"
                      sx={{
                        color: "white",
                        bgcolor: "rgba(255,255,255,0.2)",
                        fontWeight: "bold",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </Box>

                <Box sx={{ p: 0 }}>
                  <Box sx={{ overflowX: "auto" }}>
                    <table
                      style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                      <thead>
                        <tr style={{ backgroundColor: alpha("#8b5cf6", 0.05) }}>
                          <th
                            style={{
                              padding: "14px 16px",
                              textAlign: "left",
                              fontWeight: 600,
                              color: "#475569",
                              borderBottom: "1px solid #e2e8f0",
                            }}
                          >
                            #
                          </th>
                          <th
                            style={{
                              padding: "14px 16px",
                              textAlign: "left",
                              fontWeight: 600,
                              color: "#475569",
                              borderBottom: "1px solid #e2e8f0",
                            }}
                          >
                            Product
                          </th>
                          <th
                            style={{
                              padding: "14px 16px",
                              textAlign: "center",
                              fontWeight: 600,
                              color: "#475569",
                              borderBottom: "1px solid #e2e8f0",
                            }}
                          >
                            Unit
                          </th>
                          <th
                            style={{
                              padding: "14px 16px",
                              textAlign: "center",
                              fontWeight: 600,
                              color: "#475569",
                              borderBottom: "1px solid #e2e8f0",
                            }}
                          >
                            Quantity
                          </th>
                          <th
                            style={{
                              padding: "14px 16px",
                              textAlign: "right",
                              fontWeight: 600,
                              color: "#475569",
                              borderBottom: "1px solid #e2e8f0",
                            }}
                          >
                            Price
                          </th>
                          <th
                            style={{
                              padding: "14px 16px",
                              textAlign: "right",
                              fontWeight: 600,
                              color: "#475569",
                              borderBottom: "1px solid #e2e8f0",
                            }}
                          >
                            Tax (%)
                          </th>
                          <th
                            style={{
                              padding: "14px 16px",
                              textAlign: "right",
                              fontWeight: 600,
                              color: "#475569",
                              borderBottom: "1px solid #e2e8f0",
                            }}
                          >
                            Discount
                          </th>
                          <th
                            style={{
                              padding: "14px 16px",
                              textAlign: "right",
                              fontWeight: 600,
                              color: "#475569",
                              borderBottom: "1px solid #e2e8f0",
                            }}
                          >
                            Subtotal
                          </th>
                          <th
                            style={{
                              padding: "14px 16px",
                              textAlign: "center",
                              fontWeight: 600,
                              color: "#475569",
                              borderBottom: "1px solid #e2e8f0",
                            }}
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence>
                          {productFields.length === 0 ? (
                            <motion.tr
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <td
                                colSpan={9}
                                style={{
                                  padding: "40px 16px",
                                  textAlign: "center",
                                  color: "#64748b",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 2,
                                  }}
                                >
                                  <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 260,
                                      damping: 20,
                                    }}
                                  >
                                    <Avatar
                                      sx={{
                                        width: 80,
                                        height: 80,
                                        backgroundColor: alpha("#8b5cf6", 0.1),
                                        color: "#8b5cf6",
                                        border: "2px dashed",
                                        borderColor: alpha("#8b5cf6", 0.3),
                                      }}
                                    >
                                      <ShoppingCartIcon sx={{ fontSize: 40 }} />
                                    </Avatar>
                                  </motion.div>
                                  <Typography
                                    variant="h6"
                                    fontWeight="600"
                                    color="#1e293b"
                                  >
                                    No products added yet
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="#64748b"
                                    sx={{ maxWidth: "400px" }}
                                  >
                                    Search for products above and add them to
                                    your purchase order
                                  </Typography>
                                </Box>
                              </td>
                            </motion.tr>
                          ) : (
                            productFields.map((field, index) => (
                              <motion.tr
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                  borderBottom: "1px solid #e2e8f0",
                                  backgroundColor:
                                    index % 2 === 0
                                      ? "white"
                                      : alpha("#f8fafc", 0.5),
                                }}
                              >
                                <td
                                  style={{
                                    padding: "16px",
                                    color: "#64748b",
                                    textAlign: "left",
                                  }}
                                >
                                  <Chip
                                    label={index + 1}
                                    size="small"
                                    sx={{
                                      bgcolor: alpha("#8b5cf6", 0.1),
                                      color: "#8b5cf6",
                                      fontWeight: "bold",
                                      minWidth: "30px",
                                    }}
                                  />
                                </td>
                                <td
                                  style={{
                                    padding: "16px",
                                    color: "#1e293b",
                                    fontWeight: 600,
                                    textAlign: "left",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Avatar
                                      sx={{
                                        width: 36,
                                        height: 36,
                                        mr: 1.5,
                                        bgcolor: alpha("#8b5cf6", 0.1),
                                        color: "#8b5cf6",
                                        borderRadius: "8px",
                                      }}
                                    >
                                      <InventoryIcon fontSize="small" />
                                    </Avatar>
                                    {field.productName}
                                  </Box>
                                </td>
                                <td
                                  style={{
                                    padding: "16px",
                                    color: "#64748b",
                                    textAlign: "center",
                                  }}
                                >
                                  <Chip
                                    label={field.productUnit}
                                    size="small"
                                    sx={{
                                      bgcolor: alpha("#3b82f6", 0.1),
                                      color: "#3b82f6",
                                      fontWeight: "medium",
                                    }}
                                  />
                                </td>
                                <td
                                  style={{
                                    padding: "16px",
                                    textAlign: "center",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <IconButton
                                      size="small"
                                      onClick={() =>
                                        handleQuantityChange(index, -1)
                                      }
                                      sx={{
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "8px",
                                        p: "4px",
                                        color: "#64748b",
                                        transition: "all 0.2s",
                                        "&:hover": {
                                          backgroundColor: "#f1f5f9",
                                          color: "#1e293b",
                                        },
                                      }}
                                    >
                                      <RemoveIcon fontSize="small" />
                                    </IconButton>
                                    <Typography
                                      variant="body1"
                                      fontWeight="600"
                                      color="#1e293b"
                                      sx={{
                                        minWidth: "36px",
                                        textAlign: "center",
                                        bgcolor: alpha("#8b5cf6", 0.05),
                                        borderRadius: "6px",
                                        py: 0.5,
                                      }}
                                    >
                                      {field.quantity}
                                    </Typography>
                                    <IconButton
                                      size="small"
                                      onClick={() =>
                                        handleQuantityChange(index, 1)
                                      }
                                      sx={{
                                        borderRadius: "8px",
                                        p: "4px",
                                        background:
                                          "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                                        color: "white",
                                        boxShadow:
                                          "0 2px 5px rgba(139, 92, 246, 0.3)",
                                        "&:hover": {
                                          boxShadow:
                                            "0 4px 8px rgba(139, 92, 246, 0.4)",
                                        },
                                      }}
                                    >
                                      <AddIcon fontSize="small" />
                                    </IconButton>
                                  </Box>
                                </td>
                                <td
                                  style={{
                                    padding: "16px",
                                    textAlign: "right",
                                  }}
                                >
                                  <TextField
                                    size="small"
                                    type="number"
                                    value={field.productPrice}
                                    onChange={(e) =>
                                      handlePriceChange(index, e.target.value)
                                    }
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          $
                                        </InputAdornment>
                                      ),
                                    }}
                                    sx={textInuptStyle}
                                  />
                                </td>
                                <td
                                  style={{
                                    padding: "16px",
                                    textAlign: "right",
                                  }}
                                >
                                  <TextField
                                    size="small"
                                    type="number"
                                    value={field.tax}
                                    onChange={(e) =>
                                      handleTaxChange(index, e.target.value)
                                    }
                                    sx={textInuptStyle}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          %
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </td>
                                <td
                                  style={{
                                    padding: "16px",
                                    textAlign: "right",
                                  }}
                                >
                                  <TextField
                                    size="small"
                                    type="number"
                                    value={field.discount}
                                    onChange={(e) =>
                                      handleDiscountChange(
                                        index,
                                        e.target.value
                                      )
                                    }
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          $
                                        </InputAdornment>
                                      ),
                                      sx: {
                                        borderRadius: "8px",
                                        width: "120px",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          borderColor: "#e2e8f0",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline":
                                          {
                                            borderColor: "#cbd5e1",
                                          },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                          {
                                            borderColor: "#8b5cf6",
                                            borderWidth: "2px",
                                          },
                                      },
                                    }}
                                  />
                                </td>
                                <td
                                  style={{
                                    padding: "16px",
                                    color: "#1e293b",
                                    fontWeight: 700,
                                    textAlign: "right",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      bgcolor: alpha("#10b981", 0.1),
                                      color: "#10b981",
                                      py: 0.75,
                                      px: 1.5,
                                      borderRadius: "8px",
                                      display: "inline-block",
                                    }}
                                  >
                                    {formatCurrency(
                                      field.productPrice * field.quantity
                                    )}
                                  </Box>
                                </td>
                                <td
                                  style={{
                                    padding: "16px",
                                    textAlign: "center",
                                  }}
                                >
                                  <Tooltip title="Remove Item" arrow>
                                    <IconButton
                                      size="small"
                                      onClick={() => handleRemoveProduct(index)}
                                      sx={{
                                        color: "#ef4444",
                                        bgcolor: alpha("#ef4444", 0.1),
                                        borderRadius: "8px",
                                        "&:hover": {
                                          backgroundColor: alpha(
                                            "#ef4444",
                                            0.2
                                          ),
                                        },
                                      }}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </td>
                              </motion.tr>
                            ))
                          )}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </Box>
                </Box>
              </Card>

              {/* Summary and Notes */}
              <Grid container spacing={4} sx={{ mt: 1 }}>
                <Grid item xs={12} md={7}>
                  <MotionCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    elevation={0}
                    sx={{
                      borderRadius: "20px",
                      border: "1px solid rgba(226, 232, 240, 0.8)",
                      mt: 3,
                      height: "100%",
                      overflow: "hidden",
                      background:
                        "linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%)",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                    }}
                  >
                    <Box
                      sx={{
                        background:
                          "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                        py: 2,
                        px: 3,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ReceiptLongIcon sx={{ color: "white", mr: 1.5 }} />
                      <Typography variant="h6" fontWeight="700" color="white">
                        Notes & Details
                      </Typography>
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="body2"
                        color="#64748b"
                        sx={{ mb: 2 }}
                      >
                        Add any additional information about this purchase
                      </Typography>

                      <TASTextarea
                        name="note"
                        placeholder="Enter notes or additional details about this purchase..."
                        minRows={5}
                        fullWidth
                        size="medium"
                        sx={textInuptStyle}
                      />
                    </CardContent>
                  </MotionCard>
                </Grid>

                <Grid item xs={12} md={5}>
                  <MotionCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    elevation={0}
                    sx={{
                      borderRadius: "20px",
                      border: "1px solid rgba(226, 232, 240, 0.8)",
                      mt: 3,
                      overflow: "hidden",
                      background:
                        "linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%)",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                    }}
                  >
                    <Box
                      sx={{
                        background:
                          "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                        py: 2,
                        px: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                      }}
                      onClick={() => setExpandedSummary(!expandedSummary)}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AttachMoneyIcon sx={{ color: "white", mr: 1.5 }} />
                        <Typography variant="h6" fontWeight="700" color="white">
                          Order Summary
                        </Typography>
                      </Box>
                      <IconButton size="small" sx={{ color: "white" }}>
                        {expandedSummary ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </Box>

                    <Collapse in={expandedSummary}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ mt: 1 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  py: 1.5,
                                  borderBottom: "1px dashed #e2e8f0",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Avatar
                                    sx={{
                                      width: 28,
                                      height: 28,
                                      mr: 1.5,
                                      bgcolor: alpha("#3b82f6", 0.1),
                                      color: "#3b82f6",
                                    }}
                                  >
                                    <ShoppingCartIcon fontSize="small" />
                                  </Avatar>
                                  <Typography variant="body1" color="#64748b">
                                    Subtotal
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="body1"
                                  fontWeight="600"
                                  color="#1e293b"
                                >
                                  {formatCurrency(totalAmount)}
                                </Typography>
                              </Box>
                            </Grid>

                            <Grid item xs={12}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  py: 1.5,
                                  borderBottom: "1px dashed #e2e8f0",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Avatar
                                    sx={{
                                      width: 28,
                                      height: 28,
                                      mr: 1.5,
                                      bgcolor: alpha("#8b5cf6", 0.1),
                                      color: "#8b5cf6",
                                    }}
                                  >
                                    <ReceiptIcon fontSize="small" />
                                  </Avatar>
                                  <Typography variant="body1" color="#64748b">
                                    Tax
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="body1"
                                  fontWeight="600"
                                  color="#1e293b"
                                >
                                  {formatCurrency(totalTax)}
                                </Typography>
                              </Box>
                            </Grid>

                            <Grid item xs={12}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  py: 1.5,
                                  borderBottom: "1px dashed #e2e8f0",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Avatar
                                    sx={{
                                      width: 28,
                                      height: 28,
                                      mr: 1.5,
                                      bgcolor: alpha("#ec4899", 0.1),
                                      color: "#ec4899",
                                    }}
                                  >
                                    <DiscountIcon fontSize="small" />
                                  </Avatar>
                                  <Typography variant="body1" color="#64748b">
                                    Discount
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="body1"
                                  fontWeight="600"
                                  color="#1e293b"
                                >
                                  {formatCurrency(totalDiscount)}
                                </Typography>
                              </Box>
                            </Grid>

                            <Grid item xs={12}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  py: 1.5,
                                  borderBottom: "1px dashed #e2e8f0",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Avatar
                                    sx={{
                                      width: 28,
                                      height: 28,
                                      mr: 1.5,
                                      bgcolor: alpha("#0ea5e9", 0.1),
                                      color: "#0ea5e9",
                                    }}
                                  >
                                    <LocalShippingIcon fontSize="small" />
                                  </Avatar>
                                  <Typography variant="body1" color="#64748b">
                                    Shipping
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="body1"
                                  fontWeight="600"
                                  color="#1e293b"
                                >
                                  {formatCurrency(totalShipping)}
                                </Typography>
                              </Box>
                            </Grid>

                            <Grid item xs={12}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  py: 2,
                                  mt: 1,
                                  background:
                                    "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)",
                                  borderRadius: "12px",
                                  px: 2,
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Avatar
                                    sx={{
                                      width: 32,
                                      height: 32,
                                      mr: 1.5,
                                      background:
                                        "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                                      color: "white",
                                      boxShadow:
                                        "0 3px 6px rgba(139, 92, 246, 0.3)",
                                    }}
                                  >
                                    <AttachMoneyIcon fontSize="small" />
                                  </Avatar>
                                  <Typography
                                    variant="h6"
                                    fontWeight="700"
                                    color="#1e293b"
                                  >
                                    Grand Total
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="h6"
                                  fontWeight="700"
                                  sx={{
                                    background:
                                      "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                  }}
                                >
                                  {formatCurrency(grandTotal)}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>
                    </Collapse>
                  </MotionCard>
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  startIcon={
                    isSubmitting ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <SaveIcon />
                    )
                  }
                  sx={{
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                    px: 4,
                    py: 1.5,
                    boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                      boxShadow: "0 15px 20px -3px rgba(99, 102, 241, 0.4)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {id ? "Update Purchase" : "Create Purchase"}
                </Button>
              </Box>
            </Box>
          </TASForm>
        </Box>
      )}
    </>
  );
};

export default Purchasform;
