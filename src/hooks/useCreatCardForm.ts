import { useRef } from 'react';

const useCreatCardForm = () => {
  const textareaEl = useRef(null);

  const submitValue = (value: string) => {
    console.log(`submit: ${value}`);
  };

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const textarea: HTMLTextAreaElement | null = textareaEl.current;
    if (textarea) {
      const value = (textarea as HTMLTextAreaElement).value.trim();
      if (value) {
        submitValue(value);
        (textarea as HTMLTextAreaElement).value = '';
      }
      (textarea as HTMLTextAreaElement).focus();
    }
  };

  const onKeyDown = (event: { key?: string; preventDefault: () => void }) => {
    if (event.key === 'Enter') {
      onSubmit(event);
    }
  };

  return {
    handlers: {
      onSubmit,
      onKeyDown,
    },
    textareaEl,
  };
};

export default useCreatCardForm;
