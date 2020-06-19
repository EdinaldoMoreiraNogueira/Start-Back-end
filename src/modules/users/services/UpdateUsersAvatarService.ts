import 'reflect-metadata'
import { inject, injectable } from 'tsyringe';


import appError from '@shared/error/appError';
import Users from '../infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';



interface IRequest {
  user_id: string;
  avatarFilename: string;

}
@injectable()
class UpdateUsersAvatarService {
  constructor(
  @inject ('UsersRepository')
    private UsersRepository: IUsersRepository,
    @inject ('StorageProvider')
    private storageProvider: IStorageProvider){}
  public async execute({ user_id, avatarFilename}:IRequest): Promise<Users>{

    const user = await this.UsersRepository.findById(user_id);

    if(!user) {
      throw new appError ('Only Authentificated  user can charge avatar.', 401);

    }
    if(user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);


      }

    const fileName = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = fileName;

    await this.UsersRepository.save(user);

    return user;

  }


};

export default UpdateUsersAvatarService;
