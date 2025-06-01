// /* eslint-disable no-unused-vars */
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Link as RouterLink } from "react-router-dom";
// import {
//   AppBar,
//   Box,
//   Button,
//   CardContent,
//   Container,
//   Divider,
//   Grid,
//   IconButton,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   Typography,
//   useMediaQuery,
//   useTheme,
//   Drawer,
//   alpha,
//   Avatar,
// } from "@mui/material";
// import {
//   Build,
//   CheckCircle,
//   DirectionsCar,
//   Menu as MenuIcon,
//   Receipt,
//   Close,
//   ArrowForward,
//   Speed,
//   BarChart,
//   KeyboardArrowDown,
//   PlayArrow,
// } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import Lottie from "lottie-react";
// import ParticlesBackground from "../../common/ParticlesBackground";
// import {
//   FloatingElement,
//   FloatingElements,
// } from "../../common/FloatingElements";
// import GradientText from "../../common/GradientText";
// import GlassCard from "../../common/GlassCard";
// import AnimatedGradientBackground from "../../common/AnimatedGradientBackground";
// import AnimatedCounter from "../../common/AnimatedCount";

// const LandingPage = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const parallaxRef = useRef(null);

//   // Define default colors in case theme values are undefined
//   const primaryColor = theme?.palette?.primary?.main || "#3a36db";
//   const secondaryColor = theme?.palette?.secondary?.main || "#00c6b6";
//   const accentColor = theme?.palette?.accent?.main || "#f5a623";
//   const bgPaper = theme?.palette?.background?.paper || "#ffffff";

//   // Handle scroll events
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.5 },
//     },
//   };

//   const fadeInVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { duration: 0.8 },
//     },
//   };

//   const features = [
//     {
//       title: "Vehicle Management",
//       description:
//         "Track vehicle history, service records, and customer preferences. Set up automated service reminders.",
//       icon: <DirectionsCar fontSize="large" />,
//       color: primaryColor,
//       // animation: carAnimation,
//       items: [
//         "Complete vehicle service history",
//         "Automated service reminders",
//         "Vehicle specifications database",
//       ],
//     },
//     {
//       title: "Job Card Management",
//       description:
//         "Create detailed job cards, track progress, assign technicians, and manage parts and labor efficiently.",
//       icon: <Build fontSize="large" />,
//       color: secondaryColor,
//       // animation: mechanicAnimation,
//       items: [
//         "Digital job cards",
//         "Real-time progress tracking",
//         "Technician assignment",
//       ],
//     },
//     {
//       title: "Invoicing & Payments",
//       description:
//         "Generate professional invoices, track payments, and manage your finances with ease.",
//       icon: <Receipt fontSize="large" />,
//       color: accentColor,
//       animation: null,
//       items: [
//         "Professional invoice templates",
//         "Online payment processing",
//         "Financial reporting",
//       ],
//     },
//   ];

//   const testimonials = [
//     {
//       name: "John Smith",
//       role: "Owner, Smith Auto Repair",
//       avatar: "/placeholder.svg?height=60&width=60",
//       content:
//         "This software has completely transformed how we run our garage. Customer management is seamless, and the invoicing system has saved us countless hours.",
//     },
//     {
//       name: "Sarah Johnson",
//       role: "Manager, Johnson Motors",
//       avatar: "/placeholder.svg?height=60&width=60",
//       content:
//         "The job card management feature is a game-changer. We can track every vehicle in our shop in real-time, and our customers love the transparency.",
//     },
//     {
//       name: "Michael Brown",
//       role: "CEO, Brown's Auto Group",
//       avatar: "/placeholder.svg?height=60&width=60",
//       content:
//         "We've tried several garage management systems, but this one stands out. The reporting features give us insights we never had before, and the interface is incredibly intuitive.",
//     },
//   ];

//   const stats = [
//     { value: 500, label: "Garages Using Our Software", suffix: "+" },
//     { value: 25000, label: "Vehicles Serviced Monthly", suffix: "+" },
//     { value: 98, label: "Customer Satisfaction", suffix: "%" },
//     { value: 35, label: "Time Saved on Administration", suffix: "%" },
//   ];

//   // Safe alpha function that handles undefined values
//   const safeAlpha = (color, opacity) => {
//     if (!color) return `rgba(0, 0, 0, ${opacity})`; // Fallback color
//     try {
//       return alpha(color, opacity);
//     } catch (e) {
//       console.warn("Error applying alpha:", e);
//       return `rgba(0, 0, 0, ${opacity})`;
//     }
//   };

