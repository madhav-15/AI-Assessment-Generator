import { AssignmentForm } from "@/components/AssignmentForm";

export default function CreatePage() {
  return (
    <main className="flex-1 flex flex-col items-center pb-24">
      {/* Frame 1984077325: Header & Progress Bar wrapper */}
      <div className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-[1103px] mt-2 mb-6 sm:mb-8 px-3 sm:px-4 lg:px-0">
        
        {/* Frame 1984077332: Header Row */}
        <div className="flex items-center gap-4 w-full px-0 sm:px-2">
          {/* Frame 1618872418: Dot + Title Group */}
          <div className="flex items-center gap-3">
            {/* Ellipse 10: Realistic Green Status Dot */}
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{
                background: '#4BC26D',
                border: '4px solid rgba(75, 194, 109, 0.4)',
                boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.12), 0px 32px 48px rgba(0, 0, 0, 0.2)'
              }}
            />
            
            {/* Frame 1984077347: Text Group */}
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
                Create Assignment
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
                Set up a new assignment for your students
              </p>
            </div>
          </div>
        </div>

        {/* Frame 1984077364: Progress Bar Wrapper */}
        <div className="flex flex-col items-center justify-center w-full">
          {/* Frame 1984077355: Line Container */}
          <div className="flex items-center gap-3 w-full max-w-[815px] px-4 sm:px-0">
            {/* Dark left bar (Active step) */}
            <div className="flex-1 h-0 border-[2.5px] border-solid" style={{ borderColor: '#5E5E5E' }} />
            {/* Light right bar (Inactive step) */}
            <div className="flex-1 h-0 border-[2.5px] border-solid" style={{ borderColor: '#DADADA' }} />
          </div>
        </div>
      </div>
      
      <AssignmentForm />
    </main>
  );
}
