import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const HeaderButton = () => {
  const buttonStyle = {
    backgroundColor: "#42A1DA",
    borderRadius: "10px",
    color: "#fff",
  };
  return (
    <div className="flex items-center mr-[80px]  justify-center topProductBtn">
      <Link to="/dashboard/addjob">
        <Button sx={buttonStyle}> Job Card </Button>
      </Link>
      <Link to="/dashboard/qutation">
        <Button sx={buttonStyle}>Quotation </Button>
      </Link>
      <Link to="/dashboard/invoice">
        <Button sx={buttonStyle}>Invoice </Button>
      </Link>
    </div>
  );
};

export default HeaderButton;
