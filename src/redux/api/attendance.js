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
      query: ({ tenantDomain }) => ({
        url: `/attendances/today`,
        method: "GET",
        params: { tenantDomain },
      }),
      providesTags: ["attendance"],
    }),
    getAllAttendances: builder.query({
      query: ({ tenantDomain, limit, page, searchTerm }) => ({
        url: `/attendances`,
        method: "GET",
        params: { tenantDomain, limit, page, searchTerm },
      }),
      providesTags: ["attendance"],
    }),

    getSingleAttendance: builder.query({
      query: ({ tenantDomain, date }) => ({
        url: `/attendances/${date}`,
        method: "GET",
        params: { tenantDomain },
      }),
      providesTags: ["attendance"],
    }),

    deleteAttendance: builder.mutation({
      query: ({ tenantDomain, date }) => ({
        url: "/attendances/remove",
        method: "DELETE",
        params: { tenantDomain, date },
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
  useDeleteAttendanceMutation,
} = attendanceApi;
