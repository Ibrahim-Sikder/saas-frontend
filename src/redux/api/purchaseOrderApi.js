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
      query: ({ tenantDomain, limit, page, searchTerm }) => ({
        url: "/purchase-orders",
        method: "GET",
        params: { tenantDomain, limit, page, searchTerm },
      }),
      providesTags: ["purchaseOrder"],
    }),

    getSinglePurchaseOrder: builder.query({
      query: ({ tenantDomain, id }) => ({
        url: `/purchase-orders/${id}`,
        method: "GET",
        params: {
          tenantDomain,
        },
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
      query: ({ tenantDomain, id }) => ({
        url: `/purchase-orders/${id}`,
        method: "DELETE",
        params: {
          tenantDomain,
        },
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
