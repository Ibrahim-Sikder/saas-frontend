"use client"

/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react"
import TASForm from "../../../components/form/Form"
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  IconButton,
  Chip,
  Avatar,
  InputAdornment,
  alpha,
  useTheme,
  Tooltip,
  CircularProgress,
} from "@mui/material"
import TASInput from "../../../components/form/Input"
import TASDatepicker from "../../../components/form/Datepicker"
import AddjustmentFileUpload from "../../../components/form/AddjustmentFileUpload"
import { useGetAllIProductQuery } from "../../../redux/api/productApi"
import TASSelect from "../../../components/form/Select"
import TASTextarea from "../../../components/form/Textarea"
import { toast } from "react-toastify"
import { useCreateAdjustmentMutation } from "../../../redux/api/adjustmentApi"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  CalendarMonth as CalendarIcon,
  Numbers as NumbersIcon,
  Search as SearchIcon,
  Inventory as InventoryIcon,
  ReceiptLong as ReceiptIcon,
  AddCircle as AddCircleIcon,
  RemoveCircle as RemoveCircleIcon,
  Notes as NotesIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Tune as TuneIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material"
import TASAutocomplete from "../../../components/form/Autocomplete"
import { outlinedInputWrapperSx } from "../../../utils/customStyle"
import { StoreIcon } from "lucide-react"
import { useGetAllWarehousesQuery } from "../../../redux/api/warehouseApi"
import { useGetAllStocksQuery } from "../../../redux/api/stocksApi"

const MotionBox = motion(Box)
const MotionCard = motion(Card)

