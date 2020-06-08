import {Router} from 'express';

import AuthenticateUsersService from
 '../services/AuthenticateUsersService';


const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {


    const{ email, password} = request.body;

    const authenticateUsers = new AuthenticateUsersService();

    const { user, token } = await authenticateUsers.execute({
      email,
      password,
    })

    delete user.password;


  return response.json({user, token});



});

export default sessionsRouter;
