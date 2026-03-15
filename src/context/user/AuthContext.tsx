import { createContext, useContext, useState, useEffect } from "react";

interface User {
      name?: string;
      email: string;
      password?: string; // Only for mock, remove if using backend
}

interface AuthContextType {
      user: User | null;
      userEmail: string;
      code: string;
      login: (userData: User) => boolean;
      register: (userData: User) => boolean;
      logout: () => void;
      verifyEmail: (email: string) => boolean;
      updatePassword: (newPassword: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
      const [user, setUser] = useState<User | null>(null);
      const [ userEmail, setUserEmail ] = useState<string>('');
      const [code, setCode ] = useState<string>('');

      // Load user from localStorage on mount
      useEffect(() => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) setUser(JSON.parse(storedUser));
      }, []);

      // Mock user database (for demonstration)
      const getStoredUsers = (): User[] => {
            const users = localStorage.getItem("users");
            return users ? JSON.parse(users) : [];
      };

      const saveUser = (newUser: User) => {
            const users = getStoredUsers();
            localStorage.setItem("users", JSON.stringify([...users, newUser]));
      };

      // Login
      const login = (userData: User) => {
            const users = getStoredUsers();
            const found = users.find(
                  u => u.email === userData.email && u.password === userData.password
            );
            console.log(users);
            if (found) {
                  setUser(found);
                  localStorage.setItem("user", JSON.stringify(found));
                  return true;
            }
            return false;
      };

      // Register
      const register = (userData: User) => {
            const users = getStoredUsers();
            const exists = users.find(u => u.email === userData.email);

            if (exists) return false; // user exists
            saveUser(userData);
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            return true;
      };
      
      // send email
      const verifyEmail = (email: string) => {
            const users = getStoredUsers();
            const exists = users.find(u => u.email === email);

            if (!exists) return false; // user exists
            setUserEmail(email);
            const code = Math.floor(100000 + Math.random() * 900000);
            setCode(code.toString());

            return  true;
      };

      // Update password
      const updatePassword = (newPassword: string) => {
            const users = getStoredUsers();

            const userIndex = users.findIndex((u) => u.email === userEmail);

            if (userIndex === -1) {
              return false; // user not found
            }

            users[userIndex].password = newPassword;

            localStorage.setItem("users", JSON.stringify(users));

            return true;
      };

      // Logout
      const logout = () => {
            setTimeout(() => {
                  setUser(null);
                  localStorage.removeItem("user");
                  window.location.href = '/home'; // refresh the page
            }, 500);
      };

      return (
            <AuthContext.Provider value={{ user, login, register, logout, verifyEmail, userEmail, code, updatePassword }}>
                  {children}
            </AuthContext.Provider>
      );
};

export const useAuth = () => {
      const context = useContext(AuthContext);
      if (!context) throw new Error("useAuth must be used within AuthProvider");
      return context;
};