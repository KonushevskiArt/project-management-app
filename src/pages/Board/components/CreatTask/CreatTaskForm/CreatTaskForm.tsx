import useCreatCardForm from 'hooks/useCreatCardForm';
import Textarea from 'components/Textarea';

const TEXT_CREAT_CARD_FORM = {
  placeholder: 'Enter a title for this card…',
  addCardButton: 'Add card',
};

const CreatCardForm = () => {
  const { handlers, textareaEl, isDisabled } = useCreatCardForm();

  return (
    <Textarea
      onSubmit={handlers.onSubmit}
      onKeyDown={handlers.onKeyDown}
      onCloseClick={handlers.onCloseClick}
      textareaEl={textareaEl}
      buttonTitle={TEXT_CREAT_CARD_FORM.addCardButton}
      placeholder={TEXT_CREAT_CARD_FORM.placeholder}
      isDisabled={isDisabled}
    />
  );
};

export default CreatCardForm;
