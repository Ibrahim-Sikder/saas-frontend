import { baseApi } from "./baseApi";

const metaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
 

    getAllMeta: builder.query({
      query: () => ({
        url: `/meta`,
        method: "GET",
      }),
      providesTags: ["meta"],
    }),
    allCustomer: builder.query({
      query: () => ({
        url: `/meta/allcustomer`,
        method: "GET",
      }),
      providesTags: ["meta"],
    }),


  }),
});

export const {
    useGetAllMetaQuery,
    useAllCustomerQuery
} = metaApi;
