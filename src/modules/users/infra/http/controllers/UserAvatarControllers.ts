import { Request, Response } from 'express';
import { container} from 'tsyringe';
import UpdateUsersAvatarService from '@modules/users/services/UpdateUsersAvatarService';

import AuthenticateUsersService from
 '@modules/users/services/AuthenticateUsersService';

 export default class UserAvatarControllers
  {public async update(request: Request, response: Response): Promise<Response>
{
  const uploadUserAvatar = container.resolve(UpdateUsersAvatarService);

  const user = await uploadUserAvatar.execute({
  user_id: request.user.id,
  avatarFilename: request.file.filename,
  });




return response.json(user);






}}
