import { useDeleteColumnById } from 'hooks/columns/useDeleteColumnById';
import useTaskTitleEdit from 'hooks/tasks/useTaskTitleEdit';
import { useLanguage } from 'hooks/useLanguage';
import { ITEXT } from 'interfaces';
import { useState } from 'react';
import ColumnControl from '../ColumnControl';
import ColumnTitleEdit from '../ColumnTitleEdit';
import styles from './column-header.module.scss';

const TEXT_COLUMN_HEADER: ITEXT = {
  remove: {
    en: 'remove',
    ru: 'удалить',
  },
};

interface IProps {
  title: string;
  boardId: string;
  columnId: string;
}

const ColumnHeader = ({ title, boardId, columnId }: IProps) => {
  const { newTitle, isTitleEdit, setIsTitleEdit, handlers } = useTaskTitleEdit(title);

  return (
    <div className={styles.container}>
      {isTitleEdit ? (
        <ColumnTitleEdit
          value={newTitle}
          onChange={handlers.onChange}
          onSubmit={handlers.onSubmit}
          onKeyDown={handlers.onKeyDown}
          onCancel={handlers.onCancel}
        />
      ) : (
        <h3 className={styles.title} onClick={handlers.onClick}>
          {title}
        </h3>
      )}
      <ColumnControl boardId={boardId} columnId={columnId} setIsTitleEdit={setIsTitleEdit} />
    </div>
  );
};

export default ColumnHeader;
