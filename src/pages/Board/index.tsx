import ListCards from 'components/ListCards';
import ListCardContent from 'components/ListCards/ListCard/ListCardContent';
import Modal from 'components/Modal';
import { allTasks } from 'data';
import s from './style.module.scss';

const Board = () => {
  return (
    <div>
      <Modal
        handleClickOutside={() => {
          console.log('!!!');
        }}
      >
        <ListCardContent />
      </Modal>
      <p>First board</p>
      <ListCards cards={allTasks} />
    </div>
  );
};

export default Board;
