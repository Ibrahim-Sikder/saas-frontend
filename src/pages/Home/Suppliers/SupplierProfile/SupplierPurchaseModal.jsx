/* eslint-disable react/prop-types */
import GarageModal from "../../../../components/Share/Modal/GarageModal";
import PurchaseForm from "../../Parchase/Purchasform";

export default function SupplierPurchaseModal({ open, setOpen }) {
  return (
    <GarageModal
      open={open}
      setOpen={setOpen}
      title="Create New Product"
      maxWidth="xl"
      fullWidth 
      sx={{
        "& .MuiDialog-paper": { padding: "20px" },
      }}
    >
      <PurchaseForm />
    </GarageModal>
  );
}
