import { join } from 'path-browserify';
export const pathRoutes = {
  root: '/',
  auth: {
    relative: '',
    signup: {
      relative: 'signup',
      absolute: () =>
        join(pathRoutes.root, pathRoutes.auth.relative, pathRoutes.auth.signup.relative),
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
  boards: {
    relative: 'boards',
    getAll: {
      relative: '',
      absolute: () => join(pathRoutes.root, pathRoutes.boards.relative),
    },
    getOneById: {
      relative: '',
      absolute: (id = ':id') => join(pathRoutes.root, pathRoutes.boards.relative, id),
    },
    create: {
      relative: '',
      absolute: () => join(pathRoutes.root, pathRoutes.boards.relative),
    },
    updateOneById: {
      relative: '',
      absolute: (id = ':id') => join(pathRoutes.root, pathRoutes.boards.relative, id),
    },
    deleteOneById: {
      relative: '',
      absolute: (id = ':id') => join(pathRoutes.root, pathRoutes.boards.relative, id),
    },
  },
  column: {
    relative: (boardId = ':id') =>
      join(pathRoutes.root, pathRoutes.boards.relative, boardId, 'columns'),
    getAll: {
      relative: '',
      absolute: (boardId = ':id') => join(pathRoutes.root, pathRoutes.column.relative(boardId)),
    },
    getOneById: {
      relative: '',
      absolute: (boardId = ':boardId', columnId = ':columnsId') =>
        join(pathRoutes.root, pathRoutes.column.relative(boardId), columnId),
    },
    create: {
      relative: '',
      absolute: (boardId = ':boardId') =>
        join(pathRoutes.root, pathRoutes.column.relative(boardId)),
    },
    updateOneById: {
      relative: '',
      absolute: (boardId = ':boardId', columnId = ':columnsId') =>
        join(pathRoutes.root, pathRoutes.column.relative(boardId), columnId),
    },
    deleteOneById: {
      relative: '',
      absolute: (boardId = ':boardId', columnId = ':columnsId') =>
        join(pathRoutes.root, pathRoutes.column.relative(boardId), columnId),
    },
  },
  task: {
    relative: (boardId = ':id', columnId = ':id') =>
      join(pathRoutes.root, pathRoutes.boards.relative, boardId, 'columns', columnId, 'tasks'),
    create: {
      relative: '',
      absolute: (boardId = ':boardId', columnId = ':columnId') =>
        join(pathRoutes.root, pathRoutes.task.relative(boardId, columnId)),
    },
    getOneById: {
      relative: '',
      absolute: (boardId = ':boardId', columnId = ':columnsId', taskId = ':taskId') =>
        join(pathRoutes.root, pathRoutes.task.relative(boardId, columnId), taskId),
    },
  },
};

// Task (boards/:boardId/columns/:columnsId route)
// GET /tasks - get all tasks
// GET /tasks/:taskId - get the task by id
// POST /tasks - create task
// PUT /tasks/:taskId - update task
// DELETE /tasks/:taskId - delete task
// File:

// GET file/:taskId/:filename/ - download file
// POST file/ - upload file multipart/form-data
