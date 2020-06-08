import { getRepository }  from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import appError from '../error/appError';
import Users from '../models/Users';


interface Request {
  user_id: string;
  avatarFilename: string;

}

class UpdateUsersAvatarService {
  public async execute({ user_id, avatarFilename}:Request): Promise<Users>{
    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne(user_id);

    if(!user) {
      throw new appError ('Only Authentificated  user can charge avatar.', 401);

    }
    if(user.avatar) {
      const userAvatarFilePath = path.join(
        uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(
        userAvatarFilePath);

      if(userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }

    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;

  }


};

export default UpdateUsersAvatarService;
