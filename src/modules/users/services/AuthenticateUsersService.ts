import { sign } from 'jsonwebtoken';
import appError from '@shared/error/appError';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import Users from '../infra/typeorm/entities/Users';
import authConfig from '@config/auth';
import IHashProvider from '../provider/HashProvider/models/IHashProvider';

interface I2Request {
  email: string;
  password: string;

}
interface I2Response {
  user: Users;
  token: string
}
@injectable()
class AuthenticateUsersService {
constructor(
@inject('UsersRepository')
private UsersRepository: IUsersRepository,

@inject('HashProvider')
private hashProvider: IHashProvider,
){}
 public async execute({email, password}: I2Request): Promise<I2Response>{

   const user = await this.UsersRepository.findByEmail(email);

   if(!user) {
     throw new appError ('Incorrect email/password combination', 401);
   }

   const passwordMatched = await this.hashProvider.compareHash(password, user.password);
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
