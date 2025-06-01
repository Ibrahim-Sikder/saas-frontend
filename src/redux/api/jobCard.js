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
      query: ({ id, limit, page, searchTerm,isRecycled }) => ({
        url: `/jobCards`,
        method: "GET",
        params: { id,limit, page, searchTerm, isRecycled},
      }),
      providesTags: ["jobCard"],
    }),
    

    getSingleJobCard: builder.query({
      query: (id) => ({
        url: `/jobCards/${id}`,
        method: "GET",
      }),
      providesTags: ["jobCard"],
    }),
    getUserDetailsForJobCard: builder.query({
      query: ({id, userType}) => ({
        url: `/jobCards/${id}/${userType}`,
        method: "GET",
      }),
      providesTags: ["jobCard"],
    }),

    getSingleJobCardWithJobNo: builder.query({
      query: (jobNo) => ({
        url: `/jobCards/getWithJobNo`,
        method: "GET",
        params: { jobNo },
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
      query: (id) => ({
        url: `/jobcards/recycle-bin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["jobCard"],
    }),
    restorfromRecyclebinJobCard: builder.mutation({
      query: (id) => ({
        url: `/jobcards/recycle-bin/restore/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["jobCard"],
    }),
    permanantlyDeleteJobCard: builder.mutation({
      query: (id) => ({
        url: `/jobCards/recycle-bin/delete-permanantly/${id}`,
        method: "DELETE",
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