//   return (
//     <Box sx={{ overflow: "hidden" }}>
//       {/* Animated background */}
//       <ParticlesBackground />

//       {/* Header */}
//       <AppBar
//         position="fixed"
//         color="transparent"
//         elevation={0}
//         sx={{
//           backdropFilter: scrolled ? "blur(10px)" : "none",
//           backgroundColor: scrolled ? safeAlpha(bgPaper, 0.8) : "transparent",
//           transition: "all 0.3s ease",
//           boxShadow: scrolled ? theme?.shadows?.[3] : "none",
//         }}
//       >
//         <Toolbar>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Box
//               component={motion.div}
//               whileHover={{ rotate: [0, -10, 10, -10, 0] }}
//               transition={{ duration: 0.5 }}
//             >
//               <Build sx={{ mr: 1, color: primaryColor }} />
//             </Box>
//             <Typography
//               variant="h6"
//               component={motion.div}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5 }}
//               sx={{
//                 fontWeight: "bold",
//                 background: "linear-gradient(90deg, #3a36db 0%, #00c6b6 100%)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}
//             >
//               GarageERP Pro
//             </Typography>
//           </Box>

//           {isMobile ? (
//             <IconButton
//               size="large"
//               edge="end"
//               color="inherit"
//               aria-label="menu"
//               sx={{ ml: "auto" }}
//               onClick={() => setDrawerOpen(true)}
//             >
//               <MenuIcon />
//             </IconButton>
//           ) : (
//             <Box sx={{ ml: "auto", display: "flex", gap: 2 }}>
//               <Button
//                 color="inherit"
//                 component={RouterLink}
//                 to="/features"
//                 sx={{
//                   fontWeight: 500,
//                   "&:hover": {
//                     background: safeAlpha(primaryColor, 0.1),
//                   },
//                 }}
//               >
//                 Features
//               </Button>
//               <Button
//                 color="inherit"
//                 component={RouterLink}
//                 to="/pricing"
//                 sx={{
//                   fontWeight: 500,
//                   "&:hover": {
//                     background: safeAlpha(primaryColor, 0.1),
//                   },
//                 }}
//               >
//                 Pricing
//               </Button>
//               <Button
//                 color="inherit"
//                 component={RouterLink}
//                 to="/about"
//                 sx={{
//                   fontWeight: 500,
//                   "&:hover": {
//                     background: safeAlpha(primaryColor, 0.1),
//                   },
//                 }}
//               >
//                 About
//               </Button>
//               <Button
//                 color="inherit"
//                 component={RouterLink}
//                 to="/contact"
//                 sx={{
//                   fontWeight: 500,
//                   "&:hover": {
//                     background: safeAlpha(primaryColor, 0.1),
//                   },
//                 }}
//               >
//                 Contact
//               </Button>
//               <Button
//                 color="primary"
//                 variant="outlined"
//                 component={RouterLink}
//                 to="/login"
//                 sx={{
//                   borderWidth: 2,
//                   "&:hover": {
//                     borderWidth: 2,
//                   },
//                 }}
//               >
//                 Login
//               </Button>
//               <Button
//                 color="primary"
//                 variant="contained"
//                 component={RouterLink}
//                 to="/tenant/register"
//                 sx={{
//                   background:
//                     "linear-gradient(90deg, #3a36db 0%, #00c6b6 100%)",
//                   boxShadow: "0 4px 15px rgba(58, 54, 219, 0.3)",
//                   "&:hover": {
//                     background:
//                       "linear-gradient(90deg, #2a26cb 0%, #00a99b 100%)",
//                   },
//                 }}
//               >
//                 Get Started
//               </Button>
//             </Box>
//           )}
//         </Toolbar>
//       </AppBar>

