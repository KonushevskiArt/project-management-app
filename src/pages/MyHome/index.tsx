import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { AuthService } from 'utils/services/Auth.service';
import { BoardService } from 'utils/services/Board.service';

const idMyBoard = 'c9a87cc2-d708-4098-9668-818d259eee93';

const MyHomePage = () => {
  const navigate = useNavigate();
  const userSignIn = { password: '12345', login: 'qwer' };

  const { isSuccess, isLoading, error, refetch } = useQuery(
    'get board by id',
    () => BoardService.getBoardById(idMyBoard),
    {
      enabled: false,
      onSuccess: (response) => {
        const lastColumnOrder =
          response.data.columns.length > 0
            ? response.data.columns[response.data.columns.length - 1].order
            : 1;
        navigate(`${pathRoutes.board.relative}/${response.data.id}`, {
          state: {
            data: response.data,
            lastColumnOrder,
          },
        });
      },
    }
  );

  const { refetch: refetchSignIn } = useQuery('sign In', () => AuthService.signIn(userSignIn), {
    enabled: false,
    onSuccess: (response) => {
      Cookies.set('token', response.data.token);
    },
  });

  return (
    <div>
      <>
        <p>My Home page</p>
        <button onClick={() => refetchSignIn()}>Sign In</button>
        <button onClick={() => refetch()}>Download my board</button>
        {isLoading && <p>loading board...</p>}
        {error && <p>loading error...</p>}
      </>
    </div>
  );
};

export default MyHomePage;
