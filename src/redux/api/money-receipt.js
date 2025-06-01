import { baseApi } from "./baseApi";

const moneyReceiptApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMoneyReceipt: builder.mutation({
      query: (moneyReceiptInfo) => ({
        url: "/money-receipts",
        method: "POST",
        body: moneyReceiptInfo,
      }),
      invalidatesTags: ["moneyReceipt"],
    }),
    getAllMoneyReceipts: builder.query({
      query: ({ id, limit, page, searchTerm, isRecycled, dueMoney }) => ({
        url: `/money-receipts`,
        method: "GET",
        params: { id, limit, page, searchTerm, isRecycled,dueMoney  },
      }),

      providesTags: ["moneyReceipt"],
    }),
    dueAllMoneyReceipts: builder.query({
      query: ({ id, limit, page, searchTerm, isRecycled }) => ({
        url: `/money-receipts/duemoney-receipts`,
        method: "GET",
        params: { id, limit, page, searchTerm, isRecycled  },
      }),

      providesTags: ["moneyReceipt"],
    }),

    getSingleMoneyReceipt: builder.query({
      query: (id) => ({
        url: `/money-receipts/${id}`,
        method: "GET",
      }),
      providesTags: ["moneyReceipt"],
    }),
    updateMoneyReceipt: builder.mutation({
      query: (moneyReceiptInfo) => {
        return {
          url: `/money-receipts/${moneyReceiptInfo.id}`,
          method: "PUT",
          body: moneyReceiptInfo.data,
        };
      },
      invalidatesTags: ["moneyReceipt"],
    }),

    deleteMoneyReceipt: builder.mutation({
      query: (id) => ({
        url: `/money-receipts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["moneyReceipt"],
    }),
    permanantlyDeleteMoneyReceipt: builder.mutation({
      query: (id) => ({
        url: `/money-receipts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["moneyReceipt"],
    }),
    moveRecycledMoneyReceipt: builder.mutation({
      query: (id) => ({
        url: `/money-receipts/recycle/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["moneyReceipt"],
    }),
    restoreFromRecycledMoneyReceipt: builder.mutation({
      query: (id) => ({
        url: `/money-receipts/restore/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["moneyReceipt"],
    }),
  }),
});

export const {
  useCreateMoneyReceiptMutation,
  useGetAllMoneyReceiptsQuery,
  useGetSingleMoneyReceiptQuery,
  useUpdateMoneyReceiptMutation,
  useDeleteMoneyReceiptMutation,
  useMoveRecycledMoneyReceiptMutation,
  useRestoreFromRecycledMoneyReceiptMutation,
  usePermanantlyDeleteMoneyReceiptMutation,
  useDueAllMoneyReceiptsQuery
} = moneyReceiptApi;
