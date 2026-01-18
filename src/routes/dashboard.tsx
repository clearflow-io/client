import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { createFileRoute } from '@tanstack/react-router';
import { useUsers } from '@/hooks/queries/users';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  const { data: users, isLoading, error } = useUsers();

  return (
    <div className="container mx-auto p-10">
      <SignedIn>
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg mb-8">Congrats, you're authenticated!</p>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Users (API Test)</h2>
          {isLoading ? (
            <p>Loading users...</p>
          ) : error ? (
            <p className="text-red-500">
              Error loading users: {error instanceof Error ? error.message : 'Unknown error'}
            </p>
          ) : (
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto max-h-60 text-sm">
              {JSON.stringify(users, null, 2)}
            </pre>
          )}
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
