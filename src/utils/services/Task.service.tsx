import axios, { AxiosRequestConfig } from 'axios';
import { ICreatTask } from 'hooks/useCreatCardForm';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { INewTask, ITask, IUpdataTask } from '../../interfaces';

export const TaskService = {
  getAll(boardId: string, columnId: string) {
    return axios
      .get<ITask[]>(pathRoutes.task.getAll.absolute(boardId, columnId))
      .then((data) => data.data);
  },
  async getOneById(boardId: string, columnId: string, taskId: string) {
    return axios
      .get<ITask>(pathRoutes.task.getOneById.absolute(boardId, columnId, taskId))
      .then((data) => data.data);
  },
  async create({ boardId, columnId, body }: ICreatTask) {
    const { data } = await axios.post<ITask>(pathRoutes.task.create.absolute(boardId, columnId), {
      ...body,
    });
    return data;
  },
  async updateOneById(taskId: string, props: IUpdataTask) {
    console.log(pathRoutes.task.getOneById.absolute(props.boardId, props.columnId, taskId));
    console.log(props);
    const { data } = await axios.put<ITask>(
      pathRoutes.task.getOneById.absolute(props.boardId, props.columnId, taskId),
      {
        ...props,
      }
    );
    console.log(data);
    return data;
  },
  async deleteOneById(boardId: string, columnId: string, taskId: string) {
    return axios
      .delete(pathRoutes.task.deleteOneById.absolute(boardId, columnId, taskId))
      .then((data) => data.data);
  },
};
