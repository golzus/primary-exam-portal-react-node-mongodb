
import apiSlice from "../../../app/apiSlice"

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query({
            query: () => ({
                url:"/api/users"

            }),
            providesTags:["Users"]
        }),
       listUsersCompany:build.mutation({
            query: (Users) => ({
                url: "/api/users",
                method:"POST",
                body:Users
            }),
            invalidatesTags:["Users"]
        }),
        addUser:build.mutation({
            query: (Users) => ({
                url: "/api/users",
                method:"POST",
                body:Users
            }),
            invalidatesTags:["Users"]
        }),
        getAllUsersByClass:build.mutation({
            query: (Users) => ({
                url: "/api/users/class",
                method:"POST",
                body:Users
            }),
            invalidatesTags:["Users"]
        }),
        addUser:build.mutation({
            query: (Users) => ({
                url: "/api/users",
                method:"POST",
                body:Users
            }),
            invalidatesTags:["Users"]
        }),
       updateUser:build.mutation({
            query: (Users) => ({
                url: "/api/users",
                method:"PUT",
                body:Users
            }),
            invalidatesTags:["Users"]
        }),
        deleteUser:build.mutation({
            query: ({_id}) => ({
                url: "/api/users",
                method:"DELETE",
                body:{_id}
            }),
            invalidatesTags:["Users"]
        }),
    })
})
export const {useGetAllUsersQuery, useAddUserMutation, useGetAllUsersByClassMutation,
    useUpdateUserMutation, useDeleteUserMutation,useListUsersCompanyMutation}=usersApiSlice;

