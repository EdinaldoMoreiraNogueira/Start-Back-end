import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordEmailService from
 '@modules/users/services/SendForgotPasswordEmailService';


export default class ForgotPasswordControllers {
  public async create(request: Request, response: Response): Promise<Response>
{
 const { email } = request.body;


 const sendForgotEmail = container.resolve(SendForgotPasswordEmailService);

 await sendForgotEmail.execute({
   email,

 })



return response.status(204).json();



}

}
