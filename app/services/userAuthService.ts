import { LoginResponse, LoginRequest, SessionData } from "@/app/types/userAuth";
import { ApiError } from "@/app/utils/CustomApiErrors";

export const userAuthService = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new ApiError(
          response.status,
          errorData.detail ||
            errorData.title ||
            errorData.message ||
            "Login Failed",
          errorData.code, // A specific string code like 'UNAUTHORIZED_LOGIN'
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(0, "A network unexpected error occurred.");
    }
  },
};

export async function getCurrentUser(): Promise<SessionData> {
  const response = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "include", // Sends the HttpOnly cookie to backend
  });

  if (!response.ok) {
    const reasonHeader = response.headers.get("X-Logout-Reason");

    const reason = reasonHeader === "ConcurrentLogin" ? "concurrent" : "expired";

    throw new Error(reason);
  }

  const sessionData = await response.json();

  return {
    userId: sessionData.UserId,
    token: sessionData.Token,
    role: sessionData.Role
  };
}
