"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useAssessmentStore } from "@/store/assessmentStore";
import { getResult, getPdfUrl, createAssignment } from "@/services/api.service";
import { QuestionPaperView } from "@/components/QuestionPaperView";
import { Download, RefreshCw, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

async function fetchAssignmentStatus(assignmentId: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  const response = await fetch(`${API_URL}/assignments/${assignmentId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch assignment status');
  }

  return response.json();
}

export default function ResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = params.id as string;
  const isPrint = searchParams.get("print") === "true";
  
  const { questionPaper, setQuestionPaper, setJobState } = useAssessmentStore();
  const [loading, setLoading] = useState(!questionPaper || questionPaper.assignmentId !== id);
  const [error, setError] = useState("");
  const [regenerating, setRegenerating] = useState(false);
  const [waitingMessage, setWaitingMessage] = useState('Loading result...');

  useEffect(() => {
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    const loadResult = async () => {
      if ((questionPaper && questionPaper.assignmentId === id) || !id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await getResult(id);
        if (cancelled) return;

        setQuestionPaper(data);
        setError("");
        setLoading(false);
        setWaitingMessage('Loading result...');
      } catch (err: any) {
        if (cancelled) return;

        const message = err?.message || 'Failed to fetch result';
        const isNotFound = /result not found/i.test(message);

        if (isNotFound) {
          try {
            const assignment = await fetchAssignmentStatus(id);
            if (cancelled) return;

            if (assignment?.status === 'failed') {
              setError('Generation failed for this assignment. Please regenerate or go back to assignments.');
              setLoading(false);
              return;
            }

            setWaitingMessage('Generating paper... please wait.');
            retryTimer = setTimeout(loadResult, 2000);
            return;
          } catch {
            setWaitingMessage('Result not ready yet. Retrying...');
            retryTimer = setTimeout(loadResult, 2000);
            return;
          }
        }

        setError(message);
        setLoading(false);
      }
    };

    loadResult();

    return () => {
      cancelled = true;
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
    };
  }, [id, questionPaper, setQuestionPaper]);

  const handleRegenerate = async () => {
    try {
      setRegenerating(true);
      toast.info("Regenerating question paper...");

      // Fetch the original assignment to get its config
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const assignmentRes = await fetch(`${API_URL}/assignments/${id}`);
      if (!assignmentRes.ok) throw new Error("Failed to fetch assignment data");
      const assignment = await assignmentRes.json();

      // Re-submit with the same config
      const payload = {
        title: assignment.title,
        subject: assignment.subject,
        gradeLevel: assignment.gradeLevel,
        dueDate: assignment.dueDate,
        instructions: assignment.instructions,
        uploadedFileText: assignment.uploadedFileText,
        questionConfig: assignment.questionConfig,
      };

      const res = await createAssignment(payload);
      setQuestionPaper(null);
      setJobState({
        currentAssignmentId: res.assignmentId,
        currentJobId: res.jobId,
        jobStatus: "pending",
      });

      // Navigate to new result
      router.push(`/result/${res.assignmentId}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to regenerate");
    } finally {
      setRegenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      toast.info("Generating PDF... This may take a moment.");
      const pdfUrl = getPdfUrl(id);
      
      const res = await fetch(pdfUrl, { method: 'POST' });
      if (!res.ok) throw new Error("PDF generation failed");
      
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `assessment-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success("PDF downloaded successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to download PDF");
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 gap-3">
        <Loader2 className="w-10 h-10 animate-spin" style={{ color: '#E56820' }} />
        <p style={{ fontFamily: 'var(--font-bricolage)', color: '#5E5E5E' }}>{waitingMessage}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 gap-3">
        <p className="text-red-500 font-semibold" style={{ fontFamily: 'var(--font-bricolage)' }}>Error: {error}</p>
        <Link href="/">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#181818] text-white rounded-full text-sm font-medium hover:bg-black transition" style={{ fontFamily: 'var(--font-bricolage)' }}>
            <ArrowLeft className="w-4 h-4" /> Back to Assignments
          </button>
        </Link>
      </div>
    );
  }

  if (!questionPaper) return null;

  // Print mode — clean layout for PDF generation
  if (isPrint) {
    return (
      <div id="pdf-paper" className="bg-white text-black p-8 max-w-4xl mx-auto font-serif">
        <QuestionPaperView paper={questionPaper} isPrint={true} />
      </div>
    );
  }

  return (
    <main className="w-full max-w-5xl mx-auto relative mt-4 px-4 md:px-0">
      
      {/* Dark background wrapper */}
      <div className="bg-[#4d4d4d] rounded-[24px] md:rounded-[32px] p-4 md:p-6 shadow-xl mb-12 border-4 md:border-[6px] border-[#6b6b6b]">
        
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 px-2 md:px-4">
          <h2 
            className="text-white font-bold text-base md:text-lg leading-snug max-w-3xl"
            style={{ fontFamily: 'var(--font-bricolage)', letterSpacing: '-0.03em' }}
          >
            Here is your customized question paper for {questionPaper.metadata?.subject || 'your subject'}:
          </h2>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Regenerate */}
            <button 
              onClick={handleRegenerate}
              disabled={regenerating}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition border border-white/30 hover:bg-white/10 disabled:opacity-50"
              style={{ color: '#FFFFFF', fontFamily: 'var(--font-bricolage)' }}
            >
              <RefreshCw className={`w-4 h-4 ${regenerating ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{regenerating ? 'Regenerating...' : 'Regenerate'}</span>
            </button>
            
            {/* Download PDF */}
            <button 
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-white text-[#2b2b2b] hover:bg-zinc-100 transition rounded-full px-4 md:px-5 py-2 text-sm font-semibold"
              style={{ fontFamily: 'var(--font-bricolage)' }}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
          </div>
        </div>

        {/* White Paper Container */}
        <div className="bg-white rounded-[16px] md:rounded-[24px] p-6 md:p-10 lg:p-14 shadow-md text-[#1c1c1c]">
          <QuestionPaperView paper={questionPaper} />
        </div>
        
      </div>
    </main>
  );
}
