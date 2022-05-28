import React, { createContext, Dispatch, ReactNode, useReducer, useState } from 'react';

type UpdateActionBoolean = {
  type: 'setLogInSucsess';
  payload: boolean;
};

type ContextState = {
  logInSucsess: boolean;
};

type AppContextProviderProps = {
  children: ReactNode;
};

type ContextType = {
  state: ContextState;
  dispatch: Dispatch<CounterAction>;
  isCreatingNewBoard: boolean;
  setCreatingNewBoard: React.Dispatch<React.SetStateAction<boolean>>;
};

type CounterAction = UpdateActionBoolean;

const initialState = {
  logInSucsess: false,
};

const reducer = (state: ContextState, action: CounterAction) => {
  switch (action.type) {
    case 'setLogInSucsess':
      return { ...state, logInSucsess: action.payload };
    default:
      return state;
  }
};

export const AppContext = createContext({} as ContextType);

export const ContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isCreatingNewBoard, setCreatingNewBoard] = useState(false);
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        isCreatingNewBoard,
        setCreatingNewBoard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
