import axios from 'axios';
import { pathRoutes } from '../pathRoutes';
import { IUser, IUserResponse, IUserSignIn, ISignInResponse } from '../../interfaces';

export const AuthService = {
  async signUp(user: IUser) {
    return axios
      .post<IUserResponse>(pathRoutes.auth.signup.absolute(), user)
      .then((data) => data.data);
  },
  async signIn(user: IUserSignIn) {
    return axios
      .post<ISignInResponse>(pathRoutes.auth.signin.absolute(), user)
      .then((data) => data.data);
  },
};
