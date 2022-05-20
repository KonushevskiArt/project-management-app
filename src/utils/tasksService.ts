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
      userId: 'fc8ea0b3-e7e9-44d7-9e3f-ee23c95116e3',
    },
  };
};
