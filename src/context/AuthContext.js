import { createContext, useState } from 'react';

export const AuthContext = createContext();

const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'admin2026';

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('admin_auth') === 'true'
  );

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
