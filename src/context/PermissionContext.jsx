/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// src/context/PermissionContext.js
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { CircularProgress, Box, Typography, Button } from "@mui/material";
import { useTenantDomain } from "../hooks/useTenantDomain";

const PermissionContext = createContext();

export const usePermissions = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermissions must be used within PermissionProvider");
  }
  return context;
};

export const PermissionProvider = ({ children }) => {
  const {tenantDomain} = useTenantDomain();
  const [permissions, setPermissions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPermissions = async (token) => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }

      if (!tenantDomain) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `http://localhost:7000/api/v1/permission/my-permissions?tenantDomain=${tenantDomain}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch permissions");
      }

      const data = await response.json();
      if (data.success) {
        setPermissions(data.data);
      } else {
        setError(data.message || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const checkPermission = (pagePath, action = "view") => {
    if (!permissions) {
      console.log("Permissions not loaded yet");
      return false;
    }

    // find from permission array
    const permission = permissions.find(p => {

      const possiblePaths = [
        pagePath,
        pagePath.endsWith('/') ? pagePath.slice(0, -1) : pagePath + '/',
        pagePath.startsWith('/') ? pagePath : '/' + pagePath
      ];
      
      return possiblePaths.includes(p.page?.path) || 
             possiblePaths.includes(p.route) || 
             possiblePaths.includes(p.path);
    });
    
    if (!permission) {
      console.log("No permission found for page:", pagePath);
      return false;
    }
    
    const hasPermission = permission[action] || false;
    
    return hasPermission;
  };

  useEffect(() => {
    const token = Cookies.get("token");
    fetchPermissions(token);
  }, [tenantDomain]);

  const value = {
    permissions,
    loading,
    error,
    checkPermission,
    fetchPermissions,
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box textAlign="center">
          <CircularProgress size={60} />
          <Typography variant="h6" mt={2}>
            Loading permissions...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box textAlign="center">
          <Typography variant="h6" color="error">
            Error loading permissions: {error}
          </Typography>
          <Button
            variant="contained"
            onClick={() => (window.location.href = "/login")}
            sx={{ mt: 2 }}
          >
            Go to Login
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};