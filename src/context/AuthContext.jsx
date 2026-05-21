import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const cachedUser = localStorage.getItem("user");
      return cachedUser ? JSON.parse(cachedUser) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(() => {
    try {
      const cachedUser = localStorage.getItem("user");
      return cachedUser ? Boolean(JSON.parse(cachedUser)?.isPremium) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
      setIsPremium(false);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          localStorage.setItem("authToken", token);

          // Register/sync user with backend
          const response = await api.post("/auth/register", {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || "User",
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL || "",
          });

          const userData = response.data.user;
          setUser(userData);
          setIsPremium(userData.isPremium);
          localStorage.setItem("user", JSON.stringify(userData));
        } catch (error) {
          console.error("Error syncing user:", error);
          const cachedUser = localStorage.getItem("user");
          if (cachedUser) {
            const parsedUser = JSON.parse(cachedUser);
            setUser(parsedUser);
            setIsPremium(parsedUser.isPremium);
          }
        }
      } else {
        setUser(null);
        setIsPremium(false);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, []);

  const logout = () => {
    auth.signOut();
    setUser(null);
    setIsPremium(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, logout, isPremium, setIsPremium }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
