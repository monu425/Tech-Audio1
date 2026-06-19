"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<AuthUser>;

  register: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    role?: "user" | "admin",
  ) => Promise<AuthUser>;

  logout: () => Promise<void>;

  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  const refreshUser = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error("Refresh failed");
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        // await refreshUser();
      } catch (error) {
        setUser(null);
        if (error instanceof Error) {
          throw new Error(error.message);
        }

        throw new Error("fetching failed");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  });

  const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: "user" | "admin" = "user",
  ): Promise<AuthUser> => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
          role,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Registration failed");
      }

      setUser(data.user);

      return data.user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<AuthUser> => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Login failed");
      }

      setUser(data.user);

      return data.user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",

        credentials: "include",
      });

      setUser(null);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
