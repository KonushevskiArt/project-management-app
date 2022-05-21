import { ITask } from 'interfaces';
import { TaskService } from './services/Task.service';

const getLastOrder = (items: ITask[] | []): number => {
  if (!items.length) return 0;

  const [{ order: lastOrder }] = items.sort((a, b) => b.order - a.order);
  return lastOrder;
};

export const getNewTaskBody = async ({
  boardId,
  columnId,
  title,
  description = '_',
}: {
  boardId: string;
  columnId: string;
  title: string;
  description?: string;
}) => {
  const tasks: ITask[] = await TaskService.getAll(boardId, columnId);
  return {
    boardId,
    columnId,
    body: {
      title,
      description,
      order: getLastOrder(tasks) + 1,
      userId: '459afce1-7552-4e06-8e49-c34a54bae33f',
    },
  };
};
