import axios from 'axios';
import { pathRoutes } from 'utils/pathRoutes';
import { IColumn, INewColumn, IResponseNewColumn, IUpdatedColumn } from '../../interfaces';

export const ColumnService = {
  async getAll(boardId: string) {
    return axios
      .get<IColumn[]>(pathRoutes.column.getAll.absolute(boardId))
      .then((data) => data.data);
  },
  async getOneById(boardId: string, columnId: string) {
    return axios
      .get<IColumn>(pathRoutes.column.getOneById.absolute(boardId, columnId))
      .then((data) => data.data);
  },
  async create(boardId: string, params: INewColumn) {
    return axios
      .post<IResponseNewColumn>(pathRoutes.column.create.absolute(boardId), params)
      .then((data) => data.data);
  },
  async updateOneById(boardId: string, columnId: string, column: IUpdatedColumn) {
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
