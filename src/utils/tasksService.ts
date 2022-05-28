import { UserService } from './services/User.service';

const getUserId = async (): Promise<string> => {
  const [{ id }] = await UserService.getAll();
  return id;
};

export const getNewTaskBody = async ({
  boardId,
  columnId,
  title,
  description = ' ',
}: {
  boardId: string;
  columnId: string;
  title: string;
  description?: string;
}) => {
  const userId = await getUserId();
  return {
    boardId,
    columnId,
    body: {
      title,
      description,
      userId,
    },
  };
};
