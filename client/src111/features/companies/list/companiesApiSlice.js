import apiSlice from "../../../app/apiSlice"


const companiesApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getAllCompanies:build.query({
            query:()=>({
                url:"/api/companies"
            }),
            providesTags:["Companies"]
        }),
        addCompany:build.mutation({
            query:(company)=>({
            url:"/api/companies",
            method:"POST",
            body:company
            }),
            invalidatesTags:["Companies"]
        }),
        updateCompany:build.mutation({
            query:(company)=>({
            url:"/api/companies",
            method:"PUT",
            body:company
            }),
            invalidatesTags:["Companies"]
    }),
    deleteCompany:build.mutation({
        query:({_id})=>({
        url:"/api/companies",
        method:"DELETE",
        body:{_id}
        }),
        invalidatesTags:["Companies"]
    }),
    })
})
export const{useGetAllCompaniesQuery,useAddCompanyMutation,useUpdateCompanyMutation,useDeleteCompanyMutation}=companiesApiSlice