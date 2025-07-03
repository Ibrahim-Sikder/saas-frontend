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
        };
      },
    }),

    getAllUser: builder.query({
      query: ({ tenantDomain ,limit, page, searchTerm }) => ({
        url: `/user`,
        method: "GET",
        params: { tenantDomain, limit, page, searchTerm },
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useCreateUserMutation, useGetAllUserQuery } = userApi;