import AppError from '@shared/error/appError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUsersService from './AuthenticateUsersService';
import CreateUsersService from './CreateUsersService';
import FakeIHashProvider from '../provider/HashProvider/fakes/FakeIHashProvider';

describe('AuthenticateUsers', ()=>{
  it('should be able to authenticate', async ()=>{
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeIHashProvider = new FakeIHashProvider();

    const createUsers = new CreateUsersService(fakeUsersRepository, fakeIHashProvider);
    const authenticateUser = new AuthenticateUsersService(fakeUsersRepository, fakeIHashProvider);



    const user = await createUsers.execute({
      name: 'Joe Do',
      email: 'joedoe@exaple.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({

      email: 'joedoe@exaple.com',
      password: '123456',
    });


    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);


  });

  it('should not be able to authenticate with non existing user', async ()=>{
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeIHashProvider = new FakeIHashProvider();


    const authenticateUser = new AuthenticateUsersService(fakeUsersRepository, fakeIHashProvider);




    expect(authenticateUser.execute({

      email: 'joedoe@exaple.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);



  });

  it('should not be able to authenticate with wrong password', async ()=>{
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeIHashProvider = new FakeIHashProvider();

    const createUsers = new CreateUsersService(fakeUsersRepository, fakeIHashProvider);
    const authenticateUser = new AuthenticateUsersService(fakeUsersRepository, fakeIHashProvider);



    await createUsers.execute({
      name: 'Joe Do',
      email: 'joedoe@exaple.com',
      password: '123456',
    });


    expect(
      authenticateUser.execute({
      email: 'joedoe@exaple.com',
      password: 'wrong-password',
    }),).rejects.toBeInstanceOf(AppError);



  });


});
