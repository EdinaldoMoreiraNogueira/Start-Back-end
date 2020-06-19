import AppError from '@shared/error/appError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeEmailProvider from '@shared/container/providers/mailProvider/fakes/FakeEmailProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeEmailProvider: FakeEmailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;


describe('SendForgotPasswordEmailService', ()=>{
  beforeEach(()=> {
 fakeUsersRepository = new FakeUsersRepository();
 fakeUserTokenRepository = new FakeUserTokenRepository();
 fakeEmailProvider = new FakeEmailProvider();
 sendForgotPasswordEmailService = new
 SendForgotPasswordEmailService(fakeUsersRepository,
 fakeEmailProvider, fakeUserTokenRepository);

  })
  it('should be able to recover the passwor using the email', async ()=>{


    const sendMail = jest.spyOn(fakeEmailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'joao',
      email: 'joo@expample.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
    email:'joo@expample.com',

    });

    expect(sendMail).toHaveBeenCalled();

  });

 it('should not be able to recover a non-existing user password', async ()=>{

  jest.spyOn(fakeEmailProvider, 'sendMail');

  await expect(sendForgotPasswordEmailService.execute({
  email:'joo@expample.com',
  })).rejects.toBeInstanceOf(AppError);

 });

 it('should generate forgot password token', async ()=> {
  const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

  const user = await fakeUsersRepository.create({
    name: 'joao',
    email: 'joo@expample.com',
    password: '123456',
  });

  await sendForgotPasswordEmailService.execute({
  email:'joo@expample.com',

  });

  expect(generateToken).toHaveBeenCalledWith(user.id);

 });

 });
