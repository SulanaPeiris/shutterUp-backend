import React from "react";
import { Bell, HelpCircle, UserCircle2, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import corner from "../../assets/global/corner.svg";

const Header = () => {
  const { pathname } = useLocation();

  const getPageName = () => {
    switch (pathname) {
      case "/":
        return "Home";
      case "/community":
        return "Community";
      case "/profile":
        return "Profile";
      case "/featured":
        return "Featured";
      case "/following":
        return "Following";
      case "/learn":
        return "Learn";
      case "/academy":
        return "Academy";
      default:
        return "Page";
    }
  };

  return (
    <header className="relative flex items-center justify-between px-6 py-4 bg-BlackOut text-AntiFlash ">
      <img src={corner} alt="corner" className="absolute w-6 left-0 -bottom-6" />
      
      <div className="flex items-center space-x-6">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-AntiFlash">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder={`Search in ${getPageName()}`}
            className="pl-10 pr-4 py-1 w-72 rounded-md bg-black border border-gray-400 text-sm placeholder-gray-400 text-AntiFlash focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Bell className="w-5 h-5 cursor-pointer" />
        <HelpCircle className="w-5 h-5 cursor-pointer" />
        <UserCircle2 className="w-7 h-7 cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
