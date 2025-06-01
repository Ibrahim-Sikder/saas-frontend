import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { HiOutlineHome } from "react-icons/hi";
import UpdateProfile from "./UpdateProfile";
import ChangePassword from "./ChangePassword";
import PrivacyPolicy from "./PrivacyPolicy";
import TermAndCondition from "./TermAndCondition";

export default function Support() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="bg-[#EFF3F9] p-5 xl:px-20 lg:10">
        <div className="flex flex-wrap items-center justify-between">
          <h3 className="text-xl  md:text-3xl font-semibold">Support </h3>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <HiOutlineHome className="text-[#0F79F3] size-5 mr-1" />
              <span>Dashboard</span>
            </div>
            <span>App</span>
            <span>Notification</span>
          </div>
        </div>
      </div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Account Setting " value="1" />
              <Tab label="Change Password" value="2" />
              <Tab label="Privacy Policy " value="3" />
              <Tab label="Terms & Condition " value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <UpdateProfile />
          </TabPanel>
          <TabPanel value="2">
            <ChangePassword />
          </TabPanel>
          <TabPanel value="3">
            <PrivacyPolicy/>
          </TabPanel>
          
          <TabPanel value="4">
           <TermAndCondition/>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
