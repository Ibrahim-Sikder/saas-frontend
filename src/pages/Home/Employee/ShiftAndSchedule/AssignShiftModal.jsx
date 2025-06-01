/* eslint-disable react/prop-types */
import { IoCloseSharp } from "react-icons/io5";
import ShiftTimePicker from "./ShiftTimePicker";
import { useState } from "react";
import Select from "react-select";
import TADatePicker from "../../../../components/form/TADatePicker";

const weekDays = [
  { value: "Sunday", label: "Sunday" },
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Saturday", label: "Saturday" },
];

const initialSelectedOption = weekDays[0];
const AssignShiftModal = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black/60 backdrop-blur-sm ">
      <div className="relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full md:w-[470px]  lg:w-[880px]  h-[1000px] overflow-auto ">
        <div className="bg-white shadow-md dark:bg-[#12141D] rounded-xl  overflow-hidden p-10">
          <div className="flex justify-end ">
            <IoCloseSharp
              size={25}
              onClick={onClose}
              width={24}
              height={24}
              className="text-white rounded-full cursor-pointer top-10 right-10 bg-[#A0A0A0] p-1"
            />
          </div>
          <h2 className="text-sm mb-5 md:text-2xl font-semibold text-center ">
            Assign Shift{" "}
          </h2>
          <div className="space-y-7">
            
            <div className="flex items-center justify-between w-full ">
              <div>
                <div className="flex">
                  <label className="block mb-1">Department </label>
                  <span className="ml-1 text-red-600">*</span>
                </div>
                <Select
                  className="assignShift"
                  value={selectedOption}
                  onChange={handleChange}
                  options={weekDays}
                />
              </div>
              <div>
                <div className="flex">
                  <label className="block mb-1">Employee Name </label>
                  <span className="ml-1 text-red-600">*</span>
                </div>
                <Select
                  className="assignShift"
                  value={selectedOption}
                  onChange={handleChange}
                  options={weekDays}
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-full ">
              <div>
              <div>
              <div className="flex items-center ">
                  <label className="block">Date  </label>
                  <span className="ml-1 text-red-600">*</span>
                </div>

                <TADatePicker />
              </div>
              </div>
              <div>
                <div className="flex">
                  <label className="block mb-1">Shift </label>
                  <span className="ml-1 text-red-600">*</span>
                </div>
                <Select
                  className="assignShift"
                  value={selectedOption}
                  onChange={handleChange}
                  options={weekDays}
                />
              </div>
            </div>
           
            <div className="flex items-center justify-between ">
              <div>
                <div className="flex">
                  <label className="block mb-1">Min Start Time </label>
                  <span className="ml-1 text-red-600">*</span>
                </div>

                <ShiftTimePicker />
              </div>
              <div>
                <div className="flex">
                  <label className="block mb-1"> Start Time </label>
                  <span className="ml-1 text-red-600">*</span>
                </div>

                <ShiftTimePicker />
              </div>
              <div>
                <div className="flex">
                  <label className="block mb-1"> Max Start Time </label>
                  <span className="ml-1 text-red-600">*</span>
                </div>

                <ShiftTimePicker />
              </div>
            </div>

            <div className="flex items-center justify-between ">
              <div>
                <div className="flex">
                  <label className="block mb-1"> End Time </label>
                  <span className="ml-1 text-red-600">*</span>
                </div>

                <ShiftTimePicker />
              </div>
              <div>
                <div className="flex">
                  <label className="block mb-1">Max Start Time </label>
                  <span className="ml-1 text-red-600">*</span>
                </div>

                <ShiftTimePicker />
              </div>
              <div>
                <div className="flex">
                  <label className="block mb-1">Min End Time </label>
                  <span className="ml-1 text-red-600">*</span>
                </div>

                <ShiftTimePicker />
              </div>
            </div>

            <div className="flex items-center justify-between ">
              <div>
                <div className="flex">
                  <label className="block mb-1"> Max End Time </label>
                  <span className="ml-1 text-red-600">*</span>
                </div>

                <ShiftTimePicker />
              </div>
              <div>
                <div className="flex">
                  <label className="block mb-1">Break Time </label>
                  <span className="ml-1 text-red-600">*</span>
                </div>

                <ShiftTimePicker />
              </div>
              <div>
                <div className="flex items-center ">
                  <label className="block">End on </label>
                  <span className="ml-1 text-red-600">*</span>
                </div>

                <TADatePicker />
              </div>
            </div>

            <div>
              <div className="flex">
                <label className="block mb-1"> Repeat Every</label>
                <span className="ml-1 text-red-600">*</span>
              </div>
              <Select
                value={selectedOption}
                onChange={handleChange}
                options={weekDays}
              />
            </div>

            <div>
              <div className="flex">
                <label className="block mb-1">Add Tag </label>
              </div>

              <input
                type="text"
                className="w-full border-2-[#ddd] border p-2 rounded-sm bg-[#E9ECEF]"
              />
            </div>
            <div>
              <div className="flex">
                <label className="block mb-1">Add Note </label>
                <span className="ml-1 text-red-600">*</span>
              </div>

              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className="border-2-[#ddd] border w-full h-[70px] rounded-sm resize-none p-2"
              ></textarea>
            </div>
            <div className="mt-3 text-center">
              <button className="border-2-[#ddd] border rounded-2xl w-52 h-12 mx-auto  bg-[#0F79F3] text-white ">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignShiftModal;
