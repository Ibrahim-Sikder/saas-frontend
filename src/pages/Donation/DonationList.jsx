/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import { useDeleteBillPayMutation } from "../../redux/api/bill-pay";
import {
  useDeleteDonationMutation,
  useGetAllDonationQuery,
} from "../../redux/api/donationApi";

const DonatinList = () => {
  const [deleteDonation, { isLoading }] = useDeleteDonationMutation();
  const { data: donationData, isLoading: donationLoading } =
    useGetAllDonationQuery();

  const deletePackage = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this card?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await deleteDonation(id).unwrap;
        swal("Deleted!", "Donation delete successful.", "success");
      } catch (error) {
        swal(
          "Error",
          "An error occurred while deleting the donation.",
          "error"
        );
      }
    }
  };
  if (donationLoading) {
    return <p>Loading</p>;
  }

  return (
    <Box bgcolor="white" padding={3}>
      <Typography variant="h5" fontWeight="bold" marginBottom="15px">
        Donatin List
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Mobile</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Address </TableCell>
              <TableCell align="center">Dopnation Purpose </TableCell>
              <TableCell align="center">Donation Amount </TableCell>
              <TableCell align="center">Country</TableCell>
              <TableCell align="center">Payment Method </TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donationData?.data?.map((data, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{data.name}</TableCell>
                <TableCell align="center">{data.mobile_number}</TableCell>
                <TableCell align="center">{data.email}</TableCell>
                <TableCell align="center">{data.address}</TableCell>
                <TableCell align="center">{data.donation_purpose}</TableCell>
                <TableCell align="center">{data.donation_amount}</TableCell>
                <TableCell align="center">{data.donation_country}</TableCell>
                <TableCell align="center">{data.payment_method}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center">
                    <IconButton title="See Profile">
                      <VisibilityIcon className="text-green-600" />
                    </IconButton>
                    <IconButton title="Edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => deletePackage(data._id)}
                      disabled={isLoading}
                      title="Delete"
                    >
                      <DeleteIcon className="text-red-600" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DonatinList;
