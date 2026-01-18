import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useSyncUser } from './queries/users';

export function useInitializeUser() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { mutate: syncUser, isPending: isSyncing, isSuccess: isSynced } = useSyncUser();
  const [lastSyncedUserId, setLastSyncedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn && user && user.id !== lastSyncedUserId && !isSyncing) {
      const email = user.primaryEmailAddress?.emailAddress;
      if (!email) {
        console.error('User has no primary email address');
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
        { onSuccess: () => setLastSyncedUserId(user.id) },
      );
    }
  }, [isLoaded, isSignedIn, user, lastSyncedUserId, syncUser, isSyncing]);

  const isActuallyLoaded = (() => {
    // 1. If Clerk itself isn't loaded, we're definitely not ready
    if (!isLoaded) return false;

    // 2. If the user isn't signed in, no synchronization is needed
    // The app can load the unauthenticated state.
    if (!isSignedIn) return true;

    // 3. If signed in, we are loaded only when:
    //    - The last synced ID matches the current user AND
    //    - There isn't a sync currently in progress
    return lastSyncedUserId === user.id && !isSyncing;
  })();

  return {
    isLoaded: isActuallyLoaded,
    isSignedIn,
    isSyncing,
    isSynced,
  };
}
