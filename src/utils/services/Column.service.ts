import axios from 'axios';
import { pathRoutes } from 'utils/pathRoutes';
import { IColumn, INewColumn, IResponseNewColumn } from '../../interfaces';

export const ColumnService = {
  async getAll(boardId: string) {
    return axios
      .get<IColumn[]>(pathRoutes.column.getAll.absolute(boardId))
      .then((data) => data.data);
  },
  async getOneById(boardId: string, columnId: string) {
    console.log(boardId, columnId);

    return axios
      .get<IColumn>(pathRoutes.column.getOneById.absolute(boardId, columnId))
      .then((data) => data.data);
  },
  async create(boardId: string, { title, order }: INewColumn) {
    return axios
      .post<IResponseNewColumn>(pathRoutes.column.create.absolute(boardId), {
        title,
        order,
      })
      .then((data) => data.data);
  },
  async updateOneById(boardId: string, columnId: string, column: IColumn) {
    return axios
      .put<IColumn>(pathRoutes.column.getOneById.absolute(boardId, columnId), column)
      .then((data) => data.data);
  },
  async deleteOneById(boardId: string, columnId: string) {
    return axios
      .delete(pathRoutes.column.deleteOneById.absolute(boardId, columnId))
      .then((data) => data.data);
  },
};
