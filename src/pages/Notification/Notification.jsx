/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { HiOutlineHome } from "react-icons/hi";
import "./Notification.css";

const EmployeeSalary = ({ open }) => {
  const notificationData = [
    {
      id: 1,
      notificationId: "#258",
      timeStamps: "01 Dec, 2024 09:30 AM",
      type: "Information New software update available",
      content: "Click here to download.",
      status: "Unread",
    },
    {
      id: 1,
      notificationId: "#258",
      timeStamps: "01 Dec, 2024 09:30 AM",
      type: "Information New software update available",
      content: "Click here to download.",
      status: "Read",
    },
    {
      id: 1,
      notificationId: "#258",
      timeStamps: "01 Dec, 2024 09:30 AM",
      type: "Information New software update available",
      content: "Click here to download.",
      status: "Unread",
    },
    {
      id: 1,
      notificationId: "#258",
      timeStamps: "01 Dec, 2024 09:30 AM",
      type: "Information New software update available",
      content: "Click here to download.",
      status: "Unread",
    },
    {
      id: 1,
      notificationId: "#258",
      timeStamps: "01 Dec, 2024 09:30 AM",
      type: "Information New software update available",
      content: "Click here to download.",
      status: "Read",
    },
    {
      id: 1,
      notificationId: "#258",
      timeStamps: "01 Dec, 2024 09:30 AM",
      type: "Information New software update available",
      content: "Click here to download.",
      status: "Read",
    },
    {
      id: 1,
      notificationId: "#258",
      timeStamps: "01 Dec, 2024 09:30 AM",
      type: "Information New software update available",
      content: "Click here to download.",
      status: "Read",
    },
  ];
  return (
    <>
      <div className="bg-[#EFF3F9] p-5 px-20">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-semibold">Chat</h3>
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
      <div className="table-container notificationTable ">
      <h3 className="flex  text-2xl p-5 font-semibold ">Notifications </h3>
        <table className="">
          <thead>
            <tr>
              <th>Notification ID</th>
              <th>Timestamp </th>
              <th>Type </th>
              <th>Content </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {notificationData.map((data, i) => (
              <tr key={data.id}>
                <td> {data.notificationId}</td>
                <td>{data.timeStamps}</td>
                <td>{data.type}</td>
                <td>{data.content}</td>
                <td>
                  <div className={data.status === 'Read' ? 'read' : 'unread'}>
                   {data.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeSalary;
