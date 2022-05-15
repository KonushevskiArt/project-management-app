export interface IGetBoardById {
  boardId: string;
}
export interface IGetColumnById extends IGetBoardById {
  columnId: string;
}

export interface ICreatTask extends IGetColumnById {
  body: {
    title: string;
    order: number;
    description: string;
    userId: string;
  };
}
export interface IGetTaskById extends IGetColumnById {
  taskId: string;
}
