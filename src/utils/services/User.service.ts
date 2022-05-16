import axios from 'axios';
import { pathRoutes } from 'utils/pathRoutes';
import { IUserResponse, IUser } from '../../interfaces';

export const UserService = {
  async getAll() {
    return axios.get<IUserResponse[]>(pathRoutes.user.getAll.absolute()).then((data) => data.data);
  },
  async getUserById(id: string) {
    return axios
      .get<IUserResponse>(pathRoutes.user.getOneById.absolute(id))
      .then((data) => data.data);
  },
  async updateUserById(id: string, user: IUser) {
    return axios
      .put<IUserResponse>(pathRoutes.user.getOneById.absolute(id), user)
      .then((data) => data.data);
  },
  async deleteUserById(id: string) {
    return axios.delete(pathRoutes.user.deleteOneById.absolute(id)).then((data) => data.data);
  },
};
