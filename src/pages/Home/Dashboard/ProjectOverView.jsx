import { FaCarSide, FaFileInvoice } from "react-icons/fa";
import {
  HiOutlineBriefcase,
  HiOutlineUserGroup,
  HiOutlineUsers,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import ExpanseIncomeChart from "../../../components/Chart/ExpanseIncomeChart";
import Loading from "../../../components/Loading/Loading";
import { useGetAllMetaQuery } from "../../../redux/api/meta.api";

const ProjectOverView = () => {
  const { data: allMetaData, isLoading, isError } = useGetAllMetaQuery({});
  if (isError) return <h2>Oops! Data not found.</h2>;
  if (isLoading) return <Loading />;

  const userData = [
    {
      id: 2,
      name: "Customers",
      user: allMetaData?.data?.totalCustomers,
    },
    {
      id: 1,
      name: "Show Room ",
      user: allMetaData?.data?.totalShowRooms,
    },

    {
      id: 3,
      name: "Company",
      user: allMetaData?.data?.totalCompanies,
    },

    {
      id: 5,
      name: "Job Card",
      user: allMetaData?.data?.totalJobCard,
    },
    {
      id: 6,
      name: " Quotation",
      user: allMetaData?.data?.totalQuotation,
    },
    {
      id: 6,
      name: "Invoice",
      user: allMetaData?.data?.totalInvoice,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1  xl:grid-cols-2 gap-5  sectionMargin place-content-center justify-content-center ">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4
        5"
        >
          {userData?.map((data, i) => (
            <div key={data.id}>
              <Link
                to={
                  i == 0
                    ? `${`/dashboard/customer-list`}`
                    : i == 1
                    ? `${`/dashboard/show-room-list`}`
                    : i == 2
                    ? `${`/dashboard/company-list`}`
                    : i == 3
                    ? `${`/dashboard/jobcard-list`}`
                    : i == 4
                    ? `${`/dashboard/quotation-list`}`
                    : i == 5
                    ? `${`/dashboard/invoice-view`}`
                    : i == 2
                    ? `${`/dashboard/company-list`}`
                    : null
                }
              >
                <div className="dashboardCard">
                  <div className="dashboardIconWrap">
                    {i == 0 ? (
                      <HiOutlineUserGroup className="dashboardIcon" size={50} />
                    ) : i == 1 ? (
                      <HiOutlineUsers className="dashboardIcon" size={50} />
                    ) : i == 2 ? (
                      <HiOutlineUsers className="dashboardIcon" size={50} />
                    ) : i == 3 ? (
                      <HiOutlineBriefcase className="dashboardIcon" size={50} />
                    ) : i == 4 ? (
                      <FaCarSide className="dashboardIcon" size={50} />
                    ) : i == 5 ? (
                      <FaFileInvoice className="dashboardIcon" size={50} />
                    ) : null}
                  </div>
                  <div className="mt-2">
                    <span>{data.user}</span>
                    <h2 className="mt-2">{data.name}</h2>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <>
          <ExpanseIncomeChart />
        </>
      </div>
      <h3 className="text-3xl font-bold flex justify-end mr-20 lg:mr-72">
        Project Overview
      </h3>
    </>
  );
};

export default ProjectOverView;
