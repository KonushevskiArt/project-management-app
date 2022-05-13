import axios from 'axios';
import { pathAPIRoutes } from 'utils/pathAPIRoutes';
import { INewTask, ITask } from './models';

const headersWithToken = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

export const TaskService = {
  async getAll(boardId: string, columnId: string) {
    return axios.get<ITask[]>(pathAPIRoutes.task.getAll.absolute(boardId, columnId), {
      headers: headersWithToken,
    });
  },
  async getTaskById(boardId: string, columnId: string, taskId: string) {
    return axios.get<ITask>(pathAPIRoutes.task.getOneById.absolute(boardId, columnId, taskId), {
      headers: headersWithToken,
    });
  },
  async createTask(boardId: string, coumntId: string, newTask: INewTask) {
    return axios.post<ITask>(
      pathAPIRoutes.task.create.absolute(boardId),
      { boardId, coumntId, body: { ...newTask } },
      {
        headers: headersWithToken,
      }
    );
  },
  async updateTaskById(boardId: string, columnId: string, taskId: string, task: ITask) {
    return axios.put<ITask>(
      pathAPIRoutes.task.getOneById.absolute(boardId, columnId, taskId),
      task,
      {
        headers: headersWithToken,
      }
    );
  },
  async deleteTaskById(boardId: string, columnId: string, taskId: string) {
    return axios.delete(pathAPIRoutes.task.deleteOneById.absolute(boardId, columnId, taskId), {
      headers: headersWithToken,
    });
  },
};
