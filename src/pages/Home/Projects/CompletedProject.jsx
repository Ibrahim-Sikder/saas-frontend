/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { FaTrashAlt, FaEdit, FaEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Loading from "../../../components/Loading/Loading";
import {
  useGetAllInvoicesQuery,
  useMoveRecycledInvoiceMutation,
} from "../../../redux/api/invoice";
import { Button, Pagination } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { backBtnStyle } from "../../../utils/customStyle";
import { HiOutlineUserGroup } from "react-icons/hi";

const InvoiceTable = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");
  const [filterType, setFilterType] = useState("");
 const tenantDomain = window.location.hostname.split(".")[0];

  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const textInputRef = useRef(null);

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/detail?id=${e}`);
  };

  const [
    moveRecycledInvoice,
    { isLoading: deleteLoading, error: deleteError },
  ] = useMoveRecycledInvoiceMutation();

  const { data: allInvoices, isLoading: invoiceLoading } =
    useGetAllInvoicesQuery({
      tenantDomain,
      limit,
      page: currentPage,
      searchTerm: filterType,
      isRecycled: false,
    });
  const handleMoveToRecycledbin = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: " You want to move  this invoice Recycle bin?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await moveRecycledInvoice({tenantDomain,id}).unwrap();
        swal(
          "Move to Recycle bin!",
          "Move to Recycle bin successful.",
          "success"
        );
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  useEffect(() => {
    if (search) {
      setFilterType(search);
    }
  }, [search]);
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="mt-5 overflow-x-auto">
      <div className="flex items-center justify-center flex-wrap gap-3  md:justify-between my-3 ">
        <div className="flex flex-wrap items-center justify-center">
          <Button
            onClick={handleBack}
            startIcon={<ArrowBack />}
            sx={backBtnStyle}
          >
            Back
          </Button>
         
        </div>
        <div className="productHome">
          <span>Dashboard / </span>
          <span>Projects / </span>
          <span>Complete Projects </span>
        </div>
      </div>
      <div className=" overflow-x-auto">
        <div className="flex flex-wrap  items-center justify-between mb-5">
          <h3 className="mb-3 text-xl  md:text-3xl font-bold">Complete Projects List:</h3>
          <div className="flex items-center searcList">
            <div className="searchGroup">
              <input
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1);
                }}
                autoComplete="off"
                type="text"
                placeholder="Write here"
                ref={textInputRef}
              />
            </div>
            <button className="SearchBtn ">Search </button>
          </div>
        </div>
        {invoiceLoading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : (
          <div>
            {allInvoices?.data?.invoices?.length === 0 ? (
              <div className="flex items-center justify-center h-full text-xl text-center">
                No matching card found.
              </div>
            ) : (
              <section className="tableContainer overflow-x-auto">
                <table className="customTable">
                  <thead>
                    <tr>
                      <th>SL No </th>
                      <th>Order Number </th>
                      <th>Customer Name</th>
                      <th>Vehicle Name</th>
                      <th>Car Reg Num </th>
                      <th>Vehicle Brand</th>
                      <th>Mobile Number</th>
                      <th>Date</th>
                      <th colSpan={4}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allInvoices?.data?.invoices?.map((card, index) => {
                 
                      const globalIndex =
                        (allInvoices?.data?.meta?.currentPage - 1) * limit +
                        (index + 1);

                      const remaining = card.moneyReceipts?.[0]?.remaining;
                      const totalAmount = card.moneyReceipts?.[0]?.total_amount;
                      const advance = card.moneyReceipts?.[0]?.advance;
                      const noMoney = card.moneyReceipts?.length < 0;

                      let rowClass = "";
                      if (card.moneyReceipts.length === 0) {
                        rowClass = "bg-[#f5365c] text-white";
                      } else if (
                        remaining === 0 &&
                        advance === 0 &&
                        totalAmount === 0
                      ) {
                        rowClass = "bg-[#f5365c] text-white";
                      } else if (advance === totalAmount) {
                        rowClass = "bg-[#2dce89] text-white";
                      } else if (advance !== totalAmount) {
                        rowClass = "bg-[#ffad46] text-white";
                      } else {
                        rowClass = "bg-[#f5365c] text-black";
                      }

                      return (
                        <tr key={card._id} className={`${rowClass} transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-100 hover:text-black`} >
                          <td>{globalIndex}</td>
                          <td>{card?.job_no}</td>
                          {card?.customer && (
                            <td>{card?.customer?.customer_name}</td>
                          )}
                          {card?.company && (
                            <td>{card?.company?.company_name}</td>
                          )}
                          {card?.showRoom && (
                            <td>{card?.showRoom?.showRoom_name}</td>
                          )}
                          <td>{card?.vehicle?.vehicle_name}</td>
                          
                          <td>
                            <span>{card?.vehicle?.carReg_no} {card?.vehicle?.car_registration_no}</span>
                          </td>

                          <td>
                            <span>{card.vehicle?.vehicle_brand}</span>
                          </td>
                         {card?.customer && (
                            <td>{card?.customer?.fullCustomerNum}</td>
                          )}
                          {card?.company && (
                            <td>{card?.company?.fullCompanyNum}</td>
                          )}
                          {card?.showRoom && (
                            <td>{card?.showRoom?.fullCompanyNum}</td>
                          )}
                          <td>{card.date}</td>
                          <td>
                            <a
                              className="bg-[#42A0D9] text-white px-3 py-2 text-[12px]  rounded-full "
                              href={`${
                                import.meta.env.VITE_API_URL
                              }/invoices/invoice/${card._id}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Download
                            </a>
                          </td>
                          <td>
                            <div
                              onClick={() => handleIconPreview(card._id)}
                              className="editIconWrap edit2"
                            >
                              <FaEye className="editIcon" />
                            </div>
                          </td>
                          <td>
                            <div className="editIconWrap edit">
                              <Link
                                to={`/dashboard/update-invoice?id=${card._id}`}
                              >
                                <FaEdit className="editIcon" />
                              </Link>
                            </div>
                          </td>
                          <td>
                            <button
                              disabled={deleteLoading}
                              onClick={() => handleMoveToRecycledbin(card._id)}
                              className=" bg-white  p-1 rounded-sm "
                            >
                              <FaTrashAlt className="text-[#f5365c] size-[16px]" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
            )}
          </div>
        )}
        <div className="flex justify-center mt-4">
          <Pagination
            count={allInvoices?.data?.meta?.totalPages}
            page={currentPage}
            color="primary"
            onChange={(_, page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
