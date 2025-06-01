/* eslint-disable no-unused-vars */
import { Box, Button, Pagination, Stack } from "@mui/material";
import { ControlPoint } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useState } from "react";
import {
  useDeleteExpenseMutation,
  useGetAllExpensesQuery,
} from "../../../redux/api/expense";

export default function ExpenseList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, SetSearch] = useState("");
  const { data, isLoading } = useGetAllExpensesQuery({
    limit: 10,
    page: currentPage,
    searchTerm: search,
  });
  const [deleteExpense] = useDeleteExpenseMutation();
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteExpense(id).unwrap();
          Swal.fire("Deleted!", "The product has been deleted.", "success");
        } catch (error) {
          Swal.fire(
            "Error!",
            "An error occurred while deleting the product.",
            "error"
          );
        }
      }
    });
  };

  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    {
      field: "document",
      headerName: "Document",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="brand"
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            borderRadius: "5px",
          }}
        />
      ),
    },
    { field: "warehouse", headerName: "Warehouse", flex: 1 },
    { field: "voucher_no", headerName: "Voucher No", flex: 1 },
    { field: "tax", headerName: "Tax", flex: 1 },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    { field: "amount", headerName: "Amount", flex: 1 },
    {
      field: "payment_individual_markup",
      headerName: "Payment Individual Markup",
      flex: 1,
    },
    { field: "payment_method", headerName: "Payment Method", flex: 1 },
    { field: "payment_account", headerName: "Payment Account", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <>
          <div className="flex items-center gap-1">
            <Link to={`/dashboard/update-expense/?id=${params.id}`}>
              <IconButton
                sx={{ ...iconButtonStyle, background: "#42A1DA" }}
                title="Edit"
              >
                <EditIcon sx={iconStyle} />
              </IconButton>
            </Link>

            <IconButton sx={iconButtonStyle} title="Delete">
              <DeleteIcon
                onClick={() => handleDelete(params.id)}
                sx={iconStyle}
              />
            </IconButton>
          </div>
        </>
      ),
    },
  ];

  const rows = data?.data?.expenses?.map((expense) => ({
    id: expense._id,
    document: expense.document,
    date: new Date(expense.createdAt).toLocaleDateString(),
    warehouse: expense.warehouse,
    voucher_no: expense.voucher_no,
    tax: expense?.tax,
    category: expense?.category?.name,
    amount: expense.amount,
    payment_individual_markup: expense.payment_individual_markup,
    payment_method: expense.payment_method,
    payment_account: expense?.payment_account,
  }));

  const iconButtonStyle = {
    width: "30px",
    height: "30px",
    borderRadius: "100%",
    padding: "0px",
    color: "white",
    background: "red",
    marginLeft: "2px",
    marginRight: "2px",
    "&:hover": {
      background: "black",
      color: "white",
    },
  };
  const iconStyle = { fontSize: "20px" };

  const handleSearch = (e) => {
    const value = e.target.value;
    SetSearch(value);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const { meta } = data?.data || { meta: {}, products: [] };
  const { totalPage = 10 } = meta || {};

  
  return (
    <>
      {isLoading ? (
        <p>Loading......</p>
      ) : (
        <Box sx={{ padding: "20px" }}>
          <div>
            <h2 className="mb-3">Expense List</h2>
            <span> Expense &gt; Expense List </span>
          </div>
          <div className="bg-[#F7F7F7] p-5 mt-5 ">
            <div className=" bg-[#FFFFFF] px-5  pt-3  rounded-md">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                mt={5}
              >
                {" "}
                <Box mb={2}>
                  <input
                    onChange={handleSearch}
                    type="text"
                    placeholder="Search here"
                    style={{
                      width: "300px",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Box>
                <Stack direction="row" spacing={2}>
                  <Button
                    component={Link}
                    to="/dashboard/add-expense"
                    variant="contained"
                    color="success"
                  >
                    <ControlPoint sx={{ marginRight: "3px" }} /> Add Expense
                  </Button>
                </Stack>
              </Stack>

              <div>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  checkboxSelection
                  disableSelectionOnClick
                />
              </div>
              <Stack
                spacing={2}
                display="flex"
                justifyItems="center"
                alignItems="center"
                marginTop="20px"
              >
                <Pagination
                  count={totalPage}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="secondary"
                />
              </Stack>
            </div>
          </div>
        </Box>
      )}
    </>
  );
}
