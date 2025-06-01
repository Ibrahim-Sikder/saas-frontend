import { Link } from "react-router-dom";
import { FaFacebookF, FaRocketchat, FaWhatsapp } from "react-icons/fa";
import React from "react";
const Message = () => {
  return (
    <React.Fragment>
      <div className="flex flex-wrap gap-3  items-center justify-between cursor-pointer md:w-[500px] mx-auto my-20">
        <div className="shadow-lg bg-[#24CC63] text-white p-3 rounded-lg">
          <Link to="/dashboard/message">
            <FaWhatsapp size={100} />
          </Link>
        </div>
        <div className="shadow-lg bg-[#1974EC] text-white p-3 rounded-lg">
          <Link to="/dashboard/message">
            <FaFacebookF size={100} />
          </Link>
        </div>
        <div className="shadow-lg bg-[#2864D9] text-white p-3 rounded-lg">
          <Link to="/dashboard/message">
            <FaRocketchat size={100} />
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Message;
