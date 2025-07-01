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
      query: ({ tenantDomain, limit, page, searchTerm }) => ({
        url: `/attendances`,
        method: "GET",
        params: { tenantDomain, limit, page, searchTerm },
      }),
      providesTags: ["attendance"],
    }),

    getSingleAttendance: builder.query({
      query: ({tenantDomain,date}) => ({
        url: `/attendances/${date}`,
        method: "GET",
        params:{tenantDomain}
      }),
      providesTags: ["attendance"],
    }),

    deleteAttendance: builder.mutation({
      query: ({tenantDomain , attendanceInfo}) => ({
        url: "/attendances/remove",
        method: "PUT",
        body: attendanceInfo,
        params:{tenantDomain}
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