//       {/* Mobile drawer */}
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         PaperProps={{
//           sx: {
//             width: "80%",
//             maxWidth: 300,
//             background:
//               "linear-gradient(135deg, rgba(58, 54, 219, 0.95) 0%, rgba(0, 198, 182, 0.95) 100%)",
//             color: "white",
//             backdropFilter: "blur(10px)",
//           },
//         }}
//       >
//         <Box
//           sx={{
//             p: 2,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Typography variant="h6" fontWeight="bold">
//             Menu
//           </Typography>
//           <IconButton color="inherit" onClick={() => setDrawerOpen(false)}>
//             <Close />
//           </IconButton>
//         </Box>
//         <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />
//         <List>
//           {["Features", "Pricing", "About", "Contact"].map((text) => (
//             <ListItem
//               button
//               key={text}
//               component={RouterLink}
//               to={`/${text.toLowerCase()}`}
//               onClick={() => setDrawerOpen(false)}
//             >
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//         <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />
//         <Box sx={{ p: 2 }}>
//           <Button
//             fullWidth
//             variant="contained"
//             color="secondary"
//             component={RouterLink}
//             to="/login"
//             sx={{ mb: 2, color: "#3a36db", bgcolor: "white" }}
//           >
//             Login
//           </Button>
//           <Button
//             fullWidth
//             variant="outlined"
//             color="inherit"
//             component={RouterLink}
//             to="/tenant/register"
//             sx={{ borderColor: "white" }}
//           >
//             Get Started
//           </Button>
//         </Box>
//       </Drawer>

//       {/* Hero Section */}
//       <Box
//         sx={{
//           position: "relative",
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           pt: { xs: 8, md: 0 },
//           overflow: "hidden",
//         }}
//       >
//         <FloatingElements count={8} />

//         <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
//           <Grid
//             container
//             spacing={4}
//             alignItems="center"
//             component={motion.div}
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <Grid item xs={12} md={6}>
//               <motion.div variants={itemVariants}>
//                 <GradientText
//                   variant="h1"
//                   component="h1"
//                   gradient="primary-secondary"
//                   gutterBottom
//                   sx={{
//                     fontWeight: 800,
//                     fontSize: { xs: "2.5rem", md: "3.5rem" },
//                   }}
//                 >
//                   Revolutionize Your Garage Business
//                 </GradientText>
//               </motion.div>

//               <motion.div variants={itemVariants}>
//                 <Typography
//                   variant="h5"
//                   paragraph
//                   sx={{
//                     color: theme?.palette?.text?.secondary,
//                     mb: 4,
//                     maxWidth: 600,
//                   }}
//                 >
//                   The ultimate SaaS solution for garage management, vehicle
//                   servicing, and customer relations. Boost efficiency and grow
//                   your business.
//                 </Typography>
//               </motion.div>

//               <Box
//                 sx={{
//                   mt: 4,
//                   display: "flex",
//                   flexWrap: { xs: "wrap", sm: "nowrap" },
//                   gap: 2,
//                 }}
//               >
//                 <motion.div variants={itemVariants}>
//                   <Button
//                     variant="contained"
//                     size="large"
//                     component={RouterLink}
//                     to="/tenant/register"
//                     sx={{
//                       px: 4,
//                       py: 1.5,
//                       background:
//                         "linear-gradient(90deg, #3a36db 0%, #00c6b6 100%)",
//                       boxShadow: "0 10px 20px rgba(58, 54, 219, 0.3)",
//                       position: "relative",
//                       overflow: "hidden",
//                       "&::after": {
//                         content: '""',
//                         position: "absolute",
//                         top: 0,
//                         left: "-100%",
//                         width: "100%",
//                         height: "100%",
//                         background:
//                           "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)",
//                         transition: "all 0.6s ease",
//                       },
//                       "&:hover::after": {
//                         left: "100%",
//                       },
//                     }}
//                   >
//                     Start Free Trial
//                   </Button>
//                 </motion.div>

//                 <motion.div variants={itemVariants}>
//                   <Button
//                     variant="outlined"
//                     size="large"
//                     startIcon={<PlayArrow />}
//                     sx={{
//                       px: 4,
//                       py: 1.5,
//                       borderWidth: 2,
//                       borderColor: primaryColor,
//                       "&:hover": {
//                         borderWidth: 2,
//                         borderColor: theme?.palette?.primary?.dark || "#2a26cb",
//                       },
//                     }}
//                   >
//                     Watch Demo
//                   </Button>
//                 </motion.div>
//               </Box>

//               <Box
//                 sx={{
//                   mt: 6,
//                   display: "flex",
//                   alignItems: "center",
//                   flexWrap: "wrap",
//                   gap: 3,
//                 }}
//                 component={motion.div}
//                 variants={fadeInVariants}
//               >
//                 <Typography variant="subtitle2" color="text.secondary">
//                   Trusted by 500+ businesses
//                 </Typography>

//                 <Box sx={{ display: "flex", gap: 3 }}>
//                   {["Company 1", "Company 2", "Company 3"].map(
//                     (company, index) => (
//                       <Box
//                         key={index}
//                         sx={{
//                           opacity: 0.7,
//                           filter: "grayscale(1)",
//                           transition: "all 0.3s ease",
//                           "&:hover": {
//                             opacity: 1,
//                             filter: "grayscale(0)",
//                           },
//                         }}
//                       >
//                         <Typography variant="body2" fontWeight="bold">
//                           {company}
//                         </Typography>
//                       </Box>
//                     )
//                   )}
//                 </Box>
//               </Box>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.8, delay: 0.5 }}
//               >
//                 <Box
//                   sx={{
//                     position: "relative",
//                     "&::before": {
//                       content: '""',
//                       position: "absolute",
//                       top: -20,
//                       left: -20,
//                       right: -20,
//                       bottom: -20,
//                       background:
//                         "radial-gradient(circle, rgba(58, 54, 219, 0.1) 0%, rgba(0, 198, 182, 0.05) 50%, rgba(255, 255, 255, 0) 70%)",
//                       borderRadius: "50%",
//                       zIndex: -1,
//                     },
//                   }}
//                 >
//                   <GlassCard
//                     sx={{
//                       overflow: "hidden",
//                       boxShadow: "0 20px 80px rgba(58, 54, 219, 0.2)",
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       src="/placeholder.svg?height=500&width=700"
//                       alt="Garage Management Dashboard"
//                       sx={{
//                         width: "100%",
//                         height: "auto",
//                         display: "block",
//                         transform: "scale(1.02)",
//                       }}
//                     />
//                   </GlassCard>

//                   {/* Floating elements around the dashboard */}
//                   <Box
//                     component={FloatingElement}
//                     sx={{
//                       position: "absolute",
//                       top: "10%",
//                       right: "-5%",
//                       zIndex: 2,
//                     }}
//                     delay={0.2}
//                     y={15}
//                   >
//                     <GlassCard
//                       sx={{
//                         p: 2,
//                         width: { xs: 120, md: 150 },
//                         height: { xs: 120, md: 150 },
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         textAlign: "center",
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           bgcolor: safeAlpha(primaryColor, 0.1),
//                           color: primaryColor,
//                           borderRadius: "50%",
//                           p: 1,
//                           mb: 1,
//                         }}
//                       >
//                         <Speed />
//                       </Box>
//                       <Typography variant="subtitle2" fontWeight="bold">
//                         Real-time Updates
//                       </Typography>
//                     </GlassCard>
//                   </Box>

//                   <Box
//                     component={FloatingElement}
//                     sx={{
//                       position: "absolute",
//                       bottom: "5%",
//                       left: "-10%",
//                       zIndex: 2,
//                     }}
//                     delay={0.4}
//                     y={10}
//                   >
//                     <GlassCard
//                       sx={{
//                         p: 2,
//                         width: { xs: 120, md: 150 },
//                         height: { xs: 120, md: 150 },
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         textAlign: "center",
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           bgcolor: safeAlpha(secondaryColor, 0.1),
//                           color: secondaryColor,
//                           borderRadius: "50%",
//                           p: 1,
//                           mb: 1,
//                         }}
//                       >
//                         <BarChart />
//                       </Box>
//                       <Typography variant="subtitle2" fontWeight="bold">
//                         Analytics Dashboard
//                       </Typography>
//                     </GlassCard>
//                   </Box>
//                 </Box>
//               </motion.div>
//             </Grid>
//           </Grid>
//         </Container>

//         {/* Scroll down indicator */}
//         <Box
//           component={motion.div}
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.5, duration: 0.5 }}
//           sx={{
//             position: "absolute",
//             bottom: 40,
//             left: "50%",
//             transform: "translateX(-50%)",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//             Scroll to explore
//           </Typography>
//           <Box
//             component={motion.div}
//             animate={{ y: [0, 10, 0] }}
//             transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
//           >
//             <KeyboardArrowDown />
//           </Box>
//         </Box>
//       </Box>

