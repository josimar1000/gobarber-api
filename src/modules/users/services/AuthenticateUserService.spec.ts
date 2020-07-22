import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
// import AppError from '@shared/errors/AppError';
import CreateUserService from '@modules/users/services/CreateUsersService';

describe('AuthenticateUser', () => {
  it('Should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'John doe',
      email: 'johndoe@exemplo.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@exemplo.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });
});
