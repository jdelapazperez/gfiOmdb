export class LoginModel {
  constructor(
    public response: string,
    public email: string,
    public pass: string,
    public token: string
  ) {}
}
