import apiSlice from "../../../../app/apiSlice";

const ListWordApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllListWords: build.query({
      query: () => ({
        url: "/api/listwords",
        method:"GET"
      }),
      providesTags: ["ListWords"],
    }),
    getAllListWordsByClass: build.mutation({
      query: (company) => ({
        url: "/api/listwords",
        method: "POST",
        body: company,
      }),
      invalidatesTags: ["ListWords"],
    }),
    getListWordsById: build.mutation({
      query: (company) => ({
        url: "/api/listwords/get",
        method: "POST",
        body: company,
      }),
      invalidatesTags: ["ListWords"],
    }),

    addListWords: build.mutation({
      query: (company) => ({
        url: "api/listwords/add",
        method: "POST",
        body: company,
      }),
      invalidatesTags: ["ListWords"],
    }),
    updateListWords: build.mutation({
      query: (company) => ({
        url: "/api/listwords",
        method: "PUT",
        body: company,
      }),
      invalidatesTags: ["ListWords"],
    }),
    deleteListWords: build.mutation({
      query: ({ _id }) => ({
        url: "/api/listwords",
        method: "Delete",
        body: { _id },
      }),
      invalidatesTags: ["ListWords"],
    }),
  }),
});
export const {
  useGetAllListWordsQuery,
  useGetListWordsByIdMutation,
  useAddListWordsMutation,
  useUpdateListWordsMutation,
  useDeleteListWordsMutation,
  useGetAllListWordsByClassMutation,
} = ListWordApiSlice;
