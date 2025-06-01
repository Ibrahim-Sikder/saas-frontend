/* eslint-disable react/prop-types */
import { Button, Grid, Typography } from "@mui/material";
import TASForm from "../../../components/form/Form";
import TAFileupload from "../../../components/form/Fileupload";
import TASInput from "../../../components/form/Input";
import { toast } from "react-toastify";
import {
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../redux/api/categoryApi";
import { useLocation, useNavigate } from "react-router-dom";

const CategoryUpdate = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const { data, isLoading } = useGetSingleCategoryQuery(id);
  const [updateCategory] = useUpdateCategoryMutation();
  const navigate = useNavigate()

  const handleSubmit = async (formData) => {
    try {
      const imageToSubmit =
        formData.image && formData.image.length > 0
          ? formData.image[0]
          : data?.data?.image;

      const res = await updateCategory({
        ...formData,
        image: imageToSubmit,
        id,
      }).unwrap();

      if (res.success) {
        toast.success("Category updated successfully!");
        navigate('/dashboard/category')
      }
    } catch (error) {
      toast.error(
        "Error updating brand: " + (error.message || "Something went wrong")
      );
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const defaultValues = {
    main_category: data?.data?.main_category || "",
    sub_category: data?.data?.sub_category || "",
    image: data?.data?.image ? data.data.image : '',
  };

  return (
    <div className="py-10">
      <div className="ml-5">
        <h2 className="mb-3">Category</h2>
        <span> Product &gt; Category</span>
      </div>
      <div className="bg-[#F7F7F7] p-8 mt-5 ">
        <div className="flex gap-x-8 bg-[#FFFFFF] p-8 rounded-md ">
          <div className="w-[700px]">
            <TASForm onSubmit={handleSubmit} defaultValues={defaultValues}>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                <TAFileupload   defaultValues={data?.data?.image} fullWidth name="image" label="Upload Category Image" />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography fontWeight="semi-bold" mb={1}>
                    Sub Category
                  </Typography>
                  <TASInput
                    size="medium"
                    fullWidth
                    name="sub_category"
                    label="Sub Category"
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography fontWeight="semi-bold" mb={1}>
                    Main Category
                  </Typography>
                  <TASInput
                    size="medium"
                    fullWidth
                    name="main_category"
                    label="Main Category"
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Button type="submit" sx={{ color: "white" }}>
                    Update Category{" "}
                  </Button>
                </Grid>
              </Grid>
            </TASForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
