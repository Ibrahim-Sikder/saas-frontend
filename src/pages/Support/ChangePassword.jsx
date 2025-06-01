import { TextField } from "@mui/material";
import './Support.css'
const ChangePassword = () => {
  return (
    <div className="changPasswordWrap">
      <h3 className=" md:text-2xl font-semibold mb-3 ">Change your password</h3>
      <div className="space-y-3 block">
          <div>
          <TextField fullWidth label="Old Password " />
          </div>
          <div>
          <TextField fullWidth label="New Password " />
          </div>
          <div>
          <TextField fullWidth label="Confirm Password " />
          </div>
          
           
          </div>
    </div>
  );
};

export default ChangePassword;
