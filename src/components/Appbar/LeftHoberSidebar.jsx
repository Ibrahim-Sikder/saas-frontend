/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { NavLink, useNavigate } from "react-router-dom";
import {
  useEffect,
  useRef,
  useState
} from "react";
import Cookies from "js-cookie";
import {
  Home,
  Logout,
  Receipt,
  CurrencyExchange,
  DirectionsCar,
  RequestQuote,
  AccountBalance,
  AttachMoney,
  MoneyOff,
  CalendarToday,
  Storage,
  BackupTable,
  PersonAdd,
  Business,
  Store,
  Storefront,
  Group,
  LocalShipping,
  Recycling,
  DeleteForever,
  RestorePage
} from "@mui/icons-material";
import {
  FaProjectDiagram,
  FaUsers,
  FaCalendarAlt,
  FaUserPlus,
  FaUserFriends,
  FaClipboardList,
  FaFileInvoice,
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaMoneyBill,
  FaRunning,
  FaCheckCircle,
  FaTrash,
  FaTrashRestore,
  FaHospitalUser
} from "react-icons/fa";
import {
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineUserAdd,
  HiOutlineDocumentText,
  HiOutlineDocumentDuplicate,
  HiOutlineTrash
} from "react-icons/hi";

const LeftHoberSidebar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    Cookies.remove("tas-auth");
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="mt-14">
      {/* Dashboard */}
      <div>
        <div className="toolTipWrap">
          <NavLink to="/dashboard">
            <Home className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Dashboard</b>
        </div>
      </div>

      {/* Client */}
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/add-customer">
            <HiOutlineUserGroup className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Client</b>
        </div>
      </div>

      {/* Vehicle Job Card */}
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/addjob">
            <DirectionsCar className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Vehicle Job Card</b>
        </div>
      </div>

      {/* Quotation */}
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/qutation">
            <RequestQuote className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Quotation</b>
        </div>
      </div>

      {/* Invoice Card */}
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/invoice">
            <Receipt className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Invoice Card</b>
        </div>
      </div>

      {/* Money Receipt */}
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/money-receive">
            <CurrencyExchange className="tooltipIcon" />
          </NavLink>
          <b className="toolTip text-sm">Money Receipt</b>
        </div>
      </div>

      {/* Projects */}
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/running-project">
            <FaProjectDiagram className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Projects</b>
        </div>
      </div>

      {/* Finance */}
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/add-income">
            <AccountBalance className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Finance</b>
        </div>
      </div>

      {/* HRM */}
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/add-employee">
            <FaUsers className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">HRM</b>
        </div>
      </div>

      {/* Tenant & UI Management (Superadmin only) */}
      {user.role === "superadmin" && (
        <div className="mt-[14px]">
          <div className="toolTipWrap">
            <NavLink to="/dashboard/all-tenant-list">
              <Business className="tooltipIcon" />
            </NavLink>
            <b className="toolTip">Tenant Management</b>
          </div>
        </div>
      )}

      {/* Recycle Bin */}
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/recycle-bin-jobcard-list">
            <Recycling className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Recycle Bin</b>
        </div>
      </div>

      {/* Database Backup */}
      <div className="mt-[14px]">
        <div className="toolTipWrap">
          <NavLink to="/dashboard/backup">
            <Storage className="tooltipIcon" />
          </NavLink>
          <b className="toolTip">Data Backup</b>
        </div>
      </div>

      {/* Log Out */}
      <div className="mt-[14px]">
        <div onClick={handleLogout} className="toolTipWrap">
          <Logout className="tooltipIcon" />
          <b className="toolTip">Log Out</b>
        </div>
      </div>
    </div>
  );
};

export default LeftHoberSidebar;