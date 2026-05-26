import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type ProfileDialogContextValue = {
  menuAnchor: HTMLElement | null;
  editOpen: boolean;
  passwordOpen: boolean;
  openUserMenu: (anchor: HTMLElement) => void;
  closeUserMenu: () => void;
  openEditProfile: () => void;
  openChangePassword: () => void;
  closeEditProfile: () => void;
  closeChangePassword: () => void;
};

const ProfileDialogContext = createContext<ProfileDialogContextValue | null>(null);

export function ProfileDialogProvider({ children }: { children: ReactNode }) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const openUserMenu = useCallback((anchor: HTMLElement) => setMenuAnchor(anchor), []);
  const closeUserMenu = useCallback(() => setMenuAnchor(null), []);

  const openEditProfile = useCallback(() => {
    setMenuAnchor(null);
    setEditOpen(true);
  }, []);

  const openChangePassword = useCallback(() => {
    setMenuAnchor(null);
    setPasswordOpen(true);
  }, []);

  const closeEditProfile = useCallback(() => setEditOpen(false), []);
  const closeChangePassword = useCallback(() => setPasswordOpen(false), []);

  const value = useMemo(
    () => ({
      menuAnchor,
      editOpen,
      passwordOpen,
      openUserMenu,
      closeUserMenu,
      openEditProfile,
      openChangePassword,
      closeEditProfile,
      closeChangePassword,
    }),
    [
      menuAnchor,
      editOpen,
      passwordOpen,
      openUserMenu,
      closeUserMenu,
      openEditProfile,
      openChangePassword,
      closeEditProfile,
      closeChangePassword,
    ],
  );

  return <ProfileDialogContext.Provider value={value}>{children}</ProfileDialogContext.Provider>;
}

export function useProfileDialog() {
  const ctx = useContext(ProfileDialogContext);
  if (!ctx) throw new Error('useProfileDialog must be used within ProfileDialogProvider');
  return ctx;
}
