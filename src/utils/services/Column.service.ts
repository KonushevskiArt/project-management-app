import axios from 'axios';
import { pathRoutes } from 'utils/pathRoutes';
import { IColumn, INewColumn, IResponseNewColumn } from './models';

export const ColumnService = {
  async getAll(boardId: string) {
    return axios
      .get<IColumn[]>(pathRoutes.column.getAll.absolute(boardId))
      .then((data) => data.data);
  },
  async getColumnById(boardId: string, columnId: string) {
    return axios.get<IColumn>(pathRoutes.column.getOneById.absolute(boardId, columnId));
  },
  async createColumn(boardId: string, { title, order }: INewColumn) {
    return axios.post<IResponseNewColumn>(pathRoutes.column.create.absolute(boardId), {
      title,
      order,
    });
  },
  async updateColumnById(boardId: string, columnId: string, column: IColumn) {
    return axios.put<IColumn>(pathRoutes.column.getOneById.absolute(boardId, columnId), column);
  },
  async deleteColumnById(boardId: string, columnId: string) {
    return axios.delete(pathRoutes.column.deleteOneById.absolute(boardId, columnId));
  },
};
