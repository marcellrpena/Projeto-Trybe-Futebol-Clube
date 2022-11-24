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

export { IReturnMessage, IReturnToken };
