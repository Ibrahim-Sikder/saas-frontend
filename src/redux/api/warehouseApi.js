import { baseApi } from "./baseApi";

const warehouseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createWarehouse: builder.mutation({
      query: (warehouseInfo) => ({
        url: "/warehouse",
        method: "POST",
        body: warehouseInfo,
      }),
      invalidatesTags: ["warehouse"],
    }),

    getAllWarehouses: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/warehouse",
        method: "GET",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["warehouse"],
    }),

    getSingleWarehouse: builder.query({
      query: (id) => ({
        url: `/warehouse/${id}`,
        method: "GET",
      }),
      providesTags: ["warehouse"],
    }),

    updateWarehouse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/warehouse/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["warehouse"],
    }),

    removeWarehouse: builder.mutation({
      query: (warehousesInfo) => ({
        url: "/warehouse/remove-warehouse",
        method: "PATCH",
        body: warehousesInfo.data,
        params: { id: warehousesInfo.id },
      }),
      invalidatesTags: ["warehouse"],
    }),

    deleteWarehouse: builder.mutation({
      query: (id) => ({
        url: `/warehouse/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["warehouse"],
    }),
  }),
});

export const {
  useCreateWarehouseMutation,
  useGetAllWarehousesQuery,
  useGetSingleWarehouseQuery,
  useUpdateWarehouseMutation,
  useRemoveWarehouseMutation,
  useDeleteWarehouseMutation,
} = warehouseApi;
