import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces';
// import IReturnMessage from '../interfaces/IReturn';

const secret = process.env.JWT_SECRET || 'jwt_secret';
function createToken(data: IUser.IUser) {
  const token = jwt.sign({ data }, secret, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
}

const validateToken = (token: string) => {
  try {
    const payload = jwt.verify(token, secret);
    // const { password: _, ...newData } = data;
    return { status: 200, message: payload };
  } catch (error) {
    const e = 'Token must be a valid token';
    return { status: null, message: e };
  }
};

const checkToken = (token: string | undefined) => {
  if (!token) {
    return { status: null, message: 'Token not found' };
  }
  const user = validateToken(token);

  return user;
};

const newToken = (user: IUser.IUser) => {
  const { password: _, ...userWithoutPassword } = user;
  const token = createToken(userWithoutPassword);
  return { status: null, message: token };
};

export { createToken, validateToken, checkToken, newToken };
