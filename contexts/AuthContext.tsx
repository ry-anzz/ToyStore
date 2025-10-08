// src/contexts/AuthContext.tsx
"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface IAuthContext {
  isAuthenticated: boolean;
  login: (email: string, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  // O estado começa como false (deslogado)
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  
  const login = (email: string, token: string) => {
    setIsAuthenticated(true);
    // Em um projeto real, você salvaria o token no LocalStorage aqui.
    console.log(`[AUTH SIMULADO] Usuário ${email} logado.`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    console.log("[AUTH SIMULADO] Usuário deslogado.");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};