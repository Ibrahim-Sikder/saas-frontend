/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import {
  FaTrashAlt,
  FaEdit,
  FaEye,
  FaDownload,
  FaFileInvoice,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Loading from "../../../components/Loading/Loading";
import { ArrowBack } from "@mui/icons-material";
import { Button, Pagination, Tooltip } from "@mui/material";

import {
  useGetAllQuotationsQuery,
  useMoveRecycledQuotationMutation,
} from "../../../redux/api/quotation";
import { HiOutlineUserGroup } from "react-icons/hi";
import { backBtnStyle } from "../../../utils/customStyle";
import { useTenantDomain } from "../../../hooks/useTenantDomain";
import { useGetCompanyProfileQuery } from "../../../redux/api/companyProfile";
const QuotationList = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");
  const tenantDomain = useTenantDomain();

  const [filterType, setFilterType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const textInputRef = useRef(null);
  const navigate = useNavigate();
  const limit = 10;

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/quotation-view?id=${e}`);
  };
  const status = "running";

  const [
    moveRecycledQuotation,
    { idLoading: deleteLoading, error: deleteError },
  ] = useMoveRecycledQuotationMutation();

  const { data: allQuotations, isLoading: quotationLoading } =
    useGetAllQuotationsQuery({
      tenantDomain,
      limit,
      page: currentPage,
      searchTerm: filterType,
      isRecycled: false,
      status,
    });

  const handleMoveToRecycled = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: " You want to move  this quotation Recycle Bin?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await moveRecycledQuotation(id).unwrap();
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

  const { data: profileData } = useGetCompanyProfileQuery({
    tenantDomain,
  });

  const companyProfileData = {
    companyName: profileData?.data?.companyName,
    address: profileData?.data?.address,
    website: profileData?.data?.website,
    phone: profileData?.data?.phone,
    email: profileData?.data?.email,
    logo: profileData?.data?.logo[0],
    companyNameBN: profileData?.data?.companyNameBN,
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
    <div>
      <div className="overflow-x-auto mt-5">
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
            <span>Running Projects </span>
          </div>
        </div>
        <div className="w-full mt-5 mb-24 ">
          <div className=" flex flex-wrap gap-3  items-center justify-between mb-5">
            <h3 className=" text-xl md:text-2xl font-semibold text-center ">
              Running Projects List:
            </h3>
            <div className="flex items-center">
              <div className="searchGroup">
                <input
                  onChange={(e) => {
                    setFilterType(e.target.value);
                    setCurrentPage(1);
                  }}
                  type="text"
                  placeholder="Search"
                  className="border py-2 px-3 rounded-md border-[#ddd]"
                  ref={textInputRef}
                />
              </div>
              <button className="SearchBtn ">Search</button>
            </div>
          </div>
          {quotationLoading ? (
            <div className="flex items-center justify-center text-xl">
              <Loading />
            </div>
          ) : (
            <div>
              {allQuotations?.data?.quotations?.length === 0 ? (
                <div className="flex items-center justify-center h-full text-xl text-center">
                  No matching card found.
                </div>
              ) : (
                <section className="tableContainer overflow-x-auto">
                  <table className="customTable">
                    <thead className="customTable">
                      <tr>
                        <th>SL No </th>
                        <th>Order Number </th>
                        <th>Name</th>

                        <th>Car Number </th>
                        <th>Mobile Number</th>
                        <th>Date</th>
                        <th colSpan={5}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allQuotations?.data?.quotations?.map((card, index) => {
                        const globalIndex =
                          (allQuotations?.data?.meta?.currentPage - 1) * limit +
                          (index + 1);
                        return (
                          <tr
                            key={card._id}
                            className={`transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-100 hover:text-black`}
                          >
                            <td>{globalIndex}</td>
                            <td>{card.job_no}</td>

                            {card?.customer?.customer_name ||
                            card?.company?.company_name ||
                            card?.showRoom?.showRoom_name ? (
                              <>
                                {card?.customer && (
                                  <td>{card?.customer?.customer_name}</td>
                                )}
                                {card?.company && (
                                  <td>{card?.company?.company_name}</td>
                                )}
                                {card?.showRoom && (
                                  <td>{card?.showRoom?.showRoom_name}</td>
                                )}
                              </>
                            ) : (
                              <td></td>
                            )}

                            <td>
                              {card?.vehicle?.carReg_no}{" "}
                              {card?.vehicle?.car_registration_no}
                            </td>

                            {card?.customer?.fullCustomerNum ||
                            card?.company?.fullCompanyNum ||
                            card?.showRoom?.fullCompanyNum ? (
                              <>
                                {card?.customer && (
                                  <td>{card?.customer?.fullCustomerNum}</td>
                                )}
                                {card?.company && (
                                  <td>{card?.company?.fullCompanyNum}</td>
                                )}
                                {card?.showRoom && (
                                  <td>{card?.showRoom?.fullCompanyNum}</td>
                                )}
                              </>
                            ) : (
                              <td></td>
                            )}

                            <td>{card.date}</td>

                            <td>
                              <Tooltip
                                title="View Invoice"
                                arrow
                                placement="top"
                              >
                                <a
                                  className="editIconWrap edit2"
                                  href={`/dashboard/invoice?order_no=${card?.job_no}&id=${card._id}`}
                                  rel="noreferrer"
                                >
                                  <FaFileInvoice className="editIcon" />
                                </a>
                              </Tooltip>
                            </td>

                            <td>
                              <Tooltip
                                title="Download Quotation"
                                arrow
                                placement="top"
                              >
                                <a
                                  className="editIconWrap edit2"
                                  href={`${
                                    import.meta.env.VITE_API_URL
                                  }/quotations/quotation/${
                                    card._id
                                  }?tenantDomain=${tenantDomain}&companyProfileData=${encodeURIComponent(
                                    JSON.stringify(companyProfileData)
                                  )}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <FaDownload className="editIcon" />
                                </a>
                              </Tooltip>
                            </td>

                            <td>
                              <Tooltip title="Preview" arrow placement="top">
                                <div
                                  onClick={() => handleIconPreview(card._id)}
                                  className="editIconWrap edit2"
                                  style={{ cursor: "pointer" }}
                                >
                                  <FaEye className="editIcon" />
                                </div>
                              </Tooltip>
                            </td>

                            <td>
                              <Tooltip
                                title="Edit Quotation"
                                arrow
                                placement="top"
                              >
                                <div className="editIconWrap edit">
                                  <Link
                                    to={`/dashboard/update-quotation?id=${card._id}`}
                                  >
                                    <FaEdit className="editIcon" />
                                  </Link>
                                </div>
                              </Tooltip>
                            </td>

                            <td>
                              <Tooltip
                                title={
                                  deleteLoading
                                    ? "Deleting..."
                                    : "Move to Recycled"
                                }
                                arrow
                                placement="top"
                              >
                                <span>
                                  <button
                                    disabled={deleteLoading}
                                    onClick={() =>
                                      handleMoveToRecycled(card._id)
                                    }
                                    className="editIconWrap"
                                    style={{
                                      cursor: deleteLoading
                                        ? "not-allowed"
                                        : "pointer",
                                      background: "none",
                                      border: "none",
                                      padding: 0,
                                    }}
                                  >
                                    <FaTrashAlt className="deleteIcon" />
                                  </button>
                                </span>
                              </Tooltip>
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
              count={allQuotations?.data?.meta?.totalPages}
              page={currentPage}
              color="primary"
              onChange={(_, page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationList;
