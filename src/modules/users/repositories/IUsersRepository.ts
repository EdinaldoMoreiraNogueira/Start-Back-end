import Users from '../infra/typeorm/entities/Users';
import ICreateUsersDto from '../dtos/ICreateUsersDto';

export default interface IUsersRepository {
  findById(id: string): Promise< Users | undefined >;
  findByEmail(email: string): Promise< Users | undefined >;
  create(data: ICreateUsersDto): Promise<Users>;
  save(user: Users): Promise<Users>;
}
