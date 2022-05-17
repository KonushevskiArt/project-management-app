import axios from 'axios';
import { pathRoutes } from 'utils/pathRoutes';
import { INewTask, ITask } from '../../interfaces';

export const TaskService = {
  async getAll(boardId: string, columnId: string) {
    return axios
      .get<ITask[]>(pathRoutes.task.getAll.absolute(boardId, columnId))
      .then((data) => data.data);
  },
  async getOneById(boardId: string, columnId: string, taskId: string) {
    return axios
      .get<ITask>(pathRoutes.task.getOneById.absolute(boardId, columnId, taskId))
      .then((data) => data.data);
  },
  async create(boardId: string, coumntId: string, newTask: INewTask) {
    return axios
      .post<ITask>(pathRoutes.task.create.absolute(boardId, coumntId), { ...newTask })
      .then((data) => data.data);
  },
  async updateOneById(boardId: string, columnId: string, taskId: string, task: ITask) {
    return axios
      .put<ITask>(pathRoutes.task.getOneById.absolute(boardId, columnId, taskId), task)
      .then((data) => data.data);
  },
  async deleteOneById(boardId: string, columnId: string, taskId: string) {
    return axios
      .delete(pathRoutes.task.deleteOneById.absolute(boardId, columnId, taskId))
      .then((data) => data.data);
  },
};
