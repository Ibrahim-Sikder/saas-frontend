import { baseApi } from "./baseApi";

const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAttendance: builder.mutation({
      query: (attendanceInfo) => ({
        url: "/attendances",
        method: "POST",
        body: attendanceInfo,
      }),
      invalidatesTags: ["attendance", "employee"],
    }),
    getTodayAttendance: builder.query({
      query: () => ({
        url: `/attendances/today`,
        method: "GET",
      }),
      providesTags: ["attendance"],
    }),
    getAllAttendances: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: `/attendances`,
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["attendance"],
    }),

    
    getSingleAttendance: builder.query({
      query: (date) => ({
        url: `/attendances/${date}`,
        method: "GET",
      }),
      providesTags: ["attendance"],
    }),

    
    deleteAttendance: builder.mutation({
      query: (attendanceInfo) => ({
        url: "/attendances/remove",
        method: "PUT",
        body: attendanceInfo,
      }),
      invalidatesTags: ["attendance"],
    }),
  }),
});

export const {
  useCreateAttendanceMutation,
  useGetTodayAttendanceQuery,
  useGetAllAttendancesQuery,
  useGetSingleAttendanceQuery,
  useDeleteAttendanceMutation
} = attendanceApi;
