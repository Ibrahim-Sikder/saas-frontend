/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { FaTrashAlt, FaEdit, FaUserTie } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Diversity3 } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import swal from "sweetalert";
import Loading from "../../../components/Loading/Loading";
import { HiOutlineSearch } from "react-icons/hi";
import { Chip, Pagination, Tooltip } from "@mui/material";
import {
  useGetAllCustomersQuery,
  useMoveRecycledCustomerMutation,
} from "../../../redux/api/customerApi";
import { toast } from "react-toastify";
import EmptyData from "../../../components/EmptyData/EmptyData";
const CustomerListTable = () => {
  const textInputRef = useRef(null);
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");
  const [filterType, setFilterType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const limit = 10;
  
const isLocalhost = window.location.hostname.includes("localhost");
let tenantDomain = "";
if (isLocalhost) {
  tenantDomain = window.location.hostname.split(".").slice(0, 2).join(".");
} else {
  tenantDomain = window.location.hostname.split(".")[0];
}
  const {
    data: customerData,
    isLoading: customerLoading,
    error: customerError,
    refetch,
  } = useGetAllCustomersQuery({
    tenantDomain,
    limit,
    page: currentPage,
    searchTerm: filterType,
    isRecycled: false,
  });

  const [
    moveRecycledCustomer,
    { isLoading: customerDeleteLoading, error: deleteError },
  ] = useMoveRecycledCustomerMutation();

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/customer-profile?id=${e}`);
  };

  const handleMoveToRecyled = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: " You want to move  this Customer Recycle Bin?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await moveRecycledCustomer({ tenantDomain: domain, id }).unwrap();
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

  if (deleteError) {
    toast.error(error?.message);
  }

  const handleAllCustomer = () => {
    setFilterType("");
    if (textInputRef.current) {
      textInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (search) {
      setFilterType(search);
    }
  }, [search]);

  return (
    <div className="w-full mt-5 mb-24">
      <div className="flex-wrap flex items-center justify-center   md:justify-between mb-5 py-5 px-3">
        <h3 className="mb-3 text-xl md:text-3xl font-bold"> Customer List:</h3>
        <div className="flex items-center">
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
          <button
            className="bg-[#42A1DA] text-white px-2 py-2 rounded-md ml-1"
            disabled={filterType === ""}
          >
            {" "}
            <HiOutlineSearch size={25} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto ">
        {customerLoading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : (
          <div>
            {customerData?.data?.customers?.length === 0 ? (
              <EmptyData
                icon={Diversity3}
                title="No Customer Found"
                message="We couldn't find any customer matching your search criteria."
                subMessage="Try adjusting your filters or add a new customer."
              />
            ) : (
              <>
                <section className="tableContainer overflow-x-auto">
                  <table className="customTable">
                    <thead>
                      <tr>
                        <th>SL No </th>
                        <th>Customer ID </th>
                        <th>Customer Name</th>
                        <th>Veichle User Name</th>
                        <th>Car Number </th>
                        {/* <th>Mileage History</th> */}
                        <th>Mobile Number</th>
                        <th>Vehicle Name </th>
                        <th colSpan={3}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerData?.data?.customers?.map((card, index) => {
                        console.log(card);
                        const lastVehicle = card?.vehicles
                          ? [...card.vehicles].sort(
                              (a, b) =>
                                new Date(b.createdAt) - new Date(a.createdAt)
                            )[0]
                          : null;

                        const globalIndex =
                          (customerData?.data?.meta?.currentPage - 1) * limit +
                          (index + 1);
                        return (
                          <tr
                            key={card?._id}
                            className={` transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-100 hover:text-black`}
                          >
                            <td>{globalIndex}</td>
                            <td>{card?.customerId}</td>
                            <td>{card?.customer_name}</td>
                            <td>{card?.vehicle_username}</td>
                            <td>
                              {card?.vehicles.map((vehicle, index) => (
                                <span key={index}>
                                  {vehicle.carReg_no}{" "}
                                  {vehicle.car_registration_no}
                                </span>
                              ))}
                            </td>

                            {/* <td>
                              {card?.vehicles?.slice(0,1)?.map((vehicle, idx) => (
                                <div key={idx} className="flex flex-wrap gap-1">
                                  {vehicle?.mileageHistory?.length > 0 ? (
                                    vehicle.mileageHistory.map(
                                      (history, historyIdx) => (
                                        <Tooltip
                                          key={historyIdx}
                                          title={new Date(
                                            history.date
                                          ).toLocaleDateString()}
                                          arrow
                                        >
                                          <Chip
                                            bg="primary"
                                            color="primary"
                                            label={`${history.mileage} km`}
                                            size="small"
                                            variant="outlined"
                                            sx={mileageStyle}
                                          />
                                        </Tooltip>
                                      )
                                    )
                                  ) : (
                                    <span>No mileage data</span>
                                  )}
                                </div>
                              ))}
                            </td> */}

                            <td>{card?.fullCustomerNum}</td>

                            <td>{lastVehicle?.vehicle_name}</td>

                            <td>
                              <div
                                onClick={() => handleIconPreview(card?._id)}
                                className="flex items-center justify-center cursor-pointer"
                              >
                                <FaUserTie size={25} className="" />
                              </div>
                            </td>

                            <td>
                              <div className="editIconWrap edit">
                                <Link
                                  to={`/dashboard/update-customer?id=${card?._id}`}
                                >
                                  <FaEdit className="editIcon" />
                                </Link>
                              </div>
                            </td>
                            <td>
                              <div
                                onClick={() => handleMoveToRecyled(card?._id)}
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
                </section>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          count={customerData?.data?.meta?.totalPages}
          page={currentPage}
          color="primary"
          onChange={(_, page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default CustomerListTable;
