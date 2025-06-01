/* eslint-disable no-unused-vars */
import TASForm from "../../../components/form/Form";
import { Button, Grid, Typography } from "@mui/material";
import TASInput from "../../../components/form/Input";
import { toast } from "react-toastify";
import { useCreateProductTypeMutation } from "../../../redux/api/productTypeApi";


const ProductTypeForm = () => {
  const [productType,] = useCreateProductTypeMutation();

  const handleSubmit = async (data) => {
    try {
      const res = await productType(data).unwrap();
      toast.success("Product Type created successfully!");
    } catch (error) {
      toast.error(
        "Error creating Product Type: " + error.message || "Something went wrong!"
      );
    }
  };

  return (
    <TASForm onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography fontWeight="semi-bold" mb={1}>
            Product Type
          </Typography>
          <TASInput
            size="medium"
            fullWidth
            name="product_type"
            label="Product Type "
          />
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Button type="submit" sx={{ color: "white" }}>
            Create Product Type
          </Button>
        </Grid>
      </Grid>
    </TASForm>
  );
};

export default ProductTypeForm;
