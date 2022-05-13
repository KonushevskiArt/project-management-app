import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { pathAPIRoutes } from 'utils/pathAPIRoutes';
import { AuthService } from 'utils/services/Auth.service';
import { BoardService } from 'utils/services/Board.service';

const idMyBoard = 'c9a87cc2-d708-4098-9668-818d259eee93';

const MyHomePage = () => {
  const navigate = useNavigate();
  const userSignIn = { password: '12345', login: 'qwer' };

  const {
    isSuccess,
    isLoading,
    data: response,
    error,
    refetch,
  } = useQuery('get board by id', () => BoardService.getBoardById(idMyBoard), { enabled: false });

  const {
    isSuccess: isSuccessSignIn,
    isLoading: isLoadingSignIn,
    data: responseSingIn,
    error: errorSignIn,
    refetch: refetchSignIn,
  } = useQuery('sign In', () => AuthService.signIn(userSignIn), { enabled: false });

  useEffect(() => {
    if (isSuccess) {
      const lastColumnOrder =
        response.data.columns.length > 0
          ? response.data.columns[response.data.columns.length - 1].order
          : 1;
      navigate(`${pathAPIRoutes.board.relative}/${response.data.id}`, {
        state: {
          data: response.data,
          lastColumnOrder,
        },
      });
    }
  }, [isSuccess]);

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
