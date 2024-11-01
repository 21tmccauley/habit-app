import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
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
  );
};

export default Navbar;