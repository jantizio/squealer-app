import { userRead_t } from '@/utils/types';
import { Dispatch, createContext, useReducer } from 'react';

type AuthContextProps = {
  children: React.ReactNode;
};

type State = {
  authUser: userRead_t | null;
};

type Action = {
  type: string;
  payload: userRead_t | null;
};

type AuthContextState =
  | {
      state: State;
      dispatch: Dispatch<Action>;
    }
  | undefined;

const initialState: State = {
  authUser: null,
};

export const AuthContext = createContext<AuthContextState>(undefined);

const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    case 'REMOVE_USER': {
      return {
        ...state,
        authUser: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const value = { state, dispatch };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
