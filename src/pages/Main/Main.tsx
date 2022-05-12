import Board from 'pages/Board';
import { Link } from 'react-router-dom';

const Main = () => (
  <div>
    Main Page
    <div>
      <Link to="/board">Board</Link>
    </div>
  </div>
);

export default Main;
