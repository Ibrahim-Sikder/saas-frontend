/* eslint-disable react/no-unknown-property */
import { TextField } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";

const UpdateProfile = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold ">Profile</h3>
      <div className="jobCardFieldWraps">
        <div className="jobCardFieldRightSide">
          <div className="space-y-3">
            <TextField className="addJobInputField" label="First Name " />
            <TextField className="addJobInputField" label="Email Address " />
            <TextField className="addJobInputField" label="Location " />
            <TextField className="addJobInputField" label="Gender " />
            <TextField className="addJobInputField" label="Social Link " />
          </div>
        </div>
        <div className="jobCardFieldLeftSide lg:mt-0 mt-5">
          <div className="space-y-3">
            <TextField className="addJobInputField" label="Last Name " />
            <TextField className="addJobInputField" label="Phone Number" />
            <TextField className="addJobInputField" label="Date of Birth " />
            <TextField className="addJobInputField" label="Address" />
            <div>
              <input type="file" id="files" className="hidden " />
              <label
                for="files"
                className="flex addJobInputField items-center w-full justify-center cursor-pointer bg-[#42A1DA] text-white py-2 rounded-md "
              >
                <span>
                  <FaCloudUploadAlt size={30} className="mr-2" />
                </span>
                <span> Upload Image</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <label>Add You Bio</label>
        <textarea
          placeholder="Write here..."
          autoFocus="off"
          className="border w-[99%] rounded-md  h-[100px] resize-none p-3 "
          autoComplete="off"
        ></textarea>
      </div>
      <div className="updateProfileBtnWrap">
        <button>Update Profile </button>
        <button>Cancel</button>
      </div>
    </div>
  );
};

export default UpdateProfile;
