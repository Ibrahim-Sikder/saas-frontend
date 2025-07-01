/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Breadcrumbs,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  alpha,
  Alert,
  CircularProgress,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import CalendarMonth from "@mui/icons-material/CalendarMonth";
import EditNote from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router-dom";
import {
  useCreatePurchaseReturnMutation,
  useGetSinglePurchaseReturnQuery,
  useUpdatePurchaseReturnMutation,
} from "../../redux/api/purchaseReturnApi";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetAllStocksQuery } from "../../redux/api/stocksApi";

const warehouseOptions = [
  { value: "main", label: "Main Warehouse" },
  { value: "secondary", label: "Secondary Warehouse" },
  { value: "workshop", label: "Workshop Storage" },
  { value: "Vehicle Services", label: "Vehicle Services" },
];

export default function PurchaseReturnForm({ id }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [returnItems, setReturnItems] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const tenantDomain = window.location.hostname.split(".")[0];

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      returnDate: new Date().toISOString().split("T")[0],
      referenceNo: "",
      warehouse: "",
      returnReason: "",
      returnNote: "",
    },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const watchedWarehouse = watch("warehouse");

  const queryParams = {
    tenantDomain,
    page: currentPage,
    limit: 100,
    searchTerm: searchTerm,
  };

  const { data: stockData, isLoading } = useGetAllStocksQuery(queryParams);
  const [createPurchaseReturn, { isLoading: isSubmitting }] =
    useCreatePurchaseReturnMutation();
  const [updatePurchaseReturn, { isLoading: isUpdating }] =
    useUpdatePurchaseReturnMutation();
  const { data: singlePurchaseReturn } = useGetSinglePurchaseReturnQuery({
    tenantDomain,
    id,
  });

  console.log(singlePurchaseReturn);
  useEffect(() => {
    if (stockData && stockData.data && stockData.data.length > 0) {
      // Keep track of previously selected items
      const selectedItemsMap = {};
      if (returnItems.length > 0) {
        returnItems.forEach((item) => {
          if (item.selected) {
            selectedItemsMap[item.productId] = {
              selected: item.selected,
              returnQuantity: item.returnQuantity,
              total: item.total,
            };
          }
        });
      }

      const initialReturnItems = stockData.data.map((item, index) => {
        const productId = item.product?._id;
        const isSelected = selectedItemsMap[productId];

        return {
          id: index,
          product: {
            code: item.product?.product_code || "N/A",
            name: item.product?.product_name || "Unknown Product",
            unit: item.product?.unit?.unit || "Unit",
          },
          maxQuantity: item.product?.product_quantity || 0,
          returnQuantity: isSelected ? isSelected.returnQuantity : 0,
          price: item.purchasePrice || item.product?.purchasePrice || 0,
          total: isSelected ? isSelected.total : 0,
          selected: isSelected ? true : false,
          productId: productId,
          tax: item.product?.product_tax || 0,
          discount: item.product?.discount || 0,
          shipping: item.product?.shipping || 0,
          purchaseId: item._id,
          purchaseReferenceNo: item.referenceType || "N/A",
          supplierName: item.product?.suppliers?.full_name || "Unknown",
        };
      });

      setReturnItems(initialReturnItems);

      if (stockData.data[0]?.warehouse && !watchedWarehouse) {
        setValue("warehouse", stockData.data[0].warehouse);
      }
    }
  }, [stockData, setValue]);

  useEffect(() => {
    if (singlePurchaseReturn?.data) {
      // Set form values from singlePurchaseReturn data
      setValue(
        "returnDate",
        singlePurchaseReturn.data.returnDate ||
          new Date().toISOString().split("T")[0]
      );
      setValue("referenceNo", singlePurchaseReturn.data.referenceNo || "");
      setValue("warehouse", singlePurchaseReturn.data.warehouse || "");
      setValue("returnReason", singlePurchaseReturn.data.returnReason || "");
      setValue("returnNote", singlePurchaseReturn.data.returnNote || "");

      // If there are items in the return, update the returnItems state
      if (
        singlePurchaseReturn.data.items &&
        singlePurchaseReturn.data.items.length > 0
      ) {
        setReturnItems((prevItems) => {
          return prevItems.map((item) => {
            // Find if this item exists in the singlePurchaseReturn items
            const existingItem = singlePurchaseReturn.data.items.find(
              (returnItem) => returnItem.productId?._id === item.productId
            );

            if (existingItem) {
              return {
                ...item,
                selected: true,
                returnQuantity: existingItem.quantity,
                total: existingItem.totalAmount,
              };
            }
            return item;
          });
        });
      }
    }
  }, [singlePurchaseReturn, setValue]);

  const handleItemSelection = (id) => {
    setReturnItems(
      returnItems.map((item) =>
        item.id === id
          ? {
              ...item,
              selected: !item.selected,
              returnQuantity: !item.selected ? 1 : 0,
              total: !item.selected ? item.price : 0,
            }
          : item
      )
    );
  };

  const handleQuantityChange = (id, value) => {
    const quantity = Number.parseInt(value) || 0;
    setReturnItems(
      returnItems.map((item) =>
        item.id === id
          ? {
              ...item,
              returnQuantity: Math.min(Math.max(0, quantity), item.maxQuantity),
              total:
                Math.min(Math.max(0, quantity), item.maxQuantity) * item.price,
            }
          : item
      )
    );
  };

  const calculateTotalReturn = () => {
    return returnItems.reduce(
      (sum, item) => (item.selected ? sum + item.total : sum),
      0
    );
  };

  const onSubmit = async (formData) => {
    try {
      const selectedItems = returnItems.filter(
        (item) => item.selected && item.returnQuantity > 0
      );

      if (selectedItems.length === 0) {
        toast.error("Please select at least one item to return");
        return;
      }

      // Check if we're updating an existing return or creating a new one
      if (id && singlePurchaseReturn?.data?._id) {
        // Update existing purchase return
        const loadingToast = toast.loading("Updating purchase return...");

        const items = selectedItems.map((item) => ({
          productId: item.productId,
          productCode: item.product.code,
          productName: item.product.name,
          quantity: item.returnQuantity,
          maxQuantity: item.maxQuantity,
          unitPrice: item.price,
          unit: item.product.unit,
          totalAmount: item.total,
        }));

        const totalReturnAmount = selectedItems.reduce(
          (sum, item) => sum + item.total,
          0
        );

        const updateData = {
          data: {
            returnDate: formData.returnDate,
            referenceNo: Number(formData.referenceNo) || 0,
            warehouse: formData.warehouse,
            returnNote: formData.returnNote,
            returnReason: formData.returnReason,
            items: items,
            totalReturnAmount,
            status: singlePurchaseReturn.data.status || "pending",
          },
        };

        const res = await updatePurchaseReturn({
          id,
          tenantDomain,
          data: updateData.data,
        }).unwrap();

        toast.dismiss(loadingToast);
        toast.success("Purchase return updated successfully");
        setTimeout(() => {
          navigate("/dashboard/purchase-return");
        }, 1500);
      } else {
        // Create new purchase return - directly use the stock data
        const loadingToast = toast.loading("Creating purchase return...");

        // Format items for the API
        const formattedItems = selectedItems.map((item) => ({
          productId: item.productId,
          productCode: item.product.code,
          productName: item.product.name,
          quantity: item.returnQuantity,
          maxQuantity: item.maxQuantity,
          unitPrice: item.price,
          unit: item.product.unit,
          totalAmount: item.total,
        }));

        const totalReturnAmount = selectedItems.reduce(
          (sum, item) => sum + item.total,
          0
        );

        // Create a single purchase return with all selected items
        const returnData = {
          returnDate: formData.returnDate,
          referenceNo: Number(formData.referenceNo) || 0,
          warehouse: formData.warehouse,
          returnNote: formData.returnNote,
          returnReason: formData.returnReason,
          items: formattedItems,
          totalReturnAmount,
          status: "pending",
          // Use the first selected item's supplier info if available
          supplier: selectedItems[0]?.product?.suppliers?._id,
          supplierName: selectedItems[0]?.supplierName,
        };

        const result = await createPurchaseReturn({
          tenantDomain,
          ...returnData,
        }).unwrap();

        toast.dismiss(loadingToast);
        toast.success("Purchase return created successfully");
        setTimeout(() => {
          navigate("/dashboard/purchase-return");
        }, 1500);
      }
    } catch (error) {
      console.error("Error processing purchase return:", error);
      toast.error(error.data?.message || "Failed to process purchase return");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/purchase");
  };

  const steps = ["Purchase Details", "Select Return Items", "Confirm Return"];

  if (isLoading || !stockData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!stockData || !stockData.data || stockData.data.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">
          No stock data found.
          <Button
            color="inherit"
            size="small"
            onClick={() => navigate("/dashboard/purchase")}
            sx={{ ml: 2 }}
          >
            Go to Purchase List
          </Button>
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: `linear-gradient(to bottom, ${alpha(
          theme.palette.primary.light,
          0.05
        )}, ${alpha(theme.palette.background.default, 1)})`,
        minHeight: "100vh",
        p: 1,
        borderRadius: 2,
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          mb: 3,
          "& .MuiBreadcrumbs-ol": {
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            p: 1,
            borderRadius: 1,
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          },
        }}
      >
        <Link
          color="inherit"
          href="/dashboard"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
          Dashboard
        </Link>
        <Link
          color="inherit"
          href="/purchase"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <ShoppingCartIcon sx={{ mr: 0.5, fontSize: 18 }} />
          Purchase
        </Link>
        <Typography
          color="text.primary"
          sx={{ display: "flex", alignItems: "center" }}
        >
          Return
        </Typography>
      </Breadcrumbs>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          backgroundColor: theme.palette.background.paper,
          p: 2,
          borderRadius: 2,
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: "bold",
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Purchase Return
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleCancel}
          sx={{ borderRadius: "8px" }}
        >
          Go Back
        </Button>
      </Box>

      {/* Stepper */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  pb: 2,
                  borderBottom: `1px solid ${alpha(
                    theme.palette.divider,
                    0.5
                  )}`,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: theme.palette.warning.main,
                    mr: 2,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  <EditNote />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Select Items to Return
                </Typography>
              </Box>

              <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                Select the items you want to return and specify the quantity.
                You can select items from multiple purchases.
              </Alert>

              {returnItems.length > 0 ? (
                <TableContainer
                  sx={{
                    borderRadius: 2,
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    mb: 2,
                  }}
                >
                  <Table>
                    <TableHead
                      sx={{
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.05
                        ),
                      }}
                    >
                      <TableRow>
                        <TableCell padding="checkbox"></TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Product
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Purchase Ref
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Supplier
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Unit</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                          Purchase Qty
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                          Return Qty
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                          Price
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                          Total
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {returnItems.map((item) => (
                        <TableRow
                          key={item.id}
                          sx={{
                            backgroundColor: item.selected
                              ? alpha(theme.palette.primary.main, 0.04)
                              : "inherit",
                            "&:hover": {
                              backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.04
                              ),
                            },
                          }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={item.selected}
                              onChange={() => handleItemSelection(item.id)}
                              sx={{
                                "&.Mui-checked": {
                                  color: theme.palette.primary.main,
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {item.product.code}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "medium" }}
                            >
                              {item.product.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              #{item.purchaseReferenceNo || "N/A"}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {item.supplierName}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={item.product.unit}
                              size="small"
                              sx={{
                                backgroundColor: alpha(
                                  theme.palette.primary.main,
                                  0.1
                                ),
                                color: theme.palette.primary.main,
                                fontWeight: "medium",
                                borderRadius: "6px",
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Chip
                              label={item.maxQuantity}
                              size="small"
                              sx={{
                                backgroundColor: alpha(
                                  theme.palette.info.main,
                                  0.1
                                ),
                                color: theme.palette.info.main,
                                fontWeight: "medium",
                                borderRadius: "6px",
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              type="number"
                              size="small"
                              value={item.returnQuantity}
                              onChange={(e) =>
                                handleQuantityChange(item.id, e.target.value)
                              }
                              disabled={!item.selected}
                              InputProps={{
                                inputProps: { min: 0, max: item.maxQuantity },
                                sx: { borderRadius: 2 },
                              }}
                              sx={{ width: 80 }}
                            />
                          </TableCell>
                          <TableCell align="right">$ {item.price}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            $ {item.total}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
                  No products found in any purchases.
                </Alert>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                mb: 3,
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                position: "sticky",
                top: 20,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    pb: 2,
                    borderBottom: `1px solid ${alpha(
                      theme.palette.divider,
                      0.5
                    )}`,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.success.main,
                      mr: 2,
                      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    <EditNote />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Return Summary
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Controller
                      name="returnDate"
                      control={control}
                      rules={{ required: "Return date is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Return Date"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          InputProps={{
                            startAdornment: (
                              <CalendarMonth
                                sx={{
                                  mr: 1,
                                  color: theme.palette.text.secondary,
                                }}
                              />
                            ),
                            sx: { borderRadius: 2 },
                          }}
                          sx={{ mb: 2 }}
                          error={!!errors.returnDate}
                          helperText={errors.returnDate?.message}
                          required
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="referenceNo"
                      control={control}
                      rules={{ required: "Reference number is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Reference No"
                          placeholder="RET-0001"
                          InputProps={{
                            sx: { borderRadius: 2 },
                          }}
                          sx={{ mb: 2 }}
                          error={!!errors.referenceNo}
                          helperText={errors.referenceNo?.message}
                          required
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="warehouse"
                      control={control}
                      rules={{ required: "Warehouse is required" }}
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          sx={{ mb: 2 }}
                          error={!!errors.warehouse}
                          required
                        >
                          <InputLabel>Warehouse</InputLabel>
                          <Select
                            {...field}
                            label="Warehouse"
                            sx={{ borderRadius: 2 }}
                          >
                            {warehouseOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.warehouse && (
                            <Typography
                              variant="caption"
                              color="error"
                              sx={{ mt: 0.5, ml: 1.5 }}
                            >
                              {errors.warehouse.message}
                            </Typography>
                          )}
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="returnReason"
                      control={control}
                      rules={{ required: "Return reason is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Return Reason"
                          multiline
                          rows={3}
                          InputProps={{ sx: { borderRadius: 2 } }}
                          sx={{ mb: 2 }}
                          error={!!errors.returnReason}
                          helperText={errors.returnReason?.message}
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="returnNote"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Return Note"
                          multiline
                          rows={3}
                          InputProps={{ sx: { borderRadius: 2 } }}
                          sx={{ mb: 2 }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    border: `1px solid ${alpha(
                      theme.palette.primary.main,
                      0.1
                    )}`,
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "medium" }}
                      >
                        Total Return Value:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="subtitle1"
                        align="right"
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.primary.main,
                        }}
                      >
                        $ {calculateTotalReturn()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={
                      isSubmitting || isUpdating ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <SaveIcon />
                      )
                    }
                    disabled={
                      isSubmitting ||
                      isUpdating ||
                      returnItems.filter(
                        (item) => item.selected && item.returnQuantity > 0
                      ).length === 0
                    }
                    sx={{
                      mb: 1,
                      borderRadius: "8px",
                      color: "white",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      transition: "all 0.3s",
                      "&:hover": {
                        boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                        transform: "translateY(-2px)",
                      },
                      py: 1.5,
                    }}
                  >
                    {isSubmitting || isUpdating
                      ? "Processing..."
                      : "Confirm Return"}
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    sx={{
                      borderRadius: "8px",
                      py: 1.5,
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
