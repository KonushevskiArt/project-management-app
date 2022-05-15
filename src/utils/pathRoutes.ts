import { join } from 'path-browserify';

export const pathRoutes = {
  root: 'https:/pure-cove-88107.herokuapp.com',
  docs: () => join(pathRoutes.root, 'docs'),
  auth: {
    relative: '',
    signup: {
      relative: 'signup',
      absolute: () =>
        // join(pathRoutes.root, pathRoutes.auth.relative, pathRoutes.auth.signup.relative),
        `${pathRoutes.root}/${pathRoutes.auth.relative}/${pathRoutes.auth.signup.relative}`,
    },
    signin: {
      relative: 'signin',
      absolute: () =>
        join(pathRoutes.root, pathRoutes.auth.relative, pathRoutes.auth.signin.relative),
    },
  },
  user: {
    relative: 'users',
    getAll: {
      relative: '',
      absolute: () => join(pathRoutes.root, pathRoutes.user.relative),
    },
    getOneById: {
      relative: '',
      absolute: (id = ':id') => join(pathRoutes.root, pathRoutes.user.relative, id),
    },
    updateOneById: {
      relative: '',
      absolute: (id = ':id') => join(pathRoutes.root, pathRoutes.user.relative, id),
    },
    deleteOneById: {
      relative: '',
      absolute: (id = ':id') => join(pathRoutes.root, pathRoutes.user.relative, id),
    },
  },
  board: {
    relative: 'boards',
    getAll: {
      relative: '',
      absolute: () => join(pathRoutes.root, pathRoutes.board.relative),
    },
    getOneById: {
      relative: '',
      // absolute: (id = ':id') => join(pathRoutes.root, pathRoutes.board.relative, id),
      absolute: (id = ':id') => `${pathRoutes.root}/${pathRoutes.board.relative}/${id}`,
    },
    create: {
      relative: '',
      // absolute: () => join(pathRoutes.root, pathRoutes.board.relative),
      absolute: () => `${pathRoutes.root}/${pathRoutes.board.relative}`,
    },
    updateOneById: {
      relative: '',
      absolute: (id = ':id') => join(pathRoutes.root, pathRoutes.board.relative, id),
    },
    deleteOneById: {
      relative: '',
      absolute: (id = ':id') => join(pathRoutes.root, pathRoutes.board.relative, id),
    },
  },
  column: {
    relative: (boardId = ':id') =>
      join(pathRoutes.root, pathRoutes.board.relative, boardId, 'columns'),
    getAll: {
      relative: '',
      absolute: (boardId = ':id') => join(pathRoutes.column.relative(boardId)),
    },
    getOneById: {
      relative: '',
      absolute: (boardId = 'id', columnId = ':id') =>
        join(pathRoutes.column.relative(boardId), columnId),
    },
    create: {
      relative: '',
      absolute: (boardId = ':id') => join(pathRoutes.column.relative(boardId)),
    },
    updateOneById: {
      relative: '',
      absolute: (boardId = 'id', columnId = ':id') =>
        join(pathRoutes.column.relative(boardId), columnId),
    },
    deleteOneById: {
      relative: '',
      absolute: (boardId = 'id', columnId = ':id') =>
        join(pathRoutes.column.relative(boardId), columnId),
    },
  },
  task: {
    relative: (boardId = ':id', columnId = ':id') =>
      join(pathRoutes.root, pathRoutes.column.relative(boardId), columnId),
    getAll: {
      relative: '',
      absolute: (boardId = ':id', columnId = ':id') =>
        join(pathRoutes.task.relative(boardId, columnId), 'tasks'),
    },
    getOneById: {
      relative: '',
      absolute: (boardId = ':id', columnId = ':id', taskId = ':id') =>
        join(pathRoutes.task.relative(boardId, columnId), 'tasks', taskId),
    },
    create: {
      relative: '',
      absolute: (boardId = ':id', columnId = ':id') =>
        join(pathRoutes.task.relative(boardId, columnId), 'tasks'),
    },
    updateOneById: {
      relative: '',
      absolute: (boardId = 'id', columnId = ':id', taskId = ':id') =>
        join(pathRoutes.task.relative(boardId, columnId), 'tasks', taskId),
    },
    deleteOneById: {
      relative: '',
      absolute: (boardId = 'id', columnId = ':id', taskId = ':id') =>
        join(pathRoutes.task.relative(boardId, columnId), 'tasks', taskId),
    },
  },
  file: {
    relative: 'file',
    getOneByTaskIdAndFileName: {
      relative: '',
      absolute: (taskId = ':id', fileName = 'name') =>
        join(pathRoutes.root, pathRoutes.file.relative, taskId, fileName),
    },
    upload: {
      relative: '',
      absolute: () => join(pathRoutes.root, pathRoutes.file.relative),
    },
  },
};
