"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAssignments, deleteAssignment } from "@/services/api.service";
import { AssignmentCard } from "@/components/AssignmentCard";
import { Filter, Search, Sparkles, Loader2, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useAssessmentStore } from "@/store/assessmentStore";

export default function Home() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { setJobState } = useAssessmentStore();

  const fetchAssignmentsList = async () => {
    try {
      setLoading(true);
      const data = await getAssignments();
      setAssignments(data);
      
      // Update global store state for count indicators in sidebar
      if (typeof window !== "undefined") {
        setJobState({ assignmentsCount: data.length });
      }
    } catch (err: any) {
      toast.error("Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignmentsList();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteAssignment(id);
      toast.success("Assignment deleted successfully");
      fetchAssignmentsList();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete assignment");
    }
  };

  const filteredAssignments = assignments.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 min-h-[400px] sm:min-h-[678px]">
        <Loader2 className="w-10 h-10 animate-spin" style={{ color: '#E56820' }} />
      </div>
    );
  }

  // 1. EMPTY STATE SCREEN (Render exactly if 0 assignments)
  if (assignments.length === 0) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 min-h-[400px] sm:min-h-[678px]">
        {/* Frame 1984077554: Illustrations & Info */}
        <div className="flex flex-col items-center gap-3 w-full max-w-[486px]">
          {/* Illustrations container - 300x300 */}
          <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] flex items-center justify-center">
            <svg width="287" height="240" viewBox="750 215 287 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="pageShadow" x="786" y="229.556" width="184.537" height="215.029" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="20"/>
                  <feGaussianBlur stdDeviation="15"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0.57 0 0 0 0 0.57 0 0 0 0 0.57 0 0 0 0.19 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                  <feComposite in="SourceGraphic" in2="effect1_dropShadow" operator="over"/>
                </filter>
                
                <filter id="cloudShadow" x="930" y="216.424" width="110.22" height="80.39" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dx="6" dy="4"/>
                  <feGaussianBlur stdDeviation="6.5"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0.106 0 0 0 0 0.467 0 0 0 0 0.545 0 0 0 0.09 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                  <feComposite in="SourceGraphic" in2="effect1_dropShadow" operator="over"/>
                </filter>

                <linearGradient id="circleGrad" x1="877" y1="215" x2="877" y2="455" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F2F2F2"/>
                  <stop offset="1" stopColor="#EFEFEF"/>
                </linearGradient>
              </defs>

              <path d="M877 455C943.274 455 997 401.274 997 335C997 268.726 943.274 215 877 215C810.726 215 757 268.726 757 335C757 401.274 810.726 455 877 455Z" fill="url(#circleGrad)"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M783.314 277.172C783.296 275.746 783.117 274.307 782.759 272.859C781.504 267.777 775.906 264.514 769.948 263.747C763.993 262.98 757.799 264.726 755.412 269.147C754.047 271.674 753.859 273.852 754.417 275.689C754.972 277.516 756.29 279.03 758.079 280.211C763.067 283.498 771.803 284.169 775.789 282.795C777.632 282.158 779.433 281.391 781.186 280.513C780.184 286.259 776.448 291.702 771.462 296.607C760.626 307.268 743.812 315.36 734.655 318.335C734.163 318.495 733.889 319.04 734.042 319.554C734.196 320.068 734.718 320.356 735.21 320.196C744.548 317.162 761.69 308.898 772.74 298.026C778.449 292.411 782.516 286.089 783.211 279.443C796.116 272.242 806.713 259.177 815.774 248.181C816.111 247.776 816.066 247.159 815.675 246.807C815.284 246.458 814.696 246.502 814.359 246.91C805.668 257.456 795.581 270 783.314 277.172ZM781.438 278.217C781.509 276.614 781.358 274.986 780.951 273.344C779.866 268.945 774.878 266.344 769.72 265.68C766.559 265.274 763.308 265.609 760.758 266.799C759.155 267.546 757.835 268.63 757.039 270.105C755.994 272.04 755.768 273.695 756.196 275.099C756.625 276.513 757.689 277.649 759.075 278.561C763.621 281.558 771.575 282.195 775.203 280.943C777.342 280.206 779.419 279.286 781.438 278.217Z" fill="#011625"/>

              <g filter="url(#pageShadow)">
                <rect x="816" y="249.556" width="124.537" height="155.029" rx="16" fill="white"/>
              </g>
              <rect x="827" y="269.556" width="50" height="9.8" rx="4.9" fill="#011625"/>
              <rect x="827" y="297.356" width="100" height="9.8" rx="4.9" fill="#D5D5D5"/>
              <rect x="827" y="325.156" width="100" height="9.8" rx="4.9" fill="#D5D5D5"/>
              <rect x="827" y="352.956" width="100" height="9.8" rx="4.9" fill="#D5D5D5"/>
              <rect x="827" y="380.756" width="100" height="9.8" rx="4.9" fill="#D5D5D5"/>

              <g filter="url(#cloudShadow)">
                <path d="M1015.15 232.424H955.069C952.27 232.424 950 234.812 950 237.759V267.478C950 270.424 952.27 272.813 955.069 272.813H1015.15C1017.95 272.813 1020.22 270.424 1020.22 267.478V237.759C1020.22 234.812 1017.95 232.424 1015.15 232.424Z" fill="white"/>
              </g>
              <path d="M965 259C968.314 259 971 256.314 971 253C971 249.686 968.314 247 965 247C961.686 247 959 249.686 959 253C959 256.314 961.686 259 965 259Z" fill="#CCC6D9"/>
              <rect x="979" y="247" width="32" height="12" rx="6" fill="#D5D5D5"/>

              <path d="M912.11 286.563C946.627 286.563 974.61 314.545 974.61 349.063C974.61 362.539 970.344 375.017 963.091 385.224L1002.36 422.716L987.605 439.841L946.904 400.988C936.958 407.666 924.989 411.563 912.11 411.563C877.592 411.563 849.61 383.581 849.61 349.063C849.61 314.545 877.592 286.563 912.11 286.563ZM912.505 296.15C883.282 296.15 859.592 319.84 859.592 349.063C859.592 378.286 883.282 401.976 912.505 401.976C941.728 401.976 965.418 378.286 965.418 349.063C965.418 319.84 941.728 296.15 912.505 296.15Z" fill="#CCC6D9"/>
              <path d="M912.5 403C942.6 403 967 378.823 967 349C967 319.177 942.6 295 912.5 295C882.4 295 858 319.177 858 349C858 378.823 882.4 403 912.5 403Z" fill="white" fillOpacity="0.3"/>
              <g transform="translate(887.5, 324)">
                <path d="M34.9233 25L48.1122 11.8621C49.3478 10.5624 50.0248 8.83503 49.9993 7.04708C49.9738 5.25913 49.2479 3.55152 47.9757 2.28712C46.7036 1.02272 44.9855 0.301198 43.1866 0.27587C41.3877 0.250541 39.6498 0.923408 38.3421 2.15148L25.1237 15.2894L11.9348 2.15148C11.3001 1.4839 10.5372 0.949596 9.69118 0.58017C8.84515 0.210744 7.93317 0.013699 7.00918 0.000689233C6.08519 -0.0123206 5.16796 0.158966 4.31174 0.504425C3.45552 0.849883 2.6777 1.3625 2.02427 2.01194C1.37085 2.66139 0.855085 3.43447 0.50751 4.28548C0.159935 5.13649 -0.012396 6.04814 0.000693476 6.9665C0.013783 7.88486 0.212035 8.79129 0.583725 9.63217C0.955415 10.4731 1.49299 11.2313 2.16466 11.8621L15.3757 25L2.16466 38.1379C1.49299 38.7687 0.955415 39.5269 0.583725 40.3678C0.212035 41.2087 0.013783 42.1151 0.000693476 43.0335C-0.012396 43.9519 0.159935 44.8635 0.50751 45.7145C0.855085 46.5655 1.37085 47.3386 2.02427 47.9881C2.6777 48.6375 3.45552 49.1501 4.31174 49.4956C5.16796 49.841 6.08519 50.0123 7.00918 49.9993C7.93317 49.9863 8.84515 49.7893 9.69118 49.4198C10.5372 49.0504 11.3001 48.5161 11.9348 47.8485L25.1532 34.7106L38.3716 47.8485C39.6916 49.0041 41.4054 49.616 43.1636 49.5593C44.9218 49.5027 46.5921 48.7818 47.8341 47.5437C49.0761 46.3055 49.7963 44.6432 49.848 42.8955C49.8997 41.1479 49.2789 39.4464 48.1122 38.1379L34.9233 25Z" fill="#FF4040"/>
              </g>
              <path d="M987.601 439.843L1002.36 422.717L1004.58 424.84C1006.74 426.899 1008.03 429.775 1008.18 432.836C1008.32 435.898 1007.3 438.893 1005.34 441.163C1003.38 443.433 1000.65 444.792 997.742 444.941C994.833 445.09 991.987 444.017 989.83 441.958L987.607 439.836L987.601 439.843Z" fill="#E1DCEB"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M785.384 411.394C786.455 410.993 787.582 410.459 788.451 409.686C789.483 408.769 789.903 407.587 790.184 406.343C790.546 404.744 790.691 403.042 791.13 401.441C791.292 400.846 791.605 400.621 791.739 400.522C792.078 400.27 792.421 400.202 792.743 400.228C793.125 400.257 793.65 400.409 793.996 401.083C794.045 401.18 794.109 401.327 794.152 401.528C794.183 401.676 794.204 402.137 794.237 402.328C794.32 402.797 794.389 403.266 794.455 403.737C794.672 405.306 794.797 406.639 795.483 408.081C796.414 410.038 797.347 411.235 798.612 411.766C799.836 412.279 801.298 412.182 803.167 411.78C803.345 411.735 803.521 411.696 803.695 411.664C804.519 411.513 805.307 412.082 805.469 412.946C805.631 413.809 805.107 414.65 804.29 414.84C804.12 414.88 803.952 414.917 803.786 414.952C801.26 415.61 798.336 415.958 796.637 420.014C796.114 420.648 795.347 422.421 794.565 423.551C793.988 424.386 793.339 424.935 792.794 425.13C792.429 425.261 792.122 425.24 791.868 425.174C791.498 425.079 791.192 424.868 790.957 424.533C790.829 424.35 790.71 424.104 790.653 423.791C790.626 423.64 790.623 423.257 790.624 423.083C790.464 422.506 790.269 421.943 790.127 421.36C789.788 419.971 789.123 419.092 788.333 417.93C787.594 416.843 786.8 416.159 785.636 415.614C785.485 415.575 784.263 415.26 783.832 415.08C783.202 414.815 782.901 414.371 782.792 414.132C782.607 413.727 782.588 413.373 782.625 413.077C782.68 412.641 782.866 412.268 783.196 411.967C783.4 411.78 783.705 411.598 784.114 411.509C784.429 411.44 785.267 411.4 785.384 411.394ZM792.551 409.13C792.607 409.263 792.668 409.396 792.732 409.531C794.095 412.397 795.62 413.998 797.474 414.774L797.536 414.799C796.296 415.768 795.173 416.851 794.316 417.889C793.962 418.317 793.495 419.205 792.989 420.115C792.53 418.545 791.78 417.435 790.836 416.045C790.114 414.985 789.359 414.187 788.43 413.537C789.151 413.148 789.838 412.692 790.437 412.16C791.434 411.273 792.093 410.246 792.551 409.13Z" fill="#417BA4"/>
              <circle cx="1012" cy="370" r="6" fill="#417BA4"/>
            </svg>
          </div>

          {/* Frame 1984077347: Title & Subtitle */}
          <div className="flex flex-col items-center gap-[2px] w-full mt-3">
            <h2 className="text-[#303030] text-[20px] font-bold tracking-tight text-center leading-[140%] flex items-center justify-center" style={{ fontFamily: 'var(--font-bricolage)', letterSpacing: '-0.04em', height: '28px' }}>
              No assignments yet
            </h2>
            <p className="text-[14px] sm:text-[16px] font-normal leading-[140%] text-center px-4 sm:px-0" style={{ fontFamily: 'var(--font-bricolage)', letterSpacing: '-0.04em', color: 'rgba(94, 94, 94, 0.8)' }}>
              Create your first assignment to start collecting and grading student submissions.<br />
              You can set up rubrics, define marking criteria, and let AI assist with grading.
            </p>
          </div>
        </div>

        {/* Primary Button - Dark Pill */}
        <Link href="/create" className="mt-8">
          <button className="flex items-center justify-center gap-1 hover:bg-black transition-colors w-[240px] sm:w-[277px] h-[46px]" style={{ boxSizing: 'border-box', background: '#181818', borderRadius: '48px', padding: '12px 24px' }}>
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-white text-[14px] sm:text-[16px] font-medium leading-[140%]" style={{ fontFamily: 'var(--font-bricolage)', letterSpacing: '-0.04em' }}>
              Create Your First Assignment
            </span>
          </button>
        </Link>
      </main>
    );
  }

  // 2. FILLED STATE SCREEN (Figma Spec)
  return (
    <main className="flex-1 flex flex-col items-start pb-24 relative min-h-[500px] sm:min-h-[678px] w-full">
      {/* Scrollable Container Wrapper */}
      <div className="w-full flex flex-col gap-[12px] px-3 sm:px-4 lg:px-0">
        
        {/* Frame 1984077332: Header Group */}
        <div className="flex items-center justify-between w-full mt-2">
          {/* Status Dot + Title Group */}
          <div className="flex items-center gap-3">
            {/* Status dot */}
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{
                background: '#4BC26D',
                border: '4px solid rgba(75, 194, 109, 0.4)',
                boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.12), 0px 32px 48px rgba(0, 0, 0, 0.2)'
              }}
            />
            {/* Title & Subtitle */}
            <div className="flex flex-col justify-center items-start gap-[2px]">
              <h1 
                style={{
                  fontFamily: 'var(--font-bricolage)',
                  fontWeight: 700,
                  fontSize: '20px',
                  lineHeight: '140%',
                  letterSpacing: '-0.04em',
                  color: '#303030'
                }}
              >
                Assignments
              </h1>
              <p 
                className="hidden sm:block"
                style={{
                  fontFamily: 'var(--font-bricolage)',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '140%',
                  letterSpacing: '-0.04em',
                  color: 'rgba(94, 94, 94, 0.55)'
                }}
              >
                Manage and create assignments for your classes.
              </p>
            </div>
          </div>
        </div>

        {/* Filter / Search Bar */}
        <div 
          className="w-full h-14 sm:h-16 bg-white flex items-center justify-between px-3 sm:px-4"
          style={{ borderRadius: '20px' }}
        >
          {/* Left: Filter By */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" style={{ color: '#A9A9A9' }} />
            <span className="hidden sm:inline" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 700, fontSize: '14px', color: '#A9A9A9', letterSpacing: '-0.04em' }}>
              Filter By
            </span>
          </div>

          {/* Right: Search Input */}
          <div 
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 h-10 sm:h-11 w-full max-w-[380px] ml-3"
            style={{
              border: '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '100px'
            }}
          >
            <Search className="w-5 h-5 flex-shrink-0" style={{ color: '#A9A9A9' }} />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Assignment"
              className="flex-1 min-w-0 bg-transparent border-none text-[14px] focus:outline-none placeholder:text-[#A9A9A9]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 700, letterSpacing: '-0.04em', color: '#303030' }}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="hover:text-black">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Grid Container */}
        {filteredAssignments.length === 0 ? (
          <div className="w-full py-16 text-center text-gray-500 font-medium" style={{ fontFamily: 'var(--font-bricolage)' }}>
            No matching assignments found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] w-full">
            {filteredAssignments.map((assignment) => (
              <AssignmentCard 
                key={assignment._id}
                assignment={assignment}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

      </div>

      {/* Bottom Floating CTA Bar */}
      <div 
        className="fixed bottom-3 left-3 right-3 lg:left-[340px] lg:right-6 h-[80px] flex items-center justify-center pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(218,218,218,0) 0%, rgba(218,218,218,0.85) 100%)',
          borderBottomRightRadius: '16px'
        }}
      >
        <Link href="/create" className="pointer-events-auto">
          <button 
            className="flex items-center justify-center gap-1.5 hover:bg-black transition-colors shadow-lg"
            style={{
              background: '#181818',
              borderRadius: '48px',
              padding: '12px 24px',
              width: 'max-content',
              height: '46px'
            }}
          >
            <Plus className="w-5 h-5 text-white" strokeWidth={2.5} />
            <span className="text-white text-[16px] font-medium whitespace-nowrap" style={{ fontFamily: 'var(--font-bricolage)', letterSpacing: '-0.04em' }}>
              Create Assignment
            </span>
          </button>
        </Link>
      </div>

    </main>
  );
}
