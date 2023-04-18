import { Session } from 'next-auth';

export const isAuthenticatedUser = (session: Session | null) => {
  if (session) {
    if (session.user) {
      return true;
    }
  }
  return false;
};
