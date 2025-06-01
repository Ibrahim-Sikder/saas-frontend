import user from "../../../public//assets/chat5.jpg";
import user2 from "../../../public//assets/chat6.jpg";
import user3 from "../../../public//assets/chat7.jpg";
const GroupChat = () => {
  const messageData = [
    {
      id: 0,
      image: user,
      name: "Rakibul Hasan",
      message: "Typing.....",

      time: "Just Now",
    },
    {
      id: 1,
      image: user2,
      name: "MD Arman",
      message: "That cool, go for it...😀",
      time: "Sun 12.30",
    },
    {
      id: 2,
      image: user3,
      name: "Raihan",
      message: "Great ! 🔥",
      time: "Fri 12.30",
    },
  
  ];

  return (
    <div>
      <div className="messageList">
      
        <div className="space-y-3">
        <div className="userMessageList createGroup ">
          <span> +Create New Group </span>
        </div>
          {messageData.map((data, i) => (
            <div
              key={data.id}
              className={`userMessageList ${
                i === 0 ? "bg-[#F7F7F7]" : ""
              }`}
            >
              <div className="flex items-center">
                <img
                  src={data.image}
                  className="h-10 w-10 rounded-full"
                  alt="user"
                />
                <div className="ml-2">
                  <h3>{data.name} </h3>
                  <small className="text-[#0DC143]">{data.message}</small>
                </div>
              </div>
              <span>{data.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
