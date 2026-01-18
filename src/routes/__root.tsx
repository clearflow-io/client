import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Toaster } from '../components/ui/sonner';
import { useInitializeUser } from '../hooks/use-initialize-user';
import ClerkProvider from '../integrations/clerk/provider';
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';
import appCss from '../styles.css?url';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'ClearFlow',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
    ],
  }),

  shellComponent: RootDocument,
});

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { isReady, syncError, retry, isSyncing } = useInitializeUser();

  if (!isReady) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (syncError) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex max-w-md flex-col items-center gap-4 rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Failed to Initialize Account</h2>
            <p className="text-sm text-muted-foreground">
              We couldn't connect to our servers to set up your account. Please check your
              connection and try again.
            </p>
          </div>
          <Button onClick={retry} disabled={isSyncing} className="gap-2">
            <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Retrying...' : 'Try Again'}
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ClerkProvider>
          <AuthInitializer>
            <Header />
            {children}
            <Toaster />
            <TanStackDevtools
              config={{
                position: 'bottom-right',
              }}
              plugins={[
                {
                  name: 'Tanstack Router',
                  render: <TanStackRouterDevtoolsPanel />,
                },
                TanStackQueryDevtools,
              ]}
            />
          </AuthInitializer>
        </ClerkProvider>
        <Scripts />
      </body>
    </html>
  );
}
