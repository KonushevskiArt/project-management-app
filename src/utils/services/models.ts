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
  title: string;
  id: string;
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: [];
}

export interface INewColumn {
  title: string;
  order: number;
}

const board = {
  title: 'Homework tasks',
  id: '6abc98a1-c08f-4fd9-9167-6d50f9ee76b9',
};
const column = {
  id: '04d3f143-abcb-4ac4-a587-48f194125639',
  title: 'Done',
  order: 1,
  tasks: [],
};

const task = {
  title: 'new task',
  order: 1,
  description: 'vsbdb svsb',
  userId: 'c0c2432c-5165-4f34-8eb1-7ce95f69f9d5',
  boardId: '6abc98a1-c08f-4fd9-9167-6d50f9ee76b9',
  columnId: '04d3f143-abcb-4ac4-a587-48f194125639',
  id: 'b7e6006b-0021-4d53-8c92-689c98b0e9fe',
};