//       {/* Stats Section */}
//       <Box sx={{ py: 10, bgcolor: safeAlpha(primaryColor, 0.03) }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={4} justifyContent="center">
//             {stats.map((stat, index) => (
//               <Grid item xs={6} md={3} key={index}>
//                 <Box
//                   component={motion.div}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   sx={{
//                     textAlign: "center",
//                     p: 3,
//                   }}
//                 >
//                   <AnimatedCounter
//                     value={stat.value}
//                     prefix=""
//                     suffix={stat.suffix}
//                     variant="h3"
//                     color="primary.main"
//                     fontWeight="bold"
//                   />
//                   <Typography variant="subtitle1" color="text.secondary">
//                     {stat.label}
//                   </Typography>
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Features Section */}
//       <Box sx={{ py: 10 }}>
//         <Container maxWidth="lg">
//           <Box sx={{ textAlign: "center", mb: 8 }}>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//             >
//               <GradientText
//                 variant="h2"
//                 component="h2"
//                 gradient="primary-secondary"
//                 gutterBottom
//                 sx={{ fontWeight: "bold" }}
//               >
//                 Powerful Features for Your Garage
//               </GradientText>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Typography
//                 variant="h6"
//                 color="text.secondary"
//                 sx={{ maxWidth: 700, mx: "auto" }}
//               >
//                 Our comprehensive solution helps you manage every aspect of your
//                 garage business efficiently.
//               </Typography>
//             </motion.div>
//           </Box>

