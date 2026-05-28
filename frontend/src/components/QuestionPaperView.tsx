"use client";

interface QuestionPaperViewProps {
  paper: any;
  isPrint?: boolean;
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const config: Record<string, { bg: string; text: string; border: string; label: string }> = {
    easy: { bg: '#E8F5E9', text: '#2E7D32', border: '#A5D6A7', label: 'Easy' },
    medium: { bg: '#FFF3E0', text: '#E65100', border: '#FFCC80', label: 'Moderate' },
    hard: { bg: '#FFEBEE', text: '#C62828', border: '#EF9A9A', label: 'Hard' },
  };
  const c = config[difficulty] || config.medium;

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex-shrink-0"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
    >
      {c.label}
    </span>
  );
}

function MarksBadge({ marks }: { marks: number }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide flex-shrink-0"
      style={{ background: '#F0F0F0', color: '#444', border: '1px solid #E0E0E0' }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/>
      </svg>
      {marks} {marks === 1 ? 'Mark' : 'Marks'}
    </span>
  );
}

export function QuestionPaperView({ paper, isPrint = false }: QuestionPaperViewProps) {
  const { metadata, sections } = paper;

  return (
    <div className={`${isPrint ? 'font-serif text-black' : ''}`} style={{ fontFamily: isPrint ? 'serif' : 'var(--font-bricolage)' }}>
      
      {/* ─── School Header ─── */}
      <div className="text-center pb-5 relative">
        {/* Decorative top accent line */}
        <div className="w-full h-[3px] rounded-full mb-5" style={{ background: 'linear-gradient(90deg, transparent 0%, #2B2B2B 20%, #2B2B2B 80%, transparent 100%)' }} />
        
        <h1
          className="font-bold tracking-tight"
          style={{ fontSize: isPrint ? '22px' : 'clamp(20px, 4vw, 28px)', letterSpacing: '-0.03em', color: '#1c1c1c' }}
        >
          Delhi Public School, Sector-4, Bokaro
        </h1>
        
        {/* Subject & Class pills */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 mt-3 flex-wrap">
          <span 
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] sm:text-[14px] font-semibold"
            style={{ background: '#F5F5F5', color: '#333', border: '1px solid #E8E8E8' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            {metadata.subject}
          </span>
          <span 
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] sm:text-[14px] font-semibold"
            style={{ background: '#F5F5F5', color: '#333', border: '1px solid #E8E8E8' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            Class {metadata.gradeLevel?.replace('Grade ', '')}th
          </span>
        </div>
        
        {/* Double line separator */}
        <div className="mt-5 flex flex-col gap-[3px]">
          <div className="w-full h-[2px]" style={{ background: '#1c1c1c' }} />
          <div className="w-full h-[1px]" style={{ background: '#1c1c1c' }} />
        </div>
      </div>

      {/* ─── Paper Title ─── */}
      <div
        className="mt-6 rounded-2xl px-5 py-4 sm:px-6 sm:py-5"
        style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F7F7F7 100%)', border: '1px solid #ECECEC' }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: '#777' }}>Question Paper</p>
        <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-[-0.04em]" style={{ color: '#1c1c1c' }}>
          {metadata.title || 'Generated Assessment'}
        </h2>
        <p className="mt-2 text-sm sm:text-[15px] leading-relaxed" style={{ color: '#555' }}>
          Structured into sections, with student details, difficulty tags, and marks shown clearly for print or review.
        </p>
      </div>

      {/* ─── Time & Marks Row ─── */}
      <div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 px-4 sm:px-5 mt-3 rounded-xl gap-2 sm:gap-0"
        style={{ background: 'linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 100%)', border: '1px solid #EBEBEB' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#F0F0F0', border: '1px solid #E0E0E0' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <span className="font-semibold text-sm" style={{ color: '#555' }}>
            Time Allowed: <span className="font-bold" style={{ color: '#1c1c1c' }}>{metadata.duration || '45 minutes'}</span>
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#F0F0F0', border: '1px solid #E0E0E0' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round">
              <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
            </svg>
          </div>
          <span className="font-semibold text-sm" style={{ color: '#555' }}>
            Maximum Marks: <span className="font-bold" style={{ color: '#1c1c1c' }}>{metadata.totalMarks}</span>
          </span>
        </div>
      </div>

      {/* ─── General Instructions ─── */}
      <div className="mt-5 px-1">
        <p className="text-sm font-bold flex items-center gap-2" style={{ color: '#1c1c1c' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          General Instructions:
        </p>
        <ul className="text-sm mt-1.5 space-y-1 pl-4" style={{ color: '#444', listStyleType: 'disc' }}>
          <li>All questions are compulsory unless stated otherwise.</li>
          <li>Read each question carefully before attempting.</li>
          <li>Marks for each question are indicated against it.</li>
        </ul>
      </div>

      {/* ─── Student Details Block ─── */}
      <div
        className="mt-5 p-4 sm:p-5 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-4"
        style={{ background: 'linear-gradient(135deg, #FAFAFA 0%, #F7F7F7 100%)', border: '1.5px dashed #D0D0D0' }}
      >
        <div className="flex items-end gap-2">
          <span className="font-bold text-sm whitespace-nowrap" style={{ color: '#444' }}>Name:</span>
          <div className="flex-1 border-b-2 border-dashed" style={{ borderColor: '#BBB', minWidth: '80px' }}>&nbsp;</div>
        </div>
        <div className="flex items-end gap-2">
          <span className="font-bold text-sm whitespace-nowrap" style={{ color: '#444' }}>Roll No:</span>
          <div className="flex-1 border-b-2 border-dashed" style={{ borderColor: '#BBB', minWidth: '60px' }}>&nbsp;</div>
        </div>
        <div className="flex items-end gap-2">
          <span className="font-bold text-sm whitespace-nowrap" style={{ color: '#444' }}>Section:</span>
          <div className="flex-1 border-b-2 border-dashed" style={{ borderColor: '#BBB', minWidth: '40px' }}>&nbsp;</div>
        </div>
      </div>

      {/* ─── Question Sections ─── */}
      <div className="mt-8 sm:mt-10 space-y-8 sm:space-y-10">
        {sections?.map((section: any, idx: number) => (
          <div
            key={idx}
            style={isPrint ? { pageBreakInside: 'avoid' } : {}}
          >
            <div className="overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              {/* Section Header */}
              <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5" style={{ background: 'linear-gradient(135deg, #2B2B2B 0%, #3D3D3D 100%)' }}>
                <div
                  className="flex items-center justify-center rounded-xl font-bold text-sm"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    color: '#FFFFFF',
                    width: '40px',
                    height: '40px',
                    flexShrink: 0,
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  {String.fromCharCode(65 + idx)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base sm:text-lg text-white" style={{ letterSpacing: '-0.02em' }}>
                    {section.name}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {section.instruction} • {section.totalMarks} Marks
                  </p>
                </div>
              </div>

              {/* Questions */}
              <div className="p-4 sm:p-5">
                <div className="space-y-3 sm:space-y-4">
                  {section.questions?.map((q: any, qIdx: number) => (
                    <div
                      key={qIdx}
                      className="flex gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl transition-all hover:shadow-sm"
                      style={{
                        background: qIdx % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                        border: '1px solid #F0F0F0',
                        ...(isPrint ? { pageBreakInside: 'avoid' } : {}),
                      }}
                    >
                      {/* Question Number */}
                      <span
                        className="font-bold text-sm flex-shrink-0 mt-0.5 w-7 sm:w-8 h-7 sm:h-8 rounded-lg flex items-center justify-center"
                        style={{ background: '#F5F5F5', color: '#666', border: '1px solid #EBEBEB', fontSize: '12px' }}
                      >
                        {q.questionNumber}
                      </span>

                      {/* Question Body */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] sm:text-[15px] leading-relaxed" style={{ color: '#1c1c1c' }}>
                          {q.text}
                        </p>

                        {q.options && q.options.length > 0 && (
                          <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {q.options.map((opt: string, oIdx: number) => (
                              <div
                                key={oIdx}
                                className="flex items-center gap-2 py-1.5 px-3 rounded-lg text-sm"
                                style={{ background: '#F8F8F8', color: '#333', border: '1px solid #F0F0F0' }}
                              >
                                <span className="font-bold w-5 h-5 rounded-full flex items-center justify-center text-[11px] flex-shrink-0" style={{ background: '#EBEBEB', color: '#666' }}>
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span>{opt.replace(/^[A-Da-d][.)]\s*/, '')}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-2 mt-3">
                          <DifficultyBadge difficulty={q.difficulty} />
                          <MarksBadge marks={q.marks} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── End of Paper ─── */}
      <div className="text-center mt-10 sm:mt-12 pt-5 relative">
        {/* Double line separator */}
        <div className="flex flex-col gap-[3px] mb-4">
          <div className="w-full h-[1px]" style={{ background: '#1c1c1c' }} />
          <div className="w-full h-[2px]" style={{ background: '#1c1c1c' }} />
        </div>
        <span
          className="font-bold text-xs sm:text-sm"
          style={{ color: '#555', letterSpacing: '0.15em' }}
        >
          — END OF QUESTION PAPER —
        </span>
      </div>

      {/* ─── Answer Key (if answers exist) ─── */}
      {sections?.[0]?.questions?.[0]?.answer && (
        <div className="mt-8 p-4 sm:p-5 rounded-xl" style={{ background: 'linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 100%)', border: '1.5px solid #EBEBEB' }}>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: '#1c1c1c' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Answer Key
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {sections.map((section: any) =>
              section.questions?.map((q: any) =>
                q.answer ? (
                  <div key={q.questionNumber} className="flex items-center gap-2 text-sm p-2 rounded-lg" style={{ background: '#FFFFFF', border: '1px solid #EBEBEB' }}>
                    <span className="font-bold text-xs w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: '#F0F0F0', color: '#666' }}>
                      {q.questionNumber}
                    </span>
                    <span className="truncate" style={{ color: '#333' }}>{q.answer}</span>
                  </div>
                ) : null
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
