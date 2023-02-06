
import React, {
  ReactNode,
  useEffect,
  useState,
  useContext,
  createContext,
} from 'react'
import { db, firebaseAuth } from '../utils/firebase'
import {
  Auth,
  UserCredential,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore';

const googleAuthProvider = new GoogleAuthProvider();

export interface AuthProviderProps {
  children?: ReactNode
}

export interface UserContextState {
  isAuthenticated: boolean
  isLoading: boolean
  id?: string
}

export const UserStateContext = createContext<UserContextState>(
  {} as UserContextState,
);
export interface AuthContextModel {
  auth: Auth
  user: User | null
  signIn: (email: string, password: string) => Promise<UserCredential>
  signInWithGoogle: () => Promise<UserCredential>
  signUp: (email: string, password: string) => Promise<UserCredential>
  sendPasswordResetEmail?: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextModel> (
  {} as AuthContextModel,
);

export function useAuth(): AuthContextModel {
  return useContext(AuthContext);
}

export const ProvideAuth = ({ children }: AuthProviderProps): JSX.Element => {
  const auth = useProvideAuth();
  // @ts-ignore
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
};

export const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null)

  function signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
  }

  function signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
  }

  function signInWithGoogle(): Promise<UserCredential>{
      return signInWithPopup(firebaseAuth, googleAuthProvider)
  }
  function resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(firebaseAuth, email)
  }
  useEffect(() => {
    //function that firebase notifies you if a user is set
    const unsubsrcibe = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        // Add information to firestore whenever is a new user
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        // when there is no reference to the database
        if (!docSnap.exists()) {
          await setDoc(docRef, {
            email: user.email,
            name: user.displayName,
            avatar: user?.photoURL
          })
        }
      }
      setUser(user)
    })
    return unsubsrcibe
  }, [])

  return  {
    signUp,
    user,
    signIn, 
    resetPassword,
    signInWithGoogle
  }
}

export const useUserContext = (): UserContextState => {
  return useContext(UserStateContext);
}