//           <Grid container spacing={4}>
//             {features.map((feature, index) => (
//               <Grid item xs={12} md={4} key={index}>
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                 >
//                   <GlassCard
//                     sx={{
//                       height: "100%",
//                       transition: "all 0.3s ease",
//                       "&:hover": {
//                         transform: "translateY(-10px)",
//                         boxShadow: `0 20px 40px ${safeAlpha(
//                           feature.color,
//                           0.2
//                         )}`,
//                       },
//                     }}
//                   >
//                     <CardContent sx={{ p: 4 }}>
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", mb: 3 }}
//                       >
//                         <Box
//                           sx={{
//                             width: 60,
//                             height: 60,
//                             borderRadius: 2,
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             bgcolor: safeAlpha(feature.color, 0.1),
//                             color: feature.color,
//                             mr: 2,
//                             overflow: "hidden",
//                           }}
//                         >
//                           {feature.animation ? (
//                             <Lottie
//                               animationData={feature.animation}
//                               style={{ width: 40, height: 40 }}
//                             />
//                           ) : (
//                             feature.icon
//                           )}
//                         </Box>
//                         <Typography
//                           variant="h5"
//                           component="h3"
//                           fontWeight="bold"
//                         >
//                           {feature.title}
//                         </Typography>
//                       </Box>

//                       <Typography
//                         variant="body1"
//                         paragraph
//                         color="text.secondary"
//                       >
//                         {feature.description}
//                       </Typography>

//                       <List>
//                         {feature.items.map((item, itemIndex) => (
//                           <ListItem
//                             disableGutters
//                             key={itemIndex}
//                             sx={{
//                               transition: "transform 0.2s ease",
//                               "&:hover": {
//                                 transform: "translateX(5px)",
//                               },
//                             }}
//                           >
//                             <ListItemIcon sx={{ minWidth: 36 }}>
//                               <CheckCircle
//                                 sx={{ color: feature.color }}
//                                 fontSize="small"
//                               />
//                             </ListItemIcon>
//                             <ListItemText primary={item} />
//                           </ListItem>
//                         ))}
//                       </List>

//                       <Box sx={{ mt: 3 }}>
//                         <Button
//                           endIcon={<ArrowForward />}
//                           sx={{
//                             color: feature.color,
//                             "&:hover": {
//                               bgcolor: safeAlpha(feature.color, 0.05),
//                             },
//                           }}
//                         >
//                           Learn more
//                         </Button>
//                       </Box>
//                     </CardContent>
//                   </GlassCard>
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Testimonials Section */}
//       <Box
//         sx={{
//           py: 10,
//           bgcolor: safeAlpha(primaryColor, 0.03),
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         <FloatingElements count={5} />

//         <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
//           <Box sx={{ textAlign: "center", mb: 8 }}>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//             >
//               <GradientText
//                 variant="h2"
//                 component="h2"
//                 gradient="primary-secondary"
//                 gutterBottom
//                 sx={{ fontWeight: "bold" }}
//               >
//                 What Our Customers Say
//               </GradientText>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Typography
//                 variant="h6"
//                 color="text.secondary"
//                 sx={{ maxWidth: 700, mx: "auto" }}
//               >
//                 Join hundreds of satisfied garage owners who have transformed
//                 their business with our software.
//               </Typography>
//             </motion.div>
//           </Box>

