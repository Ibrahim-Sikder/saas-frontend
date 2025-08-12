/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { IoCloseSharp } from "react-icons/io5";
import { useGetSingleVehicleQuery } from "../../../../redux/api/vehicle";
import Loading from "../../../../components/Loading/Loading";

const VehicleDetailsModal = ({
  handleVehicleDetailsClose,
  getId,
  id,
  tenantDomain,
}) => {
  const { data: singleVehicle, isLoading } = useGetSingleVehicleQuery({
    tenantDomain,
    id: getId,
  });
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50   ">
      <div className="relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] sm:max-w-[600px] lg:max-w-[500px] p-4 max-h-[90vh] overflow-auto">
        <div className="bg-white shadow-md   rounded-2xl  overflow-hidden">
          <IoCloseSharp
            size={35}
            onClick={handleVehicleDetailsClose}
            width={24}
            height={24}
            className="text-red-600 absolute top-10 right-10 cursor-pointer"
          />
          <div className=" flex items-center py-8 px-10 text-sm  ">
            <div>
              <h2 className="text-2xl font-semibold">Vehicle Details </h2>
              <div className="mt-5">
                <div className="flex items-center justify-between w-full ">
                  <b>Car Registration No </b>
                  <span>{singleVehicle?.data?.car_registration_no}</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Chassis No </b>
                  <span> {singleVehicle?.data?.chassis_no}</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Engine No & CC </b>
                  <span>{singleVehicle?.data?.engine_no}</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Vehicle Brand </b>
                  <span>{singleVehicle?.data?.vehicle_brand} </span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Vehicle Name </b>
                  <span>{singleVehicle?.data?.vehicle_name}</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Vehicle Model </b>
                  <span>{singleVehicle?.data?.vehicle_model}</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Vehicle Category </b>
                  <span>{singleVehicle?.data?.vehicle_category}</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Color & Code </b>
                  <span>{singleVehicle?.data?.color_code}</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Mileage</b>
                  <span>{singleVehicle?.data?.mileage}</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Fuel Type </b>
                  <span>{singleVehicle?.data?.fuel_type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsModal;
