/* eslint-disable no-unused-vars */

import { FaFileInvoice } from "react-icons/fa";
import { ArrowBack, ArrowForwardIos } from "@mui/icons-material";
import InvoiceTable from "./InvoiceTable";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { backBtnStyle } from "../../../utils/customStyle";
import { HiOutlineUserGroup } from "react-icons/hi";
const ViewInvoice = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="md:mt-5 overflow-x-auto">
      <div className="flex flex-wrap items-center justify-center gap-3 text-center md: md:justify-between mt-5 border rounded-md shadow-md px-2 py-5">
        <div className="flex flex-wrap items-center justify-center">
          <Button
            onClick={handleBack}
            startIcon={<ArrowBack />}
            sx={backBtnStyle}
          >
            Back
          </Button>
          <HiOutlineUserGroup className="invoicIcon" />
        </div>

        <div className="flex items-center justify-center ">
          <FaFileInvoice className="invoicIcon" />
          <div className="ml-2">
            <h3 className="text-2xl font-bold"> Invoice </h3>
            <span>
              Invoice <ArrowForwardIos sx={{ fontSize: "15px" }} /> Manage
              Invoice{" "}
            </span>
          </div>
        </div>

        <div className="productHome">
          <span>Home / </span>
          <span>Invoice / </span>
          <span> Invoice List </span>
        </div>
      </div>

      <InvoiceTable />
    </div>
  );
};

export default ViewInvoice;
