// src/components/layout/Layout.jsx
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import MobileNav from './MobileNav';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';

const Layout = () => {
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
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="container py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;