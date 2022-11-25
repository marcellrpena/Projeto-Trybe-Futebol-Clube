// import * as bcrypt from 'bcryptjs';
import { ILogin, IReturn, IUser } from '../interfaces';
import User from '../models/UserModel';
import { newToken } from '../utils/jwtUtil';

class LoginService {
  static async login(login: ILogin.ILogin): Promise<IReturn.IReturnToken> {
    const user = await LoginService.findOne(login);
    const { message } = newToken(user);
    return { status: 200, message: { token: message } };
  }

  private static async findOne(login: ILogin.ILogin): Promise<IUser> {
    const { email } = login;
    const user = (await User.findOne({ where: { email } }))?.dataValues;
    // const { password: hash } = user.dataValues;
    // const checkPassword = bcrypt.compareSync(password, hash);
    // if (!checkPassword) throw new Error('senha invalida');
    return user;
  }
}

export default LoginService;

// LoginService.login({
//   email: 'admin@admin.com',
//   password: 'secret_admin',
// }).then((res) => console.log(res));
