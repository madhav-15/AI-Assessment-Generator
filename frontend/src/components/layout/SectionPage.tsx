import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ActionLink = {
  href: string;
  label: string;
};

type SectionPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: ActionLink;
  children: React.ReactNode;
};

export function SectionPage({ eyebrow, title, description, action, children }: SectionPageProps) {
  return (
    <main className="flex-1 flex flex-col items-start pb-24 relative min-h-[500px] sm:min-h-[678px] w-full">
      <div className="w-full flex flex-col gap-4 sm:gap-6 px-3 sm:px-4 lg:px-0 mt-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{
                background: '#4BC26D',
                border: '4px solid rgba(75, 194, 109, 0.4)',
                boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.12), 0px 32px 48px rgba(0, 0, 0, 0.2)'
              }}
            />
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
                {title}
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
                {description}
              </p>
              <span
                className="sm:hidden"
                style={{
                  fontFamily: 'var(--font-bricolage)',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '140%',
                  letterSpacing: '-0.04em',
                  color: 'rgba(94, 94, 94, 0.55)'
                }}
              >
                {eyebrow}
              </span>
            </div>
          </div>
          {action && (
            <Link href={action.href} className="hidden sm:inline-flex items-center justify-center gap-[10px] w-auto h-[42px] rounded-full text-white px-5" style={{ background: '#272727', fontFamily: 'var(--font-inter)', fontSize: '16px', fontWeight: 500, letterSpacing: '-0.04em', boxShadow: '0px 16px 48px rgba(255,255,255,0.12), 0px 32px 48px rgba(255,255,255,0.2), inset 0px -1px 3.5px rgba(177,177,177,0.6), inset 0px 0px 34.5px rgba(255,255,255,0.25)' }}>
              {action.label}
              <ArrowRight className="w-[18px] h-[17px]" />
            </Link>
          )}
        </div>

        <div
          className="w-full flex flex-col gap-8"
          style={{
            background: 'rgba(255, 255, 255, 0.5)',
            border: '1.25px solid rgba(255, 255, 255, 0.6)',
            borderRadius: '32px',
            padding: '32px'
          }}
        >
          {children}
        </div>
      </div>
    </main>
  );
}