"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { LoginResponse, SessionData } from "@/app/types/userAuth";
import {
  getCurrentUser,
  userAuthService,
} from "@/app/services/userAuthService";
import { SessionTimeoutModal } from "@/app/components/SessionTimeoutModal";

type LogoutReason = "expired" | "concurrent" | "server_offline" | "manual"  | "inaccessible";

interface UserContextType {
  user: SessionData | null;
  isLoading: boolean;
  login: (user: LoginResponse) => void;
  logout: (reason: LogoutReason) => void;
  showTimeoutWarning: boolean;
  continueSession: () => void;
}

const INACTIVITY_TIMEOUT_MS = 25 * 60 * 1000; // 25 min until Warning Modal
const GRACE_PERIOD_MS = 5 * 60 * 1000; // 5 min to click Continue
const HEARTBEAT_INTERVAL = 5 * 60 * 1000; // 5 min backend ping

const UserAuthContext = createContext<UserContextType | null>(null);

export const UserAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const publicRoutes = ["/"];

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gracePeriodTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Hydrate Session from Server
  useEffect(() => {
    const initAuth = async () => {
      if (publicRoutes.includes(pathname)) {
        setIsLoading(false);
        return;
      }
      try {
        const userData = await getCurrentUser(); // Check backend if Redis / Cookie is valid
        setUser(userData);
      } catch {
        if (window.location.pathname !== "/"){
            logout("inaccessible");
        }
        setUser(null); // Cookie missing or Redis TTL expired
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, [pathname]);

  // 2. Login
  const login = useCallback(
    (newUser: LoginResponse) => {
      console.log("Login function called with:", newUser);
      const sessionPayload: SessionData = {
        userId: newUser.userId,
        token: newUser.token,
        role: "User",
      };
      setUser(sessionPayload);
      localStorage.setItem("providerList", JSON.stringify(newUser));
    },
    [router, setUser],
  );

  // 3. Logout
  const logout = useCallback(
    async (reason: LogoutReason = "manual") => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (gracePeriodTimerRef.current)
        clearTimeout(gracePeriodTimerRef.current);

      try {
        await fetch("api/auth/logout", {
          method: "POST",
          credentials: "include",
        });
      } catch (error) {
        console.warn(
          "Could not reach backend for logout, clearing local state.",
        );
      } finally {
        setUser(null);
        setShowTimeoutWarning(false);
        localStorage.removeItem("providerList");
      }

      const params = new URLSearchParams();

      if (reason === "manual") {
        params.set("message", "logout_success");
      } else {
        params.set("error", reason);
      }

      router.push(`/?${params.toString()}`);
    },
    [router, setUser],
  );

  // Inactivity Monitor
  useEffect(() => {
    if (!user || showTimeoutWarning) return;

    const resetInactivityTimer = () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);

      inactivityTimerRef.current = setTimeout(() => {
        setShowTimeoutWarning(true);
      }, INACTIVITY_TIMEOUT_MS);
    };

    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((ev) => window.addEventListener(ev, resetInactivityTimer));

    resetInactivityTimer(); // Start initial countdown

    return () => {
      events.forEach((ev) =>
        window.removeEventListener(ev, resetInactivityTimer),
      );
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [user, showTimeoutWarning]);

  // Grace Period (The Logout Countdown)
  useEffect(() => {
    if (!showTimeoutWarning) {
      if (gracePeriodTimerRef.current)
        clearTimeout(gracePeriodTimerRef.current);
      return;
    }

    gracePeriodTimerRef.current = setTimeout(() => {
      logout("expired");
    }, GRACE_PERIOD_MS);

    return () => {
      if (gracePeriodTimerRef.current)
        clearTimeout(gracePeriodTimerRef.current);
    };
  }, [showTimeoutWarning, logout]);

  const continueSession = async () => {
    try {
      await getCurrentUser();
      setShowTimeoutWarning(false);
    } catch (error: any) {
      logout(error.message === "concurrent" ? "concurrent" : "expired");
    }
  };

  // Heartbeat Setup
  useEffect(() => {
    if (!user) return;

    const runHeartbeat = async () => {
      try {
        await getCurrentUser();
      } catch (error: any) {
        logout(error.message === "concurrent" ? "concurrent" : "expired");
      }
    };

    const interval = setInterval(runHeartbeat, HEARTBEAT_INTERVAL);
    return () => clearInterval(interval);
  }, [user, logout]);

  return (
    <UserAuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        showTimeoutWarning,
        continueSession,
      }}
    >
      {children}

      {showTimeoutWarning && (
        <SessionTimeoutModal
          onContinue={continueSession}
          onLogout={() => logout("manual")}
        />
      )}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context)
    throw new Error("useUserAuth must be used within UserAuthProvider");
  return context;
};
