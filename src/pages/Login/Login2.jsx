/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  Link,
  Divider,
  Alert,
} from "@mui/material";
import {
  Lock,
  Google,
  Facebook,
  Person,
} from "@mui/icons-material";
import AuthLayout from "../../auth/AuthLayout";
import { useTenantLoginMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import GarageForm from "../../components/form/Form";
import TASInput from "../../components/form/Input";
const LoginPage = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tenantLogin] = useTenantLoginMutation();
  const handleSubmit = async (data) => {
    console.log(data);
    try {
      const res = tenantLogin(data).unwrap();
      navigate("/dashboard");
      if (res.success) {
        toast.success(res.message || "Congrate!!! Login successfully!");
      }
    } catch (err) {
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
            <Link component={RouterLink} to="/register" variant="body2">
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