const AddAdjustmentForm = () => {
  const theme = useTheme()
  const [params, setParams] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const {
    data: productsData,
    isLoading: productsLoading,
    isFetching: productsFetching,
  } = useGetAllIProductQuery([...params])
  const { data: warehouseData } = useGetAllWarehousesQuery({
    limit: 1000000,
    page: 1,
    searchTerm: "",
  })
  const queryParams = { page: currentPage, limit: 100, searchTerm: searchTerm }

  const { data: stockData, isLoading } = useGetAllStocksQuery(queryParams)

  const wareHouseOptions = useMemo(() => {
    if (!warehouseData?.data?.warehouses) return []
    return warehouseData.data.warehouses.map((warehouse) => ({
      label: warehouse.name,
      value: warehouse._id,
    }))
  }, [warehouseData?.data?.warehouses])

  const [createAdjustment, { isLoading: isSubmitting }] = useCreateAdjustmentMutation()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [productFields, setProductFields] = useState([])
  const [fileList, setFileList] = useState([])

  const productOptions = useMemo(() => {
    if (!productsData?.data?.products) return []
    return productsData.data.products.map((product) => ({
      label: product.product_name,
      value: product._id,
      product,
    }))
  }, [productsData?.data?.products])

  const handleProductChange = (newValue) => {
    setSelectedProduct(newValue?.value || null)
  }

  const handleQuantityChange = (action) => {
    setQuantity((prev) => {
      if (action === "increase") return prev + 1
      if (action === "decrease") return prev > 1 ? prev - 1 : 1
      return prev
    })
  }

  const onAddProductField = (product) => {
    // Check if product already exists
    const existingProductIndex = productFields.findIndex((field) => field.productId === product.stock.product._id)

    if (existingProductIndex !== -1) {
      toast.info("Product already added. You can adjust its quantity below.", {
        position: "top-right",
        autoClose: 3000,
      })
      return
    }

    setProductFields([
      ...productFields,
      {
        productId: product.stock.product._id,
        productName: product.stock.product.product_name,
        productCode: product.stock.product.product_code || "N/A",
        type: "Addition",
        quantity: 1,
        serialNumber: "",
        currentStock: product.stock.inQuantity - product.stock.outQuantity,
        avgPurchasePrice: product.stock.avgPurchasePrice,
        warehouse: product.stock.warehouse._id,
      },
    ])

    toast.success("Product added successfully", {
      position: "top-right",
      autoClose: 2000,
    })
  }

  const onRemoveProductField = (index) => {
    const newFields = [...productFields]
    newFields.splice(index, 1)
    setProductFields(newFields)

    toast.info("Product removed", {
      position: "top-right",
      autoClose: 2000,
    })
  }

  const handleSubmit = async (data) => {
    if (productFields.length === 0) {
      toast.error("Please add at least one product", {
        position: "top-right",
        autoClose: 3000,
      })
      return
    }

    const imageUrl = Array.isArray(data.image) ? data.image[0] : data.image
    const modifyData = {
      image: imageUrl,
      ...data,
      warehouse:
        data.warehouse && data.warehouse[0] && wareHouseOptions.find((cat) => cat.label === data.warehouse[0])?.value
          ? [wareHouseOptions.find((cat) => cat.label === data.warehouse[0]).value]
          : [],
      products: productFields.map((product) => ({
        productId: product.productId,
        productName: product.productName,
        productCode: product.productCode || "N/A",
        type: product.type,
        quantity: Number(product.quantity),
        warehouse: product.warehouse,
        currentStock: product.currentStock,
        avgPurchasePrice: product.avgPurchasePrice,
      })),
    }

    const formData = new FormData()

    for (const key in modifyData) {
      if (key === "products") {
        modifyData.products.forEach((product, index) => {
          for (const productKey in product) {
            formData.append(`products[${index}][${productKey}]`, product[productKey].toString())
          }
        })
      } else {
        formData.append(key, modifyData[key]?.toString())
      }
    }

    if (fileList.length > 0) {
      formData.append("attachDocument", fileList[0].originFileObj)
    }

    try {
      const res = await createAdjustment(formData).unwrap()

      if (res.success) {
        toast.success("Adjustment created successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: "#10b981",
            color: "#fff",
            borderRadius: "10px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          },
        })
      }
      navigate("/dashboard/quantity-adjustment")
    } catch (error) {
        const errorMessage =
        error.data?.errorSources?.[0]?.message ||
        error.data?.err?.issues?.[0]?.message ||
        error.data?.message ||
        'Failed to create adjustment'

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
  }

  const handleChange = (_value, option) => {
    if (!option) return
    onAddProductField(option)
  }

  const handleSearchChange = (value) => {
    setSearchTerm(value)
    setParams([{ name: "searchTerm", value }])
  }

  return (
    <TASForm onSubmit={handleSubmit}>
      {/* Header Section */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            color: theme.palette.text.primary,
            fontWeight: "bold",
          }}
        >
          <TuneIcon sx={{ mr: 1, color: "#6366f1" }} />
          Inventory Adjustment Details
        </Typography>

        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/dashboard/quantity-adjustment")}
          sx={{
            borderRadius: "12px",
            borderColor: "#cbd5e1",
            color: "#64748b",
            "&:hover": {
              borderColor: "#94a3b8",
              backgroundColor: "#f8fafc",
            },
          }}
        >
          Back to List
        </Button>
      </Box>

      {/* Document Upload and Basic Info */}
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
              background: "linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                py: 2,
                px: 3,
                display: "flex",
                alignItems: "center",
              }}
            >
              <ReceiptIcon sx={{ color: "white", mr: 1.5 }} />
              <Typography variant="h6" fontWeight="700" color="white">
                Document
              </Typography>
            </Box>
            <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" color="#64748b" sx={{ mb: 3 }}>
                Attach invoice or related documents for this adjustment
              </Typography>

              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <AddjustmentFileUpload name="attachDocument" label="Attach Document" fullWidth sx={{ width: "100%" }} />
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Right Column - Basic Info */}
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
              background: "linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
            }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                py: 2,
                px: 3,
                display: "flex",
                alignItems: "center",
              }}
            >
              <TuneIcon sx={{ color: "white", mr: 1.5 }} />
              <Typography variant="h6" fontWeight="700" color="white">
                Adjustment Details
              </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body2" color="#64748b" sx={{ mb: 3 }}>
                Enter the basic information for this inventory adjustment
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TASDatepicker
                    name="date"
                    label="Adjustment Date"
                    fullWidth
                    size="medium"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarIcon color="action" />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: "12px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#e2e8f0",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#cbd5e1",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#6366f1",
                          borderWidth: "2px",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TASInput
                    name="referenceNo"
                    label="Reference No"
                    fullWidth
                    size="medium"
                    placeholder="ADJ-0001"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <NumbersIcon color="action" />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: "12px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#e2e8f0",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#cbd5e1",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#6366f1",
                          borderWidth: "2px",
                        },
                      },
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
              </Grid>
            </CardContent>
          </MotionCard>
        </Grid>
      </Grid>

      {/* Product Search */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        elevation={0}
        sx={{
          borderRadius: "20px",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          mt: 4,
          overflow: "hidden",
          background: "linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            py: 2,
            px: 3,
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchIcon sx={{ color: "white", mr: 1.5 }} />
          <Typography variant="h6" fontWeight="700" color="white">
            Add Products
          </Typography>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="body2" color="#64748b" sx={{ mb: 3 }}>
            Search and add products to adjust their inventory quantities
          </Typography>

          <Autocomplete
            freeSolo
            disableClearable
            options={
              stockData?.data?.map((stock) => ({
                label: stock.product.product_name,
                value: stock.product._id,
                stock,
              })) || []
            }
            loading={isLoading}
            value={null}
            onChange={handleChange}
            onInputChange={(event, newValue) => setSearchTerm(newValue)}
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
                  endAdornment: (
                    <>
                      {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                  sx: {
                    borderRadius: "12px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e2e8f0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#cbd5e1",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#6366f1",
                      borderWidth: "2px",
                    },
                  },
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: 50,
                      height: 50,
                      mr: 2,
                      backgroundColor: alpha("#6366f1", 0.1),
                      borderRadius: "12px",
                      border: "1px solid",
                      borderColor: alpha("#6366f1", 0.2),
                    }}
                  >
                    <InventoryIcon sx={{ color: "#6366f1" }} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight="600">
                      {option.label}
                    </Typography>
                    <Typography variant="body2" color="#64748b">
                      Code: {option.stock.product.product_code || "N/A"} | Stock:{" "}
                      {option.stock.inQuantity - option.stock.outQuantity || "N/A"}
                    </Typography>
                  </Box>
                  <Chip
                    label="Add"
                    size="small"
                    color="primary"
                    sx={{
                      borderRadius: "8px",
                      fontWeight: 600,
                      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      boxShadow: "0 2px 5px rgba(99, 102, 241, 0.3)",
                    }}
                  />
                </Box>
              </li>
            )}
          />
        </CardContent>
      </MotionCard>

      {/* Product List */}
      <Box sx={{ mt: 4 }}>
        <AnimatePresence>
          {productFields.length === 0 ? (
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              sx={{
                p: 6,
                borderRadius: "20px",
                border: "2px dashed #e2e8f0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: alpha("#f8fafc", 0.5),
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  backgroundColor: alpha("#6366f1", 0.1),
                  color: "#6366f1",
                  mb: 2,
                }}
              >
                <InventoryIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h6" fontWeight="600" color="#1e293b" textAlign="center">
                No Products Added Yet
              </Typography>
              <Typography variant="body2" color="#64748b" textAlign="center" sx={{ mt: 1, maxWidth: "400px" }}>
                Search for products above and add them to make inventory adjustments
              </Typography>
            </MotionBox>
          ) : (
            productFields.map((field, index) => (
              <MotionCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                elevation={0}
                sx={{
                  borderRadius: "16px",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  mb: 3,
                  overflow: "hidden",
                  background:
                    field.type === "Addition"
                      ? "linear-gradient(to right, rgba(240, 253, 244, 0.5), white)"
                      : "linear-gradient(to right, rgba(254, 242, 242, 0.5), white)",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                }}
              >
                <Box sx={{ p: 3, position: "relative" }}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={3}>
                      <Box sx={{ mb: { xs: 1, md: 0 } }}>
                        <Typography variant="body2" color="#64748b" gutterBottom>
                          Product
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              width: 36,
                              height: 36,
                              mr: 1.5,
                              bgcolor: alpha("#6366f1", 0.1),
                              color: "#6366f1",
                              borderRadius: "8px",
                            }}
                          >
                            <InventoryIcon fontSize="small" />
                          </Avatar>
                          <Typography variant="body1" fontWeight="600" color="#1e293b">
                            {field.productName}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={2}>
                      <Box sx={{ mb: { xs: 1, md: 0 } }}>
                        <Typography variant="body2" color="#64748b" gutterBottom>
                          Current Stock
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Chip
                            icon={<InventoryIcon fontSize="small" />}
                            label={field.currentStock || 0}
                            size="small"
                            sx={{
                              bgcolor: alpha("#10b981", 0.1),
                              color: "#10b981",
                              fontWeight: "medium",
                              borderRadius: "8px",
                              "& .MuiChip-icon": {
                                color: "#10b981",
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={2}>
                      <Box sx={{ mb: { xs: 1, md: 0 } }}>
                        <Typography variant="body2" color="#64748b" gutterBottom>
                          Avg. Purchase Price
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Chip
                            label={`$${field.avgPurchasePrice || 0}`}
                            size="small"
                            sx={{
                              bgcolor: alpha("#6366f1", 0.1),
                              color: "#6366f1",
                              fontWeight: "medium",
                              borderRadius: "8px",
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={2}>
                      <Box sx={{ mb: { xs: 1, md: 0 } }}>
                        <Typography variant="body2" color="#64748b" gutterBottom>
                          Adjustment Type
                        </Typography>
                        <TASSelect
                          items={["Addition", "Subtraction"]}
                          name={`products[${index}].type`}
                          fullWidth
                          size="medium"
                          value={field.type}
                          defaultValue={field.type}
                          onChange={(value) => {
                            const newFields = [...productFields]
                            newFields[index].type = value
                            setProductFields(newFields)
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e2e8f0",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#cbd5e1",
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#6366f1",
                                borderWidth: "2px",
                              },
                            },
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {field.type === "Addition" ? (
                                  <AddCircleIcon sx={{ color: "#10b981" }} />
                                ) : (
                                  <RemoveCircleIcon sx={{ color: "#ef4444" }} />
                                )}
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={2}>
                      <Box sx={{ mb: { xs: 1, md: 0 } }}>
                        <Typography variant="body2" color="#64748b" gutterBottom>
                          Quantity
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => {
                                const newFields = [...productFields]
                                if (newFields[index].quantity > 1) {
                                  newFields[index].quantity -= 1
                                  setProductFields(newFields)
                                }
                              }}
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
                            <TextField
                              name={`products[${index}].quantity`}
                              type="number"
                              size="small"
                              value={field.quantity}
                              onChange={(e) => {
                                const newFields = [...productFields]
                                newFields[index].quantity = Math.max(1, Number(e.target.value))
                                setProductFields(newFields)
                              }}
                              InputProps={{
                                sx: {
                                  borderRadius: "8px",
                                  width: "80px",
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e2e8f0",
                                  },
                                  "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#cbd5e1",
                                  },
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#6366f1",
                                    borderWidth: "2px",
                                  },
                                },
                              }}
                            />
                            <IconButton
                              size="small"
                              onClick={() => {
                                const newFields = [...productFields]
                                newFields[index].quantity += 1
                                setProductFields(newFields)
                              }}
                              sx={{
                                borderRadius: "8px",
                                p: "4px",
                                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                color: "white",
                                boxShadow: "0 2px 5px rgba(99, 102, 241, 0.3)",
                                "&:hover": {
                                  boxShadow: "0 4px 8px rgba(99, 102, 241, 0.4)",
                                },
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Tooltip title="Remove Product" arrow>
                        <IconButton
                          onClick={() => onRemoveProductField(index)}
                          sx={{
                            color: "#ef4444",
                            bgcolor: alpha("#ef4444", 0.1),
                            borderRadius: "8px",
                            "&:hover": {
                              backgroundColor: alpha("#ef4444", 0.2),
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Box>
              </MotionCard>
            ))
          )}
        </AnimatePresence>
      </Box>

      {/* Notes Section */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        elevation={0}
        sx={{
          borderRadius: "20px",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          mt: 4,
          overflow: "hidden",
          background: "linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            py: 2,
            px: 3,
            display: "flex",
            alignItems: "center",
          }}
        >
          <NotesIcon sx={{ color: "white", mr: 1.5 }} />
          <Typography variant="h6" fontWeight="700" color="white">
            Additional Notes
          </Typography>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="body2" color="#64748b" sx={{ mb: 2 }}>
            Add any additional information about this inventory adjustment
          </Typography>

          <TASTextarea
            name="note"
            placeholder="Enter notes or additional details about this adjustment..."
            minRows={4}
            fullWidth
            size="medium"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e2e8f0",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#cbd5e1",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#6366f1",
                  borderWidth: "2px",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5 }}>
                  <NotesIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
      </MotionCard>

      {/* Submit Button */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
          sx={{
            borderRadius: "12px",
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            px: 4,
            py: 1.5,
            boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              boxShadow: "0 15px 20px -3px rgba(99, 102, 241, 0.4)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          {isSubmitting ? "Creating Adjustment..." : "Create Adjustment"}
        </Button>
      </Box>
    </TASForm>
  )
}

export default AddAdjustmentForm
