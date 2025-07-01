// hooks/useFormOptions.js
import { useState, useMemo } from "react";
import { useAllCustomerQuery } from "../redux/api/meta.api";
import { useGetAllInvoicesQuery } from "../redux/api/invoice";
import { useGetAllJobCardsQuery } from "../redux/api/jobCard";

export const useFormOptions = (initialFilterType = "") => {
  const tenantDomain = window.location.hostname.split(".")[0];
  const [filterType, setFilterType] = useState(initialFilterType);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Fetch data
  const { data: allCustomers } = useAllCustomerQuery({tenantDomain});
  const { data: allInvoices, isLoading: invoiceLoading } = useGetAllInvoicesQuery({
    tenantDomain,
    limit,
    page: currentPage,
    searchTerm: filterType,
    isRecycled: false,
  });
  const { data: allJobCards, isLoading: jobCardLoading } = useGetAllJobCardsQuery({
    tenantDomain,
    limit,
    page: currentPage,
    searchTerm: filterType,
    isRecycled: false,
  });

  // Generate options
  const jobcardOption = useMemo(() => {
    if (!allJobCards?.data?.jobCards) return [];
    return allJobCards.data.jobCards.map((jobcard) => ({
      label: `${jobcard.job_no} - ${jobcard.Id}`,
      value: jobcard._id,
    }));
  }, [allJobCards?.data?.jobCards]);

  const customerOption = useMemo(() => {
    if (!allCustomers?.data?.data) return [];
    return allCustomers.data.data.map((customer) => ({
      label: `${customer.name}`,
      value: customer._id,
    }));
  }, [allCustomers?.data?.data]);

  const vehicleOptions = useMemo(() => {
    if (!allJobCards?.data?.jobCards) return [];
    return allJobCards.data.jobCards.map((jobcard) => {
      const vehicle = jobcard.vehicle && jobcard.vehicle[0];
      return {
        label: `${vehicle?.vehicle_brand} - ${vehicle?.vehicle_name} - ${vehicle?.carReg_no}`,
        value: jobcard._id,
      };
    });
  }, [allJobCards?.data?.jobCards]);

  const invoiceOption = useMemo(() => {
    if (!allInvoices?.data?.invoices) return [];
    return allInvoices.data.invoices.map((invoice) => ({
      label: `${invoice.invoice_no} - ${invoice.Id}`,
      value: invoice._id,
    }));
  }, [allInvoices?.data?.invoices]);

  // Return all options and loading states
  return {
    // Options
    jobcardOption,
    customerOption,
    vehicleOptions,
    invoiceOption,
    
    // Loading states
    invoiceLoading,
    jobCardLoading,
    
    // Pagination controls
    currentPage,
    setCurrentPage,
    
    // Filter controls
    filterType,
    setFilterType,
    
    // Raw data (in case you need it)
    allCustomers,
    allInvoices,
    allJobCards
  };
};