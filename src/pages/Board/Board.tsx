import Cards from 'components/Cards';
import ListCardContent from 'pages/CardContent';
import { Route, Routes, useParams } from 'react-router';
import mockApi from 'MockApi';
import { useEffect, useState } from 'react';
import { useQuery, useInfiniteQuery } from 'react-query';
import { ITask } from 'interfaces';
import Loader from 'components/Loader';
import NotFound from 'pages/NotFound';

const initialState: ITask[] | [] = [];

const Board = () => {
  const {
    isLoading,
    error,
    data: cards = [],
    isSuccess,
  } = useQuery(['tasks'], () => {
    try {
      return mockApi.getAllTasks().then((res) => res);
    } catch (error) {
      throw Error('!!!');
    }
  });

  const { taskId = '' } = useParams();

  const cardById = cards.find((task) => task.id === taskId);

  if (error) return <NotFound />;
  return (
    <div>
      <p>First board</p>
      {isLoading ? <Loader /> : <Cards cards={cards} />}
      <Routes>
        <Route path=":taskId" element={<ListCardContent card={cardById} />} />
      </Routes>
    </div>
  );
};

export default Board;
