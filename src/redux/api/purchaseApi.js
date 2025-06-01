import { baseApi } from "./baseApi";

const purchaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPurchase: builder.mutation({
      query: (quotationInfo) => ({
        url: "/purchases",
        method: "POST",
        body: quotationInfo,
      }),
      invalidatesTags: ["purchase"],
    }),
    getAllPurchases: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: `/purchases`,
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["purchase"],
    }),

    getSinglePurchase: builder.query({
      query: (id) => ({
        url: `/purchases/${id}`,
        method: "GET",
      }),
      providesTags: ["purchase"],
    }),

    updatePurchase: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/purchases/${id}`,
        method: "PUT",
        data,
      }),

      invalidatesTags: ["purchase"],
    }),
    removePurchase: builder.mutation({
      query: (purchasesInfo) => {
        return {
          url: `/purchases/remove-purchase`,
          method: "PATCH",
          body: purchasesInfo.data,
          params: { id: purchasesInfo.id },
        };
      },
      invalidatesTags: ["purchase"],
    }),
    deletePurchase: builder.mutation({
      query: (id) => ({
        url: `/purchases/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["purchase"],
    }),
  }),
});

export const {
  useCreatePurchaseMutation,
  useGetAllPurchasesQuery,
  useGetSinglePurchaseQuery,
  useUpdatePurchaseMutation,
  useRemovePurchaseMutation,
  useDeletePurchaseMutation,
} = purchaseApi;
