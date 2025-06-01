import { baseApi } from "./baseApi";

const stockTransferApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStockTransfer: builder.mutation({
      query: (transferData) => ({
        url: "/stock-transfer",
        method: "POST",
        body: transferData,
      }),
      invalidatesTags: ["stockTransfers"],
    }),

    getAllStockTransfers: builder.query({
      query: ({ limit, page, searchTerm } = {}) => ({
        url: "/stock-transfer",
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["stockTransfers"],
    }),
    getSingleStockTransfer: builder.query({
      query: (id) => ({
        url: `/stock-transfer/${id}`,
        method: "GET",
      }),
      providesTags: ["stockTransfers"],
    }),
    deleteStockTransfer: builder.mutation({
      query: (id) => ({
        url: `/stock-transfer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["stockTransfers"],
    }),
  }),
});

export const {
  useCreateStockTransferMutation,
  useGetAllStockTransfersQuery,
  useGetSingleStockTransferQuery,
  useDeleteStockTransferMutation,
} = stockTransferApi;