//           <Grid container spacing={4}>
//             {testimonials.map((testimonial, index) => (
//               <Grid item xs={12} md={4} key={index}>
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                 >
//                   <GlassCard
//                     sx={{
//                       height: "100%",
//                       p: 4,
//                       position: "relative",
//                       "&::before": {
//                         content: '"""',
//                         position: "absolute",
//                         top: 20,
//                         left: 20,
//                         fontSize: "4rem",
//                         lineHeight: 1,
//                         color: safeAlpha(primaryColor, 0.1),
//                         fontFamily: "serif",
//                       },
//                     }}
//                   >
//                     <Typography
//                       variant="body1"
//                       paragraph
//                       sx={{
//                         mb: 4,
//                         position: "relative",
//                         zIndex: 1,
//                       }}
//                     >
//                       {testimonial.content}
//                     </Typography>

//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <Avatar
//                         src={testimonial.avatar}
//                         alt={testimonial.name}
//                         sx={{
//                           width: 60,
//                           height: 60,
//                           mr: 2,
//                           border: `2px solid ${primaryColor}`,
//                         }}
//                       />
//                       <Box>
//                         <Typography variant="subtitle1" fontWeight="bold">
//                           {testimonial.name}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {testimonial.role}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </GlassCard>
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Pricing Section */}
//       <Box sx={{ py: 10 }}>
//         <Container maxWidth="lg">
//           <Box sx={{ textAlign: "center", mb: 8 }}>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//             >
//               <GradientText
//                 variant="h2"
//                 component="h2"
//                 gradient="primary-secondary"
//                 gutterBottom
//                 sx={{ fontWeight: "bold" }}
//               >
//                 Simple, Transparent Pricing
//               </GradientText>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Typography
//                 variant="h6"
//                 color="text.secondary"
//                 sx={{ maxWidth: 700, mx: "auto" }}
//               >
//                 Choose the plan that works best for your business needs. No
//                 hidden fees.
//               </Typography>
//             </motion.div>
//           </Box>

//           <Grid container spacing={4} justifyContent="center">
//             <Grid item xs={12} md={4}>
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <GlassCard sx={{ height: "100%", position: "relative" }}>
//                   <CardContent sx={{ p: 4 }}>
//                     <Typography
//                       variant="h5"
//                       component="h3"
//                       gutterBottom
//                       fontWeight="bold"
//                     >
//                       Monthly
//                     </Typography>
//                     <Typography
//                       variant="h3"
//                       component="div"
//                       sx={{
//                         my: 2,
//                         fontWeight: "bold",
//                         color: primaryColor,
//                       }}
//                     >
//                       $49.99
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       gutterBottom
//                     >
//                       per month
//                     </Typography>

//                     <Divider sx={{ my: 3 }} />

//                     <List>
//                       {[
//                         "All core features",
//                         "Up to 5 users",
//                         "Email support",
//                       ].map((feature, index) => (
//                         <ListItem disableGutters key={index}>
//                           <ListItemIcon sx={{ minWidth: 36 }}>
//                             <CheckCircle color="success" fontSize="small" />
//                           </ListItemIcon>
//                           <ListItemText primary={feature} />
//                         </ListItem>
//                       ))}
//                     </List>

//                     <Box sx={{ mt: 4 }}>
//                       <Button
//                         variant="outlined"
//                         fullWidth
//                         size="large"
//                         component={RouterLink}
//                         to="/tenant/register"
//                         sx={{
//                           borderWidth: 2,
//                           borderColor: primaryColor,
//                           "&:hover": {
//                             borderWidth: 2,
//                             borderColor:
//                               theme?.palette?.primary?.dark || "#2a26cb",
//                           },
//                         }}
//                       >
//                         Get Started
//                       </Button>
//                     </Box>
//                   </CardContent>
//                 </GlassCard>
//               </motion.div>
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//               >
//                 <GlassCard
//                   sx={{
//                     height: "100%",
//                     position: "relative",
//                     borderColor: primaryColor,
//                     borderWidth: 2,
//                     transform: "scale(1.05)",
//                     zIndex: 2,
//                     boxShadow: `0 20px 40px ${safeAlpha(primaryColor, 0.2)}`,
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       top: 0,
//                       right: 0,
//                       backgroundColor: secondaryColor,
//                       color: "white",
//                       px: 2,
//                       py: 0.5,
//                       borderBottomLeftRadius: 8,
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Best Value
//                   </Box>
//                   <CardContent sx={{ p: 4 }}>
//                     <Typography
//                       variant="h5"
//                       component="h3"
//                       gutterBottom
//                       fontWeight="bold"
//                     >
//                       Yearly
//                     </Typography>
//                     <Typography
//                       variant="h3"
//                       component="div"
//                       sx={{
//                         my: 2,
//                         fontWeight: "bold",
//                         background:
//                           "linear-gradient(90deg, #3a36db 0%, #00c6b6 100%)",
//                         WebkitBackgroundClip: "text",
//                         WebkitTextFillColor: "transparent",
//                       }}
//                     >
//                       $499.99
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       gutterBottom
//                     >
//                       $41.67/month (Save 15%)
//                     </Typography>

