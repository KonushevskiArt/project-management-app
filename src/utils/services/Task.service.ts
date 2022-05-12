import axios from 'axios';
import { pathRoutes } from 'utils/pathRoutes';
import { IColumn, INewColumn } from './models';

const headersWithToken = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};
// here change all methods
export const TaskService = {
  async getAll(boardId: string) {
    return axios.get<IColumn[]>(pathRoutes.column.getAll.absolute(boardId), {
      headers: headersWithToken,
    });
  },
  async getColumnById(boardId: string, columnId: string) {
    return axios.get<IColumn>(pathRoutes.column.getOneById.absolute(boardId, columnId), {
      headers: headersWithToken,
    });
  },
  async createColumn(boardId: string, newColumn: INewColumn) {
    return axios.post<IColumn>(
      pathRoutes.column.create.absolute(boardId),
      { boardId, newColumn },
      {
        headers: headersWithToken,
      }
    );
  },
  async updateColumnById(boardId: string, columnId: string, column: IColumn) {
    return axios.put<IColumn>(pathRoutes.column.getOneById.absolute(boardId, columnId), column, {
      headers: headersWithToken,
    });
  },
  async deleteColumnById(boardId: string, columnId: string) {
    return axios.delete(pathRoutes.column.deleteOneById.absolute(boardId, columnId), {
      headers: headersWithToken,
    });
  },
};
