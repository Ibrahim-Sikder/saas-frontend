import { baseApi } from "./baseApi";

const purchaseReturnApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPurchaseReturn: builder.mutation({
      query: (returnInfo) => ({
        url: "/purchase-return",
        method: "POST",
        body: returnInfo,
      }),
      invalidatesTags: ["purchaseReturn"],
    }),

    getAllPurchaseReturns: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/purchase-return",
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["purchaseReturn"],
    }),

    getSinglePurchaseReturn: builder.query({
      query: (id) => ({
        url: `/purchase-return/${id}`,
        method: "GET",
      }),
      providesTags: ["purchaseReturn"],
    }),

    updatePurchaseReturn: builder.mutation({
      query: ({ id, data }) => ({
        url: `/purchase-return/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["purchaseReturn"],
    }),

    removePurchaseReturn: builder.mutation({
      query: ({ id, data }) => ({
        url: `/purchase-return/remove-return`,
        method: "PATCH",
        body: data,
        params: { id },
      }),
      invalidatesTags: ["purchaseReturn"],
    }),

    deletePurchaseReturn: builder.mutation({
      query: (id) => ({
        url: `/purchase-return/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["purchaseReturn"],
    }),
  }),
});

export const {
  useCreatePurchaseReturnMutation,
  useGetAllPurchaseReturnsQuery,
  useGetSinglePurchaseReturnQuery,
  useUpdatePurchaseReturnMutation,
  useRemovePurchaseReturnMutation,
  useDeletePurchaseReturnMutation,
} = purchaseReturnApi;