//                     <Divider sx={{ my: 3 }} />

//                     <List>
//                       {[
//                         "All core features",
//                         "Unlimited users",
//                         "24/7 phone & email support",
//                         "Advanced reporting",
//                       ].map((feature, index) => (
//                         <ListItem disableGutters key={index}>
//                           <ListItemIcon sx={{ minWidth: 36 }}>
//                             <CheckCircle color="success" fontSize="small" />
//                           </ListItemIcon>
//                           <ListItemText primary={feature} />
//                         </ListItem>
//                       ))}
//                     </List>

//                     <Box sx={{ mt: 4 }}>
//                       <Button
//                         variant="contained"
//                         fullWidth
//                         size="large"
//                         component={RouterLink}
//                         to="/tenant/register"
//                         sx={{
//                           background:
//                             "linear-gradient(90deg, #3a36db 0%, #00c6b6 100%)",
//                           boxShadow: "0 10px 20px rgba(58, 54, 219, 0.3)",
//                           position: "relative",
//                           overflow: "hidden",
//                           "&::after": {
//                             content: '""',
//                             position: "absolute",
//                             top: 0,
//                             left: "-100%",
//                             width: "100%",
//                             height: "100%",
//                             background:
//                               "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)",
//                             transition: "all 0.6s ease",
//                           },
//                           "&:hover::after": {
//                             left: "100%",
//                           },
//                         }}
//                       >
//                         Get Started
//                       </Button>
//                     </Box>
//                   </CardContent>
//                 </GlassCard>
//               </motion.div>
//             </Grid>
//           </Grid>

//           <Box
//             sx={{
//               mt: 8,
//               textAlign: "center",
//               maxWidth: 700,
//               mx: "auto",
//             }}
//             component={motion.div}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <Typography variant="h5" gutterBottom fontWeight="bold">
//               Need a custom plan?
//             </Typography>
//             <Typography variant="body1" color="text.secondary" paragraph>
//               Contact our sales team for a customized solution that fits your
//               specific business needs.
//             </Typography>
//             <Button
//               variant="outlined"
//               size="large"
//               component={RouterLink}
//               to="/contact"
//               sx={{
//                 borderWidth: 2,
//                 px: 4,
//                 py: 1.5,
//               }}
//             >
//               Contact Sales
//             </Button>
//           </Box>
//         </Container>
//       </Box>

//       {/* CTA Section */}
//       <Box
//         sx={{
//           py: 10,
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         <AnimatedGradientBackground intensity={0.3} />

//         <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
//           <GlassCard
//             sx={{
//               p: 6,
//               textAlign: "center",
//               boxShadow: "0 20px 80px rgba(58, 54, 219, 0.2)",
//             }}
//           >
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//             >
//               <GradientText
//                 variant="h3"
//                 component="h2"
//                 gradient="primary-secondary"
//                 gutterBottom
//                 sx={{ fontWeight: "bold" }}
//               >
//                 Ready to Transform Your Garage Business?
//               </GradientText>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Typography
//                 variant="h6"
//                 color="text.secondary"
//                 paragraph
//                 sx={{ mb: 4, maxWidth: 700, mx: "auto" }}
//               >
//                 Join hundreds of successful garage owners who have boosted their
//                 efficiency and grown their business with our software.
//               </Typography>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//             >
//               <Button
//                 variant="contained"
//                 size="large"
//                 component={RouterLink}
//                 to="/tenant/register"
//                 sx={{
//                   px: 6,
//                   py: 2,
//                   fontSize: "1.1rem",
//                   background:
//                     "linear-gradient(90deg, #3a36db 0%, #00c6b6 100%)",
//                   boxShadow: "0 10px 20px rgba(58, 54, 219, 0.3)",
//                   position: "relative",
//                   overflow: "hidden",
//                   "&::after": {
//                     content: '""',
//                     position: "absolute",
//                     top: 0,
//                     left: "-100%",
//                     width: "100%",
//                     height: "100%",
//                     background:
//                       "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)",
//                     transition: "all 0.6s ease",
//                   },
//                   "&:hover::after": {
//                     left: "100%",
//                   },
//                 }}
//               >
//                 Start Your Free Trial
//               </Button>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.5 }}
//             >
//               <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
//                 No credit card required. 14-day free trial.
//               </Typography>
//             </motion.div>
//           </GlassCard>
//         </Container>
//       </Box>

