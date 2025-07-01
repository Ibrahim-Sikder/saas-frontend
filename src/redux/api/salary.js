import { baseApi } from "./baseApi";

const salaryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSalary: builder.mutation({
      query: (salaryInfo) => ({
        url: "/salary",
        method: "POST",
        body: salaryInfo,
      }),
      invalidatesTags: ["salary", "employee"],
    }),

    partialyPayment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/salary/${id}/payment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["salary", "employee"],
    }),

    getAllSalary: builder.query({
      query: ({ tenantDomain, searchTerm }) => ({
        url: `/salary/all`,
        method: "GET",
        params: { tenantDomain, searchTerm },
      }),
      providesTags: ["salary"],
    }),

    getSingleSalary: builder.query({
      query: ({ tenantDomain, id }) => ({
        url: `/salary/single/${id}`,
        method: "GET",
        params: { tenantDomain },
      }),
      providesTags: ["salary"],
    }),
    upateSalary: builder.mutation({
      query: ({ id, data }) => ({
        url: `/salary/${id}`,
        method: "PATCH",
        body: data,
      }),
      providesTags: ["salary"],
    }),

    deleteSalary: builder.mutation({
      query: ({ tenantDomain, id }) => ({
        url: `/salary/${id}`,
        method: "DELETE",
        params: { tenantDomain },
      }),
      invalidatesTags: ["salary"],
    }),
    getSalaryForProfile: builder.query({
      query: ({ tenantDomain, id, limit, page }) => ({
        url: "/salary/all-salary",
        method: "GET",
        params: { tenantDomain, id, limit, page },
      }),
      invalidatesTags: ["salary"],
    }),
  }),
});

export const {
  useCreateSalaryMutation,
  useGetAllSalaryQuery,
  useGetSingleSalaryQuery,
  useGetSalaryForProfileQuery,
  usePartialyPaymentMutation,
  useDeleteSalaryMutation,
  useUpateSalaryMutation,
} = salaryApi;
