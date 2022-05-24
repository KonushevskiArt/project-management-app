export interface UserData {
  name: string;
  login: string;
  password: string;
}

export interface AxiosData {
  method: string;
  urlProp: string;
  data?: UserData;
}
