"use client";

import Image from 'next/image';
import { ArrowLeft, Bell, BookOpen, Home, LayoutGrid, Library, Menu, Settings, Sparkles, Users } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface TopbarProps {
  onMenuToggle?: () => void;
}

const titleMap: Array<{ match: RegExp; title: string; icon: typeof LayoutGrid }> = [
  { match: /^\/home$/, title: 'Home', icon: Home },
  { match: /^\/groups/, title: 'My Groups', icon: Users },
  { match: /^\/$/, title: 'Assignments', icon: LayoutGrid },
  { match: /^\/create/, title: 'Create New', icon: Sparkles },
  { match: /^\/result/, title: 'Assignment Result', icon: BookOpen },
  { match: /^\/toolkit/, title: "AI Teacher's Toolkit", icon: Sparkles },
  { match: /^\/library/, title: 'My Library', icon: Library },
  { match: /^\/settings/, title: 'Settings', icon: Settings },
];

export function Topbar({ onMenuToggle }: TopbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const currentTitle = titleMap.find((item) => item.match.test(pathname)) ?? { title: 'Assignments', icon: LayoutGrid };
  const TitleIcon = currentTitle.icon;
  const title = currentTitle.title;

  return (
    <header className="h-[56px] flex items-center flex-shrink-0 px-3 sm:px-6 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.75)', padding: '0px 12px 0px 12px' }}>
      {/* Left: Hamburger (mobile) + Back arrow */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile hamburger */}
        <button 
          onClick={onMenuToggle}
          className="lg:hidden w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 hover:bg-gray-50 transition"
        >
          <Menu className="w-5 h-5" style={{ color: '#303030' }} strokeWidth={2} />
        </button>
        
        <button 
          onClick={() => router.back()} 
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 hover:bg-gray-50 transition"
        >
          <ArrowLeft className="w-6 h-6" style={{ color: '#303030' }} strokeWidth={2} />
        </button>
      </div>

      {/* Center: Title */}
      <div className="flex-1 flex items-center gap-2 ml-2">
        <TitleIcon className="w-5 h-5 hidden sm:block" strokeWidth={1.8} style={{ color: '#A9A9A9' }} />
        <span className="hidden sm:block" style={{ fontWeight: 600, fontSize: '16px', color: '#A9A9A9', letterSpacing: '-0.04em' }}>{title}</span>
      </div>

      {/* Right: Bell + Profile */}
      <div className="flex items-center gap-2 sm:gap-[10px]">
        {/* Bell */}
        <div className="relative w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#F6F6F6' }}>
          <Bell className="w-6 h-6" strokeWidth={1.8} style={{ color: '#303030' }} />
          <div className="absolute w-2 h-2 rounded-full" style={{ background: '#FF5623', top: '1px', right: '4px' }}></div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 py-1.5 px-2 sm:px-3 rounded-xl" style={{ filter: 'drop-shadow(0px 16px 48px rgba(0,0,0,0.12)) drop-shadow(0px 32px 48px rgba(0,0,0,0.2))' }}>
          {/* Frame 1618872412 - Avatar */}
          <div 
            className="flex-none overflow-hidden" 
            style={{ 
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0px',
              gap: '10px',
              width: '32px', 
              height: '32px', 
              background: '#F6F6F6',
              borderRadius: '100px',
              order: 0,
              flexGrow: 0
            }}
          >
            <Image 
              src="/2e5a797574651e700037a00834fc192cdff92aad.jpg" 
              alt="User Avatar" 
              width={32} 
              height={32} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <span style={{ fontWeight: 600, fontSize: '16px', color: '#303030', letterSpacing: '-0.04em' }}>John Doe</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#303030" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      </div>
    </header>
  );
}
