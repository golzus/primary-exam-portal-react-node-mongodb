import apiSlice from "../../app/apiSlice";

const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllCommentsByTestId: build.query({
            query: ({ testId }) => ({
                url: `/api/comment//${testId}`, // שימוש ב-testId בנתיב
            }),
            providesTags: ["comment"],
        }),
        createMessage: build.mutation({
            query: (comment) => ({
                url: "/api/comment",
                method: "POST",
                body: comment,
            }),
            invalidatesTags: ["comment"],
        }),
        markResponseAsRead: build.mutation({
            query: ({ messageId, responseIndex }) => ({
               url: `/api/comment/${messageId}/responses/0/read`, // שימוש ב-messageId ו-responseIndex בנתיב
              url: `/api/comment/${messageId}/responses/${parseInt(responseIndex, 10)}/read`,

                method: "PUT",
            }),
            invalidatesTags: ["comment"],
        }),
    }),
});

export const {
    useGetAllCommentsByTestIdQuery,
    useCreateMessageMutation,
    useMarkResponseAsReadMutation,
} = commentApiSlice;
