/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import {
  FaCarSide,
  FaFileInvoice,
  FaFileInvoiceDollar,
  FaPercent,
  FaUsers,
  FaWrench,
} from "react-icons/fa";
import { HiOutlineBriefcase } from "react-icons/hi";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import "./AllService.css";
import { useGetAllMetaQuery } from "../../../redux/api/meta.api";
import { AssuredWorkload } from "@mui/icons-material";
const AllServices = () => {
  const tenantDomain = window.location.hostname.split(".")[0];

  
  const {
    data: allMetaData,
    isLoading,
    isError,
  } = useGetAllMetaQuery({tenantDomain});


  if (isLoading) return <Loading />;

  return (
    <div className="dashBoardRight mt-5 lg:mt-0 ">
      <div className="md:flex items-center justify-between md:p-[0px] lg:p-[18px]"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center gap-10  mb-5">
        <div className="invoice-card">
          <Link to="/dashboard/complete-project">
            <div className="flex gap-x-3 mt-8 ietms-center justify-center ">
              <div className="  dashboardCardIconWrap">
                <HiOutlineBriefcase className="dashboardCardIcon" />
              </div>

              <div className="invoice-info">
                <h2 className="amount">
                  {allMetaData?.data?.statusSummary?.completed}
                </h2>
                <p className="label">Completed Services</p>
              </div>
            </div>

            <div class="wave-background">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                class="wave-svg"
              >
                <path
                  fill="#ffffff33"
                  fill-opacity="1"
                  d="M0,96L48,128C96,160,192,224,288,229.3C384,235,480,181,576,176C672,171,768,213,864,224C960,235,1056,213,1152,176C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>
          </Link>
        </div>

        <div className="invoice-card">
          <Link to="/dashboard/running-project">
            <div className="flex gap-x-3 mt-8 ietms-center justify-center ">
              <div className="  dashboardCardIconWrap2 ">
                <FaWrench className="dashboardCardIcon" />
              </div>

              <div className="invoice-info">
                <h2 className="amount">
                  {" "}
                  {allMetaData?.data?.statusSummary?.running}{" "}
                </h2>
                <p className="label">Running Services</p>
              </div>
            </div>

            <div class="wave-background">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                class="wave-svg"
              >
                <path
                  fill="#ffffff33"
                  fill-opacity="1"
                  d="M0,96L48,128C96,160,192,224,288,229.3C384,235,480,181,576,176C672,171,768,213,864,224C960,235,1056,213,1152,176C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>
          </Link>
        </div>

        <div className="invoice-card">
          <div className="flex gap-x-3 mt-8 ietms-center justify-center ">
            <div className="dashboardCardIconWrap3">
              <FaPercent className="dashboardCardIcon" />
            </div>

            <div className="invoice-info">
              <h2 className="amount">000 </h2>
              <p className="label">Total Sale </p>
            </div>
          </div>

          <div class="wave-background">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              class="wave-svg"
            >
              <path
                fill="#ffffff33"
                fill-opacity="1"
                d="M0,96L48,128C96,160,192,224,288,229.3C384,235,480,181,576,176C672,171,768,213,864,224C960,235,1056,213,1152,176C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="invoice-card">
          <div className="flex gap-x-3 mt-8 ietms-center justify-center ">
            <div className="  dashboardCardIconWrap4">
              <FaCarSide className="dashboardCardIcon" />
            </div>

            <div className="invoice-info">
              <h2 className="amount"> 000 </h2>
              <p className="label">Total Product </p>
            </div>
          </div>

          <div class="wave-background">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              class="wave-svg"
            >
              <path
                fill="#ffffff33"
                fill-opacity="1"
                d="M0,96L48,128C96,160,192,224,288,229.3C384,235,480,181,576,176C672,171,768,213,864,224C960,235,1056,213,1152,176C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center gap-10  mb-5">
        <div className="invoice-card invoice-card2">
          <div className="flex gap-x-3 mt-8 ietms-center justify-center ">
            <div className="  dashboardCardIconWrap">
              <AssuredWorkload className="dashboardCardIcon" />
            </div>

            <div className="invoice-info">
              <h2 className="amount">{allMetaData?.data?.totalAmount} ৳</h2>
              <p className="label">Total Amount </p>
            </div>
          </div>

          <div class="wave-background">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              class="wave-svg"
            >
              <path
                fill="#ffffff33"
                fill-opacity="1"
                d="M0,96L48,128C96,160,192,224,288,229.3C384,235,480,181,576,176C672,171,768,213,864,224C960,235,1056,213,1152,176C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>

        <div className="invoice-card invoice-card2">
          <div className="flex gap-x-3 mt-8 ietms-center justify-center ">
            <div className="  dashboardCardIconWrap5">
              <FaFileInvoice className="dashboardCardIcon" />
            </div>

            <div className="invoice-info">
              <h2 className="amount">{allMetaData?.data?.totalAdvance} ৳</h2>
              <p className="label">Paid Services Bill</p>
            </div>
          </div>

          <div class="wave-background">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              class="wave-svg"
            >
              <path
                fill="#ffffff33"
                fill-opacity="1"
                d="M0,96L48,128C96,160,192,224,288,229.3C384,235,480,181,576,176C672,171,768,213,864,224C960,235,1056,213,1152,176C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>

        <div className="invoice-card invoice-card2">
          <Link to="/dashboard/money-receipt-due">
            <div className="flex gap-x-3 mt-8 ietms-center justify-center ">
              <div className="  dashboardCardIconWrap6">
                <FaFileInvoiceDollar className="dashboardCardIcon" />
              </div>

              <div className="invoice-info">
                <h2 className="amount">
                  {" "}
                  {allMetaData?.data?.totalRemaining} ৳{" "}
                </h2>
                <p className="label">Due Service Bill</p>
              </div>
            </div>

            <div class="wave-background">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                class="wave-svg"
              >
                <path
                  fill="#ffffff33"
                  fill-opacity="1"
                  d="M0,96L48,128C96,160,192,224,288,229.3C384,235,480,181,576,176C672,171,768,213,864,224C960,235,1056,213,1152,176C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>
          </Link>
        </div>

        <div className="invoice-card invoice-card2">
          <Link to="/dashboard/all-customer">
            <div className="flex gap-x-3 mt-8 ietms-center justify-center ">
              <div className="  dashboardCardIconWrap7">
                <FaUsers className="dashboardCardIcon" />
              </div>

              <div className="invoice-info">
                <h2 className="amount">
                  {" "}
                  {allMetaData?.data?.totalCustomers +
                    allMetaData?.data?.totalShowRooms +
                    allMetaData?.data?.totalCompanies}
                </h2>
                <p className="label">All Customer </p>
              </div>
            </div>

            <div class="wave-background">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                class="wave-svg"
              >
                <path
                  fill="#ffffff33"
                  fill-opacity="1"
                  d="M0,96L48,128C96,160,192,224,288,229.3C384,235,480,181,576,176C672,171,768,213,864,224C960,235,1056,213,1152,176C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllServices;
