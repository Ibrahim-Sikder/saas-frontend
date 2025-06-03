import { baseApi } from "./baseApi";

const tenantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTenant: builder.mutation({
      query: (data) => ({
        url: "/tenants",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tenant"],
    }),

    getAllTenant: builder.query({
      query: () => ({
        url: `/tenants`,
        method: "GET"
      }),
      providesTags: ["tenant"],
    }),
  }),
});

export const { useCreateTenantMutation, useGetAllTenantQuery } = tenantApi;
