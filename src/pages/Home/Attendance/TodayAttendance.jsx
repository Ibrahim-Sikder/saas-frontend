/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
"use client";

import { HiOutlineEye } from "react-icons/hi";
import { FaRegTrashAlt, FaUserEdit } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { useGetAllEmployeesQuery } from "../../../redux/api/employee";
import {
  useDeleteAttendanceMutation,
  useGetAllAttendancesQuery,
  useGetTodayAttendanceQuery,
} from "../../../redux/api/attendance";
import Loading from "../../../components/Loading/Loading";

const TodayAttendance = () => {
  const [currentPage] = useState(1);
  const limit = 999;
  const allAttendanceLimit = 31;

  const {
    data: getAllEmployee,
    isLoading: employeesLoading,
    error: employeesError,
  } = useGetAllEmployeesQuery({
    limit,
    page: currentPage,
  });

  const {
    data: todayAttendance,
    isLoading: todayLoading,
    error: todayError,
    refetch,
  } = useGetTodayAttendanceQuery();

  const {
    data: allAttendance,
    isLoading: allAttendanceLoading,
    error: allAttendanceError,
  } = useGetAllAttendancesQuery({
    limit: allAttendanceLimit,
    page: currentPage,
  });

  const [deleteAttendance] = useDeleteAttendanceMutation();

  const parsedDate = new Date();
  const formattedDate = parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleDeleteAttendance = async (date) => {
    try {
      const response = await deleteAttendance({ date }).unwrap();
      if (response.success) {
        toast.success(response.message);
        refetch();
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while deleting the attendance"
      );
    }
  };

  if (todayLoading || employeesLoading || allAttendanceLoading) {
    return <Loading />;
  }

  if (todayError || employeesError || allAttendanceError) {
    toast.error("Failed to fetch attendance data");
    return (
      <div className="text-center text-red-500">
        Error loading attendance data
      </div>
    );
  }

  const presentPercentage = todayAttendance?.data?.presentPercentage || 0;
  const absentPercentage = todayAttendance?.data?.absentPercentage || 0;
  const latePercentage = todayAttendance?.data?.latePercentage || 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Today's Attendance
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AttendanceCard
          title="Present"
          value={todayAttendance?.data?.presentEntries}
          percentage={presentPercentage}
          color="#60BE6B"
        />
        <AttendanceCard
          title="Absent"
          value={todayAttendance?.data?.absentEntries}
          percentage={absentPercentage}
          color="#F62D51"
        />
        <AttendanceCard
          title="Late"
          value={todayAttendance?.data?.lateEntries}
          percentage={latePercentage}
          color="#FF851A"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-100 text-center ">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border">
                Present
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border">
                Absent
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border">
                Late
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {formattedDate}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                <div className="flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#E7F6EC] flex items-center justify-center">
                    <span className="text-[#60BF6B] font-medium">
                      {todayAttendance?.data?.presentEntries}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                <div className="flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#FFE9EC] flex items-center justify-center">
                    <span className="text-[#F62D51] font-medium">
                      {todayAttendance?.data?.absentEntries}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                <div className="flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#FFF6E3] flex items-center justify-center">
                    <span className="text-[#FF851A] font-medium">
                      {todayAttendance?.data?.lateEntries}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center justify-center space-x-3">
                  <Link
                    to={`/dashboard/update-attendance?date=${todayAttendance?.data?.date}`}
                    className="text-[#60BF6B] hover:text-[#4a9854] transition-colors"
                  >
                    <FaUserEdit size={18} />
                  </Link>
                  <button className="text-[#42A1DA] hover:text-[#3481ad] transition-colors">
                    <HiOutlineEye size={18} />
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteAttendance(todayAttendance?.data?.date)
                    }
                    className="text-[#F62D51] hover:text-[#d42544] transition-colors"
                  >
                    <FaRegTrashAlt size={18} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AttendanceCard = ({ title, value, percentage, color }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h4 className="text-lg font-semibold text-gray-700 mb-4">{title}</h4>
    <div className="flex items-center justify-between">
      <div style={{ width: 80, height: 80 }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            pathColor: color,
            textColor: color,
            trailColor: "#f3f4f6",
          })}
        />
      </div>
      <div className="text-4xl font-bold" style={{ color }}>
        {value}
      </div>
    </div>
  </div>
);

export default TodayAttendance;
