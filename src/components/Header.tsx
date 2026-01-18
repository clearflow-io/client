import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Link } from '@tanstack/react-router';
import { Home, LayoutDashboard, Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import ClerkHeader from '../integrations/clerk/header-user.tsx';
import { Button } from './ui/button';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-accent hover:text-foreground md:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/full-logo/clearflow-high-resolution-logo-transparent.png"
                alt="ClearFlow Logo"
                className="h-8"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              to="/"
              className="inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{
                className:
                  'inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90',
              }}
            >
              Home
            </Link>
            <SignedIn>
              <Link
                to="/dashboard"
                className="inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
                activeProps={{
                  className:
                    'inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90',
                }}
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
                activeProps={{
                  className:
                    'inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90',
                }}
              >
                Profile
              </Link>
            </SignedIn>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            <SignedOut>
              <Link to="/sign-in">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button size="sm">Get Started</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <ClerkHeader />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
          aria-label="Close navigation menu"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-80 flex-col border-r border-border bg-card shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-semibold text-foreground">Navigation</h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
            activeProps={{
              className:
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90',
            }}
          >
            <Home size={18} />
            <span>Home</span>
          </Link>

          <SignedIn>
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{
                className:
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90',
              }}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{
                className:
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90',
              }}
            >
              <User size={18} />
              <span>Profile</span>
            </Link>
          </SignedIn>
        </nav>

        <div className="border-t border-border bg-muted/30 p-4">
          <SignedOut>
            <div className="flex flex-col gap-2">
              <Link to="/sign-in" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </SignedOut>
          <SignedIn>
            <ClerkHeader />
          </SignedIn>
        </div>
      </aside>
    </>
  );
}
