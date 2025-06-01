import { baseApi } from "./baseApi";

const productTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProductType: builder.mutation({
      query: (incomeInfo) => ({
        url: "/product-type",
        method: "POST",
        body: incomeInfo,
      }),
      invalidatesTags: ["productType"],
    }),
    getAllIProductType: builder.query({
      query: () => ({
        url: `/product-type`,
        method: "GET",
      }),
      providesTags: ["productType"],
    }),

    getSingleProductType: builder.query({
      query: (id) => ({
        url: `/product-type/${id}`,
        method: "GET",
      }),
      providesTags: ["productType"],
    }),
    updateProductType: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/product-type/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["productType"],
    }),

    deleteProductType: builder.mutation({
      query: (id) => ({
        url: `/product-type/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["productType"],
    }),
  }),
});

export const {
  useCreateProductTypeMutation,
  useGetAllIProductTypeQuery,
  useGetSingleProductTypeQuery,
  useUpdateProductTypeMutation,
  useDeleteProductTypeMutation,
} = productTypeApi;
