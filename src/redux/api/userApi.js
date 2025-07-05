import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => {
        return {
          url: "/user",
          method: "POST",
          body: data,
        };
      },
    }),
    deleteUser: builder.mutation({
      query: ({ tenantDomain, id }) => ({
        url: `/user/${id}`,
        method: "DELETE",
        params: { tenantDomain },
      }),
      invalidatesTags: ["user"],
    }),
    getAllUser: builder.query({
      query: ({ tenantDomain, limit, page, searchTerm }) => ({
        url: `/user`,
        method: "GET",
        params: { tenantDomain, limit, page, searchTerm },
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useCreateUserMutation, useGetAllUserQuery, useDeleteUserMutation } = userApi;
