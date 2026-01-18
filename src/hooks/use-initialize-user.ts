import { useClerk, useUser } from '@clerk/clerk-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useSyncUser } from './queries/users';

export function useInitializeUser() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { mutate: syncUser, isPending: isSyncing, isSuccess: isSynced } = useSyncUser();
  const [lastSyncedUserId, setLastSyncedUserId] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user && user.id !== lastSyncedUserId && !isSyncing) {
      // Reset error state when attempting sync for a new/different user
      if (hasError) {
        setHasError(false);
      }

      const email = user.primaryEmailAddress?.emailAddress;
      if (!email) {
        console.error('User has no primary email address');
        toast.error('Account error: No email address found. Please sign in with a valid email.');
        signOut();
        return;
      }

      syncUser(
        {
          clerk_id: user.id,
          email: email,
          first_name: user.firstName,
          last_name: user.lastName,
          image_url: user.imageUrl,
        },
        {
          onSuccess: () => setLastSyncedUserId(user.id),
          onError: (error) => {
            console.error('Failed to sync user:', error);
            toast.error('Failed to initialize your account. Please try again later.');
            setHasError(true);
          },
        },
      );
    }
  }, [isLoaded, isSignedIn, user, lastSyncedUserId, syncUser, isSyncing, hasError, signOut]);

  const retry = useCallback(() => {
    setHasError(false);
    setLastSyncedUserId(null);
  }, []);

  const isActuallyLoaded = useMemo(() => {
    // 1. If Clerk itself isn't loaded, we're definitely not ready
    if (!isLoaded) return false;

    // 2. If the user isn't signed in, no synchronization is needed
    // The app can load the unauthenticated state.
    if (!isSignedIn) return true;

    // 3. If there was an error during sync, we're loaded (to show the error state)
    if (hasError) return true;

    // 4. If signed in, we are loaded only when:
    //    - The last synced ID matches the current user AND
    //    - There isn't a sync currently in progress
    return lastSyncedUserId === user.id && !isSyncing;
  }, [isLoaded, isSignedIn, hasError, lastSyncedUserId, user?.id, isSyncing]);

  return {
    isLoaded: isActuallyLoaded,
    isSignedIn,
    isSyncing,
    isSynced,
    hasError,
    retry,
  };
}
