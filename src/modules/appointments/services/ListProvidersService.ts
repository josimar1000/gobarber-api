import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}
@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { } // eslint-disable-line

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const user = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    return user;
  }
}
export default ListProvidersService;
