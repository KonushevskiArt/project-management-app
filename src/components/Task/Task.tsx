import api from 'api';
import { useEffect } from 'react';
import { pathRoutes } from 'utils/pathRoutes';

const boardTitle = {
  title: 'Homework tasks',
};

const column = {
  boardId: '6abc98a1-c08f-4fd9-9167-6d50f9ee76b9',
  body: { title: 'Done', order: 1 },
};

const Task = () => {
  const fetchData = async () => {
    // const data = await api.creatBoard(boardTitle);
    // const data = await api.getBoardById({ id: '6abc98a1-c08f-4fd9-9167-6d50f9ee76b9' });
    const data = await api.creatTask({
      boardId: '6abc98a1-c08f-4fd9-9167-6d50f9ee76b9',
      columnId: '04d3f143-abcb-4ac4-a587-48f194125639',
      body: {
        title: 'new task',
        order: 1,
        description: 'vsbdb svsb',
        userId: 'c0c2432c-5165-4f34-8eb1-7ce95f69f9d5',
      },
    });
    /*   const data = await api.signin({
      login: 'user00112',
      password: 'userpass@12312',
    });*/
    console.log(data);
    return data;
  };
  useEffect(
    () => () => {
      //   fetchData();
    },

    []
  );

  // api.signin();

  return <div>Task</div>;
};

export default Task;
