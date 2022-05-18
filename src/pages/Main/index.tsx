import React from 'react';
import { useQuery } from 'react-query';
import { pathRoutes } from 'utils/pathRoutes';
import { BoardService } from 'utils/services/Board.service';
import CardBoard from './CardBoard';
import s from './style.module.scss';
import LinearProgress from '@mui/material/LinearProgress';
import BoardCreater from './BoardCreater';

const MyHomePage = () => {
  const { isLoading, error, data } = useQuery(
    pathRoutes.board.getAll.absolute(),
    () => BoardService.getAll(),
    {
      onSuccess: () => {
        console.log('success');
      },
    }
  );

  return (
    <div className={s.page}>
      <>
        <h2 className={s.title}>Main page</h2>
        {isLoading && <LinearProgress />}
        {error && <p>loading error...</p>}
        {data?.length && (
          <div className={s.container}>
            {data?.map(({ title, id }) => (
              <CardBoard id={id} title={title} key={Date.now() + Math.random() * 1000} />
            ))}
            <BoardCreater />
          </div>
        )}
      </>
    </div>
  );
};

export default MyHomePage;
