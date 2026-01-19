import { useClerk, useUser } from '@clerk/clerk-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useSyncUser } from './queries/users';

/**
 * Synchronizes the Clerk user with our backend on sign-in.
 * Returns `isReady: true` when the app can render (either user is synced, not signed in, or sync failed).
 */
export function useInitializeUser() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { mutate: syncUser, isPending: isSyncing } = useSyncUser();
  const [syncedUserId, setSyncedUserId] = useState<string | null>(null);
  const [errorUserId, setErrorUserId] = useState<string | null>(null);

  // Derive syncError from errorUserId - error is only relevant for the current user
  const syncError = errorUserId !== null && errorUserId === user?.id;

  // Sync user with backend when signed in
  useEffect(() => {
    const shouldSync =
      isLoaded && isSignedIn && user && user.id !== syncedUserId && !isSyncing && !syncError;

    if (!shouldSync) return;

    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      console.error('User has no primary email address');
      toast.error('Account error: No email address found. Please sign in with a valid email.');
      signOut();
      return;
    }

    syncUser(
      {
        clerkId: user.id,
        email,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
      },
      {
        onSuccess: () => setSyncedUserId(user.id),
        onError: (error) => {
          console.error('Failed to sync user:', error);
          toast.error('Failed to initialize your account. Please try again.');
          setErrorUserId(user.id);
        },
      },
    );
  }, [isLoaded, isSignedIn, user, syncedUserId, syncUser, isSyncing, syncError, signOut]);

  const retry = useCallback(() => {
    setSyncedUserId(null);
    setErrorUserId(null);
  }, []);

  const isReady = useMemo(() => {
    // - Clerk is still loading: not ready
    if (!isLoaded) return false;

    // - User not signed in: ready (no sync needed)
    if (!isSignedIn) return true;

    // - User signed in and synced: ready
    if (syncedUserId === user.id) return true;

    // - Sync error: ready (show error UI)
    if (syncError) return true;

    return false;
  }, [isLoaded, isSignedIn, syncError, syncedUserId, user?.id]);

  return {
    isReady,
    isSignedIn,
    isSyncing,
    syncError,
    retry,
  };
}
