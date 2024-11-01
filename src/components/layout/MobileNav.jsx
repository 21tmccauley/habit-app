import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from 'react-router-dom';

const MobileNav = () => {
  return (
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
  );
};

export default MobileNav;