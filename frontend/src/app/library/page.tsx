"use client";

import { useMemo, useState } from "react";
import { Search, FileText, Upload, Filter } from "lucide-react";
import { SectionPage } from "@/components/layout/SectionPage";

const libraryItems = [
  { title: "State of Matter Notes", type: "PDF", updated: "2 days ago" },
  { title: "Chapter 5 Worksheet", type: "Image", updated: "5 days ago" },
  { title: "Solar System Reference", type: "PDF", updated: "1 week ago" },
  { title: "Past Exam Pack", type: "PDF", updated: "2 weeks ago" },
];

export default function LibraryPage() {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(
    () => libraryItems.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <SectionPage
      eyebrow="Resources"
      title="My Library"
      description="Browse uploaded material and references that can be reused when creating new assessments."
      action={{ href: "/create", label: "Upload source" }}
    >
      <div className="flex flex-col gap-4">
        <div
          className="w-full h-14 sm:h-16 bg-white flex items-center justify-between px-3 sm:px-4"
          style={{ borderRadius: '20px' }}
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" style={{ color: '#A9A9A9' }} />
            <span className="hidden sm:inline" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 700, fontSize: '14px', color: '#A9A9A9', letterSpacing: '-0.04em' }}>
              Filter By
            </span>
          </div>

          <div
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 h-10 sm:h-11 w-full max-w-[380px] ml-3"
            style={{ border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: '100px' }}
          >
            <Search className="w-5 h-5 shrink-0" style={{ color: '#A9A9A9' }} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search library"
              className="flex-1 min-w-0 bg-transparent border-none text-[14px] focus:outline-none placeholder:text-[#A9A9A9]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 700, letterSpacing: '-0.04em', color: '#303030' }}
            />
          </div>
        </div>

        <div className="rounded-[24px] bg-white p-5" style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.02)' }}>
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-[20px] font-bold tracking-[-0.04em] text-[#303030]" style={{ fontFamily: 'var(--font-bricolage)' }}>Uploaded resources</h2>
              <p className="mt-1 text-[14px] text-[rgba(94,94,94,0.8)]" style={{ fontFamily: 'var(--font-bricolage)' }}>Browse source documents used to create assessments.</p>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#181818] px-4 py-2 text-sm font-medium text-white" style={{ boxShadow: '0px 16px 48px rgba(255,255,255,0.12), 0px 32px 48px rgba(255,255,255,0.2), inset 0px -1px 3.5px rgba(177,177,177,0.6), inset 0px 0px 34.5px rgba(255,255,255,0.25)' }}>
            <Upload className="h-4 w-4" />
            Upload file
            </button>
          </div>
          <div className="grid gap-3 md:grid-cols-2 mt-5">
            {filteredItems.length === 0 ? (
              <div className="rounded-[20px] bg-[#f7f7f7] p-4 text-sm text-[#666]">No resources match your search.</div>
            ) : (
              filteredItems.map((item) => (
                <article key={item.title} className="flex items-center justify-between rounded-[20px] bg-[#f7f7f7] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-[#EBEBEB] shrink-0">
                      <FileText className="h-4 w-4 text-[#1E1E1E]" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-[#303030]" style={{ fontFamily: 'var(--font-bricolage)', letterSpacing: '-0.04em' }}>{item.title}</h2>
                      <p className="text-[14px] text-[rgba(94,94,94,0.8)]" style={{ fontFamily: 'var(--font-bricolage)' }}>{item.type} · Updated {item.updated}</p>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </SectionPage>
  );
}