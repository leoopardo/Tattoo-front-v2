import axios from "axios";
import User from "../types/User";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  FC,
} from "react";
import api from "../services/api";
import { PropsWithChildren } from "react";

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}
interface AuthContextData {
  user: User | null | undefined;
  signIn(data: LoginData): Promise<void>;
  signInByStorage(): Promise<boolean>;
  signOut(): Promise<boolean>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | undefined | null>(undefined);

  async function signIn(data: LoginData) {
    const { data: user } = await api.post(`/auth/sign-in`, data);

    localStorage.setItem("accessToken", user.accessToken);
    sessionStorage.setItem("refreshToken", user.refreshToken);
    if (data.rememberMe) {
      localStorage.setItem("refreshToken", user.refreshToken);
    } else {
      localStorage.removeItem("refreshToken");
    }

    setUser(user);
  }

  async function signInByStorage(): Promise<boolean> {
    try {
      if (
        !localStorage.getItem("accessToken") &&
        !sessionStorage.getItem("refreshToken") &&
        !localStorage.getItem("refreshToken")
      )
        return false;

      const { data: user } = await api.get("users/me");
      sessionStorage.setItem("refreshToken", user.refreshToken);
      setUser(user);
      return true;
    } catch (error: any) {
      console.error(error);
      return false;
    }
  }

  async function signOut() {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    return true;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signInByStorage,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
