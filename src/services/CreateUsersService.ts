import {getRepository} from 'typeorm';

import {hash} from 'bcryptjs';
import appError from '../error/appError';
import Users from '../models/Users';

interface  Request {
  name: string;
  email: string;
  password: string;
};

class CreateUsersService {
public async execute( { name, email, password }: Request
  ): Promise<Users> {

 const usersRepository = getRepository(Users);

 const checkUsersExixts = await usersRepository.findOne({
   where: {email},
 });

 if(checkUsersExixts) {
   throw new appError ('Email address already used')};

 const hashedPassword = await hash(password, 8 );

 const user = usersRepository.create({
   name,
   email,
   password: hashedPassword
 });

 await usersRepository.save(user);

 return user;
}

}

export default CreateUsersService;
