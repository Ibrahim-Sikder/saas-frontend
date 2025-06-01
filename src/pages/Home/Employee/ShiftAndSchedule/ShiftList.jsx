/* eslint-disable react/no-unescaped-entities */
import { HiOutlineTrash } from "react-icons/hi";
import "./ShiftAndSchedule.css";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import AddShiftModal from "./AddShiftModal";
import AssignShiftModal from "./AssignShiftModal";
const ShiftList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const shiftData = [
    {
      "Shift Name": "10'o clock Shift",
      "Min Start Time": "08.00:00 am",
      "Start Time": "09.00:00 am",
      "Max Start Time": "10.00:00 am",
      "Min End Time": "05.00:00 am",
      "End Time": "03.00:00 am",
      "Max End Time": "06.00:00 am",
      "Break Time": "30 mins",
      Status: "Active",
      Actions: [
        {
          Type: "Delete",
          Icon: "HiOutlineTrash",
        },
        {
          Type: "Edit",
          Icon: "FaEdit",
        },
      ],
    },
    {
      "Shift Name": "10'o clock Shift",
      "Min Start Time": "08.00:00 am",
      "Start Time": "09.00:00 am",
      "Max Start Time": "10.00:00 am",
      "Min End Time": "05.00:00 am",
      "End Time": "03.00:00 am",
      "Max End Time": "06.00:00 am",
      "Break Time": "30 mins",
      Status: "Active",
      Actions: [
        {
          Type: "Delete",
          Icon: "HiOutlineTrash",
        },
        {
          Type: "Edit",
          Icon: "FaEdit",
        },
      ],
    },
    {
      "Shift Name": "10'o clock Shift",
      "Min Start Time": "08.00:00 am",
      "Start Time": "09.00:00 am",
      "Max Start Time": "10.00:00 am",
      "Min End Time": "05.00:00 am",
      "End Time": "03.00:00 am",
      "Max End Time": "06.00:00 am",
      "Break Time": "30 mins",
      Status: "Active",
      Actions: [
        {
          Type: "Delete",
          Icon: "HiOutlineTrash",
        },
        {
          Type: "Edit",
          Icon: "FaEdit",
        },
      ],
    },
    {
      "Shift Name": "10'o clock Shift",
      "Min Start Time": "08.00:00 am",
      "Start Time": "09.00:00 am",
      "Max Start Time": "10.00:00 am",
      "Min End Time": "05.00:00 am",
      "End Time": "03.00:00 am",
      "Max End Time": "06.00:00 am",
      "Break Time": "30 mins",
      Status: "Active",
      Actions: [
        {
          Type: "Delete",
          Icon: "HiOutlineTrash",
        },
        {
          Type: "Edit",
          Icon: "FaEdit",
        },
      ],
    },
    {
      "Shift Name": "10'o clock Shift",
      "Min Start Time": "08.00:00 am",
      "Start Time": "09.00:00 am",
      "Max Start Time": "10.00:00 am",
      "Min End Time": "05.00:00 am",
      "End Time": "03.00:00 am",
      "Max End Time": "06.00:00 am",
      "Break Time": "30 mins",
      Status: "Active",
      Actions: [
        {
          Type: "Delete",
          Icon: "HiOutlineTrash",
        },
        {
          Type: "Edit",
          Icon: "FaEdit",
        },
      ],
    },
    {
      "Shift Name": "10'o clock Shift",
      "Min Start Time": "08.00:00 am",
      "Start Time": "09.00:00 am",
      "Max Start Time": "10.00:00 am",
      "Min End Time": "05.00:00 am",
      "End Time": "03.00:00 am",
      "Max End Time": "06.00:00 am",
      "Break Time": "30 mins",
      Status: "Active",
      Actions: [
        {
          Type: "Delete",
          Icon: "HiOutlineTrash",
        },
        {
          Type: "Edit",
          Icon: "FaEdit",
        },
      ],
    },
    {
      "Shift Name": "10'o clock Shift",
      "Min Start Time": "08.00:00 am",
      "Start Time": "09.00:00 am",
      "Max Start Time": "10.00:00 am",
      "Min End Time": "05.00:00 am",
      "End Time": "03.00:00 am",
      "Max End Time": "06.00:00 am",
      "Break Time": "30 mins",
      Status: "Active",
      Actions: [
        {
          Type: "Delete",
          Icon: "HiOutlineTrash",
        },
        {
          Type: "Edit",
          Icon: "FaEdit",
        },
      ],
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mt-10 mb-5">
        <div>
          <h3 className="text-2xl font-semibold">Shift and Schedule </h3>
          <span>Dashboard / Employees / Shift & Schedule </span>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={handleOpen2} className="shiftBtn">
            Assign Shift{" "}
          </button>
          <button onClick={handleOpen} className="shiftBtn">Add Shift </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="leaveTable min-w-full">
          <thead>
            <tr>
              <th> Shift Name </th>
              <th> Min Start Time </th>
              <th>Start Time </th>
              <th>Max Start Time </th>
              <th>Min End Time </th>
              <th> End Time </th>
              <th>Max End Time </th>
              <th>Break Time</th>
              <th>Status </th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {shiftData.map((shift, i) => (
              <tr key={shift.id}>
                <td>{i + 1}</td>
                <td>10'o clock Shift </td>
                <td>08.00:00 am</td>
                <td>09.00:00 am</td>
                <td>10.00:00 am</td>
                <td>05.00:00 am</td>
                <td>03.00:00 am</td>
                <td>30 mins</td>
                <td>
                  <button className="rounded-full bg-white text-black border px-5 py-1 ">
                    Active
                  </button>
                </td>

                <td>
                  <div className="flex items-center justify-center">
                    <FaEdit className="size-5 text-[#42A1DA]" />
                  </div>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <HiOutlineTrash className="size-5 text-red-500" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && <AddShiftModal onClose={handleClose} />}
      {open2 && <AssignShiftModal onClose={handleClose2} />}
    </div>
  );
};

export default ShiftList;
