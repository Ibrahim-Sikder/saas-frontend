import { baseApi } from "./baseApi";

const employeeOvertimeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEmployeeOvertime: builder.mutation({
      query: (overtimeInfo) => ({
        url: "/employee-overtime",
        method: "POST",
        body: overtimeInfo,
      }),
      invalidatesTags: ["employeeOvertime"],
    }),

    getAllEmployeeOvertimes: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/employee-overtime",
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["employeeOvertime"],
    }),

    getSingleEmployeeOvertime: builder.query({
      query: (overtimeId) => ({
        url: `/employee-overtime/${overtimeId}`,
        method: "GET",
      }),
      providesTags: ["employeeOvertime"],
    }),

    updateEmployeeOvertime: builder.mutation({
      query: ({ overtimeId, ...data }) => ({
        url: `/employee-overtime/${overtimeId}`,
        method: "PATCH",
        body:data,
      }),
      invalidatesTags: ["employeeOvertime"],
    }),

    deleteEmployeeOvertime: builder.mutation({
      query: (id) => ({
        url: `/employee-overtime/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employeeOvertime"],
    }),
  }),
});

export const {
  useCreateEmployeeOvertimeMutation,
  useGetAllEmployeeOvertimesQuery,
  useGetSingleEmployeeOvertimeQuery,
  useUpdateEmployeeOvertimeMutation,
  useDeleteEmployeeOvertimeMutation,
} = employeeOvertimeApi;
