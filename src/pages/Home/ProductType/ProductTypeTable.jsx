/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteProductTypeMutation,
  useGetAllIProductTypeQuery,
} from "../../../redux/api/productTypeApi";

export default function ProductTypeTable() {
  const [deleteUnit] = useDeleteProductTypeMutation();
  const { isLoading, data } = useGetAllIProductTypeQuery();
  const productTypes = data?.data?.productTypes || [];


  const rows = productTypes.map((productType, index) => ({
    id: productType._id,
    product_type: productType.product_type,
  }));

  const columns = [
    { field: "product_type", headerName: "Product Type", flex: 2 },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center gap-1 ">
          {/* <Link to={`/dashboard/unit-update/?id=${params.id}`}>
            <IconButton
              sx={{ ...iconButtonStyle, background: "#42A1DA" }}
              title="Edit"
            >
              <EditIcon sx={iconStyle} />
            </IconButton>
          </Link> */}

          <IconButton sx={iconButtonStyle} title="Delete">
            <DeleteIcon
              onClick={() => handleDelete(params.id)}
              sx={iconStyle}
            />
          </IconButton>
        </div>
      ),
    },
  ];
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
          await deleteUnit(id).unwrap();
          Swal.fire(
            "Deleted!",
            "The Product Type has been deleted.",
            "success"
          );
        } catch (error) {
          Swal.fire(
            "Error!",
            "An error occurred while deleting the brand.",
            "error"
          );
        }
      }
    });
  };

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

  const dataGridStyle = {
    "& .MuiDataGrid-toolbarContainer": {
      backgroundColor: "transparent",
      "& button": {
        color: "white",
      },
      "& .MuiGridToolbar-export": {
        color: "white",
      },
      "& .MuiGridToolbar-densitySelector": {
        color: "white",
      },
      "& .MuiGridToolbar-columnsButton": {
        color: "white",
      },
      "& .MuiGridToolbarFilterButton": {
        color: "white",
      },
    },
  };

  return (
    <div className="mt-5" style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{
          toolbar: GridToolbar,
        }}
        checkboxSelection
        sx={dataGridStyle}
      />
    </div>
  );
}
