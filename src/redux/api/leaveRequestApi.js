import { baseApi } from "./baseApi";

const leaveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLeaveRequest: builder.mutation({
      query: (expenseInfo) => ({
        url: "/leave-requests",
        method: "POST",
        body: expenseInfo,
      }),
      invalidatesTags: ["leave"],
    }),
    getAllELeaveRequest: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: `/leave-requests`,
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["leave"],
    }),

    getSingleLeaveRequest: builder.query({
      query: (id) => ({
        url: `/leave-requests/${id}`,
        method: "GET",
      }),
      providesTags: ["leave"],
    }),
    getLeaveRequestByEmployeeId: builder.query({
      query: (employeeId) => ({
        url: `/leave-requests/employeeId?employeeId=${employeeId}`,
        method: "GET",
      }),
      providesTags: ["leave"],
    }),
    
    updateLeaveRequest: builder.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/leave-requests/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["leave"],
    }),

    deleteLeaveRequest: builder.mutation({
      query: (id) => ({
        url: `/leave-requests/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["leave"],
    }),
  }),
});

export const {
  useCreateLeaveRequestMutation,
  useGetAllELeaveRequestQuery,
  useGetSingleLeaveRequestQuery,
  useUpdateLeaveRequestMutation,
  useDeleteLeaveRequestMutation,
  useGetLeaveRequestByEmployeeIdQuery
} = leaveApi;


