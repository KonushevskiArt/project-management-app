import axios from 'axios';
import { pathRoutes } from 'utils/pathRoutes';
import { IBoard, IColumn } from '../../interfaces';

export const BoardService = {
  async getAll() {
    return axios.get<IBoard[]>(pathRoutes.board.getAll.absolute()).then((data) => data.data);
  },
  async getOneById(id: string) {
    return axios.get<IBoard>(pathRoutes.board.getOneById.absolute(id)).then((data) => data.data);
  },
  async create(title: string) {
    return axios
      .post<IBoard>(pathRoutes.board.create.absolute(), { title })
      .then((data) => data.data);
  },
  async updateTitleOneById(id: string, title: string) {
    return axios
      .put<IBoard>(pathRoutes.board.getOneById.absolute(id), { title })
      .then((data) => data.data);
  },
  async updateColumnsOneById(id: string, columns: IColumn[]) {
    return axios
      .put<IBoard>(pathRoutes.board.getOneById.absolute(id), { columns: columns })
      .then((data) => data.data);
  },
  async deleteOneById(id: string) {
    return axios.delete(pathRoutes.board.deleteOneById.absolute(id)).then((data) => data.data);
  },
};
