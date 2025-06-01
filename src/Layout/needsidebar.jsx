// "use client";

// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import { NavLink, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import Cookies from "js-cookie";
// import "./Layout.css";

// // Material UI Components
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";

// // Material UI Icons
// import {
//   // Already in use
//   ExpandLess,
//   Logout,
//   Receipt,
//   CurrencyExchange,
//   ShoppingBag,
//   Recycling,
//   Backup,
//   SettingsBackupRestore,

//   // Additional Material UI icons
//   Dashboard,
//   DirectionsCar,
//   Description,
//   RequestQuote,
//   ReceiptLong,
//   Paid,
//   MonetizationOn,
//   Inventory,
//   Inventory2,
//   Category,
//   LocalShipping,
//   ShoppingCart,
//   Storefront,
//   BarChart,
//   Assessment,
//   Warning,
//   QrCode,
//   QrCodeScanner,
//   LocalOffer,
//   Loyalty,
//   Sell,
//   Widgets,
//   Difference,
//   AddShoppingCart,
//   RemoveShoppingCart,
//   PointOfSale,
//   AccountBalance,
//   AttachMoney,
//   MoneyOff,
//   Payments,
//   AccountBalanceWallet,
//   Savings,
//   People,
//   Person,
//   PersonAdd,
//   Business,
//   Store,
//   Work,
//   EventNote,
//   CalendarToday,
//   AccessTime,
//   Group,
//   SupervisorAccount,
//   HolidayVillage,
//   Schedule,
//   DataUsage,
//   PieChart,
//   Storage,
//   BackupTable,
//   RestorePage,
//   DeleteForever,
//   Assignment,
//   AssignmentTurnedIn,
//   CompareArrows,
//   Add,
//   List,
//   Tune,
//   Handyman,
//   Engineering,
//   Gavel,
//   Healing,
//   MedicalServices,
//   LocalHospital,
//   Medication,
// } from "@mui/icons-material";

// // React Icons (FaIcons)
// import {
//   // Already in use
//   FaCarAlt,
//   FaUsers,
//   FaDatabase,
//   FaPlus,
//   FaThLarge,
//   FaHospitalUser,

//   // Additional FaIcons
//   FaHome,
//   FaFileInvoice,
//   FaFileInvoiceDollar,
//   FaMoneyBillWave,
//   FaProjectDiagram,
//   FaBoxes,
//   FaBox,
//   FaBoxOpen,
//   FaWarehouse,
//   FaUserTie,
//   FaUserPlus,
//   FaBuilding,
//   FaStore,
//   FaUserCog,
//   FaCalendarAlt,
//   FaCalendarCheck,
//   FaCalendarDay,
//   FaMoneyBill,
//   FaMoneyBillAlt,
//   FaReceipt,
//   FaFileAlt,
//   FaClipboardList,
//   FaClipboardCheck,
//   FaChartBar,
//   FaChartLine,
//   FaChartPie,
//   FaServer,
//   FaTrash,
//   FaTrashRestore,
//   FaTruck,
//   FaTruckLoading,
//   FaShoppingCart,
//   FaTag,
//   FaTags,
//   FaBarcode,
//   FaQrcode,
//   FaExclamationTriangle,
//   FaUserFriends,
//   FaIdCard,
//   FaIdBadge,
//   FaBusinessTime,
//   FaClock,
//   FaMoneyCheckAlt,
//   FaFileExport,
//   FaFileImport,
//   FaSync,
//   FaTools,
//   FaWrench,
//   FaHammer,
//   FaCar,
//   FaClipboard,
//   FaListAlt,
//   FaHandshake,
//   FaRunning,
//   FaCheckCircle,
// } from "react-icons/fa";

// // React Icons (HiOutline)
// import {
//   // Already in use
//   HiOutlineCube,
//   HiOutlineCurrencyDollar,
//   HiOutlineHome,
//   HiOutlineUserAdd,
//   HiOutlineUserGroup,

