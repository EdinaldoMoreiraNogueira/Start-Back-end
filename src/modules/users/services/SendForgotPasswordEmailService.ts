import { inject, injectable } from 'tsyringe';
import appError from '@shared/error/appError';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';
import IMailProvider from '@shared/container/providers/mailProvider/models/IMailProvider';


//import Users from '../infra/typeorm/entities/Users';


interface  IRequest {
 email: string;

}
@injectable()
class SendForgotPasswordEmailService {
constructor(

  @inject('UsersRepository')
  private usersRepository: UsersRepository,

  @inject('MailProvider')
  private mailProvider:  IMailProvider,

  @inject('UserTokenRepository')
  private userTokenRepository :  UserTokenRepository,

  ){}

public async execute({ email }: IRequest ): Promise<void> {

  const user = await this.usersRepository.findByEmail(email);

  if(!user) {
    throw new appError( 'User does not exists');
  }

  await this.userTokenRepository.generate(user.id)

  await this.mailProvider.sendMail(email, 'Pedido de recuperação de email recebido');

}}

export default SendForgotPasswordEmailService;
