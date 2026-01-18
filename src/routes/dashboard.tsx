import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="container mx-auto p-10">
      <SignedIn>
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg">Congrats, you're authenticated!</p>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
