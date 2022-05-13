import Board from 'pages/Board';
import { Link } from 'react-router-dom';

const BOARD_ID = '9a111e19-24ec-43e1-b8c4-13776842b8d5';

const Main = () => {
  return (
    <div>
      Main Page
      <div>
        <Link to={`/boards/${BOARD_ID}`}>Board</Link>
      </div>
    </div>
  );
};

export default Main;
