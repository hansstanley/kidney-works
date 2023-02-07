import React, {
  ReactNode,
  useEffect,
  useState,
  useContext,
  createContext,
} from 'react';
import { firebaseAuth } from '../utils/firebase';
import {
  Auth,
  UserCredential,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';

const googleAuthProvider = new GoogleAuthProvider();

export interface AuthProviderProps {
  children?: ReactNode;
}

export interface UserContextState {
  isAuthenticated: boolean;
  isLoading: boolean;
  id?: string;
}

export const UserStateContext = createContext<UserContextState>(
  {} as UserContextState,
);
export interface AuthContextModel {
  auth: Auth;
  user: User | null;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signOutOfSession: () => Promise<void>;
  sendPasswordResetEmail?: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextModel>({} as AuthContextModel);

export function useAuth(): AuthContextModel {
  return useContext(AuthContext);
}

export const ProvideAuth = ({ children }: AuthProviderProps): JSX.Element => {
  const auth = useProvideAuth();
  // @ts-ignore
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  function signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  }

  function signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  }

  function signInWithGoogle(): Promise<UserCredential> {
    return signInWithPopup(firebaseAuth, googleAuthProvider);
  }
  function resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(firebaseAuth, email);
  }
  function signOutOfSession() {
    return signOut(firebaseAuth);
  }
  useEffect(() => {
    //function that firebase notifies you if a user is set
    const unsubsrcibe = firebaseAuth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubsrcibe;
  }, []);

  return {
    signUp,
    user,
    signIn,
    resetPassword,
    firebaseAuth,
    signInWithGoogle,
    signOutOfSession,
  };
};

export const useUserContext = (): UserContextState => {
  return useContext(UserStateContext);
};
