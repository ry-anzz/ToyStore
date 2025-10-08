// src/contexts/AuthContext.tsx
"use client";

import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { Usuario, Endereco } from "@/types";

interface IAuthContext {
  isAuthenticated: boolean;
  user: Usuario | null;
  login: (userData: Usuario) => void;
  logout: () => void;
  updateUser: (updatedData: Usuario) => void;
  updateUserAddresses: (newAddresses: Endereco[]) => void; // 1. NOVA FUNÇÃO
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  updateUserAddresses: () => {}, // 2. VALOR PADRÃO
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userString = localStorage.getItem('user_data');
    if (userString) {
      try {
        setUser(JSON.parse(userString));
      } catch (error) {
        localStorage.removeItem('user_data');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: Usuario) => {
    localStorage.setItem('user_data', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user_data');
    setUser(null);
  };
  
  const updateUser = (updatedData: Usuario) => {
    setUser(updatedData);
    localStorage.setItem('user_data', JSON.stringify(updatedData));
  };

  // 3. IMPLEMENTAÇÃO DA FUNÇÃO
  const updateUserAddresses = (newAddresses: Endereco[]) => {
    if (user) {
      const updatedUser = { ...user, enderecos: newAddresses };
      setUser(updatedUser);
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
    }
  };
  
  const isAuthenticated = !!user;

  if (isLoading) return null; 

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUser, updateUserAddresses }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);