"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAssessmentStore } from "@/store/assessmentStore";
import { createAssignment } from "@/services/api.service";
import { useWebSocket } from "@/hooks/useWebSocket";
import { toast } from "sonner";
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { INITIAL_SECTIONS } from "@/constants/assignment.constants";

import { AssignmentDetailsForm } from "./assignment/AssignmentDetailsForm";
import { FileUploadZone } from "./assignment/FileUploadZone";
import { QuestionTypeConfigurator } from "./assignment/QuestionTypeConfigurator";

export function AssignmentForm() {
  const router = useRouter();
  const { formData, setFormData, setJobState, jobStatus, jobMessage, currentAssignmentId } = useAssessmentStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useWebSocket(currentAssignmentId);

  useEffect(() => {
    if (jobStatus === "completed" && currentAssignmentId) {
      router.push(`/result/${currentAssignmentId}`);
    }
  }, [currentAssignmentId, jobStatus, router]);

  useEffect(() => {
    if (!formData.sections || formData.sections.length <= 1) {
      setFormData({ sections: INITIAL_SECTIONS });
    }
  }, [formData.sections, setFormData]);

  const handleFormSubmit = async () => {
    if (!formData.title || !formData.title.trim()) {
      toast.error("Please provide an assignment title");
      return;
    }
    if (!formData.subject || !formData.subject.trim()) {
      toast.error("Please provide a subject");
      return;
    }
    if (!formData.gradeLevel || !formData.gradeLevel.trim()) {
      toast.error("Please specify a grade level");
      return;
    }
    if (!formData.dueDate) {
      toast.error("Please choose a due date");
      return;
    }
    if (!formData.sections || formData.sections.length === 0) {
      toast.error("Please add at least one question type section");
      return;
    }

    for (const section of formData.sections) {
      if (!section.name || !section.name.trim()) {
        toast.error("Question type name cannot be empty");
        return;
      }
      if (!section.numberOfQuestions || section.numberOfQuestions < 1) {
        toast.error(`Number of questions for "${section.name}" must be at least 1`);
        return;
      }
      if (!section.marksPerQuestion || section.marksPerQuestion < 1) {
        toast.error(`Marks per question for "${section.name}" must be at least 1`);
        return;
      }
    }

    try {
      setIsSubmitting(true);
      toast.info("Submitting assignment generation request...");

      const payload = {
        title: formData.title,
        subject: formData.subject || "General Science",
        gradeLevel: formData.gradeLevel || "Grade 10",
        dueDate: formData.dueDate,
        instructions: formData.instructions,
        uploadedFileText: formData.uploadedFileText,
        questionConfig: {
          sections: formData.sections.map(s => ({
            name: s.name,
            questionType: s.questionType,
            numberOfQuestions: s.numberOfQuestions,
            marksPerQuestion: s.marksPerQuestion,
            difficulty: s.difficulty
          }))
        }
      };

      const res = await createAssignment(payload);
      setJobState({
        currentAssignmentId: res.assignmentId,
        currentJobId: res.jobId,
        jobStatus: "pending",
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to submit assignment");
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4" style={{ height: '400px' }}>
        <Loader2 className="h-12 w-12 animate-spin" style={{ color: '#E56820' }} />
        <h2 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-bricolage)' }}>Generating Assessment...</h2>
        <p className="text-muted-foreground">{jobMessage || "This may take a minute or two."}</p>
        <p className="text-sm font-mono bg-[#F6F6F6] px-3 py-1.5 rounded-lg border border-[#DADADA]">Status: {jobStatus}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-[810px] px-3 sm:px-4 lg:px-0">
      <div 
        className="w-full flex flex-col gap-8"
        style={{
          background: 'rgba(255, 255, 255, 0.5)',
          border: '1.25px solid rgba(255, 255, 255, 0.6)',
          borderRadius: '32px',
          padding: '32px'
        }}
      >
        <div className="flex flex-col gap-6">
          <AssignmentDetailsForm formData={formData} setFormData={setFormData} />
          <FileUploadZone formData={formData} setFormData={setFormData} />
          <QuestionTypeConfigurator formData={formData} setFormData={setFormData} />
        </div>
      </div>

      <div className="flex justify-between items-center w-full">
        <button 
          type="button" 
          onClick={() => router.back()}
          className="flex items-center justify-center gap-1 w-[110px] sm:w-[134px] h-[42px] sm:h-[46px] bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition"
        >
          <ArrowLeft className="w-5 h-5" style={{ color: '#303030' }} />
          <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 500, fontSize: '14px', color: '#303030', letterSpacing: '-0.04em' }}>
            Previous
          </span>
        </button>

        <button 
          type="button" 
          onClick={handleFormSubmit}
          className="flex items-center justify-center gap-1 w-[100px] sm:w-[106px] h-[42px] sm:h-[46px] bg-[#181818] rounded-full hover:bg-black transition"
        >
          <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 500, fontSize: '14px', color: '#FFFFFF', letterSpacing: '-0.04em' }}>
            Continue
          </span>
          <ArrowRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
