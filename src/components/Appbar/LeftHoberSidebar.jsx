/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaCarAlt,
  FaProjectDiagram,
  FaProductHunt,
  FaUserTie,
  FaCriticalRole,
  FaAlipay,
  FaUsers,
  FaUsersCog,
  FaDatabase,
  FaHeadset,
  FaRegListAlt,
  FaHospitalUser,
} from "react-icons/fa";
import { FaAnchorCircleCheck } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

import { Home, Logout, Receipt, CurrencyExchange } from "@mui/icons-material";
import { animateScroll as scroll } from "react-scroll";

const LeftHoberSidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef();
  const [toggle, setToggle] = useState(false);
  const toggleSideBar = () => {
    setToggle((toggle) => !toggle);
  };

  const containerRef = useRef();
  const handleToggleCloseBtn = () => {
    setToggle(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const button = document.getElementById("button");
      if (window.scrollY > 50) {
        button.classList.add("scrollToTopBtn");
      } else {
        button.classList.remove("scrollToTopBtn");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo(0, 0);
    scroll.scrollToTop({ smooth: true });
  }

  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("tas-auth");
    navigate("/");
  };
  return (
    <div className="mt-14">
      <div>
        <div className="toolTipWrap">
          <NavLink to="/dashboard">
            <Home className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Dashboard </b>
        </div>
      </div>

      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/addjob">
            {" "}
            <FaCarAlt className="tooltipIcon" />
          </NavLink>

          <b className="toolTip">Job Card</b>
        </div>
      </div>
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/qutation">
            {" "}
            <FaCarAlt className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Quotation</b>
        </div>
      </div>
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/invoice">
            {" "}
            <Receipt className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Invoice Card</b>
        </div>
      </div>
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/money-receive">
            {" "}
            <CurrencyExchange className="tooltipIcon" />
          </NavLink>
          <b className="toolTip text-sm">Money Receipt </b>
        </div>
      </div>
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/running-project">
            {" "}
            <FaProjectDiagram className="tooltipIcon" />
          </NavLink>

          <b className="toolTip">Project</b>
        </div>
      </div>
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/add-product">
            <FaProductHunt className="tooltipIcon" />
          </NavLink>

          <b className="toolTip">Product</b>
        </div>
      </div>
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/add-customer">
            <FaUserTie className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Customer</b>
        </div>
      </div>
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/add-supplier">
            <FaHospitalUser className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Suppliers </b>
        </div>
      </div>
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/add-employee">
            <FaUsers className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Employee </b>
        </div>
      </div>
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/add-attendance">
            <FaRegListAlt className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Attendance </b>
        </div>
      </div>

      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/add-expense">
            <FaCriticalRole className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Income </b>
        </div>
      </div>
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/add-expense">
            <FaCriticalRole className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Expense </b>
        </div>
      </div>
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/add-expense">
            <FaAnchorCircleCheck className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Role </b>
        </div>
      </div>
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/bill-pay">
            <FaAlipay className="tooltipIcon" />
          </NavLink>

          <b className="toolTip">Bill Pay </b>
        </div>
      </div>
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/profile">
            <FaUsersCog className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Profile </b>
        </div>
      </div>
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <FaDatabase className="tooltipIcon" />
          <b className="toolTip">Data Backup </b>
        </div>
      </div>
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/support">
            <FaHeadset className="tooltipIcon" />
          </NavLink>

          <b className="toolTip">Support </b>
        </div>
      </div>
      <div className="mt-[14px]">
        <div onClick={handleLogout} className="toolTipWrap">
          <Logout className="tooltipIcon" />
          <b className="toolTip">Log Out </b>
        </div>
      </div>
    </div>
  );
};

export default LeftHoberSidebar;
