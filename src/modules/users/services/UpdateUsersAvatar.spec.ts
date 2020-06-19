import AppError from '@shared/error/appError'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStogageAvatar';
import UpdateUsersAvatar from './UpdateUsersAvatarService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('UpdateUserAvatar', ()=>{
  it('should be able to upload a new user', async ()=>{

    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUsersAvatar = new  UpdateUsersAvatar(
      fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({
      name: 'Jooh Doe',
      email: 'joedoe@exaple.com',
      password: '123456',
    });

    await updateUsersAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');


  });

  it('should not be able update avatar non exixting user', async ()=>{

    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUsersAvatar = new  UpdateUsersAvatar(
      fakeUsersRepository, fakeStorageProvider);



    expect(updateUsersAvatar.execute({
      user_id: 'non-exist user',
      avatarFilename: 'avatar.png',
    })).rejects.toBeInstanceOf(AppError);


  });
  it('should delete old avatar when updating new one', async ()=>{

    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUsersAvatar = new  UpdateUsersAvatar(
      fakeUsersRepository, fakeStorageProvider);

      const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Jooh Doe',
      email: 'joedoe@exaple.com',
      password: '123456',
    });

    await updateUsersAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.png',
    });
    await updateUsersAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.png');

    expect(user.avatar).toBe('avatar2.png');


  });





});
