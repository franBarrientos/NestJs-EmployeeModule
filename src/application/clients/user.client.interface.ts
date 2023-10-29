import { UserDTO } from "./dtos/user.dto";
import { UserAddDto } from "./dtos/userAdd.dto";

export interface UserClientInterface {
  findById(id: number): Promise<UserDTO>;

  createOne(user: UserAddDto): Promise<UserDTO>;
}
