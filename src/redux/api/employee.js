import { baseApi } from "./baseApi";

const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query: (employeeInfo) => ({
        url: "/employees",
        method: "POST",
        body: employeeInfo,
      }),
      invalidatesTags: ["employee"],
    }),
    getAllEmployees: builder.query({
      query: ({ id, limit, page, searchTerm, isRecycled }) => ({
        url: `/employees`,
        method: "GET",
        params: { id, limit, page, searchTerm, isRecycled },
      }),

      providesTags: ["employee", "attendance"],
    }),

    getSingleEmployee: builder.query({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "GET",
      }),
      providesTags: ["employee"],
    }),
    updateEmployee: builder.mutation({
      query: (employeeInfo) => {
        return {
          url: `/employees/${employeeInfo.id}`,
          method: "PUT",
          body: employeeInfo.data,
        };
      },
      invalidatesTags: ["employee"],
    }),

    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employee"],
    }),
    permenantlyDeleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employee"],
    }),
    moveRecycledEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/recycle/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["employee"],
    }),
    restoreFromRecycledEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/restore/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["employee"],
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useGetAllEmployeesQuery,
  useGetSingleEmployeeQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useMoveRecycledEmployeeMutation,
  useRestoreFromRecycledEmployeeMutation,
  usePermenantlyDeleteEmployeeMutation,
} = employeeApi;
