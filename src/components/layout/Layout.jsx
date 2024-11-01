import React from 'react';
import { Moon, Sun, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Layout = ({ children }) => {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] sm:w-[385px]">
              <nav className="flex flex-col space-y-4">
                <a href="/" className="flex items-center py-2 text-sm">
                  Dashboard
                </a>
                <a href="/statistics" className="flex items-center py-2 text-sm">
                  Statistics
                </a>
                <a href="/settings" className="flex items-center py-2 text-sm">
                  Settings
                </a>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <a href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold inline-block">Habit Tracker</span>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            <a href="/" className="transition-colors hover:text-foreground/80">
              Dashboard
            </a>
            <a href="/statistics" className="transition-colors hover:text-foreground/80">
              Statistics
            </a>
            <a href="/settings" className="transition-colors hover:text-foreground/80">
              Settings
            </a>
          </nav>

          <div className="flex flex-1 items-center justify-end space-x-2">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="mr-6"
            >
              {theme === 'light' ? (
                <Moon className="h-6 w-6" />
              ) : (
                <Sun className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Auth buttons - to be replaced with user menu when logged in */}
            <Button variant="ghost">Sign In</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;