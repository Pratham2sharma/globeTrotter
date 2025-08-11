import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  city?: string;
  country?: string;
  password: string;
  confirmPassword: string;
  additionalInfo?: string;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      login: async (email: string, password: string): Promise<boolean> => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
          });

          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();

            if (response.ok) {
              set({
                user: data.user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              });
              return true;
            } else {
              set({ error: data.error || "Login failed", isLoading: false });
              return false;
            }
          } else {
            set({ error: "Server error - invalid response", isLoading: false });
            return false;
          }
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : "Login failed";
          set({ error: errorMessage, isLoading: false });
          return false;
        }
      },

      register: async (data: RegisterData): Promise<boolean> => {
        set({ isLoading: true, error: null });

        if (data.password !== data.confirmPassword) {
          set({ error: "Passwords do not match", isLoading: false });
          return false;
        }

        try {
          const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone || "",
              city: data.city || "",
              country: data.country || "",
              password: data.password,
              additionalInfo: data.additionalInfo || "",
            }),
            credentials: "include",
          });

          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const result = await response.json();

            if (response.ok) {
              set({ isLoading: false, error: null });
              return true;
            } else {
              set({
                error: result.error || "Registration failed",
                isLoading: false,
              });
              return false;
            }
          } else {
            set({ error: "Server error - invalid response", isLoading: false });
            return false;
          }
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : "Registration failed";
          set({ error: errorMessage, isLoading: false });
          return false;
        }
      },

      logout: async (): Promise<void> => {
        try {
          await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
          });
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({ user: null, isAuthenticated: false, error: null });
        }
      },

      checkAuth: async (): Promise<void> => {
        try {
          const response = await fetch("/api/auth/me", {
            credentials: "include",
          });

          if (response.ok) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              const data = await response.json();
              set({ user: data.user, isAuthenticated: true });
            } else {
              set({ user: null, isAuthenticated: false });
            }
          } else {
            set({ user: null, isAuthenticated: false });
          }
        } catch (error) {
          console.error("Auth check error:", error);
          set({ user: null, isAuthenticated: false });
        }
      },

      clearError: (): void => {
        set({ error: null });
      },

      setUser: (user: User | null): void => {
        set({ user, isAuthenticated: !!user });
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
