import { allTasks } from 'data';
import { pathRoutes } from 'utils/pathRoutes';

export const BASE_URL = 'https://pure-cove-88107.herokuapp.com';
enum URLS {
  words = 'words',
  users = 'users',
  signin = 'signin',
}

const signinBody = {
  login: 'user001',
  password: 'userpass@123',
};
const signupBody = {
  name: 'Vasya',
  login: 'user001',
  password: 'userpass@123',
};

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

const user = {
  id: 'c0c2432c-5165-4f34-8eb1-7ce95f69f9d5',
  name: 'Vasya12',
  login: 'user00112',
};

interface IsigninProps {
  login: string;
  password: string;
}

interface IsignupProps {
  name: string;
  login: string;
  password: string;
}

interface IcreatBoardProps {
  title: string;
}
interface IgetBoardByIdProps {
  id: string;
}
interface IcreatColumnProps {
  boardId: string;
  body: { title: string; order: number };
}

interface IgetColumnByIdProps {
  boardId: string;
  columnId: string;
}

interface IgetAllTasksProps {
  boardId: string;
  columnId: string;
}
interface IcreatTaskProps {
  boardId: string;
  columnId: string;
  body: {
    title: string;
    order: number;
    description: string;
    userId: string;
  };
}

interface IgetTaskByIdProps {
  boardId: string;
  columnId: string;
  taskId: string;
}

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMGMyNDMyYy01MTY1LTRmMzQtOGViMS03Y2U5NWY2OWY5ZDUiLCJsb2dpbiI6InVzZXIwMDExMiIsImlhdCI6MTY1MjAyNzkwOX0.3PPt5NGDAVhhQPegn0s_u05rg7aQXBMeR2R8Wg_lOBE';

export default {
  getValue: () => {
    return allTasks;
  },
  signin: async (props: IsigninProps = signinBody) => {
    const res = await fetch(`${BASE_URL}${pathRoutes.auth.signin.absolute()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props),
    });
    const data = await res.json();
    return data;
  },

  signup: async (props: IsignupProps = signupBody) => {
    const res = await fetch(`${BASE_URL}${pathRoutes.auth.signup.absolute()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props),
    });
    const data = await res.json();
    return data;
  },

  creatBoard: async (props: IcreatBoardProps) => {
    const res = await fetch(`${BASE_URL}${pathRoutes.boards.create.absolute()}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props),
    });
    const data = await res.json();
    return data;
  },

  getBoardById: async (props: IgetBoardByIdProps) => {
    const res = await fetch(`${BASE_URL}${pathRoutes.boards.getOneById.absolute(props.id)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  },

  creatColumn: async ({ boardId, body }: IcreatColumnProps) => {
    const res = await fetch(`${BASE_URL}${pathRoutes.column.create.absolute(boardId)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    console.log(`${BASE_URL}${pathRoutes.column.create.absolute(boardId)}`);
    const data = await res.json();
    return data;
  },

  getColumnById: async ({ boardId, columnId }: IgetColumnByIdProps) => {
    const res = await fetch(
      `${BASE_URL}${pathRoutes.column.getOneById.absolute(boardId, columnId)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();
    return data;
  },

  getAllTasks: async ({ boardId, columnId }: IgetAllTasksProps) => {
    const res = await fetch(
      `${BASE_URL}${pathRoutes.column.getOneById.absolute(boardId, columnId)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();
    return data;
  },

  creatTask: async ({ boardId, columnId, body }: IcreatTaskProps) => {
    const res = await fetch(`${BASE_URL}${pathRoutes.task.create.absolute(boardId, columnId)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  },

  getTaskById: async ({ boardId, columnId, taskId }: IgetTaskByIdProps) => {
    const res = await fetch(
      `${BASE_URL}${pathRoutes.task.getOneById.absolute(boardId, columnId, taskId)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();
    return data;
  },
};

/* headers: {
  'Authorization': `Bearer ${store.userData.token}`,
  'Accept': 'application/json',
  "Content-Type": "application/json",
}, */
