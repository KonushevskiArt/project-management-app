import axios from 'axios';
import { pathRoutes } from '../pathRoutes';
import { IUser, IUserResponse, IUserSignIn, ISignInResponse } from './models';

export const AuthService = {
  async signUp(user: IUser) {
    return axios.post<IUserResponse>(pathRoutes.auth.signup.absolute(), user);
  },
  async signIn(user: IUserSignIn) {
    return axios.post<ISignInResponse>(pathRoutes.auth.signin.absolute(), user);
  },
};
