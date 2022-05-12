import useCreatCardForm from 'hooks/useCreatCardForm';
import Textarea from 'components/Textarea';

interface IProps {
  onCloseClick: (event: { preventDefault: () => void }) => void;
}

const TEXT_CREAT_CARD_FORM = {
  placeholder: 'Enter a title for this card…',
  addCardButton: 'Add card',
};

const CreatCardForm = ({ onCloseClick }: IProps) => {
  const { handlers, textareaEl, isDisabled } = useCreatCardForm();

  return (
    <Textarea
      onSubmit={handlers.onSubmit}
      onKeyDown={handlers.onKeyDown}
      onCloseClick={onCloseClick}
      textareaEl={textareaEl}
      buttonTitle={TEXT_CREAT_CARD_FORM.addCardButton}
      placeholder={TEXT_CREAT_CARD_FORM.placeholder}
      isDisabled={isDisabled}
    />
  );
};

export default CreatCardForm;
