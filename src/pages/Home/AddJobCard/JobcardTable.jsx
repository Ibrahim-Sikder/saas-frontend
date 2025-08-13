"use client";

/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { FaTrashAlt, FaEdit, FaEye, FaDownload } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Loading from "../../../components/Loading/Loading";
import {
  useGetAllJobCardsQuery,
  useMovetoRecyclebinJobCardMutation,
} from "../../../redux/api/jobCard";
import { Pagination } from "@mui/material";
import { HiOutlineSearch } from "react-icons/hi";
import { useTenantDomain } from "../../../hooks/useTenantDomain";
import { useGetCompanyProfileQuery } from "../../../redux/api/companyProfile";

const JobcardTable = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");
  const [filterType, setFilterType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const textInputRef = useRef(null);
  const navigate = useNavigate();

  const limit = 10;
  const tenantDomain = useTenantDomain();
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
    companyNameBN:profileData?.companyNameBN, 
  };
  const { data: allJobCards, isLoading: jobCardLoading } =
    useGetAllJobCardsQuery({
      tenantDomain,
      limit,
      page: currentPage,
      searchTerm: filterType,
      isRecycled: false,
    });

  const [movetoRecyclebinJobCard, { isLoading: movedLoading }] =
    useMovetoRecyclebinJobCardMutation();

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/preview?id=${e}`);
  };

  const handleMoveToRecycled = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: " You want to move  this jobcard Recycle bin?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await movetoRecyclebinJobCard({ tenantDomain, id }).unwrap();
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

  return (
    <div>
      <div className="mt-5 overflow-x-auto">
        <div className="w-full mb-24">
          <div className="flex flex-wrap items-center justify-between mb-5">
            <h3 className="txt-center text-xl font-bold md:text-3xl">
              Job Card List:
            </h3>
            <div className="flex  items-center">
              <input
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1);
                }}
                type="text"
                placeholder="Search"
                className="border py-2 px-2 md:px-3 rounded-md border-[#ddd] w-[230px] md:w-full"
                ref={textInputRef}
              />

              <button
                className="bg-[#42A1DA] text-white px-2 py-2 rounded-md ml-1"
                disabled={filterType === ""}
              >
                {" "}
                <HiOutlineSearch size={25} />
              </button>
            </div>
          </div>
          {jobCardLoading ? (
            <div className="flex items-center justify-center text-xl">
              <Loading />
            </div>
          ) : (
            <div>
              {allJobCards?.data?.jobCards?.length === 0 ? (
                <div className="flex items-center justify-center h-full text-xl text-center">
                  No matching card found.
                </div>
              ) : (
                <section className="tableContainer">
                  <table className="customTable">
                    <thead>
                      <tr>
                        <th>SL No</th>
                        <th>User Id</th>
                        <th>Order Number </th>
                        <th>Chassis No </th>
                        <th>User type</th>
                        <th>Vehicle Name</th>
                        <th>Car Reg Num </th>
                        <th>Vehicle Brand</th>
                        <th>Mobile Number</th>
                        <th>Date</th>
                        <th colSpan={5}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allJobCards?.data?.jobCards?.map((card, index) => {
                        const globalIndex =
                          (allJobCards?.data?.meta?.currentPage - 1) * limit +
                          (index + 1);
                        return (
                          <tr
                            key={card?._id}
                            className="transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-100 hover:text-black"
                          >
                            <td>{globalIndex}</td>
                            <td>{card?.Id}</td>
                            <td>{card?.job_no}</td>
                            <td>
                              {card?.vehicle?.map((vehicle, idx) => (
                                <span key={idx}>{vehicle?.chassis_no}</span>
                              ))}
                            </td>
                            <td>{card?.user_type}</td>
                            <td>
                              {card?.vehicle?.map((vehicle, idx) => (
                                <span key={idx}>{vehicle?.vehicle_name}</span>
                              ))}
                            </td>

                            <td>
                              {card?.vehicle?.map((vehicle, idx) => (
                                <span
                                  key={idx}
                                >{`${vehicle?.carReg_no} ${vehicle?.car_registration_no}`}</span>
                              ))}
                            </td>
                            <td>
                              {card?.vehicle?.map((vehicle, idx) => (
                                <span key={idx}>{vehicle?.vehicle_brand}</span>
                              ))}
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

                            <td>{card?.date}</td>

                            <td className="text-center">
                              <Link
                                to={`/dashboard/qutation?order_no=${card?.job_no}`}
                                className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors group"
                              >
                                <span className="relative inline-block">
                                  <svg
                                    className="w-6 h-6 transform group-hover:rotate-[-5deg] transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                </span>
                              </Link>
                            </td>

                            <td>
                              <a
                                className="editIconWrap edit2"
                                href={`${
                                  import.meta.env.VITE_API_URL
                                }/jobCards/jobcard/${
                                  card._id
                                }?tenantDomain=${tenantDomain}&companyProfileData=${encodeURIComponent(
                                  JSON.stringify(companyProfileData)
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <FaDownload className="editIcon" />
                              </a>
                            </td>
                            <td>
                              <div
                                onClick={() => handleIconPreview(card._id)}
                                className="flex items-center justify-center cursor-pointer"
                              >
                                <FaEye className="h-[22px] w-[22px]" />
                              </div>
                            </td>
                            <td>
                              <div className="editIconWrap edit">
                                <Link
                                  to={`/dashboard/update-jobcard?id=${card._id}`}
                                >
                                  <FaEdit className="editIcon" />
                                </Link>
                              </div>
                            </td>
                            <td>
                              <button
                                disabled={movedLoading}
                                onClick={() => handleMoveToRecycled(card?._id)}
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
          <div className="flex justify-center mt-4">
            <Pagination
              count={allJobCards?.data?.meta?.totalPages}
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

export default JobcardTable;
