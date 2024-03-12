// import apiSlice from "../../app/apiSlice"

// const CompaniesApiSlice = apiSlice.injectEndpoints({
//     endpoints: (build) => ({
//         getAllCompanies: build.query({
//             query: () => ({
//                 url:"/api/companies"

//             }),
//             providesTags:["Company"]
//         }),
//         addCompany:build.mutation({
//             query: (company) => ({
//                 url: "api/companies",
//                 method:"POST",
//                 body:company
//             }),
//             invalidatesTags:["Company"]
//         }),
//        updateCompany:build.mutation({
//             query: (company) => ({
//                 url: "/api/companies",
//                 method:"PUT",
//                 body:company
//             }),
//             invalidatesTags:["Company"]
//         }),
//         deleteCompany:build.mutation({
//             query: ({_id}) => ({
//                 url: "/api/companies",
//                 method:"Delete",
//                 body:{_id}
//             }),
//             invalidatesTags:["Company"]
//         }),
//     })
// })
// export const {useGetAllCompaniesQuery, useAddCompanyMutation,
//     useUpdateCompanyMutation, useDeleteCompanyMutation}=CompaniesApiSlice;

import apiSlice from "../../app/apiSlice";

const CompaniesApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllCompanies: build.query({
      query: () => ({
        url: "/api/companies",
      }),
      providesTags: ["Company"],
    }),
    getAllSchools: build.query({
      query: () => ({
        url: "/api/schools",
      }),
      invalidatesTags: ["Company"],
    }),
    getAllClasses: build.query({
      query: () => ({
        url: "/api/schools/class",
      }),
      invalidatesTags: ["Company"],
    }),
    addSchool: build.mutation({
      query: (school) => ({
        url: "api/schools",
        method: "POST",
        body: school,
      }),
      invalidatesTags: ["School"],
    }),
    addClass: build.mutation({
      query: (school) => ({
        url: "api/schools/class",
        method: "POST",
        body: school,
      }),
      invalidatesTags: ["School"],
    }),
    updateSchool: build.mutation({
      query: (school) => ({
        url: "/api/school",
        method: "PUT",
        body: school,
      }),
      invalidatesTags: ["Company"],
    }),
    deleteSchool: build.mutation({
      query: ({ _id }) => ({
        url: "/api/schools",
        method: "Delete",
        body: { _id },
      }),
      invalidatesTags: ["Company"],
    }),
    deleteClass: build.mutation({
        query: (school) => ({
          url: "/api/school/class",
          method: "delete",
          body: school,
        }),
        invalidatesTags: ["Company"],
      }),
  }),
});
export const {
  useAddSchoolMutation,
  useGetAllSchoolsQuery,
  useGetAllCompaniesQuery,
  useGetAllClassesQuery,
  useAddClassMutation,
  useDeleteSchoolMutation,
  useDeleteClassMutation
} = CompaniesApiSlice;
