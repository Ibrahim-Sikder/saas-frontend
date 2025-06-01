import { baseApi } from "./baseApi";

const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCompany: builder.mutation({
      query: (companyInfo) => ({
        url: "/companies",
        method: "POST",
        body: companyInfo,
      }),
      invalidatesTags: ["company"],
    }),
    getAllCompanies: builder.query({
      query: ({ limit, page, searchTerm,isRecycled }) => ({
        url: `/companies`,
        method: "GET",
        params: { limit, page, searchTerm,isRecycled },
      }),
      providesTags: ["company", "jobCard", "invoice", "quotation", "vehicle"],
    }),

    getSingleCompany: builder.query({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "GET",
      }),
      providesTags: ["company", "jobCard", "invoice", "quotation", "vehicle"],
    }),
    updateCompany: builder.mutation({
      query: (companyInfo) => {
        return {
          url: `/companies/${companyInfo.id}`,
          method: "PUT",
          body: companyInfo.data,
        };
      },
      invalidatesTags:  ["company", "jobCard", "invoice", "quotation", "vehicle"],
    }),

    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:  ["company", "jobCard", "invoice", "quotation", "vehicle"],
    }),
    permanantlyDeleteCompany: builder.mutation({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:  ["company", "jobCard", "invoice", "quotation", "vehicle"],
    }),
    moveRecycledCompany: builder.mutation({
      query: (id) => ({
        url: `/companies/recycle/${id}`,
        method: "PATCH",
      }),
      invalidatesTags:  ["company", "jobCard", "invoice", "quotation", "vehicle"],
    }),
    restoreFromRecycledCompany: builder.mutation({
      query: (id) => ({
        url: `/companies/restore/${id}`,
        method: "PATCH",
      }),
      invalidatesTags:  ["company", "jobCard", "invoice", "quotation", "vehicle"],
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useGetAllCompaniesQuery,
  useGetSingleCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useMoveRecycledCompanyMutation,
  useRestoreFromRecycledCompanyMutation,
  usePermanantlyDeleteCompanyMutation
} = companyApi;
