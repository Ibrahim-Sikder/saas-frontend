import { baseApi } from "./baseApi";

const jobCardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createJobCard: builder.mutation({
      query: (jobCardInfo) => ({
        url: "/jobCards",
        method: "POST",
        body: jobCardInfo,
      }),
      invalidatesTags: ["jobCard"],
    }),
    getAllJobCards: builder.query({
      query: ({tenantDomain, id, limit, page, searchTerm,isRecycled }) => ({
        url: `/jobCards`,
        method: "GET",
        params: {tenantDomain, id,limit, page, searchTerm, isRecycled},
      }),
      providesTags: ["jobCard"],
    }),
    

    getSingleJobCard: builder.query({
      query: ({ tenantDomain, id }) => ({
        url: `/jobCards/${id}`,
        method: "GET",
            params: { tenantDomain },
      }),
      providesTags: ["jobCard"],
    }),
    getUserDetailsForJobCard: builder.query({
      query: ({tenantDomain, id, userType}) => ({
        url: `/jobCards/${id}/${userType}`,
        method: "GET",
            params: { tenantDomain },
      }),
      providesTags: ["jobCard"],
    }),

    getSingleJobCardWithJobNo: builder.query({
      query: ({tenantDomain, jobNo}) => ({
        url: `/jobCards/getWithJobNo`,
        method: "GET",
        params: { tenantDomain, jobNo },
      }),
      providesTags: ["jobCard"],
    }),
    updateJobCard: builder.mutation({
      query: (jobCardInfo) => {
        return {
          url: `/jobCards/${jobCardInfo.id}`,
          method: "PUT",
          body: jobCardInfo.data,
        };
      },
      invalidatesTags: ["jobCard"],
    }),

    deleteJobCard: builder.mutation({
      query: (id) => ({
        url: `/jobCards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["jobCard"],
    }),
    movetoRecyclebinJobCard: builder.mutation({
      query: ({ tenantDomain, id }) => ({
        url: `/jobcards/recycle-bin/${id}`,
        method: "DELETE",
        params:{tenantDomain}
      }),
      invalidatesTags: ["jobCard"],
    }),
    restorfromRecyclebinJobCard: builder.mutation({
      query: ({ tenantDomain, id }) => ({
        url: `/jobcards/recycle-bin/restore/${id}`,
        method: "DELETE",
         params:{tenantDomain}
      }),
      invalidatesTags: ["jobCard"],
    }),
    permanantlyDeleteJobCard: builder.mutation({
      query: ({ tenantDomain, id }) => ({
        url: `/jobCards/recycle-bin/delete-permanantly/${id}`,
        method: "DELETE",
         params:{tenantDomain}
      }),
      invalidatesTags: ["jobCard"],
    }),
  }),
});


export const {
  useCreateJobCardMutation,
  useGetAllJobCardsQuery,
  useGetSingleJobCardQuery,
  useGetUserDetailsForJobCardQuery,
  useGetSingleJobCardWithJobNoQuery,
  useUpdateJobCardMutation,
  useDeleteJobCardMutation,
  useMovetoRecyclebinJobCardMutation,
  useRestorfromRecyclebinJobCardMutation,
  usePermanantlyDeleteJobCardMutation
} = jobCardApi;
