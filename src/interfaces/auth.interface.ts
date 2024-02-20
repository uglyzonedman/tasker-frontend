export interface IAuthRegister {
  email: string;
  password: string;
  login: string;
}

export interface IAuthLogin {
  email: string;
  password: string;
}

export type IAuthState = {
  user:
    | {
        id: number;
        email: string;
      }
    | null
    | string;
  isLoading: boolean;
  error: any;
  register: (email: string, password: string, login: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
};
