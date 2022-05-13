import axios from 'axios';
import { pathRoutes } from 'utils/pathRoutes';
import { INewTask, ITask } from './models';

const headersWithToken = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

export const TaskService = {
  async getAll(boardId: string, columnId: string) {
    return axios.get<ITask[]>(pathRoutes.task.getAll.absolute(boardId, columnId), {
      headers: headersWithToken,
    });
  },
  async getTaskById(boardId: string, columnId: string, taskId: string) {
    return axios.get<ITask>(pathRoutes.task.getOneById.absolute(boardId, columnId, taskId), {
      headers: headersWithToken,
    });
  },
  async createTask(boardId: string, coumntId: string, newTask: INewTask) {
    return axios.post<ITask>(
      pathRoutes.task.create.absolute(boardId),
      { boardId, coumntId, body: { ...newTask } },
      {
        headers: headersWithToken,
      }
    );
  },
  async updateTaskById(boardId: string, columnId: string, taskId: string, task: ITask) {
    return axios.put<ITask>(
      pathRoutes.task.getOneById.absolute(boardId, columnId, taskId),
      task,
      {
        headers: headersWithToken,
      }
    );
  },
  async deleteTaskById(boardId: string, columnId: string, taskId: string) {
    return axios.delete(pathRoutes.task.deleteOneById.absolute(boardId, columnId, taskId), {
      headers: headersWithToken,
    });
  },
};
