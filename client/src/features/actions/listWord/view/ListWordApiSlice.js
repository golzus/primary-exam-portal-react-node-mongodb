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
    getAllListWordsByClassAndByActive: build.mutation({
      query: (company) => ({
        url: "/api/listwords/active",
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
    //TEST  
    getTestByClassAndUser: build.mutation({
      query: (company) => ({
        url: "/api/test",
        method: "POST",
        body: company,
      }),
      invalidatesTags: ["Test"],
    }),

   getAllTestsDone: build.mutation({
  query: (company) => ({
    url: "/api/test/done",
    method: "POST",
    body: company,
  }),
  invalidatesTags: ["Test"],
}),
getAllTests:build.mutation({
query:(user)=>({
  url:"/api/test/all",
  method: "POST",
  body:user
}),
invalidatesTags:["Test"]
}),
    getSingleTest: build.mutation({
      query: (company) => ({
        url: "/api/test/single",
        method: "POST",
        body: company,
      }),
      invalidatesTags: ["Test"],
    }),
    updateTest: build.mutation({
      query: (company) => ({
        url: "/api/test",
        method: "PUT",
        body: company,
      }),
      invalidatesTags: ["Test"],
    }),
    getAlltestsByListWordId: build.mutation({
      query:(listword)=>({
        url:"/api/listwords/marks/byListWord",
      method:"POST",
      body:listword
      }),
      invalidatesTags:["ListWords"]
    }),
}),
})
export const {
  useGetAllListWordsQuery,
  useGetListWordsByIdMutation,
  useAddListWordsMutation,
  useUpdateListWordsMutation,
  useDeleteListWordsMutation,
  useGetAllListWordsByClassMutation,
  useGetTestByClassAndUserMutation,
  useGetSingleTestMutation,
  useUpdateTestMutation,
  useGetAllTestsDoneMutation,
  useGetAllListWordsByClassAndByActiveMutation,
  useGetAlltestsByListWordIdMutation,
  useGetAllTestsMutation
} = ListWordApiSlice;
