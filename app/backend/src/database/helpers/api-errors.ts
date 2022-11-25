export default class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.status = status;
  }
}
