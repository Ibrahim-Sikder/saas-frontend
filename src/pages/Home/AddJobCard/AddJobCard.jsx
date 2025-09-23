/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Box } from "@mui/material";
import { useTenantDomain } from "../../../hooks/useTenantDomain";
import useUserDetails from "../../../hooks/useUserDetails";
import useJobCardNumber from "../../../hooks/useJobCardNumber";
import { useCreateJobCardMutation } from "../../../redux/api/jobCard";
import HeaderSection from "./HeaderSection";
import UserSelectionSection from "./UserSelectionSection";
import JobCardCustomerForm from "./JobCardCustomerForm";
import JobCardShowroomForm from "./JobCardShowroomForm";

import TechnicianSection from "./TechnicianSection";
import VehicleReportSection from "./VehicleReportSection";
import JobCardTable from "./JobCardTable";
import VehicleInfoSection from "./VehicleInfoSection";
import JobCardCompanyForm from "./JobCardCompanyForm";

const AddJobCard = () => {
  const tenantDomain = useTenantDomain();
  const location = useLocation();
  const navigate = useNavigate();
  const formRef = useRef();

  const id = new URLSearchParams(location.search).get("id");
  const user = new URLSearchParams(location.search).get("user_type");

  const [currentPage, setCurrentPage] = useState(1);
  const [idType, setIdType] = useState(null);
  const [showId, setShowId] = useState([]);
  const [userId, setUserId] = useState(id);
  const [newId, setNewId] = useState(user ? user : "customer");
  const [clickControl, setClickControl] = useState(null);
  const [getDataWithChassisNo, setGetDataWithChassisNo] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  const limit = 10;
  const jobCardLimit = 500000;

  const { userDetails } = useUserDetails(tenantDomain, userId, newId);
  const paddedJobNumber = useJobCardNumber(tenantDomain, limit, currentPage);

  const {
    register,
    handleSubmit,
    reset,
    setValue: setVModelValue,
    formState: { errors },
  } = useForm();

  const [createJobCard, { isLoading: createJobCardLoading }] =
    useCreateJobCardMutation();

  useEffect(() => {
    const parsedDate = new Date();
    const day = parsedDate.getDate()?.toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1)?.toString().padStart(2, "0");
    const year = parsedDate.getFullYear();
    const currentDate = `${day}-${month}-${year}`;
    setFormattedDate(currentDate);
  }, []);

  useEffect(() => {
    if (userDetails?.data && newId === "customer") {
      reset({
        company_name: userDetails?.data?.company_name,
        vehicle_username: userDetails?.data?.vehicle_username,
        company_address: userDetails?.data?.company_address,
        customer_name: userDetails?.data?.customer_name,
        customer_country_code: userDetails?.data?.customer_country_code,
        customer_contact: userDetails?.data?.customer_contact,
        customer_email: userDetails?.data?.customer_email,
        customer_address: userDetails?.data?.customer_address,
        driver_name: userDetails?.data?.driver_name,
        driver_country_code: userDetails?.data?.driver_country_code,
        driver_contact: userDetails?.data?.driver_contact,
        reference_name: userDetails?.data?.reference_name,
        customerOwnerName: userDetails?.data?.customerOwnerName,
        customerOwnerCountryCode: userDetails?.data?.customerOwnerCountryCode,
        customerOwnerPhone: userDetails?.data?.customerOwnerPhone,
        carReg_no: getDataWithChassisNo?.carReg_no,
        car_registration_no: getDataWithChassisNo?.car_registration_no,
        engine_no: getDataWithChassisNo?.engine_no,
        vehicle_brand: getDataWithChassisNo?.vehicle_brand,
        vehicle_name: getDataWithChassisNo?.vehicle_name,
        vehicle_model: getDataWithChassisNo?.vehicle_model,
        vehicle_category: getDataWithChassisNo?.vehicle_category,
        color_code: getDataWithChassisNo?.color_code,
        mileage: getDataWithChassisNo?.mileage,
        fuel_type: getDataWithChassisNo?.fuel_type,
      });
    }
    if (userDetails?.data && newId === "company") {
      reset({
        company_name: userDetails?.data?.company_name,
        vehicle_username: userDetails?.data?.vehicle_username,
        company_address: userDetails?.data?.company_address,
        company_contact: userDetails?.data?.company_contact,
        company_country_code: userDetails?.data?.company_country_code,
        company_email: userDetails?.data?.company_email,
        customer_address: userDetails?.data?.customer_address,
        driver_name: userDetails?.data?.driver_name,
        driver_country_code: userDetails?.data?.driver_country_code,
        driver_contact: userDetails?.data?.driver_contact,
        companyOwnerName: userDetails?.data?.companyOwnerName,
        companyOwnerCountryCode: userDetails?.data?.companyOwnerCountryCode,
        companyOwnerPhone: userDetails?.data?.companyOwnerPhone,
        reference_name: userDetails?.data?.reference_name,
        carReg_no: getDataWithChassisNo?.carReg_no,
        car_registration_no: getDataWithChassisNo?.car_registration_no,
        engine_no: getDataWithChassisNo?.engine_no,
        vehicle_brand: getDataWithChassisNo?.vehicle_brand,
        vehicle_name: getDataWithChassisNo?.vehicle_name,
        vehicle_model: getDataWithChassisNo?.vehicle_model,
        vehicle_category: getDataWithChassisNo?.vehicle_category,
        color_code: getDataWithChassisNo?.color_code,
        mileage: getDataWithChassisNo?.mileage,
        fuel_type: getDataWithChassisNo?.fuel_type,
      });
    }
    if (userDetails?.data && newId === "showRoom") {
      reset({
        showRoom_name: userDetails?.data?.showRoom_name,
        vehicle_username: userDetails?.data?.vehicle_username,
        showRoom_address: userDetails?.data?.showRoom_address,
        company_name: userDetails?.data?.company_name,
        company_contact: userDetails?.data?.company_contact,
        company_country_code: userDetails?.data?.company_country_code,
        company_email: userDetails?.data?.company_email,
        company_address: userDetails?.data?.company_address,
        driver_name: userDetails?.data?.driver_name,
        driver_country_code: userDetails?.data?.driver_country_code,
        driver_contact: userDetails?.data?.driver_contact,
        reference_name: userDetails?.data?.reference_name,
        carReg_no: getDataWithChassisNo?.carReg_no,
        car_registration_no: getDataWithChassisNo?.car_registration_no,
        engine_no: getDataWithChassisNo?.engine_no,
        vehicle_brand: getDataWithChassisNo?.vehicle_brand,
        vehicle_name: getDataWithChassisNo?.vehicle_name,
        vehicle_model: getDataWithChassisNo?.vehicle_model,
        vehicle_category: getDataWithChassisNo?.vehicle_category,
        color_code: getDataWithChassisNo?.color_code,
        mileage: getDataWithChassisNo?.mileage,
        fuel_type: getDataWithChassisNo?.fuel_type,
      });
    }
  }, [reset, getDataWithChassisNo, userDetails?.data, newId, userId]);

  useEffect(() => {
    if (!userDetails || !userDetails.data) {
      formRef.current?.reset();
    }
  }, [userDetails]);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating Jobcard...");
    if (!newId) {
      return toast.error("Please add your Id.");
    }

    // Prepare data based on user type
    const customer = {
      company_name: data.company_name,
      vehicle_username: data.vehicle_username,
      company_address: data.company_address,
      customer_name: data.customer_name,
      customer_contact: data.customer_contact,
      customer_country_code: data.customer_country_code?.code,
      customer_email: data.customer_email,
      customer_address: data.customer_address,
      driver_name: data.driver_name,
      driver_contact: data.driver_contact,
      driver_country_code: data.driver_country_code?.code,
      reference_name: data.reference_name,
      customerOwnerPhone: data.customerOwnerPhone,
      customerOwnerName: data.customerOwnerName,
      customerOwnerCountryCode: data.customerOwnerCountryCode?.code,
    };

    const company = {
      company_name: data.company_name,
      vehicle_username: data.vehicle_username,
      company_address: data.company_address,
      company_contact: data.company_contact,
      company_country_code: data.company_country_code?.code,
      company_email: data.company_email,
      customer_address: data.customer_address,
      driver_name: data.driver_name,
      driver_contact: data.driver_contact,
      driver_country_code: data.driver_country_code?.code,
      reference_name: data.reference_name,
      companyOwnerPhone: data.companyOwnerPhone,
      companyOwnerName: data.companyOwnerName,
      companyOwnerCountryCode: data.companyOwnerCountryCode?.code,
    };

    const showroom = {
      showRoom_name: data.showRoom_name,
      vehicle_username: data.vehicle_username,
      showRoom_address: data.showRoom_address,
      company_name: data.company_name,
      company_contact: data.company_contact,
      company_country_code: data.company_country_code?.code,
      company_email: data.company_email,
      company_address: data.company_address,
      driver_name: data.driver_name,
      driver_contact: data.driver_contact,
      driver_country_code: data.driver_country_code?.code,
      reference_name: data.reference_name,
    };

    data.vehicle_model = Number(data.vehicle_model);
    data.mileage = Number(data.mileage);

    const existingMileageHistory = getDataWithChassisNo?.mileageHistory || [];
    const updatedMileageHistory = [...existingMileageHistory];

    const vehicle = {
      carReg_no: data.carReg_no,
      car_registration_no: data.car_registration_no,
      chassis_no: data.chassis_no,
      engine_no: data.engine_no,
      vehicle_brand: data.vehicle_brand,
      vehicle_name: data.vehicle_name,
      vehicle_model: data.vehicle_model,
      vehicle_category: data.vehicle_category,
      color_code: data.color_code,
      mileageHistory: updatedMileageHistory,
      fuel_type: data.fuel_type,
    };

    const jobCard = {
      Id: userId,
      job_no: paddedJobNumber,
      user_type: newId,
      date: formattedDate,
      vehicle_interior_parts: data.vehicle_interior_parts,
      reported_defect: data.reported_defect,
      reported_action: data.reported_action,
      note: data.note,
      vehicle_body_report: data.vehicle_body_report,
      technician_name: data.technician_name,
      technician_signature: data.technician_signature,
      technician_date: data.technician_date,
      vehicle_owner: data.vehicle_owner,
      mileage: data.mileage,
    };

    const newCard = {
      tenantDomain: tenantDomain,
      customer,
      company,
      showroom,
      vehicle,
      jobCard,
    };

    try {
      const res = await createJobCard(newCard).unwrap();
      if (res.success) {
        toast.success(res?.message);
        if (clickControl === "preview") {
          navigate(`/dashboard/preview?id=${res?.data?._id}`);
        }
        if (clickControl === "quotation") {
          navigate(`/dashboard/qutation?order_no=${res?.data?.job_no}`);
        }
        if (clickControl === "invoice") {
          navigate(`/dashboard/invoice?order_no=${res?.data?.job_no}`);
        }
        if (clickControl === null) {
          navigate("/dashboard/jobcard-list");
        }
      }
    } catch (err) {
      toast.error(err | "Something went wrong!");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleIdTypeChange = (userType) => {
    setIdType(userType);
    setNewId(userType);
  };

  const handleUserIdChange = (id) => {
    setUserId(id);
  };

  return (
    <div className="addJobCardWraps">
      <HeaderSection />
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <div>
          <UserSelectionSection
            idType={idType}
            userId={userId}
            showId={showId}
            onIdTypeChange={handleIdTypeChange}
            onUserIdChange={handleUserIdChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Box>
              {newId === "customer" && (
                <JobCardCustomerForm
                  userDetails={userDetails}
                  register={register}
                  errors={errors}
                  setValue={setVModelValue}
                />
              )}
              {newId === "company" && (
                <JobCardCompanyForm
                  userDetails={userDetails}
                  register={register}
                  errors={errors}
                  setValue={setVModelValue}
                />
              )}
              {newId === "showRoom" && (
                <JobCardShowroomForm
                  userDetails={userDetails}
                  register={register}
                  errors={errors}
                  setValue={setVModelValue}
                />
              )}
            </Box>

            <Box>
              <VehicleInfoSection
                userDetails={userDetails}
                getDataWithChassisNo={getDataWithChassisNo}
                register={register}
                errors={errors}
                setGetDataWithChassisNo={setGetDataWithChassisNo}
                setValue={setVModelValue}
                setVModelValue={setVModelValue}
              />
            </Box>
          </div>

          <VehicleReportSection register={register} />
          <TechnicianSection register={register} errors={errors} />

          <div className="mt-5 flex justify-center">
            <Button
              sx={{ color: "#fff", borderRadius: "20px" }}
              disabled={createJobCardLoading}
              type="submit"
            >
              Add To Job Card
            </Button>
          </div>
        </div>
      </form>
      <JobCardTable />
    </div>
  );
};

export default AddJobCard;
