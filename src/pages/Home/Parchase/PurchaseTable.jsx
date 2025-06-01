/* eslint-disable no-unused-vars */
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Add, Edit, Remove } from "@mui/icons-material";
import purchase from "../../../../public/assets/chat6.jpg";
import UpdatePurchaseProductModal from "./UpdatePurchaseProductModal";
const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
};

const buttonStyle = {
  border: "1px solid red",
  background: "none",
  cursor: "pointer",
  padding: "0px",
  borderRadius: "3px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const quantityControlStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const quantityButtonStyle = {
  width: "24px",
  height: "24px",
  border: "1px solid #1976d2",
  background: "#fff",
  color: "#1976d2",
  cursor: "pointer",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  padding: "0",
};

const rows = [
  {
    id: 1,
    productName: "Product A",
    batchNo: "B123",
    quantity: 0,
    type: "Type1",
  },
  {
    id: 2,
    productName: "Product B",
    batchNo: "B124",
    quantity: 0,
    type: "Type2",
  },
];

export default function PurchaseTable() {
  const [rowData, setRowData] = useState(rows);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // For holding the selected product data

  const handleOpen = (product) => {
    setSelectedProduct(product); // Set the selected product
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setSelectedProduct(null); // Clear the selected product
    setOpen(false); // Close the modal
  };

  const handleQuantityChange = (id, increment) => {
    setRowData((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? { ...row, quantity: Math.max(0, row.quantity + increment) }
          : row
      )
    );
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: () => (
        <div style={style}>
          <img src={purchase} alt="Product" style={{ width: "50px" }} />
        </div>
      ),
      headerAlign: "center",
      align: "center",
    },
    {
      field: "productName",
      headerName: "Product",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "batchNo",
      headerName: "Batch No",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: () => <span>Unit</span>,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: () => <span>$0.00</span>,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={quantityControlStyle}>
          <button
            style={{ ...quantityButtonStyle }}
            onClick={(e) => {
              e.stopPropagation();
              handleQuantityChange(params.row.id, -1);
            }}
          >
            <Remove />
          </button>
          <span>{params.row.quantity}</span>
          <button
            style={{
              ...quantityButtonStyle,
              backgroundColor: "#2C6AE5",
              color: "white",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleQuantityChange(params.row.id, 1);
            }}
          >
            <Add />
          </button>
          
        </div>
      ),
    },
    {
      field: "tax",
      headerName: "Tax",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: () => <span>$0.00</span>,
    },
    {
      field: "discount",
      headerName: "Discount",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: () => <span>$0.00</span>,
    },
    {
      field: "subTotal",
      headerName: "SubTotal",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: () => <span>$0.00</span>,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.5,
      renderCell: (params) => (
        <div className="flex gap-1 items-center">
          <button
            style={{ ...buttonStyle, border: "1px solid #42A1DA" }}
            onClick={(e) => {
              e.stopPropagation();
              handleOpen(params.row);
            }}
          >
            <Edit sx={{ color: "#42A1DA" }} />
          </button>

          <div style={style}>
            <button style={buttonStyle}>
              <CloseIcon sx={{ color: "red" }} />
            </button>
          </div>
        </div>
      ),
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <div>
      <DataGrid
        rows={rowData}
        columns={columns}
        disableSelectionOnClick
        pagination={false}
        sx={{
          "& .MuiDataGrid-columnHeader": {
            textAlign: "center",
            backgroundColor: "#42A1DA",
            color: "white",
          },
          "& .MuiDataGrid-cell": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          "& .MuiDataGrid-footerContainer": {
            display: "none",
          },
        }}
      />

      {open && (
        <UpdatePurchaseProductModal
          open={open}
          setOpen={setOpen} 
          product={selectedProduct}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
