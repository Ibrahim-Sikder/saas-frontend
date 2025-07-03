/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";
import logo from "../../../../public/assets/logo.png";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Grid,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { cmDmOptions, countries } from "../../../constant";
import TrustAutoAddress from "../../../components/TrustAutoAddress/TrustAutoAddress";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import {
  useGetSingleInvoiceQuery,
  useRemoveInvoiceMutation,
  useUpdateInvoiceMutation,
} from "../../../redux/api/invoice";
import { unitOptions } from "../../../utils/options";
import { formatNumber } from "../../../utils/formateSemicolon";
import { useGetCompanyProfileQuery } from "../../../redux/api/companyProfile";

const UpdateInvoice = () => {
  const [specificInvoice, setSpecificInvoice] = useState({});
  const [value, setValue] = useState(specificInvoice?.vehicle?.carReg_no);
  const [partsTotal, setPartsTotal] = useState(0);
  const [serviceTotal, setServiceTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const tenantDomain = window.location.hostname.split(".")[0];

  const [discount, setDiscount] = useState("");
  const [vat, setVAT] = useState("");
  const [advance, setAdvance] = useState("");

  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const [removeButton, setRemoveButton] = useState("");
  const [reload, setReload] = useState(false);
  const [addButton, setAddButton] = useState(false);
  const [serviceAddButton, setServiceAddButton] = useState(false);
  const partsDiscountRef = useRef(null);
  const netTotalAmountRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const userTypeFromProfile = new URLSearchParams(location.search).get(
    "user_type"
  );
  const userFromProfile = new URLSearchParams(location.search).get("user");

  // country code set
  const [countryCode, setCountryCode] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    if (
      /^\d*$/.test(newPhoneNumber) &&
      newPhoneNumber.length <= 11 &&
      (newPhoneNumber === "" ||
        !newPhoneNumber.startsWith("0") ||
        newPhoneNumber.length > 1)
    ) {
      setPhoneNumber(newPhoneNumber);
    }
  };
  const { data: CompanyInfoData } = useGetCompanyProfileQuery({
    tenantDomain,
  });

  const [items, setItems] = useState([
    { description: "", unit: "", quantity: "", rate: "", total: "" },
  ]);
  const [serviceItems, setServiceItems] = useState([
    { description: "", unit: "", quantity: "", rate: "", total: "" },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [updateInvoice, { isLoading: updateLoading, error: updateError }] =
    useUpdateInvoiceMutation();

  const [removeInvoice, { isLoading: removeLoading, error: removeError }] =
    useRemoveInvoiceMutation();

  useEffect(() => {
    // Don't set selectedDate initially, so we show the div first
    if (specificInvoice?.date && selectedDate === null) {
      // Keep selectedDate as null initially
      // This will make the div show up first
    }
  }, [specificInvoice]);

  useEffect(() => {
    if (specificInvoice?.date) {
      setSelectedDate(specificInvoice.date);
    }
  }, [specificInvoice]);

  useEffect(() => {
    if (specificInvoice?.user_type === "customer") {
      reset({
        Id: specificInvoice?.Id,
        job_no: specificInvoice?.job_no,
        company_name: specificInvoice?.customer?.company_name,

        customer_name: specificInvoice?.customer?.customer_name,
        customer_country_code: specificInvoice?.customer?.customer_country_code,
        customer_contact: specificInvoice?.customer?.customer_contact,

        customer_address: specificInvoice?.customer?.customer_address,

        carReg_no: specificInvoice?.vehicle?.carReg_no,
        car_registration_no: specificInvoice?.vehicle?.car_registration_no,
        engine_no: specificInvoice?.vehicle?.engine_no,
        vehicle_brand: specificInvoice?.vehicle?.vehicle_brand,
        vehicle_name: specificInvoice?.vehicle?.vehicle_name,
        chassis_no: specificInvoice?.vehicle?.chassis_no,
        mileage: specificInvoice?.vehicle?.mileage,
      });
    }
    if (specificInvoice?.user_type === "company") {
      reset({
        Id: specificInvoice?.Id,
        job_no: specificInvoice?.job_no,
        company_name: specificInvoice?.company?.company_name,
        vehicle_username: specificInvoice?.company?.vehicle_username,
        company_address: specificInvoice?.company?.company_address,
        company_contact: specificInvoice?.company?.company_contact,
        company_country_code: specificInvoice?.company?.company_country_code,
        company_email: specificInvoice?.company?.company_email,
        customer_address: specificInvoice?.company?.customer_address,

        carReg_no: specificInvoice?.vehicle?.carReg_no,
        car_registration_no: specificInvoice?.vehicle?.car_registration_no,
        engine_no: specificInvoice?.vehicle?.engine_no,
        vehicle_brand: specificInvoice?.vehicle?.vehicle_name,
        vehicle_name: specificInvoice?.vehicle?.vehicle_name,
        chassis_no: specificInvoice?.vehicle?.chassis_no,
        mileage: specificInvoice?.vehicle?.mileage,
      });
    }
    if (specificInvoice?.user_type === "showRoom") {
      reset({
        Id: specificInvoice?.Id,
        job_no: specificInvoice?.job_no,
        showRoom_name: specificInvoice?.showRoom?.showRoom_name,
        vehicle_username: specificInvoice?.showRoom?.vehicle_username,
        showRoom_address: specificInvoice?.showRoom?.showRoom_address,
        company_name: specificInvoice?.showRoom?.company_name,
        company_contact:
          phoneNumber || specificInvoice?.showRoom?.company_contact,
        company_country_code: specificInvoice?.showRoom?.company_country_code,

        carReg_no: specificInvoice?.vehicle?.carReg_no,
        car_registration_no: specificInvoice?.vehicle?.car_registration_no,
        engine_no: specificInvoice?.vehicle?.engine_no,
        vehicle_brand: specificInvoice?.vehicle?.vehicle_brand,
        vehicle_name: specificInvoice?.vehicle?.vehicle_name,
        chassis_no: specificInvoice?.vehicle?.chassis_no,

        mileage: specificInvoice?.vehicle?.mileage,
      });
    }
  }, [
    phoneNumber,
    reset,
    specificInvoice?.Id,
    specificInvoice?.company?.company_address,
    specificInvoice?.company?.company_contact,
    specificInvoice?.company?.company_country_code,
    specificInvoice?.company?.company_email,
    specificInvoice?.company?.company_name,
    specificInvoice?.company?.customer_address,
    specificInvoice?.company?.vehicle_username,
    specificInvoice?.customer?.company_name,
    specificInvoice?.customer?.customer_address,
    specificInvoice?.customer?.customer_contact,
    specificInvoice?.customer?.customer_country_code,
    specificInvoice?.customer?.customer_name,
    specificInvoice?.job_no,
    specificInvoice?.showRoom?.company_contact,
    specificInvoice?.showRoom?.company_country_code,
    specificInvoice?.showRoom?.company_name,
    specificInvoice?.showRoom?.showRoom_address,
    specificInvoice?.showRoom?.showRoom_name,
    specificInvoice?.showRoom?.vehicle_username,
    specificInvoice?.user_type,
    specificInvoice?.vehicle?.carReg_no,
    specificInvoice?.vehicle?.car_registration_no,
    specificInvoice?.vehicle?.chassis_no,
    specificInvoice?.vehicle?.engine_no,
    specificInvoice?.vehicle?.mileage,
    specificInvoice?.vehicle?.vehicle_brand,
    specificInvoice?.vehicle?.vehicle_name,
  ]);

  const handleRemove = (index) => {
    if (!index) {
      const list = [...items];

      setItems(list);
    } else {
      const list = [...items];
      list.splice(index, 1);
      setItems(list);
    }
  };

  const handleServiceDescriptionRemove = (index) => {
    if (!index) {
      const list = [...serviceItems];

      setServiceItems(list);
    } else {
      const list = [...serviceItems];
      list.splice(index, 1);
      setServiceItems(list);
    }
  };

  const { data } = useGetSingleInvoiceQuery({ tenantDomain, id });
  useEffect(() => {
    if (data?.data) {
      setSpecificInvoice(data.data);
    }
  }, [data]);

  useEffect(() => {
    const totalSum = specificInvoice.input_data?.reduce(
      (sum, item) => sum + Number(item.total),
      0
    );

    const totalSum2 = items.reduce((sum, item) => sum + Number(item.total), 0);

    const serviceTotalSum = specificInvoice?.service_input_data?.reduce(
      (sum, item) => sum + Number(item.total),
      0
    );

    const serviceTotalSum2 = serviceItems.reduce(
      (sum, item) => sum + Number(item.total),
      0
    );

    const newTotalSum = isNaN(totalSum) ? 0 : totalSum;
    const newTotalSum2 = isNaN(totalSum2) ? 0 : totalSum2;
    const newServiceTotalSum = isNaN(serviceTotalSum) ? 0 : serviceTotalSum;
    const newServiceTotalSum2 = isNaN(serviceTotalSum2) ? 0 : serviceTotalSum2;

    const newGrandTotal = newTotalSum + newTotalSum2;
    const newServiceGrandTotal = newServiceTotalSum + newServiceTotalSum2;

    const totalGrand = Number.parseFloat(
      newGrandTotal + newServiceGrandTotal
    ).toFixed(2);
    setPartsTotal(newGrandTotal);
    setServiceTotal(newServiceGrandTotal);
    setGrandTotal(totalGrand);
  }, [
    items,
    serviceItems,
    specificInvoice?.input_data,
    specificInvoice?.service_input_data,
  ]);

  const handleDateChange = (newValue) => {
    if (newValue) {
      const formattedDate = newValue.format("YYYY-MM-DD");
      setSelectedDate(formattedDate);
    }
  };

  const handleDescriptionChange = (index, value) => {
    const newItems = [...specificInvoice.input_data];
    newItems[index] = {
      ...newItems[index],
      description: value,
    };
    setSpecificInvoice((prevState) => ({
      ...prevState,
      input_data: newItems,
    }));
  };
  const handleDescriptionChange2 = (index, value) => {
    const newItems = [...items];

    newItems[index].description = value;

    setItems(newItems);
  };
  const handleServiceDescriptionChange = (index, value) => {
    const newItems = [...specificInvoice.service_input_data];
    newItems[index] = {
      ...newItems[index],
      description: value,
    };
    setSpecificInvoice((prevState) => ({
      ...prevState,
      service_input_data: newItems,
    }));
  };
  const handleServiceDescriptionChange2 = (index, value) => {
    const newItems = [...serviceItems];

    newItems[index].description = value;

    setServiceItems(newItems);
  };

  const handleQuantityChange = (index, value) => {
    if (!isNaN(value)) {
      const newItems = [...specificInvoice.input_data];
      const roundedValue = Math.round(value) || 0;
      newItems[index].quantity = Number(roundedValue);

      newItems[index].total = Number(roundedValue) * newItems[index].rate;
      newItems[index].total = Number(newItems[index].total.toFixed(2));
      setSpecificInvoice((prevState) => ({
        ...prevState,
        input_data: newItems,
      }));
    }
  };

  const handleQuantityChange2 = (index, value) => {
    const newItems = [...items];
    const roundedValue = Math.round(value) || 0;
    newItems[index].quantity = Number(roundedValue);

    newItems[index].total = Number(roundedValue) * newItems[index].rate;
    newItems[index].total = Number(newItems[index].total.toFixed(2));
    setItems(newItems);
  };
  const handleServiceQuantityChange = (index, value) => {
    if (!isNaN(value)) {
      const newItems = [...specificInvoice.service_input_data];
      const roundedValue = Math.round(value) || 0;
      newItems[index].quantity = Number(roundedValue);

      newItems[index].total = Number(roundedValue) * newItems[index].rate;
      newItems[index].total = Number(newItems[index].total.toFixed(2));
      setSpecificInvoice((prevState) => ({
        ...prevState,
        service_input_data: newItems,
      }));
    }
  };

  const handleServiceQuantityChange2 = (index, value) => {
    const newItems = [...serviceItems];
    const roundedValue = Math.round(value) || 0;
    newItems[index].quantity = Number(roundedValue);

    newItems[index].total = Number(roundedValue) * newItems[index].rate;
    newItems[index].total = Number(newItems[index].total.toFixed(2));
    setServiceItems(newItems);
  };
  const handleUnitChange = (index, value) => {
    const newItems = [...serviceItems];
    newItems[index].unit = value;
    setServiceItems(newItems);
  };

  const handleUnitChange2 = (index, value) => {
    const newItems = [...specificInvoice.service_input_data];
    newItems[index] = {
      ...newItems[index],
      unit: value,
    };
    setSpecificInvoice((prevState) => ({
      ...prevState,
      service_input_data: newItems,
    }));
  };
  const handleInputUnitChange = (index, value) => {
    const newItems = [...items];
    newItems[index].unit = value;
    setItems(newItems);
  };

  const handleInputUnitChange2 = (index, value) => {
    const newItems = [...specificInvoice.input_data];
    newItems[index] = {
      ...newItems[index],
      unit: value,
    };
    setSpecificInvoice((prevState) => ({
      ...prevState,
      input_data: newItems,
    }));
  };

  const handleRateChange = (index, value) => {
    // Remove any non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");

    const newItems = [...specificInvoice.input_data];
    newItems[index].rate = Number(numericValue) || 0;
    newItems[index].total = Number(
      newItems[index].quantity * newItems[index].rate
    );
    newItems[index].total = Number(newItems[index].total.toFixed(2));
    setSpecificInvoice((prevState) => ({
      ...prevState,
      input_data: newItems,
    }));
  };

  const handleRateChange2 = (index, value) => {
    // Remove any non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");

    const newItems = [...items];
    newItems[index].rate = Number(numericValue) || 0;
    newItems[index].total = Number(
      newItems[index].quantity * newItems[index].rate
    );
    newItems[index].total = Number(newItems[index].total.toFixed(2));
    setItems(newItems);
  };

  const handleServiceRateChange = (index, value) => {
    // Remove any non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");

    const newItems = [...specificInvoice.service_input_data];
    newItems[index].rate = Number(numericValue) || 0;
    newItems[index].total = Number(
      newItems[index].quantity * newItems[index].rate
    );
    newItems[index].total = Number(newItems[index].total.toFixed(2));
    setSpecificInvoice((prevState) => ({
      ...prevState,
      service_input_data: newItems,
    }));
  };

  const handleServiceRateChange2 = (index, value) => {
    // Remove any non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");

    const newItems = [...serviceItems];
    newItems[index].rate = Number(numericValue) || 0;
    newItems[index].total = Number(
      newItems[index].quantity * newItems[index].rate
    );
    newItems[index].total = Number(newItems[index].total.toFixed(2));
    setServiceItems(newItems);
  };

  const handleDiscountChange = (value) => {
    const parsedValue = Number(value);

    if (!isNaN(parsedValue)) {
      setDiscount(parsedValue);
    }
  };

  const handleVATChange = (value) => {
    const parsedValue = Number(value);

    if (!isNaN(parsedValue)) {
      setVAT(parsedValue);
    }
  };
  const handleAdvance = (value) => {
    const parsedValue = Number(value);

    if (!isNaN(parsedValue)) {
      setAdvance(parsedValue);
    }
  };

  const calculateFinalTotal = () => {
    let finalTotal;
    let differenceExistAndNewGrandTotal = 0; // Initialize to 0
    let vatAsPercentage = 0;
    let discountAsPercentage = 0;
    let totalAfterDiscount = 0;

    // Calculate the difference between the grand total and the specific quotation's total amount
    if (grandTotal !== specificInvoice?.total_amount) {
      differenceExistAndNewGrandTotal =
        grandTotal - (Number(specificInvoice?.total_amount) || 0); // Convert to number
    }

    // Determine the discount percentage
    if (discount > 0) {
      discountAsPercentage = discount;
    } else if (discount === 0) {
      discountAsPercentage = 0; // If it's 0, we assign 0 but ensure it won't reduce the amount
    } else if (discount === "") {
      discountAsPercentage = Number(specificInvoice?.discount) || 0;
    }

    // Convert specificInvoice?.total_amount to a number
    const specificTotalAmount = Number(specificInvoice?.total_amount) || 0; // Ensure it's treated as a number
    const differenceWithoutDiscount =
      specificTotalAmount + differenceExistAndNewGrandTotal;

    // Apply discount
    if (discountAsPercentage === 0) {
      totalAfterDiscount = differenceWithoutDiscount;
    } else if (discountAsPercentage === "") {
      totalAfterDiscount =
        differenceWithoutDiscount - (Number(specificInvoice?.discount) || 0);
    } else {
      totalAfterDiscount = differenceWithoutDiscount - discountAsPercentage;
    }

    // Ensure that if there's no discount, no subtraction happens
    totalAfterDiscount = totalAfterDiscount < 0 ? 0 : totalAfterDiscount;

    // Determine the VAT percentage
    if (vat > 0) {
      vatAsPercentage = vat;
    } else if (vat === 0) {
      vatAsPercentage = 0;
    } else if (vat === "") {
      vatAsPercentage = Number(specificInvoice?.vat) || 0;
    }

    // Calculate total after VAT
    const calculateVat = totalAfterDiscount * (vatAsPercentage / 100);

    const totalAfterTax = totalAfterDiscount + calculateVat;
    // Final total with 2 decimal precision
    finalTotal = Number.parseFloat(totalAfterTax).toFixed(2);

    return finalTotal;
  };

  const calculateDue = () => {
    let due;

    // Determine the advance amount based on the conditions
    const advanceAmount =
      advance !== undefined && advance !== ""
        ? Number(advance)
        : Number(specificInvoice?.advance) || 0;

    // Calculate due based on the calculated final total and advance amount
    due = calculateFinalTotal() - advanceAmount;

    // Ensure the due is a valid number and round it to 2 decimal places
    if (isNaN(due) || due < 0) {
      due = 0;
    } else {
      due = Number.parseFloat(due).toFixed(2);
    }

    return due;
  };

  const handleAddClick = () => {
    setItems([...items, { description: "", unit: "", quantity: "", date: "" }]);
    if (partsDiscountRef.current) {
      partsDiscountRef.current.value = discount
        ? discount
        : specificInvoice?.discount;
      netTotalAmountRef.current.innerText = calculateFinalTotal();
    }
  };

  const handleServiceDescriptionAdd = () => {
    setServiceItems([
      ...serviceItems,
      { description: "", unit: "", quantity: "", rate: "", total: "" },
    ]);
    if (partsDiscountRef.current) {
      partsDiscountRef.current.value = discount
        ? discount
        : specificInvoice?.discount;
      netTotalAmountRef.current.innerText = calculateFinalTotal();
    }
  };

  const handlePartsAddButton = () => {
    setAddButton(!addButton);
    if (partsDiscountRef.current) {
      partsDiscountRef.current.value = discount
        ? discount
        : specificInvoice?.discount;
      netTotalAmountRef.current.innerText = calculateFinalTotal();
    }
  };

  const handleServiceAddButton = () => {
    setServiceAddButton(!serviceAddButton);
    if (partsDiscountRef.current) {
      partsDiscountRef.current.value = discount
        ? discount
        : specificInvoice?.discount;
      netTotalAmountRef.current.innerText = calculateFinalTotal();
    }
  };

  const handleRemoveButton = async (i, name) => {
    const values = {
      id: id,
      data: { index: i, invoice_name: name },
    };

    const res = await removeInvoice(values).unwrap();

    if (res.success) {
      setReload(!reload);
      toast.success(res.message);
    }
  };

  const input_data = [
    ...(specificInvoice?.input_data || []),
    ...items
      .filter((item) => item.total !== undefined && item.total !== "")
      .map((item) => ({
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        unit: item.unit,
        total: item.total,
      })),
  ];
  const service_input_data = [
    ...(specificInvoice?.service_input_data || []),
    ...serviceItems
      .filter((item) => item.total !== undefined && item.total !== "")
      .map((item) => ({
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        unit: item.unit,
        total: item.total,
      })),
  ];

  const onSubmit = async (data) => {
    setRemoveButton("");

    try {
      const customer = {
        company_name: data.company_name,

        customer_name: data.customer_name,
        customer_contact: data.customer_contact,
        customer_country_code: data.company_country_code,

        customer_address: data.customer_address,
      };

      const company = {
        company_name: data.company_name,
        vehicle_username: data.vehicle_username,
        company_address: data.company_address,
        company_contact: data.company_contact,
        company_country_code: data.company_country_code,
      };

      const showRoom = {
        showRoom_name: data.showRoom_name,
        vehicle_username: data.vehicle_username,

        company_name: data.company_name,
        company_contact: data.company_contact,
        company_country_code: data.company_country_code,

        company_address: data.company_address,
      };

      // Get the current mileage value
      const newMileageValue = Number(data.mileage);

      // Check if we need to add a new mileage entry
      const updatedMileageHistory = [...(specificInvoice.mileageHistory || [])];

      // Only add a new entry if it's a valid number and not already in the history
      if (!isNaN(newMileageValue) && newMileageValue > 0) {
        const mileageExists = updatedMileageHistory.some(
          (entry) => entry.mileage === newMileageValue
        );

        if (!mileageExists) {
          updatedMileageHistory.push({
            mileage: newMileageValue,
            date: new Date().toISOString(),
          });
        }
      }
      const vehicle = {
        carReg_no: data.carReg_no,
        car_registration_no: data.car_registration_no,
        chassis_no: data.chassis_no,
        engine_no: data.engine_no,
        vehicle_brand: data.vehicle_brand,
        vehicle_name: data.vehicle_name,
        mileage:
          specificInvoice?.vehicle?.mileageHistory?.length > 0
            ? specificInvoice?.vehicle?.mileageHistory[
                specificInvoice?.vehicle?.mileageHistory.length - 1
              ].mileage
            : Number(data.mileage),
        mileageHistory: specificInvoice?.vehicle?.mileageHistory || [],
      };

      const invoice = {
        user_type: specificInvoice?.user_type,
        Id: specificInvoice?.Id,
        job_no: specificInvoice?.job_no,
        date: selectedDate || specificInvoice?.date,

        parts_total: partsTotal || specificInvoice.parts_total,
        service_total: serviceTotal || specificInvoice.serviceTotal,
        total_amount: grandTotal || specificInvoice?.total_amount,
        discount:
          discount === 0 || discount > 0 ? discount : specificInvoice?.discount,

        vat: vat === 0 || vat > 0 ? vat : specificInvoice?.vat,
        net_total: calculateFinalTotal() || specificInvoice.net_total,

        advance:
          advance === 0 || advance > 0 ? advance : specificInvoice?.advance,
        due: calculateDue() || specificInvoice.due,
        input_data: input_data,
        service_input_data: service_input_data,
      };

      const values = {
        tenantDomain,
        customer,
        company,
        showRoom,
        vehicle,
        invoice,
      };
      const newValue = {
        id: id,
        data: {
          ...values,
        },
      };

      if (removeButton === "") {
        const res = await updateInvoice(newValue).unwrap();
        if (res.success) {
          setReload(!reload);
        }
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  const handleOnSubmit = () => {
    handleSubmit(onSubmit)();
    if (!userTypeFromProfile) {
      navigate("/dashboard/invoice-view");
    }
    if (userTypeFromProfile === "company") {
      navigate(`/dashboard/company-profile?id=${userFromProfile}`);
    }
    if (userTypeFromProfile === "customer") {
      navigate(`/dashboard/customer-profile?id=${userFromProfile}`);
    }
    if (userTypeFromProfile === "showRoom") {
      navigate(`/dashboard/show-room-profile?id=${userFromProfile}`);
    }

    toast.success("Invoice update successful");
  };

  const handleGoMoneyReceipt = () => {
    handleSubmit(onSubmit)();
    navigate(
      `/dashboard/money-receive?order_no=${specificInvoice?.job_no}&id=${id}&net_total=${specificInvoice?.net_total}`
    );
  };
  const handleGoPreview = () => {
    handleSubmit(onSubmit)();
    navigate(`/dashboard/detail?id=${id}`);
  };

  return (
    <div className="px-5 py-10">
      <div className=" addJobCardHeads">
        <img
          src={CompanyInfoData?.data?.logo}
          alt="logo"
          className=" addJobLogoImg"
        />
        <div>
          <h2 className=" trustAutoTitle trustAutoTitleQutation">
            {CompanyInfoData?.data?.companyName}
          </h2>
          <span className="text-[12px] lg:text-xl mt-5 block">
            Office: {CompanyInfoData?.data?.address}
          </span>
        </div>
        <TrustAutoAddress />
      </div>

      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex md:flex-row flex-col justify-between items-center">
            <div className="hidden"></div>
            <div className="vehicleCard">Update Invoice </div>

            <div className="flex items-center gap-x-2">
              {/* Track if user has interacted with the date picker */}
              {!selectedDate || selectedDate === specificInvoice?.date ? (
                <div className="flex items-center gap-x-2">
                  <div className="border py-4 px-5 rounded-md ">
                    {selectedDate}
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "170px" }}
                      label="Invoice Date"
                      value={selectedDate ? dayjs(selectedDate) : dayjs()}
                      onChange={(newValue) => {
                        if (newValue) {
                          const formattedDate = newValue.format("YYYY-MM-DD");
                          // This will hide the div and only show DatePicker
                          setSelectedDate(formattedDate);
                        }
                      }}
                      slotProps={{
                        textField: { fullWidth: true, variant: "outlined" },
                      }}
                    />
                  </LocalizationProvider>
                </div>
              ) : (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "170px" }}
                    label="Invoice Date"
                    value={selectedDate ? dayjs(selectedDate) : dayjs()}
                    onChange={(newValue) => {
                      if (newValue) {
                        const formattedDate = newValue.format("YYYY-MM-DD");
                        setSelectedDate(formattedDate);
                      }
                    }}
                    slotProps={{
                      textField: { fullWidth: true, variant: "outlined" },
                    }}
                  />
                </LocalizationProvider>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-10 ">
            <Box>
              <h3 className="text-xl lg:text-3xl font-bold mb-3 ">
                Customer Info
              </h3>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Job Card No"
                    {...register("job_no")}
                    // onChange={(e) => setOrderNumber(e.target.value)}
                    focused={specificInvoice?.job_no || ""}
                    required
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Customer Id"
                    {...register("Id")}
                    focused={specificInvoice?.Id || ""}
                    required
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Company"
                    focused={
                      specificInvoice?.customer?.company_name ||
                      specificInvoice?.company?.company_name ||
                      specificInvoice?.showRoom?.company_name
                    }
                    {...register("company_name")}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  {!specificInvoice && (
                    <TextField
                      fullWidth
                      label="Customer"
                      focused={specificInvoice?.customer?.customer_name || ""}
                      {...register("customer_name")}
                    />
                  )}
                  {specificInvoice?.user_type === "customer" && (
                    <TextField
                      fullWidth
                      label="Customer"
                      focused={specificInvoice?.customer?.customer_name || ""}
                      {...register("customer_name")}
                    />
                  )}
                  {(specificInvoice?.user_type === "company" ||
                    specificInvoice?.user_type === "showRoom") && (
                    <TextField
                      fullWidth
                      label="Customer"
                      focused={
                        specificInvoice?.company?.vehicle_username ||
                        specificInvoice?.showRoom?.vehicle_username
                      }
                      {...register("vehicle_username")}
                    />
                  )}
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={5} sm={12} xs={12}>
                      <Autocomplete
                        fullWidth
                        freeSolo
                        options={countries}
                        getOptionLabel={(option) => option.label}
                        value={countryCode}
                        onChange={(event, newValue) => {
                          setCountryCode(newValue);
                          setPhoneNumber(""); // Reset the phone number when changing country codes
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            {...register("customer_country_code")}
                            label="Select Country Code"
                            variant="outlined"
                            focused={
                              specificInvoice?.customer
                                ?.customer_country_code || ""
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={9} md={7} sm={12} xs={12}>
                      {!specificInvoice && (
                        <TextField
                          {...register("customer_contact")}
                          variant="outlined"
                          fullWidth
                          type="tel"
                          value={
                            phoneNumber
                              ? phoneNumber
                              : specificInvoice?.customer?.customer_contact
                          }
                          onChange={handlePhoneNumberChange}
                          placeholder="Customer Contact No (N)"
                        />
                      )}
                      {specificInvoice?.user_type === "customer" && (
                        <TextField
                          {...register("customer_contact")}
                          variant="outlined"
                          fullWidth
                          type="tel"
                          value={
                            phoneNumber
                              ? phoneNumber
                              : specificInvoice?.customer?.customer_contact
                          }
                          onChange={handlePhoneNumberChange}
                          placeholder="Customer Contact No (N)"
                          focused={
                            specificInvoice?.customer?.customer_contact || ""
                          }
                        />
                      )}
                      {(specificInvoice?.user_type === "company" ||
                        specificInvoice?.user_type === "showRoom") && (
                        <TextField
                          {...register("company_contact")}
                          variant="outlined"
                          fullWidth
                          type="tel"
                          value={
                            phoneNumber
                              ? phoneNumber
                              : specificInvoice?.customer?.customer_contact
                          }
                          onChange={handlePhoneNumberChange}
                          placeholder="Company Contact No (N)"
                          focused={
                            specificInvoice?.company?.company_contact ||
                            specificInvoice?.showRoom?.company_contact
                          }
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  {!specificInvoice && (
                    <TextField
                      fullWidth
                      label="Address"
                      {...register("customer_address")}
                    />
                  )}
                  {specificInvoice?.user_type === "customer" && (
                    <TextField
                      fullWidth
                      label="Address"
                      {...register("customer_address")}
                      focused={specificInvoice?.customer?.customer_address}
                    />
                  )}
                  {specificInvoice?.user_type === "company" && (
                    <TextField
                      fullWidth
                      label="Address"
                      {...register("company_address")}
                      focused={specificInvoice?.company?.company_address || ""}
                    />
                  )}
                  {specificInvoice?.user_type === "showRoom" && (
                    <TextField
                      fullWidth
                      label="Address"
                      {...register("showRoom_address")}
                      focused={
                        specificInvoice?.showRoom?.showRoom_address || ""
                      }
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
            <Box>
              <h3 className="text-xl lg:text-3xl font-bold mb-3">
                Vehicle Info
              </h3>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Chassis No"
                    value={specificInvoice?.chassis_no}
                    {...register("chassis_no")}
                    focused={specificInvoice?.vehicle?.chassis_no || ""}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={5} sm={12} xs={12}>
                      <Autocomplete
                        sx={{ marginRight: "5px" }}
                        freeSolo
                        fullWidth
                        id="free-solo-demo"
                        // options={
                        //   specificInvoice?.vehicle?.carReg_no
                        //     ? [specificInvoice.vehicle.carReg_no]
                        //     : []
                        // }
                        options={cmDmOptions.map((option) => option.label)}
                        value={specificInvoice?.vehicle?.carReg_no || ""}
                        onChange={(event, newValue) => {
                          setValue("carReg_no", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            label="Vehicle Reg No (New field)"
                            {...register("carReg_no")}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={9} md={7} sm={12} xs={12}>
                      <InputMask
                        mask="99-9999"
                        maskChar={null}
                        {...register("car_registration_no")}
                      >
                        {(inputProps) => (
                          <TextField
                            fullWidth
                            {...inputProps}
                            {...register("car_registration_no")}
                            label="Car R (N)"
                            focused={
                              specificInvoice?.vehicle?.car_registration_no ||
                              ""
                            }
                          />
                        )}
                      </InputMask>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Engine & CC"
                    value={specificInvoice?.engine_no}
                    {...register("engine_no")}
                    focused={specificInvoice?.vehicle?.engine_no || ""}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Vehicle Name"
                    value={specificInvoice?.vehicle_name}
                    {...register("vehicle_name")}
                    focused={specificInvoice?.vehicle?.vehicle_name || ""}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Autocomplete
                    multiple
                    id="tags-filled"
                    options={
                      specificInvoice?.vehicle?.mileageHistory
                        ?.slice(-1)
                        .map(
                          (option) =>
                            `${option.mileage} km (${new Date(
                              option.date
                            ).toLocaleDateString()})`
                        ) || []
                    }
                    value={
                      specificInvoice?.vehicle?.mileageHistory
                        ?.slice(-1)
                        .map(
                          (option) =>
                            `${option.mileage} km (${new Date(
                              option.date
                            ).toLocaleDateString()})`
                        ) || []
                    }
                    freeSolo
                    disableClearable
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.stopPropagation();
                      }
                    }}
                    onChange={(event, newValue) => {
                      const currentHistory = [
                        ...(specificInvoice?.vehicle?.mileageHistory || []),
                      ];

                      // Handle deletion
                      if (newValue.length === 0) {
                        const updatedHistory = currentHistory.slice(0, -1);
                        setSpecificInvoice((prev) => ({
                          ...prev,
                          vehicle: {
                            ...prev.vehicle,
                            mileageHistory: updatedHistory,
                          },
                        }));
                        return;
                      }

                      // Handle addition
                      const newEntry = newValue[newValue.length - 1];
                      const mileageMatch = newEntry.match(/^(\d+)/);
                      const newMileage = mileageMatch
                        ? Number.parseInt(mileageMatch[1])
                        : 0;
                      const lastEntry =
                        currentHistory[currentHistory.length - 1];

                      if (!lastEntry || lastEntry.mileage !== newMileage) {
                        const updatedHistory = [
                          ...currentHistory,
                          {
                            mileage: newMileage,
                            date: new Date().toISOString(),
                          },
                        ];

                        setSpecificInvoice((prev) => ({
                          ...prev,
                          vehicle: {
                            ...prev.vehicle,
                            mileageHistory: updatedHistory,
                          },
                        }));
                      }
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          key={index}
                          {...getTagProps({ index })}
                          onDelete={(e) => {
                            const currentHistory = [
                              ...(specificInvoice?.vehicle?.mileageHistory ||
                                []),
                            ];
                            const updatedHistory = currentHistory.slice(0, -1);

                            setSpecificInvoice((prev) => ({
                              ...prev,
                              vehicle: {
                                ...prev.vehicle,
                                mileageHistory: updatedHistory,
                              },
                            }));
                          }}
                          className="bg-gray-100 border-gray-300 text-gray-800"
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Mileage History"
                        placeholder="Add new mileage"
                        size="medium"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {params.InputProps.endAdornment}
                              <button
                                type="button"
                                className="sm:hidden absolute right-8 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const input = document
                                    .getElementById("tags-filled")
                                    ?.querySelector("input");
                                  const inputValue = input?.value || "";

                                  if (inputValue) {
                                    const currentHistory = [
                                      ...(specificInvoice?.vehicle
                                        ?.mileageHistory || []),
                                    ];
                                    const mileageMatch =
                                      inputValue.match(/^(\d+)/);
                                    const newMileage = mileageMatch
                                      ? Number.parseInt(mileageMatch[1])
                                      : 0;
                                    const lastEntry =
                                      currentHistory[currentHistory.length - 1];

                                    if (
                                      !lastEntry ||
                                      lastEntry.mileage !== newMileage
                                    ) {
                                      const updatedHistory = [
                                        ...currentHistory,
                                        {
                                          mileage: newMileage,
                                          date: new Date().toISOString(),
                                        },
                                      ];

                                      setSpecificInvoice((prev) => ({
                                        ...prev,
                                        vehicle: {
                                          ...prev.vehicle,
                                          mileageHistory: updatedHistory,
                                        },
                                      }));

                                      if (input) input.value = "";
                                    }
                                  }
                                }}
                              >
                                Add
                              </button>
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          <div className="grid grid-cols-12 gap-2 items-center font-bold mb-5 md:mb-1 ">
            <label className="col-span-6 md:col-span-1 text-center hidden md:block ">
              SL No
            </label>
            <label className="col-span-12 md:col-span-6 text-center">
              Services Description
            </label>
            <label className="col-span-6 md:col-span-2 text-center hidden md:block  ">
              Qty
            </label>
            <label className="col-span-6 md:col-span-1 text-center hidden md:block ">
              Rate
            </label>
            <label className="col-span-6 md:col-span-1 text-center hidden md:block  ">
              Amount
            </label>
            <label className="opacity-0 col-span-6 md:col-span-1 hidden md:block">
              hidden items for responsive
            </label>
          </div>
          <div>
            {specificInvoice?.service_input_data?.length > 0 && (
              <>
                {specificInvoice?.service_input_data?.map((item, i) => {
                  return (
                    <div key={i}>
                      <div className="grid grid-cols-12 gap-2 items-center mt-3 ">
                        <div className="col-span-12 md:col-span-1">
                          <input
                            className="inputField"
                            autoComplete="off"
                            type="text"
                            placeholder="SL No "
                            defaultValue={`${i + 1 < 10 ? `0${i + 1}` : i + 1}`}
                            required
                          />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                          <input
                            className="inputField"
                            autoComplete="off"
                            type="text"
                            placeholder="Description"
                            onChange={(e) =>
                              handleServiceDescriptionChange(i, e.target.value)
                            }
                            value={item.description}
                            required
                          />
                        </div>
                        <div className="col-span-12 md:col-span-2 flex gap-2">
                          <div className="grid grid-cols-12 quotationSelect">
                            <input
                              className="inputField col-span-3"
                              autoComplete="off"
                              type="text"
                              placeholder="Qty"
                              onChange={(e) =>
                                handleServiceQuantityChange(i, e.target.value)
                              }
                              required
                              value={item.quantity}
                            />
                            <select
                              className="inputField col-span-9"
                              onChange={(e) =>
                                handleUnitChange2(i, e.target.value)
                              }
                              value={item.unit || ""}
                              required
                            >
                              <option value="" disabled>
                                Select Unit
                              </option>
                              {unitOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-1">
                          <input
                            className="inputField"
                            autoComplete="off"
                            type="text"
                            placeholder="Rate"
                            onChange={(e) =>
                              handleServiceRateChange(i, e.target.value)
                            }
                            required
                            value={formatNumber(item.rate)}
                          />
                        </div>
                        <div className="col-span-12 md:col-span-1">
                          <input
                            className="inputField"
                            autoComplete="off"
                            type="text"
                            placeholder="Amount"
                            value={formatNumber(item.total)}
                            readOnly
                          />
                        </div>
                        <div
                          className="col-span-12 md:col-span-1"
                          onClick={() => setRemoveButton("remove")}
                        >
                          {items.length !== 0 && (
                            <button
                              disabled={removeLoading}
                              onClick={() => handleRemoveButton(i, "service")}
                              className="w-full  bg-[#FF4C4C] hover:bg-[#FF3333] text-white rounded-md  py-2 px-2 justify-center "
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div>
            <div className="flex justify-end mt-1 ">
              {!serviceAddButton && (
                <button
                  onClick={handleServiceAddButton}
                  className="w-[135px] bg-[#42A1DA]  hover:bg-[#42A1DA] text-white p-2 rounded-md"
                >
                  Add new
                </button>
              )}
              {serviceAddButton && (
                <button
                  onClick={handleServiceAddButton}
                  className="border border-[#42A1DA] hover:border-[#42A1DA] text-black rounded-md px-2 py-2 mb-2"
                >
                  Cancel
                </button>
              )}
            </div>
            {serviceAddButton && (
              <>
                {serviceItems.map((item, i) => {
                  return (
                    <div key={i}>
                      <div className="grid grid-cols-12 gap-2 items-center mt-3 ">
                        <div className="col-span-12 md:col-span-1">
                          <input
                            className="inputField"
                            autoComplete="off"
                            type="text"
                            placeholder="SL No "
                            defaultValue={`${i + 1 < 10 ? `0${i + 1}` : i + 1}`}
                            required
                          />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                          <input
                            className="inputField"
                            autoComplete="off"
                            type="text"
                            placeholder="Description"
                            onChange={(e) =>
                              handleServiceDescriptionChange2(i, e.target.value)
                            }
                            value={item.description}
                            required
                          />
                        </div>
                        <div className="col-span-12 md:col-span-2 flex gap-2">
                          <div className="grid grid-cols-12 quotationSelect">
                            <input
                              className="inputField col-span-3"
                              autoComplete="off"
                              type="text"
                              placeholder="Qty"
                              onChange={(e) =>
                                handleServiceQuantityChange2(i, e.target.value)
                              }
                              value={item.quantity}
                              required
                            />
                            <select
                              className="inputField col-span-9"
                              onChange={(e) =>
                                handleUnitChange(i, e.target.value)
                              }
                              value={item.unit || ""}
                              required
                            >
                              <option value="" disabled>
                                Select Unit
                              </option>
                              {unitOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-1">
                          <input
                            className="inputField"
                            autoComplete="off"
                            type="text"
                            placeholder="Rate"
                            onChange={(e) =>
                              handleServiceRateChange2(i, e.target.value)
                            }
                            value={formatNumber(item.rate)}
                            required
                          />
                        </div>
                        <div className="col-span-12 md:col-span-1">
                          <input
                            className="inputField"
                            autoComplete="off"
                            type="text"
                            placeholder="Amount"
                            value={formatNumber(item.total)}
                            readOnly
                          />
                        </div>
                        <div className="col-span-12 md:col-span-1">
                          {items.length !== 0 && (
                            <button
                              onClick={() => handleServiceDescriptionRemove(i)}
                              className="w-full  bg-[#FF4C4C] hover:bg-[#FF3333] text-white rounded-md  py-2 px-2 justify-center "
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end  ">
                        {items.length - 1 === i && (
                          <button
                            onClick={handleServiceDescriptionAdd}
                            className="w-[135px] bg-[#42A1DA]  hover:bg-[#42A1DA] text-white p-2 rounded-md"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          <div className="grid grid-cols-12 gap-2 items-center font-bold mt-5  md:mb-1 ">
            <label className="col-span-6 md:col-span-1 text-center hidden md:block ">
              SL No
            </label>
            <label className="col-span-12 md:col-span-6 text-center">
              Parts Description
            </label>
            <label className="col-span-6 md:col-span-2 text-center hidden md:block  ">
              Qty
            </label>
            <label className="col-span-6 md:col-span-1 text-center hidden md:block ">
              Rate
            </label>
            <label className="col-span-6 md:col-span-1 text-center hidden md:block  ">
              Amount
            </label>
            <label className="opacity-0 col-span-6 md:col-span-1 hidden md:block ">
              hidden items for responsive
            </label>
          </div>
          <div>
            {specificInvoice?.input_data?.length > 0 && (
              <>
                {specificInvoice?.input_data?.map((item, i) => {
                  return (
                    <div key={i}>
                      <div className="grid grid-cols-12 gap-2 items-center mt-3 ">
                        <div className="col-span-12 md:col-span-1">
                          <input
                            className="inputField"
                            autoComplete="off"
                            type="text"
                            placeholder="SL No "
                            defaultValue={`${i + 1 < 10 ? `0${i + 1}` : i + 1}`}
                            required
                          />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                          <input
                            className="inputField"
                            autoComplete="off"
                            type="text"
                            placeholder="Description"
                            onChange={(e) =>
                              handleDescriptionChange(i, e.target.value)
                            }
                            value={item.description}
                            required
                          />
                        </div>
                        <div className="col-span-12 md:col-span-2 flex gap-2">
                          <div className="grid grid-cols-12 quotationSelect">
                            <input
                              className="inputField col-span-3"
                              autoComplete="off"
                              type="text"
                              placeholder="Qty"
                              onChange={(e) =>
                                handleQuantityChange(i, e.target.value)
                              }
                              required
                              value={item.quantity}
                            />
                            <select
                              className="inputField col-span-9"
                              onChange={(e) =>
                                handleInputUnitChange2(i, e.target.value)
                              }
                              value={item.unit || ""}
                              required
                            >
                              <option value="" disabled>
                                Select Unit
                              </option>
                              {unitOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-1">
                          <input
                            className="inputField"
                            autoComplete="off"
                            type="text"
                            placeholder="Rate"
                            onChange={(e) =>
                              handleRateChange(i, e.target.value)
                            }
                            required
                            value={formatNumber(item.rate)}
                          />
                        </div>
                        <div className="col-span-12 md:col-span-1">
                          <input
                            className="inputField"
                            autoComplete="off"
                            type="text"
                            placeholder="Amount"
                            value={formatNumber(item.total)}
                            readOnly
                          />
                        </div>
                        <div
                          className="col-span-12 md:col-span-1"
                          onClick={() => setRemoveButton("remove")}
                        >
                          {items.length !== 0 && (
                            <button
                              disabled={removeLoading}
                              onClick={() => handleRemoveButton(i, "parts")}
                              className="w-full  bg-[#FF4C4C] hover:bg-[#FF3333] text-white rounded-md  py-2 px-2 justify-center "
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div>
            <div className="flex justify-end mt-2 ">
              {!addButton && (
                <button
                  onClick={handlePartsAddButton}
                  className="w-[135px] bg-[#42A1DA]  hover:bg-[#42A1DA] text-white p-2 rounded-md"
                >
                  Add new
                </button>
              )}
              {addButton && (
                <button
                  onClick={handlePartsAddButton}
                  className="border w-[135px] border-[#42A1DA] hover:border-[#42A1DA] text-black rounded-md px-2 py-2 mb-2"
                >
                  Cancel
                </button>
              )}
            </div>
            {addButton && (
              <>
                {items.map((item, i) => {
                  return (
                    <div key={i}>
                      <div className="grid grid-cols-12 gap-2 items-center mt-3 ">
                        <div className="col-span-12 md:col-span-1">
                          <input
                            className="inputField"
                            autoComplete="off"
                            type="text"
                            placeholder="SL No "
                            defaultValue={`${i + 1 < 10 ? `0${i + 1}` : i + 1}`}
                            required
                          />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                          <input
                            className="inputField"
                            autoComplete="off"
                            type="text"
                            placeholder="Description"
                            onChange={(e) =>
                              handleDescriptionChange2(i, e.target.value)
                            }
                            value={item.description}
                            required
                          />
                        </div>
                        <div className="col-span-12 md:col-span-2 flex gap-2">
                          <div className="grid grid-cols-12 quotationSelect">
                            <input
                              className="inputField col-span-3"
                              autoComplete="off"
                              type="text"
                              placeholder="Qty"
                              onChange={(e) =>
                                handleQuantityChange2(i, e.target.value)
                              }
                              value={item.quantity}
                              required
                            />
                            <select
                              className="inputField col-span-9"
                              onChange={(e) =>
                                handleInputUnitChange(i, e.target.value)
                              }
                              value={item.unit || ""}
                              required
                            >
                              <option value="" disabled>
                                Select Unit
                              </option>
                              {unitOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-1">
                          <input
                            className="inputField"
                            autoComplete="off"
                            type="text"
                            placeholder="Rate"
                            onChange={(e) =>
                              handleRateChange2(i, e.target.value)
                            }
                            value={formatNumber(item.rate)}
                            required
                          />
                        </div>
                        <div className="col-span-12 md:col-span-1">
                          <input
                            className="inputField"
                            autoComplete="off"
                            type="text"
                            placeholder="Amount"
                            value={formatNumber(item.total)}
                            readOnly
                          />
                        </div>
                        <div className="col-span-12 md:col-span-1">
                          {items.length !== 0 && (
                            <button
                              onClick={() => handleRemove(i)}
                              className="w-full  bg-[#FF4C4C] hover:bg-[#FF3333] text-white rounded-md  py-2 px-2 justify-center "
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end mt-1 ">
                        {items.length - 1 === i && (
                          <button
                            onClick={handleAddClick}
                            className="w-[135px] bg-[#42A1DA]  hover:bg-[#42A1DA] text-white p-2 rounded-md"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </form>

        <div className="discountFieldWrap mt-5 ">
          <div className="flex items-center gap-x-2">
            <b> Total Amount: </b>
            <span>
              {formatNumber(
                grandTotal ? grandTotal : specificInvoice.total_amount
              )}
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <b> Discount: </b>
            <input
              className="py-1 text-center"
              onChange={(e) => handleDiscountChange(e.target.value)}
              autoComplete="off"
              type="text"
              placeholder="Discount"
              defaultValue={formatNumber(specificInvoice.discount)}
              ref={partsDiscountRef}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <b>Vat: </b>
            <input
              className="text-center"
              onChange={(e) => handleVATChange(e.target.value)}
              autoComplete="off"
              type="text"
              placeholder="Vat"
              defaultValue={formatNumber(specificInvoice?.vat)}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <div className="flex items-center ">
              <b className="mr-3">Final Total: </b>
              <span ref={netTotalAmountRef}>
                {formatNumber(
                  calculateFinalTotal()
                    ? calculateFinalTotal()
                    : specificInvoice?.net_total
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <b className="mr-2">Advance: </b>
            <input
              className="text-center"
              onChange={(e) => handleAdvance(e.target.value)}
              autoComplete="off"
              type="text"
              placeholder="Advance"
              defaultValue={formatNumber(specificInvoice.advance)}
            />
          </div>

          <div className="flex items-center gap-x-2  ">
            <b className="mr-2">Due: </b>
            <span>{formatNumber(calculateDue())}</span>
          </div>
        </div>

        <div>
          <div className="mt-8 buttonGroup buttonMargin">
            <div className="flex md:flex-row flex-col justify-end">
              <div>
                <button type="submit" onClick={handleGoPreview}>
                  Preview
                </button>

                <button>
                  <a
                    className="bg-[#42A0D9] text-white px-3 py-5  rounded-full "
                    href={`${import.meta.env.VITE_API_URL}/invoices/invoice/${
                      specificInvoice._id
                    }`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download
                  </a>
                </button>

                <button onClick={handleGoMoneyReceipt}>Money Receipt </button>
              </div>
            </div>
          </div>

          <div className="flex  justify-center align-items-center mt-5 ">
            <Button
              sx={{ background: "#42A1DA", color: "#fff" }}
              onClick={handleOnSubmit}
              className="addJobBtn"
              disabled={updateLoading}
            >
              Update Invoice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateInvoice;
