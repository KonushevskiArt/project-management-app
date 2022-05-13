import CreatCard from 'components/CreatTask';
import CreatCardForm from 'components/CreatTask/CreatTaskForm';
import { IColumn, ITask } from 'interfaces';
import mockApi from 'MockApi';
import { useQuery } from 'react-query';
import { Route, Routes, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Task from './Task';
import styles from './tasks.module.scss';

interface IProps {
  tasks: ITask[];
  columnId: string;
}

const Tasks = ({ tasks, columnId }: IProps) => {
  const { boardId = '' } = useParams();

  const {
    isLoading,
    error,
    data = [],
  } = useQuery(
    ['tasks', boardId, columnId],
    () => {
      try {
        return mockApi.getAllTasks({ boardId, columnId }).then((res) => res);
      } catch (error) {
        throw Error('!!!');
      }
    },
    {
      initialData: tasks,
    }
  );

  return (
    <ul className={styles.list}>
      {data.map((task: ITask) => (
        <Task task={task} key={task.id} />
      ))}
    </ul>
  );
};

export default Tasks;
