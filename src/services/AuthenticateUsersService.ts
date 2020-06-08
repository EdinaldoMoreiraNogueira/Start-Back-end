import {getRepository} from 'typeorm';
import {compare} from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import appError from '../error/appError';


import Users from '../models/Users';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: Users;
  token: string
}
class AuthenticateUsersService {
 public async execute({email, password}: Request): Promise<Response>{
   const usersRepository = getRepository(Users);

   const user = await usersRepository.findOne({ where: {email}});

   if(!user) {
     throw new appError ('Incorrect email/password combination', 401);
   }

   const passwordMatched = await compare(password, user.password);
   if(!password) {
    throw new appError ('Incorrect email/password combination', 401);
   }

   const { secret, expiresIn} = authConfig.jwt

   const token = sign({}, secret, {
     subject: user.id,
     expiresIn,
   });


   return {
     user,
     token
   }

 }
}

export default AuthenticateUsersService;
