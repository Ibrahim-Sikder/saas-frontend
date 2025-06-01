import { baseApi } from "./baseApi";

const quotationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createQuotation: builder.mutation({
      query: (quotationInfo) => ({
        url: "/quotations",
        method: "POST",
        body: quotationInfo,
      }),
      invalidatesTags: ["quotation"],
    }),
    getAllQuotations: builder.query({
      query: ({ id,limit, page, searchTerm, isRecycled,status }) => ({
        url: `/quotations`,
        method: "GET",
        params: { id ,limit, page, searchTerm,isRecycled,status },
      }),
      providesTags: ["quotation"],
    }),
    getAllQuotationsForDashboard: builder.query({
      query: () => ({
        url: `quotations/quotation/dashboard`,
        method: "GET",
      }),
      providesTags: ["quotation"],
    }),

    getSingleQuotation: builder.query({
      query: (id) => ({
        url: `/quotations/${id}`,
        method: "GET",
      }),
      providesTags: ["quotation"],
    }),
    
    updateQuotation: builder.mutation({
      query: (quotationInfo) => {
        return {
          url: `/quotations/${quotationInfo.id}`,
          method: "PUT",
          body: quotationInfo.data,
        };
      },
      invalidatesTags: ["quotation"],
    }),
    removeQuotation: builder.mutation({
      query: (quotationInfo) => {
        return {
          url: `/quotations/remove-quotation`,
          method: "PATCH",
          body: quotationInfo.data,
          params: { id: quotationInfo.id },
        };
      },
      invalidatesTags: ["quotation"],
    }),

    deleteQuotation: builder.mutation({
      query: (id) => ({
        url: `/quotations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["quotation"],
    }),
    permanantlyDeleteQuotation: builder.mutation({
      query: (id) => ({
        url: `/quotations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["quotation"],
    }),
    moveRecycledQuotation: builder.mutation({
      query: (id) => ({
        url: `/quotations/recycle/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["quotation"],
    }),
    restoreFromRecycledQuotation: builder.mutation({
      query: (id) => ({
        url: `/quotations/restore/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["quotation"],
    }),
  }),
});

export const {
  useCreateQuotationMutation,
  useGetAllQuotationsQuery,
  useGetAllQuotationsForDashboardQuery,
  useGetSingleQuotationQuery,
  useUpdateQuotationMutation,
  useDeleteQuotationMutation,
  useRemoveQuotationMutation,
  useMoveRecycledQuotationMutation,
  useRestoreFromRecycledQuotationMutation,
  usePermanantlyDeleteQuotationMutation,
 
} = quotationApi;
