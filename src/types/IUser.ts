export interface IUser {
  id: number;
  name: string;
  lastName: string;
  email: string;
  ci: string;
  phone: string;
  rol: string;
}

export interface IUserForm {
  name: string;
  lastName: string;
  email: string;
  password: string;
  ci: string;
  phone: string;
  confirmPassword: string;
  rol: string;
}