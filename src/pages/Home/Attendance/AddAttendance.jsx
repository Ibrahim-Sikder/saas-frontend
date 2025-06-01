/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-refresh/only-export-components */
"use client"

/* eslint-disable no-loss-of-precision */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import { toast } from "react-toastify"
import dayjs from "dayjs"
import {
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Save,
  Search,
  UserCheck,
  UserX,
  Timer,
} from "lucide-react"
import AttendanceTimePicker from "./AttendanceTimePicker"
import AttendanceOutTimePicker from "./AttendanceForOutTime"
import { useGetAllEmployeesQuery } from "../../../redux/api/employee"
import { useCreateAttendanceMutation, useDeleteAttendanceMutation } from "../../../redux/api/attendance"
import TodayAttendance from "./TodayAttendance"
import AttendanceList from "./AttendanceList"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Box,
  TextField,
  Paper,
  Avatar,
  Tooltip,
  CircularProgress,
  Chip,
} from "@mui/material"

export const columns = [
  "SL No",
  "Employee",
  "ID",
  "Designation",
  "Date",
  "Present",
  "Absence",
  "Office Time",
  "In Time",
  "Out Time",
  "Overtime",
  "Late",
]

const AddAttendance = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const limit = 9999

  const {
    data: getAllEmployee,
    isLoading: employeesLoading,
    error: employeesError,
  } = useGetAllEmployeesQuery({
    limit,
    page: currentPage,
  })

  const [createAttendance, { isLoading: createLoading, error: createError }] = useCreateAttendanceMutation()

  const [deleteAttendance, { isLoading: deleteLoading, error: deleteError }] = useDeleteAttendanceMutation()

  const [presentState, setPresentState] = useState(new Array(getAllEmployee?.data?.employees?.length).fill(false))
  const [absentState, setAbsentState] = useState(new Array(getAllEmployee?.data?.employees?.length).fill(false))
  const [inTime, setInTime] = useState(new Array(getAllEmployee?.data?.employees?.length).fill(null))
  const [outTime, setOutTime] = useState(new Array(getAllEmployee?.data?.employees?.length).fill(null))
  const [overtime, setOvertime] = useState(new Array(getAllEmployee?.data?.employees?.length).fill(null))
  const [lateStatus, setLateStatus] = useState(new Array(getAllEmployee?.data?.employees?.length).fill(false))

  const parsedDate = new Date()
  const day = parsedDate.getDate().toString().padStart(2, "0")
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0")
  const year = parsedDate.getFullYear()
  const formattedDate = `${day}-${month}-${year}`

  // Function to format the time
  const formatTime = (time) => {
    if (!time) return ""
    return dayjs(time).format("h:mmA")
  }

  const handlePresent = (index) => {
    const newPresentState = [...presentState]
    const newAbsentState = [...absentState]

    // Toggle present state
    newPresentState[index] = !newPresentState[index]

    // If present checkbox is checked, uncheck absent checkbox
    if (newPresentState[index]) {
      newAbsentState[index] = false
    }

    // Update states
    setPresentState(newPresentState)
    setAbsentState(newAbsentState)
  }

  // Handler for absent checkbox
  const handleAbsent = (index) => {
    const newAbsentState = [...absentState]
    const newPresentState = [...presentState]

    // Toggle absent state
    newAbsentState[index] = !newAbsentState[index]

    // If absent checkbox is checked, uncheck present checkbox
    if (newAbsentState[index]) {
      newPresentState[index] = false
    }

    // Update states
    setAbsentState(newAbsentState)
    setPresentState(newPresentState)
  }

  const handleAttendanceInTime = (index, time) => {
    const formattedTime = formatTime(time)
    setInTime((prevSelectedTimes) => {
      const updatedSelectedTimes = [...prevSelectedTimes]
      updatedSelectedTimes[index] = formattedTime
      return updatedSelectedTimes
    })
  }

  const handleAttendanceOutTime = (index, value) => {
    const formattedTime = formatTime(value)
    setOutTime((prevSelectedTimes) => {
      const updatedSelectedTimes = [...prevSelectedTimes]
      updatedSelectedTimes[index] = formattedTime
      return updatedSelectedTimes
    })
  }

  const handleAttendanceOvertime = (index, value) => {
    const newOvertime = [...overtime]
    newOvertime[index] = value
    setOvertime(newOvertime)
  }

  const handleLate = (index, value) => {
    const newLateState = [...lateStatus]
    newLateState[index] = value
    setLateStatus(newLateState)
  }

  const handleSubMitAttendance = async () => {
    const newAttendanceData = getAllEmployee?.data?.employees?.map((employee, index) => {
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
      }
    })

    try {
      const response = await createAttendance(newAttendanceData).unwrap()

      if (response.success) {
        toast.success(response.message)
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong")
    }
  }

  // Calculate attendance statistics
  const totalEmployees = getAllEmployee?.data?.employees?.length || 0
  const presentCount = presentState.filter(Boolean).length
  const absentCount = absentState.filter(Boolean).length
  const lateCount = lateStatus.filter(Boolean).length

  // Filter employees based on search term
  const filteredEmployees = getAllEmployee?.data?.employees?.filter(
    (employee) =>
      employee.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (employeesLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress color="primary" />
        <span className="ml-2 text-gray-600">Loading employee data...</span>
      </div>
    )
  }

  if (employeesError) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <AlertTriangle className="mr-2" />
        Error loading employee data. Please try again.
      </div>
    )
  }

  return (
    <div className="pt-8 pb-20 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 px-6">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-3 rounded-lg shadow-lg">
            <UserCheck className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-indigo-500 bg-clip-text text-transparent">
              Attendance Management
            </h3>
            <div className="flex items-center text-slate-500 text-sm">
              <span>Dashboard</span>
              <span className="mx-2">/</span>
              <span className="text-indigo-600">Attendance</span>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-0">
          <div className="text-sm text-slate-500 mb-1">Today's Date</div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <Calendar className="h-4 w-4 text-indigo-500" />
            <span className="font-medium text-slate-700">{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 px-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-indigo-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Employees</p>
            <h4 className="text-3xl font-bold text-indigo-600">{totalEmployees}</h4>
          </div>
          <div className="bg-indigo-100 p-3 rounded-full">
            <Users className="h-6 w-6 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Present</p>
            <h4 className="text-3xl font-bold text-green-600">{presentCount}</h4>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Absent</p>
            <h4 className="text-3xl font-bold text-red-600">{absentCount}</h4>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <UserX className="h-6 w-6 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-amber-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Late</p>
            <h4 className="text-3xl font-bold text-amber-600">{lateCount}</h4>
          </div>
          <div className="bg-amber-100 p-3 rounded-full">
            <Clock className="h-6 w-6 text-amber-600" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search employees by name, ID or designation..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Office Time:</span>
              <span className="font-medium text-indigo-600">10:00 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="px-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <TableContainer component={Paper} elevation={0}>
              <Table aria-label="employee attendance table">
                <TableHead>
                  <TableRow>
                    {columns.map((column, index) => (
                      <TableCell
                        key={index}
                        sx={{
                          backgroundColor: index === 0 ? "#4f46e5" : `rgba(79, 70, 229, ${1 - index * 0.07})`,
                          color: index < 8 ? "white" : index < 10 ? "#1e1b4b" : "#1e1b4b",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          padding: "16px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {column}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(filteredEmployees) &&
                    filteredEmployees.map((employee, index) => (
                      <TableRow
                        key={employee._id}
                        sx={{
                          backgroundColor: index % 2 === 0 ? "#f8fafc" : "white",
                          "&:hover": {
                            backgroundColor: "#eef2ff",
                          },
                          transition: "background-color 0.2s",
                        }}
                      >
                        <TableCell>
                          <div className="font-medium text-gray-900">{index + 1}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar
                              sx={{
                                width: 36,
                                height: 36,
                                backgroundColor: `hsl(${index * 40}, 70%, 50%)`,
                                fontSize: "0.875rem",
                              }}
                            >
                              {employee.full_name.charAt(0)}
                            </Avatar>
                            <div className="font-medium text-gray-900">{employee.full_name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={employee.employeeId}
                            size="small"
                            sx={{
                              backgroundColor: "#eef2ff",
                              color: "#4f46e5",
                              fontWeight: 500,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-600">{employee.designation}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-indigo-500" />
                            <span>{formattedDate}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            onChange={() => handlePresent(index)}
                            checked={presentState[index]}
                            sx={{
                              color: "#22c55e",
                              "&.Mui-checked": {
                                color: "#22c55e",
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            onChange={() => handleAbsent(index)}
                            checked={absentState[index]}
                            sx={{
                              color: "#ef4444",
                              "&.Mui-checked": {
                                color: "#ef4444",
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-indigo-500" />
                            <span>10:00 AM</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <AttendanceTimePicker handleAttendanceInTime={handleAttendanceInTime} index={index} />
                        </TableCell>
                        <TableCell>
                          <AttendanceOutTimePicker handleAttendanceOutTime={handleAttendanceOutTime} index={index} />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            variant="outlined"
                            size="small"
                            placeholder="Hours"
                            onChange={(e) => handleAttendanceOvertime(index, e.target.value)}
                            InputProps={{
                              startAdornment: <Timer className="h-4 w-4 text-gray-400 mr-1" />,
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {presentState[index] ? (
                            <Tooltip title="Mark as Late">
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                }}
                              >
                                <div
                                  onClick={() => handleLate(index, true)}
                                  className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition-colors"
                                >
                                  <XCircle className="text-green-600" size={20} />
                                </div>
                              </Box>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Mark as On Time">
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                }}
                              >
                                <div
                                  onClick={() => handleLate(index, false)}
                                  className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors"
                                >
                                  <CheckCircle className="text-red-600" size={20} />
                                </div>
                              </Box>
                            </Tooltip>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div className="flex justify-end p-6">
            <button
              disabled={createLoading}
              onClick={handleSubMitAttendance}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md flex items-center gap-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              type="submit"
            >
              {createLoading ? <CircularProgress size={20} color="inherit" /> : <Save className="h-5 w-5" />}
              Submit Attendance
            </button>
          </div>
        </div>
      </div>

      {/* Today's Attendance and Attendance List */}
      <div className="mt-12">
        <TodayAttendance />
      </div>
      <div className="mt-12">
        <AttendanceList />
      </div>
    </div>
  )
}

export default AddAttendance

