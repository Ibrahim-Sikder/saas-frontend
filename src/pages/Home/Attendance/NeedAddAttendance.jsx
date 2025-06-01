/* eslint-disable no-loss-of-precision */
/* eslint-disable no-unused-vars */
import { HiCheck } from "react-icons/hi";
import "./Attendance.css";
import { useState } from "react";
import { toast } from "react-toastify";
import AttendanceTimePicker from "./AttendanceTimePicker";
import dayjs from "dayjs";
import AttendanceOutTimePicker from "./AttendanceForOutTime";
import { useGetAllEmployeesQuery } from "../../../redux/api/employee";
import {
  useCreateAttendanceMutation,
  useDeleteAttendanceMutation,
} from "../../../redux/api/attendance";
import { Close } from "@mui/icons-material";
import AttendanceList from "./AttendanceList";
import TodayAttendance from "./TodayAttendance";
import { Checkbox } from "@mui/material";
const AddAttendance = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 99999999999999999;

  const {
    data: getAllEmployee,
    isLoading: employeesLoading,
    error: employeesError,
  } = useGetAllEmployeesQuery({
    limit,
    page: currentPage,
  });

  const [createAttendance, { isLoading: createLoading, error: createError }] =
    useCreateAttendanceMutation();

  const [deleteAttendance, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteAttendanceMutation();

  const [presentState, setPresentState] = useState(
    new Array(getAllEmployee?.data?.employees?.length).fill(false)
  );
  const [absentState, setAbsentState] = useState(
    new Array(getAllEmployee?.data?.employees?.length).fill(false)
  );
  const [inTime, setInTime] = useState(
    new Array(getAllEmployee?.data?.employees?.length).fill(null)
  );
  const [outTime, setOutTime] = useState(
    new Array(getAllEmployee?.data?.employees?.length).fill(null)
  );
  const [overtime, setOvertime] = useState(
    new Array(getAllEmployee?.data?.employees?.length).fill(null)
  );
  const [lateStatus, setLateStatus] = useState(
    new Array(getAllEmployee?.data?.employees?.length).fill(false)
  );

  const parsedDate = new Date();
  const day = parsedDate.getDate().toString().padStart(2, "0");
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = parsedDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  // Function to format the time
  const formatTime = (time) => {
    if (!time) return "";
    return dayjs(time).format("h:mmA");
  };

  const handlePresent = (index) => {
    const newPresentState = [...presentState];
    const newAbsentState = [...absentState];

    // Toggle present state
    newPresentState[index] = !newPresentState[index];

    // If present checkbox is checked, uncheck absent checkbox
    if (newPresentState[index]) {
      newAbsentState[index] = false;
    }

    // Update states
    setPresentState(newPresentState);
    setAbsentState(newAbsentState);
  };

  // Handler for absent checkbox
  const handleAbsent = (index) => {
    const newAbsentState = [...absentState];
    const newPresentState = [...presentState];

    // Toggle absent state
    newAbsentState[index] = !newAbsentState[index];

    // If absent checkbox is checked, uncheck present checkbox
    if (newAbsentState[index]) {
      newPresentState[index] = false;
    }

    // Update states
    setAbsentState(newAbsentState);
    setPresentState(newPresentState);
  };

  const handleAttendanceInTime = (index, time) => {
    const formattedTime = formatTime(time);
    setInTime((prevSelectedTimes) => {
      const updatedSelectedTimes = [...prevSelectedTimes];
      updatedSelectedTimes[index] = formattedTime;
      return updatedSelectedTimes;
    });
  };

  const handleAttendanceOutTime = (index, value) => {
    const formattedTime = formatTime(value);
    setOutTime((prevSelectedTimes) => {
      const updatedSelectedTimes = [...prevSelectedTimes];
      updatedSelectedTimes[index] = formattedTime;
      return updatedSelectedTimes;
    });
  };
  const handleAttendanceOvertime = (index, value) => {
    const newOvertime = [...overtime];
    newOvertime[index] = value;
    setOvertime(newOvertime);
  };

  const handleLate = (index, value) => {
    const newLateState = [...lateStatus];
    newLateState[index] = value;
    setLateStatus(newLateState);
  };

  const handleSubMitAttendance = async () => {
    const newAttendanceData = getAllEmployee?.data?.employees?.map(
      (employee, index) => {
        return {
          employee: employee._id,
          full_name: employee.full_name,
          employeeId: employee.employeeId,
          status: employee.status,
          designation: employee.designation,
          date: formattedDate,
          office_time: "10.00",
          present: presentState[index],
          absent: absentState[index],
          in_time: inTime[index],
          out_time: outTime[index],
          overtime: overtime[index],
          late_status: lateStatus[index],
        };
      }
    );

    try {
      const response = await createAttendance(newAttendanceData).unwrap();

      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handlePresentCange = (e) => {};

  return (
    <div className="pt-8 pb-20">
      <div className="flex items-center justify-between my-3 mb-8">
        <div className="flex items-center justify-center ">
          <div className="ml-2">
            <h3 className="text-2xl font-bold"> Attendance </h3>
            <span> Dashboard / Attendance </span>
          </div>
        </div>
      </div>
      <div className=" attendanceWraps overflow-x-auto">
        <table className="attendanceInputTable">
          <thead>
            <tr>
              <th>SL No</th>
              <th>Name</th>
              <th>ID</th>
              <th>Designation</th>
              <th>Date</th>
              <th>Present</th>
              <th>Absence</th>
              <th>Office Time</th>
              <th>In Time</th>
              <th>Out Time</th>
              <th>Overtime</th>
              <th>Late</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(getAllEmployee?.data?.employees) &&
              getAllEmployee?.data?.employees?.map((employee, index) => (
                <tr
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                  key={employee._id}
                >
                  <td>{index + 1}</td>
                  <td>{employee.full_name}</td>
                  <td>{employee.employeeId}</td>
                  <td>{employee.designation}</td>
                  <td>{formattedDate}</td>
                  <td>
                    <Checkbox
                      className="border w-5 h-5"
                      onChange={handlePresentCange}
                      onClick={() => handlePresent(index)}
                      checked={presentState[index]}
                      value={`someValue-${index}`}
                      defaultChecked
                    />
                  </td>
                  <td>
                    <Checkbox
                      type="checkbox"
                      className="border w-5 h-5"
                      onClick={() => handleAbsent(index)}
                      checked={absentState[index]}
                      defaultChecked
                    />
                  </td>
                  <td>10.00</td>
                  <td>
                    <AttendanceTimePicker
                      handleAttendanceInTime={handleAttendanceInTime}
                      index={index}
                    />
                  </td>
                  <td>
                    <AttendanceOutTimePicker
                      handleAttendanceOutTime={handleAttendanceOutTime}
                      index={index}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="border overTimeInput"
                      onChange={(e) =>
                        handleAttendanceOvertime(index, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {presentState[index] ? (
                      <div className="flex items-center justify-center cursor-pointer">
                        <HiCheck
                          className="text-[#4AB657] attendanceIcon"
                          size={20}
                          onClick={() => handleLate(index, false)}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center cursor-pointer">
                        <Close
                          className="text-[#FF0000] attendanceIcon"
                          size={20}
                          onClick={() => handleLate(index, true)}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-3">
          {" "}
          <button
            disabled={createLoading}
            onClick={handleSubMitAttendance}
            className="bg-[#42A1DA] text-white px-3 py-2 rounded-sm"
            type="submit"
          >
            Submit Attendance
          </button>
        </div>
      </div>

      <TodayAttendance />
      <AttendanceList />
    </div>
  );
};

export default AddAttendance;
