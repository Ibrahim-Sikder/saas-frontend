import { Box } from "@mui/material";
import BarcodeForm from "./BarcodeForm";
import BarcodeTable from "./BarcodeTable";
const Barcode = () => {
  return (
    <div className="py-10">
      <div className="ml-5">
        <h2 className="mb-3">Generate Barcode</h2>
        <span> Product &gt; Generate Barcode </span>
      </div>
      <div className="bg-[#F7F7F7] md:p-8 mt-5 ">
        <div className="md:flex gap-x-8 bg-[#FFFFFF] md:p-8 rounded-md ">
          <div className="md:w-[700px]">
            <BarcodeForm />
          </div>
          <Box
          sx={{
            width: "100%", // Takes full width of parent
            overflow: "auto", // Enables horizontal scrolling
            "& .MuiDataGrid-root": {
              minWidth: "800px", // Ensures columns can overflow (adjust as needed)
            },
            "& .MuiDataGrid-columnHeaders": {
              position: "sticky",
              top: 0,
              zIndex: 1,
              backgroundColor: "white", // Prevents transparency on scroll
            },
            "& .MuiDataGrid-virtualScroller": {
              overflow: "visible", // Allows horizontal overflow
            },
          }}
        >
            <BarcodeTable />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Barcode;
