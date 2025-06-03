import { baseApi } from "./baseApi";

const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCustomer: builder.mutation({
      query: (customerInfo) => ({
        url: "/customers",
        method: "POST",
        body: customerInfo,
        headers: {
          tenant: window.location.hostname,
        },
      }),
      invalidatesTags: ["customer"],
    }),
    getAllCustomers: builder.query({
      query: ({ tenantDomain, limit, page, searchTerm, isRecycled }) => ({
        url: `/customers`,
        method: "GET",
        params: {tenantDomain, limit, page, searchTerm, isRecycled },
      }),
      providesTags: ["customer", "vehicle", "jobCard", "quotation", "invoice"],
    }),

    getSingleCustomer: builder.query({
      query: ({tenantDomain, id}) => ({
        url: `/customers/${id}`,
        method: "GET",
        params: {tenantDomain },
      }),
      providesTags: ["customer", "vehicle", "jobCard", "quotation", "invoice"],
    }),
    updateCustomer: builder.mutation({
      query: (customerInfo) => {
        return {
          url: `/customers/${customerInfo.id}`,
          method: "PUT",
          body: customerInfo.data,
        };
      },
      invalidatesTags: ["customer"],
    }),

    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["customer"],
    }),
    permanantlyDeleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["customer"],
    }),
    moveRecycledCustomer: builder.mutation({
      query: (id) => ({
        url: `/customers/recycle/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["customer"],
    }),
    restoreFromRecycledCustomer: builder.mutation({
      query: (id) => ({
        url: `/customers/restore/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["customer"],
    }),
    getAllTypeCustomers: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: `/meta/allcustomer`,
        method: "GET",
        params: {
          limit: limit || 10,
          page: page || 1,
          searchTerm,
        },
      }),
      providesTags: ["customer", "vehicle", "jobCard", "quotation", "invoice"],
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useGetAllCustomersQuery,
  useGetSingleCustomerQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useMoveRecycledCustomerMutation,
  useRestoreFromRecycledCustomerMutation,
  usePermanantlyDeleteCustomerMutation,
  useGetAllTypeCustomersQuery,
} = customerApi;
