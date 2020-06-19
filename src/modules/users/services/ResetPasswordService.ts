import { inject, injectable } from 'tsyringe';
import { differenceInHours } from 'date-fns';
import appError from '@shared/error/appError';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';
import IHashProvider from '../provider/HashProvider/models/IHashProvider';


//import Users from '../infra/typeorm/entities/Users';


interface  IRequest {
token: string;
password: string;

}
@injectable()
class ResetPasswordService {
constructor(

  @inject('UsersRepository')
  private usersRepository: UsersRepository,

  @inject('UserTokenRepository')
  private userTokenRepository :  UserTokenRepository,

  @inject('HashProvider')
  private iHashProvider :  IHashProvider,


  ){}

public async execute({token, password}: IRequest ): Promise<void> {
  const userToken = await this.userTokenRepository.findByToken(token);

  if(!userToken){
  throw new appError ('User token does not exists');
  }
  const user = await this.usersRepository.findById(userToken.user_id);

  if(!user) {
    throw new appError ('User does not exists');
  }

  const creatTokenAt = userToken.created_at;

  if(differenceInHours(Date.now(), creatTokenAt)> 2) {
    throw new appError ('Token expired')
  }

  user.password = await this.iHashProvider.generateHash(password);

  await this.usersRepository.save(user);


}}
export default ResetPasswordService;
