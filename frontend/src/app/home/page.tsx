"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Sparkles, Users, FolderOpen, ArrowRight, FileText } from "lucide-react";
import { SectionPage } from "@/components/layout/SectionPage";
import { getAssignments } from "@/services/api.service";
import { formatDisplayDate } from "@/lib/date";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState<any[]>([]);

  useEffect(() => {
    let active = true;

    getAssignments()
      .then((data) => {
        if (active) {
          setAssignments(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => {
        if (active) {
          setAssignments([]);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const recentAssignments = assignments.slice(0, 3);

  return (
    <SectionPage
      eyebrow="Overview"
      title="Home dashboard"
      description="Track recent assignments, move into creation, and jump into the most used parts of the workspace."
      action={{ href: "/create", label: "Create assignment" }}
    >
      {loading ? (
        <div className="flex min-h-[240px] items-center justify-center rounded-[24px] bg-white">
          <Loader2 className="h-8 w-8 animate-spin text-[#E56820]" />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-[24px] bg-white p-5" style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.02)' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#EBEBEB] bg-white mb-4">
                <Sparkles className="h-5 w-5 text-[#E56820]" />
              </div>
              <p className="text-[14px] font-semibold tracking-[-0.04em] text-[rgba(94,94,94,0.8)]" style={{ fontFamily: 'var(--font-bricolage)' }}>Assignments</p>
              <p className="mt-1 text-[28px] font-bold tracking-[-0.05em] text-[#303030]" style={{ fontFamily: 'var(--font-bricolage)' }}>{assignments.length}</p>
            </div>
            <div className="rounded-[24px] bg-white p-5" style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.02)' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#EBEBEB] bg-white mb-4">
                <Users className="h-5 w-5 text-[#E56820]" />
              </div>
              <p className="text-[14px] font-semibold tracking-[-0.04em] text-[rgba(94,94,94,0.8)]" style={{ fontFamily: 'var(--font-bricolage)' }}>Groups</p>
              <p className="mt-1 text-[28px] font-bold tracking-[-0.05em] text-[#303030]" style={{ fontFamily: 'var(--font-bricolage)' }}>4</p>
            </div>
            <div className="rounded-[24px] bg-white p-5" style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.02)' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#EBEBEB] bg-white mb-4">
                <FolderOpen className="h-5 w-5 text-[#E56820]" />
              </div>
              <p className="text-[14px] font-semibold tracking-[-0.04em] text-[rgba(94,94,94,0.8)]" style={{ fontFamily: 'var(--font-bricolage)' }}>Library items</p>
              <p className="mt-1 text-[28px] font-bold tracking-[-0.05em] text-[#303030]" style={{ fontFamily: 'var(--font-bricolage)' }}>12</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#4BC26D', border: '4px solid rgba(75, 194, 109, 0.4)', boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.12), 0px 32px 48px rgba(0, 0, 0, 0.2)' }} />
                <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 700, fontSize: '20px', lineHeight: '140%', letterSpacing: '-0.04em', color: '#303030' }}>Latest assignments</span>
              </div>
              <Link href="/" className="text-[14px] font-medium" style={{ fontFamily: 'var(--font-bricolage)', color: '#5E5E5E' }}>
                View all
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {recentAssignments.length === 0 ? (
                <div className="rounded-[24px] bg-white p-5 text-[14px]" style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.02)', fontFamily: 'var(--font-bricolage)', color: 'rgba(94,94,94,0.8)' }}>
                  <FileText className="h-5 w-5 text-[#E56820] mb-3" />
                  No assignments available yet. Use the sidebar to create the first one.
                </div>
              ) : (
                recentAssignments.map((assignment) => (
                  <Link key={assignment._id} href={`/result/${assignment._id}`} className="rounded-[24px] bg-white p-5 transition hover:bg-[#fdfdfd]" style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.02)' }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-[18px] font-bold tracking-[-0.04em] text-[#303030]" style={{ fontFamily: 'var(--font-bricolage)' }}>{assignment.title}</p>
                        <p className="mt-1 text-[14px] text-[rgba(94,94,94,0.8)]" style={{ fontFamily: 'var(--font-bricolage)' }}>Due {formatDisplayDate(assignment.dueDate)}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-[#A9A9A9]" />
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </SectionPage>
  );
}