import { column, allTasks, board } from 'data';
import { ITask, IBoard, IColumn } from 'interfaces';
import { v4 as uuid } from 'uuid';

interface ICreatTaskProps {
  boardId: string;
  columnId: string;
  body: {
    title: string;
    order: number;
    description: string;
    userId: string;
  };
}
interface IGetAllTasksProps {
  boardId: string;
  columnId: string;
}

interface IGetBoardByIdProps {
  boardId: string;
}

class MockApi {
  private tasks1: ITask[] = [...allTasks];
  private tasks2: ITask[] = allTasks.map((task) => ({ ...task, columnId: 'svsb' }));
  private columns: IColumn[] = [
    { ...column, tasks: this.tasks1 },
    { ...column, tasks: this.tasks2, id: 'svsb' },
  ];
  private boards: IBoard[] = [{ ...board, columns: this.columns }];

  private getNewTask = ({
    title,
    order,
    description,
    boardId,
    columnId,
  }: {
    title: string;
    order: number;
    description: string;
    boardId: string;
    columnId: string;
  }) => ({
    id: uuid(),
    title,
    order,
    description,
    userId: '',
    boardId,
    columnId,
  });

  getAllTasks = ({ boardId, columnId }: IGetAllTasksProps): Promise<ITask[]> => {
    const board = this.boards.find(({ id }) => id === boardId);
    const column = board && board.columns.find(({ id }) => id === columnId);
    const tasks = column && column.tasks;
    return new Promise((resolve, reject) => {
      if (tasks) setTimeout(() => resolve(tasks), 1000);
      setTimeout(() => reject(new Error('Whoops!')), 1000);
    });
  };

  creatTask = ({
    boardId,
    columnId,
    body: { title, order, description, userId },
  }: ICreatTaskProps): Promise<ITask> => {
    const newTask = this.getNewTask({ title, order, description, boardId, columnId });
    const board = this.boards.find(({ id }) => id === boardId);

    const column = board && board.columns.find(({ id }) => id === columnId);

    const tasks = column && column.tasks;

    tasks && tasks.push(newTask);

    return new Promise((resolve, reject) => {
      if (tasks) setTimeout(() => resolve(newTask), 1000);
      setTimeout(() => reject(new Error('Whoops!')), 1000);
    });
  };

  getBoardById = ({ boardId }: IGetBoardByIdProps): Promise<IBoard> => {
    const board = this.boards.find(({ id }) => id === boardId);
    return new Promise((resolve, reject) => {
      if (board) setTimeout(() => resolve(board), 1000);
      setTimeout(() => reject(new Error('Whoops!')), 1000);
    });
  };

  getAllColumns = ({ boardId }: IGetBoardByIdProps): Promise<IColumn[]> => {
    const columns = this.boards.find(({ id }) => id === boardId)?.columns;

    return new Promise((resolve, reject) => {
      if (columns) setTimeout(() => resolve(columns), 1000);
      setTimeout(() => reject(new Error('Whoops!')), 1000);
    });
  };

  getColumnById = ({ boardId, columnId }: IGetAllTasksProps): Promise<IColumn> => {
    const board = this.boards.find(({ id }) => id === boardId);
    const column = board && board.columns.find(({ id }) => id === columnId);

    return new Promise((resolve, reject) => {
      if (column) setTimeout(() => resolve(column), 1000);
      setTimeout(() => reject(new Error('Whoops!')), 1000);
    });
  };
}

const mockApi = new MockApi();

export default mockApi;
