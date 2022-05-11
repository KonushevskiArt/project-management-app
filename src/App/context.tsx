import React, { createContext, Dispatch, ReactNode, useReducer } from 'react';

type UpdateActionBoolean = {
  type: 'isLoaded' | 'notFound';
  payload: boolean;
};

type ContextState = {
  isLoaded: boolean;
  notFound: boolean;
};

type AppContextProviderProps = {
  children: ReactNode;
};

type ContextType = {
  state: ContextState;
  dispatch: Dispatch<CounterAction>;
};

type CounterAction = UpdateActionBoolean;

const initialState = {
  isLoaded: false,
  notFound: false,
};

const reducer = (state: ContextState, action: CounterAction) => {
  switch (action.type) {
    case 'isLoaded':
      return { ...state, isLoaded: action.payload };
    case 'notFound':
      return { ...state, notFound: action.payload };
    default:
      return state;
  }
};

export const AppContext = createContext({} as ContextType);

export const ContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
