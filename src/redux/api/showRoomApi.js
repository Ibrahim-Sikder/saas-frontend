import { baseApi } from "./baseApi";

const showRoomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShowRoom: builder.mutation({
      query: (showroomInfo) => ({
        url: "/showrooms",
        method: "POST",
        body: showroomInfo,
      }),
      invalidatesTags: ["showroom"],
    }),
    getAllShowRooms: builder.query({
      query: ({ limit, page, searchTerm,isRecycled }) => ({
        url: `/showrooms`,
        method: "GET",
        params: { limit, page, searchTerm,isRecycled },
      }),
      providesTags: ["showroom", "jobCard", "invoice", "quotation", "vehicle"],
    }),

    getSingleShowRoom: builder.query({
      query: (id) => ({
        url: `/showrooms/${id}`,
        method: "GET",
      }),
      providesTags: ["showroom", "jobCard", "invoice", "quotation", "vehicle"],
    }),
    updateShowRoom: builder.mutation({
      query: (showroomInfo) => {
        return {
          url: `/showrooms/${showroomInfo.id}`,
          method: "PUT",
          body: showroomInfo.data,
        };
      },
      invalidatesTags: ["showroom"],
    }),

    deleteShowRoom: builder.mutation({
      query: (id) => ({
        url: `/showrooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["showroom"],
    }),
    permanantlyDeleteShowRoom: builder.mutation({
      query: (id) => ({
        url: `/showrooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["showroom"],
    }),
    moveRecycledShowRoom: builder.mutation({
      query: (id) => ({
        url: `/showrooms/recycle/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["showroom"],
    }),
    restoreFromRecycledShowRoom: builder.mutation({
      query: (id) => ({
        url: `/showrooms/restore/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["showroom"],
    }),
  }),
});

export const {
  useCreateShowRoomMutation,
  useGetAllShowRoomsQuery,
  useGetSingleShowRoomQuery,
  useUpdateShowRoomMutation,
  useDeleteShowRoomMutation,
  useMoveRecycledShowRoomMutation,
  useRestoreFromRecycledShowRoomMutation,
  usePermanantlyDeleteShowRoomMutation,
} = showRoomApi;
