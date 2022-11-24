import { IUser } from '../interfaces';
import IReturnMessage from '../interfaces/IReturn';
import User from '../models/UserModel';
import { newToken } from '../utils/jwtUtil';

class LoginService {
  static async login(login: IUser): Promise<IReturnMessage> {
    const user = await LoginService.findOne(login);
    const { message } = newToken(user);
    return { status: 200, message };
  }

  private static async findOne(login: IUser): Promise<IUser> {
    const { email, password } = login;
    const user = await User.findOne({ where: { email, password } });
    if (!user) throw new Error('Usuário não existe');
    return user;
  }
}

export default LoginService;
