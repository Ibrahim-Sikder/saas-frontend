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

// Define the Zod validation schema
const supplierValidationSchema = z.object({
  body: z.object({
    full_name: z.string({ required_error: "Full name is required." }),
    phone_number: z.string({ required_error: "Phone number is required." }),
    // country_code: z.string({ required_error: "Country code is required." }),
    email: z
      .string({ required_error: "Email is required." })
      .email("Invalid email format."),
    vendor: z.string({ required_error: "Vendor name is required." }),
    shop_name: z.string({ required_error: "Shop name is required." }),
    business_type: z.string({ required_error: "Business type is required." }),
    tax_id: z.string({ required_error: "Tax ID is required." }),
    registration_number: z.string({
      required_error: "Registration number is required.",
    }),
    website: z.string().optional(),
    country: z.string({ required_error: "Country name is required." }),
    city: z.string({ required_error: "City name is required." }),
    state: z.string({ required_error: "State is required." }),
    postal_code: z.string({ required_error: "Postal code is required." }),
    street_address: z.string({ required_error: "Street address is required." }),
    delivery_instructions: z.string().optional(),
    year_established: z.union([
      z.number({ required_error: "Year established is required." }),
      z.string().refine((val) => !isNaN(Number(val)), {
        message: "Year established must be a valid number.",
      }),
    ]),
    number_of_employees: z.union([
      z.number({ required_error: "Number of employees is required." }),
      z.string().refine((val) => !isNaN(Number(val)), {
        message: "Number of employees is required.",
      }),
    ]),

    annual_revenue: z.union([
      z.number({ required_error: "Annual revenue is required." }),
      z.string().refine((val) => !isNaN(Number(val)), {
        message: "Annual revenue is required.",
      }),
    ]),

    business_description: z.string().optional(),
    bank_name: z.string({ required_error: "Bank name is required." }),
    account_number: z.string({ required_error: "Account number is required." }),
    swift_code: z.string({ required_error: "SWIFT code is required." }),
    tax_exempt: z.boolean().default(false),
    tax_exemption_number: z.string().optional(),
    credit_terms: z.boolean().default(false),
    payment_terms: z.string({ required_error: "Payment terms are required." }),
    credit_limit: z.union([
      z.number(),
      z
        .string()
        .refine((val) => !isNaN(Number(val)))
        .optional(),
    ]),

    delivery_terms: z.string({
      required_error: "Delivery terms are required.",
    }),
    minimum_order_value: z.union([
      z.number({ required_error: "Minimum order value is required." }),
      z.string().refine((val) => !isNaN(Number(val)), {
        message: "Minimum order value is required.",
      }),
    ]),

    lead_time: z.union([
      z.number({ required_error: "Lead time is required." }),
      z.string().refine((val) => !isNaN(Number(val)), {
        message: "Lead time is required.",
      }),
    ]),

    shipping_method: z.string().optional(),
    supply_chain_notes: z.string().optional(),
    supplier_rating: z
      .number({ required_error: "Supplier rating is required." })
      .min(0, "Rating must be at least 0")
      .max(5, "Rating cannot exceed 5"),

    supplier_status: z.enum(["active", "pending", "inactive"], {
      required_error: "Supplier status is required.",
    }),
    quality_certification: z.string().optional(),
    notes: z.string().optional(),
  }),
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

  // Load saved form data on component mount
  useEffect(() => {
    if (!id) {
      const savedFormData = sessionStorage.getItem("supplierFormData");
      if (savedFormData) {
        try {
          const parsedData = JSON.parse(savedFormData);
          if (Object.keys(parsedData).length > 0) {
            methods.reset(parsedData);
          }
        } catch (e) {
          console.error("Error parsing saved form data", e);
        }
      }
    }
  }, [id, methods]);

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
