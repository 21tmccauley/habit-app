import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../theme/theme-toggle"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Layout = ({ children }) => {
    return (
      <div className="min-h-screen bg-background">
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
                  <Link to="/dashboard" className="flex items-center py-2 text-sm">
                    Dashboard
                  </Link>
                  <Link to="/statistics" className="flex items-center py-2 text-sm">
                    Statistics
                  </Link>
                  <Link to="/settings" className="flex items-center py-2 text-sm">
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
  
            {/* Logo */}
            <Link to="/dashboard" className="mr-6 flex items-center space-x-2">
              <span className="font-bold inline-block">Habit Tracker</span>
            </Link>
  
            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
              <Link to="/dashboard" className="transition-colors hover:text-foreground/80">
                Dashboard
              </Link>
              <Link to="/statistics" className="transition-colors hover:text-foreground/80">
                Statistics
              </Link>
              <Link to="/settings" className="transition-colors hover:text-foreground/80">
                Settings
              </Link>
            </nav>
  
            <div className="flex flex-1 items-center justify-end space-x-2">
              {/* Theme toggle */}
              <ThemeToggle />
  
              {/* Auth buttons - to be replaced with user menu when logged in */}
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
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