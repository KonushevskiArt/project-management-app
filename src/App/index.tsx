import { BrowserRouter } from 'react-router-dom';
import './global-styles.scss';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
