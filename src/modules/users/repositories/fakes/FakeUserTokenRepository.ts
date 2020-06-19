import { uuid } from 'uuidv4';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';


class FakeUserTokenRepository implements IUserTokenRepository {
private usersToken: UserToken[] = [];

  public async generate(user_id: string) : Promise<UserToken>{
  const userToken = new UserToken();

  Object.assign(userToken, {
    id: uuid(),
    token: uuid(),
    user_id,
    created_at: new Date(),
    updated_at: new Date(),
  });

  this.usersToken.push(userToken)

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined>{
    const usersToken = this.usersToken.find(findToken => findToken.token === token);
  return usersToken;
  }

}
export default FakeUserTokenRepository;
