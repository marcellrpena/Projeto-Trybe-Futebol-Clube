interface ILogin {
  email: string,
  password: string,
}

interface ILoginService {
  login(login: ILogin): Promise<string>,
}

export { ILogin, ILoginService };
