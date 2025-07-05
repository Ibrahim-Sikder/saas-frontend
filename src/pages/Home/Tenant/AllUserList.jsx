"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { FaTrash, FaUsers, FaCheckCircle, FaLock, FaUserShield } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useDeleteUserMutation, useGetAllUserQuery } from "../../../redux/api/userApi";
import { StatusChip, StyledTableContainer } from "../../../utils/customStyle";
import { StyledPaper } from "../../../utils";

const AllUserList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const tenantDomain = window.location.hostname.split(".")[0];

  const {
    data: userData,
    isLoading,
    refetch,
  } = useGetAllUserQuery({ tenantDomain });

  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const users = userData?.data || [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser({ tenantDomain, tenantId: userId }).unwrap();
        toast.success("User deleted successfully");
        refetch();
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    blocked: users.filter((u) => u.status === "blocked").length,
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1600, margin: "auto", padding: 3 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            <FaUserShield style={{ marginRight: 16, color: "#667eea" }} />
            All Users
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Chip icon={<FaUsers />} label={`Total: ${stats.total}`} color="primary" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Chip icon={<FaCheckCircle />} label={`Active: ${stats.active}`} sx={{ bgcolor: "#4CAF50", color: "white" }} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Chip icon={<FaLock />} label={`Blocked: ${stats.blocked}`} sx={{ bgcolor: "#f44336", color: "white" }} />
        </Grid>
      </Grid>

      <StyledPaper>
        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>
                      <Typography>{user.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <StatusChip
                      label={user.status === "active" ? "Active" : "Blocked"}
                      status={user.status}
                    />
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteUser(user._id)}
                        sx={{ color: "#f44336" }}
                        disabled={deleteLoading}
                      >
                        <FaTrash />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </StyledPaper>
    </Box>
  );
};

export default AllUserList;
