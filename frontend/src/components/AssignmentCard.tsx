"use client";

import { useState } from "react";
import { MoreVertical, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDisplayDate } from "@/lib/date";

interface AssignmentCardProps {
  assignment: {
    _id: string;
    title: string;
    dueDate: string;
    createdAt: string;
  };
  onDelete: (id: string) => void;
}

export function AssignmentCard({ assignment, onDelete }: AssignmentCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const formattedAssigned = formatDisplayDate(assignment.createdAt, "-");
  const formattedDue = formatDisplayDate(assignment.dueDate, "-");

  return (
    <div 
      onClick={() => router.push(`/result/${assignment._id}`)}
      className="relative flex flex-col justify-between w-full cursor-pointer hover:bg-[#FAFAFA] transition-colors"
      style={{
        boxSizing: 'border-box',
        minHeight: '140px',
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '20px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.02)'
      }}
    >
      {/* Top row: Title and More Menu */}
      <div className="flex justify-between items-start w-full gap-2">
        <h3 
          style={{
            fontFamily: 'var(--font-bricolage)',
            fontWeight: 800,
            fontSize: 'clamp(18px, 4vw, 24px)',
            lineHeight: '120%',
            letterSpacing: '-0.04em',
            color: '#303030',
          }}
          className="truncate flex-1 min-w-0"
        >
          {assignment.title}
        </h3>

        {/* More vertical menu */}
        <div className="relative flex-shrink-0">
          <button 
            type="button" 
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          >
            <MoreVertical className="w-6 h-6" style={{ color: '#A9A9A9' }} />
          </button>

          {/* Dropdown Menu (Figma Styled) */}
          {menuOpen && (
            <>
              {/* Overlay background to dismiss */}
              <div className="fixed inset-0 z-40" onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
              }} />
              
              <div 
                className="absolute right-0 mt-2 w-[160px] bg-white z-50 flex flex-col p-2 gap-1"
                style={{
                  boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.2), 0px 32px 48px rgba(0, 0, 0, 0.05)',
                  borderRadius: '16px'
                }}
              >
                {/* View Assignment */}
                <Link 
                  href={`/result/${assignment._id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F6F6F6] text-left transition"
                >
                  <Eye className="w-4 h-4 text-gray-500" />
                  <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 500, fontSize: '14px', color: '#303030', letterSpacing: '-0.04em' }}>
                    View Assignment
                  </span>
                </Link>

                {/* Delete */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(assignment._id);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-left transition w-full"
                >
                  <Trash2 className="w-4 h-4 text-[#C53535]" />
                  <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 500, fontSize: '14px', color: '#C53535', letterSpacing: '-0.04em' }}>
                    Delete
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom row: Assigned Date & Due Date */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-1 sm:gap-0 mt-3">
        <div 
          style={{
            fontFamily: 'var(--font-bricolage)',
            fontSize: '14px',
            lineHeight: '120%',
            letterSpacing: '-0.04em',
          }}
        >
          <span style={{ fontWeight: 800, color: '#303030' }}>Assigned on : </span>
          <span style={{ fontWeight: 500, color: 'rgba(94, 94, 94, 0.8)' }}>{formattedAssigned}</span>
        </div>
        <div 
          style={{
            fontFamily: 'var(--font-bricolage)',
            fontSize: '14px',
            lineHeight: '120%',
            letterSpacing: '-0.04em',
          }}
        >
          <span style={{ fontWeight: 800, color: '#303030' }}>Due : </span>
          <span style={{ fontWeight: 500, color: 'rgba(94, 94, 94, 0.8)' }}>{formattedDue}</span>
        </div>
      </div>
    </div>
  );
}