//   // Additional HiOutline icons
//   HiOutlineDocumentText,
//   HiOutlineDocumentDuplicate,
//   HiOutlineReceiptRefund,
//   HiOutlineShoppingCart,
//   HiOutlineShoppingBag,
//   HiOutlineCash,
//   HiOutlineClipboardCheck,
//   HiOutlineClipboardList,
//   HiOutlineDatabase,
//   HiOutlineServer,
//   HiOutlineCollection,
//   HiOutlineViewGrid,
//   HiOutlineOfficeBuilding,
//   HiOutlineLibrary,
//   HiOutlineUser,
//   HiOutlineUsers,
//   HiOutlineUserCircle,
//   HiOutlineCalendar,
//   HiOutlineClock,
//   HiOutlineChartBar,
//   HiOutlineChartPie,
//   HiOutlineChartSquareBar,
//   HiOutlineTrendingUp,
//   HiOutlineTrendingDown,
//   HiOutlineDocumentReport,
//   HiOutlineArchive,
//   HiOutlineTrash,
//   HiOutlineExclamation,
//   HiOutlineTag,
//   HiOutlineTruck,
//   HiOutlineQrcode,
//   HiOutlineIdentification,
//   HiOutlineBadgeCheck,
//   HiOutlineSupport,
//   HiOutlineCog,
//   HiOutlineAdjustments,
//   HiOutlineRefresh,
//   HiOutlineShieldCheck,
//   HiOutlineSwitchHorizontal,
// } from "react-icons/hi";

// import LeftHoberSidebar from "../components/Appbar/LeftHoberSidebar";

