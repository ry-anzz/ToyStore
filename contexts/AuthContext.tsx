// src/contexts/AuthContext.tsx
"use client";

import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { Usuario } from "@/types"; // Importamos o tipo Usuario

// Interface atualizada para incluir os dados do usuário
interface IAuthContext {
  isAuthenticated: boolean;
  user: Usuario | null; // Adicionamos o estado do usuário
  login: (userData: Usuario) => void; // A função login agora recebe o objeto completo do usuário
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  user: null, // Valor inicial nulo
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Agora, verificamos o objeto do usuário no localStorage
    const userString = localStorage.getItem('user_data');
    if (userString) {
      try {
        setUser(JSON.parse(userString));
      } catch (error) {
        console.error("Falha ao ler dados do usuário do localStorage", error);
        localStorage.removeItem('user_data');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: Usuario) => {
    // Salvamos o objeto do usuário como string no localStorage
    localStorage.setItem('user_data', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    // Removemos os dados do usuário do localStorage
    localStorage.removeItem('user_data');
    setUser(null);
  };
  
  const isAuthenticated = !!user;

  if (isLoading) {
    return null; 
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};