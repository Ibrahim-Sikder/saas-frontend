/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import {
  useCreateSupplierMutation,
  useGetSingleSupplierQuery,
  useUpdateSupplierMutation,
} from "../redux/api/supplier";
import { countries } from "../constant";
import { useTheme } from "@mui/material";
import { useTenantDomain } from "./useTenantDomain";

const supplierValidationSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
  vendor: z.string().optional(),
  shop_name: z.string().optional(),
  business_type: z.string().optional(),
  tax_id: z.string().optional(),
  registration_number: z.string().optional(),
  website: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  street_address: z.string().optional(),
  delivery_instructions: z.string().optional(),
  year_established: z.coerce.number().optional().nullable(),
  number_of_employees: z.coerce.number().optional().nullable(),
  annual_revenue: z.coerce.number().optional().nullable(),
  business_description: z.string().optional(),
  bank_name: z.string().optional(),
  account_number: z.string().optional(),
  swift_code: z.string().optional(),
  tax_exempt: z.boolean().optional(),
  tax_exemption_number: z.string().optional(),
  credit_terms: z.boolean().optional(),
  payment_terms: z.string().optional(),
  credit_limit: z.coerce.number().optional().nullable(),
  delivery_terms: z.string().optional(),
  minimum_order_value: z.coerce.number().optional().nullable(),
  lead_time: z.coerce.number().optional().nullable(),
  shipping_method: z.string().optional(),
  supply_chain_notes: z.string().optional(),
  // supplier_rating: z.number().min(0).max(5).optional().nullable(),
  supplier_status: z.enum(["active", "pending", "inactive"]).optional(),
  quality_certification: z.string().optional(),
  notes: z.string().optional(),
  supplier_photo: z.string().optional(),
});
export const useSupplierForm = (id) => {
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [countryCode, setCountryCode] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();
const tenantDomain = useTenantDomain();

  const { data: singleSupplier, isLoading } = useGetSingleSupplierQuery({
    tenantDomain,
    id,
  });
  const [updateSupplier, { isLoading: updateLoading }] =
    useUpdateSupplierMutation();
  const defaultSupplierValues = {
    // Basic Information
    full_name: "",
    shop_name: "",
    email: "",
    website: "",
    tax_id: "",
    registration_number: "",
    vendor: "",
    // Address Information
    street_address: "",
    country: "",
    state: "",
    city: "",
    postal_code: "",
    delivery_instructions: "",

    // Business Details
    year_established: new Date().getFullYear() - 5,
    number_of_employees: 10,
    annual_revenue: 100000,
    business_type: "new_parts",
    business_description: "",

    // Financial Information
    bank_name: "",
    account_number: "",
    swift_code: "",
    payment_terms: "net_30",
    credit_terms: false,
    credit_limit: 10000,
    tax_exempt: false,
    tax_exemption_number: "",

    // Supply Chain Information
    delivery_terms: "ex_works",
    minimum_order_value: 100,
    lead_time: 7,
    shipping_method: "",
    supply_chain_notes: "",
    supplier_rating: "",
    // Evaluation
    supplier_status: "",
    quality_certification: "",
    notes: "",
    supplier_photo: "",
  };

  // Modify the schema to match the form structure
  const formSchema = supplierValidationSchema.shape.body;

  const methods = useForm({
    defaultValues: defaultSupplierValues,
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const { watch, formState } = methods;
  const { errors } = formState;

  const creditTerms = watch("credit_terms", false);
  const taxExempt = watch("tax_exempt", false);

  const [createSupplier, { isLoading: createLoading }] =
    useCreateSupplierMutation();

  const handleTabChange = (event, newValue) => {
    const formData = methods.getValues();
    sessionStorage.setItem("supplierFormData", JSON.stringify(formData));

    event.preventDefault();
    setCurrentTab(newValue);
  };

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    if (
      /^\d*$/.test(newPhoneNumber) &&
      newPhoneNumber.length <= 11 &&
      (newPhoneNumber === "" ||
        !newPhoneNumber.startsWith("0") ||
        newPhoneNumber.length > 1)
    ) {
      setPhoneNumber(newPhoneNumber);
      methods.setValue("phone_number", newPhoneNumber);
    }
  };

  const formSubmit = async (data) => {
    const values = {
      ...data,
      country_code: countryCode.code,
      year_established: Number(data.year_established),
      number_of_employees: Number(data.number_of_employees),
      annual_revenue: Number(data.annual_revenue),
      tax_exempt: taxExempt,
      credit_terms: creditTerms,
      credit_limit: Number(data.credit_limit),
      minimum_order_value: Number(data.minimum_order_value),
      lead_time: Number(data.lead_time),
      supplier_photo: data.supplier_photo,
    };

    try {
      const response = await createSupplier({
        ...values,
        tenantDomain,
      }).unwrap();

      if (response.success) {

        toast.success(response.message);
        navigate("/dashboard/supplier-list");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmit = async (data) => {
    const values = {
      ...data,
      country_code: countryCode.code,
      year_established: Number(data.year_established),
      number_of_employees: Number(data.number_of_employees),
      annual_revenue: Number(data.annual_revenue),
      tax_exempt: taxExempt,
      credit_terms: creditTerms,
      credit_limit: Number(data.credit_limit),
      minimum_order_value: Number(data.minimum_order_value),
      lead_time: Number(data.lead_time),
      supplier_photo: data.supplier_photo,
    };

    try {
      const response = await updateSupplier({
        id,
        data: { ...values, tenantDomain },
      }).unwrap();

      if (response.success) {
        toast.success(response.message);
        navigate("/dashboard/supplier-list");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Update form when singleIncome data is loaded
  useEffect(() => {
    if (id && singleSupplier?.data) {
      populateForm(singleSupplier);
    }
  }, [id, singleSupplier]);

  const populateForm = (supplierData) => {
    if (!supplierData) return;

    const data = supplierData?.data;
    if (!data) return;

    // Find the country code in the countries array
    const countryCodeObj =
      countries.find((c) => c.code === data.country_code) || countries[0];
    setCountryCode(countryCodeObj);

    // Set phone number without country code
    setPhoneNumber(data.phone_number || "");

    // Reset form with supplier data
    methods.reset({
      // Basic Information
      full_name: data.full_name || "",
      shop_name: data.shop_name || "",
      email: data.email || "",
      website: data.website || "",
      tax_id: data.tax_id || "",
      registration_number: data.registration_number || "",
      vendor: data.vendor || "",
      phone_number: data.phone_number || "",

      // Address Information
      street_address: data.street_address || "",
      country: data.country || "",
      state: data.state || "",
      city: data.city || "",
      postal_code: data.postal_code || "",
      delivery_instructions: data.delivery_instructions || "",

      // Business Details
      year_established: data.year_established || new Date().getFullYear() - 5,
      number_of_employees: data.number_of_employees || 10,
      annual_revenue: data.annual_revenue || 100000,
      business_type: data.business_type || "new_parts",
      business_description: data.business_description || "",

      // Financial Information
      bank_name: data.bank_name || "",
      account_number: data.account_number || "",
      swift_code: data.swift_code || "",
      payment_terms: data.payment_terms || "net_30",
      credit_terms: data.credit_terms || false,
      credit_limit: data.credit_limit || 10000,
      tax_exempt: data.tax_exempt || false,
      tax_exemption_number: data.tax_exemption_number || "",

      // Supply Chain Information
      delivery_terms: data.delivery_terms || "ex_works",
      minimum_order_value: data.minimum_order_value || 100,
      lead_time: data.lead_time || 7,
      shipping_method: data.shipping_method || "",
      supply_chain_notes: data.supply_chain_notes || "",

      // Evaluation
      supplier_rating: data.supplier_rating || 3,
      supplier_status: data.supplier_status || "active",
      quality_certification: data.quality_certification || "",
      notes: data.notes || "",
      supplier_photo: data.supplier_photo || "",
    });
  };

  return {
    methods,
    formSubmit,
    onSubmit,
    populateForm,
    loading,
    createLoading,
    updateLoading,
    currentTab,
    setCurrentTab,
    handleTabChange,
    countryCode,
    setCountryCode,
    phoneNumber,
    handlePhoneNumberChange,
    creditTerms,
    taxExempt,
    errors,
    isEditing: !!id,
  };
};
