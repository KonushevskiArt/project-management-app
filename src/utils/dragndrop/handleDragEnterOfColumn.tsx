import { IColumn, IDragItemParams } from 'interfaces';
import { BoardContext } from 'pages/Board/Board';
import { useContext } from 'react';

export const HandleDragEnterOfColumn = (
  e: React.DragEvent<HTMLDivElement>,
  params: IDragItemParams,
  dragItem: React.MutableRefObject<IDragItemParams | undefined>,
  dragNode: React.MutableRefObject<HTMLDivElement | undefined>,
  setColumns: React.Dispatch<React.SetStateAction<IColumn[]>>
) => {
  const currentItem = dragItem.current as IDragItemParams;
  if (e.target !== dragNode.current) {
    setColumns((prevList) => {
      const newList = JSON.parse(JSON.stringify(prevList));
      const currentTask = newList[currentItem?.columnIdx].tasks.splice(currentItem.taskIdx, 1)[0];
      newList[params.columnIdx].tasks.splice(params.taskIdx, 0, currentTask);
      dragItem.current = params;
      return newList;
    });
  }
};
