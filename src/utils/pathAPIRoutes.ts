import { join } from 'path-browserify';
// export const API_URL = 'https://pure-cove-88107.herokuapp.com/';

export const pathAPIRoutes = {
  root: 'https://pure-cove-88107.herokuapp.com/',
  docs: () => join(pathAPIRoutes.root, 'docs'),
  auth: {
    relative: '',
    signup: {
      relative: 'signup',
      absolute: () =>
        join(pathAPIRoutes.root, pathAPIRoutes.auth.relative, pathAPIRoutes.auth.signup.relative),
    },
    signin: {
      relative: 'signin',
      absolute: () =>
        join(pathAPIRoutes.root, pathAPIRoutes.auth.relative, pathAPIRoutes.auth.signin.relative),
    },
  },
  user: {
    relative: 'users',
    getAll: {
      relative: '',
      absolute: () => join(pathAPIRoutes.root, pathAPIRoutes.user.relative),
    },
    getOneById: {
      relative: '',
      absolute: (id = ':id') => join(pathAPIRoutes.root, pathAPIRoutes.user.relative, id),
    },
    updateOneById: {
      relative: '',
      absolute: (id = ':id') => join(pathAPIRoutes.root, pathAPIRoutes.user.relative, id),
    },
    deleteOneById: {
      relative: '',
      absolute: (id = ':id') => join(pathAPIRoutes.root, pathAPIRoutes.user.relative, id),
    },
  },
  board: {
    relative: 'boards',
    getAll: {
      relative: '',
      absolute: () => join(pathAPIRoutes.root, pathAPIRoutes.board.relative),
    },
    getOneById: {
      relative: '',
      absolute: (id = ':id') => join(pathAPIRoutes.root, pathAPIRoutes.board.relative, id),
    },
    create: {
      relative: '',
      absolute: () => join(pathAPIRoutes.root, pathAPIRoutes.board.relative),
    },
    updateOneById: {
      relative: '',
      absolute: (id = ':id') => join(pathAPIRoutes.root, pathAPIRoutes.board.relative, id),
    },
    deleteOneById: {
      relative: '',
      absolute: (id = ':id') => join(pathAPIRoutes.root, pathAPIRoutes.board.relative, id),
    },
  },
  column: {
    relative: (boardId = ':id') =>
      join(pathAPIRoutes.root, pathAPIRoutes.board.relative, boardId, 'columns'),
    getAll: {
      relative: '',
      absolute: (boardId = ':id') => join(pathAPIRoutes.column.relative(boardId)),
    },
    getOneById: {
      relative: '',
      absolute: (boardId = 'id', columnId = ':id') =>
        join(pathAPIRoutes.column.relative(boardId), columnId),
    },
    create: {
      relative: '',
      absolute: (boardId = ':id') => join(pathAPIRoutes.column.relative(boardId)),
    },
    updateOneById: {
      relative: '',
      absolute: (boardId = 'id', columnId = ':id') =>
        join(pathAPIRoutes.column.relative(boardId), columnId),
    },
    deleteOneById: {
      relative: '',
      absolute: (boardId = 'id', columnId = ':id') =>
        join(pathAPIRoutes.column.relative(boardId), columnId),
    },
  },
  task: {
    relative: (boardId = ':id', columnId = ':id') =>
      join(pathAPIRoutes.root, pathAPIRoutes.column.relative(boardId), columnId),
    getAll: {
      relative: '',
      absolute: (boardId = ':id', columnId = ':id') =>
        join(pathAPIRoutes.task.relative(boardId, columnId), 'tasks'),
    },
    getOneById: {
      relative: '',
      absolute: (boardId = ':id', columnId = ':id', taskId = ':id') =>
        join(pathAPIRoutes.task.relative(boardId, columnId), 'tasks', taskId),
    },
    create: {
      relative: '',
      absolute: (boardId = ':id', columnId = ':id') =>
        join(pathAPIRoutes.task.relative(boardId, columnId), 'tasks'),
    },
    updateOneById: {
      relative: '',
      absolute: (boardId = 'id', columnId = ':id', taskId = ':id') =>
        join(pathAPIRoutes.task.relative(boardId, columnId), 'tasks', taskId),
    },
    deleteOneById: {
      relative: '',
      absolute: (boardId = 'id', columnId = ':id', taskId = ':id') =>
        join(pathAPIRoutes.task.relative(boardId, columnId), 'tasks', taskId),
    },
  },
  file: {
    relative: 'file',
    getOneByTaskIdAndFileName: {
      relative: '',
      absolute: (taskId = ':id', fileName = 'name') =>
        join(pathAPIRoutes.root, pathAPIRoutes.file.relative, taskId, fileName),
    },
    upload: {
      relative: '',
      absolute: () => join(pathAPIRoutes.root, pathAPIRoutes.file.relative),
    },
  },
};
