import axios, { AxiosRequestConfig } from 'axios';
import { ICreatTask } from 'hooks/useCreatCardForm';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { INewTask, ITask, IUpdataTask } from '../../interfaces';

const F = () => {
  const token = Cookies.get('token') || null;

  console.log('ProtectedRoute');
  console.log(token);
  if (!token) {
    return false;
  }

  const setHeaders = (config: AxiosRequestConfig<unknown>) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };

    return config;
  };

  return axios.interceptors.request.use(setHeaders);
};

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
    try {
      const { data } = await axios.post<ITask>(pathRoutes.task.create.absolute(boardId, columnId), {
        ...body,
      });
      return data;
    } catch (error) {
      // console.log(error);
      throw Error('err');
    }
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
