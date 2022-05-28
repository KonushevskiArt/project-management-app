import React from 'react';
import { useQuery } from 'react-query';
import { pathRoutes } from 'utils/pathRoutes';
import { BoardService } from 'utils/services/Board.service';
import CardBoard from './CardBoard';
import s from './style.module.scss';
import LinearProgress from '@mui/material/LinearProgress';
import BoardCreater from './BoardCreater';
import Layout from 'components/Layout';
import { useLanguage } from 'hooks/useLanguage';

interface ILANG {
  [key: string]: string;
}

export interface ITEXT {
  [key: string]: ILANG;
}

const TEXT_MAIN_PAGE: Readonly<ITEXT> = {
  title: {
    en: 'Main page',
    ru: 'Главная страница',
  },
};

const MainPage = () => {
  const { isLoading, error, data } = useQuery(
    pathRoutes.board.getAll.absolute(),
    () => BoardService.getAll(),
    {
      staleTime: 1000 * 180,
    }
  );
  const lang = useLanguage();

  return (
    <Layout>
      <div className={s.page}>
        <>
          <h2 className={s.title}>{TEXT_MAIN_PAGE.title[lang]}</h2>
          {isLoading && <LinearProgress />}
          {error && <p>loading error...</p>}

          {data && (
            <div className={s.container}>
              {data.map(({ title, id, description }) => (
                <CardBoard id={id} description={description} title={title} key={id} />
              ))}
              <BoardCreater />
            </div>
          )}
        </>
      </div>
    </Layout>
  );
};

export default MainPage;
