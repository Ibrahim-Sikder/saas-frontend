import { Box, Button, Grid, Typography, TextField, MenuItem, Divider } from "@mui/material"
import { styled } from "@mui/material/styles"
import TASRightSideModal from "../../../components/Share/Modal/Modal"
import TASForm from "../../../components/form/Form"
import TASInput from "../../../components/form/Input"
import { toast } from "react-toastify"
import { useCreateExpenseCategoryMutation } from "../../../redux/api/expense"
import { Close as CloseIcon, Save as SaveIcon } from "@mui/icons-material"

const StyledModal = styled(TASRightSideModal)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: "8px 0 0 8px",
  },
}))

const StyledForm = styled(TASForm)(({ theme }) => ({
  "& .MuiGrid-item": {
    marginBottom: theme.spacing(2),
  },
}))

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 3),
  textTransform: "none",
  fontWeight: 600,
}))

const CreateExpenseCategoryModal = ({ open, setOpen }) => {
  const [createExpenseCategory] = useCreateExpenseCategoryMutation()

  const handleSubmit = async (data, reset) => {
    const toastId = toast.loading("Creating expense category")
    try {
      const res = await createExpenseCategory(data).unwrap()
      toast.success(res.message || "Expense Category created successfully!")
      reset()
      setOpen(false)
    } catch (error) {
      toast.error("Error creating category: " + (error.message || "Something went wrong!"))
    } finally {
      toast.dismiss(toastId)
    }
  }

  return (
    <StyledModal open={open} setOpen={setOpen} width="500px" title="Create Expense Category">
      <Box padding="24px">
        <StyledForm onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TASInput
                size="medium"
                fullWidth
                name="name"
                label="Category Name"
                placeholder="Enter category name"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TASInput
                size="medium"
                fullWidth
                name="code"
                label="Category Code"
                placeholder="Enter unique category code"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField select fullWidth name="type" label="Category Type" defaultValue="expense" required>
                <MenuItem value="expense">Expense</MenuItem>
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="transfer">Transfer</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField select fullWidth name="status" label="Status" defaultValue="active" required>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TASInput
                size="medium"
                fullWidth
                multiline
                rows={3}
                name="description"
                label="Description"
                placeholder="Enter category description (optional)"
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Additional Settings
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                name="budgetLimit"
                label="Budget Limit"
                placeholder="Enter budget limit"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth name="icon" label="Category Icon" defaultValue="default">
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="food">Food</MenuItem>
                <MenuItem value="transport">Transport</MenuItem>
                <MenuItem value="shopping">Shopping</MenuItem>
                <MenuItem value="utilities">Utilities</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <StyledButton
                  variant="outlined"
                  color="secondary"
                  onClick={() => setOpen(false)}
                  startIcon={<CloseIcon />}
                >
                  Cancel
                </StyledButton>
                <StyledButton type="submit" variant="contained" color="primary" startIcon={<SaveIcon />}>
                  Create Category
                </StyledButton>
              </Box>
            </Grid>
          </Grid>
        </StyledForm>
      </Box>
    </StyledModal>
  )
}

export default CreateExpenseCategoryModal

