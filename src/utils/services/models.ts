export interface IUser {
  name: string;
  login: string;
  password: string;
}
export interface IUserResponse {
  id: string;
  login: string;
  name: string;
}

export interface IUserSignIn {
  login: string;
  password: string;
}
export interface ISignInResponse {
  token: string;
}

export interface IBoard {
  columns: IColumn[];
  id: string;
  title: string;
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: [];
}
export interface IResponseNewColumn {
  id: string;
  title: string;
  order: number;
}
export interface ITask {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  id: string;
}
export interface INewTask {
  title: string;
  order: number;
  description: string;
  userId: string;
}

export interface INewColumn {
  title: string;
  order: number;
}
