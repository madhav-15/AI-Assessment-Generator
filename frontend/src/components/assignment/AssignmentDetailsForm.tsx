import { Calendar } from "lucide-react";
import { formatDisplayDate } from "@/lib/date";
import { GRADE_LEVELS } from "@/constants/assignment.constants";
import { AssignmentFormData } from "@/store/assessmentStore";

interface AssignmentDetailsFormProps {
  formData: AssignmentFormData;
  setFormData: (data: Partial<AssignmentFormData>) => void;
}

export function AssignmentDetailsForm({ formData, setFormData }: AssignmentDetailsFormProps) {
  return (
    <>
      <div className="flex flex-col gap-[2px]">
        <h2 style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 700, fontSize: '20px', lineHeight: '140%', letterSpacing: '-0.04em', color: '#303030' }}>
          Assignment Details
        </h2>
        <p style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 400, fontSize: '14px', lineHeight: '140%', letterSpacing: '-0.04em', color: 'rgba(94, 94, 94, 0.8)' }}>
          Basic information about your assignment
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-[16px] font-bold" style={{ fontFamily: 'var(--font-bricolage)', color: '#303030', letterSpacing: '-0.04em' }}>Assignment Title</label>
          <input 
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ title: e.target.value })}
            placeholder="e.g. Midterm Science Assessment"
            className="w-full h-11 bg-white border border-[#DADADA] rounded-full px-5 text-[16px] focus:outline-none"
            style={{ fontFamily: 'var(--font-bricolage)', letterSpacing: '-0.04em', color: '#303030' }}
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-[16px] font-bold" style={{ fontFamily: 'var(--font-bricolage)', color: '#303030', letterSpacing: '-0.04em' }}>Subject</label>
          <input 
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ subject: e.target.value })}
            placeholder="e.g. Physics"
            className="w-full h-11 bg-white border border-[#DADADA] rounded-full px-5 text-[16px] focus:outline-none"
            style={{ fontFamily: 'var(--font-bricolage)', letterSpacing: '-0.04em', color: '#303030' }}
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-[16px] font-bold" style={{ fontFamily: 'var(--font-bricolage)', color: '#303030', letterSpacing: '-0.04em' }}>Grade Level</label>
          <select 
            value={formData.gradeLevel}
            onChange={(e) => setFormData({ gradeLevel: e.target.value })}
            className="w-full h-11 bg-white border border-[#DADADA] rounded-full px-5 text-[16px] focus:outline-none cursor-pointer"
            style={{ fontFamily: 'var(--font-bricolage)', letterSpacing: '-0.04em', color: '#303030' }}
          >
            <option value="">Select Grade Level</option>
            {GRADE_LEVELS.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[16px] font-bold" style={{ fontFamily: 'var(--font-bricolage)', color: '#303030', letterSpacing: '-0.04em' }}>Due Date</label>
        <div className="relative w-full h-11 bg-white border border-[#DADADA] rounded-full flex items-center justify-between px-5 cursor-pointer text-left overflow-hidden">
          <input 
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ dueDate: e.target.value })}
            onClick={(e) => {
              try {
                if ('showPicker' in HTMLInputElement.prototype) {
                  e.currentTarget.showPicker();
                }
              } catch (err) {}
            }}
            tabIndex={-1}
            onKeyDown={(event) => event.preventDefault()}
            onPaste={(event) => event.preventDefault()}
            aria-label="Choose due date"
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            style={{ fontFamily: 'var(--font-bricolage)' }}
          />
          <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 500, fontSize: '16px', color: formData.dueDate ? '#303030' : '#A9A9A9', letterSpacing: '-0.04em' }}>
            {formData.dueDate ? formatDisplayDate(formData.dueDate) : "DD-MM-YYYY"}
          </span>
          <Calendar className="w-6 h-6" style={{ color: '#2B2B2B' }} />
        </div>
      </div>
    </>
  );
}
