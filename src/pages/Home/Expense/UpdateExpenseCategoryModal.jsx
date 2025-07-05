/* eslint-disable react/prop-types */
import TASRightSideModal from "../../../components/Share/Modal/Modal";
import TASForm from "../../../components/form/Form";
import { Box, Button, Grid } from "@mui/material";
import TASInput from "../../../components/form/Input";
import { toast } from "react-toastify";
import {
  useGetSingleExpenseCategoryQuery,
  useUpdateExpenseCategoryMutation,
} from "../../../redux/api/expense";

const UpdateExpenseCategoryModal = ({ open, setOpen, categoryId }) => {
  const tenantDomain = window.location.hostname.split(".")[0];

  const { data, isLoading } = useGetSingleExpenseCategoryQuery({
    tenantDomain,
    id: categoryId,
  });
  const [updateCategory] = useUpdateExpenseCategoryMutation();

  const handleSubmit = async (data, reset) => {
    const toastId = toast.loading("Updating expense category");
    try {
      const res = await updateCategory({
        tenantDomain,
        id: categoryId,
        ...data,
      }).unwrap();
      toast.success(res.message || "Expense Category update successfully!");
      reset();
      setOpen();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      toast.dismiss(toastId);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const defaultValues = {
    name: data?.name || "",
    code: data?.code || "",
  };
  return (
    <TASRightSideModal
      open={open}
      setOpen={setOpen}
      width="500px"
      sx={{ paddingTop: "10px" }}
      title="Update Expense Category"
    >
      <Box padding="30px" marginTop="20px">
        <TASForm onSubmit={handleSubmit} defaultValues={defaultValues}>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TASInput size="medium" fullWidth name="name" label="Name" />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TASInput size="medium" fullWidth name="code" label="Code" />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Button
                sx={{ color: "white" }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Update Expense Category
              </Button>
            </Grid>
          </Grid>
        </TASForm>
      </Box>
    </TASRightSideModal>
  );
};

export default UpdateExpenseCategoryModal;
