import { Request } from 'express';
import { User } from '../entity/User';
import { Post } from '../entity/Post';
import { AppDataSource }  from '../data-source';


// connect to post entity

const postRepository = AppDataSource.getRepository(Post);


// create post
export const createPost = async (input: Partial<Post>, user: User) => {
    return await postRepository.save(postRepository.create({...input, user}));
}


// get post
export const getPost = async (postId: string) => {
    return await postRepository.findOneBy({ id: postId});
}


// get all posts

export const findPosts = async (req: Request) => {
    const builder = postRepository.createQueryBuilder('post');

    if(req.query.search){
        builder.where('post.title LIKE :search QR post.content LIKE :search', {
            search: `%${req.query.search}%`,
        });
    }

    if(req.query.sort) {
        const sortQuery = req.query.sort === '-price' ? 'DESC' : 'ASC';
        builder.orderBy('post.title', sortQuery);
    }

    return await builder.getMany();
};

