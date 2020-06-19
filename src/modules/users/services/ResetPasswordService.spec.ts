import AppError from '@shared/error/appError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeIHashProvider from '../provider/HashProvider/fakes/FakeIHashProvider';


let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPasswordService: ResetPasswordService;
let fakeIHashProvider: FakeIHashProvider;


describe('ResetPasswordService', ()=>{
  beforeEach(()=> {
 fakeUsersRepository = new FakeUsersRepository();
 fakeUserTokenRepository = new FakeUserTokenRepository();
 fakeIHashProvider = new FakeIHashProvider();
 resetPasswordService = new  ResetPasswordService(fakeUsersRepository,
 fakeUserTokenRepository, fakeIHashProvider);

  })
  it('should be able to reset the password', async ()=>{

   const user = await fakeUsersRepository.create({
    name: 'joao',
    email: 'joo@expample.com',
    password: '123456',
    });

   const { token } = await fakeUserTokenRepository.generate(user.id);

   const generateHash = jest.spyOn(fakeIHashProvider, 'generateHash');

    await resetPasswordService.execute({
    password: '123123',
    token,

    });

    const updateUser = await fakeUsersRepository.findById(user.id)

    expect(updateUser?.password).toBe('123123');
    expect(generateHash).toHaveBeenCalledWith('123123');


  });

  it('should not be able to reset password with non-existing token ', async()=> {

    await expect(
    resetPasswordService.execute({
      token: 'non-existing-token',
      password: '123456',

    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to reset password with non-existing user ', async()=> {

  const { token } = await fakeUserTokenRepository.generate('non-exixting-user');
    await expect(
    resetPasswordService.execute({
      token,
      password: '123456',

    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to reset password if passed more than 2 hours', async ()=>{

    const user = await fakeUsersRepository.create({
     name: 'joao',
     email: 'joo@expample.com',
     password: '123456',
     });

     const { token } = await fakeUserTokenRepository.generate(user.id);

     jest.spyOn(Date, 'now').mockImplementationOnce(()=> {
       const custanDate = new Date;

       return custanDate.setHours(custanDate.getHours() + 3);
     });


     await expect( resetPasswordService.execute({
     password: '123123',
     token,
     })).rejects.toBeInstanceOf(AppError);



   });



});

