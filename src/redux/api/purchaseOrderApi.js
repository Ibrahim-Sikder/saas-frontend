import { baseApi } from "./baseApi";

const purchaseOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPurchaseOrder: builder.mutation({
      query: (orderInfo) => ({
        url: "/purchase-orders",
        method: "POST",
        body: orderInfo,
      }),
      invalidatesTags: ["purchaseOrder"],
    }),

    getAllPurchaseOrders: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/purchase-orders",
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["purchaseOrder"],
    }),

    getSinglePurchaseOrder: builder.query({
      query: (id) => ({
        url: `/purchase-orders/${id}`,
        method: "GET",
      }),
      providesTags: ["purchaseOrder"],
    }),

    updatePurchaseOrder: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/purchase-orders/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["purchaseOrder"],
    }),

    removePurchaseOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/purchase-orders/remove-order`,
        method: "PATCH",
        body: data,
        params: { id },
      }),
      invalidatesTags: ["purchaseOrder"],
    }),

    deletePurchaseOrder: builder.mutation({
      query: (id) => ({
        url: `/purchase-orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["purchaseOrder"],
    }),
  }),
});

export const {
  useCreatePurchaseOrderMutation,
  useGetAllPurchaseOrdersQuery,
  useGetSinglePurchaseOrderQuery,
  useUpdatePurchaseOrderMutation,
  useRemovePurchaseOrderMutation,
  useDeletePurchaseOrderMutation,
} = purchaseOrderApi;
