import axios from 'axios';
import { pathAPIRoutes } from 'utils/pathAPIRoutes';
import { IUserResponse, IUser } from './models';

const headersWithToken = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

export const UserService = {
  async getAll() {
    return axios.get<IUserResponse[]>(pathAPIRoutes.user.getAll.absolute(), {
      headers: headersWithToken,
    });
  },
  async getUserById(id: string) {
    return axios.get<IUserResponse>(pathAPIRoutes.user.getOneById.absolute(id), {
      headers: headersWithToken,
    });
  },
  async updateUserById(id: string, user: IUser) {
    return axios.put<IUserResponse>(pathAPIRoutes.user.getOneById.absolute(id), user, {
      headers: headersWithToken,
    });
  },
  async deleteUserById(id: string) {
    return axios.delete(pathAPIRoutes.user.deleteOneById.absolute(id), {
      headers: headersWithToken,
    });
  },
};
