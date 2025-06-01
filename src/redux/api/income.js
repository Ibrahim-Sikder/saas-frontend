import { baseApi } from "./baseApi";

const incomeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createIncome: builder.mutation({
      query: (incomeInfo) => ({
        url: "/incomes",
        method: "POST",
        body: incomeInfo,
      }),
      invalidatesTags: ["income"],
    }),
    getAllIncomes: builder.query({
      query: ({ limit, page }) => ({
        url: `/incomes`,
        method: "GET",
        params: { limit, page },
      }),
      providesTags: ["income"],
    }),

    getSingleIncome: builder.query({
      query: (id) => ({
        url: `/incomes/${id}`,
        method: "GET",
      }),
      providesTags: ["income"],
    }),
    updateIncome: builder.mutation({
      query: (incomeInfo) => {
        return {
          url: `/incomes/${incomeInfo.id}`,
          method: "PUT",
          body: incomeInfo.data,
        };
      },
      invalidatesTags: ["income"],
    }),

    deleteIncome: builder.mutation({
      query: (id) => ({
        url: `/incomes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["income"],
    }),
  }),
});

export const {
  useCreateIncomeMutation,
  useGetAllIncomesQuery,
  useGetSingleIncomeQuery,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
} = incomeApi;
