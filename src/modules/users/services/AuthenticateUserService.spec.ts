import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUsersService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUserService: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to authenticate', async () => {
    const user = await createUserService.execute({
      name: 'John doe',
      email: 'johndoe@exemplo.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@exemplo.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Should be able to authenticate with no existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@exemplo.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    await createUserService.execute({
      name: 'John doe',
      email: 'johndoe@exemplo.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@exemplo.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
