import { baseApi } from "./baseApi";

const metaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllMeta: builder.query({
      query: ({tenantDomain}) => ({
        url: `/meta`,
        method: "GET",
         params:{tenantDomain}
      }),
      providesTags: ["meta"],
    }),
    allCustomer: builder.query({
      query: ({tenantDomain}) => ({
        url: `/meta/allcustomer`,
        method: "GET",
        params:{tenantDomain}
      }),
      providesTags: ["meta"],
    }),


  }),
});

export const {
    useGetAllMetaQuery,
    useAllCustomerQuery
} = metaApi;