//       {/* Footer */}
//       <Box sx={{ bgcolor: bgPaper, py: 6 }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={4}>
//               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                 <Build sx={{ mr: 1, color: primaryColor }} />
//                 <Typography
//                   variant="h6"
//                   component="div"
//                   sx={{
//                     fontWeight: "bold",
//                     background:
//                       "linear-gradient(90deg, #3a36db 0%, #00c6b6 100%)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                   }}
//                 >
//                   GarageERP Pro
//                 </Typography>
//               </Box>
//               <Typography variant="body2" color="text.secondary" paragraph>
//                 The ultimate SaaS solution for garage management, vehicle
//                 servicing, and customer relations.
//               </Typography>
//             </Grid>

//             <Grid item xs={6} md={2}>
//               <Typography
//                 variant="subtitle1"
//                 gutterBottom
//                 sx={{ fontWeight: "bold" }}
//               >
//                 Product
//               </Typography>
//               <List dense disablePadding>
//                 <ListItem disableGutters>
//                   <Button color="inherit" component={RouterLink} to="/features">
//                     Features
//                   </Button>
//                 </ListItem>
//                 <ListItem disableGutters>
//                   <Button color="inherit" component={RouterLink} to="/pricing">
//                     Pricing
//                   </Button>
//                 </ListItem>
//                 <ListItem disableGutters>
//                   <Button color="inherit" component={RouterLink} to="/demo">
//                     Demo
//                   </Button>
//                 </ListItem>
//               </List>
//             </Grid>

//             <Grid item xs={6} md={2}>
//               <Typography
//                 variant="subtitle1"
//                 gutterBottom
//                 sx={{ fontWeight: "bold" }}
//               >
//                 Company
//               </Typography>
//               <List dense disablePadding>
//                 <ListItem disableGutters>
//                   <Button color="inherit" component={RouterLink} to="/about">
//                     About
//                   </Button>
//                 </ListItem>
//                 <ListItem disableGutters>
//                   <Button color="inherit" component={RouterLink} to="/contact">
//                     Contact
//                   </Button>
//                 </ListItem>
//                 <ListItem disableGutters>
//                   <Button color="inherit" component={RouterLink} to="/careers">
//                     Careers
//                   </Button>
//                 </ListItem>
//               </List>
//             </Grid>

//             <Grid item xs={6} md={2}>
//               <Typography
//                 variant="subtitle1"
//                 gutterBottom
//                 sx={{ fontWeight: "bold" }}
//               >
//                 Legal
//               </Typography>
//               <List dense disablePadding>
//                 <ListItem disableGutters>
//                   <Button color="inherit" component={RouterLink} to="/terms">
//                     Terms
//                   </Button>
//                 </ListItem>
//                 <ListItem disableGutters>
//                   <Button color="inherit" component={RouterLink} to="/privacy">
//                     Privacy
//                   </Button>
//                 </ListItem>
//               </List>
//             </Grid>

//             <Grid item xs={6} md={2}>
//               <Typography
//                 variant="subtitle1"
//                 gutterBottom
//                 sx={{ fontWeight: "bold" }}
//               >
//                 Support
//               </Typography>
//               <List dense disablePadding>
//                 <ListItem disableGutters>
//                   <Button color="inherit" component={RouterLink} to="/help">
//                     Help Center
//                   </Button>
//                 </ListItem>
//                 <ListItem disableGutters>
//                   <Button color="inherit" component={RouterLink} to="/docs">
//                     Documentation
//                   </Button>
//                 </ListItem>
//               </List>
//             </Grid>
//           </Grid>

//           <Divider sx={{ my: 4 }} />

//           <Typography variant="body2" color="text.secondary" align="center">
//             © {new Date().getFullYear()} GarageERP Pro. All rights reserved.
//           </Typography>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default LandingPage;
