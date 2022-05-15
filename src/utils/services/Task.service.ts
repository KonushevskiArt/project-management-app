import axios from 'axios';
import { pathRoutes } from 'utils/pathRoutes';
import { INewTask, ITask } from './models';

export const TaskService = {
  async getAll(boardId: string, columnId: string) {
    return axios.get<ITask[]>(pathRoutes.task.getAll.absolute(boardId, columnId));
  },
  async getTaskById(boardId: string, columnId: string, taskId: string) {
    return axios.get<ITask>(pathRoutes.task.getOneById.absolute(boardId, columnId, taskId));
  },
  async createTask(boardId: string, coumntId: string, newTask: INewTask) {
    return axios.post<ITask>(pathRoutes.task.create.absolute(boardId), {
      boardId,
      coumntId,
      body: { ...newTask },
    });
  },
  async updateTaskById(boardId: string, columnId: string, taskId: string, task: ITask) {
    return axios.put<ITask>(pathRoutes.task.getOneById.absolute(boardId, columnId, taskId), task);
  },
  async deleteTaskById(boardId: string, columnId: string, taskId: string) {
    return axios.delete(pathRoutes.task.deleteOneById.absolute(boardId, columnId, taskId));
  },
};
