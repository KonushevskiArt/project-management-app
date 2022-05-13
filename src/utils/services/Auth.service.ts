import axios from 'axios';
import { pathAPIRoutes } from '../pathAPIRoutes';
import { IUser, IUserResponse, IUserSignIn, ISignInResponse } from './models';

// axios.defaults.baseURL = pathAPIRoutes.root;

export const AuthService = {
  async signUp(user: IUser) {
    return axios.post<IUserResponse>(pathAPIRoutes.auth.signup.absolute(), user);
  },
  async signIn(user: IUserSignIn) {
    return axios.post<ISignInResponse>(pathAPIRoutes.auth.signin.absolute(), user);
  },
};
