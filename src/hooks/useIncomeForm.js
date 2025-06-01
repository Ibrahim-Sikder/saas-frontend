import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { formatDate } from "../utils/formateDate"
import { useCreateIncomeMutation, useUpdateIncomeMutation } from "../redux/api/income"

export const defaultIncomeValues = {
  receipt_number: "",
  income_source: "",
  invoice_number: "",
  category: [],
  income_name: "",
  date: new Date(),
  service_type: "",
  description: "",
  customer: "",
  job_card: "",
  vehicle: "",
  department: "",
  amount: 0,
  payment_method: "",
  payment_status: "",
  reference_number: "",
  tax_applied: false,
  tax_rate: 10,
  document_notes: "",
}

export const useIncomeForm = (id) => {
  const navigate = useNavigate()
  const [createIncome, { isLoading: createLoading }] = useCreateIncomeMutation()
  const [updateIncome, { isLoading: updateLoading }] = useUpdateIncomeMutation()

  const methods = useForm({
    defaultValues: defaultIncomeValues,
  })  


  const { watch, reset } = methods

  // Watch the values we need for calculations
  const watchAmount = watch("amount", 0)
  const applyTax = watch("tax_applied", false)
  const taxRate = watch("tax_rate", 10)

  // Calculate tax and total
  const calculatedTax = applyTax ? Number(watchAmount || 0) * (taxRate / 100) : 0
  const totalAmount = Number(watchAmount || 0) + calculatedTax

  // Process form data for submission
  const processFormData = (data) => {
    return {
      ...data,
      invoice_number: Array.isArray(data.invoice_number) ? data.invoice_number[0] : data.invoice_number,
      income_source: Array.isArray(data.income_source) ? data.income_source[0] : data.income_source,
      service_type: Array.isArray(data.service_type) ? data.service_type[0] : data.service_type,
      customer: Array.isArray(data.customer) ? data.customer[0] : data.customer,
      job_card: Array.isArray(data.job_card) ? data.job_card[0] : data.job_card,
      vehicle: Array.isArray(data.vehicle) ? data.vehicle[0] : data.vehicle,
      date: formatDate(data.date),
      amount: Number(data.amount),
      tax_applied: data.tax_applied,
      tax_rate: Number(data.tax_applied ? data.tax_rate : 0),
      tax_amount: data.tax_applied ? Number(data.amount) * (data.tax_rate / 100) : 0,
      total_amount: data.tax_applied ? Number(data.amount) * (1 + data.tax_rate / 100) : Number(data.amount),
    }
  }

  // Create new income
  const formSubmit = async (data) => {
    const processedData = processFormData(data)

    try {
      const response = await createIncome(processedData).unwrap()
      if (response.success) {
        toast.success(response.message)
        navigate("/dashboard/income-list")
      }
    } catch (error) {
      toast.error(error.message || "An error occurred")
    }
  }

  // Update existing income
  const onSubmit = async (data) => {
    const processedData = processFormData(data)

    try {
      const response = await updateIncome({ id, ...processedData }).unwrap()
      if (response.success) {
        toast.success(response.message)
        navigate("/dashboard/income-list")
      }
    } catch (error) {
      toast.error(error.message || "An error occurred")
    }
  }

  // Populate form with existing data
  const populateForm = (incomeData) => {
    if (!incomeData) return

    const data = incomeData?.data
    // Parse date string to Date object
    const dateValue = data.date ? new Date(data.date) : new Date()

    // Format category as array if it's not already
    const categoryValue = Array.isArray(data.category) ? data.category : data.category ? [data.category] : []

    // Ensure income_source is always an array
    const incomeSourceValue = Array.isArray(data.income_source)
      ? data.income_source
      : data.income_source
        ? [data.income_source]
        : []
    const invoiceNumberValue = Array.isArray(data.invoice_number)
      ? data.invoice_number
      : data.invoice_number
        ? [data.invoice_number]
        : []
    const serviceTypeValue = Array.isArray(data.service_type)
      ? data.service_type
      : data.service_type
        ? [data.service_type]
        : []
    const customerValue = Array.isArray(data.customer) ? data.customer : data.customer ? [data.customer] : []
    const vehicleValue = Array.isArray(data.vehicle) ? data.vehicle : data.vehicle ? [data.vehicle] : []
    const jobcardValue = Array.isArray(data.job_card) ? data.job_card : data.job_card ? [data.job_card] : []

    reset({
      receipt_number: data?.receipt_number || "",
      income_source: incomeSourceValue,
      invoice_number: invoiceNumberValue,
      category: categoryValue,
      income_name: data.income_name || "",
      date: dateValue,
      service_type: serviceTypeValue,
      description: data.description || "",
      customer: customerValue,
      job_card: jobcardValue,
      vehicle: vehicleValue,
      department: data.department || "",
      amount: Number(data.amount) || 0,
      payment_method: data.payment_method || "",
      payment_status: data.payment_status || "",
      reference_number: data.reference_number || "",
      tax_applied: data.tax_applied || false,
      tax_rate: Number(data.tax_rate) || 10,
      tax_amount: Number(data.tax_amount) || 0,
      total_amount: Number(data.total_amount) || 0,
      document_notes: data.document_notes || "",
    })
  }

  return {
    methods,
    formSubmit,
    onSubmit,
    populateForm,
    createLoading,
    updateLoading,
    calculatedTax,
    totalAmount,
    watchAmount,
    applyTax,
    taxRate,
  }
}

