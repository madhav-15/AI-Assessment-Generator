"use client";

import Link from "next/link";
import { Plus, Users, ChevronDown } from "lucide-react";
import { SectionPage } from "@/components/layout/SectionPage";

const groups = [
  { name: "Grade 10 Science", members: 32, subject: "Physics / Chemistry / Biology" },
  { name: "Grade 9 English", members: 28, subject: "Grammar / Reading / Writing" },
  { name: "Grade 8 Math", members: 35, subject: "Algebra / Geometry / Data" },
];

export default function GroupsPage() {
  return (
    <SectionPage
      eyebrow="Collaboration"
      title="My Groups"
      description="Organize classes and shared assessment spaces for teachers and students."
      action={{ href: "/create", label: "Create assignment" }}
    >
      <div className="flex flex-col gap-4">
        <div
          className="w-full h-14 sm:h-16 bg-white flex items-center justify-between px-3 sm:px-4"
          style={{ borderRadius: '20px' }}
        >
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" style={{ color: '#A9A9A9' }} />
            <span className="hidden sm:inline" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 700, fontSize: '14px', color: '#A9A9A9', letterSpacing: '-0.04em' }}>
              Filter By
            </span>
          </div>
          <button className="flex items-center gap-2 px-3 sm:px-4 h-10 sm:h-11 rounded-full border border-[rgba(0,0,0,0.2)] bg-white" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 700, fontSize: '14px', color: '#303030', letterSpacing: '-0.04em' }}>
            Grade 10
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <button className="flex min-h-[140px] flex-col justify-center rounded-[24px] bg-white p-5 text-left" style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.02)' }}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#EBEBEB] bg-white">
              <Plus className="h-5 w-5 text-[#1E1E1E]" />
            </div>
            <p className="mt-4 text-[18px] font-bold tracking-[-0.04em] text-[#303030]" style={{ fontFamily: 'var(--font-bricolage)' }}>
              New group
            </p>
            <p className="mt-1 text-[14px] text-[rgba(94,94,94,0.8)]" style={{ fontFamily: 'var(--font-bricolage)' }}>Start a classroom or cohort workspace</p>
          </button>

          {groups.map((group) => (
            <article key={group.name} className="rounded-[24px] bg-white p-5" style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.02)' }}>
              <div className="flex items-center justify-between gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#EBEBEB] bg-white shrink-0">
                  <Users className="h-5 w-5 text-[#1E1E1E]" />
                </div>
                <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#A9A9A9]" style={{ fontFamily: 'var(--font-bricolage)' }}>Active</span>
              </div>
              <h2 className="mt-4 text-[20px] font-bold tracking-[-0.04em] text-[#303030]" style={{ fontFamily: 'var(--font-bricolage)' }}>{group.name}</h2>
              <p className="mt-1 text-[14px] text-[rgba(94,94,94,0.8)]" style={{ fontFamily: 'var(--font-bricolage)' }}>{group.subject}</p>
              <div className="mt-5 flex items-center justify-between">
                <p className="text-[14px] font-semibold tracking-[-0.04em] text-[#303030]" style={{ fontFamily: 'var(--font-bricolage)' }}>{group.members} members</p>
                <Link href="/" className="text-[14px] font-medium text-[#E56820]" style={{ fontFamily: 'var(--font-bricolage)' }}>
                  Open
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionPage>
  );
}