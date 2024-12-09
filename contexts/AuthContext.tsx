import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { api } from '../lib/api/axios';
import { getMe, logIn, logout, register } from '@/lib/services/auth.api';



interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData:UserRegister) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await SecureStore.getItemAsync('accessToken');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await getMe(); 
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      await SecureStore.deleteItemAsync('accessToken');
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log("safasfasfsa")

    try {
      const { accessToken, user } = await logIn(email, password);
      console.log(accessToken, user)
      await SecureStore.setItemAsync('accessToken', accessToken);
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      
      setUser(user);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.log(error)
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const signUp = async (userData:UserRegister) => {
    try {
      const { accessToken, user } = await register(userData);
      
      await SecureStore.setItemAsync('accessToken', accessToken);
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      
      setUser(user);
      setIsAuthenticated(true);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const signOut = async () => {
    try {
      await logout();
    } catch (error) {
      // Handle error silently
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      await SecureStore.deleteItemAsync('accessToken');
      delete api.defaults.headers.common.Authorization;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};