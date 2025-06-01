/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Pagination } from "@mui/material";
import { useGetSalaryForProfileQuery } from "../../../../redux/api/salary";
import "../Employee.css";

import "../Employee.css";
import { useState } from "react";
import Loading from "../../../../components/Loading/Loading";

const EmployeeSalary = ({ id }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetSalaryForProfileQuery({
    id,
    limit,
    page: currentPage,
  });
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="table-container">
      <table className="leaveTable">
        <thead>
          <tr>
            <th>Month of Salary</th>
            <th>Bonus </th>
            <th>Overtime Salary </th>
            <th>Amount of Salary </th>
            <th>Total Payment </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.salaries?.map((salary) => (
            <tr key={salary._id}>
              <td>{salary?.month_of_salary}</td>
              <td>৳{salary?.bonus}</td>
              <td>৳{salary?.overtime_amount} </td>
              <td>৳{salary?.salary_amount}</td>
              <td>৳{salary?.total_payment}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data?.data?.salaries?.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination
            count={data?.data?.meta?.totalPages}
            page={currentPage}
            color="primary"
            onChange={(_, page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default EmployeeSalary;
