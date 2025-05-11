import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  User,
  Star,
  UserCheck,
  GraduationCap,
  Plus,
  Lightbulb,
} from "lucide-react";
import logo from "../../assets/branding/logo_c.png";
import text from "../../assets/branding/text_w.png";
import CreatePostModal from "../../components/posts/CreatePostModal";
import { useAuth } from "../../context/AuthContext";
import { createPost } from "../../services/postService";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const [isCommunityOpen, setIsCommunityOpen] = useState(true);
  const [isLearnOpen, setIsLearnOpen] = useState(true);

const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const { user } = useAuth(); // must provide user.id

  const handlePostSubmit = async (data) => {
    try {
      await createPost(data, user.id);
      alert("Post created!");
      setIsPostModalOpen(false);
      // optionally refresh posts
    } catch (err) {
      console.error("Post creation failed", err);
      alert("Something went wrong.");
    }
  };


  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderTooltip = (text) => (
    <span className="absolute left-full ml-2 px-2 py-1 text-xs bg-gray-800 text-white rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      {text}
    </span>
  );

  const isCommunityActive = location.pathname.startsWith("/community") ||
                            location.pathname === "/profile" ||
                            location.pathname === "/featured" ||
                            location.pathname === "/following";

  

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-BlackOut text-AntiFlash h-screen flex flex-col justify-between transition-all duration-300`}
    >
      <div className="flex flex-col px-3 py-3 space-y-2 font-inter">
        {/* Logo */}
        <div className="flex items-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 bg-BabyBlue/20 rounded-xl"
          />
          {!collapsed && (
            <img
              src={text}
              alt="Text"
              className="ml-2 h-10 object-contain transition-opacity duration-300"
            />
          )}
        </div>

        {/* Add Post */}
        <button
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-start px-3"
          } py-2 text-sm hover:rounded-md space-x-3 hover:bg-[#2c2c2c] transition border-b-2 border-Charcoal`}
          onClick={() => setIsPostModalOpen(true)}
        >
          <span className="w-10 h-10 bg-cyan-400/30 text-cyan-300 flex items-center justify-center rounded-full">
            <Plus className="w-7 h-7" />
          </span>
          {!collapsed && <span className="text-white">Add Post</span>}
        </button>

        {/* Home */}
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `relative group flex items-center px-2 py-2 rounded-md cursor-pointer ${
              collapsed ? "" : "space-x-3"
            } hover:bg-[#2c2c2c] ${
              isActive ? "bg-LightSilver text-Charcoal hover:bg-gray-300" : "text-AntiFlash"
            }`
          }
        >
          <Home className="w-5 h-5 min-w-[1.25rem]" />
          <span
            className={`transition-all duration-300 origin-left ${
              collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            }`}
          >
            Home
          </span>
          {collapsed && renderTooltip("Home")}
        </NavLink>

        {/* Community */}
        <div
          className={`flex items-center justify-between px-2 py-1  rounded-md transition ${
            isCommunityActive ? "bg-LightSilver text-Charcoal hover:bg-gray-300" : "text-AntiFlash"
          } hover:bg-[#2c2c2c]`}
        >
          <NavLink
            to="/community"
            className={`relative group flex items-center ${
              collapsed ? "" : "space-x-3"
            }`}
          >
            <Users className="w-5 h-5" />
            {!collapsed && <span>Community</span>}
            {collapsed && renderTooltip("Community")}
          </NavLink>
          {!collapsed && (
            <button
              onClick={() => setIsCommunityOpen(!isCommunityOpen)}
              className={`rounded  p-1 ${ isCommunityActive ? "bg-LightSilver text-Charcoal hover:bg-gray-300" : "text-AntiFlash"}`}
            >
              {isCommunityOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
          )}
        </div>

        {(isCommunityOpen || collapsed) && (
          <div className={`${collapsed ? "ml-0" : "ml-6"} text-sm text-gray-300`}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `relative group flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-[#2c2c2c] ${
                  isActive ? "bg-LightSilver text-Charcoal hover:bg-gray-300" : ""
                }`
              }
            >
              <User className="w-5 h-5" />
              {!collapsed && <span>My Profile</span>}
              {collapsed && renderTooltip("My Profile")}
            </NavLink>
            <NavLink
              to="/featured"
              className={({ isActive }) =>
                `relative group flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-[#2c2c2c] ${
                  isActive ? "bg-LightSilver text-Charcoal hover:bg-gray-300" : ""
                }`
              }
            >
              <Star className="w-5 h-5" />
              {!collapsed && <span>Featured</span>}
              {collapsed && renderTooltip("Featured")}
            </NavLink>
            <NavLink
              to="/following"
              className={({ isActive }) =>
                `relative group flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-[#2c2c2c] ${
                  isActive ? "bg-LightSilver text-Charcoal hover:bg-gray-300" : ""
                }`
              }
            >
              <UserCheck className="w-5 h-5" />
              {!collapsed && <span>Following</span>}
              {collapsed && renderTooltip("Following")}
            </NavLink>
          </div>
        )}

        {/* Learn */}
       <NavLink
          to="/learn"
          className={({ isActive }) =>
            `relative group flex items-center px-2 py-2 rounded-md cursor-pointer ${
              collapsed ? "" : "space-x-3"
            } hover:bg-[#2c2c2c] ${
              isActive ? "bg-LightSilver text-Charcoal hover:bg-gray-300" : "text-AntiFlash"
            }`
          }
        >
          <Lightbulb className="w-5 h-5 min-w-[1.25rem]" />
          <span
            className={`transition-all duration-300 origin-left ${
              collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            }`}
          >
            Learn
          </span>
          {collapsed && renderTooltip("Learn")}
        </NavLink>
      </div>

      {/* Toggle Collapse Button */}
      <div className="flex justify-start py-4">
        <div className="mx-3 border-t-2 border-Charcoal w-full">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded hover:bg-[#3a3a3a] transition mt-2"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>
      </div>
       <CreatePostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSubmit={handlePostSubmit}
      />
    </aside>
  );
};

export default Sidebar;
