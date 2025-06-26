/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  alpha,
  Avatar,
  Chip,
  Stack,
  Paper,
  TextField,
  Drawer,
} from "@mui/material";
import {
  CheckCircle,
  DirectionsCar,
  Menu as MenuIcon,
  Receipt,
  Close,
  Speed,
  PlayArrow,
  Star,
  TrendingUp,
  Security,
  CloudSync,
  Support,
  Analytics,
  AutoFixHigh,
  Inventory,
  People,
  AccountBalance,
  Assignment,
  RequestQuote,
  Payment,
  Business,
  Phone,
  Email,
  LocationOn,
  ArrowForward,
  Rocket,
  Shield,
  Verified,
  AutoAwesome,
  PersonAdd,
} from "@mui/icons-material";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

// Floating Particles Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => i);

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle}
          style={{
            position: "absolute",
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            borderRadius: "50%",
            background: `linear-gradient(45deg, #1976d2${Math.floor(
              Math.random() * 100
            )}, #00bcd4${Math.floor(Math.random() * 100)})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </Box>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = value;
          const increment = end / (duration * 60);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 1000 / 60);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <Typography
      ref={countRef}
      variant="h2"
      sx={{
        fontWeight: 900,
        background:
          "linear-gradient(135deg, #1976d2 0%, #00bcd4 50%, #ff9800 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: { xs: "2rem", md: "3rem" },
      }}
    >
      {count.toLocaleString()}
      {suffix}
    </Typography>
  );
};

const GarageERP = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Enhanced color palette
  const colors = {
    primary: "#1976d2",
    secondary: "#00bcd4",
    accent: "#ff9800",
    success: "#4caf50",
    purple: "#9c27b0",
    pink: "#e91e63",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    gradientHero:
      "linear-gradient(135deg, #1976d2 0%, #00bcd4 30%, #9c27b0 60%, #ff9800 100%)",
    gradientCard:
      "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
    neon: "linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)",
  };

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setDrawerOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Workflow steps
  const workflowSteps = [
    {
      step: 1,
      title: "Customer Registration",
      description:
        "Easy customer onboarding with complete profile management and vehicle history tracking.",
      icon: <PersonAdd fontSize="large" />,
      color: colors.primary,
    },
    {
      step: 2,
      title: "Job Card Creation",
      description:
        "Digital job cards with photos, diagnostics, and real-time progress tracking.",
      icon: <Assignment fontSize="large" />,
      color: colors.secondary,
    },
    {
      step: 3,
      title: "Smart Quotation",
      description:
        "AI-powered quotations with parts pricing, labor costs, and approval workflows.",
      icon: <RequestQuote fontSize="large" />,
      color: colors.accent,
    },
    {
      step: 4,
      title: "Professional Invoice",
      description:
        "Automated invoicing with tax calculations, multiple payment options, and delivery.",
      icon: <Receipt fontSize="large" />,
      color: colors.success,
    },
    {
      step: 5,
      title: "Payment Processing",
      description:
        "Secure payment gateway integration with multiple payment methods and receipts.",
      icon: <Payment fontSize="large" />,
      color: colors.purple,
    },
    {
      step: 6,
      title: "Inventory Management",
      description:
        "Real-time inventory tracking with auto-reordering and supplier management.",
      icon: <Inventory fontSize="large" />,
      color: colors.pink,
    },
    {
      step: 7,
      title: "Account Management",
      description:
        "Complete financial management with P&L reports, cash flow, and business analytics.",
      icon: <AccountBalance fontSize="large" />,
      color: "#795548",
    },
  ];

  // Features data
  const features = [
    {
      title: "Customer Management",
      description:
        "Complete 360° customer lifecycle management with AI-powered insights and personalized experiences.",
      icon: <People fontSize="large" />,
      color: colors.primary,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      items: [
        "🎯 Complete Customer Profiles",
        "📱 Mobile Customer App",
        "💬 SMS & Email Automation",
        "🏆 Loyalty Program Management",
        "📊 Customer Analytics Dashboard",
      ],
    },
    {
      title: "Digital Job Cards",
      description:
        "Revolutionary digital job card system with photo documentation, real-time updates, and progress tracking.",
      icon: <Assignment fontSize="large" />,
      color: colors.secondary,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      items: [
        "📸 Photo Documentation",
        "⏱️ Real-time Progress Tracking",
        "🔧 Digital Checklists",
        "👨‍🔧 Technician Assignment",
        "📋 Quality Control",
      ],
    },
    {
      title: "Smart Quotations",
      description:
        "AI-powered quotation system with dynamic pricing, parts integration, and instant approvals.",
      icon: <RequestQuote fontSize="large" />,
      color: colors.accent,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      items: [
        "🤖 AI-Powered Pricing",
        "⚡ Instant Quote Generation",
        "📧 Email & SMS Delivery",
        "✅ Digital Approvals",
        "🔄 Version Control",
      ],
    },
    {
      title: "Professional Invoicing",
      description:
        "Enterprise-grade invoicing with automated tax calculations, multiple currencies, and payment tracking.",
      icon: <Receipt fontSize="large" />,
      color: colors.success,
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      items: [
        "💎 Professional Templates",
        "🧮 Auto Tax Calculations",
        "💱 Multi-Currency Support",
        "📊 Payment Tracking",
        "📄 PDF Generation",
      ],
    },
    {
      title: "Payment Gateway",
      description:
        "Secure payment processing with multiple payment methods, installments, and automated receipts.",
      icon: <Payment fontSize="large" />,
      color: colors.purple,
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      items: [
        "💳 Multiple Payment Methods",
        "🔒 Secure Processing",
        "📱 Mobile Payments",
        "💰 Installment Plans",
        "🧾 Auto Receipts",
      ],
    },
    {
      title: "Inventory Control",
      description:
        "Smart inventory management with predictive analytics, auto-reordering, and supplier integration.",
      icon: <Inventory fontSize="large" />,
      color: colors.pink,
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      items: [
        "📦 Real-time Stock Tracking",
        "🔄 Auto Reorder Points",
        "🏪 Supplier Management",
        "📈 Demand Forecasting",
        "💰 Cost Optimization",
      ],
    },
    {
      title: "Financial Management",
      description:
        "Complete accounting solution with P&L reports, cash flow management, and business intelligence.",
      icon: <AccountBalance fontSize="large" />,
      color: "#795548",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      items: [
        "📊 P&L Reports",
        "💰 Cash Flow Management",
        "📈 Business Analytics",
        "🧾 Expense Tracking",
        "📋 Tax Compliance",
      ],
    },
    {
      title: "Business Analytics",
      description:
        "Advanced analytics and reporting with AI insights, performance metrics, and growth recommendations.",
      icon: <Analytics fontSize="large" />,
      color: colors.secondary,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      items: [
        "📊 Real-time Dashboards",
        "🤖 AI-Powered Insights",
        "📈 Performance Metrics",
        "🎯 Growth Recommendations",
        "📋 Custom Reports",
      ],
    },
  ];

  // Client testimonials
  const testimonials = [
    {
      name: "Alexander Rodriguez",
      role: "CEO, Rodriguez Auto Empire",
      company: "Rodriguez Auto Group",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      revenue: "+250%",
      content:
        "GarageERP Pro transformed our entire business operation. The workflow from customer to payment is seamless. Our revenue increased by 250% in just 6 months!",
      badge: "🏆 Top Performer",
    },
    {
      name: "Dr. Sarah Chen",
      role: "Director, Elite Motors Group",
      company: "Elite Motors Network",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      revenue: "+180%",
      content:
        "The AI-powered insights and automated workflow saved us 40 hours per week. The customer management system is absolutely game-changing for our business.",
      badge: "🚀 Innovation Leader",
    },
    {
      name: "Marcus Thompson",
      role: "Founder, Thompson Auto Network",
      company: "Thompson Auto Chain",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      revenue: "+320%",
      content:
        "Managing 15 locations was a nightmare before GarageERP Pro. Now everything is centralized, automated, and profitable. Best investment we ever made!",
      badge: "⭐ Enterprise Champion",
    },
    {
      name: "Jennifer Williams",
      role: "Owner, Williams Auto Care",
      company: "Williams Auto Services",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      revenue: "+195%",
      content:
        "The complete workflow from job card to payment is incredible. Our customers love the transparency and we love the efficiency. Highly recommended!",
      badge: "💎 Premium User",
    },
  ];

  // Pricing plans
  const pricingPlans = [
    {
      name: "Starter Pro",
      price: 79,
      originalPrice: 99,
      period: "month",
      description: "Perfect for small garages starting their digital journey",
      features: [
        "✨ Up to 5 users",
        "🚗 50 vehicles/month",
        "📋 Digital job cards",
        "💰 Basic invoicing",
        "📱 Mobile app access",
        "📞 Email support",
        "🔒 Standard security",
        "📊 Basic reports",
      ],
      popular: false,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      savings: "Save $240/year",
    },
    {
      name: "Professional Elite",
      price: 149,
      originalPrice: 199,
      period: "month",
      description: "Most popular choice for growing garage businesses",
      features: [
        "🏆 Unlimited users",
        "🚗 Unlimited vehicles",
        "🤖 AI-powered analytics",
        "💎 Advanced invoicing",
        "💳 Payment gateway",
        "📦 Inventory management",
        "⚡ 24/7 priority support",
        "🔌 API integrations",
        "📊 Advanced reports",
        "🎯 Customer portal",
      ],
      popular: true,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      savings: "Save $600/year",
    },
    {
      name: "Enterprise Platinum",
      price: 299,
      originalPrice: 399,
      period: "month",
      description: "Complete solution for large garage operations",
      features: [
        "🚀 Everything in Professional",
        "🌍 Multi-location support",
        "🔧 Custom integrations",
        "👨‍💼 Dedicated account manager",
        "🎨 White-label options",
        "📈 Advanced analytics suite",
        "🏅 Priority feature requests",
        "🔒 Enterprise security",
        "📋 Custom workflows",
        "🎓 Training & onboarding",
      ],
      popular: false,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      savings: "Save $1200/year",
    },
  ];

  // Client logos
  const clientLogos = [
    { name: "AutoCare Pro", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Elite Motors", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Speed Garage", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Premium Auto", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Garage Master", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Auto Excellence", logo: "/placeholder.svg?height=60&width=120" },
  ];

  // Stats data
  const stats = [
    {
      value: 2500,
      label: "Happy Clients",
      suffix: "+",
      icon: <People />,
      color: colors.primary,
    },
    {
      value: 150000,
      label: "Vehicles Managed",
      suffix: "+",
      icon: <DirectionsCar />,
      color: colors.secondary,
    },
    {
      value: 99.99,
      label: "Uptime Guarantee",
      suffix: "%",
      icon: <Shield />,
      color: colors.success,
    },
    {
      value: 85,
      label: "Average Growth",
      suffix: "%",
      icon: <TrendingUp />,
      color: colors.accent,
    },
  ];

  // Navigation items
  const navItems = [
    { label: "Features", id: "features" },
    { label: "Workflow", id: "workflow" },
    { label: "Pricing", id: "pricing" },
    { label: "Clients", id: "clients" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Consultancy", id: "consultancy" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <Box sx={{ overflow: "hidden", position: "relative" }}>
      {/* Cursor Follower */}
      <motion.div
        style={{
          position: "fixed",
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(25,118,210,0.3) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.3,
        }}
      />

      {/* Header */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backdropFilter: scrolled ? "blur(20px)" : "none",
          backgroundColor: scrolled ? alpha("#ffffff", 0.95) : "transparent",
          transition: "all 0.3s ease",
          borderBottom: scrolled
            ? `1px solid ${alpha(colors.primary, 0.1)}`
            : "none",
          boxShadow: scrolled
            ? `0 8px 32px ${alpha(colors.primary, 0.1)}`
            : "none",
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <motion.div
              whileHover={{
                rotate: [0, -10, 10, -10, 0],
                scale: 1.1,
              }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  background: colors.gradientHero,
                  borderRadius: "50%",
                  p: 1.5,
                  mr: 2,
                  boxShadow: `0 8px 32px ${alpha(colors.primary, 0.3)}`,
                }}
              >
                <AutoFixHigh sx={{ color: "#ffffff", fontSize: 28 }} />
              </Box>
            </motion.div>
            <Typography
              variant="h4"
              component={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              sx={{
                fontWeight: 900,
                background: colors.gradientHero,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-1px",
              }}
            >
              GarageERP Pro
            </Typography>
            <Chip
              label="AI-Powered"
              size="small"
              sx={{
                ml: 2,
                background: colors.neon,
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.7rem",
              }}
            />
          </Box>

          {isMobile ? (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              sx={{ ml: "auto" }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Stack
              direction="row"
              spacing={1}
              sx={{ ml: "auto", alignItems: "center" }}
            >
              {navItems.map((item) => (
                <motion.div key={item.id} whileHover={{ y: -2 }}>
                  <Button
                    color="inherit"
                    onClick={() => scrollToSection(item.id)}
                    sx={{
                      fontWeight: 700,
                      px: 3,
                      py: 1.5,
                      borderRadius: 3,
                      position: "relative",
                      "&:hover": {
                        background: `linear-gradient(135deg, ${alpha(
                          colors.primary,
                          0.1
                        )} 0%, ${alpha(colors.secondary, 0.1)} 100%)`,
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "80%",
                          height: 2,
                          background: colors.gradientHero,
                          borderRadius: 1,
                        },
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  sx={{
                    borderWidth: 2,
                    borderColor: colors.primary,
                    color: colors.primary,
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    "&:hover": {
                      borderWidth: 2,
                      background: alpha(colors.primary, 0.1),
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 25px ${alpha(colors.primary, 0.3)}`,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Login
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  sx={{
                    background: colors.gradientHero,
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    boxShadow: `0 8px 32px ${alpha(colors.primary, 0.4)}`,
                    "&:hover": {
                      background: colors.neon,
                      transform: "translateY(-3px)",
                      boxShadow: `0 12px 40px ${alpha(colors.primary, 0.5)}`,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  🚀 Start Free Trial
                </Button>
              </motion.div>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: "80%",
            maxWidth: 300,
            background: colors.gradientHero,
            color: "#ffffff",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Menu
          </Typography>
          <IconButton color="inherit" onClick={() => setDrawerOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: alpha("#ffffff", 0.2) }} />
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Hero Section */}
      <Box
        id="hero"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          background: `
            radial-gradient(circle at 20% 80%, ${alpha(
              colors.primary,
              0.1
            )} 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${alpha(
              colors.secondary,
              0.1
            )} 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, ${alpha(
              colors.purple,
              0.05
            )} 0%, transparent 50%)
          `,
          pt: { xs: 12, md: 0 },
          overflow: "hidden",
        }}
      >
        <FloatingParticles />

        {/* Animated Background Shapes */}
        <motion.div style={{ y: y1 }}>
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              right: "10%",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: `conic-gradient(from 0deg, ${colors.primary}, ${colors.secondary}, ${colors.purple}, ${colors.primary})`,
              opacity: 0.1,
              animation: "spin 20s linear infinite",
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          />
        </motion.div>

        <motion.div style={{ y: y2 }}>
          <Box
            sx={{
              position: "absolute",
              bottom: "20%",
              left: "5%",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: `linear-gradient(45deg, ${alpha(
                colors.accent,
                0.2
              )}, ${alpha(colors.pink, 0.2)})`,
              filter: "blur(40px)",
            }}
          />
        </motion.div>

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <Chip
                      label="🏆 #1 Garage Management Platform"
                      sx={{
                        background: colors.gradientHero,
                        color: "#ffffff",
                        fontWeight: 700,
                        px: 3,
                        py: 1,
                        fontSize: "0.9rem",
                        boxShadow: `0 8px 25px ${alpha(colors.primary, 0.3)}`,
                      }}
                    />
                  </motion.div>
                </Stack>

                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "3rem", md: "5rem" },
                    lineHeight: 0.9,
                    mb: 4,
                    background: colors.gradientHero,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-3px",
                  }}
                >
                  Complete Garage
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      background: colors.neon,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Management Solution
                  </Box>
                  <Box
                    component="span"
                    sx={{ fontSize: "0.5em", opacity: 0.8 }}
                  >
                    From Customer to Payment
                  </Box>
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 6,
                    fontWeight: 500,
                    lineHeight: 1.6,
                    maxWidth: 600,
                  }}
                >
                  Streamline your entire garage workflow with our AI-powered
                  platform.
                  <Box
                    component="span"
                    sx={{ fontWeight: 700, color: colors.primary }}
                  >
                    {" "}
                    Customer → Job Card → Quotation → Invoice → Payment →
                    Inventory → Accounts{" "}
                  </Box>
                  - all in one seamless system.
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={3}
                  sx={{ mb: 6 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Rocket />}
                      sx={{
                        background: colors.gradientHero,
                        px: 6,
                        py: 3,
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        borderRadius: 4,
                        boxShadow: `0 15px 50px ${alpha(colors.primary, 0.4)}`,
                        position: "relative",
                        overflow: "hidden",
                        "&:hover": {
                          background: colors.neon,
                          boxShadow: `0 20px 60px ${alpha(
                            colors.primary,
                            0.6
                          )}`,
                        },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: "-100%",
                          width: "100%",
                          height: "100%",
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                          transition: "left 0.6s",
                        },
                        "&:hover::before": {
                          left: "100%",
                        },
                      }}
                    >
                      🚀 START FREE 30-DAY TRIAL
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<PlayArrow />}
                      sx={{
                        borderWidth: 3,
                        borderColor: colors.primary,
                        color: colors.primary,
                        px: 6,
                        py: 3,
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        borderRadius: 4,
                        "&:hover": {
                          borderWidth: 3,
                          background: `linear-gradient(135deg, ${alpha(
                            colors.primary,
                            0.1
                          )} 0%, ${alpha(colors.secondary, 0.1)} 100%)`,
                          boxShadow: `0 15px 40px ${alpha(
                            colors.primary,
                            0.3
                          )}`,
                        },
                      }}
                    >
                      🎬 Watch Demo
                    </Button>
                  </motion.div>
                </Stack>

                <Stack
                  direction="row"
                  spacing={6}
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Stack direction="row" spacing={0.5}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.div
                          key={star}
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 2,
                            delay: star * 0.1,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          <Star sx={{ color: "#ffc107", fontSize: 24 }} />
                        </motion.div>
                      ))}
                    </Stack>
                    <Typography variant="body1" sx={{ ml: 2, fontWeight: 700 }}>
                      4.98/5 (2,500+ reviews)
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={3} alignItems="center">
                    <Chip
                      icon={<Verified />}
                      label="No Credit Card Required"
                      sx={{
                        background: alpha(colors.success, 0.1),
                        color: colors.success,
                        fontWeight: 600,
                      }}
                    />
                  </Stack>
                </Stack>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <Box sx={{ position: "relative", perspective: "1000px" }}>
                  <motion.div
                    animate={{
                      rotateY: [0, 5, 0, -5, 0],
                      rotateX: [0, 2, 0, -2, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        borderRadius: 6,
                        overflow: "hidden",
                        background: colors.gradientCard,
                        backdropFilter: "blur(20px)",
                        border: `2px solid ${alpha("#ffffff", 0.2)}`,
                        boxShadow: `
                          0 25px 80px ${alpha(colors.primary, 0.3)},
                          inset 0 1px 0 ${alpha("#ffffff", 0.2)}
                        `,
                      }}
                    >
                      <Box
                        component="img"
                        src="/placeholder.svg?height=600&width=800"
                        alt="GarageERP Pro Dashboard"
                        sx={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          filter: "brightness(1.1) contrast(1.1)",
                        }}
                      />
                    </Paper>
                  </motion.div>

                  {/* Floating Achievement Cards */}
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 2, 0, -2, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    style={{
                      position: "absolute",
                      top: "10%",
                      right: "-15%",
                      zIndex: 3,
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 4,
                        background: colors.gradientCard,
                        backdropFilter: "blur(20px)",
                        border: `1px solid ${alpha("#ffffff", 0.3)}`,
                        boxShadow: `0 20px 60px ${alpha(colors.success, 0.3)}`,
                        minWidth: 200,
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          sx={{
                            background: colors.gradientHero,
                            borderRadius: "50%",
                            p: 1.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <TrendingUp sx={{ color: "#ffffff", fontSize: 24 }} />
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{ color: colors.success }}
                          >
                            +250% Revenue
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Average Growth
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [0, 12, 0],
                      rotate: [0, -1, 0, 1, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    style={{
                      position: "absolute",
                      bottom: "15%",
                      left: "-20%",
                      zIndex: 3,
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 4,
                        background: colors.gradientCard,
                        backdropFilter: "blur(20px)",
                        border: `1px solid ${alpha("#ffffff", 0.3)}`,
                        boxShadow: `0 20px 60px ${alpha(
                          colors.secondary,
                          0.3
                        )}`,
                        minWidth: 180,
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          sx={{
                            background: colors.neon,
                            borderRadius: "50%",
                            p: 1.5,
                          }}
                        >
                          <Speed sx={{ color: "#ffffff", fontSize: 24 }} />
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{ color: colors.secondary }}
                          >
                            85% Faster
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Processing Time
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Client Logos Section */}
      <Box
        id="clients"
        sx={{
          py: 8,
          background: alpha(colors.primary, 0.02),
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="text.secondary"
              gutterBottom
            >
              Trusted by 2,500+ Garage Owners Worldwide
            </Typography>
          </Box>

          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            {clientLogos.map((client, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      textAlign: "center",
                      background: "transparent",
                      border: `1px solid ${alpha(colors.primary, 0.1)}`,
                      borderRadius: 3,
                      "&:hover": {
                        background: alpha(colors.primary, 0.02),
                        borderColor: alpha(colors.primary, 0.3),
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Box
                      component="img"
                      src={client.logo}
                      alt={client.name}
                      sx={{
                        width: "100%",
                        height: 40,
                        objectFit: "contain",
                        filter: "grayscale(100%)",
                        "&:hover": {
                          filter: "grayscale(0%)",
                        },
                        transition: "filter 0.3s ease",
                      }}
                    />
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box
        sx={{
          py: 12,
          background: `
            linear-gradient(135deg, ${alpha(colors.primary, 0.03)} 0%, ${alpha(
            colors.secondary,
            0.03
          )} 100%),
            radial-gradient(circle at 50% 50%, ${alpha(
              colors.purple,
              0.02
            )} 0%, transparent 50%)
          `,
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  background: colors.gradientHero,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                🚀 Proven Results That Speak for Themselves
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Join thousands of successful garage owners who've transformed
                their business
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    y: -10,
                    scale: 1.05,
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      textAlign: "center",
                      background: colors.gradientCard,
                      backdropFilter: "blur(20px)",
                      border: `1px solid ${alpha(stat.color, 0.2)}`,
                      borderRadius: 4,
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        boxShadow: `0 25px 80px ${alpha(stat.color, 0.2)}`,
                        "&::before": {
                          opacity: 1,
                        },
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: `linear-gradient(90deg, ${
                          stat.color
                        }, ${alpha(stat.color, 0.5)})`,
                        opacity: 0.7,
                        transition: "opacity 0.3s ease",
                      },
                    }}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <Box
                        sx={{
                          background: `linear-gradient(135deg, ${
                            stat.color
                          }, ${alpha(stat.color, 0.7)})`,
                          borderRadius: "50%",
                          p: 2,
                          display: "inline-flex",
                          mb: 3,
                          boxShadow: `0 8px 25px ${alpha(stat.color, 0.3)}`,
                        }}
                      >
                        {React.cloneElement(stat.icon, {
                          sx: { color: "#ffffff", fontSize: 32 },
                        })}
                      </Box>
                    </motion.div>

                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={2}
                    />

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      fontWeight={600}
                      sx={{ mt: 1 }}
                    >
                      {stat.label}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Workflow Section */}
      <Box id="workflow" sx={{ py: 15 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 12 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  mb: 4,
                  background: colors.gradientHero,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "2.5rem", md: "4rem" },
                }}
              >
                🔄 Complete Workflow
                <Box component="span" sx={{ display: "block" }}>
                  From Customer to Payment
                </Box>
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  maxWidth: 800,
                  mx: "auto",
                  lineHeight: 1.6,
                  fontWeight: 500,
                }}
              >
                Our streamlined 7-step process ensures nothing falls through the
                cracks. Every step is automated, tracked, and optimized for
                maximum efficiency.
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={4}>
            {workflowSteps.map((step, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50, rotateX: 20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    y: -15,
                    rotateX: 5,
                    rotateY: 5,
                  }}
                  style={{ perspective: "1000px" }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      p: 4,
                      borderRadius: 6,
                      background: colors.gradientCard,
                      backdropFilter: "blur(20px)",
                      border: `2px solid ${alpha(step.color, 0.2)}`,
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        boxShadow: `0 30px 100px ${alpha(step.color, 0.2)}`,
                        "&::before": {
                          opacity: 1,
                        },
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: `linear-gradient(90deg, ${
                          step.color
                        }, ${alpha(step.color, 0.5)})`,
                        opacity: 0.7,
                        transition: "opacity 0.3s ease",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 3 }}
                      >
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${
                              step.color
                            }, ${alpha(step.color, 0.7)})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mr: 2,
                            boxShadow: `0 8px 25px ${alpha(step.color, 0.3)}`,
                          }}
                        >
                          <Typography
                            variant="h5"
                            fontWeight="bold"
                            sx={{ color: "#ffffff" }}
                          >
                            {step.step}
                          </Typography>
                        </Box>
                        <motion.div
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          <Box
                            sx={{
                              background: `linear-gradient(135deg, ${
                                step.color
                              }, ${alpha(step.color, 0.7)})`,
                              borderRadius: 3,
                              p: 1.5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {React.cloneElement(step.icon, {
                              sx: { color: "#ffffff", fontSize: 32 },
                            })}
                          </Box>
                        </motion.div>
                      </Box>

                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                          background: `linear-gradient(135deg, ${
                            step.color
                          }, ${alpha(step.color, 0.7)})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {step.title}
                      </Typography>

                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.7,
                          fontSize: "1.1rem",
                        }}
                      >
                        {step.description}
                      </Typography>

                      {index < workflowSteps.length - 1 && (
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: -20,
                            right: 20,
                            zIndex: 2,
                          }}
                        >
                          <motion.div
                            animate={{
                              x: [0, 10, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                          >
                            <ArrowForward
                              sx={{
                                color: step.color,
                                fontSize: 32,
                                background: alpha("#ffffff", 0.9),
                                borderRadius: "50%",
                                p: 1,
                                boxShadow: `0 4px 15px ${alpha(
                                  step.color,
                                  0.3
                                )}`,
                              }}
                            />
                          </motion.div>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        id="features"
        sx={{
          py: 15,
          background: `
            linear-gradient(135deg, ${alpha(colors.primary, 0.02)} 0%, ${alpha(
            colors.secondary,
            0.02
          )} 100%),
            radial-gradient(circle at 30% 70%, ${alpha(
              colors.purple,
              0.02
            )} 0%, transparent 50%)
          `,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 12 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  mb: 4,
                  background: colors.gradientHero,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "2.5rem", md: "4rem" },
                }}
              >
                🚀 Powerful Features
                <Box component="span" sx={{ display: "block" }}>
                  Built for Success
                </Box>
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  maxWidth: 800,
                  mx: "auto",
                  lineHeight: 1.6,
                  fontWeight: 500,
                }}
              >
                Everything you need to run a modern, efficient garage business.
                From customer management to financial reporting, we've got you
                covered.
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={6}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50, rotateX: 20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    y: -15,
                    rotateX: 5,
                    rotateY: 5,
                  }}
                  style={{ perspective: "1000px" }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      p: 4,
                      borderRadius: 6,
                      background: colors.gradientCard,
                      backdropFilter: "blur(20px)",
                      border: `1px solid ${alpha("#ffffff", 0.2)}`,
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        boxShadow: `0 30px 100px ${alpha(feature.color, 0.2)}`,
                        "&::before": {
                          opacity: 1,
                        },
                        "&::after": {
                          transform: "translateX(100%)",
                        },
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: feature.gradient,
                        opacity: 0.7,
                        transition: "opacity 0.3s ease",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                        transition: "transform 0.6s ease",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 4 }}
                      >
                        <motion.div
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          <Box
                            sx={{
                              width: 80,
                              height: 80,
                              borderRadius: 4,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: feature.gradient,
                              mr: 3,
                              boxShadow: `0 15px 40px ${alpha(
                                feature.color,
                                0.3
                              )}`,
                              position: "relative",
                              "&::before": {
                                content: '""',
                                position: "absolute",
                                inset: 2,
                                borderRadius: 3,
                                background: alpha("#ffffff", 0.1),
                              },
                            }}
                          >
                            {React.cloneElement(feature.icon, {
                              sx: {
                                color: "#ffffff",
                                fontSize: 36,
                                zIndex: 1,
                                position: "relative",
                              },
                            })}
                          </Box>
                        </motion.div>
                        <Typography
                          variant="h4"
                          fontWeight="bold"
                          sx={{
                            background: feature.gradient,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {feature.title}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          mb: 4,
                          lineHeight: 1.7,
                          fontSize: "1.1rem",
                        }}
                      >
                        {feature.description}
                      </Typography>

                      <List disablePadding>
                        {feature.items.map((item, itemIndex) => (
                          <motion.div
                            key={itemIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: itemIndex * 0.1 }}
                          >
                            <ListItem
                              disableGutters
                              sx={{
                                py: 1,
                                "&:hover": {
                                  transform: "translateX(10px)",
                                  "& .MuiListItemIcon-root": {
                                    transform: "scale(1.2)",
                                  },
                                },
                                transition: "all 0.3s ease",
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 40 }}>
                                <motion.div
                                  whileHover={{ rotate: 360 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <CheckCircle
                                    sx={{
                                      color: feature.color,
                                      fontSize: 20,
                                      filter: `drop-shadow(0 2px 4px ${alpha(
                                        feature.color,
                                        0.3
                                      )})`,
                                    }}
                                  />
                                </motion.div>
                              </ListItemIcon>
                              <ListItemText
                                primary={item}
                                primaryTypographyProps={{
                                  variant: "body2",
                                  fontWeight: 600,
                                  fontSize: "1rem",
                                }}
                              />
                            </ListItem>
                          </motion.div>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box id="pricing" sx={{ py: 15 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 12 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  mb: 4,
                  background: colors.gradientHero,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "2.5rem", md: "4rem" },
                }}
              >
                💎 Simple Pricing
                <Box component="span" sx={{ display: "block" }}>
                  Maximum Value
                </Box>
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ maxWidth: 800, mx: "auto", lineHeight: 1.6, mb: 4 }}
              >
                Choose the perfect plan for your garage business. All plans
                include our complete workflow system and premium support.
              </Typography>

              <Stack direction="row" spacing={2} justifyContent="center">
                <Chip
                  label="🎉 Limited Time: 50% OFF"
                  sx={{
                    background: colors.neon,
                    color: "#ffffff",
                    fontWeight: 700,
                    px: 3,
                    py: 1,
                    fontSize: "1rem",
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.05)" },
                      "100%": { transform: "scale(1)" },
                    },
                  }}
                />
                <Chip
                  label="⚡ 30-Day FREE Trial"
                  sx={{
                    background: alpha(colors.success, 0.1),
                    color: colors.success,
                    fontWeight: 700,
                    px: 3,
                    py: 1,
                    fontSize: "1rem",
                  }}
                />
              </Stack>
            </motion.div>
          </Box>

          <Grid container spacing={6} justifyContent="center">
            {pricingPlans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    y: -20,
                    scale: plan.popular ? 1.08 : 1.05,
                  }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      p: 5,
                      borderRadius: 6,
                      position: "relative",
                      background: plan.popular
                        ? colors.gradientCard
                        : alpha("#ffffff", 0.8),
                      backdropFilter: "blur(20px)",
                      border: plan.popular
                        ? `3px solid ${colors.primary}`
                        : `2px solid ${alpha(colors.primary, 0.1)}`,
                      transform: plan.popular ? "scale(1.05)" : "scale(1)",
                      overflow: "hidden",
                      "&:hover": {
                        boxShadow: plan.popular
                          ? `0 40px 120px ${alpha(colors.primary, 0.3)}`
                          : `0 30px 80px ${alpha(colors.primary, 0.15)}`,
                        "&::before": {
                          opacity: 1,
                        },
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 6,
                        background: plan.gradient,
                        opacity: plan.popular ? 1 : 0.7,
                        transition: "opacity 0.3s ease",
                      },
                    }}
                  >
                    {plan.popular && (
                      <motion.div
                        animate={{
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <Chip
                          label="🏆 MOST POPULAR"
                          sx={{
                            position: "absolute",
                            top: -15,
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: colors.neon,
                            color: "#ffffff",
                            fontWeight: 800,
                            px: 3,
                            py: 1,
                            fontSize: "0.9rem",
                            boxShadow: `0 8px 25px ${alpha(
                              colors.primary,
                              0.4
                            )}`,
                          }}
                        />
                      </motion.div>
                    )}

                    <Box
                      sx={{
                        textAlign: "center",
                        mb: 5,
                        mt: plan.popular ? 3 : 0,
                      }}
                    >
                      <Typography
                        variant="h3"
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                          background: plan.gradient,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {plan.name}
                      </Typography>

                      <Typography
                        variant="body1"
                        color="text.secondary"
                        gutterBottom
                        sx={{ fontSize: "1.1rem", fontWeight: 500 }}
                      >
                        {plan.description}
                      </Typography>

                      <Box sx={{ my: 4 }}>
                        <Stack
                          direction="row"
                          alignItems="baseline"
                          justifyContent="center"
                          spacing={1}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              textDecoration: "line-through",
                              color: "text.secondary",
                              opacity: 0.7,
                            }}
                          >
                            ${plan.originalPrice}
                          </Typography>
                          <Typography
                            variant="h2"
                            sx={{
                              fontWeight: 900,
                              background: plan.gradient,
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            ${plan.price}
                          </Typography>
                          <Typography variant="h6" color="text.secondary">
                            /{plan.period}
                          </Typography>
                        </Stack>

                        <Chip
                          label={plan.savings}
                          size="small"
                          sx={{
                            mt: 2,
                            background: alpha(colors.success, 0.1),
                            color: colors.success,
                            fontWeight: 700,
                          }}
                        />
                      </Box>
                    </Box>

                    <List disablePadding sx={{ mb: 5 }}>
                      {plan.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: featureIndex * 0.1 }}
                        >
                          <ListItem
                            disableGutters
                            sx={{
                              py: 1.5,
                              "&:hover": {
                                transform: "translateX(10px)",
                                "& .MuiListItemIcon-root": {
                                  transform: "scale(1.2) rotate(360deg)",
                                },
                              },
                              transition: "all 0.3s ease",
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <CheckCircle
                                sx={{
                                  color: colors.success,
                                  fontSize: 22,
                                  filter: `drop-shadow(0 2px 4px ${alpha(
                                    colors.success,
                                    0.3
                                  )})`,
                                  transition: "all 0.3s ease",
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={feature}
                              primaryTypographyProps={{
                                variant: "body1",
                                fontWeight: 600,
                                fontSize: "1rem",
                              }}
                            />
                          </ListItem>
                        </motion.div>
                      ))}
                    </List>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={plan.popular ? "contained" : "outlined"}
                        fullWidth
                        size="large"
                        sx={{
                          py: 3,
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          borderRadius: 4,
                          ...(plan.popular
                            ? {
                                background: plan.gradient,
                                boxShadow: `0 15px 40px ${alpha(
                                  colors.primary,
                                  0.4
                                )}`,
                                "&:hover": {
                                  background: colors.neon,
                                  boxShadow: `0 20px 50px ${alpha(
                                    colors.primary,
                                    0.5
                                  )}`,
                                },
                              }
                            : {
                                borderWidth: 3,
                                borderColor: colors.primary,
                                color: colors.primary,
                                "&:hover": {
                                  borderWidth: 3,
                                  background: alpha(colors.primary, 0.1),
                                  boxShadow: `0 15px 40px ${alpha(
                                    colors.primary,
                                    0.2
                                  )}`,
                                },
                              }),
                        }}
                      >
                        🚀 Start {plan.popular ? "Premium" : "Free"} Trial
                      </Button>
                    </motion.div>

                    {plan.popular && (
                      <Box sx={{ mt: 3, textAlign: "center" }}>
                        <Typography variant="caption" color="text.secondary">
                          ⚡ Most chosen by successful garages
                        </Typography>
                      </Box>
                    )}
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Happy Clients/Testimonials Section */}
      <Box
        id="testimonials"
        sx={{
          py: 15,
          background: `
            linear-gradient(135deg, ${alpha(colors.primary, 0.05)} 0%, ${alpha(
            colors.secondary,
            0.05
          )} 100%),
            radial-gradient(circle at 30% 70%, ${alpha(
              colors.purple,
              0.03
            )} 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, ${alpha(
              colors.accent,
              0.03
            )} 0%, transparent 50%)
          `,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <FloatingParticles />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", mb: 12 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  mb: 4,
                  background: colors.gradientHero,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "2.5rem", md: "4rem" },
                }}
              >
                😊 Happy Clients
                <Box component="span" sx={{ display: "block" }}>
                  Success Stories
                </Box>
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ maxWidth: 800, mx: "auto", lineHeight: 1.6 }}
              >
                Discover how garage owners worldwide are achieving extraordinary
                results and transforming their businesses with our complete
                workflow solution.
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={6}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50, rotateY: 20 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{
                    y: -20,
                    rotateY: 5,
                    scale: 1.02,
                  }}
                  style={{ perspective: "1000px" }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      p: 5,
                      borderRadius: 6,
                      background: colors.gradientCard,
                      backdropFilter: "blur(20px)",
                      border: `2px solid ${alpha("#ffffff", 0.2)}`,
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        boxShadow: `0 40px 120px ${alpha(colors.primary, 0.2)}`,
                        "&::before": {
                          opacity: 1,
                        },
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 6,
                        background: colors.gradientHero,
                        opacity: 0.8,
                        transition: "opacity 0.3s ease",
                      },
                    }}
                  >
                    <Box sx={{ position: "absolute", top: 20, right: 20 }}>
                      <Chip
                        label={testimonial.badge}
                        sx={{
                          background: colors.gradientHero,
                          color: "#ffffff",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                        }}
                      />
                    </Box>

                    <Stack direction="row" spacing={0.5} sx={{ mb: 4 }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.div
                          key={star}
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            delay: star * 0.1,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: 3,
                          }}
                        >
                          <Star sx={{ color: "#ffc107", fontSize: 28 }} />
                        </motion.div>
                      ))}
                    </Stack>

                    <Typography
                      variant="body1"
                      sx={{
                        mb: 4,
                        lineHeight: 1.8,
                        fontStyle: "italic",
                        fontSize: "1.1rem",
                        position: "relative",
                        "&::before": {
                          content: '"',
                          fontSize: "4rem",
                          position: "absolute",
                          top: -20,
                          left: -10,
                          color: alpha(colors.primary, 0.2),
                          fontFamily: "serif",
                        },
                      }}
                    >
                      {testimonial.content}
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          background: alpha(colors.success, 0.1),
                          border: `1px solid ${alpha(colors.success, 0.2)}`,
                        }}
                      >
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          sx={{
                            color: colors.success,
                            textAlign: "center",
                          }}
                        >
                          {testimonial.revenue} Revenue Growth
                        </Typography>
                      </Paper>
                    </Box>

                    <Stack direction="row" spacing={3} alignItems="center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Avatar
                          src={testimonial.avatar}
                          sx={{
                            width: 70,
                            height: 70,
                            border: `3px solid ${colors.primary}`,
                            boxShadow: `0 8px 25px ${alpha(
                              colors.primary,
                              0.3
                            )}`,
                          }}
                        />
                      </motion.div>
                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{
                            background: colors.gradientHero,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontWeight={600}
                        >
                          {testimonial.role}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {testimonial.company}
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Consultancy Section */}
      <Box id="consultancy" sx={{ py: 15 }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    mb: 4,
                    background: colors.gradientHero,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: "2.5rem", md: "4rem" },
                  }}
                >
                  🎯 Expert Consultancy
                  <Box component="span" sx={{ display: "block" }}>
                    & Implementation
                  </Box>
                </Typography>

                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ mb: 6, lineHeight: 1.6, fontWeight: 500 }}
                >
                  Get personalized guidance from our garage management experts.
                  We'll help you implement the perfect workflow and maximize
                  your ROI from day one.
                </Typography>

                <Grid container spacing={4} sx={{ mb: 6 }}>
                  {[
                    {
                      icon: <Business />,
                      title: "Business Analysis",
                      description:
                        "Complete assessment of your current operations and growth opportunities",
                    },
                    {
                      icon: <AutoAwesome />,
                      title: "Custom Setup",
                      description:
                        "Tailored system configuration to match your specific business needs",
                    },
                    {
                      icon: <Support />,
                      title: "Training & Support",
                      description:
                        "Comprehensive team training and ongoing support for maximum success",
                    },
                    {
                      icon: <TrendingUp />,
                      title: "Growth Strategy",
                      description:
                        "Data-driven recommendations to accelerate your business growth",
                    },
                  ].map((service, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: 4,
                            background: colors.gradientCard,
                            backdropFilter: "blur(20px)",
                            border: `1px solid ${alpha(colors.primary, 0.1)}`,
                            "&:hover": {
                              boxShadow: `0 15px 40px ${alpha(
                                colors.primary,
                                0.1
                              )}`,
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          <Box
                            sx={{
                              background: colors.gradientHero,
                              borderRadius: "50%",
                              p: 1.5,
                              display: "inline-flex",
                              mb: 2,
                            }}
                          >
                            {React.cloneElement(service.icon, {
                              sx: { color: "#ffffff", fontSize: 24 },
                            })}
                          </Box>
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            gutterBottom
                          >
                            {service.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {service.description}
                          </Typography>
                        </Paper>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Phone />}
                    sx={{
                      background: colors.gradientHero,
                      px: 6,
                      py: 3,
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      borderRadius: 4,
                      boxShadow: `0 15px 50px ${alpha(colors.primary, 0.4)}`,
                      "&:hover": {
                        background: colors.neon,
                        boxShadow: `0 20px 60px ${alpha(colors.primary, 0.5)}`,
                      },
                    }}
                  >
                    📞 Book Free Consultation
                  </Button>
                </motion.div>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 6,
                    borderRadius: 6,
                    background: colors.gradientCard,
                    backdropFilter: "blur(20px)",
                    border: `2px solid ${alpha("#ffffff", 0.2)}`,
                    boxShadow: `0 25px 80px ${alpha(colors.primary, 0.2)}`,
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: colors.primary }}
                  >
                    🚀 Implementation Package
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4, lineHeight: 1.7 }}
                  >
                    Get your garage up and running with our complete
                    implementation package. Everything you need for a successful
                    digital transformation.
                  </Typography>

                  <List disablePadding>
                    {[
                      "✅ Complete system setup & configuration",
                      "📊 Data migration from existing systems",
                      "👨‍🏫 Staff training & onboarding sessions",
                      "📱 Mobile app setup for your team",
                      "🔧 Custom workflow optimization",
                      "📞 30 days of priority support",
                      "📈 Performance monitoring & optimization",
                      "🎯 Growth strategy consultation",
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <ListItem disableGutters sx={{ py: 1 }}>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              variant: "body1",
                              fontWeight: 600,
                            }}
                          />
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>

                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      borderRadius: 3,
                      background: alpha(colors.success, 0.1),
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{ color: colors.success, mb: 1 }}
                    >
                      💰 Implementation Value: $2,500
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      FREE with annual subscription
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box
        id="contact"
        sx={{
          py: 15,
          background: `
            linear-gradient(135deg, ${alpha(colors.primary, 0.03)} 0%, ${alpha(
            colors.secondary,
            0.03
          )} 100%)
          `,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 12 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  mb: 4,
                  background: colors.gradientHero,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "2.5rem", md: "4rem" },
                }}
              >
                📞 Get In Touch
                <Box component="span" sx={{ display: "block" }}>
                  Let's Transform Your Garage
                </Box>
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ maxWidth: 800, mx: "auto", lineHeight: 1.6 }}
              >
                Ready to revolutionize your garage business? Contact our experts
                today for a personalized demo and consultation.
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 6,
                    borderRadius: 6,
                    background: colors.gradientCard,
                    backdropFilter: "blur(20px)",
                    border: `2px solid ${alpha("#ffffff", 0.2)}`,
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: colors.primary }}
                  >
                    💬 Send us a Message
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                  >
                    Fill out the form below and our team will get back to you
                    within 24 hours.
                  </Typography>

                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          background: alpha("#ffffff", 0.5),
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Email Address"
                      variant="outlined"
                      type="email"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          background: alpha("#ffffff", 0.5),
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Phone Number"
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          background: alpha("#ffffff", 0.5),
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Garage Name"
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          background: alpha("#ffffff", 0.5),
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          background: alpha("#ffffff", 0.5),
                        },
                      }}
                    />

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                          background: colors.gradientHero,
                          py: 3,
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          borderRadius: 3,
                          boxShadow: `0 15px 40px ${alpha(
                            colors.primary,
                            0.4
                          )}`,
                          "&:hover": {
                            background: colors.neon,
                            boxShadow: `0 20px 50px ${alpha(
                              colors.primary,
                              0.5
                            )}`,
                          },
                        }}
                      >
                        🚀 Send Message
                      </Button>
                    </motion.div>
                  </Stack>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Stack spacing={4}>
                  {[
                    {
                      icon: <Phone />,
                      title: "Call Us",
                      content: "+1 (555) 123-4567",
                      description: "Mon-Fri 9AM-6PM EST",
                      color: colors.primary,
                    },
                    {
                      icon: <Email />,
                      title: "Email Us",
                      content: "hello@garageerppro.com",
                      description: "We'll respond within 24 hours",
                      color: colors.secondary,
                    },
                    {
                      icon: <LocationOn />,
                      title: "Visit Us",
                      content: "123 Business Ave, Suite 100",
                      description: "New York, NY 10001",
                      color: colors.accent,
                    },
                  ].map((contact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 4,
                          borderRadius: 4,
                          background: colors.gradientCard,
                          backdropFilter: "blur(20px)",
                          border: `1px solid ${alpha(contact.color, 0.2)}`,
                          "&:hover": {
                            boxShadow: `0 15px 40px ${alpha(
                              contact.color,
                              0.2
                            )}`,
                            borderColor: alpha(contact.color, 0.4),
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Stack direction="row" spacing={3} alignItems="center">
                          <Box
                            sx={{
                              background: `linear-gradient(135deg, ${
                                contact.color
                              }, ${alpha(contact.color, 0.7)})`,
                              borderRadius: "50%",
                              p: 2,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {React.cloneElement(contact.icon, {
                              sx: { color: "#ffffff", fontSize: 28 },
                            })}
                          </Box>
                          <Box>
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              gutterBottom
                            >
                              {contact.title}
                            </Typography>
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              sx={{ color: contact.color }}
                              gutterBottom
                            >
                              {contact.content}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {contact.description}
                            </Typography>
                          </Box>
                        </Stack>
                      </Paper>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        borderRadius: 4,
                        background: colors.gradientHero,
                        color: "#ffffff",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold" gutterBottom>
                        🎯 Ready to Get Started?
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                        Book a free 30-minute consultation with our garage
                        management experts.
                      </Typography>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="contained"
                          size="large"
                          sx={{
                            background: "#ffffff",
                            color: colors.primary,
                            fontWeight: 700,
                            px: 4,
                            py: 2,
                            borderRadius: 3,
                            "&:hover": {
                              background: alpha("#ffffff", 0.9),
                            },
                          }}
                        >
                          📅 Schedule Free Demo
                        </Button>
                      </motion.div>
                    </Paper>
                  </motion.div>
                </Stack>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Box
        sx={{
          py: 15,
          background: colors.gradientHero,
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <FloatingParticles />

        <Container
          maxWidth="md"
          sx={{ textAlign: "center", position: "relative", zIndex: 2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  mb: 4,
                  fontSize: { xs: "3rem", md: "5rem" },
                  lineHeight: 0.9,
                  textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                🚀 Ready to Transform
                <Box component="span" sx={{ display: "block" }}>
                  Your Garage Business?
                </Box>
              </Typography>
            </motion.div>

            <Typography
              variant="h5"
              sx={{
                mb: 8,
                opacity: 0.95,
                lineHeight: 1.6,
                maxWidth: 800,
                mx: "auto",
                textShadow: "0 2px 10px rgba(0,0,0,0.2)",
              }}
            >
              Join over <strong>2,500 successful garage owners</strong> who have
              revolutionized their business with our complete workflow solution.
              Start your transformation today with our{" "}
              <strong>30-day FREE trial</strong> - no credit card required!
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={4}
              justifyContent="center"
              sx={{ mb: 8 }}
            >
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Rocket />}
                  sx={{
                    background: "#ffffff",
                    color: colors.primary,
                    px: 8,
                    py: 3,
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    borderRadius: 4,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                    "&:hover": {
                      background: alpha("#ffffff", 0.95),
                      boxShadow: "0 25px 80px rgba(0,0,0,0.4)",
                    },
                  }}
                >
                  🎉 START FREE 30-DAY TRIAL
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrow />}
                  sx={{
                    borderWidth: 3,
                    borderColor: "#ffffff",
                    color: "#ffffff",
                    px: 8,
                    py: 3,
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    borderRadius: 4,
                    "&:hover": {
                      borderWidth: 3,
                      background: alpha("#ffffff", 0.1),
                      boxShadow: "0 15px 40px rgba(255,255,255,0.2)",
                    },
                  }}
                >
                  🎬 Watch Live Demo
                </Button>
              </motion.div>
            </Stack>

            <Grid
              container
              spacing={4}
              justifyContent="center"
              sx={{ opacity: 0.9 }}
            >
              <Grid item xs={12} sm={4}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Security fontSize="large" />
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      Enterprise Security
                    </Typography>
                    <Typography variant="body2">
                      Bank-level encryption
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Support fontSize="large" />
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      24/7 VIP Support
                    </Typography>
                    <Typography variant="body2">
                      Dedicated success team
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <CloudSync fontSize="large" />
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      99.99% Uptime
                    </Typography>
                    <Typography variant="body2">Always available</Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "#0a0a0a", color: "#ffffff", py: 12 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Stack
                direction="row"
                spacing={3}
                alignItems="center"
                sx={{ mb: 4 }}
              >
                <Box
                  sx={{
                    background: colors.gradientHero,
                    borderRadius: "50%",
                    p: 2,
                  }}
                >
                  <AutoFixHigh sx={{ fontSize: 32 }} />
                </Box>
                <Typography variant="h4" fontWeight="bold">
                  GarageERP Pro
                </Typography>
              </Stack>

              <Typography
                variant="body1"
                sx={{
                  opacity: 0.8,
                  mb: 4,
                  lineHeight: 1.7,
                  fontSize: "1.1rem",
                }}
              >
                The world's most advanced garage management platform. Complete
                workflow solution from customer to payment with AI-powered
                insights and automation.
              </Typography>

              <Stack direction="row" spacing={3}>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: alpha("#ffffff", 0.3),
                      color: "#ffffff",
                      "&:hover": {
                        borderColor: "#ffffff",
                        background: alpha("#ffffff", 0.1),
                      },
                    }}
                  >
                    Privacy Policy
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: alpha("#ffffff", 0.3),
                      color: "#ffffff",
                      "&:hover": {
                        borderColor: "#ffffff",
                        background: alpha("#ffffff", 0.1),
                      },
                    }}
                  >
                    Terms of Service
                  </Button>
                </motion.div>
              </Stack>
            </Grid>

            {[
              {
                title: "Product",
                items: [
                  "🚀 Features",
                  "🔄 Workflow",
                  "💎 Pricing",
                  "🎬 Demo",
                  "📱 Mobile App",
                ],
              },
              {
                title: "Company",
                items: [
                  "🏢 About",
                  "💼 Careers",
                  "📞 Contact",
                  "📝 Blog",
                  "🏆 Success Stories",
                ],
              },
              {
                title: "Support",
                items: [
                  "❓ Help Center",
                  "📚 Documentation",
                  "👥 Community",
                  "📊 Status",
                  "🎓 Training",
                ],
              },
              {
                title: "Solutions",
                items: [
                  "🔧 Implementation",
                  "🎯 Consultancy",
                  "📈 Analytics",
                  "🔌 Integrations",
                  "🏅 Enterprise",
                ],
              },
            ].map((section, index) => (
              <Grid item xs={6} md={2} key={index}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    background: colors.gradientHero,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {section.title}
                </Typography>
                <Stack spacing={2}>
                  {section.items.map((item) => (
                    <motion.div key={item} whileHover={{ x: 5 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          opacity: 0.8,
                          cursor: "pointer",
                          fontSize: "1rem",
                          "&:hover": {
                            opacity: 1,
                            color: colors.secondary,
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        {item}
                      </Typography>
                    </motion.div>
                  ))}
                </Stack>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 6, borderColor: alpha("#ffffff", 0.1) }} />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
          >
            <Typography variant="body1" sx={{ opacity: 0.6 }}>
              © 2024 GarageERP Pro. All rights reserved. Built with ❤️ for
              garage owners worldwide.
            </Typography>

            <Stack direction="row" spacing={4} alignItems="center">
              <Typography variant="body2" sx={{ opacity: 0.6 }}>
                🌟 Trusted by 2,500+ garages
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.6 }}>
                🚀 Complete Workflow Solution
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.6 }}>
                🏆 Industry Leader
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default GarageERP;
