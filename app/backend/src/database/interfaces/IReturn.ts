interface IReturnMessage {
  status: number,
  message: string,
}

interface IReturnToken {
  status: number,
  message: {
    token: string,
  },
}

interface IReturnValidUser {
  status: number,
  message: {
    role: string,
  }
}

interface IReturnTokenData {
  status: number | null,
  message?: string;
}

export { IReturnMessage, IReturnToken, IReturnValidUser, IReturnTokenData };
