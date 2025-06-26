/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import logo from "../../../../../public/assets/logo.png";
import "./PreviewJobCard.css";
import { PrintContext } from "../../../context/PrintProvider";
import car from "../../../../../public/assets/car3.jpeg";
import { useLocation } from "react-router-dom";
import { useGetSingleJobCardQuery } from "../../../../redux/api/jobCard";
import Loading from "../../../../components/Loading/Loading";
import { useReactToPrint } from "react-to-print";
import { Button, Link } from "@mui/material";
import { WhatsApp } from "@mui/icons-material";
import { WhatsappShareButton } from "react-share";
const PreviewJobCard = () => {
  const { componentRef, targetRef } = useContext(PrintContext);
  const [vehicleInterior, setVehicleInterior] = useState("");
  const [reportedDefect, setReportedDefect] = useState("");
  const [reportedAction, setReportedAction] = useState("");
  const tenantDomain = window.location.hostname.split(".")[0];

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const { data, isLoading } = useGetSingleJobCardQuery({ tenantDomain, id });
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const previewData = data?.data;
  console.log("preivew data this ", previewData);

  const extractTextFromHTML = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    if (previewData && previewData?.vehicle_interior_parts) {
      const extractedText = extractTextFromHTML(
        previewData?.vehicle_interior_parts
      );
      setVehicleInterior(extractedText);
    }
    if (previewData && previewData?.reported_defect) {
      const extractedText = extractTextFromHTML(previewData?.reported_defect);
      setReportedDefect(extractedText);
    }
    if (previewData && previewData?.reported_action) {
      const extractedText = extractTextFromHTML(previewData?.reported_action);
      setReportedAction(extractedText);
    }
  }, [previewData]);

  if (isLoading) {
    return <Loading />;
  }

  const driverContact1 =
    previewData?.customer?.driver_country_code +
    previewData?.customer?.driver_contact;
  const driverContact2 =
    previewData?.company?.driver_country_code +
    previewData?.company?.driver_contact;

  const driverContact3 =
    previewData?.showRoom?.driver_country_code +
    previewData?.showRoom?.driver_contact;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const urlToShare = window.location.href;
  const title = "Check this out!";

  return (
    <main className="jobCardViewWrap">
      <div ref={componentRef}>
        <div ref={targetRef} className=" jobCardPrint">
          <div className="headerContainer">
            <div className="mx-auto text-center border-b-2 border-[#110255]">
              <div className="flex  justify-between items-center">
                <img className="w-[150px] " src={logo} alt="logo" />
                <h2 className="trustAutoTitle ">Softypy Garage</h2>
              </div>
            </div>
            <div>
              <div className=" flex text-[12px] justify-between items-center my-2">
                <div>
                  <b>
                    Job No: <span>{previewData?.job_no}</span>
                  </b>
                  <div>
                    <b> ID:</b> {previewData?.Id}
                  </div>
                </div>
                <div>
                  <div className="vehicleCard previwCard2">
                    Vehicle Job Card{" "}
                  </div>
                </div>
                <div>
                  <b>
                    Date: <span>{previewData?.date}</span>
                  </b>
                </div>
              </div>

              <div className="flex  justify-between">
                <div className="inputGroup">
                  <h6 className="mb-2 font-bold">Vehicle Information </h6>
                  <div className="flex">
                    <div>
                      <div>
                        <label className="block">chassis_no</label>
                        <input
                          type="text"
                          placeholder="VIN No"
                          defaultValue={previewData?.vehicle?.chassis_no}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block">Car Registration No</label>
                        <input
                          type="text"
                          defaultValue={`${previewData?.vehicle?.carReg_no} ${previewData?.vehicle?.car_registration_no}`}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block">Vehicle Model </label>
                        <input
                          type="text"
                          placeholder="Vehicle Model"
                          defaultValue={previewData?.vehicle?.vehicle_model}
                          disabled
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <label className="block">Engine No</label>
                        <input
                          type="text"
                          placeholder="Engine No"
                          defaultValue={previewData?.vehicle?.engine_no}
                          disabled
                        />
                      </div>

                      <div>
                        <label className="block">Vehicle Name </label>
                        <input
                          type="text"
                          placeholder="Company Name "
                          defaultValue={previewData?.vehicle?.vehicle_name}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block">Vehicle Brand </label>
                        <input
                          type="text"
                          placeholder="Vehicle Brand "
                          defaultValue={previewData?.vehicle?.vehicle_brand}
                          disabled
                        />
                      </div>
                    </div>

                    <div>
                      <div>
                        <label className="block">Mileage</label>
                        <input
                          type="text"
                          placeholder="Mileage"
                          defaultValue={previewData?.mileage}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block">Color</label>
                        <input
                          type="text"
                          placeholder="Color"
                          defaultValue={previewData?.vehicle?.color_code}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block">Vehicle Category </label>
                        <input
                          type="text"
                          placeholder="Vehicle Category "
                          defaultValue={previewData?.vehicle?.vehicle_category}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" inputGroup">
                  <h6 className=" mb-2 font-bold ">
                    {" "}
                    {previewData?.user_type?.charAt(0)?.toUpperCase() +
                      previewData?.user_type?.slice(1)}{" "}
                    Information{" "}
                  </h6>
                  <div className="flex">
                    <div>
                      <div>
                        <label className="block">Customer Name</label>
                        <input
                          type="text"
                          placeholder="Customer Name"
                          defaultValue={
                            previewData?.customer?.customer_name ||
                            previewData?.company?.vehicle_username ||
                            previewData?.showRoom?.vehicle_username
                          }
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block">Driver Contact No</label>
                        <input
                          type="text"
                          placeholder="Contact No"
                          defaultValue={
                            driverContact1 || driverContact2 || driverContact3
                          }
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block">Car Driver Name </label>
                        <input
                          type="text"
                          placeholder="Car Driver Name"
                          defaultValue={
                            previewData?.customer?.driver_name ||
                            previewData?.company?.driver_name ||
                            previewData?.showRoom?.driver_name
                          }
                          disabled
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <label className="block">Phone Number </label>
                        <input
                          type="text"
                          placeholder="Phone"
                          defaultValue={
                            previewData?.customer?.fullCustomerNum ||
                            previewData?.company?.fullCompanyNum ||
                            previewData?.showRoom?.fullCompanyNum
                          }
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block">Reference Name </label>
                        <input
                          type="text"
                          placeholder="Reference Number"
                          defaultValue={
                            previewData?.customer?.reference_name ||
                            previewData?.company?.reference_name ||
                            previewData?.showRoom?.reference_name
                          }
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block">
                          {previewData?.user_type?.charAt(0).toUpperCase() +
                            previewData?.user_type?.slice(1)}{" "}
                          Email{" "}
                        </label>
                        <input
                          type="text"
                          placeholder="Customer Address "
                          defaultValue={
                            previewData?.customer?.customer_email ||
                            previewData?.company?.company_email ||
                            previewData?.showRoom?.company_email
                          }
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fullTextArea mt-2">
                <label>
                  {" "}
                  Vehicle Interior Parts, Papers, Tools, Meter Light & Others
                </label>
                <textarea disabled defaultValue={vehicleInterior}></textarea>
              </div>
              <div className="flex  justify-between ">
                <div className="leftSide">
                  <div>
                    <label>Reported Defect</label>

                    <textarea defaultValue={reportedDefect} readOnly />
                  </div>
                  <div>
                    <label> Reported Action</label>
                    <textarea defaultValue={reportedAction} readOnly></textarea>
                  </div>

                  <div className="mt-">
                    <label>
                      {/* Vehicle Interior Parts, */}
                      Vehicle Body Report Comments
                    </label>
                    <textarea
                      defaultValue={previewData?.vehicle_body_report}
                      readOnly
                    ></textarea>
                  </div>
                </div>
                <div className="rightSide">
                  <div className="carImgWrap">
                    <img src={car} alt="car" />
                  </div>
                  <div className="mt-">
                    <label>Note</label>
                    <textarea
                      className="note"
                      defaultValue={previewData?.note}
                      readOnly
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center  justify-between inputGroup2">
              <div>
                <label className="block ">Technician Name</label>
                <input
                  defaultValue={previewData?.technician_name}
                  disabled
                  type="text"
                  // placeholder="Technician Name"
                />
              </div>
              <div>
                <label className="block">Technician Signature </label>
                <input
                  // defaultValue={previewData.technician_signature}
                  disabled
                  type="text"
                  // placeholder="Technician Signature"
                />
              </div>
              <div>
                <label className="block">Date </label>
                <input
                  defaultValue={formatDate(previewData?.technician_date)}
                  readOnly
                  type="text"
                  placeholder="Date"
                />
              </div>
              <div>
                <label className="block">I explained the car </label>
                <input
                  // defaultValue={previewData.vehicle_owner}
                  disabled
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="">
            <div className="px-[8px]">
              <hr className=" border border-[#4671A1]" />
            </div>
            <div className="text-center  mt-3">
              <p className="text-xs">
                <b>Office: </b>Ka-93/4/C, Kuril Bishawroad, Dhaka-1229,
                www.trustautosolution.com
              </p>
              <p className="text-xs">
                {" "}
                <b>Mobile:</b>+880 1821-216465, +880 1972-216465 , <b>Email:</b>{" "}
                trustautosolution@gmail.com{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="printBtnGroup ml-[500px] mt-5 ">
        <Button
          sx={{ color: "white", borderRadius: "20px", padding: "7px 20px" }}
          onClick={handlePrint}
        >
          Print{" "}
        </Button>
        <a
          className="bg-[#42A0D9] text-white px-3 py-2  rounded-full mx-2 "
          href={`${import.meta.env.VITE_API_URL}/jobCards/jobcard/${
            previewData?._id
          }`}
          target="_blank"
          rel="noreferrer"
        >
          Download
        </a>

        <Button
          sx={{
            color: "white",
            borderRadius: "20px",
            padding: "7px 20px",
            marginRight: "5px",
          }}
          component={Link}
          href={`/dashboard/qutation?order_no=${previewData?.job_no}`}
        >
          Quotation
        </Button>
        <Button
          sx={{ color: "white", borderRadius: "20px", padding: "7px 20px" }}
          component={Link}
          href={`/dashboard/update-jobcard?id=${id}`}
        >
          Edit
        </Button>
        <Button
          sx={{
            color: "white",
            borderRadius: "20px",
            padding: "7px 20px",
            marginLeft: "5px",
          }}
        >
          <WhatsappShareButton url={urlToShare}>
            <WhatsApp />
          </WhatsappShareButton>
        </Button>
      </div>
    </main>
  );
};

export default PreviewJobCard;
