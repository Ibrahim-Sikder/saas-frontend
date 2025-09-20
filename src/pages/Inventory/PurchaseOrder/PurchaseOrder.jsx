/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";
import { Box, Typography, Breadcrumbs, Link, Grid, Paper } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PurchaseOrderModal from "../PurchaseModal";
import UpdatePurchaseOrderModal from "../UpdatePurchaseOrderModal";
import { useTenantDomain } from "../../../hooks/useTenantDomain";
import { useDeletePurchaseOrderMutation, useGetAllPurchaseOrdersQuery } from "../../../redux/api/purchaseOrderApi";
import PageHeader from "./PurchaseHeader";
import SummaryCards from "./PurchaseSummaryCards";
import FiltersSection from "./PurchaseFilter";
import PurchaseOrdersTable from "./PurchaseOrdersTable";
import ActionMenu from "./PurchaseActionMenu";
import ReceiveDialog from "./PurchaseReceiveDialog";
import { Home, NavigateNext, Receipt } from "@mui/icons-material";
import { ShoppingCart } from "lucide-react";


export default function PurchaseOrder() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openReceiveDialog, setOpenReceiveDialog] = useState(false);
  const [receiveDate, setReceiveDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const tenantDomain = useTenantDomain();

  const [search, setSearch] = useState("");
  const [receiveStatus, setReceiveStatus] = useState("received");
  const [receiveNote, setReceiveNote] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  
  const [deletePurchase] = useDeletePurchaseOrderMutation();
  const { data: purchaseOrderData, refetch } = useGetAllPurchaseOrdersQuery({
    tenantDomain,
    limit: 10,
    page,
    searchTerm: search,
  });

  const [openPurchaseModal, setOpenPurchaseModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleMenuOpen = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleViewOrder = () => {
    if (selectedOrder) {
      setIsLoading(true);
      setTimeout(() => {
        navigate(`/purchase/${selectedOrder.id}`);
        setIsLoading(false);
      }, 300);
    }
    handleMenuClose();
  };

  const handleEditOrder = () => {
    if (selectedOrder) {
      setOpenUpdateModal(true);
      setAnchorEl(null);
    }
  };

  const handleDeleteOrder = async () => {
    if (selectedOrder) {
      try {
        const res = await deletePurchase(selectedOrder._id).unwrap();
        if (res.success) {
          toast.success("Purchase order deleted successfully!");
          refetch();
        }
      } catch (error) {
        toast.error("Failed to delete purchase order");
        console.error(error);
      }
    }
    handleMenuClose();
  };

  const handleAddOrder = () => {
    setOpenPurchaseModal(true);
  };

  const handleOpenReceiveDialog = () => {
    setOpenReceiveDialog(true);
    handleMenuClose();
  };

  const handleCloseReceiveDialog = () => {
    setOpenReceiveDialog(false);
  };

  const handleReceiveOrder = () => {
    // Handle receive order logic
  };

  const handleSavePurchaseOrder = (purchaseData) => {
    // Handle save purchase order logic
  };

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange({
      ...dateRange,
      [name]: value,
    });
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <Box sx={{ p: 1, borderRadius: 2, mt: 2 }}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <Link
          color="inherit"
          href="/dashboard"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Home sx={{ mr: 0.5, fontSize: 18 }} />
          Dashboard
        </Link>
        <Link
          color="inherit"
          href="/purchase"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <ShoppingCart sx={{ mr: 0.5, fontSize: 18 }} />
          Purchase
        </Link>
        <Typography
          color="text.primary"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Receipt sx={{ mr: 0.5, fontSize: 18 }} />
          Purchase Orders
        </Typography>
      </Breadcrumbs>

      <PageHeader onAddOrder={handleAddOrder} />

      <SummaryCards purchaseOrderData={purchaseOrderData} />

      <FiltersSection
        searchTerm={searchTerm}
        onSearch={handleSearch}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
      />

      <PurchaseOrdersTable
        purchaseOrderData={purchaseOrderData}
        isLoading={isLoading}
        onMenuOpen={handleMenuOpen}
        page={page}
        onPageChange={handlePageChange}
      />

      <ActionMenu
        anchorEl={anchorEl}
        selectedOrder={selectedOrder}
        onMenuClose={handleMenuClose}
        onViewOrder={handleViewOrder}
        onEditOrder={handleEditOrder}
        onOpenReceiveDialog={handleOpenReceiveDialog}
        onDeleteOrder={handleDeleteOrder}
      />

      <ReceiveDialog
        open={openReceiveDialog}
        receiveDate={receiveDate}
        receiveStatus={receiveStatus}
        receiveNote={receiveNote}
        onClose={handleCloseReceiveDialog}
        onReceiveOrder={handleReceiveOrder}
        onReceiveDateChange={setReceiveDate}
        onReceiveStatusChange={setReceiveStatus}
        onReceiveNoteChange={setReceiveNote}
      />

      <PurchaseOrderModal
        open={openPurchaseModal}
        onClose={() => setOpenPurchaseModal(false)}
        onSave={handleSavePurchaseOrder}
        tenantDomain={tenantDomain}
      />
      
      {openUpdateModal && selectedOrder && (
        <UpdatePurchaseOrderModal
          tenantDomain={tenantDomain}
          onClose={() => setOpenUpdateModal(false)}
          open={openUpdateModal}
          orderId={selectedOrder._id}
        />
      )}
    </Box>
  );
}