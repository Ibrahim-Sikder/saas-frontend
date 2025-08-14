
import { Box } from "@mui/material"
import {
  People,
  DirectionsCar,
  TrendingUp,
  Shield,
  Assignment,
  RequestQuote,
  Description,
  Payment,
  Inventory,
  AccountBalance,
  PersonAdd,
  Analytics,
} from "@mui/icons-material"

import { Navigation } from "../Landingpage/Navigation";
import { HeroSection } from "../Landingpage/HeroSection";
import { ClientLogos } from "../Landingpage/ClientLogo";
import { StatsSection } from "../Landingpage/StatSection";
import { FooterSection } from "../Landingpage/FooterSection";
import FinalCTASection from "../Landingpage/FinalCTASection";
import ContactSection from "../Landingpage/ContactSection";
import ConsultancySection from "../Landingpage/ConsultancySection";
import TestimonialsSection from "../Landingpage/TestimonialsSection";
import PricingSection from "../Landingpage/PricingSection";
import FeaturesSection from "../Landingpage/FeaturesSection";
import WorkflowSection from "../Landingpage/WorkflowSection";

export default function GarageLandingPage() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }



  const navItems = [
    { label: "Features", id: "features" },
    { label: "Workflow", id: "workflow" },
    { label: "Pricing", id: "pricing" },
    { label: "Clients", id: "clients" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Consultancy", id: "consultancy" },
    { label: "Contact", id: "contact" },
  ]

  const features = [
    {
      title: "Customer Management",
      description: "Complete 360° customer lifecycle management with AI-powered insights and personalized experiences.",
      icon: <People sx={{ fontSize: 32 }} />,
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
      icon: <Assignment sx={{ fontSize: 32 }} />,
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
      description: "AI-powered quotation system with dynamic pricing, parts integration, and instant approvals.",
      icon: <RequestQuote sx={{ fontSize: 32 }} />,
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
      icon: <Description sx={{ fontSize: 32 }} />,
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
      description: "Secure payment processing with multiple payment methods, installments, and automated receipts.",
      icon: <Payment sx={{ fontSize: 32 }} />,
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
      description: "Smart inventory management with predictive analytics, auto-reordering, and supplier integration.",
      icon: <Inventory sx={{ fontSize: 32 }} />,
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
      description: "Complete accounting solution with P&L reports, cash flow management, and business intelligence.",
      icon: <AccountBalance sx={{ fontSize: 32 }} />,
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
      icon: <Analytics sx={{ fontSize: 32 }} />,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      items: [
        "📊 Real-time Dashboards",
        "🤖 AI-Powered Insights",
        "📈 Performance Metrics",
        "🎯 Growth Recommendations",
        "📋 Custom Reports",
      ],
    },
  ]

  const workflowSteps = [
    {
      step: 1,
      title: "Customer Registration",
      description: "Easy customer onboarding with complete profile management and vehicle history tracking.",
      icon: <PersonAdd sx={{ fontSize: 32 }} />,
    },
    {
      step: 2,
      title: "Job Card Creation",
      description: "Digital job cards with photos, diagnostics, and real-time progress tracking.",
      icon: <Assignment sx={{ fontSize: 32 }} />,
    },
    {
      step: 3,
      title: "Smart Quotation",
      description: "AI-powered quotations with parts pricing, labor costs, and approval workflows.",
      icon: <RequestQuote sx={{ fontSize: 32 }} />,
    },
    {
      step: 4,
      title: "Professional Invoice",
      description: "Automated invoicing with tax calculations, multiple payment options, and delivery.",
      icon: <Description sx={{ fontSize: 32 }} />,
    },
    {
      step: 5,
      title: "Professional Money Receipt",
      description: "Automated invoicing with tax calculations, multiple payment options, and delivery.",
      icon: <Description sx={{ fontSize: 32 }} />,
    },
    {
      step: 6,
      title: "Payment Processing",
      description: "Secure payment gateway integration with multiple payment methods and receipts.",
      icon: <Payment sx={{ fontSize: 32 }} />,
    },
    {
      step: 7,
      title: "Inventory Management",
      description: "Real-time inventory tracking with auto-reordering and supplier management.",
      icon: <Inventory sx={{ fontSize: 32 }} />,
    },
    {
      step: 8,
      title: "Account Management",
      description: "Complete financial management with P&L reports, cash flow, and business analytics.",
      icon: <AccountBalance sx={{ fontSize: 32 }} />,
    },
    {
      step: 9,
      title: "Employee Management",
      description: "Complete financial management with P&L reports, cash flow, and business analytics.",
      icon: <AccountBalance sx={{ fontSize: 32 }} />,
    },
  ]

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
      savings: "Save $1200/year",
    },
  ]

  const testimonials = [
    {
      name: "Alexander Rodriguez",
      role: "CEO, Rodriguez Auto Empire",
      company: "Rodriguez Auto Group",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      revenue: "+250%",
      content:
        "Garage Master transformed our entire business operation. The workflow from customer to payment is seamless. Our revenue increased by 250% in just 6 months!",
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
        "Managing 15 locations was a nightmare before Garage Master. Now everything is centralized, automated, and profitable. Best investment we ever made!",
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
  ]

  const stats = [
    {
      value: 2500,
      label: "Happy Clients",
      suffix: "+",
      icon: <People />,
    },
    {
      value: 150000,
      label: "Vehicles Managed",
      suffix: "+",
      icon: <DirectionsCar />,
    },
    {
      value: 99.99,
      label: "Uptime Guarantee",
      suffix: "%",
      icon: <Shield />,
    },
    {
      value: 85,
      label: "Average Growth",
      suffix: "%",
      icon: <TrendingUp />,
    },
  ]

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)",
        color: "white",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Navigation navItems={navItems} scrollToSection={scrollToSection} />
      <HeroSection />
      <ClientLogos />
      <StatsSection stats={stats} />
      <WorkflowSection workflowSteps={workflowSteps} />
      <FeaturesSection features={features} />
      <PricingSection pricingPlans={pricingPlans} />
      <TestimonialsSection testimonials={testimonials} />
      <ConsultancySection/>
      <ContactSection/>
      <FinalCTASection/>
      <FooterSection />
    </Box>
  )
}
