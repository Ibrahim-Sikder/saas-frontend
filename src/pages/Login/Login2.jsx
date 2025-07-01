/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Button, Box, Typography, Link, Divider, Alert } from "@mui/material";
import { Lock, Google, Facebook, Person } from "@mui/icons-material";
import AuthLayout from "../../auth/AuthLayout";
import { useTenantLoginMutation } from "../../redux/api/authApi";

import GarageForm from "../../components/form/Form";
import TASInput from "../../components/form/Input";
import { toast } from "react-toastify";
const LoginPage = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tenantLogin] = useTenantLoginMutation();
const handleSubmit = async (data) => {
  setLoading(true);
  setError("");

  try {
    const res = await tenantLogin(data).unwrap();

    if (res.success) {
      toast.success(res.message || "Login successful!");

      const tenantDomain = res?.user?.tenantDomain || data.tenantDomain;
      const isLocalhost = window.location.hostname.includes("localhost");

      if (tenantDomain) {
        let redirectURL;

        if (isLocalhost) {
          // ✅ Localhost subdomain with custom domain
          redirectURL = `http://${tenantDomain}.localhost:5173/dashboard`;
        } else {
          // ✅ Live site
          redirectURL = `https://${tenantDomain}/dashboard`;
        }

        window.location.href = redirectURL;
      } else {
        navigate("/dashboard");
      }
    } else {
      toast.error(res.message || "Invalid username or password!");
    }
  } catch (err) {
    toast.error(err?.data?.message || "Login failed. Please try again.");
    setError("Invalid email or password. Please try again.");
  } finally {
    setLoading(false);
  }
};



  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
    >
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <GarageForm onSubmit={handleSubmit}>
        <TASInput
          name="name"
          label="User Name"
          placeholder="User Name"
          required
          icon={Person}
          iconPosition="start"
        />
        <TASInput
          name="tenantDomain"
          label="Domain"
          required
          icon={Person}
          iconPosition="start"
        />
        <TASInput
          name="password"
          label="User password"
          placeholder="User password"
          required
          icon={Lock}
          iconPosition="start"
        />

        <Box sx={{ textAlign: "right", mt: 1 }}>
          <Link component={RouterLink} to="/forgot-password" variant="body2">
            Forgot password?
          </Link>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            sx={{ py: 1 }}
          >
            Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Facebook />}
            sx={{ py: 1 }}
          >
            Facebook
          </Button>
        </Box>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link component={RouterLink} to="/signup" variant="body2">
              Sign up
            </Link>
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Want to create a new tenant?{" "}
            <Link component={RouterLink} to="/tenant/register" variant="body2">
              Register your business
            </Link>
          </Typography>
        </Box>
      </GarageForm>
    </AuthLayout>
  );
};

export default LoginPage;
