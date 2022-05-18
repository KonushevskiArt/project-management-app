import { useQuery } from 'react-query';
import { pathRoutes } from 'utils/pathRoutes';
import { BoardService } from 'utils/services/Board.service';

export const useGetBoardById = (boardId: string) => {
  const { isLoading, error, data, refetch } = useQuery(
    pathRoutes.board.getOneById.absolute(boardId),
    () => BoardService.getOneById(boardId)
  );

  return { isLoading, error, data, refetch };
};
