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
      query: ({ searchTerm }) => ({
        url: `/salary/all`,
        method: "GET",
        params: { searchTerm },
      }),
      providesTags: ["salary"],
    }),

    getSingleSalary: builder.query({
      query: (id) => ({
        url: `/salary/single/${id}`,
        method: "GET",
      }),
      providesTags: ["salary"],
    }),
    upateSalary: builder.mutation({
      query: ({id, data}) => ({
        url: `/salary/${id}`,
        method: "PATCH",
        body: data,
      }),
      providesTags: ["salary"],
    }),

    deleteSalary: builder.mutation({
      query: (id) => ({
        url: `/salary/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["salary"],
    }),
    getSalaryForProfile: builder.query({
      query: ({ id, limit, page }) => ({
        url: "/salary/all-salary",
        method: "GET",
        params: { id, limit, page },
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
  useUpateSalaryMutation
} = salaryApi;
