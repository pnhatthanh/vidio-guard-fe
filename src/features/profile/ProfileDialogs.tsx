import { UserAccountMenu } from './UserAccountMenu';
import { ProfileEditDialog } from './ProfileEditDialog';
import { PasswordDialog } from './PasswordDialog';

export function ProfileDialogs() {
  return (
    <>
      <UserAccountMenu />
      <ProfileEditDialog />
      <PasswordDialog />
    </>
  );
}
