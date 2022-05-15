import axios from 'axios';
import { pathRoutes } from 'utils/pathRoutes';
import { IUserResponse, IUser } from './models';

export const UserService = {
  async getAll() {
    return axios.get<IUserResponse[]>(pathRoutes.user.getAll.absolute());
  },
  async getUserById(id: string) {
    return axios.get<IUserResponse>(pathRoutes.user.getOneById.absolute(id));
  },
  async updateUserById(id: string, user: IUser) {
    return axios.put<IUserResponse>(pathRoutes.user.getOneById.absolute(id), user);
  },
  async deleteUserById(id: string) {
    return axios.delete(pathRoutes.user.deleteOneById.absolute(id));
  },
};
