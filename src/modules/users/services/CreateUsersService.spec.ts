import AppError from '@shared/error/appError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUsersService';
import FakeIHashProvider from '../provider/HashProvider/fakes/FakeIHashProvider';

describe('CreateUser', ()=>{
  it('should be able to create a new user', async ()=>{

    const fakeUsersRepository = new FakeUsersRepository();
    const fakeIHashProvider = new FakeIHashProvider();
    const createUsers = new CreateUsersService(fakeUsersRepository, fakeIHashProvider);

    const users = await createUsers.execute({
      name: 'Jooh Doe',
      email: 'joedoe@exaple.com',
      password: '123456',
    });

    expect(users).toHaveProperty('id');


  });

  it('should not be able to create a new user with same email from another', async ()=>{

    const fakeUsersRepository = new FakeUsersRepository();
    const fakeIHashProvider = new FakeIHashProvider();
    const createUsers = new CreateUsersService(fakeUsersRepository, fakeIHashProvider);

    await createUsers.execute({
      name: 'Jooh Doe',
      email: 'joedoe@exaple.com',
      password: '123456',
    });

    expect(createUsers.execute({
      name: 'Jooh Doe',
      email: 'joedoe@exaple.com',
      password: '123456',
    }),).rejects.toBeInstanceOf(AppError);


  });



});
