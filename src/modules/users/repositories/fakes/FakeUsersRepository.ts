import { uuid } from 'uuidv4';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDto from '@modules/users/dtos/ICreateUsersDto';
import Users from '@modules/users/infra/typeorm/entities/Users';


class FakeUsersRepository implements IUsersRepository {
private users: Users[] = [];

  public async findById(id: string) : Promise<Users | undefined >{
  const findUsers = this.users.find(user=> user.id === id);

    return findUsers;
  }
  public async findByEmail(email: string) : Promise<Users | undefined >{
    const findUsers = this.users.find(user=> user.email=== email);

      return findUsers;
    }


   public async create(userData: ICreateUsersDto): Promise<Users>{
    const user = new Users();

    Object.assign(user, {id: uuid()}, userData);

    this.users.push(user);

    return user;
   }

   public async save(user: Users): Promise<Users>{
     const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

     this.users[findIndex] = user;


     return user;

   }
}
export default FakeUsersRepository;
