import * as bcrypt from 'bcryptjs';
// classe exclusiva criada para mandar o status code http no erro
import ApiError from '../helpers/api-errors';
// import errorMessages from '../helpers/errorMessage';
import codes from '../helpers/statusCode';
import { ILogin, IReturn, IUser } from '../interfaces';
import User from '../models/UserModel';
import { newToken } from '../utils/jwtUtil';

class LoginService {
  static async login(login: ILogin.ILogin): Promise<IReturn.IReturnToken> {
    const user = await LoginService.findOne(login);
    const { message } = newToken(user);
    return { status: 200, message: { token: message } };
  }

  static async validate(userInfo: IUser.IUser): Promise<IReturn.IReturnValidUser> {
    const role = await LoginService.findByPk(userInfo);
    return { status: codes.OK, message: { role } };
  }

  private static async findOne(login: IUser.IUser): Promise<IUser.IUser> {
    const { email, password = '' } = login;
    const user = await User.findOne({ where: { email } });
    LoginService.checkUser(user, password);
    return user?.dataValues;
  }

  private static async findByPk(userInfo: IUser.IUser): Promise<string> {
    const { email, id } = userInfo;
    const user = await User.findByPk(id);
    if (!user || user.dataValues.email !== email) {
      throw new ApiError('Token must be a valid token', codes.UNAUTHORIZED);
    }
    return user.dataValues.role;
  }

  private static checkUser(user: IUser.IUserData | null, password: string): void {
    if (!user) {
      throw new ApiError('Incorrect email or password', codes.UNAUTHORIZED);
    }
    const { password: hash = '' } = user.dataValues;
    const checkPassword = bcrypt.compareSync(password, hash);
    if (!checkPassword) throw new ApiError('Incorrect email or password', codes.UNAUTHORIZED);
  }
}

export default LoginService;

// LoginService.login({
//   email: 'admin@admin.com',
//   password: 'secret_admin',
// }).then((res) => console.log(res));
