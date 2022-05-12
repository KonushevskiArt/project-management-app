import React, { useState } from 'react';
import s from './style.module.scss';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import useOnclickOutside from 'react-cool-onclickoutside';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { AuthService } from 'utils/services/Auth.service';
import { UserService } from 'utils/services/User.service';

type Inputs = {
  name: string;
};

const user = { name: 'Artem', password: '12345', login: 'qwer' };
const userSignIn = { password: '12345', login: 'qwer' };

const ColumnCreater = () => {
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const {
    // isLoading,
    // data: response,
    refetch,
  } = useQuery(['signup', user], () => AuthService.signUp(user), {
    onError: ({ error }) => {
      console.log(error);
    },
    enabled: false,
    // select: ({ data }) => {
    //   console.log(data);
    //   return data;
    // },
  });
  const {
    // isLoading,
    // data: response,
    refetch: refetch1,
  } = useQuery(['signin', userSignIn], () => AuthService.signIn(userSignIn), {
    onSuccess: ({ data }) => {
      localStorage.setItem('token', data.token);
    },
    enabled: false,
  });

  const {
    // isLoading,
    // data: response,
    refetch: refetch2,
  } = useQuery('getAll', () => UserService.getAll(), {
    enabled: false,
  });

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // if (data.name.trim()) {
    //   //api request craete column
    //   console.log(data);
    //   setIsAddingColumn(false);
    //   reset();
    // }
  };

  const ref = useOnclickOutside(() => {
    setIsAddingColumn(false);
  });

  const clickTriggerHandler = () => {
    setIsAddingColumn(true);
  };

  const addColumnBlockClassNames = isAddingColumn
    ? `${s.addColumnBlock} ${s.activeColumnBlock}`
    : s.addColumnBlock;

  return (
    <div className={s.columnCreater}>
      <div ref={ref} className={addColumnBlockClassNames}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <button onClick={() => refetch()}>sign up</button> */}
          <button onClick={() => refetch1()}>sign in</button>
          <button onClick={() => refetch2()}>get All users</button>
          {!isAddingColumn ? (
            <button
              onClick={clickTriggerHandler}
              className={`${s.triggerAddColumn} ${s.buttonAdd}`}
            >
              <AddIcon sx={{ fontSize: 22, color: 'var(--text-color-white)' }} />
              <span>Add another list</span>
            </button>
          ) : (
            <input
              {...register('name')}
              autoFocus
              maxLength={120}
              placeholder="Enter list title..."
              className={s.textInput}
            ></input>
          )}
          <div className={s.bottomButtonsWrapper}>
            <div className={s.bottomButtonsLeftWrapper}>
              <button type="submit" className={s.fillButton}>
                Add list
              </button>
              <button onClick={() => setIsAddingColumn(false)} className={s.transparentButton}>
                <CloseIcon sx={{ fontSize: 26, color: 'var(--text-color-dark)' }} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ColumnCreater;
