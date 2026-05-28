"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function ResponsiveLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div
      className="flex h-screen p-2 sm:p-3 gap-2 sm:gap-[11px] print:block print:h-auto print:!bg-white print:p-0"
      style={{
        background: "linear-gradient(180deg, #EEEEEE 0%, #DADADA 100%)",
      }}
    >
      {/* Desktop Sidebar — visible on lg+ */}
      <div className="hidden lg:block flex-shrink-0 print:hidden">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Slide-out drawer */}
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden p-2 animate-slide-in">
            <div className="relative h-full">
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        </>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 print:block">
        {/* Topbar with hamburger on mobile */}
        <div className="print:hidden">
          <Topbar onMenuToggle={() => setSidebarOpen((current) => !current)} />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto mt-3 sm:mt-[22px] print:overflow-visible print:mt-0 print:block">
          {children}
        </div>
      </div>
    </div>
  );
}
