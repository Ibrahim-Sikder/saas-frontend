import { baseApi } from "./baseApi";

const tenantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   createTenant: builder.mutation({
      query: ({ payload, plan }) => ({
        url: "/tenants",
        method: "POST",
        body: {
          ...payload,
          plan,
        },
      }),
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
