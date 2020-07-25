import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUsersService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@exemplo.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user with same email from another', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@exemplo.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'johndoe@exemplo.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
