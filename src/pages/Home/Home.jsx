/* eslint-disable no-unused-vars */
import "./Home.css";
import MonthlyBarChart from "../../components/Chart/MonthlyBarChart";
import YearlyIncomeChart from "../../components/Chart/YearlyIncomeChart";
import AllServices from "./Dashboard/AllServices";
import ProfitOverView from "./Dashboard/ProfitOverView";
import ProjectOverView from "./Dashboard/ProjectOverView";
import RecentClient from "./Dashboard/RecentClient";
import RecentProject from "./Dashboard/RecentProject";
import RcentQuotation from "./Dashboard/RcentQuotation";
import RecentInvoice from "./Dashboard/RecentInvoice";
import EmployeeStatistics from "./Dashboard/EmployeeStatistics";

import { useTenantDomain } from "../../hooks/useTenantDomain";
import { useGetAllMetaQuery } from "../../redux/api/meta.api";
import DashboardSummary from "./Dashboard/IncomeCard";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const tenantDomain = useTenantDomain();
  const {
    data: allMetaData,
    isLoading,
    isError,
  } = useGetAllMetaQuery({ tenantDomain });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mt-10 ">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="md:text-3xl font-bold">Welcome Admin !</h3>
          <span className="text-sm">Home / Dashboard</span>
        </div>
      </div>
      <AllServices />
      <DashboardSummary data={allMetaData?.data} />

      <div className="flex xl:flex-nowrap flex-wrap sectionMargin  ">
        <MonthlyBarChart />
        <YearlyIncomeChart />
      </div>
      <div className="hidden  lg:flex items-center justify-between px-10 mt-10">
        <h3 className="text-xl md:text-3xl font-semibold">
          Monthly Income Chart
        </h3>
        <h3 className="text-xl md:text-3xl font-semibold monthlyTitle">
          Yearly Income Chart
        </h3>
      </div>
      <ProfitOverView />
      <ProjectOverView />

      <div className="recentCardWrap gap-5  xl:flex justify-between sectionMargin">
        <RecentClient />
        <RecentProject />
      </div>

      <div className="xl:flex gap-5 justify-between mt-[30px]">
        <RcentQuotation />
        <RecentInvoice />
      </div>
      <EmployeeStatistics />
    </div>
  );
};

export default Home;
