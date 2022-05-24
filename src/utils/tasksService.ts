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
  return {
    boardId,
    columnId,
    body: {
      title,
      description,
      userId: localStorage.getItem('userId') || '',
    },
  };
};
