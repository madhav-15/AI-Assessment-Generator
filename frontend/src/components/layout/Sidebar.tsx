"use client";

import { useEffect, useId } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Users, FileText, Wrench, Library, Settings, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';

import { useAssessmentStore } from '@/store/assessmentStore';
import { getAssignments } from '@/services/api.service';

const navItems = [
  { name: 'Home', href: '/home', icon: LayoutGrid },
  { name: 'My Groups', href: '/groups', icon: Users },
  { name: 'Assignments', href: '/', icon: FileText },
  { name: "AI Teacher's Toolkit", href: '/toolkit', icon: Wrench },
  { name: 'My Library', href: '/library', icon: Library },
];

export function Sidebar({ onClose }: { onClose?: () => void } = {}) {
  const pathname = usePathname();
  const { assignmentsCount, setJobState } = useAssessmentStore();
  const uid = useId().replace(/:/g, '');

  useEffect(() => {
    let cancelled = false;

    if (assignmentsCount > 0) {
      return;
    }

    getAssignments()
      .then((assignments) => {
        if (!cancelled) {
          setJobState({ assignmentsCount: Array.isArray(assignments) ? assignments.length : 0 });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setJobState({ assignmentsCount: 0 });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [assignmentsCount, setJobState]);

  const isActive = (item: typeof navItems[0]) => {
    if (item.name === 'Assignments') {
      return pathname === '/' || pathname.startsWith('/create') || pathname.startsWith('/result') || pathname.startsWith('/assignments');
    }
    if (item.name === 'Home') {
      return pathname === '/home';
    }
    if (item.name === 'My Groups') {
      return pathname.startsWith('/groups');
    }
    if (item.name === "AI Teacher's Toolkit") {
      return pathname.startsWith('/toolkit');
    }
    if (item.name === 'My Library') {
      return pathname.startsWith('/library');
    }
    return pathname === item.href;
  };

  return (
    <aside className="w-[304px] h-full flex-shrink-0 bg-white rounded-2xl flex flex-col overflow-hidden" style={{ boxShadow: '0px 16px 48px rgba(0,0,0,0.12), 0px 32px 48px rgba(0,0,0,0.2)', padding: '24px' }}>
      {/* Logo + Title + Mobile Close */}
      <div className="flex items-center gap-2 mb-0">
        {/* Frame 1984077293 */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px', gap: '8px', width: '136px', height: '40px', flex: 'none', order: 0, flexGrow: 0 }}>
          {/* Logo container */}
          <div 
            className="w-[40px] h-[40px] flex items-center justify-center flex-none" 
            style={{ 
              opacity: 1, 
              transform: 'rotate(0deg)', 
              boxShadow: '0px 12.85px 12.85px rgba(0, 0, 0, 0.1), 0px 8.57px 8.57px rgba(0, 0, 0, 0.15), 0px 4.28px 4.28px rgba(0, 0, 0, 0.2)',
              borderRadius: '10px'
            }}
          >
            <svg width="40" height="40" viewBox="19.7144 1.85519 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flex: 'none', order: 0, flexGrow: 0 }}>
              <rect x="19.7144" y="1.85519" width="40" height="40" rx="10" fill={`url(#paint0_linear_${uid})`}/>
              <g filter={`url(#filter0_ddd_${uid})`}>
                <path fillRule="evenodd" clipRule="evenodd" d="M42.4414 30.2153C42.4414 30.2153 43.1689 32.1573 43.8356 32.2789H35.4113C33.7142 32.2789 32.1994 31.3079 31.7141 29.487L26.8051 14.9207C26.8051 14.9207 26.381 13.1606 25.7144 12.8571H34.3205C36.0176 12.9179 37.1691 13.5247 37.8358 15.7706L42.4414 30.2153Z" fill="white"/>
                <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M42.4414 30.2153C42.4414 30.2153 43.1689 32.1573 43.8356 32.2789H35.4113C33.7142 32.2789 32.1994 31.3079 31.7141 29.487L26.8051 14.9207C26.8051 14.9207 26.381 13.1606 25.7144 12.8571H34.3205C36.0176 12.9179 37.1691 13.5247 37.8358 15.7706L42.4414 30.2153Z" fill={`url(#paint1_linear_${uid})`}/>
                <path fillRule="evenodd" clipRule="evenodd" d="M37.0472 30.2149C37.0472 30.2149 36.3198 32.1569 35.6531 32.2784H44.0774C45.7745 32.2784 47.2893 31.3074 47.7745 29.4865L52.6232 14.9207C52.6232 14.9207 53.0473 13.1606 53.714 12.8571H45.1681C43.471 12.8571 42.3803 13.464 41.7136 15.7098L37.0472 30.2149Z" fill="white"/>
              </g>
              <defs>
                <filter id={`filter0_ddd_${uid}`} x="0.00007" y="0.000004" width="79.4281" height="70.8503" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="12.8571"/>
                  <feGaussianBlur stdDeviation="12.8571"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result={`effect1_dropShadow_${uid}`}/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="8.57143"/>
                  <feGaussianBlur stdDeviation="8.57143"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                  <feBlend mode="normal" in2={`effect1_dropShadow_${uid}`} result={`effect2_dropShadow_${uid}`}/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="4.28571"/>
                  <feGaussianBlur stdDeviation="4.28571"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
                  <feBlend mode="normal" in2={`effect2_dropShadow_${uid}`} result={`effect3_dropShadow_${uid}`}/>
                  <feBlend mode="normal" in="SourceGraphic" in2={`effect3_dropShadow_${uid}`} result="shape"/>
                </filter>
                <linearGradient id={`paint0_linear_${uid}`} x1="39.7144" y1="1.85519" x2="39.7144" y2="41.8552" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E56820"/>
                  <stop offset="1" stopColor="#D45E3E"/>
                </linearGradient>
                <linearGradient id={`paint1_linear_${uid}`} x1="34.775" y1="11.2061" x2="34.775" y2="33.9908" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0"/>
                  <stop offset="0.33" stopColor="white" stopOpacity="0"/>
                  <stop offset="0.76" stopColor="#0E1513"/>
                  <stop offset="1" stopColor="#0E1513"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* VedaAI Text SVG */}
          <svg width="88" height="21" viewBox="68 10 86 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flex: 'none', order: 1, flexGrow: 0 }}>
            <path d="M74.3224 30.8552L68.2184 12.3752H72.6144L76.9824 27.4392H77.3464L81.7424 12.3752H86.0824L79.9504 30.8552H74.3224ZM92.2417 31.2472C91.0284 31.2472 89.9457 31.0792 88.9937 30.7432C88.0604 30.4072 87.267 29.9219 86.6137 29.2872C85.9604 28.6525 85.4564 27.8685 85.1017 26.9352C84.7657 26.0019 84.5977 24.9472 84.5977 23.7712C84.5977 22.6139 84.7564 21.5499 85.0737 20.5792C85.4097 19.5899 85.895 18.7405 86.5297 18.0312C87.1644 17.3032 87.939 16.7432 88.8537 16.3512C89.7684 15.9592 90.8044 15.7632 91.9617 15.7632C93.0817 15.7632 94.0804 15.9499 94.9577 16.3232C95.835 16.6779 96.563 17.2192 97.1417 17.9472C97.739 18.6752 98.1684 19.5712 98.4297 20.6352C98.7097 21.6805 98.8124 22.8845 98.7377 24.2472L87.2017 24.3592V22.1472L96.4137 22.0632L94.9857 23.1832C95.1164 22.1939 95.051 21.3819 94.7897 20.7472C94.5284 20.1125 94.1457 19.6459 93.6417 19.3472C93.1564 19.0485 92.615 18.8992 92.0177 18.8992C91.3084 18.8992 90.683 19.0859 90.1417 19.4592C89.6004 19.8325 89.1804 20.3832 88.8817 21.1112C88.583 21.8205 88.4337 22.6792 88.4337 23.6872C88.4337 25.2739 88.779 26.4405 89.4697 27.1872C90.179 27.9339 91.103 28.3072 92.2417 28.3072C92.7644 28.3072 93.203 28.2419 93.5577 28.1112C93.931 27.9619 94.2297 27.7752 94.4537 27.5512C94.6964 27.3272 94.883 27.0752 95.0137 26.7952C95.163 26.5152 95.2844 26.2352 95.3777 25.9552L98.8777 26.7112C98.7097 27.4019 98.4577 28.0272 98.1217 28.5872C97.8044 29.1285 97.375 29.6045 96.8337 30.0152C96.2924 30.4072 95.639 30.7059 94.8737 30.9112C94.127 31.1352 93.2497 31.2472 92.2417 31.2472ZM105.539 31.2472C104.307 31.2472 103.224 30.9299 102.291 30.2952C101.376 29.6605 100.667 28.7645 100.163 27.6072C99.6586 26.4499 99.4066 25.0779 99.4066 23.4912C99.4066 21.9979 99.6306 20.6725 100.079 19.5152C100.527 18.3579 101.189 17.4525 102.067 16.7992C102.944 16.1459 104.036 15.8192 105.343 15.8192C106.295 15.8192 107.097 15.9965 107.751 16.3512C108.404 16.7059 108.936 17.2285 109.347 17.9192C109.776 18.5912 110.112 19.4032 110.355 20.3552H110.999C110.868 19.7579 110.747 19.1792 110.635 18.6192C110.541 18.0405 110.467 17.4899 110.411 16.9672C110.355 16.4445 110.327 15.9872 110.327 15.5952V10.8352H114.359V23.6312V30.8552H110.999V26.5992H110.439C110.233 27.6445 109.916 28.5125 109.487 29.2032C109.057 29.8939 108.507 30.4072 107.835 30.7432C107.181 31.0792 106.416 31.2472 105.539 31.2472ZM106.883 27.9432C107.499 27.9432 108.021 27.8125 108.451 27.5512C108.88 27.2899 109.235 26.9539 109.515 26.5432C109.795 26.1139 110 25.6565 110.131 25.1712C110.261 24.6672 110.327 24.2005 110.327 23.7712V23.2392C110.327 22.8845 110.271 22.5205 110.159 22.1472C110.065 21.7552 109.925 21.3725 109.739 20.9992C109.552 20.6259 109.319 20.2992 109.039 20.0192C108.759 19.7205 108.432 19.4872 108.059 19.3192C107.685 19.1512 107.275 19.0672 106.827 19.0672C106.155 19.0672 105.585 19.2539 105.119 19.6272C104.652 20.0005 104.288 20.5232 104.027 21.1952C103.765 21.8485 103.635 22.6139 103.635 23.4912C103.635 24.3872 103.765 25.1712 104.027 25.8432C104.307 26.5152 104.689 27.0379 105.175 27.4112C105.66 27.7659 106.229 27.9432 106.883 27.9432ZM119.837 31.2472C119.016 31.2472 118.288 31.0885 117.653 30.7712C117.019 30.4352 116.524 29.9592 116.169 29.3432C115.815 28.7272 115.637 27.9619 115.637 27.0472C115.637 26.2445 115.787 25.5725 116.085 25.0312C116.403 24.4899 116.86 24.0512 117.457 23.7152C118.055 23.3792 118.792 23.0992 119.669 22.8752C120.547 22.6512 121.545 22.4552 122.665 22.2872C123.263 22.1939 123.748 22.1099 124.121 22.0352C124.513 21.9419 124.803 21.8019 124.989 21.6152C125.176 21.4099 125.269 21.1205 125.269 20.7472C125.269 20.2245 125.083 19.7765 124.709 19.4032C124.336 19.0299 123.748 18.8432 122.945 18.8432C122.404 18.8432 121.9 18.9365 121.433 19.1232C120.985 19.3099 120.593 19.5899 120.257 19.9632C119.94 20.3365 119.707 20.8125 119.557 21.3912L116.001 20.2992C116.225 19.5339 116.543 18.8712 116.953 18.3112C117.383 17.7512 117.896 17.2845 118.493 16.9112C119.091 16.5192 119.772 16.2299 120.537 16.0432C121.303 15.8565 122.133 15.7632 123.029 15.7632C124.467 15.7632 125.633 15.9965 126.529 16.4632C127.444 16.9112 128.125 17.6205 128.573 18.5912C129.021 19.5432 129.245 20.7752 129.245 22.2872V24.8072C129.245 25.4605 129.255 26.1232 129.273 26.7952C129.311 27.4672 129.348 28.1485 129.385 28.8392C129.441 29.5112 129.497 30.1832 129.553 30.8552H125.997C125.923 30.3885 125.848 29.8565 125.773 29.2592C125.717 28.6432 125.671 28.0272 125.633 27.4112H125.129C124.868 28.1205 124.495 28.7645 124.009 29.3432C123.524 29.9219 122.927 30.3885 122.217 30.7432C121.527 31.0792 120.733 31.2472 119.837 31.2472ZM121.545 28.3352C121.9 28.3352 122.255 28.2699 122.609 28.1392C122.983 28.0085 123.337 27.8312 123.673 27.6072C124.028 27.3645 124.345 27.0659 124.625 26.7112C124.924 26.3565 125.167 25.9552 125.353 25.5072L125.297 23.1552L125.941 23.2952C125.605 23.5379 125.213 23.7339 124.765 23.8832C124.317 24.0139 123.851 24.1165 123.365 24.1912C122.899 24.2659 122.432 24.3499 121.965 24.4432C121.499 24.5365 121.079 24.6579 120.705 24.8072C120.351 24.9565 120.061 25.1619 119.837 25.4232C119.632 25.6659 119.529 26.0112 119.529 26.4592C119.529 27.0379 119.716 27.4952 120.089 27.8312C120.463 28.1672 120.948 28.3352 121.545 28.3352ZM129.748 30.8552L136.076 12.3752H141.956L148.284 30.8552H143.916L139.24 15.5672H138.82L134.116 30.8552H129.748ZM133.304 27.2152V24.4712H145.316V27.2152H133.304ZM149.159 30.8552V12.3752H153.275V30.8552H149.159Z" fill="#303030"/>
          </svg>
        </div>
        
        {/* Mobile close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" style={{ color: '#303030' }} />
          </button>
        )}
      </div>

      {/* Create Assignment Button */}
      <div className="mt-14 mb-0">
        <Link href="/create" className="flex items-center justify-center gap-[10px] w-full h-[42px] rounded-full text-white" style={{ background: '#272727', fontFamily: 'var(--font-inter)', fontSize: '16px', fontWeight: 500, letterSpacing: '-0.04em', boxShadow: '0px 16px 48px rgba(255,255,255,0.12), 0px 32px 48px rgba(255,255,255,0.2), inset 0px -1px 3.5px rgba(177,177,177,0.6), inset 0px 0px 34.5px rgba(255,255,255,0.25)' }}>
          <Sparkles className="w-[18px] h-[17px]" />
          Create Assignment
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2 mt-8">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-2 px-3 rounded-lg transition-colors w-full",
                active ? "h-[38px]" : "h-[40px]"
              )}
              style={{
                background: active ? '#F0F0F0' : 'transparent',
                color: active ? '#303030' : 'rgba(94, 94, 94, 0.8)',
                fontSize: '16px',
                fontWeight: active ? 500 : 400,
                letterSpacing: '-0.04em',
                lineHeight: '140%',
              }}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" strokeWidth={active ? 2 : 1.8} />
              <span className="flex-1 text-left">{item.name}</span>
              {item.name === 'Assignments' && assignmentsCount > 0 && (
                <span 
                  className="flex items-center justify-center text-white text-[12px] font-bold"
                  style={{
                    background: '#FF5623',
                    borderRadius: '48px',
                    minWidth: '22px',
                    height: '18px',
                    padding: '0 6px',
                  }}
                >
                  {assignmentsCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="flex flex-col gap-2">
        <Link href="/settings" onClick={onClose} className="flex items-center gap-2 px-3 h-[38px]" style={{ color: 'rgba(94, 94, 94, 0.8)', fontSize: '16px', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: '140%' }}>
          <Settings className="w-5 h-5" strokeWidth={1.8} />
          Settings
        </Link>

        <Link href="/settings" onClick={onClose} className="rounded-2xl p-3 flex items-center gap-2 transition hover:bg-[#e9e9e9]" style={{ background: '#F0F0F0' }}>
          <div 
            className="flex-none overflow-hidden" 
            style={{ 
              width: '59px', 
              height: '56px', 
              borderRadius: '50%',
              order: 0
            }}
          >
            <Image 
              src="/2e5a797574651e700037a00834fc192cdff92aad.jpg" 
              alt="School Avatar" 
              width={59} 
              height={56} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate" style={{ fontSize: '16px', fontWeight: 700, color: '#303030', letterSpacing: '-0.04em', lineHeight: '140%' }}>Delhi Public School</p>
            <p className="truncate" style={{ fontSize: '14px', fontWeight: 400, color: '#5E5E5E', letterSpacing: '-0.04em', lineHeight: '140%' }}>Bokaro Steel City</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
