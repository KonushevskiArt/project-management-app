import axios from 'axios';
import { pathAPIRoutes } from 'utils/pathAPIRoutes';
import { IBoard } from './models';

const headersWithToken = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

export const BoardService = {
  async getAll() {
    return axios.get<IBoard[]>(pathAPIRoutes.board.getAll.absolute(), {
      headers: headersWithToken,
    });
  },
  async getBoardById(id: string) {
    return axios.get<IBoard>(pathAPIRoutes.board.getOneById.absolute(id), {
      headers: headersWithToken,
    });
  },
  async createBoard(title: string) {
    return axios.post<IBoard>(
      pathAPIRoutes.board.create.absolute(),
      { title },
      {
        headers: headersWithToken,
      }
    );
  },
  async updateBoardById(id: string, board: IBoard) {
    return axios.put<IBoard>(pathAPIRoutes.board.getOneById.absolute(id), board, {
      headers: headersWithToken,
    });
  },
  async deleteBoardById(id: string) {
    return axios.delete(pathAPIRoutes.board.deleteOneById.absolute(id), {
      headers: headersWithToken,
    });
  },
};
