import { Request, Response } from 'express';
import { container} from 'tsyringe';
import AuthenticateUsersService from
 '@modules/users/services/AuthenticateUsersService';


export default class SessionsControllers {

 public async create(request: Request, response: Response): Promise<Response>
{
 const{ email, password} = request.body;


 const authenticateUsers = container.resolve(AuthenticateUsersService);

 const { user, token } = await authenticateUsers.execute({
   email,
   password,
 })

 delete user.password;


return response.json({user, token});



}

}
