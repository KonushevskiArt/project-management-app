import { useQuery } from 'react-query';
import { pathRoutes } from './pathRoutes';
import { UserService } from './services/User.service';

export const SetUserIdInLocalStorage = () => {
  useQuery({
    queryKey: pathRoutes.user.getAll.absolute(),
    queryFn: () => UserService.getAll(),
    onSuccess: (data) => {
      const login = localStorage.getItem('user');
      const user = data.filter((user) => user.login === login)[0];
      localStorage.setItem('userId', user.id);
    },
  });
};
