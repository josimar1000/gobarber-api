import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  name: string;

  email: string;

  password: string;
}
@injectable()
class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { } // eslint-disable-line

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUsersExists = await this.usersRepository.findByEmail(email);
    if (checkUsersExists) {
      throw new AppError('Email address alredy used');
    }
    const hashedPassword = await hash(password, 8);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUsersService;