// const Sidebar = ({ toggle }) => {
//   const [expanded, setExpanded] = useState(false);
//   const [nestedExpanded, setNestedExpanded] = useState({});

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   const handleNestedChange = (panel) => (event, isExpanded) => {
//     event.stopPropagation();
//     setNestedExpanded((prev) => ({
//       ...prev,
//       [panel]: isExpanded ? panel : false,
//     }));
//   };

//   const navigate = useNavigate();
//   const handleLogout = () => {
//     Cookies.remove("tas-auth");
//     navigate("/");
//   };

//   return (
//     <aside className="flex ">
//       <div
//         className={`${
//           toggle
//             ? `fixed overflow-y-scroll overflow-x-hidden drawwerLeftSide  h-screen text-lg font-semibold  bg-[#2C3136] text-white`
//             : `fixed overflow-y-scroll overflow-x-hidden sideBarActive h-screen text-lg font-semibold  bg-[#2C3136] text-white`
//         }`}
//       >
//         <div className=" ">
//           <NavLink to="/dashboard" className="z-10  flex p-4 items-center">
//             <HiOutlineHome size={35} />
//             <h3 className="text-xl font-semibold ml-2">Dashboard</h3>
//           </NavLink>
//         </div>

//         {/* Vehicle Job Card */}
//         <Accordion
//           sx={{ paddingBottom: "10px" }}
//           className="dashboardAccordion "
//           expanded={expanded === "panel1"}
//           onChange={handleChange("panel1")}
//         >
//           <AccordionSummary
//             sx={{ marginBottom: "-10px" }}
//             expandIcon={<ExpandLess className="accordionExpandIcon" />}
//             aria-controls="panel1bh-content"
//             id="panel1bh-header"
//           >
//             <Typography>
//               <div className="flex items-center justify-center ">
//                 <DirectionsCar />
//                 <span className="ml-2">Vehicle Job Card</span>
//               </div>
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <Assignment className="mr-2" />
//                 <NavLink to="/dashboard/addjob"> job card Add</NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <FaClipboardList className="mr-2" />
//                 <NavLink to="/dashboard/jobcard-list">Job Card List</NavLink>
//               </span>
//             </Typography>
//           </AccordionDetails>
//         </Accordion>

//         {/* Quotation */}
//         <Accordion
//           sx={{ paddingBottom: "10px" }}
//           className="dashboardAccordion"
//           expanded={expanded === "panel2"}
//           onChange={handleChange("panel2")}
//         >
//           <AccordionSummary
//             sx={{ marginBottom: "-10px" }}
//             expandIcon={<ExpandLess className="accordionExpandIcon" />}
//             aria-controls="panel2a-content"
//             id="panel2a-header"
//             className="dashboardAccordionSummary"
//           >
//             <Typography>
//               <div className="flex items-center justify-center">
//                 <RequestQuote />
//                 <span className="ml-2">Quotation</span>
//               </div>
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <HiOutlineDocumentText className="mr-2" />
//                 <NavLink to="/dashboard/qutation"> Quotation Add </NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <HiOutlineDocumentDuplicate className="mr-2" />
//                 <NavLink to="/dashboard/quotation-list">Quotation List</NavLink>
//               </span>
//             </Typography>
//           </AccordionDetails>
//         </Accordion>

//         {/* Invoice Card */}
//         <Accordion
//           sx={{ paddingBottom: "10px" }}
//           className="dashboardAccordion"
//           expanded={expanded === "panel3"}
//           onChange={handleChange("panel3")}
//         >
//           <AccordionSummary
//             sx={{ marginBottom: "-10px" }}
//             expandIcon={<ExpandLess className="accordionExpandIcon" />}
//             aria-controls="panel3a-content"
//             id="panel3a-header"
//           >
//             <Typography>
//               <div className="flex items-center justify-center">
//                 <Receipt />
//                 <span className="ml-2">Invoice Card</span>
//               </div>
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <FaFileInvoice className="mr-2" />
//                 <NavLink to="/dashboard/invoice"> Invoice Add </NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <FaFileInvoiceDollar className="mr-2" />
//                 <NavLink to="/dashboard/invoice-view">Invoice List</NavLink>
//               </span>
//             </Typography>
//           </AccordionDetails>
//         </Accordion>

//         {/* Money receipt */}
//         <Accordion
//           sx={{ paddingBottom: "10px" }}
//           className="dashboardAccordion"
//           expanded={expanded === "panel4"}
//           onChange={handleChange("panel4")}
//         >
//           <AccordionSummary
//             sx={{ marginBottom: "-10px" }}
//             expandIcon={<ExpandLess className="accordionExpandIcon" />}
//             aria-controls="panel4a-content"
//             id="panel4a-header"
//           >
//             <Typography>
//               <div className="flex items-center justify-center">
//                 <CurrencyExchange />
//                 <span className="ml-2">Money receipt</span>
//               </div>
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <FaMoneyBillWave className="mr-2" />
//                 <NavLink to="/dashboard/money-receive">
//                   Money Receipt Add
//                 </NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <FaMoneyBill className="mr-2" />
//                 <NavLink to="/dashboard/money-receipt-list">
//                   Money Receipt List
//                 </NavLink>
//               </span>
//             </Typography>
//           </AccordionDetails>
//         </Accordion>

//         {/* Projects */}
//         <Accordion
//           sx={{ paddingBottom: "10px" }}
//           className="dashboardAccordion"
//           expanded={expanded === "panel5"}
//           onChange={handleChange("panel5")}
//         >
//           <AccordionSummary
//             sx={{ marginBottom: "-10px" }}
//             expandIcon={<ExpandLess className="accordionExpandIcon" />}
//             aria-controls="panel5a-content"
//             id="panel5a-header"
//           >
//             <Typography className="accordionName">
//               <div className="flex items-center justify-center">
//                 <FaProjectDiagram size={22} />
//                 <span className="ml-2"> Projects</span>
//               </div>
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography className="accordionTypoGrapy">
//               <NavLink to="/dashboard/running-project">
//                 <span className="flex items-center">
//                   <FaRunning size={22} className="mr-2" />
//                   Running Project
//                 </span>
//               </NavLink>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <NavLink to="/dashboard/complete-project">
//                 <span className="flex items-center">
//                   <FaCheckCircle size={22} className="mr-2" />
//                   Complete Project
//                 </span>
//               </NavLink>
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//         <Accordion
//           sx={{ paddingBottom: "10px" }}
//           className="dashboardAccordion"
//           expanded={expanded === "panel17"}
//           onChange={handleChange("panel17")}
//         >
//           <AccordionSummary
//             sx={{ marginBottom: "-10px" }}
//             expandIcon={<ExpandLess className="accordionExpandIcon" />}
//             aria-controls="panel6a-content"
//             id="panel6a-header"
//           >
//             <Typography>
//               <span className="flex items-center justify-center ">
//                 <LocalShipping />
//                 <span className="ml-2"> Suppliers </span>
//               </span>
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <PersonAdd className="mr-2" />
//                 <NavLink to="/dashboard/add-supplier">Add Supplier </NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <FaTruck className="mr-2" />
//                 <NavLink to="/dashboard/supplier-list">Supplier List </NavLink>
//               </div>
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//         <Accordion
//           sx={{ paddingBottom: "10px" }}
//           className="dashboardAccordion"
//           expanded={expanded === "panel18"}
//           onChange={handleChange("panel18")}
//         >
//           <AccordionSummary
//             sx={{ marginBottom: "-10px" }}
//             expandIcon={<ExpandLess className="accordionExpandIcon" />}
//             aria-controls="panel6a-content"
//             id="panel6a-header"
//           >
//             <Typography>
//               <span className="flex items-center justify-center ">
//                 <ShoppingCart />
//                 <span className="ml-2"> Purchase </span>
//               </span>
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <AddShoppingCart className="mr-2" />
//                 <NavLink to="/dashboard/add-purchase">Purchase Add </NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <FaTruck className="mr-2" />
//                 <NavLink to="/dashboard/Purchase List">Purchase List </NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <PointOfSale className="mr-2" />
//                 <NavLink to="/dashboard/purchase-order">
//                   Purchase Order{" "}
//                 </NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <HiOutlineReceiptRefund className="mr-2" />
//                 <NavLink to="/dashboard/purchase-return">
//                   Purchase Return{" "}
//                 </NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <HiOutlineClipboardList className="mr-2" />
//                 <NavLink to="/dashboard/purchase-history">
//                   Purchase History{" "}
//                 </NavLink>
//               </div>
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//         {/* Inventory */}
//         <Accordion
//           sx={{ paddingBottom: "10px" }}
//           className="dashboardAccordion"
//           expanded={expanded === "panel6"}
//           onChange={handleChange("panel6")}
//         >
//           <AccordionSummary
//             sx={{ marginBottom: "-10px" }}
//             expandIcon={<ExpandLess className="accordionExpandIcon" />}
//             aria-controls="panel6a-content"
//             id="panel6a-header"
//           >
//             <Typography>
//               <span className="flex items-center justify-center">
//                 <ShoppingBag />
//                 <span className="ml-2">Inventory</span>
//               </span>
//             </Typography>
//           </AccordionSummary>

//           <AccordionDetails>
//             <div className="accordionTypoGrapy">
//               <div className="flex items-center mb-2">
//                 <Dashboard className="mr-2" />
//                 <NavLink to="/dashboard/inventory-dashboard">Dashboard</NavLink>
//               </div>

//               {/* Product */}
//               <Accordion
//                 sx={{ paddingBottom: "10px" }}
//                 expanded={nestedExpanded["nested-product"] === "nested-product"}
//                 onChange={handleNestedChange("nested-product")}
//                 className="nested-accordion"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <AccordionSummary
//                   sx={{ marginBottom: "-10px" }}
//                   expandIcon={<ExpandLess />}
//                   aria-controls="panel16-content"
//                   id="panel16-header"
//                 >
//                   <Typography className="accordionName">
//                     <div className="flex items-center justify-center">
//                       <Inventory size={22} />
//                       <span className="ml-2">Product</span>
//                     </div>
//                   </Typography>
//                 </AccordionSummary>

//                 <AccordionDetails>
//                   {[
//                     {
//                       icon: <Add />,
//                       text: "Product Add",
//                       link: "/dashboard/add-product",
//                     },
//                     {
//                       icon: <List />,
//                       text: "Product List",
//                       link: "/dashboard/product-list",
//                     },
//                     {
//                       icon: <Category />,
//                       text: "Product Type",
//                       link: "/dashboard/product-type",
//                     },
//                     {
//                       icon: <HiOutlineExclamation />,
//                       text: "Expired Product",
//                       link: "/dashboard/expired-products",
//                     },
//                     {
//                       icon: <FaTags />,
//                       text: "Category",
//                       link: "/dashboard/category",
//                     },

//                     {
//                       icon: <LocalOffer />,
//                       text: "Brand",
//                       link: "/dashboard/brand",
//                     },
//                     {
//                       icon: <Widgets />,
//                       text: "Unit",
//                       link: "/dashboard/unit",
//                     },
//                     {
//                       icon: <Difference />,
//                       text: "Variant Attributes",
//                       link: "/dashboard/variants",
//                     },
//                   ].map((item, idx) => (
//                     <div key={idx} className="flex items-center mb-2">
//                       <span className="mr-2">{item.icon}</span>
//                       <NavLink to={item.link}>{item.text}</NavLink>
//                     </div>
//                   ))}
//                 </AccordionDetails>
//               </Accordion>

//               {/* Supplier */}
//               <Accordion
//                 sx={{ paddingBottom: "10px", marginTop: "10px" }}
//                 expanded={
//                   nestedExpanded["nested-supplier"] === "nested-supplier"
//                 }
//                 onChange={handleNestedChange("nested-supplier")}
//                 className="nested-accordion"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <AccordionSummary
//                   sx={{ marginBottom: "-10px" }}
//                   expandIcon={<ExpandLess />}
//                   aria-controls="panel16-content"
//                   id="panel16-header"
//                 >
//                   <Typography className="accordionName">
//                     <div className="flex items-center justify-center">
//                       <LocalShipping size={22} />
//                       <span className="ml-2">Supplier</span>
//                     </div>
//                   </Typography>
//                 </AccordionSummary>

//                 <AccordionDetails>
//                   {[
//                     {
//                       icon: <PersonAdd />,
//                       text: "Add Supplier ",
//                       link: "/dashboard/add-product",
//                     },
//                     {
//                       icon: <FaTruck />,
//                       text: "Supplier List",
//                       link: "/dashboard/product-list",
//                     },
//                   ].map((item, idx) => (
//                     <div key={idx} className="flex items-center mb-2">
//                       <span className="mr-2">{item.icon}</span>
//                       <NavLink to={item.link}>{item.text}</NavLink>
//                     </div>
//                   ))}
//                 </AccordionDetails>
//               </Accordion>

//               {/* Purchase */}
//               <Accordion
//                 sx={{ paddingBottom: "10px", marginTop: "10px" }}
//                 expanded={
//                   nestedExpanded["nested-purchase"] === "nested-purchase"
//                 }
//                 onChange={handleNestedChange("nested-purchase")}
//                 className="nested-accordion"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <AccordionSummary
//                   sx={{ marginBottom: "-10px" }}
//                   expandIcon={<ExpandLess />}
//                   aria-controls="panel16-content"
//                   id="panel16-header"
//                 >
//                   <Typography className="accordionName">
//                     <div className="flex items-center justify-center">
//                       <ShoppingCart size={22} />
//                       <span className="ml-2">Purchase</span>
//                     </div>
//                   </Typography>
//                 </AccordionSummary>

//                 <AccordionDetails>
//                   {[
//                     {
//                       icon: <AddShoppingCart />,
//                       text: "Purchase Add",
//                       link: "/dashboard/add-purchase",
//                     },
//                     {
//                       icon: <HiOutlineShoppingCart />,
//                       text: "Purchase List",
//                       link: "/dashboard/purchase-list",
//                     },
//                     {
//                       icon: <PointOfSale />,
//                       text: "PUrchase Order ",
//                       link: "/dashboard/purchase-order",
//                     },
//                     {
//                       icon: <HiOutlineReceiptRefund />,
//                       text: "PUrchase Return ",
//                       link: "/dashboard/purchase-return",
//                     },
//                     {
//                       icon: <HiOutlineClipboardList />,
//                       text: "PUrchase History ",
//                       link: "/dashboard/purchase-history",
//                     },
//                   ].map((item, idx) => (
//                     <div key={idx} className="flex items-center mb-2">
//                       <span className="mr-2">{item.icon}</span>
//                       <NavLink to={item.link}>{item.text}</NavLink>
//                     </div>
//                   ))}
//                 </AccordionDetails>
//               </Accordion>

//               {/* Other Inventory Items */}
//               {[
//                 {
//                   icon: <Warning />,
//                   text: "Low Stock",
//                   link: "/dashboard/low-stocks",
//                 },
//                 {
//                   icon: <HiOutlineShieldCheck />,
//                   text: "Warranties",
//                   link: "/dashboard/warranties",
//                 },
//                 {
//                   icon: <FaBarcode />,
//                   text: "Generate Barcode",
//                   link: "/dashboard/barcode",
//                 },
//                 {
//                   icon: <QrCodeScanner />,
//                   text: "Print QR Code",
//                   link: "/dashboard/print-qrcode",
//                 },
//                 {
//                   icon: <FaExclamationTriangle />,
//                   text: "Low Stock Alert",
//                   link: "/dashboard/purchase-list",
//                 },
//                 {
//                   icon: <Assessment />,
//                   text: "Stock Report",
//                   link: "/dashboard/purchase-list",
//                 },
//               ].map((item, idx) => (
//                 <div key={idx} className="flex items-center mb-2">
//                   <span className="mr-2">{item.icon}</span>
//                   <NavLink to={item.link}>{item.text}</NavLink>
//                 </div>
//               ))}
//             </div>
//           </AccordionDetails>
//         </Accordion>

//         {/* Stock */}
//         <Accordion
//           sx={{ paddingBottom: "10px" }}
//           className="dashboardAccordion"
//           expanded={expanded === "panel7"}
//           onChange={handleChange("panel7")}
//         >
//           <AccordionSummary
//             sx={{ marginBottom: "-10px" }}
//             expandIcon={<ExpandLess className="accordionExpandIcon" />}
//             aria-controls="panel5a-content"
//             id="panel5a-header"
//           >
//             <Typography className="accordionName">
//               <div className="flex items-center justify-center">
//                 <FaWarehouse size={22} />
//                 <span className="ml-2"> Stock </span>
//               </div>
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <Inventory2 className="mr-2" />
//                 <NavLink to="/dashboard/stock"> Stock Management</NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <HiOutlineSwitchHorizontal className="mr-2" />
//                 <NavLink to="/dashboard/stock-transfer">
//                   {" "}
//                   Stock Transper
//                 </NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <FaBoxOpen className="mr-2" />
//                 <NavLink to="/dashboard/add-stock">Add Stock</NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <HiOutlineAdjustments className="mr-2" />
//                 <NavLink to="/dashboard/quantity-adjustment">
//                   {" "}
//                   Quantity Adjustment
//                 </NavLink>
//               </div>
//             </Typography>
//           </AccordionDetails>
//         </Accordion>

//         {/* Finance */}
//         <Accordion
//           sx={{ paddingBottom: "10px" }}
//           className="dashboardAccordion"
//           expanded={expanded === "panel10"}
//           onChange={handleChange("panel10")}
//         >
//           <AccordionSummary
//             sx={{ marginBottom: "-10px" }}
//             expandIcon={<ExpandLess className="accordionExpandIcon" />}
//             aria-controls="panel5a-content"
//             id="panel5a-header"
//           >
//             <Typography className="accordionName">
//               <div className="flex items-center justify-center">
//                 <AccountBalance size={22} />
//                 <span className="ml-2"> Finance</span>
//               </div>
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <AttachMoney className="mr-2" />
//                 <NavLink to="/dashboard/add-income">Add Income</NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <MonetizationOn className="mr-2" />
//                 <NavLink to="/dashboard/income-list">Income List</NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <MoneyOff className="mr-2" />
//                 <NavLink to="/dashboard/add-expense"> Expense Add </NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <FaMoneyBillAlt className="mr-2" />
//                 <NavLink to="/dashboard/expense-list">Expense List</NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <Category className="mr-2" />
//                 <NavLink to="/dashboard/expense-categories">
//                   Expense Categories{" "}
//                 </NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <Payments className="mr-2" />
//                 <NavLink to="/dashboard/add-paybill"> Pay Bill </NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <ReceiptLong className="mr-2" />
//                 <NavLink to="/dashboard/paybill">Bill List</NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <Savings className="mr-2" />
//                 <NavLink to="/dashboard/donation">Donation</NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <PersonAdd className="mr-2" />
//                 <NavLink to="/dashboard/add-supplier">Supplier Add</NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <People className="mr-2" />
//                 <NavLink to="/dashboard/supplier-list">Supplier List</NavLink>
//               </div>
//             </Typography>
//           </AccordionDetails>
//         </Accordion>

//         {/* Manage Stock */}
//         <Accordion
//           sx={{ paddingBottom: "10px" }}
//           className="dashboardAccordion"
//           expanded={expanded === "panel11"}
//           onChange={handleChange("panel11")}
//         >
//           <AccordionSummary
//             sx={{ marginBottom: "-10px" }}
//             expandIcon={<ExpandLess className="accordionExpandIcon" />}
//             aria-controls="panel5a-content"
//             id="panel5a-header"
//           >
//             <Typography className="accordionName">
//               <div className="flex items-center justify-center">
//                 <Inventory2 size={22} />
//                 <span className="ml-2"> Manage Stock</span>
//               </div>
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography className="accordionTypoGrapy">
//               <NavLink to="/dashboard/manage-stock">
//                 <span className="flex items-center">
//                   <HiOutlineViewGrid size={22} className="mr-2" />
//                   Mange Stock
//                 </span>
//               </NavLink>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <NavLink to="/dashboard/count-stock">
//                 <span className="flex items-center">
//                   <HiOutlineClipboardCheck size={22} className="mr-2" />
//                   Count Stock
//                 </span>
//               </NavLink>
//             </Typography>
//           </AccordionDetails>
//         </Accordion>

//         {/* Client */}
//         <Accordion
//           sx={{ paddingBottom: "10px" }}
//           className="dashboardAccordion"
//           expanded={expanded === "panel12"}
//           onChange={handleChange("panel12")}
//         >
//           <AccordionSummary
//             sx={{ marginBottom: "-10px" }}
//             expandIcon={<ExpandLess className="accordionExpandIcon" />}
//             aria-controls="panel2a-content"
//             id="panel2a-header"
//             className="dashboardAccordionSummary"
//           >
//             <Typography>
//               <div className="flex items-center justify-center">
//                 <HiOutlineUserGroup size={22} />
//                 <span className="ml-2"> Client</span>
//               </div>
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <HiOutlineUserAdd className="mr-2" />
//                 <NavLink to="/dashboard/add-customer">Customer Add</NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <FaUserFriends className="mr-2" />
//                 <NavLink to="/dashboard/customer-list">Customer List</NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <Business className="mr-2" />
//                 <NavLink to="/dashboard/add-company"> Company Add </NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <HiOutlineOfficeBuilding className="mr-2" />
//                 <NavLink to="/dashboard/company-list">Company List</NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <Store className="mr-2" />
//                 <NavLink to="/dashboard/add-show-room"> Show Room Add</NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <Storefront className="mr-2" />
//                 <NavLink to="/dashboard/show-room-list">Show Room List</NavLink>
//               </span>
//             </Typography>
//           </AccordionDetails>
//         </Accordion>

//         {/* HRM */}
//         <Accordion
//           sx={{ paddingBottom: "10px" }}
//           className="dashboardAccordion"
//           expanded={expanded === "panel13"}
//           onChange={handleChange("panel13")}
//         >
//           <AccordionSummary
//             sx={{ marginBottom: "-10px" }}
//             expandIcon={<ExpandLess className="accordionExpandIcon" />}
//             aria-controls="panel2a-content"
//             id="panel2a-header"
//             className=""
//           >
//             <Typography>
//               <div className="flex items-center dashboardItems">
//                 <FaUsers size={22} />
//                 <span className="ml-2">HRM</span>
//               </div>
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <FaUserPlus className="mr-2" />
//                 <NavLink to="/dashboard/add-employee"> Employee Add </NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <Group className="mr-2" />
//                 <NavLink to="/dashboard/employee-list">Employee List </NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <FaCalendarAlt className="mr-2" />
//                 <NavLink to="/dashboard/attendance-list">
//                   Attendance List
//                 </NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <CalendarToday className="mr-2" />
//                 <NavLink to="/dashboard/add-attendance">Attendance Add</NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <EventNote className="mr-2" />
//                 <NavLink to="/dashboard/employee-leave">Leave</NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <HolidayVillage className="mr-2" />
//                 <NavLink to="/dashboard/holiday">Holiday</NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <AttachMoney className="mr-2" />
//                 <NavLink to="/dashboard/employee-salary">Salary</NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <AccessTime className="mr-2" />
//                 <NavLink to="/dashboard/employee-overtime">Overtime</NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <Schedule className="mr-2" />
//                 <NavLink to="/dashboard/shift-list">Shift & Schedule</NavLink>
//               </span>
//             </Typography>
//           </AccordionDetails>
//         </Accordion>

//         {/* Reports */}
//         <Accordion
//           sx={{ paddingBottom: "10px" }}
//           className="dashboardAccordion"
//           expanded={expanded === "panel14"}
//           onChange={handleChange("panel14")}
//         >
//           <AccordionSummary
//             sx={{ marginBottom: "-10px" }}
//             expandIcon={<ExpandLess className="accordionExpandIcon" />}
//             aria-controls="panel6a-content"
//             id="panel6a-header"
//           >
//             <Typography>
//               <span className="flex items-center justify-center ">
//                 <Assessment />
//                 <span className="ml-2"> Reports</span>
//               </span>
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <BarChart className="mr-2" />
//                 <NavLink to="/dashboard/backup">Product Stock Report </NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <Warning className="mr-2" />
//                 <NavLink to="/dashboard/low-stock-report">
//                   Low Stock Report{" "}
//                 </NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <HiOutlineExclamation className="mr-2" />
//                 <NavLink to="/dashboard/expired-product-report">
//                   Expired Product Report
//                 </NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <DataUsage className="mr-2" />
//                 <NavLink to="/dashboard/restore">Daily Stock Movement</NavLink>
//               </div>
//             </Typography>
//           </AccordionDetails>
//         </Accordion>

//         {/* Database Backup */}
//         <Accordion
//           sx={{ paddingBottom: "10px" }}
//           className="dashboardAccordion"
//           expanded={expanded === "panel15"}
//           onChange={handleChange("panel15")}
//         >
//           <AccordionSummary
//             sx={{ marginBottom: "-10px" }}
//             expandIcon={<ExpandLess className="accordionExpandIcon" />}
//             aria-controls="panel6a-content"
//             id="panel6a-header"
//           >
//             <Typography>
//               <span className="flex items-center justify-center ">
//                 <Storage />
//                 <span className="ml-2"> Database Backup </span>
//               </span>
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <BackupTable className="mr-2" />
//                 <NavLink to="/dashboard/backup">Backup Database </NavLink>
//               </div>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <div className="flex items-center">
//                 <RestorePage className="mr-2" />
//                 <NavLink to="/dashboard/restore">Restore Database </NavLink>
//               </div>
//             </Typography>
//           </AccordionDetails>
//         </Accordion>

//         {/* Recycle Bin */}
//         <Accordion
//           sx={{ paddingBottom: "10px" }}
//           className="dashboardAccordion"
//           expanded={expanded === "panel16"}
//           onChange={handleChange("panel16")}
//         >
//           <AccordionSummary
//             sx={{ marginBottom: "-10px" }}
//             expandIcon={<ExpandLess className="accordionExpandIcon" />}
//             aria-controls="panel7a-content"
//             id="panel7a-header"
//           >
//             <Typography>
//               <div className="flex items-center justify-center">
//                 <Recycling />
//                 <span className="ml-2">Recycle Bin </span>
//               </div>
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <DeleteForever className="mr-2" />
//                 <NavLink to="/dashboard/recycle-bin-jobcard-list">
//                   Jobcard List
//                 </NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <FaTrash className="mr-2" />
//                 <NavLink to="/dashboard/recycle-bin-quotation-list">
//                   Quotation List
//                 </NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <HiOutlineTrash className="mr-2" />
//                 <NavLink to="/dashboard/recycle-bin-invoice-list">
//                   Invoice List
//                 </NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <FaTrashRestore className="mr-2" />
//                 <NavLink to="/dashboard/recycle-bin-moneyreceipt-list">
//                   Money Receipt List
//                 </NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <HiOutlineUserGroup className="mr-2" />
//                 <NavLink to="/dashboard/recycle-bin-customer-list">
//                   Customer List
//                 </NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <HiOutlineOfficeBuilding className="mr-2" />
//                 <NavLink to="/dashboard/recycle-bin-company-list">
//                   Company List
//                 </NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <Storefront className="mr-2" />
//                 <NavLink to="/dashboard/recycle-bin-showroom-list">
//                   Show Room List
//                 </NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <FaUsers className="mr-2" />
//                 <NavLink to="/dashboard/recycle-bin-employee-list">
//                   Employee List
//                 </NavLink>
//               </span>
//             </Typography>
//             <Typography className="accordionTypoGrapy">
//               <span className="flex items-center">
//                 <FaHospitalUser className="mr-2" />
//                 <NavLink to="/dashboard/recycle-bin-supplier-list">
//                   Supplier List
//                 </NavLink>
//               </span>
//             </Typography>
//           </AccordionDetails>
//         </Accordion>

//         {/* Logout */}
//         <div className="pl-4 space-y-3 mt-3  mb-20 ">
//           <div
//             onClick={handleLogout}
//             className="flex items-center dashboardItems cursor-pointer"
//           >
//             <Logout size={22} />
//             <span className="ml-2">Log Out </span>
//           </div>
//         </div>
//       </div>
//       {/* bar here  */}
//       <div
//         className={`${toggle ? `rightSideBarWrap` : `activeRightSideBarWrap`}`}
//       >
//         <LeftHoberSidebar />
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
