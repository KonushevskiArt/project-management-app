import axios from 'axios';
import { pathRoutes } from 'utils/pathRoutes';
import { IBoard } from './models';

export const BoardService = {
  async getAll() {
    return axios.get<IBoard[]>(pathRoutes.board.getAll.absolute());
  },
  async getBoardById(id: string) {
    return axios.get<IBoard>(pathRoutes.board.getOneById.absolute(id));
  },
  async createBoard(title: string) {
    return axios.post<IBoard>(pathRoutes.board.create.absolute(), { title });
  },
  async updateBoardById(id: string, board: IBoard) {
    return axios.put<IBoard>(pathRoutes.board.getOneById.absolute(id), board);
  },
  async deleteBoardById(id: string) {
    return axios.delete(pathRoutes.board.deleteOneById.absolute(id));
  },
};
