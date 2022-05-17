import { AxiosData } from 'pages/LogIn/iterfaces';
import React, { createContext, Dispatch, ReactNode, useReducer } from 'react';

type UpdateActionBoolean = {
  type:
    | 'isLoaded'
    | 'setNotFound'
    | 'setLogInProces'
    | 'setSingUp'
    | 'userIsExist'
    | 'setLogInSucsess';
  payload: boolean;
};

type UpdateActionDataForLogIn = {
  type: 'setRequestData';
  payload: AxiosData;
};

type Reset = {
  type: 'reset';
};

type ContextState = {
  logInSucsess: boolean;
  userExist: boolean;
  signUp: boolean;
  isLoaded: boolean;
  notFound: boolean;
  logInProces: boolean;
};

type AppContextProviderProps = {
  children: ReactNode;
};

type ContextType = {
  state: ContextState;
  dispatch: Dispatch<CounterAction>;
};

type CounterAction = UpdateActionBoolean | UpdateActionDataForLogIn | Reset;

const initialState = {
  logInSucsess: false,
  userExist: false,
  signUp: false,
  logInProces: false,
  isLoaded: false,
  notFound: false,
};

const reducer = (state: ContextState, action: CounterAction) => {
  switch (action.type) {
    case 'isLoaded':
      return { ...state, isLoaded: action.payload };
    case 'setNotFound':
      return { ...state, notFound: action.payload };
    case 'setLogInProces':
      return { ...state, logInProces: action.payload };
    case 'setSingUp':
      return { ...state, signUp: action.payload };
    case 'userIsExist':
      return { ...state, userExist: action.payload };
    case 'setLogInSucsess':
      return { ...state, logInSucsess: action.payload };
    case 'reset': {
      return initialState;
    }
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
