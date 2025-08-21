import { baseApi } from "./baseApi";

const vehicleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVehicle: builder.mutation({
      query: (vehicleInfo) => ({
        url: "/vehicles",
        method: "POST",
        body: vehicleInfo,
      }),
      invalidatesTags: ["vehicle"],
    }),

    getAllVehicles: builder.query({
      query: ({ tenantDomain, id, limit, page, searchTerm, isRecycled }) => ({
        url: `/vehicles`,
        method: "GET",
        params: { tenantDomain, id, limit, page, searchTerm, isRecycled },
      }),
      providesTags: ["vehicle"],
    }),

    getSingleVehicle: builder.query({
      query: ({ tenantDomain, id }) => ({
        url: `/vehicles/${id}`,
        method: "GET",
        params: {
          tenantDomain,
        },
      }),
      providesTags: ["vehicle"],
    }),

    deleteVehicle: builder.mutation({
      query: ({ tenantDomain, id }) => ({
        url: `/vehicles/${id}`,
        method: "DELETE",
        params: {
          tenantDomain,
        },
      }),
      invalidatesTags: ["vehicle"],
    }),
    updateVehicle: builder.mutation({
      query: ({ tenantDomain, id, vehicleInfo }) => ({
        url: `/vehicles/${id}`,
        method: "PATCH",
        body: vehicleInfo, // now correctly passed from params
        params: {
          tenantDomain,
        },
      }),
      invalidatesTags: ["vehicle"],
    }),
  }),
});

export const {
  useCreateVehicleMutation,
  useGetAllVehiclesQuery,
  useGetSingleVehicleQuery,
  useDeleteVehicleMutation,
  useUpdateVehicleMutation,
} = vehicleApi;
