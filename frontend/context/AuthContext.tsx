"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../lib/api";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  auth_provider?: "local" | "google";
  plan?: string;
  has_archive_pin?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  googleLogin: (credential: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (name: string, avatar?: string) => Promise<void>;
  updatePassword: (currentPass: string, newPass: string) => Promise<void>;
  updateArchivePin: (currentPin: string, newPin: string) => Promise<void>;
  setupArchivePin: (pin: string) => Promise<void>; // Added this function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    setUser(res.data.data.user);
    router.push("/dashboard");
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await api.post("/auth/register", { name, email, password });
    setUser(res.data.data.user);
    router.push("/dashboard");
  };

  const googleLogin = async (credential: string) => {
    const res = await api.post("/auth/google", { idToken: credential });
    setUser(res.data.data.user);
    router.push("/dashboard");
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    router.push("/login");
  };

  const updateProfile = async (name: string, avatar?: string) => {
    const res = await api.patch("/auth/me", { name, avatar });
    setUser(res.data.data.user); // Update local state with new user data from server response
  };

  const updatePassword = async (currentPass: string, newPass: string) => {
    await api.patch("/auth/password", {
      currentPassword: currentPass,
      newPassword: newPass,
    });

    // Upon successful mutation, re-fetch user data to keep state in sync.
    const resMe = await api.get("/auth/me");
    setUser(resMe.data.data.user);
  };

  const updateArchivePin = async (currentPin: string, newPin: string) => {
    await api.patch("/auth/archive-pin", { currentPin, newPin });

    // Upon successful mutation, re-fetch user data to make sure everything is in sync.
    const resMe = await api.get("/auth/me");
    setUser(resMe.data.data.user);
  };

  // ADDED THIS FUNCTION for initial pin setup
  const setupArchivePin = async (pin: string) => {
    // API call that takes the pin property for the POST request.
    const res = await api.post("/auth/archive-pin", { pin });

    // Directly update the local state with the full user data from the backend's response.
    // We assume backend is well behaved.
    if (res.data.success && res.data.data.user) {
      setUser(res.data.data.user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        googleLogin,
        logout,
        updateProfile,
        updatePassword,
        updateArchivePin,
        setupArchivePin, // Export the new function here
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
