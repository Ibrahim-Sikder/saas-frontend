import { baseApi } from "./baseApi";

const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExpense: builder.mutation({
      query: (expenseInfo) => ({
        url: "/expenses",
        method: "POST",
        body: expenseInfo,
      }),
      invalidatesTags: ["expense"],
    }),
    getAllExpenses: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: `/expenses`,
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["expense"],
    }),

    getSingleExpense: builder.query({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "GET",
      }),
      providesTags: ["expense"],
    }),
    updateExpense: builder.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/expenses/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["expense"],
    }),

    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expense"],
    }),

    // expense category api
    createExpenseCategory: builder.mutation({
      query: (expenseInfo) => ({
        url: "/expenses/expense-categories/create",
        method: "POST",
        body: expenseInfo,
      }),
      invalidatesTags: ["expense"],
    }),
    getAllExpensesCategory: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: `/expenses/expense-categories/all`,
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["expense"],
    }),

    getSingleExpenseCategory: builder.query({
      query: (id) => ({
        url: `/expenses/expense-categories/${id}`,
        method: "GET",
      }),
      providesTags: ["expense"],
    }),
    updateExpenseCategory: builder.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/expenses/expense-categories/update/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["expense"],
    }),

    deleteExpenseCategory: builder.mutation({
      query: (id) => ({
        url: `/expenses/expense-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expense"],
    }),
  }),
});

export const {
  useCreateExpenseMutation,
  useGetAllExpensesQuery,
  useGetSingleExpenseQuery,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useCreateExpenseCategoryMutation,
  useGetAllExpensesCategoryQuery,
  useDeleteExpenseCategoryMutation,
  useUpdateExpenseCategoryMutation,
  useGetSingleExpenseCategoryQuery,
} = expenseApi;
