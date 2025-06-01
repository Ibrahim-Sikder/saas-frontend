/* eslint-disable react/prop-types */
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const EmployeeAccount = ({ accountInfo }) => {
  const myAttendance = accountInfo?.attendance;

  const absentEntries = myAttendance?.filter(
    (attendance) => attendance.absent
  ).length;

  const absentPercentage = Number(
    (absentEntries / myAttendance?.length) * 100
  ).toFixed(2);

  const isIntegerAbsentPercentage = absentPercentage.endsWith(".00");

  const finalAbsentPercentage = isIntegerAbsentPercentage
    ? parseInt(absentPercentage)
    : absentPercentage;

  const absentPercentageNumber = isNaN(finalAbsentPercentage)
    ? 0
    : finalAbsentPercentage;
  const lateEntries = myAttendance?.filter(
    (attendance) => attendance.late_status
  ).length;

  const latePercentage = Number(
    (lateEntries / myAttendance?.length) * 100
  ).toFixed(2);

  const isIntegerLatePercentage = latePercentage.endsWith(".00");

  const finalLatePercentage = isIntegerLatePercentage
    ? parseInt(latePercentage)
    : latePercentage;

  const latePercentageNumber = isNaN(finalLatePercentage)
    ? 0
    : finalLatePercentage;

  return (
    <div className="customerProfileWrap">
      <div>
        <div className="grid grid-cols-1  xl:grid-cols-5 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          <div className=" employeeCard">
            <div className="flex items-center justify-between w-full px-5 py-3">
              <div className="flex items-center">
                <div style={{ width: 80, height: 80 }}>
                  <CircularProgressbar
                    value={66}
                    text={`${66}%`}
                    styles={{
                     
                      path: {
                        stroke: `#60BE6B`, 
                      },
                   
                      text: {
                        fill: "#3e98c7", 
                      },
                    
                      trail: {
                        stroke: "#f4f4f4",
                      },
                    }}
                  />
                </div>
                <h4 className="ml-2 text-sm font-semibold">In Time </h4>
              </div>
              <b>20</b>
            </div>
          </div>
          <div className=" employeeCard">
            <div className="flex items-center justify-between w-full px-5 py-3">
              <div className="flex items-center">
                <div style={{ width: 80, height: 80 }}>
                  <CircularProgressbar
                    value={96}
                    text={`${96}%`}
                    styles={{
                 
                      path: {
                        stroke: `#60BE6B`, 
                      },
              
                      text: {
                        fill: "#3e98c7",
                      },
                 
                      trail: {
                        stroke: "#f4f4f4",
                      },
                    }}
                  />
                </div>
                <h4 className="ml-2 text-sm font-semibold">Out Time </h4>
              </div>
              <b>20</b>
            </div>
          </div>
          <div className=" employeeCard">
            <div className="flex items-center justify-between w-full px-5 py-3">
              <div className="flex items-center">
                <div style={{ width: 80, height: 80 }}>
                  <CircularProgressbar
                    value={absentPercentageNumber}
                    text={`${absentPercentageNumber}%`}
                    styles={{
                 
                      path: {
                        stroke: `#F62D51`,
                      },
                    
                      text: {
                        fill: "#3e98c7", 
                      },
                  
                      trail: {
                        stroke: "#f4f4f4", 
                      },
                    }}
                  />
                </div>
                <h4 className="ml-2 text-sm font-semibold">Absent </h4>
              </div>
              <b>{absentEntries}</b>
            </div>
          </div>
          <div className=" employeeCard">
            <div className="flex items-center justify-between w-full px-5 py-3">
              <div className="flex items-center">
                <div style={{ width: 80, height: 80 }}>
                  <CircularProgressbar
                    value={20}
                    text={`${20}%`}
                    styles={{
 
                      path: {
                        stroke: `#FF851A`,
                      },
                   
                      text: {
                        fill: "#3e98c7", 
                      },
                 
                      trail: {
                        stroke: "#f4f4f4", 
                      },
                    }}
                  />
                </div>
                <h4 className="ml-2 text-sm font-semibold">Vacation </h4>
              </div>
              <b>20</b>
            </div>
          </div>
          <div className=" employeeCard">
            <div className="flex items-center justify-between w-full px-5 py-3">
              <div className="flex items-center">
                <div style={{ width: 80, height: 80 }}>
                  <CircularProgressbar
                    value={latePercentageNumber}
                    text={`${latePercentageNumber}%`}
                    styles={{
                      
                      path: {
                        stroke: `#FF851A`, 
                      },
              
                      text: {
                        fill: "#3e98c7", 
                      },
                 
                      trail: {
                        stroke: "#f4f4f4",
                      },
                    }}
                  />
                </div>
                <h4 className="ml-2 text-sm font-semibold">Late </h4>
              </div>
              <b>{lateEntries}</b>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-5 mt-10  ">
          <div className="employeeProfileCard">
            <h3 className="text-xl font-semibold">Personal Information </h3>
            <div className="flex items-center justify-between mt-5">
              <div className="space-y-3">
                <b className="block">Name</b>
                <b className="block">Email </b>
                <b className="block">Phone </b>
                <b className="block">Birth Date </b>
                <b className="block">NID </b>
              </div>
              <div className="space-y-3">
                <span className="block"> : {accountInfo?.full_name} </span>
                <span className="block">: {accountInfo?.email} </span>
                <span className="block">
                  : {accountInfo?.full_phone_number}{" "}
                </span>
                <span className="block">: {accountInfo?.date_of_birth} </span>

                <span className="block">: {accountInfo?.nid} </span>
              </div>
            </div>
          </div>
          <div className="employeeProfileCard">
            <h3 className="text-xl font-semibold">Emergency Contact</h3>

            <div className="flex items-center justify-between mt-5">
              <div className="space-y-3">
                <b className="block">Name</b>
                <b className="block">Relationship </b>
                <b className="block">Phone </b>
                {/* <b className="block">Occupation </b> */}
              </div>
              <div className="space-y-3">
                <span className="block"> : {accountInfo?.guardian_name} </span>
                <span className="block">: {accountInfo?.relationship} </span>
                <span className="block">
                  : {accountInfo?.guardian_full_contact}{" "}
                </span>
                {/* <span className="block">: {accountInfo?.guardian_name}  </span> */}
              </div>
            </div>
          </div>
          <div className="employeeProfileCard">
            <h3 className="text-xl font-semibold">Address Information </h3>

            <div className="flex items-center justify-between mt-5">
              <div className="space-y-3">
                <b className="block">Country</b>
                <b className="block">Town / City </b>
                <b className="block">Address </b>
              </div>
              <div className="space-y-3">
                <span className="block"> : {accountInfo?.country} </span>
                <span className="block">: {accountInfo?.city} </span>
                <span className="block">: {accountInfo?.present_address} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAccount;
