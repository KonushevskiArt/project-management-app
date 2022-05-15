import { allTasks } from 'data';
import mockApi from 'MockApi';
import { MutationKey } from 'react-query';
import { pathRoutes } from 'utils/pathRoutes';
import { ICreatTask, IGetBoardById, IGetColumnById } from './apiInterfaces';

export const BASE_URL = 'https://pure-cove-88107.herokuapp.com';

const signinBody = {
  login: 'user001',
  password: 'userpass@123',
};
const signupBody = {
  name: 'Vasya',
  login: 'user001',
  password: 'userpass@123',
};

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMGMyNDMyYy01MTY1LTRmMzQtOGViMS03Y2U5NWY2OWY5ZDUiLCJsb2dpbiI6InVzZXIwMDExMiIsImlhdCI6MTY1MjAyNzkwOX0.3PPt5NGDAVhhQPegn0s_u05rg7aQXBMeR2R8Wg_lOBE';

export const getBoardById = ({ boardId }: IGetBoardById) => {
  try {
    return mockApi.getBoardById({ boardId }).then((res) => res);
  } catch (error) {
    throw Error('!!!');
  }
}; /* ({
  queryKey: ['boards', boardId],
  queryFn: async () => {
    try {
      const res = await fetch(`${BASE_URL}${pathRoutes.boards.getOneById.absolute(boardId)}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      throw Error('!!!');
    }
  },
  retry: false,
}); */

export const getAllColumns = ({ boardId }: IGetBoardById) => {
  try {
    /*   const res = await fetch(`${BASE_URL}${pathRoutes.columns.getAll.absolute(boardId)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }); */
    return mockApi.getAllColumns({ boardId }).then((res) => res);
    // const data = await res.json();
    // return data;
  } catch (error) {
    throw Error('!!!');
  }
};

/* ({ */
/*  queryKey: ['columns', boardId],
  queryFn: () => mockApi.getAllColumns({ boardId }).then((res) => res) */ /* async () => {
    try {
      const res = await fetch(`${BASE_URL}${pathRoutes.columns.getAll.absolute(boardId)}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      throw Error('!!!');
    }
  }, */
/* retry: false,
}); */

export const getColumnById = ({ boardId, columnId }: IGetColumnById) => {
  try {
    return mockApi.getColumnById({ boardId, columnId }).then((res) => res);
  } catch (error) {
    throw Error('!!!');
  }
  /*  try {
    const res = await fetch(
      `${BASE_URL}${pathRoutes.columns.getOneById.absolute(boardId, columnId)}`,
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
  } catch (error) {
    throw Error('!!!');
  } */
};

export const getAllTasks = ({ boardId, columnId }: IGetColumnById) => {
  try {
    return mockApi.getAllTasks({ boardId, columnId }).then((res) => res);
  } catch (error) {
    throw Error('!!!');
  }
  /*  try {
    const res = await fetch(`${BASE_URL}${pathRoutes.tasks.relative(boardId, columnId)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw Error('!!!');
  } */
};

export const creatTask = (onSuccess: () => Promise<void>) => ({
  mutationFn: ({ boardId, columnId, body }: ICreatTask) =>
    mockApi.creatTask({ boardId, columnId, body }) /*  async () => {
    try {
      const res = await fetch(`${BASE_URL}${pathRoutes.tasks.create.absolute(boardId, columnId)}`, {
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
    } catch (error) {
      throw Error('!!!');
    }
  }, */,
  onSuccess,
  retry: false,
});

/* 
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
}, */

/* 
{
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
};
 */
/* 
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
 */
