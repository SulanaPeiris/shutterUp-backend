import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import Header from '../components/global/Header';
import Sidebar from '../components/global/Sidebar';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden ">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full z-20">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Right side: Header + Page */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"}`}>
        <div className="fixed top-0 right-0 z-10 transition-all duration-300" style={{ left: collapsed ? "4rem" : "16rem" }}>
          <Header />
        </div>

        {/* Main scrollable content */}
        <main className="bg-black h-[calc(100vh-3.8rem)] overflow-y-auto   mt-[3.8rem] scrollbar scrollbar-thumb-Charcoal scrollbar-track-transparent scrollbar-thick">
  <Outlet />
</main>
      </div>
    </div>
  );
};

export default Layout;
