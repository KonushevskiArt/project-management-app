import { allTasks } from 'data';
import { ITask } from 'interfaces';
import { v4 as uuid } from 'uuid';

class MockApi {
  private tasks: ITask[] = [...allTasks];

  private getNewTask = ({
    title,
    order,
    description,
  }: {
    title: string;
    order: number;
    description: string;
  }) => ({
    id: uuid(),
    title,
    order,
    description,
    userId: '',
    boardId: '',
    columnId: '',
  });

  getAllTasks = (): Promise<ITask[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.tasks), 1000);
      //  setTimeout(() => reject(new Error('Whoops!')), 1000);
    });
  };

  creatTask = ({
    title,
    order,
    description,
  }: {
    title: string;
    order: number;
    description: string;
  }): Promise<ITask> => {
    const newTask = this.getNewTask({ title, order, description });
    this.tasks = [...this.tasks, newTask];
    console.log(this.tasks);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(newTask), 1000);
      //  setTimeout(() => reject(new Error('Whoops!')), 1000);
    });
  };
}

const mockApi = new MockApi();

export default mockApi;
