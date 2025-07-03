"use client";

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarDays } from "react-icons/fa6";
import "./Layout.css";
import TopSearchbar from "../components/TopSearchbar/TopSearchbar";
import UserProfile from "../components/UserProfile/UserProfile";
import { Box, Button, IconButton } from "@mui/material";
import { MenuOpen } from "@mui/icons-material";

const Appbar = ({ toggle, navRef, toggleSideBar }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const btnStyle = {
    background: "rgba(255, 255, 255, 0.9)",
    color: "#0B1F3A",
    fontWeight: 600,
    fontSize: {
      xs: "13px",
      sm: "15px",
    },
    width: "70%",
    padding: "0px",
    margin:'0 auto',
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,0.1)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textTransform: "none",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#42A1DA",
      borderColor: "#42A1DA",
      transform: "scale(1.02)",
    },
  };
  const btnStyle2 = {
    background: "#fff",
    width: "125px",
    padding: "0px",
    height: "35px",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#42A1DA",
      border: "1px solid #42A1DA",
    },
  };
  return (
    <div className="static w-full h-16 xl:h-16">
      <div className="w-full h-16 xl:h-16 bg-[#42A1DA] fixed z-10 ">
        <div className="flex items-center justify-between lg:pr-8 pl-10 lg:pl-20 mt-3 md:mt-2 lg:mt-3">
          <div
            className={`${toggle ? `activeToggle` : `navActive`}`}
            ref={navRef}
            onClick={toggleSideBar}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </div>
          <Box display="flex" alignItems="center" gap={2}>
            <Link to="/dashboard">
              <h3 className="ml-5 text-xl lg:text-2xl font-semibold text-white hidden xl:block">
     Garage Master
              </h3>
            </Link>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              sx={{ display: { xs: "none", lg: "flex" } }}
            >
              <Button
                sx={btnStyle2}
                onClick={() =>
                  window.open("https://trustautosolution.com", "_blank")
                }
              >
                Visit Website
              </Button>
              <Button sx={{ ...btnStyle2, width: "100px" }}>Bd Shop</Button>
              <Button sx={btnStyle2}>Global Shop</Button>
            </Box>
          </Box>

          {/* Menu icon for small and medium devices */}
          <IconButton
            onClick={toggleMenu}
            sx={{
              color: "#fff",
              display: { xs: "flex", md: "none" },
              marginRight: "10px",
            }}
          >
          <MenuOpen sx={{ fontSize: "40px" }} />
            {/*<MenuOpen sx={{ fontSize: "40px" }} />*/}
           {/* <UserProfile />            
            <ExpandMore/>*/}
          </IconButton>

          {/* Original navigation items - visible on lg screens */}
          <div className="hidden lg:flex items-center space-x-5 flex-end">
            <TopSearchbar />
            <Link to="/dashboard/holiday">
              <FaCalendarDays size={20} className="text-[#fff]" />
            </Link>
            <UserProfile />
          </div>
        </div>

        {/* Dropdown menu for small and medium devices */}
        <div
          className={`md:hidden w-full backdrop-blur-md bg-[#42A1DA]/80 transition-all duration-500 ease-in-out overflow-hidden rounded-b-2xl shadow-xl ${
            menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{
            boxShadow: menuOpen ? "0 10px 20px rgba(0, 0, 0, 0.15)" : "none",
          }}
        >
          <div className="flex flex-col items-center pt-6 space-y-4">
            <TopSearchbar />
          </div>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="stretch"
            gap={2}
            sx={{
              width: "100%",
              maxWidth: 420,
              mx: "auto",
              p: 2,
            }}
          >
            <Button
              sx={btnStyle}
              onClick={() =>
                window.open("https://trustautosolution.com", "_blank")
              }
            >
              🌐 Visit Website
            </Button>
            <Button sx={btnStyle}>🛒 BD Shop</Button>
            <Button sx={btnStyle}>🌍 Global Shop</Button>
          </Box>

          <div className="flex items-center justify-center py-6 space-x-6 w-full">
            <Link
              to="/dashboard/holiday"
              className="hover:scale-110 transition-transform"
            >
              <FaCalendarDays size={22} className="text-white" />
            </Link>
            <UserProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
