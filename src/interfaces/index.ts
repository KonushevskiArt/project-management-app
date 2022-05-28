export interface IUser {
  name: string;
  login: string;
  password: string;
}
export interface IUpdateTask {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface IUpdateColumn {
  title: string;
  order: number;
}

export interface IUserResponse {
  id: string;
  login: string;
  name: string;
}

export interface IUserUpdate {
  name: string;
  login: string;
  password: string;
}

export interface IUserSignIn {
  login: string;
  password: string;
}

export interface ISignInResponse {
  token: string;
}

export interface IFiles {
  filename: string;
  fileSize: number;
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files?: IFiles[] | [];
}

export interface IStatePreviousTask {
  columnId: string;
  order: number;
  title: string;
  description: string;
  taskId: string;
}

export interface IBoard {
  columns?: IColumn[] | [];
  id: string;
  title: string;
  description: string;
}

export interface INewBoard {
  title: string;
  description: string;
}

export interface IUpdatedBoardParams {
  description: string;
  title: string;
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks?: [] | ITask[];
}

export interface IResponseNewColumn {
  id: string;
  title: string;
  order: number;
}

export interface INewTask {
  title: string;
  order: number;
  description: string;
  userId: string;
}

export interface ICreateTask {
  boardId: string;
  columnId: string;
  body: INewTask;
}

export interface INewColumn {
  title: string;
}

interface ILANG {
  [key: string]: string;
}

export interface ITEXT {
  [key: string]: ILANG;
}
export interface IDragItemParams {
  columnIdx: number;
  taskIdx: number;
}

export enum DragItem {
  task = 'task',
  column = 'column',
}
