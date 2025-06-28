/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  FaTrashAlt,
  FaEdit,
  FaEye,
  FaFileInvoiceDollar,
  FaDownload,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import swal from "sweetalert";
import Loading from "../../../../components/Loading/Loading";
import {
  useGetAllInvoicesQuery,
  useMoveRecycledInvoiceMutation,
} from "../../../../redux/api/invoice";
import { Pagination } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { HiOutlinePlus } from "react-icons/hi";
const CustomerInvoiceList = ({ id, user_type,tenantDomain }) => {
  const [filterType, setFilterType] = useState("");

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
      id,
      limit,
      page: currentPage,
      searchTerm: filterType,
      isRecycled: false,
    });
  console.log(allInvoices);
  const handleMoveToRecycledbin = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: " You want to move  this invoice Recycle bin?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await moveRecycledInvoice({tenantDomain, id}).unwrap();
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



  return (
    <div className=" mb-24 mt-10 w-full">
      <button className="bg-blue-500 g items-center hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition duration-300">
        <Link className="flex gap-x-2 " to={`/dashboard/invoice?id=${id}`}>
          Create Invoice <HiOutlinePlus size={20} />
        </Link>
      </button>
      <div className=" mt-3 md:mt-0 flex items-center justify-end   md:px-3">
        <div className="flex items-center searcList">
          <div className="searchGroup">
            <input
              onChange={(e) => setFilterType(e.target.value)}
              autoComplete="off"
              type="text"
              ref={textInputRef}
            />
          </div>
          <button className="SearchBtn ">Search </button>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        {invoiceLoading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : (
          <div>
            {allInvoices?.data?.invoices?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                <FaFileInvoiceDollar className="text-6xl text-blue-500 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  No Invoices Found
                </h3>
                <p className="text-gray-600 mb-4">
                  Start by creating your first invoice to keep track of your
                  transactions.
                </p>
                <Link
                  to={`/dashboard/invoice?id=${id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition duration-300 flex items-center"
                >
                  <AddCircleOutline sx={{ marginRight: "8px" }} />
                  Create Your First Invoice
                </Link>
              </div>
            ) : (
              <section className="tableContainer overflow-x-auto">
                <table className="customTable">
                  <thead>
                    <tr>
                      <th>SL No </th>
                      <th>Order Number </th>
                      <th>Customer Name</th>
                      <th>Car Number </th>
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
                        <tr
                          key={card._id}
                          className={`${rowClass} hover:bg-blue-300 transition-colors duration-200 hover:text-white`}
                        >
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
                          <td>
                            {card?.vehicle?.carReg_no}{" "}
                            {card?.vehicle?.car_registration_no}
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
                            <div
                              onClick={() => handleIconPreview(card._id)}
                              className="editIconWrap edit2"
                            >
                              <FaEye className="editIcon" />
                            </div>
                          </td>
                          <td>
                           

                            <a
                              className="editIconWrap edit2"
                              href={`${
                                import.meta.env.VITE_API_URL
                              }/invoices/invoice/${card._id}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <FaDownload className="editIcon" />
                            </a>
                          </td>
                          <td>
                            <div className="editIconWrap edit">
                              <Link
                                to={{
                                  pathname: `/dashboard/update-invoice`,
                                  search: `?id=${card._id}&user_type=${user_type}&user=${id}`,
                                  state: { redirectTo: "customer-profile" },
                                }}
                              >
                                <FaEdit className="editIcon" />
                              </Link>
                            </div>
                          </td>
                          <td>
                            <button
                              disabled={deleteLoading}
                              onClick={() => handleMoveToRecycledbin(card._id)}
                              className="editIconWrap"
                            >
                              <FaTrashAlt className="deleteIcon" />
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
        {allInvoices?.data?.invoices?.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination
              count={allInvoices?.data?.meta?.totalPages}
              page={currentPage}
              color="primary"
              onChange={(_, page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerInvoiceList;
