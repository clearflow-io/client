import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useSyncUser } from './queries/users';

export function useInitializeUser() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { mutate: syncUser, isPending: isSyncing, isSuccess: isSynced } = useSyncUser();
  const [isSyncStarted, setIsSyncStarted] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user && !isSyncStarted) {
      setIsSyncStarted(true);

      const email = user.primaryEmailAddress?.emailAddress;
      if (!email) {
        console.error('User has no primary email address');
        return;
      }

      syncUser({
        clerk_id: user.id,
        email: email,
        first_name: user.firstName,
        last_name: user.lastName,
        image_url: user.imageUrl,
      });
    }
  }, [isLoaded, isSignedIn, user, isSyncStarted, syncUser]);

  // We are "loaded" if:
  // 1. Clerk is loaded AND
  // 2. Either the user is not signed in OR the user is signed in and the sync has completed
  const isActuallyLoaded = isLoaded && (!isSignedIn || (isSyncStarted && !isSyncing));

  return {
    isLoaded: isActuallyLoaded,
    isSignedIn,
    isSyncing,
    isSynced,
  };
}
