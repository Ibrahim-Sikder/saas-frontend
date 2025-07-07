/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { FaTrashAlt, FaEdit, FaUserTie } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowForwardIos } from "@mui/icons-material";
import { HiOutlineSearch } from "react-icons/hi";
import { Pagination } from "@mui/material";
import swal from "sweetalert";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";
import { useMoveRecycledCustomerMutation } from "../../../redux/api/customerApi";
import { useTenantDomain } from "../../../hooks/useTenantDomain";

const AllCustomerList = () => {
  const textInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [allCustomerData, setAllCustomerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const ITEMS_PER_PAGE = 10;
  const tenantDomain = useTenantDomain();

  const searchParam = new URLSearchParams(location.search).get("search");
  const [
    moveRecycledCustomer,
    { isLoading: customerDeleteLoading, error: deleteError },
  ] = useMoveRecycledCustomerMutation();

  const fetchCustomerData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/meta/allcustomer?tenantDomain=${tenantDomain}`,
        {
          params: {
            limit: ITEMS_PER_PAGE,
            page: currentPage,
            searchTerm: filterType,
            isRecycled: false,
          },
        }
      );
      setAllCustomerData(response.data);
    } catch (err) {
      setError(err);
      toast.error("Failed to fetch all customer data.");
    } finally {
      setIsLoading(false);
    }
  };

  const totalCount = allCustomerData?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleAllCustomer = () => {
    setFilterType("");
    setCurrentPage(1);
    if (textInputRef.current) {
      textInputRef.current.value = "";
    }
    fetchCustomerData();
  };

  const handleIconPreview = (id, userType) => {
    switch (userType) {
      case "customer":
        navigate(`/dashboard/customer-profile?id=${id}`);
        break;
      case "company":
        navigate(`/dashboard/company-profile?id=${id}`);
        break;
      case "showRoom":
        navigate(`/dashboard/show-room-profile?id=${id}`);
        break;
      default:
        toast.error("Invalid user type");
    }
  };

  const deletePackage = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "You want to move this Customer to Recycle Bin?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await moveRecycledCustomer({ tenantDomain, id }).unwrap();
        swal(
          "Move to Recycle bin!",
          "Move to Recycle bin successful.",
          "success"
        );
        fetchCustomerData();
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  useEffect(() => {
    if (searchParam) {
      setFilterType(searchParam);
      if (textInputRef.current) {
        textInputRef.current.value = searchParam;
      }
    }
  }, [searchParam]);

  useEffect(() => {
    fetchCustomerData();
  }, [currentPage, filterType]);

  if (deleteError) {
    toast.error(deleteError?.message);
  }
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType]);

  return (
    <div className="w-full mt-5 mb-24">
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between my-3 mb-8">
        <div className="flex items-center justify-center">
          <FaUserTie className="invoicIcon" />
          <div className="ml-2">
            <h3 className="text-2xl font-bold">Customer</h3>
            <span>
              Customer <ArrowForwardIos sx={{ fontSize: "15px" }} /> Manage
              Customer
            </span>
          </div>
        </div>
        <div className="mt-2 productHome md:mt-0">
          <span>Dashboard / </span>
          <span>Customer List</span>
        </div>
      </div>

      {/* Search section */}
      <div className="flex-wrap flex items-center justify-between mb-5 bg-[#F1F3F6] py-5 px-3">
        <h3 className="mb-3 text-3xl font-bold">All Customer List:</h3>
        <div className="flex items-center">
          <button
            onClick={handleAllCustomer}
            className="bg-[#42A1DA] text-white px-4 py-2 rounded-md mr-1"
          >
            All
          </button>
          <input
            value={filterType} // Bind input to state
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
            type="text"
            placeholder="Search"
            className="border py-2 px-3 rounded-md border-[#ddd]"
            ref={textInputRef}
          />

          <button
            onClick={handleSearch}
            className="bg-[#42A1DA] text-white px-2 py-2 rounded-md ml-1"
            disabled={filterType === ""}
          >
            <HiOutlineSearch size={25} />
          </button>
        </div>
      </div>

      {/* Table section */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center text-xl text-red-500">
            Failed to load customer data.
          </div>
        ) : allCustomerData?.length === 0 ? (
          <div className="flex items-center justify-center h-full text-xl text-center">
            No matching customers found.
          </div>
        ) : (
          <div className="tableContainer overflow-x-auto">
            <table className="customTable">
              <thead className="">
                <tr>
                  <th>SL No</th>
                  <th>Customer ID</th>
                  <th>Customer Name</th>
                  <th>Vehicle User Name</th>
                  <th>Car Number</th>
                  <th>Mobile Number</th>
                  <th>User Type</th>
                  <th colSpan={3}>Action</th>
                </tr>
              </thead>
              <tbody>
                {allCustomerData?.data?.data?.map((customer, index) => {
                  const lastVehicle = customer?.vehicles
                    ? [...customer.vehicles].sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )[0]
                    : null;

                  const displayIndex =
                    (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

                  return (
                    <tr key={customer?._id}>
                      <td>{displayIndex}</td>
                      <td>{customer?.id}</td>
                      <td>{customer?.name}</td>
                      <td>{customer?.vehicle_username}</td>
                      <td>{customer?.fullRegNums?.split(", ")[0] || ""}</td>
                      {/* <td>{lastVehicle?.fullRegNum}</td> */}
                      <td>{customer?.contact}</td>
                      <td>{customer?.userType}</td>
                      <td>
                        <div
                          onClick={() =>
                            handleIconPreview(customer?._id, customer?.userType)
                          }
                          className="flex items-center justify-center cursor-pointer"
                        >
                          <FaUserTie size={25} />
                        </div>
                      </td>
                      <td>
                        <div className="editIconWrap edit">
                          <Link
                            to={`/dashboard/${
                              customer?.userType === "customer"
                                ? "update-customer"
                                : customer?.userType === "company"
                                ? "update-company"
                                : "update-show-room"
                            }?id=${customer?._id}`}
                          >
                            <FaEdit className="editIcon" />
                          </Link>
                        </div>
                      </td>
                      <td>
                        <div
                          onClick={() => deletePackage(customer?._id)}
                          className="editIconWrap"
                        >
                          <FaTrashAlt className="deleteIcon" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination section */}
      <div className="flex justify-center mt-4">
        <Pagination
          count={totalPages}
          page={currentPage}
          color="primary"
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AllCustomerList;
