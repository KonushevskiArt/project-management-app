import Loader from 'components/Loader';
import { useQuery } from 'react-query';
import { pathRoutes } from 'utils/pathRoutes';
import { BoardService } from 'utils/services/Board.service';
import CardBoard from './CardBoard';
import s from './style.module.scss';

const MyHomePage = () => {
  const { isLoading, error, data } = useQuery(pathRoutes.board.getAll.absolute(), () =>
    BoardService.getAll()
  );
  if (isLoading) return <Loader />;

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
              <CardBoard id={id} title={title} key={id} />
            ))}
          </div>
        )}
      </>
    </div>
  );
};

export default MyHomePage;
