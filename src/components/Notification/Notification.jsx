/* eslint-disable no-unused-vars */
import { NotificationsNone } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { FaRegMessage } from "react-icons/fa6";
const Notification = () => {
  const notificationData = [
    {
      id: 1,
      notification: "You have requested to Withdrawal",
      time: "2hrs ago",
    },
    {
      id: 2,
      notification: "A new user added in TAS ",
      time: "3hrs ago",
    },
    {
      id: 3,
      notification: "You have requested to Withdrawal",
      time: "5hrs ago",
    },
    {
      id: 4,
      notification: "You have requested to Withdrawal",
      time: "8hrs ago",
    },
  ];
  return (
    <div className="relative lg:block  notificationIconsWraps cursor-pointer ">
      <div className="absolute rounded-full bg-[#1A90FF] text-white p-2 w-5 h-5 flex items-center justify-center text-sm -top-1 left-5">
        5
      </div>
      <NotificationsNone className="text-white notificationIcon" size={30} />

      <div className="notificationModal">
        <div className="flex items-center justify-between">
          <h3>Notifications(5)</h3>
          <span className="text-[#0F79F3]">Clear all</span>
        </div>
        {notificationData.slice(0, 3).map((data) => (
          <div key={data.id} className="">
            <Link to="/dashboard/notification">
              <div className="notificationMessage space-y-5">
                <div className="bg-[#EFF3F9] p-3 rounded-full hover:bg-[#0F79F3] hover:text-[#fff] transition-all mr-3">
                  <FaRegMessage size={25} />
                </div>
                <div>
                  <p>{data.notification}</p>
                  <small>{data.time}</small>
                </div>
              </div>
            </Link>
          </div>
        ))}
        <Link to="/dashboard/notification">
          <button className="text-[#0F79F3] border-b border-b-[#0F79F3] mt-8 text-center w-52 justify-center mx-auto flex ">
            See All Notifications
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Notification;
