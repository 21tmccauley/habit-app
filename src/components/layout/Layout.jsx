import Navbar from './Navbar';
import MobileNav from './MobileNav';
import { ThemeToggle } from './ThemeToggle';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <MobileNav />

          {/* Logo */}
          <Link to="/dashboard" className="mr-6 flex items-center space-x-2">
            <span className="font-bold inline-block">Habit Tracker</span>
          </Link>

          <Navbar />

          <div className="flex flex-1 items-center justify-end space-x-2">
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

      <main className="container py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;