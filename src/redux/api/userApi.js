import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => {
        console.log('from redux api',data)
        return {
          url: '/user',
          method: 'POST',
          body: data,
        //   headers: {
        //     'X-Tenant-Domain': tenantDomain,
        //     'Origin': `https://${tenantDomain}`,
        //   },
        };
      },
    }),

    getAllUser: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: `/users`,
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useCreateUserMutation, useGetAllUserQuery } = userApi;