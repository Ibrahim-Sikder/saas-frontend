import { baseApi } from "./baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBrand: builder.mutation({
      query: (incomeInfo) => ({
        url: "/brand",
        method: "POST",
        body: incomeInfo,
      }),
      invalidatesTags: ["brand"],
    }),

    getAllIBrand: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: `/brand`,
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["brand"],
    }),

    getSingleBrand: builder.query({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "GET",
      }),
      providesTags: ["brand"],
    }),
    updateBrand: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/brand/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["brand"],
    }),
    

    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brand"],
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useGetAllIBrandQuery,
  useGetSingleBrandQuery,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
