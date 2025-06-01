import { HiOutlineChat } from "react-icons/hi";
import { Link } from "react-router-dom";
import user from "../../../public/assets/chat.jpg";
const Message = () => {
  const messageData = [
    {
      id: 1,
      name: "Mr John",
      text: "Hi Arif! Could you please...",
      time: "2hrs ago",
    },
    {
      id: 2,
      name: "Mr John",
      text: "Hi Arif! Could you please...",
      time: "3hrs ago",
    },
    {
      id: 3,
      name: "Mr John",
      text: "Hi Arif! Could you please...",
      time: "2hrs ago",
    },
    {
      id: 4,
      name: "Mr John",
      text: "Hi Arif! Could you please...",
      time: "8hrs ago",
    },
  ];

  return (
    <div className="relative lg:block  messageIconsWraps cursor-pointer ">
      <div className="absolute rounded-full bg-[#1A90FF] text-white p-2 w-5 h-5 flex items-center justify-center text-sm -top-1 left-5">
        5
      </div>
      <HiOutlineChat className="text-white " size={30} />

      <div className=" messageModal">
        <div className="flex items-center justify-between">
          <h3>Notifications(5)</h3>
          <span className="text-[#0F79F3]">Mark all as read</span>
        </div>
        {messageData.slice(0, 4).map((data) => (
          <div key={data.id} className="">
            <Link to="/dashboard/message">
              <div className="notificationMessage space-y-5">
                <img
                  src={user}
                  className="h-10 w-10 rounded-full "
                  alt="user"
                />
                <div>
                  <div className="flex items-center">
                    <h3 className="mr-2 font-semibold ">{data.name}</h3>
                    <small>{data.time}</small>
                  </div>
                  <p className="text-[#A8A8A8]">{data.text}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
        <Link to="/dashboard/message">
          <button className="text-[#0F79F3] border-b border-b-[#0F79F3] mt-8 text-center w-52 justify-center mx-auto flex ">
            See All Message
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Message;
