"use client";

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Autocomplete,
  Box,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  carBrands,
  cmDmOptions,
  countries,
  fuelType,
  vehicleModels,
  vehicleName,
  vehicleTypes,
} from "../../../../constant";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCreateVehicleMutation } from "../../../../redux/api/vehicle";
// Import Material UI icons
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BadgeIcon from "@mui/icons-material/Badge";
import SettingsIcon from "@mui/icons-material/Settings";
import BuildIcon from "@mui/icons-material/Build";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CategoryIcon from "@mui/icons-material/Category";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import FlagIcon from "@mui/icons-material/Flag";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const JobCardForm = ({tenantDomain, onClose, id, user_type }) => {
  const [registrationError, setRegistrationError] = useState("");
  const [driverCountryCode, setDriverCountryCode] = useState(countries[0]);
  const location = useLocation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [driverPhoneNumber, setDriverPhoneNumber] = useState("");
  const [createVehicle, { isLoading, error }] = useCreateVehicleMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

const onSubmit = async (data) => {
  const toastId = toast.loading("Creating Vehicle...");

  const submitData = {
    Id: id,
    user_type: user_type,
    carReg_no: data.carReg_no,
    vehicle_brand: data.vehicle_brand,
    vehicle_name: data.vehicle_name,
    car_registration_no: data.car_registration_no,
    chassis_no: data.chassis_no,
    engine_no: data.engine_no,
    vehicle_category: data.vehicle_category,
    color_code: data.color_code,
    fuel_type: data.fuel_type,
    vehicle_model: Number(data.vehicle_model),
    mileageHistory: [
      {
        mileage: Number(data.mileage),
        date: new Date(),
      },
    ],
    driver_name: data.driver_name,
    driver_contact: data.driver_contact,
    driver_country_code: driverCountryCode.code,
  };

  try {
    const res = await createVehicle({ ...submitData, tenantDomain }).unwrap();

    if (res.success) {
      toast.update(toastId, {
        render: res.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      onClose();
    } else {
      toast.update(toastId, {
        render: "Failed to create vehicle!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  } catch (err) {
    let errorMessage = "Failed to create vehicle!";

    // Backend custom message
    if (err?.data?.message) {
      errorMessage = err.data.message;
    }

    // Backend errorSources array
    if (err?.data?.errorSources?.length > 0) {
      errorMessage = err.data.errorSources[0]?.message || errorMessage;
    }

    // Mongo duplicate key
    if (err?.data?.err?.code === 11000) {
      const key = Object.keys(err.data.err.keyValue)[0];
      const value = err.data.err.keyValue[key];
      errorMessage = `${value} is already exists`;
    }

    toast.update(toastId, {
      render: errorMessage,
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
  }
};


  const [selectedBrand, setSelectedBrand] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  const sortedVehicleName = vehicleName.sort((a, b) => {
    if (a.value < b.value) return -1;
    if (a.value > b.value) return 1;
    return 0;
  });

  const handleBrandChange = (event, newValue) => {
    setSelectedBrand(newValue);
    const filtered = sortedVehicleName.filter(
      (vehicle) => vehicle.label === newValue
    );
    setFilteredVehicles(filtered);
  };

  // year select only number 4 digit
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [yearSelectInput, setYearSelectInput] = useState("");

  // Handle input changes
  const handleYearSelectInput = (event) => {
    const value = event.target.value;
    // Check if the input is a number and does not exceed 4 digits
    if (/^\d{0,4}$/.test(value)) {
      setYearSelectInput(value);
      const filtered = vehicleModels.filter((option) =>
        option.label.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  };
  const handleOptionClick = (option) => {
    setYearSelectInput(option.label);
    setFilteredOptions([]);
  };

  const handleCarRegistrationChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 2) {
      value = value.slice(0, 2) + "-" + value.slice(2);
    }

    if (value.length > 7) {
      value = value.slice(0, 7);
    }

    setRegistrationError(""); // Clear previous error
    if (value.length !== 7) {
      setRegistrationError("Car registration number must be 7 characters");
    }

    // Update input value
    setValue("car_registration_no", value, {
      shouldValidate: true,
    });
  };
  const handleDriverPhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    if (
      /^\d*$/.test(newPhoneNumber) &&
      newPhoneNumber.length <= 10 &&
      (newPhoneNumber === "" ||
        !newPhoneNumber.startsWith("0") ||
        newPhoneNumber.length > 1)
    ) {
      setDriverPhoneNumber(newPhoneNumber);
    }
  };

  return (
    <div className="flex items-center px-2 md:px-8">
      <div className="w-full">
        <h2 className="text-center text-[#42A1DA] font-bold text-2xl uppercase mb-3">
          <AddCircleIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Add Vehicle
        </h2>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Autocomplete
                    freeSolo
                    fullWidth
                    size="medium"
                    id="reg"
                    options={cmDmOptions.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                        size="medium"
                        {...params}
                        label="Vehicle Reg No"
                        {...register("carReg_no", {
                          required: "Vehicle reg no is required !",
                        })}
                        error={!!errors.carReg_no}
                        helperText={errors.carReg_no?.message}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              <InputAdornment position="start">
                                <BadgeIcon color="primary" />
                              </InputAdornment>
                              {params.InputProps.startAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    size="medium"
                    label="Car R (N)"
                    {...register(
                      "car_registration_no",
                      { required: "Car reg no is required" },
                      {
                        pattern: {
                          value: /^[\d-]+$/,
                          message: "Only numbers and hyphens are allowed",
                        },
                        maxLength: {
                          value: 7,
                          message:
                            "Car registration number must be exactly 7 characters",
                        },
                      }
                    )}
                    onChange={handleCarRegistrationChange}
                    error={!!errors.car_registration_no}
                    helperText={errors.car_registration_no?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DirectionsCarIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    size="medium"
                    label="Chassis No (T&N)"
                    {...register("chassis_no", {
                      required: "Chassis no is required!",
                    })}
                    error={!!errors.chassis_no}
                    helperText={errors.chassis_no?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SettingsIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    size="medium"
                    label="ENGINE NO & CC (T&N) "
                    {...register("engine_no", {
                      required: "Engin no is required!",
                    })}
                    error={!!errors.engine_no}
                    helperText={errors.engine_no?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BuildIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Autocomplete
                    size="medium"
                    fullWidth
                    freeSolo
                    onInputChange={(event, newValue) => {}}
                    onChange={handleBrandChange}
                    options={carBrands.map((option) => option.label)}
                    value={selectedBrand}
                    renderInput={(params) => (
                      <TextField
                        size="medium"
                        {...params}
                        label="Vehicle Brand"
                        {...register("vehicle_brand", {
                          required: "Vehicle brand is required!",
                        })}
                        error={!!errors.vehicle_brand}
                        helperText={errors.vehicle_brand?.message}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              <InputAdornment position="start">
                                <BrandingWatermarkIcon color="primary" />
                              </InputAdornment>
                              {params.InputProps.startAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Autocomplete
                    fullWidth
                    size="medium"
                    freeSolo
                    options={filteredVehicles.map((option) => option.value)}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        size="medium"
                        {...params}
                        label="Vehicle Name "
                        {...register("vehicle_name", {
                          required: "Vehicle name is required!",
                        })}
                        error={!!errors.vehicle_name}
                        helperText={errors.vehicle_name?.message}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              <InputAdornment position="start">
                                <DriveEtaIcon color="primary" />
                              </InputAdornment>
                              {params.InputProps.startAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                    getOptionLabel={(option) => option || ""}
                    // disabled={!selectedBrand}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="relative">
                    <div className="flex items-center border border-[#11111194] rounded-md">
                      <div className="pl-3">
                        <CalendarMonthIcon color="primary" />
                      </div>
                      <input
                        value={yearSelectInput}
                        onInput={handleYearSelectInput}
                        {...register("vehicle_model")}
                        type="text"
                        className="border-0 outline-none w-[100%] h-14 p-3 rounded-md"
                        placeholder="Vehicle Model"
                      />
                    </div>
                    {yearSelectInput && (
                      <ul className="options-list">
                        {filteredOptions.map((option, index) => (
                          <li
                            key={index}
                            onClick={() => handleOptionClick(option)}
                          >
                            {option.label}
                          </li>
                        ))}
                      </ul>
                    )}
                    {errors.vehicle_model && (
                      <span className="text-sm text-red-400">
                        {errors.vehicle_model.message}
                      </span>
                    )}
                  </div>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Autocomplete
                    fullWidth
                    size="medium"
                    freeSolo
                    options={vehicleTypes.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=" Vehicle Categories "
                        {...register("vehicle_category")}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              <InputAdornment position="start">
                                <CategoryIcon color="primary" />
                              </InputAdornment>
                              {params.InputProps.startAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    size="medium"
                    freeSolo
                    label="Color & Code (T&N) "
                    {...register("color_code", {
                      required: "Color & Code is required!",
                    })}
                    error={!!errors.color_code}
                    helperText={errors.color_code?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ColorLensIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Mileage (N)"
                    {...register("mileage", {
                      required: "Mileage is required!",
                      pattern: {
                        value: /^\d+$/,
                        message: "Please enter a valid number.",
                      },
                    })}
                    error={!!errors.mileage}
                    helperText={errors.mileage?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SpeedIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Autocomplete
                    fullWidth
                    size="medium"
                    freeSolo
                    options={fuelType.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=" Fuel Type"
                        {...register("fuel_type", {
                          required: "Fuel type is required!",
                        })}
                        error={!!errors.fuel_type}
                        helperText={errors.fuel_type?.message}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              <InputAdornment position="start">
                                <LocalGasStationIcon color="primary" />
                              </InputAdornment>
                              {params.InputProps.startAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Driver Name (T)"
                    {...register("driver_name")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={4} sm={12} xs={12}>
                      <Autocomplete
                        fullWidth
                        freeSolo
                        options={countries}
                        getOptionLabel={(option) => option.code}
                        value={driverCountryCode}
                        onChange={(event, newValue) => {
                          setDriverCountryCode(newValue);
                          setPhoneNumber("");
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Country Code"
                            variant="outlined"
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <>
                                  <InputAdornment position="start">
                                    <FlagIcon color="primary" />
                                  </InputAdornment>
                                  {params.InputProps.startAdornment}
                                </>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={9} md={8} sm={12} xs={12}>
                      <TextField
                        {...register("driver_contact")}
                        fullWidth
                        label="Driver Contact No (N)"
                        variant="outlined"
                        type="tel"
                        value={driverPhoneNumber}
                        onChange={handleDriverPhoneNumberChange}
                        placeholder="Enter phone number"
                        size="medium"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            <button
              disabled={isLoading}
              className="block mt-3 w-full bg-[#42A1DA] text-white font-bold p-4 rounded-lg"
            >
              <AddCircleIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              Add Vehicle
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobCardForm;
