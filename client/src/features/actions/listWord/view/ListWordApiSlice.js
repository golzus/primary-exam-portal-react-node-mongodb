
import apiSlice from "../../../../app/apiSlice"

const ListWordApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllListWords: build.query({
            query: () => ({
                url:"/api/listwords"

            }),
            providesTags:["ListWords"]
        }),
        addListWords:build.mutation({
            query: (company) => ({
                url: "api/listwords",
                method:"POST",
                body:company
            }),
            invalidatesTags:["ListWords"]
        }),
       updateListWords:build.mutation({
            query: (company) => ({
                url: "/api/listwords",
                method:"PUT",
                body:company
            }),
            invalidatesTags:["ListWords"]
        }),
        deleteListWords:build.mutation({
            query: ({_id}) => ({
                url: "/api/listwords",
                method:"Delete",
                body:{_id}
            }),
            invalidatesTags:["ListWords"]
        }),
    })
})
export const {useGetAllListWordsQuery,useAddListWordsMutation,useUpdateListWordsMutation,useDeleteListWordsMutation}=ListWordApiSlice;

