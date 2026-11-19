
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { getCurrentUser } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("cropcare_token");

    if (!token) {
      setAuthLoading(false);
      return;
    }

    getCurrentUser()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("cropcare_token");
        setUser(null);
      })
      .finally(() => setAuthLoading(false));
  }, []);

  const saveLogin = (data) => {
    localStorage.setItem("cropcare_token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("cropcare_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, authLoading, saveLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
