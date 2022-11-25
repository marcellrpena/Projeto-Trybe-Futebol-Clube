interface IUser {
  id?: number;
  email: string;
  password?: string;
  username?: string;
  role?: string;
}

interface IUserData {
  dataValues: IUser;
}

export { IUser, IUserData };
