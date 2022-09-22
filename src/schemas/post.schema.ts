import { object, string, TypeOf } from "zod";

// create post schema
export const createPostSchema = object({
    body: object({
        title: string({
            required_error: 'Title is required',
        }),

        content: string(),

        image: string(),

        video: string(),
    }),
});



const params = {
    params: object({
        postId: string(),
    }),
};


// get posts schema
export const getPostSchema = object({
    ...params,
});


// update posts schema
export const updatePostSchema = object({
    ...params,
    body: object({
        title: string(),
        content: string(),
        image: string(),
        video: string(),
    }).partial(),
});


// delete post schema
export const deletePostSchema = object({
    ...params,
});


export type CreatePostInput = TypeOf<typeof createPostSchema>['body'];
export type GetPostInput = TypeOf<typeof getPostSchema>['params'];
export type UpdatePostInput = TypeOf<typeof updatePostSchema>;
export type DeletePostInput = TypeOf<typeof deletePostSchema>['params'];