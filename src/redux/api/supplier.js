import { baseApi } from "./baseApi";

const supplierApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSupplier: builder.mutation({
      query: (supplierInfo) => ({
        url: "/suppliers",
        method: "POST",
        body: supplierInfo,
      }),
      invalidatesTags: ["supplier"],
    }),
    getAllSuppliers: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: `/suppliers`,
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["supplier"],
    }),

    getSingleSupplier: builder.query({
      query: (id) => ({
        url: `/suppliers/${id}`,
        method: "GET",
      }),
      providesTags: ["supplier"],
    }),
    getSupplierWithBillPay: builder.query({
      query: (id) => ({
        url: `/suppliers/${id}/profile`,
        method: "GET",
      }),
      providesTags: ["supplier"],
    }),
    updateSupplier: builder.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/suppliers/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["supplier"],
    }),

    deleteSupplier: builder.mutation({
      query: (id) => ({
        url: `/suppliers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["supplier"],
    }),
    permenantlyDeleteSupplier: builder.mutation({
      query: (id) => ({
        url: `/suppliers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["supplier"],
    }),
    moveRecycledSupplier: builder.mutation({
      query: (id) => ({
        url: `/suppliers/recycle/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["supplier"],
    }),
    restoreFromRecycledSupplier: builder.mutation({
      query: (id) => ({
        url: `/suppliers/restore/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["supplier"],
    }),
  }),
});

export const {
  useCreateSupplierMutation,
  useGetAllSuppliersQuery,
  useGetSingleSupplierQuery,
  useUpdateSupplierMutation,
  useRestoreFromRecycledSupplierMutation,
  useMoveRecycledSupplierMutation,
  usePermenantlyDeleteSupplierMutation,
  useGetSupplierWithBillPayQuery
} = supplierApi;
