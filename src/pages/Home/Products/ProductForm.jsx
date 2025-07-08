/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  Chip,
  Snackbar,
  Alert,
  Avatar,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import {
  Save as SaveIcon,
  Clear as ClearIcon,
  ArrowBack as ArrowBackIcon,
  ShoppingBag,
  MonetizationOn,
  Inventory,
  Settings,
  Category,
  Discount,
  Store,
  Speed,
  Help as HelpIcon,
  Search,
  CheckCircle,
  WarningRounded,
  CalendarMonth,
  AccessTime,
  Notifications,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productApi";
import { useGetAllICategoryQuery } from "../../../redux/api/categoryApi";
import { useGetAllIBrandQuery } from "../../../redux/api/brandApi";
import { useGetAllIUnitQuery } from "../../../redux/api/unitApi";
import { useGetAllIProductTypeQuery } from "../../../redux/api/productTypeApi";
import { useGetAllSuppliersQuery } from "../../../redux/api/supplier";
import GarageForm from "../../../components/form/Form";
import TASInput from "../../../components/form/Input";
import TASAutocomplete from "../../../components/form/Autocomplete";
import TagsInput from "../../../components/form/TagInput";
import ImageUpload from "../../../components/form/ImageUpload";
import FormTextArea from "../../../components/form/FormTextArea";
import ProductStatusSelector from "../../../components/form/Status";
import { toast } from "react-toastify";
import TASSelect from "../../../components/form/Select";
import dayjs from "dayjs";
import FormDatePicker from "../../../components/form/Datepicker";
import { useGetAllWarehousesQuery } from "../../../redux/api/warehouseApi";
import { Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { addButtonStyle } from "../../../utils/customStyle";
import { CreateCategoryModal } from "../Category/CreateCategoryModal";
import { CreateBrandModal } from "../Brand/CreateBrandModal";
import AddWarehouseModal from "../../Inventory/Warehouse/AddWarehouse";
import { CreateProductTypeModal } from "../ProductType/CreateProductTypeModal";
import { AddSupplierModal } from "../Suppliers/AddSupplierModal";
import { CreateUnitModal } from "../Unit/CreateUnitModal";
import { useTenantDomain } from "../../../hooks/useTenantDomain";


export default function ProductForm({ id }) {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [productStatus, setProductStatus] = useState("active");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [expiryDateType, setExpiryDateType] = useState("fixed");
  const [unitOpen, setUnitOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [supplierOpen, setSupplierOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [warehouseOpen, setWarehouseOpen] = useState(false);
  const [productTypeOpen, setproductTypeOpen] = useState(false);
  const handleCategoryOpen = () => setCategoryOpen(true);
  const handleCategoryClose = () => setCategoryOpen(false);
  const handleBrandOpen = () => setBrandOpen(true);
  const handleBrandClose = () => setBrandOpen(false);
  const handleWarehouseOpen = () => setWarehouseOpen(true);
  const handleWarehouseClose = () => setWarehouseOpen(false);
  const handleProductTypeOpen = () => setproductTypeOpen(true);
  const handleProductTypeClose = () => setproductTypeOpen(false);
  const handleSupplierOpen = () => setSupplierOpen(true);
  const handleSupplierClose = () => setSupplierOpen(false);
  const handleUnitOpen = () => setUnitOpen(true);
  const handleUnitClose = () => setUnitOpen(false);
  const tenantDomain = useTenantDomain();

  const { data: singleProduct, isLoading: singleProductLoading } =
    useGetSingleProductQuery({ tenantDomain, id });

  const [updateProduct] = useUpdateProductMutation();
  const [createProduct] = useCreateProductMutation();
  const { data } = useGetAllICategoryQuery({
    tenantDomain,
    limit: 99999999999,
    page: 1,
    searchTerm: "",
  });
  const { data: brandData, isLoading: brandLoading } = useGetAllIBrandQuery({
    tenantDomain,
    limit: 99999999999,
    page: 1,
    searchTerm: "",
  });
  const { data: unitData, isLoading: unitLoading } = useGetAllIUnitQuery({
    tenantDomain,
    limit: 99999999999,
    page: 1,
    searchTerm: "",
  });
  const { data: productTypeData, isLoading: productTypeLoading } =
    useGetAllIProductTypeQuery({
      tenantDomain,
      limit: 99999999999,
      page: 1,
      searchTerm: "",
    });
  const { data: supplierData, isLoading: supplierLoading } =
    useGetAllSuppliersQuery({
      tenantDomain,
      limit: 1000000,
      page: 1,
      searchTerm: "",
    });
  const { data: wareHouseData, isLoading: warehouseLoading } =
    useGetAllWarehousesQuery({
      tenantDomain,
      limit: 1000000,
      page: 1,
      searchTerm: "",
    });

  // Options for dropdowns
  const warehouseOptions = useMemo(() => {
    if (!wareHouseData?.data?.warehouses) return [];
    return wareHouseData.data.warehouses.map((war) => ({
      label: war.name,
      value: war._id,
    }));
  }, [wareHouseData?.data?.warehouses]);

  const categoryOptions = useMemo(() => {
    if (!data?.data?.categories) return [];
    return data.data.categories.map((category) => ({
      label: category.main_category,
      value: category._id,
    }));
  }, [data]);

  const brandOptions = useMemo(() => {
    if (!brandData?.data?.brands) return [];
    return brandData.data.brands.map((brand) => ({
      label: brand.brand,
      value: brand._id,
    }));
  }, [brandData?.data?.brands]);

  const unitOptions = useMemo(() => {
    if (!unitData?.data?.units) return [];
    return unitData.data.units.map((unit) => ({
      label: unit.unit,
      value: unit._id,
    }));
  }, [unitData?.data?.units]);

  const productTypeOptions = useMemo(() => {
    if (!productTypeData?.data?.productTypes) return [];
    return productTypeData.data.productTypes.map((productType) => ({
      label: productType.product_type,
      value: productType._id,
    }));
  }, [productTypeData?.data?.productTypes]);

  const suppliersOptions = useMemo(() => {
    if (!supplierData?.data?.suppliers) return [];
    return supplierData.data.suppliers.map((supplier) => ({
      label: supplier.full_name,
      value: supplier._id,
    }));
  }, [supplierData?.data?.suppliers]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const handleReset = () => {
    setPreviewImage(null);
    setSelectedTags([]);
    setProductStatus("active");
    setErrors({});
    setActiveStep(0);
  };

  const defaultValues = useMemo(() => {
    if (!singleProduct?.data) return {};
    return {
      product_name: singleProduct.data.product_name || "",
      product_code: singleProduct.data.product_code || "",
      purchasePrice: singleProduct.data.purchasePrice || "",
      minimumSalePrice: singleProduct.data.minimumSalePrice || "",
      sellingPrice: singleProduct.data.purchasePrice || "",
      unit_price: singleProduct.data.unit_price || "",
      expense: singleProduct.data.expense || "",
      discount: singleProduct.data.discount || "",
      product_tax: singleProduct.data.product_tax || "",
      tax_method: singleProduct.data.tax_method || "",
      product_quantity: singleProduct.data.product_quantity || "",
      stock_alert: singleProduct.data.stock_alert || "",
      shipping: singleProduct.data.shipping || "",
      warranty: singleProduct.data.warranty || "",
      productDescription: singleProduct.data.productDescription || "",
      specifications: singleProduct.data.specifications || "",
      storageLocation: singleProduct.data.storageLocation || "",
      image: singleProduct.data.image || "",
      tags: singleProduct.data.tags || [],
      expiryDateType: singleProduct.data.expiryDateType || "fixed",
      expiryDate: singleProduct.data.expiryDate || "",
      manufacturingDate: singleProduct.data.manufacturingDate || null,
      shelfLife: singleProduct.data.shelfLife || "",
      shelfLifeUnit: singleProduct.data.shelfLifeUnit || "Days",
      batchNumber: singleProduct.data.batchNumber || "",
      expiryAlertDays: singleProduct.data.expiryAlertDays || 30,
      category: singleProduct.data.category
        ? [
            categoryOptions.find(
              (cat) => cat.value === singleProduct.data.category._id
            )?.label || "",
          ]
        : [],
      brand: singleProduct.data.brand
        ? [
            brandOptions.find(
              (brand) => brand.value === singleProduct.data.brand._id
            )?.label || "",
          ]
        : [],
      unit: singleProduct.data.unit
        ? [
            unitOptions.find(
              (unit) => unit.value === singleProduct.data.unit._id
            )?.label || "",
          ]
        : [],
      warehouse: singleProduct.data.warehouse
        ? [
            warehouseOptions.find(
              (warehouse) =>
                warehouse.value === singleProduct.data.warehouse._id
            )?.label || "",
          ]
        : [],
      product_type: singleProduct.data.product_type
        ? [
            productTypeOptions.find(
              (type) => type.value === singleProduct.data.product_type._id
            )?.label || "",
          ]
        : [],
      suppliers: singleProduct.data.suppliers
        ? [
            suppliersOptions.find(
              (supplier) => supplier.value === singleProduct.data.suppliers._id
            )?.label || "",
          ]
        : [],
      initialStock: singleProduct.data.initialStock || 0,
      stock: singleProduct.data.stock || 0,
      reorderLevel: singleProduct.data.reorderLevel || 0,
      lastPurchaseDate: singleProduct.data.lastPurchaseDate || null,
      lastSoldDate: singleProduct.data.lastSoldDate || null,
      isDeleted: singleProduct.data.isDeleted || false,
    };
  }, [
    singleProduct?.data,
    categoryOptions,
    brandOptions,
    unitOptions,
    productTypeOptions,
    suppliersOptions,
    warehouseOptions,
  ]);

  useEffect(() => {
    if (singleProduct?.data?.productStatus) {
      setProductStatus(singleProduct.data.productStatus);
    }
  }, [singleProduct?.data]);

  useEffect(() => {
    if (singleProduct?.data?.tags && Array.isArray(singleProduct.data.tags)) {
      setSelectedTags(singleProduct.data.tags);
    }
  }, [singleProduct?.data]);

  useEffect(() => {
    if (singleProduct?.data?.image) {
      setPreviewImage(singleProduct.data.image);
    }
  }, [singleProduct?.data]);

  useEffect(() => {
    if (singleProduct?.data?.expiryDateType) {
      setExpiryDateType(singleProduct.data.expiryDateType);
    }
  }, [singleProduct?.data]);

  if (
    productTypeLoading |
    brandLoading |
    unitLoading |
    warehouseLoading |
    supplierLoading
  ) {
    return <h4>Loading.........</h4>;
  }

  const handleSubmit = async (data) => {
    try {
      const imageUrl =
        data.image && data.image.length > 0 ? data.image[0] : data?.data?.image;

      const modifyValues = {
        ...data,
        image: imageUrl,
        suppliers:
          data.suppliers?.[0] &&
          suppliersOptions.find((cat) => cat.label === data.suppliers[0])?.value
            ? [
                suppliersOptions.find((cat) => cat.label === data.suppliers[0])
                  .value,
              ]
            : [],
        category:
          data.category?.[0] &&
          categoryOptions.find((cat) => cat.label === data.category[0])?.value
            ? [
                categoryOptions.find((cat) => cat.label === data.category[0])
                  .value,
              ]
            : [],
        warehouse:
          data.warehouse?.[0] &&
          warehouseOptions.find((cat) => cat.label === data.warehouse[0])?.value
            ? [
                warehouseOptions.find((cat) => cat.label === data.warehouse[0])
                  .value,
              ]
            : [],
        brand:
          data.brand?.[0] &&
          brandOptions.find((brand) => brand.label === data.brand[0])?.value
            ? [
                brandOptions.find((brand) => brand.label === data.brand[0])
                  .value,
              ]
            : [],
        unit:
          data.unit?.[0] &&
          unitOptions.find((unit) => unit.label === data.unit[0])?.value
            ? [unitOptions.find((unit) => unit.label === data.unit[0]).value]
            : [],
        product_type:
          data.product_type?.[0] &&
          productTypeOptions.find((type) => type.label === data.product_type[0])
            ?.value
            ? [
                productTypeOptions.find(
                  (type) => type.label === data.product_type[0]
                ).value,
              ]
            : [],
        minimumSalePrice: Number(data.minimumSalePrice),
        purchasePrice: Number(data.purchasePrice),
        sellingPrice: Number(data.sellingPrice),
        discount: Number(data.discount),
        expense: Number(data.expense),
        product_tax: Number(data.product_tax),
        stock_alert: Number(data.stock_alert),
        product_quantity: Number(data.product_quantity),
        unit_price: Number(data.unit_price),
        shipping: Number(data.shipping),
        tags: data.tags,
        productStatus: data.productStatus,
        expiryDateType: expiryDateType,
        expiryDate: data.expiryDate,
        shelfLife: Number(data.shelfLife),
        shelfLifeUnit: data.shelfLifeUnit,
        manufacturingDate: data.manufacturingDate,
        batchNumber: data.batchNumber,
        expiryAlertDays: Number(data.expiryAlertDays),
        initialStock: Number(data.initialStock || 0),
        stock: Number(data.stock || 0),
        stockIn: Number(data.stockIn || 0),
        stockOut: Number(data.stockOut || 0),
        reorderLevel: Number(data.reorderLevel || 0),
        lastPurchaseDate: data.lastPurchaseDate,
        lastSoldDate: data.lastSoldDate,
        isDeleted: data.isDeleted || false,
      };
      if (!id) {
        const res = await createProduct({
          tenantDomain,
          ...modifyValues,
        }).unwrap();
        if (res.success) {
          toast.success("Product create successfully!");
          navigate("/dashboard/product-list");
        }
      } else {
        const res = await updateProduct({
          tenantDomain,
          id,
          ...modifyValues,
        }).unwrap();
        if (res.success) {
          toast.success("Product update successfully!");
          navigate("/dashboard/product-list");
        }
      }
    } catch (error) {
      const apiError = error?.data || error;

      // Show specific Zod validation error if available
      if (apiError?.errorSources?.length > 0) {
        apiError.errorSources.forEach((source) => {
          toast.error(`${source.path}: ${source.message}`);
        });
      } else if (apiError?.message) {
        toast.error(apiError.message);
      } else {
        toast.error("Failed to create product");
      }
    }
  };

  const steps = [
    {
      label: "Basic Information",
      description: "Enter the basic details of the product",
      icon: <ShoppingBag />,
      content: (
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <TASInput
              name="product_name"
              label={
                <>
                  Product Name
                  <span style={{ color: "red", fontSize: "25px" }}> *</span>
                </>
              }
              placeholder="Product Name"
              icon={ShoppingBag}
              iconPosition="start"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TASInput
              name="product_code"
              label={
                <>
                  Product Code
                  <span style={{ color: "red", fontSize: "25px" }}> *</span>
                </>
              }
              placeholder="e.g., OIL-2023-01"
              icon={ShoppingBag}
              iconPosition="start"
            />
          </Grid>

          {/* Category with Add Button */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={8.5} lg={11}>
                <TASAutocomplete
                  size="medium"
                  name="category"
                  label={
                    <>
                      Category
                      <span style={{ color: "red", fontSize: "25px" }}> *</span>
                    </>
                  }
                  placeholder="e.g., Electronics, Clothing"
                  icon={Category}
                  iconPosition="start"
                  options={categoryOptions}
                />
              </Grid>
              <Grid item lg={1} display="flex" justifyContent="center">
                <Tooltip title="Add Category" arrow>
                  <Button
                    onClick={handleCategoryOpen}
                    variant="contained"
                    sx={addButtonStyle}
                  >
                    <AddCircleOutlineIcon fontSize="medium" />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>

          {/* Warehouse with Add Button */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={8.5} lg={11}>
                <TASAutocomplete
                  size="medium"
                  name="warehouse"
                  label={
                    <>
                      Warehouse
                      <span style={{ color: "red", fontSize: "25px" }}> *</span>
                    </>
                  }
                  placeholder="Select Warehouse"
                  icon={Category}
                  iconPosition="start"
                  options={warehouseOptions}
                />
              </Grid>
              <Grid item lg={1} display="flex" justifyContent="center">
                <Tooltip title="Add Warehouse" arrow>
                  <Button
                    onClick={handleWarehouseOpen}
                    variant="contained"
                    sx={addButtonStyle}
                  >
                    <AddCircleOutlineIcon fontSize="medium" />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>

          {/* Brand with Add Button */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={8.5} lg={11}>
                <TASAutocomplete
                  size="medium"
                  name="brand"
                  label={
                    <>
                      Brand
                      <span style={{ color: "red", fontSize: "25px" }}> *</span>
                    </>
                  }
                  placeholder="e.g., Nike, Apple"
                  icon={Category}
                  iconPosition="start"
                  options={brandOptions}
                />
              </Grid>
              <Grid item lg={1} display="flex" justifyContent="center">
                <Tooltip title="Add Brand" arrow>
                  <Button
                    onClick={handleBrandOpen}
                    variant="contained"
                    sx={addButtonStyle}
                  >
                    <AddCircleOutlineIcon fontSize="medium" />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>

          {/* Product Type with Add Button */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={8.5} lg={11}>
                <TASAutocomplete
                  size="medium"
                  name="product_type"
                  label={
                    <>
                      Product Type
                      <span style={{ color: "red", fontSize: "25px" }}> *</span>
                    </>
                  }
                  placeholder="Select Product Type"
                  icon={Category}
                  iconPosition="start"
                  options={productTypeOptions}
                />
              </Grid>
              <Grid item lg={1} display="flex" justifyContent="center">
                <Tooltip title="Add Product Type" arrow>
                  <Button
                    onClick={handleProductTypeOpen}
                    variant="contained"
                    sx={addButtonStyle}
                  >
                    <AddCircleOutlineIcon fontSize="medium" />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>

          {/* Supplier with Add Button */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={8.5} lg={11}>
                <TASAutocomplete
                  size="medium"
                  name="suppliers"
                  label={
                    <>
                      Select Supplier
                      <span style={{ color: "red", fontSize: "25px" }}> *</span>
                    </>
                  }
                  placeholder="Choose Supplier"
                  icon={Category}
                  iconPosition="start"
                  options={suppliersOptions}
                />
              </Grid>
              <Grid item lg={1} display="flex" justifyContent="center">
                <Tooltip title="Add Supplier" arrow>
                  <Button
                    onClick={handleSupplierOpen}
                    variant="contained"
                    sx={addButtonStyle}
                  >
                    <AddCircleOutlineIcon fontSize="medium" />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <TagsInput name="tags" />
          </Grid>
          <Grid item xs={12}>
            <ImageUpload
              defaultValues={singleProduct?.data?.image}
              fullWidth
              name="image"
              label={
                <>
                  Upload product image
                  <span style={{ color: "red", fontSize: "25px" }}> *</span>
                </>
              }
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Pricing Information",
      description: "Set pricing details for the product",
      icon: <MonetizationOn />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TASInput
              name="purchasePrice"
              label={
                <>
                  Purchase Price
                  <span style={{ color: "red", fontSize: "25px" }}> *</span>
                </>
              }
              placeholder="Purchase Price"
              required
              icon={MonetizationOn}
              iconPosition="start"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TASInput
              name="sellingPrice"
              label={
                <>
                  Selling Price
                  <span style={{ color: "red", fontSize: "25px" }}> *</span>
                </>
              }
              placeholder="Selling Price"
              required
              icon={MonetizationOn}
              iconPosition="start"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TASInput
              name="minimumSalePrice"
              label={
                <>
                  Minimum Sale Price
                  <span style={{ color: "red", fontSize: "25px" }}> *</span>
                </>
              }
              placeholder="Minimum Sale Price"
              required
              icon={MonetizationOn}
              iconPosition="start"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TASInput
              name="expense"
              label={
                <>
                  Extra Expense
                  <span style={{ color: "red", fontSize: "25px" }}> *</span>
                </>
              }
              placeholder="Expense"
              required
              icon={MonetizationOn}
              iconPosition="start"
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TASInput
              name="discount"
              label="Discount"
              placeholder="Discount"
              icon={Discount}
              iconPosition="start"
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TASInput
              name="product_tax"
              label="Product Tax"
              placeholder="Product Tax"
              icon={MonetizationOn}
              iconPosition="start"
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TASInput
              name="tax_method"
              label="Tax Method"
              placeholder="Product Tax"
              icon={Settings}
              iconPosition="start"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "rgba(106, 27, 154, 0.05)",
                borderRadius: 2,
                border: "1px dashed rgba(106, 27, 154, 0.3)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <HelpIcon color="primary" sx={{ mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" color="primary.main">
                    Pricing Information
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Setting the right price is crucial. Consider your costs,
                    market rates, and profit margins. The unit price will be
                    used in quotations and invoices.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Inventory Information",
      description: "Set inventory details and stock levels",
      icon: <Inventory />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TASInput
              name="product_quantity"
              label={
                <>
                  Product Quantity
                  <span style={{ color: "red", fontSize: "25px" }}> *</span>
                </>
              }
              placeholder="Product Quantity"
              required
              icon={Inventory}
              iconPosition="start"
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TASInput
              name="stock_alert"
              label={
                <>
                  Stock Alert
                  <span style={{ color: "red", fontSize: "25px" }}> *</span>
                </>
              }
              placeholder="Minimum quantity before alert"
              required
              icon={Speed}
              iconPosition="start"
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TASInput
              name="initialStock"
              label="Initial Stock"
              placeholder="Initial stock quantity"
              icon={Inventory}
              iconPosition="start"
              type="number"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TASInput
              name="reorderLevel"
              label="Reorder Level"
              placeholder="Quantity to trigger reorder"
              icon={Speed}
              iconPosition="start"
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormDatePicker
              name="lastPurchaseDate"
              label="Last Purchase Date"
              fullWidth
              icon={CalendarMonth}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormDatePicker
              name="lastSoldDate"
              label="Last Sold Date"
              fullWidth
              icon={CalendarMonth}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={1} alignItems="center">
              <Grid item lg={11}>
                <TASAutocomplete
                  size="medium"
                  name="unit"
                  label={
                    <>
                      Unit
                      <span style={{ color: "red", fontSize: "25px" }}> *</span>
                    </>
                  }
                  placeholder="kg, pcs, liters"
                  icon={Category}
                  iconPosition="start"
                  options={unitOptions}
                />
              </Grid>
              <Grid item lg={1} display="flex" justifyContent="center">
                <Tooltip title="Add Unit" arrow>
                  <Button
                    onClick={handleUnitOpen}
                    variant="contained"
                    sx={addButtonStyle}
                  >
                    <AddCircleOutlineIcon fontSize="medium" />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <TASInput
              name="storageLocation"
              label="Storage Location"
              icon={Store}
              iconPosition="start"
            />
          </Grid>
          <Grid item xs={12}>
            <ProductStatusSelector name="productStatus" />
          </Grid>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "rgba(106, 27, 154, 0.05)",
                borderRadius: 2,
                border: "1px dashed rgba(106, 27, 154, 0.3)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <HelpIcon color="primary" sx={{ mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" color="primary.main">
                    Inventory Management
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Products with accurate inventory details will appear in
                    quotations and invoices when searched. Set stock alerts to
                    receive notifications when inventory is low.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Expiration Management",
      description: "Set expiration dates and alerts",
      icon: <CalendarMonth />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "rgba(244, 67, 54, 0.05)",
                borderRadius: 2,
                border: "1px dashed rgba(244, 67, 54, 0.3)",
                mb: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <WarningRounded color="error" sx={{ mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" color="error.main">
                    Important: Expiration Management
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Properly tracking expiration dates helps prevent losses and
                    ensures product quality. Choose the appropriate expiration
                    tracking method for your product.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="expiry-date-type-label">
                Expiration Tracking Method
              </InputLabel>
              <Select
                labelId="expiry-date-type-label"
                name="expiryDateType"
                value={expiryDateType}
                onChange={(e) => setExpiryDateType(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <AccessTime />
                  </InputAdornment>
                }
              >
                <MenuItem value="fixed">Fixed Expiration Date</MenuItem>
                <MenuItem value="variable">
                  Shelf Life Based (from Manufacturing Date)
                </MenuItem>
                <MenuItem value="none">No Expiration Date</MenuItem>
              </Select>
              <FormHelperText>
                Select how you want to track this product's expiration
              </FormHelperText>
            </FormControl>
          </Grid>
          {expiryDateType === "fixed" && (
            <>
              <Grid item xs={12} md={6}>
                <FormDatePicker
                  name="expiryDate"
                  label="Expiration Date"
                  fullWidth
                  icon={CalendarMonth}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TASInput
                  name="batchNumber"
                  label="Batch Number"
                  placeholder="e.g., BT-2023-001"
                  icon={Inventory}
                  iconPosition="start"
                />
              </Grid>
            </>
          )}
          {expiryDateType === "variable" && (
            <>
              <Grid item xs={12} md={6}>
                <FormDatePicker
                  name="manufacturingDate"
                  label="Manufacturing Date"
                  fullWidth
                  icon={Inventory}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TASInput
                  name="batchNumber"
                  label="Batch Number"
                  placeholder="e.g., BT-2023-001"
                  icon={Inventory}
                  iconPosition="start"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TASInput
                  name="shelfLife"
                  label="Shelf Life"
                  placeholder="e.g., 24"
                  type="number"
                  icon={AccessTime}
                  iconPosition="start"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TASSelect
                  name="shelfLifeUnit"
                  label="Shelf Life Unit"
                  items={["Days", "Weeks", "Months", "Years"]}
                  icon={AccessTime}
                  iconPosition="start"
                  size="medium"
                />
              </Grid>
            </>
          )}
          {expiryDateType !== "none" && (
            <Grid item xs={12} md={6}>
              <TASInput
                name="expiryAlertDays"
                label="Expiry Alert Days"
                placeholder="Days before expiry to alert"
                type="number"
                defaultValue={30}
                fullWidth
                icon={Notifications}
                iconPosition="start"
                helperText="Number of days before expiration to trigger alerts"
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "rgba(106, 27, 154, 0.05)",
                borderRadius: 2,
                border: "1px dashed rgba(106, 27, 154, 0.3)",
                mt: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <HelpIcon color="primary" sx={{ mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" color="primary.main">
                    Expiration Management Tips
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    <strong>Fixed Expiration Date:</strong> Use for products
                    with a specific expiration date printed on them.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    <strong>Shelf Life Based:</strong> Use for products where
                    expiration is calculated from the manufacturing date.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Expiry Alert Days:</strong> Set how many days before
                    expiration you want to be notified.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Additional Details",
      description: "Add specifications and other information",
      icon: <Settings />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TASInput
              name="shipping"
              label="Shipping Cost"
              icon={Store}
              iconPosition="start"
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TASInput
              name="warranty"
              label="Warranty Period"
              icon={WarningRounded}
              iconPosition="start"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextArea
              name="productDescription"
              label="Product Description"
              icon={WarningRounded}
              iconPosition="start"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextArea
              name="specifications"
              label="Technical Specifications"
              icon={WarningRounded}
              iconPosition="start"
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="is-deleted-label">Is Deleted</InputLabel>
              <Select
                labelId="is-deleted-label"
                name="isDeleted"
                defaultValue={false}
                startAdornment={
                  <InputAdornment position="start">
                    <Settings />
                  </InputAdornment>
                }
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
              <FormHelperText>
                Mark as deleted without removing from database
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      ),
    },
  ];

  return singleProductLoading ? (
    <h4>Loading</h4>
  ) : (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #f9f9f9, #f0f0f0)",
          pt: 2,
          pb: 8,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: "#42A0D9",
            color: "white",
            py: 3,
            mb: 4,
            borderRadius: { xs: "0 0 20px 20px", md: "0 0 20px 20px" },
            boxShadow: "0 4px 20px rgba(106, 27, 154, 0.4)",
          }}
        >
          <Container maxWidth="xl">
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <ShoppingBag sx={{ fontSize: 40, mr: 2 }} />
              <span className="font-[700] text-[30px] md:text-[35px]">
                Create New Product
              </span>
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 700 }}>
              Create a new product by filling in the required information.
              Follow the steps to complete the process.
            </Typography>
          </Container>
        </Box>
        <Container maxWidth="xl" sx={{ p: { xs: 1, md: 2 } }}>
          <Box sx={{ mb: 3 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{
                borderRadius: 100,
                borderColor: "rgba(0,0,0,0.12)",
                color: "text.secondary",
                px: 3,
              }}
            >
              Back to Product List
            </Button>
          </Box>

          <Paper
            elevation={3}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              mb: 4,
            }}
          >
            <GarageForm onSubmit={handleSubmit} defaultValues={defaultValues}>
              <Box sx={{ p: { xs: 0, md: 4 } }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        StepIconProps={{
                          icon: step.icon,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600 }}
                        >
                          {step.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {step.description}
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        <div className="mt-2 mb-1">{step.content}</div>
                        <div className="md:flex mt-4 mb-2  gap-2 space-x-2">
                          <div className="mb-2 space-x-2">
                            <Button
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{
                                borderRadius: 100,
                                px: 3,
                                color: "white",
                              }}
                            >
                              Back
                            </Button>
                            {index === steps.length - 1 ? (
                              <Button
                                variant="contained"
                                type="submit"
                                startIcon={<SaveIcon />}
                                disabled={submitting}
                                sx={{
                                  borderRadius: 100,
                                  background:
                                    "linear-gradient(135deg, #6a1b9a 0%, #4a148c 100%)",
                                  boxShadow:
                                    "0 4px 10px rgba(106, 27, 154, 0.3)",
                                  px: 3,
                                  color: "white",
                                }}
                              >
                                {id ? "Update Product " : "Create Product"}
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{
                                  borderRadius: 100,
                                  background:
                                    "linear-gradient(135deg, #6a1b9a 0%, #4a148c 100%)",
                                  boxShadow:
                                    "0 4px 10px rgba(106, 27, 154, 0.3)",
                                  px: 3,
                                  color: "white",
                                }}
                              >
                                Continue
                              </Button>
                            )}
                          </div>

                          <Button
                            variant="outlined"
                            onClick={handleReset}
                            startIcon={<ClearIcon />}
                            sx={{
                              borderRadius: 100,
                              borderColor: "rgba(0,0,0,0.12)",
                              color: "text.secondary",
                              px: 3,
                              ml: "auto",
                            }}
                          >
                            Reset
                          </Button>
                        </div>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </GarageForm>
          </Paper>
          {/* Help Card */}
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 4,
              background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <HelpIcon sx={{ color: "#2e7d32", mt: 0.5 }} />
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ color: "#2e7d32", fontWeight: 600 }}
              >
                Need Help?
              </Typography>
              <Typography variant="body2" sx={{ color: "#1b5e20" }}>
                Creating a product is the first step in managing your inventory.
                After creating a product, it will be available in quotations and
                invoices. Make sure to fill in all required fields for optimal
                results and easy searchability.
              </Typography>
            </Box>
          </Paper>
        </Container>
        {/* Success Backdrop */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={success}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "white",
              p: 4,
              borderRadius: 4,
              maxWidth: 400,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: "#e8f5e9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <CheckCircle sx={{ fontSize: 50, color: "#2e7d32" }} />
            </Box>
            <Typography
              variant="h5"
              sx={{ color: "#2e7d32", fontWeight: 600, mb: 1 }}
            >
              Success!
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
              Your product has been created successfully. Redirecting to product
              list...
            </Typography>
            <CircularProgress size={24} sx={{ color: "#6a1b9a" }} />
          </Box>
        </Backdrop>
        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
      {categoryOpen && (
        <CreateCategoryModal
          open={categoryOpen}
          setOpen={handleCategoryClose}
        />
      )}
      {brandOpen && (
        <CreateBrandModal open={brandOpen} setOpen={handleBrandClose} />
      )}
      {warehouseOpen && (
        <AddWarehouseModal
          open={warehouseOpen}
          onClose={handleWarehouseClose}
        />
      )}
      {productTypeOpen && (
        <CreateProductTypeModal
          open={productTypeOpen}
          setOpen={handleProductTypeClose}
        />
      )}
      {supplierOpen && (
        <AddSupplierModal open={supplierOpen} setOpen={handleSupplierClose} />
      )}
      {unitOpen && (
        <CreateUnitModal open={unitOpen} setOpen={handleUnitClose} />
      )}
    </>
  );
}
