import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import appError from '@shared/error/appError';
import Users from '../infra/typeorm/entities/Users';
import IHashProvider from '../provider/HashProvider/models/IHashProvider';


interface  Request {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUsersService {
constructor(
  @inject('UsersRepository')
  private UsersRepository: IUsersRepository,

  @inject('HashProvider')
  private hashProvider: IHashProvider,

  ){}



public async execute( { name, email, password }: Request
  ): Promise<Users> {


 const checkUsersExixts = await this.UsersRepository.findByEmail(email);

 if(checkUsersExixts) {
   throw new appError ('Email address already used')};

 const hashedPassword = await this.hashProvider.generateHash(password);

 const user = await this.UsersRepository.create({
   name,
   email,
   password: hashedPassword
 });

 return user;
}

}

export default CreateUsersService;
