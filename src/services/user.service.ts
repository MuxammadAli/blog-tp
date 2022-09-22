import config from 'config';
import { User } from '../entity/User';
import redisClient from '../utils/connectRedis';
import  { AppDataSource }  from '../data-source';
import { signJwt } from '../utils/jwt';



// connect to User Entitiy
const userRepository = AppDataSource.getRepository(User)

// create user 
export const createUser = async (input: Partial<User>) => {
    return await userRepository.save(userRepository.create(input));
}


// find usser by email
export const findUserByEmail = async ({ email }: {email: string}) => {
    return await userRepository.findOneBy({ email });
}


// find user by id
export const findUserById = async (userId: string) => {
    return await userRepository.findOneBy({ id: userId});
}



// find User
export const findUser = async (query: Object) => {
    return await userRepository.findOneBy(query)
}


// sign tokens
export const signTokens = async (user: User) => {
    redisClient.set(user.id, JSON.stringify(user), {
        EX: config.get<number>('redisCacheExpiresIn') * 60,
    });

    const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
        expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    });

    const refresh_token = signJwt({sub: user.id}, 'refreshTokenPrivateKey', {
        expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`
    });

    return { access_token, refresh_token};
}



