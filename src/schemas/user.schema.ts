import { RoleType } from "../entity/User";
import { object, string, TypeOf, z} from 'zod';


// create user schema
export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is reqired',
        }),

        email: string({
            required_error: 'Email is required',
        }).email('Invalid email'),

        password: string({
            required_error: 'Password is required',
        }).min(5, 'Password must be more than 5 characters')
          .max(8, 'Password must be less than 32 characters'),
        
        passwordConfirm: string({
            required_error: 'Please confirm your password'
        }),

        role: z.optional(z.nativeEnum(RoleType)),
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Password do not match'
    }),
});



// login user schema
export const loginUserSchema = object({
    body: object({
        email: string({
            required_error: 'Email address is required',
        }).email('Invalid address email'),

        password: string({
            required_error: 'Password is required',
        }).min(5, 'Invalid email or password'),
    }),
});



