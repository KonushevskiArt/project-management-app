import axios from 'axios';
import { pathAPIRoutes } from 'utils/pathAPIRoutes';
import { IColumn, INewColumn, IResponseNewColumn } from './models';

const headersWithToken = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

export const ColumnService = {
  async getAll(boardId: string) {
    return axios.get<IColumn[]>(pathAPIRoutes.column.getAll.absolute(boardId), {
      headers: headersWithToken,
    });
  },
  async getColumnById(boardId: string, columnId: string) {
    return axios.get<IColumn>(pathAPIRoutes.column.getOneById.absolute(boardId, columnId), {
      headers: headersWithToken,
    });
  },
  async createColumn(boardId: string, { title, order }: INewColumn) {
    return axios.post<IResponseNewColumn>(
      pathAPIRoutes.column.create.absolute(boardId),
      { title, order },
      {
        headers: headersWithToken,
      }
    );
  },
  async updateColumnById(boardId: string, columnId: string, column: IColumn) {
    return axios.put<IColumn>(pathAPIRoutes.column.getOneById.absolute(boardId, columnId), column, {
      headers: headersWithToken,
    });
  },
  async deleteColumnById(boardId: string, columnId: string) {
    return axios.delete(pathAPIRoutes.column.deleteOneById.absolute(boardId, columnId), {
      headers: headersWithToken,
    });
  },
};
