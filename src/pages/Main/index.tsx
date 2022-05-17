import Cookies from 'js-cookie';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { pathRoutes } from 'utils/pathRoutes';
import { AuthService } from 'utils/services/Auth.service';
import { BoardService } from 'utils/services/Board.service';
import CardBoard from './CardBoard';
import s from './style.module.scss';

const idMyBoard = 'c9a87cc2-d708-4098-9668-818d259eee93';
const ArturBOARD_ID = '9a111e19-24ec-43e1-b8c4-13776842b8d5';

const MyHomePage = () => {
  // const userSignIn = { password: '12345', login: 'qwer' };

  const { isLoading, error, data } = useQuery(
    pathRoutes.board.getAll.absolute(),
    () => BoardService.getAll(),
    {
      onSuccess: () => {
        console.log('success');
      },
    }
  );

  // const { refetch: refetchSignIn } = useQuery('sign In', () => AuthService.signIn(userSignIn), {
  //   enabled: false,
  //   onSuccess: ({ token }) => {
  //     Cookies.set('token', token);
  //   },
  // });

  if (!data) return <h2>There is no data</h2>;

  return (
    <div className={s.page}>
      <>
        <h2>Main page</h2>
        {/* <button onClick={() => refetchSignIn()}>Sign In</button> */}
        {isLoading && <p>loading board...</p>}
        {error && <p>loading error...</p>}
        {data.length && (
          <div className={s.container}>
            {data?.map(({ title, id }) => (
              <CardBoard id={id} title={title} key={Date.now() + Math.random() * 1000} />
            ))}
          </div>
        )}
      </>
    </div>
  );
};

export default MyHomePage;
