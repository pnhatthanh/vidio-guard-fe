import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { authApi } from '../../api/auth';
import { usersApi } from '../../api/users';
import { getErrorMessage } from '../../api/errors';
import {
  clearTokens,
  getRefreshToken,
  hasSession,
  setTokens,
} from '../../lib/authStorage';
import { tryRefreshSession } from '../../api/client';
import type { LoginRequest, RegisterRequest, UserProfile } from '../../api/types';

type AuthContextValue = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    const profile = await usersApi.getMe();
    setUser(profile);
  }, []);

  const bootstrap = useCallback(async () => {
    if (!hasSession()) {
      setUser(null);
      return;
    }
    try {
      await loadProfile();
    } catch {
      const refreshed = await tryRefreshSession();
      if (refreshed) {
        await loadProfile();
      } else {
        clearTokens();
        setUser(null);
      }
    }
  }, [loadProfile]);

  useEffect(() => {
    bootstrap().finally(() => setIsLoading(false));
  }, [bootstrap]);

  useEffect(() => {
    const onExpired = () => {
      clearTokens();
      setUser(null);
    };
    window.addEventListener('auth:session-expired', onExpired);
    return () => window.removeEventListener('auth:session-expired', onExpired);
  }, []);

  const login = useCallback(
    async (payload: LoginRequest) => {
      const tokens = await authApi.login(payload);
      setTokens(tokens.access_token, tokens.refresh_token);
      await loadProfile();
    },
    [loadProfile],
  );

  const loginWithGoogle = useCallback(
    async (idToken: string) => {
      const tokens = await authApi.loginGoogle({ id_token: idToken });
      setTokens(tokens.access_token, tokens.refresh_token);
      await loadProfile();
    },
    [loadProfile],
  );

  const register = useCallback(async (payload: RegisterRequest) => {
    await authApi.register(payload);
  }, []);

  const logout = useCallback(async () => {
    const refreshToken = getRefreshToken();
    try {
      if (refreshToken && hasSession()) {
        await authApi.logout({ refresh_token: refreshToken });
      }
    } catch {
      /* vẫn xóa session local nếu API lỗi */
    } finally {
      clearTokens();
      setUser(null);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    await loadProfile();
  }, [loadProfile]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      loginWithGoogle,
      register,
      logout,
      refreshProfile,
    }),
    [user, isLoading, login, loginWithGoogle, register, logout, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { getErrorMessage };
