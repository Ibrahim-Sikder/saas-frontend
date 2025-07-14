/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client"

import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Autocomplete, Box, Button, Chip, Grid, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import InputMask from "react-input-mask"
import { cmDmOptions, countries } from "../../../constant"
import TrustAutoAddress from "../../../components/TrustAutoAddress/TrustAutoAddress"
import {
  useGetSingleQuotationQuery,
  useRemoveQuotationMutation,
  useUpdateQuotationMutation,
} from "../../../redux/api/quotation"
import { formatDate } from "../../../utils/formateDate"
import { unitOptions } from "../../../utils/options"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import { useGetAllStocksQuery } from "../../../redux/api/stocksApi"
import { suggestionStyles } from "../../../utils/customStyle"
import { useGetCompanyProfileQuery } from "../../../redux/api/companyProfile"
import { useTenantDomain } from "../../../hooks/useTenantDomain"

// Function to format numbers with thousand separators
const formatNumber = (num) => {
  if (num === undefined || num === null || num === "") return ""
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const UpdateQuotation = () => {
  const [specificQuotation, setSpecificQuotation] = useState({})
  const [value, setValue] = useState(specificQuotation?.vehicle?.carReg_no)
  const [partsTotal, setPartsTotal] = useState(0)
  const [serviceTotal, setServiceTotal] = useState(0)
  const [grandTotal, setGrandTotal] = useState(0)
  const [discount, setDiscount] = useState("")
  const [vat, setVAT] = useState("")
  const [tax, setTax] = useState("") // New state for Tax
  const [error, setError] = useState("")
  const [removeButton, setRemoveButton] = useState("")
  const [reload, setReload] = useState(false)
  const [addButton, setAddButton] = useState(false)
  const [serviceAddButton, setServiceAddButton] = useState(false)
  const partsDiscountRef = useRef(null)
  const netTotalAmountRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const id = new URLSearchParams(location.search).get("id")
  const tenantDomain = useTenantDomain()
  const { data: CompanyInfoData } = useGetCompanyProfileQuery({
    tenantDomain,
  })
  console.log(specificQuotation)
  const userTypeFromProfile = new URLSearchParams(location.search).get("user_type")
  const userFromProfile = new URLSearchParams(location.search).get("user")
  const [countryCode, setCountryCode] = useState(countries[0])
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  })
  const [items, setItems] = useState([
    { description: "", unit: "", quantity: "", rate: "", rateDisplay: "", total: "" },
  ])
  const [serviceItems, setServiceItems] = useState([
    { description: "", unit: "", quantity: "", rate: "", rateDisplay: "", total: "" },
  ])
  const [currentPage, setCurrentPage] = useState(1)
  const [filterType, setFilterType] = useState("")
  const [productSuggestions, setProductSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0)
  const [activeInputType, setActiveInputType] = useState(null)
  const [activeInputIndex, setActiveInputIndex] = useState(null)
  const [currentMileage, setCurrentMileage] = useState("")
  const [mileageChanged, setMileageChanged] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    setValue: setFormValue,
    formState: { errors },
  } = useForm()
  const queryParams = {
    tenantDomain,
    page: currentPage,
    searchTerm: filterType,
    isRecycled: false,
  }
  const { data: stockData } = useGetAllStocksQuery(queryParams)
  const [updateQuotation, { isLoading: updateLoading, error: updateError }] = useUpdateQuotationMutation()
  const [removeQuotation, { isLoading: removeLoading, error: removeError }] = useRemoveQuotationMutation()

  useEffect(() => {
    if (specificQuotation?.date) {
      setSelectedDate(specificQuotation.date)
    }
  }, [specificQuotation])

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value
    if (
      /^\d*$/.test(newPhoneNumber) &&
      newPhoneNumber.length <= 11 &&
      (newPhoneNumber === "" || !newPhoneNumber.startsWith("0") || newPhoneNumber.length > 1)
    ) {
      setPhoneNumber(newPhoneNumber)
    }
  }

  const handleRemove = (index) => {
    if (!index) {
      const list = [...items]
      setItems(list)
    } else {
      const list = [...items]
      list.splice(index, 1)
      setItems(list)
    }
  }

  const handleServiceDescriptionRemove = (index) => {
    if (!index) {
      const list = [...serviceItems]
      setServiceItems(list)
    } else {
      const list = [...serviceItems]
      list.splice(index, 1)
      setServiceItems(list)
    }
  }

  const { data } = useGetSingleQuotationQuery({
    tenantDomain,
    id,
  })

  useEffect(() => {
    if (data?.data) {
      setSpecificQuotation(data.data)
      // Initialize discount, vat, and tax from specificQuotation if they exist
      setDiscount(data.data.discount || "")
      setVAT(data.data.vat || "")
      setTax(data.data.tax || "") // Initialize tax from fetched data
    }
  }, [data])

  useEffect(() => {
    if (specificQuotation?.user_type === "customer") {
      reset({
        Id: specificQuotation?.Id,
        job_no: specificQuotation?.job_no,
        company_name: specificQuotation?.customer?.company_name,
        customer_name: specificQuotation?.customer?.customer_name,
        customer_country_code: specificQuotation?.customer?.customer_country_code,
        customer_contact: specificQuotation?.customer?.customer_contact,
        customer_address: specificQuotation?.customer?.customer_address,
        carReg_no: specificQuotation?.vehicle?.carReg_no,
        car_registration_no: specificQuotation?.vehicle?.car_registration_no,
        engine_no: specificQuotation?.vehicle?.engine_no,
        vehicle_brand: specificQuotation?.vehicle?.vehicle_name,
        vehicle_name: specificQuotation?.vehicle?.vehicle_name,
        chassis_no: specificQuotation?.vehicle?.chassis_no,
        mileage: specificQuotation?.vehicle?.mileage,
      })
    }
    if (specificQuotation?.user_type === "company") {
      reset({
        Id: specificQuotation?.Id,
        job_no: specificQuotation?.job_no,
        company_name: specificQuotation?.company?.company_name,
        vehicle_username: specificQuotation?.company?.vehicle_username,
        company_address: specificQuotation?.company?.company_address,
        company_contact: specificQuotation?.company?.company_contact,
        company_country_code: specificQuotation?.company?.company_country_code,
        company_email: specificQuotation?.company?.company_email,
        customer_address: specificQuotation?.company?.customer_address,
        carReg_no: specificQuotation?.vehicle?.carReg_no,
        car_registration_no: specificQuotation?.vehicle?.car_registration_no,
        engine_no: specificQuotation?.vehicle?.engine_no,
        vehicle_brand: specificQuotation?.vehicle?.vehicle_brand,
        vehicle_name: specificQuotation?.vehicle?.vehicle_name,
        chassis_no: specificQuotation?.vehicle?.chassis_no,
        mileage: specificQuotation?.vehicle?.mileage,
      })
    }
    if (specificQuotation?.user_type === "showRoom") {
      reset({
        Id: specificQuotation?.Id,
        job_no: specificQuotation?.job_no,
        showRoom_name: specificQuotation?.showRoom?.showRoom_name,
        vehicle_username: specificQuotation?.showRoom?.vehicle_username,
        showRoom_address: specificQuotation?.showRoom?.showRoom_address,
        company_name: specificQuotation?.showRoom?.company_name,
        company_contact: phoneNumber || specificQuotation?.showRoom?.company_contact,
        company_country_code: specificQuotation?.showRoom?.company_country_code,
        carReg_no: specificQuotation?.vehicle?.carReg_no,
        car_registration_no: specificQuotation?.vehicle?.car_registration_no,
        engine_no: specificQuotation?.vehicle?.engine_no,
        vehicle_brand: specificQuotation?.vehicle?.vehicle_brand,
        vehicle_name: specificQuotation?.vehicle?.vehicle_name,
        chassis_no: specificQuotation?.vehicle?.chassis_no,
        mileage: specificQuotation?.vehicle?.mileage,
      })
    }
  }, [
    phoneNumber,
    reset,
    specificQuotation?.Id,
    specificQuotation?.company?.company_address,
    specificQuotation?.company?.company_contact,
    specificQuotation?.company?.company_country_code,
    specificQuotation?.company?.company_email,
    specificQuotation?.company?.company_name,
    specificQuotation?.company?.customer_address,
    specificQuotation?.customer?.company_name,
    specificQuotation?.customer?.customer_address,
    specificQuotation?.customer?.customer_contact,
    specificQuotation?.customer?.customer_country_code,
    specificQuotation?.customer?.customer_name,
    specificQuotation?.job_no,
    specificQuotation?.showRoom?.company_contact,
    specificQuotation?.showRoom?.company_country_code,
    specificQuotation?.showRoom?.company_name,
    specificQuotation?.showRoom?.showRoom_address,
    specificQuotation?.showRoom?.vehicle_username,
    specificQuotation?.user_type,
    specificQuotation?.vehicle?.carReg_no,
    specificQuotation?.vehicle?.car_registration_no,
    specificQuotation?.vehicle?.chassis_no,
    specificQuotation?.vehicle?.engine_no,
    specificQuotation?.vehicle?.mileage,
    specificQuotation?.vehicle?.vehicle_brand,
    specificQuotation?.vehicle?.vehicle_name,
  ])

  useEffect(() => {
    const totalSum = specificQuotation?.input_data?.reduce((sum, item) => sum + Number(item.total), 0)
    const totalSum2 = items.reduce((sum, item) => sum + Number(item.total), 0)
    const serviceTotalSum = specificQuotation?.service_input_data?.reduce((sum, item) => sum + Number(item.total), 0)
    const serviceTotalSum2 = serviceItems.reduce((sum, item) => sum + Number(item.total), 0)
    const newTotalSum = isNaN(totalSum) ? 0 : totalSum
    const newTotalSum2 = isNaN(totalSum2) ? 0 : totalSum2
    const newServiceTotalSum = isNaN(serviceTotalSum) ? 0 : serviceTotalSum
    const newServiceTotalSum2 = isNaN(serviceTotalSum2) ? 0 : serviceTotalSum2
    const newGrandTotal = newTotalSum + newTotalSum2
    const newServiceGrandTotal = newServiceTotalSum + newServiceTotalSum2
    const totalGrand = Number.parseFloat(newGrandTotal + newServiceGrandTotal).toFixed(2)
    setPartsTotal(newGrandTotal)
    setServiceTotal(newServiceGrandTotal)
    setGrandTotal(totalGrand)
  }, [items, serviceItems, specificQuotation?.input_data, specificQuotation?.service_input_data])

  const handleDateChange = (newDate) => {
    setSelectedDate(formatDate(newDate))
  }

  const handleUnitChange = (index, value) => {
    const newItems = [...specificQuotation.input_data]
    newItems[index] = {
      ...newItems[index],
      unit: value,
    }
    setSpecificQuotation((prevState) => ({
      ...prevState,
      input_data: newItems,
    }))
  }

  const handleUnitChange2 = (index, value) => {
    const newItems = [...items]
    newItems[index].unit = value
    setItems(newItems)
  }

  const handleServiceUnitChange = (index, value) => {
    const newItems = [...specificQuotation.service_input_data]
    newItems[index] = {
      ...newItems[index],
      unit: value,
    }
    setSpecificQuotation((prevState) => ({
      ...prevState,
      service_input_data: newItems,
    }))
  }

  const handleServiceUnitChange2 = (index, value) => {
    const newItems = [...serviceItems]
    newItems[index].unit = value
    setServiceItems(newItems)
  }

  const filterProductSuggestions = (searchTerm) => {
    if (!searchTerm || searchTerm.length < 2 || !stockData?.data) {
      setProductSuggestions([])
      setShowSuggestions(false)
      return
    }
    const filteredProducts = stockData.data.filter((stock) =>
      stock.product.product_name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setProductSuggestions(filteredProducts)
    setShowSuggestions(filteredProducts.length > 0)
    setActiveSuggestionIndex(0)
  }

  const handleServiceDescriptionChange = (index, value) => {
    const newItems = [...specificQuotation.service_input_data]
    newItems[index] = {
      ...newItems[index],
      description: value,
    }
    setSpecificQuotation((prevState) => ({
      ...prevState,
      service_input_data: newItems,
    }))
    setActiveInputType("service")
    setActiveInputIndex(index)
    filterProductSuggestions(value)
  }

  const handleServiceDescriptionChange2 = (index, value) => {
    const newItems = [...serviceItems]
    newItems[index].description = value
    setServiceItems(newItems)
    setActiveInputType("service")
    setActiveInputIndex(index + (specificQuotation?.service_input_data?.length || 0))
    filterProductSuggestions(value)
  }

  const handleDescriptionChange = (index, value) => {
    const newItems = [...specificQuotation.input_data]
    newItems[index] = {
      ...newItems[index],
      description: value,
    }
    setSpecificQuotation((prevState) => ({
      ...prevState,
      input_data: newItems,
    }))
    setActiveInputType("parts")
    setActiveInputIndex(index)
    filterProductSuggestions(value)
  }

  const handleDescriptionChange2 = (index, value) => {
    const newItems = [...items]
    newItems[index].description = value
    setItems(newItems)
    setActiveInputType("parts")
    setActiveInputIndex(index + (specificQuotation?.input_data?.length || 0))
    filterProductSuggestions(value)
  }

  // Fixed quantity change handlers to allow decimals
  const handleQuantityChange = (index, value) => {
    // Allow decimal numbers by removing non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, "")
    // Prevent multiple decimal points
    const parts = numericValue.split(".")
    const cleanValue = parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : numericValue
    if (!isNaN(cleanValue) && cleanValue !== "") {
      const newItems = [...specificQuotation.input_data]
      const parsedValue = Number.parseFloat(cleanValue) || 0
      newItems[index].quantity = cleanValue // Store as string to preserve decimal input
      newItems[index].total = parsedValue * (Number.parseFloat(newItems[index].rate) || 0)
      newItems[index].total = Number.parseFloat(newItems[index].total.toFixed(2))
      setSpecificQuotation((prevState) => ({
        ...prevState,
        input_data: newItems,
      }))
    }
  }

  const handleQuantityChange2 = (index, value) => {
    // Allow decimal numbers by removing non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, "")
    // Prevent multiple decimal points
    const parts = numericValue.split(".")
    const cleanValue = parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : numericValue
    const newItems = [...items]
    const parsedValue = Number.parseFloat(cleanValue) || 0
    newItems[index].quantity = cleanValue // Store as string to preserve decimal input
    newItems[index].total = parsedValue * (Number.parseFloat(newItems[index].rate) || 0)
    newItems[index].total = Number.parseFloat(newItems[index].total.toFixed(2))
    setItems(newItems)
  }

  const handleServiceQuantityChange = (index, value) => {
    // Allow decimal numbers by removing non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, "")
    // Prevent multiple decimal points
    const parts = numericValue.split(".")
    const cleanValue = parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : numericValue
    if (!isNaN(cleanValue) && cleanValue !== "") {
      const newItems = [...specificQuotation.service_input_data]
      const parsedValue = Number.parseFloat(cleanValue) || 0
      newItems[index].quantity = cleanValue // Store as string to preserve decimal input
      newItems[index].total = parsedValue * (Number.parseFloat(newItems[index].rate) || 0)
      newItems[index].total = Number.parseFloat(newItems[index].total.toFixed(2))
      setSpecificQuotation((prevState) => ({
        ...prevState,
        service_input_data: newItems,
      }))
    }
  }

  const handleServiceQuantityChange2 = (index, value) => {
    // Allow decimal numbers by removing non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, "")
    // Prevent multiple decimal points
    const parts = numericValue.split(".")
    const cleanValue = parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : numericValue
    const newItems = [...serviceItems]
    const parsedValue = Number.parseFloat(cleanValue) || 0
    newItems[index].quantity = cleanValue // Store as string to preserve decimal input
    newItems[index].total = parsedValue * (Number.parseFloat(newItems[index].rate) || 0)
    newItems[index].total = Number.parseFloat(newItems[index].total.toFixed(2))
    setServiceItems(newItems)
  }

  // Fixed rate change handlers to properly handle decimals without formatNumber interference
  const handleRateChange = (index, value) => {
    // Allow decimal numbers by removing non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, "")
    // Prevent multiple decimal points
    const parts = numericValue.split(".")
    const cleanValue = parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : numericValue
    const newItems = [...specificQuotation.input_data]
    const parsedRate = Number.parseFloat(cleanValue) || 0
    newItems[index].rate = parsedRate
    newItems[index].rateDisplay = cleanValue // Store raw input for display
    newItems[index].total = (Number.parseFloat(newItems[index].quantity) || 0) * parsedRate
    newItems[index].total = Number.parseFloat(newItems[index].total.toFixed(2))
    setSpecificQuotation((prevState) => ({
      ...prevState,
      input_data: newItems,
    }))
  }

  const handleRateChange2 = (index, value) => {
    // Allow decimal numbers by removing non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, "")
    // Prevent multiple decimal points
    const parts = numericValue.split(".")
    const cleanValue = parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : numericValue
    const newItems = [...items]
    const parsedRate = Number.parseFloat(cleanValue) || 0
    newItems[index].rate = parsedRate
    newItems[index].rateDisplay = cleanValue // Store raw input for display
    newItems[index].total = (Number.parseFloat(newItems[index].quantity) || 0) * parsedRate
    newItems[index].total = Number.parseFloat(newItems[index].total.toFixed(2))
    setItems(newItems)
  }

  const handleServiceRateChange = (index, value) => {
    // Allow decimal numbers by removing non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, "")
    // Prevent multiple decimal points
    const parts = numericValue.split(".")
    const cleanValue = parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : numericValue
    const newItems = [...specificQuotation.service_input_data]
    const parsedRate = Number.parseFloat(cleanValue) || 0
    newItems[index].rate = parsedRate
    newItems[index].rateDisplay = cleanValue // Store raw input for display
    newItems[index].total = (Number.parseFloat(newItems[index].quantity) || 0) * parsedRate
    newItems[index].total = Number.parseFloat(newItems[index].total.toFixed(2))
    setSpecificQuotation((prevState) => ({
      ...prevState,
      service_input_data: newItems,
    }))
  }

  const handleServiceRateChange2 = (index, value) => {
    // Allow decimal numbers by removing non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, "")
    // Prevent multiple decimal points
    const parts = numericValue.split(".")
    const cleanValue = parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : numericValue
    const newItems = [...serviceItems]
    const parsedRate = Number.parseFloat(cleanValue) || 0
    newItems[index].rate = parsedRate
    newItems[index].rateDisplay = cleanValue // Store raw input for display
    newItems[index].total = (Number.parseFloat(newItems[index].quantity) || 0) * parsedRate
    newItems[index].total = Number.parseFloat(newItems[index].total.toFixed(2))
    setServiceItems(newItems)
  }

  const handleDiscountChange = (value) => {
    const parsedValue = Number(value)
    if (!isNaN(parsedValue)) {
      setDiscount(parsedValue)
    }
  }

  const handleVATChange = (value) => {
    const parsedValue = Number(value)
    if (!isNaN(parsedValue)) {
      setVAT(parsedValue)
    }
  }

  const handleTaxChange = (value) => {
    const parsedValue = Number(value)
    if (!isNaN(parsedValue)) {
      setTax(parsedValue)
    }
  }

  const calculateFinalTotal = () => {
    let currentPartsTotal = partsTotal
    let currentServiceTotal = serviceTotal

    // If partsTotal or serviceTotal are 0 (e.g., on initial load before items are re-calculated),
    // use the values from specificQuotation if available.
    // This ensures the initial calculation uses existing data.
    if (currentPartsTotal === 0 && specificQuotation?.parts_total) {
      currentPartsTotal = Number(specificQuotation.parts_total)
    }
    if (currentServiceTotal === 0 && specificQuotation?.service_total) {
      currentServiceTotal = Number(specificQuotation.service_total)
    }

    const currentGrandTotal = currentPartsTotal + currentServiceTotal

    // Determine the discount value
    let effectiveDiscount = 0
    if (discount === 0 || discount > 0) {
      // If discount is explicitly set (0 or positive number)
      effectiveDiscount = discount
    } else if (discount === "") {
      // If discount state is empty, use existing specificQuotation discount
      effectiveDiscount = Number(specificQuotation?.discount) || 0
    }

    // Apply discount
    let totalAfterDiscount = currentGrandTotal - effectiveDiscount
    totalAfterDiscount = totalAfterDiscount < 0 ? 0 : totalAfterDiscount // Ensure total doesn't go negative

    // Determine the VAT percentage
    let effectiveVat = 0
    if (vat === 0 || vat > 0) {
      // If vat is explicitly set (0 or positive number)
      effectiveVat = vat
    } else if (vat === "") {
      // If vat state is empty, use existing specificQuotation vat
      effectiveVat = Number(specificQuotation?.vat) || 0
    }

    // Calculate total after VAT
    const vatAmount = totalAfterDiscount * (effectiveVat / 100)
    const totalAfterVat = totalAfterDiscount + vatAmount

    // Determine the Tax percentage (new logic)
    let effectiveTax = 0
    if (tax === 0 || tax > 0) {
      // If tax is explicitly set (0 or positive number)
      effectiveTax = tax
    } else if (tax === "") {
      // If tax state is empty, use existing specificQuotation tax
      effectiveTax = Number(specificQuotation?.tax) || 0 // Assuming specificQuotation will have a 'tax' field
    }

    // Apply tax after VAT
    const taxAmount = totalAfterVat * (effectiveTax / 100)
    const finalTotal = totalAfterVat + taxAmount

    // Final total with 2 decimal precision
    return Number.parseFloat(finalTotal).toFixed(2)
  }

  // Fixed handleSelectSuggestion function
  const handleSelectSuggestion = (product) => {
    if (!product) return
    // Extract product details correctly based on the data structure
    const productName = product.product?.product_name || ""
    const productPrice = Number(product.product?.sellingPrice) || 0
    const productQuantity = product.product.product_quantity || 1
    // Get unit from the unit object
    let productUnit = "Set" // Default unit
    if (product.product?.unit && typeof product.product.unit === "object") {
      productUnit = product.product.unit.unit || "Set"
    }
    // Calculate total
    const total = productQuantity * productPrice
    if (activeInputType === "service") {
      if (activeInputIndex < (specificQuotation?.service_input_data?.length || 0)) {
        // For existing service items
        const newItems = [...specificQuotation.service_input_data]
        // Set the product details
        newItems[activeInputIndex] = {
          ...newItems[activeInputIndex],
          description: productName,
          unit: productUnit,
          rate: productPrice,
          rateDisplay: productPrice.toString(),
          quantity: productQuantity,
          total: total,
        }
        setSpecificQuotation((prevState) => ({
          ...prevState,
          service_input_data: newItems,
        }))
      } else {
        // For newly added service items
        const actualIndex = activeInputIndex - (specificQuotation?.service_input_data?.length || 0)
        const newItems = [...serviceItems]
        // Set the product details
        newItems[actualIndex] = {
          ...newItems[actualIndex],
          description: productName,
          unit: productUnit,
          rate: productPrice,
          rateDisplay: productPrice.toString(),
          quantity: productQuantity,
          total: total,
        }
        setServiceItems([...newItems])
      }
    } else if (activeInputType === "parts") {
      if (activeInputIndex < (specificQuotation?.input_data?.length || 0)) {
        // For existing parts items
        const newItems = [...specificQuotation.input_data]
        // Set the product details
        newItems[activeInputIndex] = {
          ...newItems[activeInputIndex],
          description: productName,
          unit: productUnit,
          rate: productPrice,
          rateDisplay: productPrice.toString(),
          quantity: productQuantity,
          total: total,
        }
        setSpecificQuotation((prevState) => ({
          ...prevState,
          input_data: newItems,
        }))
      } else {
        // For newly added parts items
        const actualIndex = activeInputIndex - (specificQuotation?.input_data?.length || 0)
        const newItems = [...items]
        // Set the product details
        newItems[actualIndex] = {
          ...newItems[actualIndex],
          description: productName,
          unit: productUnit,
          rate: productPrice,
          rateDisplay: productPrice.toString(),
          quantity: productQuantity,
          total: total,
        }
        setItems([...newItems])
      }
    }
    // Close the suggestions dropdown
    setShowSuggestions(false)
  }

  const handleAddClick = () => {
    setItems([...items, { description: "", unit: "", quantity: "", rate: "", rateDisplay: "", total: "" }])
    if (partsDiscountRef.current) {
      partsDiscountRef.current.value = discount ? discount : specificQuotation?.discount
      netTotalAmountRef.current.innerText = calculateFinalTotal()
    }
  }

  const handleServiceDescriptionAdd = () => {
    setServiceItems([
      ...serviceItems,
      { description: "", unit: "", quantity: "", rate: "", rateDisplay: "", total: "" },
    ])
    if (partsDiscountRef.current) {
      partsDiscountRef.current.value = discount ? discount : specificQuotation?.discount
      netTotalAmountRef.current.innerText = calculateFinalTotal()
    }
  }

  const handlePartsAddButton = () => {
    setAddButton(!addButton)
    if (partsDiscountRef.current) {
      partsDiscountRef.current.value = discount ? discount : specificQuotation?.discount
      netTotalAmountRef.current.innerText = calculateFinalTotal()
    }
  }

  const handleServiceAddButton = () => {
    setServiceAddButton(!serviceAddButton)
    if (partsDiscountRef.current) {
      partsDiscountRef.current.value = discount ? discount : specificQuotation?.discount
      netTotalAmountRef.current.innerText = calculateFinalTotal()
    }
  }

  const handleRemoveButton = async (i, name) => {
    const values = {
      id: id,
      data: { index: i, quotation_name: name },
    }
    const res = await removeQuotation(values).unwrap()
    if (res.success) {
      setReload(!reload)
      toast.success(res.message)
    }
  }

  const input_data = [
    ...(specificQuotation?.input_data || []),
    ...items
      .filter((item) => item.total !== undefined && item.total !== "")
      .map((item) => ({
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        unit: item.unit,
        total: item.total,
      })),
  ]

  const service_input_data = [
    ...(specificQuotation?.service_input_data || []),
    ...serviceItems
      .filter((item) => item.total !== undefined && item.total !== "")
      .map((item) => ({
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        unit: item.unit,
        total: item.total,
      })),
  ]

  const onSubmit = async (data) => {
    setRemoveButton("")
    try {
      const customer = {
        company_name: data.company_name,
        customer_name: data.customer_name,
        customer_contact: data.customer_contact,
        customer_country_code: data.company_country_code,
        customer_address: data.customer_address,
      }
      const company = {
        company_name: data.company_name,
        vehicle_username: data.vehicle_username,
        company_address: data.company_address,
        company_contact: data.company_contact,
        company_country_code: data.company_country_code,
        company_email: data.company_email,
        customer_address: data.company_address, // This was customer_address in original, but company_address in reset. Keeping company_address for consistency with reset.
      }
      const showRoom = {
        showRoom_name: data.showRoom_name,
        vehicle_username: data.vehicle_username,
        company_name: data.company_name,
        company_contact: data.company_contact,
        company_country_code: data.company_country_code,
        company_address: data.company_address,
      }
      data.vehicle_model = Number(data.vehicle_model)
      data.mileage = Number(data.mileage)
      // Get the current mileage value
      const newMileageValue = Number(data.mileage)
      // Get existing mileage history from the correct path
      const existingMileageHistory = specificQuotation?.vehicle?.mileageHistory || []
      const updatedMileageHistory = [...existingMileageHistory]
      // Only add new mileage to history if it has changed and is valid
      if (mileageChanged && !isNaN(newMileageValue) && newMileageValue > 0) {
        // Check if this mileage value already exists in history
        const mileageExists = updatedMileageHistory.some((entry) => entry.mileage === newMileageValue)
        if (!mileageExists) {
          updatedMileageHistory.push({
            mileage: newMileageValue,
            date: new Date().toISOString(),
          })
        }
      }
      const vehicle = {
        carReg_no: data.carReg_no,
        car_registration_no: data.car_registration_no,
        chassis_no: data.chassis_no,
        engine_no: data.engine_no,
        vehicle_brand: data.vehicle_brand,
        vehicle_name: data.vehicle_name,
        mileage: newMileageValue,
        mileageHistory: updatedMileageHistory,
      }
      const quotation = {
        user_type: specificQuotation?.user_type,
        Id: specificQuotation?.Id,
        job_no: specificQuotation?.job_no,
        date: selectedDate || specificQuotation?.date,
        parts_total: partsTotal || specificQuotation.parts_total,
        service_total: serviceTotal || specificQuotation.serviceTotal,
        total_amount: grandTotal || specificQuotation?.total_amount,
        discount: discount === 0 || discount > 0 ? discount : specificQuotation?.discount,
        vat: vat === 0 || vat > 0 ? vat : specificQuotation?.vat,
        tax: tax === 0 || tax > 0 ? tax : specificQuotation?.tax, // New: Include tax
        net_total: calculateFinalTotal() || specificQuotation.net_total,
        input_data: input_data,
        service_input_data: service_input_data,
      }
      const values = {
        tenantDomain,
        customer,
        company,
        showRoom,
        vehicle,
        quotation,
      }
      const newValue = {
        id: id,
        data: {
          ...values,
        },
      }
      if (removeButton === "") {
        const res = await updateQuotation(newValue).unwrap()
        if (res.success) {
          setReload(!reload)
        }
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message)
      }
    }
  }

  const handleGoInvoice = () => {
    handleSubmit(onSubmit)()
    navigate(`/dashboard/invoice?order_no=${specificQuotation?.job_no}&id=${id}`)
  }

  const handleGoPreview = () => {
    handleSubmit(onSubmit)()
    navigate(`/dashboard/quotation-view?id=${id}`)
  }

  const handleOnSubmit = () => {
    handleSubmit(onSubmit)()
    if (!userTypeFromProfile) {
      navigate("/dashboard/quotation-list")
    }
    if (userTypeFromProfile === "company") {
      navigate(`/dashboard/company-profile?id=${userFromProfile}`)
    }
    if (userTypeFromProfile === "customer") {
      navigate(`/dashboard/customer-profile?id=${userFromProfile}`)
    }
    if (userTypeFromProfile === "showRoom") {
      navigate(`/dashboard/show-room-profile?id=${userFromProfile}`)
    }
    toast.success("Quotation update successful")
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only close suggestions if the click is outside the input field and suggestions list
      if (showSuggestions && !event.target.closest(".inputField") && !event.target.closest(".suggestion-item")) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSuggestions])

  // Function to handle suggestion item click with direct event handling
  const handleSuggestionClick = (product) => {
    handleSelectSuggestion(product)
  }

  useEffect(() => {
    if (specificQuotation?.vehicle?.mileage) {
      setFormValue("mileage", specificQuotation.vehicle.mileage)
      setCurrentMileage(specificQuotation.vehicle.mileage.toString())
    }
  }, [specificQuotation?.vehicle?.mileage, setFormValue])

  return (
    <div className="px-5 py-10">
      <div className=" addJobCardHeads">
        <img src={CompanyInfoData?.data?.logo || "/placeholder.svg"} alt="logo" className=" addJobLogoImg" />
        <div>
          <h2 className=" trustAutoTitle trustAutoTitleQutation">{CompanyInfoData?.data?.companyName}</h2>
          <span className="text-[12px] lg:text-xl mt-5 block">Office: {CompanyInfoData?.data?.address}</span>
        </div>
        <TrustAutoAddress />
      </div>
      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex md:flex-row flex-col justify-between items-center">
            <div className="hidden"></div>
            <div className="vehicleCard">Update Quotation </div>
            <div className="flex items-center gap-x-2">
              {/* Track if user has interacted with the date picker */}
              {!selectedDate || selectedDate === specificQuotation?.date ? (
                <div className="flex items-center gap-x-2">
                  <div className="border py-4 px-5 rounded-md ">{selectedDate}</div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "170px" }}
                      label="Quotation Date"
                      value={selectedDate ? dayjs(selectedDate) : dayjs()}
                      onChange={(newValue) => {
                        if (newValue) {
                          const formattedDate = newValue.format("YYYY-MM-DD")
                          setSelectedDate(formattedDate)
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
                    label="Quotation Date"
                    value={selectedDate ? dayjs(selectedDate) : dayjs()}
                    onChange={(newValue) => {
                      if (newValue) {
                        const formattedDate = newValue.format("YYYY-MM-DD")
                        setSelectedDate(formattedDate)
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
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 my-10">
            <Box>
              <h3 className="text-xl lg:text-3xl font-bold mb-5">Customer Info</h3>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Job Card No"
                    {...register("job_no")}
                    focused={specificQuotation?.job_no || ""}
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
                    focused={specificQuotation?.Id || ""}
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
                      specificQuotation?.customer?.company_name ||
                      specificQuotation?.company?.company_name ||
                      specificQuotation?.showRoom?.company_name
                    }
                    {...register("company_name")}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  {!specificQuotation && (
                    <TextField
                      fullWidth
                      label="Customer"
                      focused={specificQuotation?.customer?.customer_name || ""}
                      {...register("customer_name")}
                    />
                  )}
                  {specificQuotation?.user_type === "customer" && (
                    <TextField
                      fullWidth
                      label="Customer"
                      focused={specificQuotation?.customer?.customer_name || ""}
                      {...register("customer_name")}
                    />
                  )}
                  {(specificQuotation?.user_type === "company" || specificQuotation?.user_type === "showRoom") && (
                    <TextField
                      fullWidth
                      label="Customer"
                      focused={
                        specificQuotation?.company?.vehicle_username || specificQuotation?.showRoom?.vehicle_username
                      }
                      {...register("vehicle_username")}
                    />
                  )}
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="flex md:flex-row flex-col gap-0.5 items-center mt-3">
                    <Autocomplete
                      fullWidth
                      freeSolo
                      options={countries}
                      getOptionLabel={(option) => option.label}
                      value={countryCode}
                      onChange={(event, newValue) => {
                        setCountryCode(newValue)
                        setPhoneNumber("") // Reset the phone number when changing country codes
                      }}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          {...register("customer_country_code")}
                          label="Select Country Code"
                          variant="outlined"
                          focused={specificQuotation?.customer?.customer_country_code || ""}
                        />
                      )}
                    />
                    {!specificQuotation && (
                      <TextField
                        {...register("customer_contact")}
                        variant="outlined"
                        fullWidth
                        type="tel"
                        value={phoneNumber ? phoneNumber : specificQuotation?.customer?.customer_contact}
                        onChange={handlePhoneNumberChange}
                        placeholder="Customer Contact No (N)"
                      />
                    )}
                    {specificQuotation?.user_type === "customer" && (
                      <TextField
                        {...register("customer_contact")}
                        variant="outlined"
                        fullWidth
                        type="tel"
                        value={phoneNumber ? phoneNumber : specificQuotation?.customer?.customer_contact}
                        onChange={handlePhoneNumberChange}
                        placeholder="Customer Contact No (N)"
                        focused={specificQuotation?.customer?.customer_contact || ""}
                      />
                    )}
                    {(specificQuotation?.user_type === "company" || specificQuotation?.user_type === "showRoom") && (
                      <TextField
                        {...register("company_contact")}
                        variant="outlined"
                        fullWidth
                        type="tel"
                        value={phoneNumber ? phoneNumber : specificQuotation?.customer?.customer_contact}
                        onChange={handlePhoneNumberChange}
                        placeholder="Company Contact No (N)"
                        focused={
                          specificQuotation?.company?.company_contact || specificQuotation?.showRoom?.company_contact
                        }
                      />
                    )}
                  </div>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  {!specificQuotation && <TextField fullWidth label="Address" {...register("customer_address")} />}
                  {specificQuotation?.user_type === "customer" && (
                    <TextField
                      fullWidth
                      label="Address"
                      {...register("customer_address")}
                      focused={specificQuotation?.customer?.customer_address}
                    />
                  )}
                  {specificQuotation?.user_type === "company" && (
                    <TextField
                      fullWidth
                      label="Address"
                      {...register("company_address")}
                      focused={specificQuotation?.company?.company_address || ""}
                    />
                  )}
                  {specificQuotation?.user_type === "showRoom" && (
                    <TextField
                      fullWidth
                      label="Address"
                      {...register("showRoom_address")}
                      focused={specificQuotation?.showRoom?.showRoom_address || ""}
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
            <Box>
              <h3 className="text-xl lg:text-3xl font-bold mb-5 ">Vehicle Info</h3>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Chassis No"
                    value={specificQuotation?.chassis_no}
                    {...register("chassis_no")}
                    focused={specificQuotation?.vehicle?.chassis_no || ""}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="flex mt-3  md:gap-0 gap-4 items-center">
                    <Autocomplete
                      sx={{ marginRight: "5px" }}
                      freeSolo
                      fullWidth
                      id="free-solo-demo"
                      options={cmDmOptions.map((option) => option.label)}
                      value={specificQuotation?.vehicle?.carReg_no || ""}
                      onChange={(event, newValue) => {
                        setValue("carReg_no", newValue)
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
                    <InputMask mask="99-9999" maskChar={null} {...register("car_registration_no")}>
                      {(inputProps) => (
                        <TextField
                          fullWidth
                          {...inputProps}
                          {...register("car_registration_no")}
                          label="Car R (N)"
                          focused={specificQuotation?.vehicle?.car_registration_no || ""}
                        />
                      )}
                    </InputMask>
                  </div>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Engine & CC"
                    value={specificQuotation?.engine_no}
                    {...register("engine_no")}
                    focused={specificQuotation?.vehicle?.engine_no || ""}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Vehicle Name"
                    value={specificQuotation?.vehicle_name}
                    {...register("vehicle_name")}
                    focused={specificQuotation?.vehicle?.vehicle_name || ""}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    {...register("mileage", {
                      required: "Mileage is required!",
                    })}
                    label="Current Mileage (KM)"
                    type="number"
                    value={currentMileage || specificQuotation?.mileage || ""}
                    onChange={(e) => {
                      const newMileage = e.target.value
                      setCurrentMileage(newMileage)
                      setFormValue("mileage", newMileage)
                      const lastMileage = specificQuotation?.vehicle?.mileageHistory?.slice(-1)[0]?.mileage
                      if (lastMileage && Number(newMileage) !== lastMileage) {
                        setMileageChanged(true)
                      } else if (!lastMileage && newMileage) {
                        setMileageChanged(true)
                      } else {
                        setMileageChanged(false)
                      }
                    }}
                    error={!!errors.mileage}
                    helperText={errors.mileage?.message}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="mb-2">
                    <strong>Mileage History:</strong>
                    {specificQuotation?.vehicle?.mileageHistory?.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {specificQuotation.vehicle?.mileageHistory.map((entry, index) => (
                          <Chip
                            key={index}
                            label={`${entry.mileage} km (${new Date(entry.date).toLocaleDateString()})`}
                            variant="outlined"
                            className="bg-gray-100 border-gray-300 text-gray-800"
                            onDelete={() => {
                              const updatedHistory = specificQuotation?.vehicle?.mileageHistory.filter(
                                (_, i) => i !== index,
                              )
                              setSpecificQuotation((prevState) => ({
                                ...prevState,
                                vehicle: {
                                  ...prevState.vehicle,
                                  mileageHistory: updatedHistory,
                                },
                              }))
                            }}
                            deleteIcon={
                              <span className="text-red-500 hover:text-red-700 cursor-pointer text-lg">×</span>
                            }
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 mt-1">No previous mileage records</p>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Box>
          </div>
          <div className="grid grid-cols-12 gap-2 items-center font-bold mb-5 md:mb-1 mt-5 ">
            <label className="col-span-6 md:col-span-1 text-center hidden md:block ">SL No</label>
            <label className="col-span-12 md:col-span-6 text-center">Services Description</label>
            <label className="col-span-6 md:col-span-2 text-center hidden md:block  ">Qty</label>
            <label className="col-span-6 md:col-span-1 text-center hidden md:block ">Rate</label>
            <label className="col-span-6 md:col-span-1 text-center hidden md:block  ">Amount</label>
            <label className="opacity-0 col-span-6 md:col-span-1 hidden md:block">hidden items for responsive</label>
          </div>
          <div>
            {specificQuotation?.service_input_data?.length > 0 && (
              <>
                {specificQuotation?.service_input_data?.map((item, i) => {
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
                          />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                          <div style={suggestionStyles.suggestionContainer}>
                            <input
                              className="inputField"
                              autoComplete="off"
                              type="text"
                              placeholder="Description"
                              onChange={(e) => handleServiceDescriptionChange(i, e.target.value)}
                              value={item.description}
                            />
                            {showSuggestions && activeInputType === "service" && activeInputIndex === i && (
                              <div style={suggestionStyles.suggestionsList} className="suggestionsList">
                                {productSuggestions.map((product, index) => (
                                  <div
                                    key={product._id}
                                    className="suggestion-item"
                                    style={{
                                      ...suggestionStyles.suggestionItem,
                                      ...(index === activeSuggestionIndex ? suggestionStyles.suggestionItemActive : {}),
                                    }}
                                    onClick={() => handleSuggestionClick(product)}
                                  >
                                    <div style={suggestionStyles.suggestionItemContent}>
                                      <span style={suggestionStyles.suggestionItemName}>
                                        {product.product.product_name}
                                      </span>
                                      <span style={suggestionStyles.suggestionItemPrice}>
                                        ${product.product.sellingPrice}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-2 flex gap-2">
                          <div className="grid grid-cols-12 quotationSelect">
                            <input
                              className="inputField col-span-3"
                              autoComplete="off"
                              type="text"
                              placeholder="Qty"
                              onChange={(e) => handleServiceQuantityChange(i, e.target.value)}
                              value={item.quantity}
                            />
                            <select
                              className="inputField col-span-9"
                              onChange={(e) => handleServiceUnitChange(i, e.target.value)}
                              value={item.unit || ""}
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
                            onChange={(e) => handleServiceRateChange(i, e.target.value)}
                            value={item.rateDisplay || item.rate || ""}
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
                        <div className="col-span-12 md:col-span-1" onClick={() => setRemoveButton("remove")}>
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
                  )
                })}
              </>
            )}
          </div>
          <div>
            <div className="flex justify-end mt-2 ">
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
                  className="border w-[135px] border-[#42A1DA] hover:border-[#42A1DA] text-black rounded-md px-2 py-2 mb-2"
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
                      <div className="grid grid-cols-12 gap-2 items-center mt-3">
                        <div className="col-span-12 md:col-span-1">
                          <input
                            className="inputField"
                            autoComplete="off"
                            type="text"
                            placeholder="SL No "
                            defaultValue={`${i + 1 < 10 ? `0${i + 1}` : i + 1}`}
                          />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                          <div style={suggestionStyles.suggestionContainer}>
                            <input
                              className="inputField"
                              autoComplete="off"
                              type="text"
                              placeholder="Description"
                              onChange={(e) => handleServiceDescriptionChange2(i, e.target.value)}
                              value={item.description}
                            />
                            {showSuggestions &&
                              activeInputType === "service" &&
                              activeInputIndex === i + (specificQuotation?.service_input_data?.length || 0) && (
                                <div style={suggestionStyles.suggestionsList} className="suggestionsList">
                                  {productSuggestions.map((product, index) => (
                                    <div
                                      key={product._id}
                                      className="suggestion-item"
                                      style={{
                                        ...suggestionStyles.suggestionItem,
                                        ...(index === activeSuggestionIndex
                                          ? suggestionStyles.suggestionItemActive
                                          : {}),
                                      }}
                                      onClick={() => handleSuggestionClick(product)}
                                    >
                                      <div style={suggestionStyles.suggestionItemContent}>
                                        <span style={suggestionStyles.suggestionItemName}>
                                          {product.product.product_name}
                                        </span>
                                        <span style={suggestionStyles.suggestionItemPrice}>
                                          ${product.product.sellingPrice}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-2 flex gap-2">
                          <div className="grid grid-cols-12 quotationSelect">
                            <input
                              className="inputField col-span-3"
                              autoComplete="off"
                              type="text"
                              placeholder="Qty"
                              onChange={(e) => handleServiceQuantityChange2(i, e.target.value)}
                              value={item.quantity}
                            />
                            <select
                              className="inputField col-span-9"
                              onChange={(e) => handleServiceUnitChange2(i, e.target.value)}
                              value={item.unit || ""}
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
                            onChange={(e) => handleServiceRateChange2(i, e.target.value)}
                            value={item.rateDisplay || ""}
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
                          <button
                            onClick={() => handleServiceDescriptionRemove(i)}
                            className="w-full bg-[#FF4C4C] hover:bg-[#FF3333] text-white rounded-md py-2 px-2 justify-center"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
                {/* Add Button positioned below all items */}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleServiceDescriptionAdd}
                    className="w-[135px] bg-[#42A1DA] hover:bg-[#42A1DA] text-white p-2 rounded-md"
                  >
                    Add
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="grid grid-cols-12 gap-2 items-center font-bold mb md:mb-1 mt-5  ">
            <label className="col-span-6 md:col-span-1 text-center hidden md:block ">SL No</label>
            <label className="col-span-12 md:col-span-6 text-center">Parts Description</label>
            <label className="col-span-6 md:col-span-2 text-center hidden md:block  ">Qty</label>
            <label className="col-span-6 md:col-span-1 text-center hidden md:block ">Rate</label>
            <label className="col-span-6 md:col-span-1 text-center hidden md:block  ">Amount</label>
            <label className="opacity-0 col-span-6 md:col-span-1 hidden md:block ">hidden items for responsive</label>
          </div>
          <div>
            {specificQuotation?.input_data?.length > 0 && (
              <>
                {specificQuotation?.input_data?.map((item, i) => {
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
                          <div style={suggestionStyles.suggestionContainer}>
                            <input
                              className="inputField"
                              autoComplete="off"
                              type="text"
                              placeholder="Description"
                              onChange={(e) => handleDescriptionChange(i, e.target.value)}
                              value={item.description}
                              required
                            />
                            {showSuggestions && activeInputType === "parts" && activeInputIndex === i && (
                              <div style={suggestionStyles.suggestionsList} className="suggestionsList">
                                {productSuggestions.map((product, index) => (
                                  <div
                                    key={product._id}
                                    className="suggestion-item"
                                    style={{
                                      ...suggestionStyles.suggestionItem,
                                      ...(index === activeSuggestionIndex ? suggestionStyles.suggestionItemActive : {}),
                                    }}
                                    onClick={() => handleSuggestionClick(product)}
                                  >
                                    <div style={suggestionStyles.suggestionItemContent}>
                                      <span style={suggestionStyles.suggestionItemName}>
                                        {product.product.product_name}
                                      </span>
                                      <span style={suggestionStyles.suggestionItemPrice}>
                                        ${product.product.sellingPrice}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-2 flex gap-2">
                          <div className="grid grid-cols-12 quotationSelect">
                            <input
                              className="inputField col-span-3"
                              autoComplete="off"
                              type="text"
                              placeholder="Qty"
                              onChange={(e) => handleQuantityChange(i, e.target.value)}
                              required
                              value={item.quantity}
                            />
                            <select
                              className="inputField col-span-9"
                              onChange={(e) => handleUnitChange(i, e.target.value)}
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
                            onChange={(e) => handleRateChange(i, e.target.value)}
                            required
                            value={item.rateDisplay || item.rate || ""}
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
                        <div className="col-span-12 md:col-span-1" onClick={() => setRemoveButton("remove")}>
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
                  )
                })}
              </>
            )}
          </div>
          <div>
            <div className="flex items-center justify-end mt-2">
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
                          <div style={suggestionStyles.suggestionContainer}>
                            <input
                              className="inputField"
                              autoComplete="off"
                              type="text"
                              placeholder="Description"
                              onChange={(e) => handleDescriptionChange2(i, e.target.value)}
                              value={item.description}
                              required
                            />
                            {showSuggestions &&
                              activeInputType === "parts" &&
                              activeInputIndex === i + (specificQuotation?.input_data?.length || 0) && (
                                <div style={suggestionStyles.suggestionsList} className="suggestionsList">
                                  {productSuggestions.map((product, index) => (
                                    <div
                                      key={product._id}
                                      className="suggestion-item"
                                      style={{
                                        ...suggestionStyles.suggestionItem,
                                        ...(index === activeSuggestionIndex
                                          ? suggestionStyles.suggestionItemActive
                                          : {}),
                                      }}
                                      onClick={() => handleSuggestionClick(product)}
                                    >
                                      <div style={suggestionStyles.suggestionItemContent}>
                                        <span style={suggestionStyles.suggestionItemName}>
                                          {product.product.product_name}
                                        </span>
                                        <span style={suggestionStyles.suggestionItemPrice}>
                                          ${product.product.sellingPrice}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-2 flex gap-2">
                          <div className="grid grid-cols-12 quotationSelect">
                            <input
                              className="inputField col-span-3"
                              autoComplete="off"
                              type="text"
                              placeholder="Qty"
                              onChange={(e) => handleQuantityChange2(i, e.target.value)}
                              value={item.quantity}
                              required
                            />
                            <select
                              className="inputField col-span-9"
                              onChange={(e) => handleUnitChange2(i, e.target.value)}
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
                            onChange={(e) => handleRateChange2(i, e.target.value)}
                            value={item.rateDisplay || ""}
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
                      <div className="flex justify-end ">
                        {items.length - 1 === i && (
                          <div onClick={handleAddClick} className="flex justify-end mt-2">
                            <button className="w-[135px] bg-[#42A1DA]  hover:bg-[#42A1DA] text-white p-2 rounded-md">
                              Add
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </>
            )}
          </div>
        </form>
        <div className="discountFieldWrap mt-5 ">
          <div className="flex items-center">
            <b> Total Amount: </b>
            <span>{formatNumber(grandTotal ? grandTotal : specificQuotation?.total_amount)}</span>
          </div>
          <div>
            <b> Discount: </b>
            <input
              className="py-1 text-center"
              onChange={(e) => handleDiscountChange(e.target.value)}
              autoComplete="off"
              type="text"
              placeholder="Discount"
              defaultValue={formatNumber(specificQuotation?.discount)}
              ref={partsDiscountRef}
            />
          </div>
          <div>
            <b>Vat: </b>
            <input
              className="text-center"
              onChange={(e) => handleVATChange(e.target.value)}
              autoComplete="off"
              type="text"
              placeholder="Vat"
              defaultValue={formatNumber(specificQuotation?.vat)}
            />
          </div>
          {/* New Tax Input Field */}
          <div>
            <b>Tax: </b>
            <input
              className="text-center"
              onChange={(e) => handleTaxChange(e.target.value)}
              autoComplete="off"
              type="text"
              placeholder="Tax"
              defaultValue={formatNumber(specificQuotation?.tax)}
            />
          </div>
          <div>
            <div className="ml-3">
              <strong>
                Final Total:{" "}
                <span ref={netTotalAmountRef}>
                  {formatNumber(calculateFinalTotal() ? calculateFinalTotal() : specificQuotation?.net_total)}
                </span>
              </strong>
            </div>
          </div>
        </div>
        <div className="mt-8 buttonGroup buttonMargin">
          <div className="flex  md:flex-row flex-wrap justify-end">
            <Button onClick={handleGoPreview}>Preview</Button>
            <a
              className="bg-[#42A0D9] text-white px-3 py-2  rounded-full "
              href={`${import.meta.env.VITE_API_URL}/quotations/quotation/${specificQuotation?._id}`}
              target="_blank"
              rel="noreferrer"
            >
              Download
            </a>
            <Button>Print </Button>
            <Button onClick={handleGoInvoice}>Invoice </Button>
          </div>
        </div>
        <div className="mt-10">
          <div className="flex  justify-center align-items-center">
            <Button
              sx={{ background: "#42A1DA", color: "#fff" }}
              onClick={handleOnSubmit}
              className="addJobBtn"
              disabled={updateLoading}
            >
              Update Quotation
            </Button>
          </div>
        </div>
        {error && <div className="pt-6 text-center text-red-400">{error}</div>}
      </div>
    </div>
  )
}

export default UpdateQuotation
