import { Plus, Minus, X, ChevronDown, Mic } from "lucide-react";
import { AssignmentFormData } from "@/store/assessmentStore";

interface QuestionTypeConfiguratorProps {
  formData: AssignmentFormData;
  setFormData: (data: Partial<AssignmentFormData>) => void;
}

export function QuestionTypeConfigurator({ formData, setFormData }: QuestionTypeConfiguratorProps) {
  const removeSection = (id: string) => {
    setFormData({
      sections: formData.sections.filter(s => s.id !== id)
    });
  };

  const addSection = () => {
    const nextId = `section-${Date.now()}`;
    const newSection = {
      id: nextId,
      name: "New Question Type",
      questionType: "MCQ",
      numberOfQuestions: 5,
      marksPerQuestion: 2,
      difficulty: "medium"
    };
    setFormData({
      sections: [...formData.sections, newSection]
    });
  };

  const updateSectionCount = (id: string, increment: boolean) => {
    const updated = formData.sections.map(s => {
      if (s.id === id) {
        const val = increment ? s.numberOfQuestions + 1 : Math.max(1, s.numberOfQuestions - 1);
        return { ...s, numberOfQuestions: val };
      }
      return s;
    });
    setFormData({ sections: updated });
  };

  const updateSectionMarks = (id: string, increment: boolean) => {
    const updated = formData.sections.map(s => {
      if (s.id === id) {
        const val = increment ? s.marksPerQuestion + 1 : Math.max(1, s.marksPerQuestion - 1);
        return { ...s, marksPerQuestion: val };
      }
      return s;
    });
    setFormData({ sections: updated });
  };

  const totalQuestions = formData.sections.reduce((acc, s) => acc + s.numberOfQuestions, 0);
  const totalMarks = formData.sections.reduce((acc, s) => acc + (s.numberOfQuestions * s.marksPerQuestion), 0);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-bold" style={{ fontFamily: 'var(--font-bricolage)', color: '#303030', letterSpacing: '-0.04em' }}>Question Type</h3>
        
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-16 justify-between items-stretch xl:items-start w-full">
          <div className="flex-1 flex flex-col gap-3 w-full">
            {formData.sections.map((section) => (
              <div key={section.id} className="flex items-center gap-3 w-full xl:max-w-[471px]">
                <div 
                  className="flex-1 h-11 bg-white rounded-full flex items-center justify-between px-5"
                  style={{ boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}
                >
                  <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 500, fontSize: '16px', color: '#303030', letterSpacing: '-0.04em' }}>
                    {section.name}
                  </span>
                  <ChevronDown className="w-4 h-4" style={{ color: '#303030' }} />
                </div>
                <button 
                  type="button" 
                  onClick={() => removeSection(section.id)}
                  className="w-11 h-11 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition flex-shrink-0"
                >
                  <X className="w-4 h-4" style={{ color: '#303030' }} strokeWidth={2.5} />
                </button>
              </div>
            ))}

            <button 
              type="button"
              onClick={addSection}
              className="flex items-center gap-2 self-start mt-2"
            >
              <div className="w-9 h-9 rounded-full bg-[#2B2B2B] flex items-center justify-center flex-shrink-0 hover:bg-black transition">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 700, fontSize: '14px', color: '#303030', letterSpacing: '-0.04em' }}>
                Add Question Type
              </span>
            </button>
          </div>

          <div className="w-full xl:w-[275px] flex flex-col gap-3">
            <div className="flex gap-4 mb-1">
              <span className="flex-1 text-center text-[14px] sm:text-[16px] font-medium" style={{ fontFamily: 'var(--font-bricolage)', color: '#303030', letterSpacing: '-0.04em' }}>No. of Questions</span>
              <span className="w-[100px] text-center text-[14px] sm:text-[16px] font-medium" style={{ fontFamily: 'var(--font-bricolage)', color: '#303030', letterSpacing: '-0.04em' }}>Marks</span>
            </div>

            {formData.sections.map((section) => (
              <div key={section.id} className="flex gap-4 h-11 items-center">
                <div className="flex-1 h-full bg-white rounded-full flex items-center justify-between px-3 border border-gray-100">
                  <button 
                    type="button" 
                    onClick={() => updateSectionCount(section.id, false)}
                    className="text-[#DADADA] hover:text-gray-500 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 500, fontSize: '16px', color: '#303030', letterSpacing: '-0.04em' }}>
                    {section.numberOfQuestions}
                  </span>
                  <button 
                    type="button" 
                    onClick={() => updateSectionCount(section.id, true)}
                    className="text-[#DADADA] hover:text-gray-500 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="w-[100px] h-full bg-white rounded-full flex items-center justify-between px-3 border border-gray-100">
                  <button 
                    type="button" 
                    onClick={() => updateSectionMarks(section.id, false)}
                    className="text-[#DADADA] hover:text-gray-500 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 500, fontSize: '16px', color: '#303030', letterSpacing: '-0.04em' }}>
                    {section.marksPerQuestion}
                  </span>
                  <button 
                    type="button" 
                    onClick={() => updateSectionMarks(section.id, true)}
                    className="text-[#DADADA] hover:text-gray-500 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-1 items-end mt-4 pr-2">
              <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 500, fontSize: '16px', color: '#303030', letterSpacing: '-0.04em', lineHeight: '110%' }}>
                Total Questions : {totalQuestions}
              </span>
              <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 500, fontSize: '16px', color: '#303030', letterSpacing: '-0.04em', lineHeight: '110%' }}>
                Total Marks : {totalMarks}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[16px] font-bold" style={{ fontFamily: 'var(--font-bricolage)', color: '#303030', letterSpacing: '-0.04em' }}>
          Additional Information (For better output)
        </label>
        <div 
          className="w-full h-[102px] flex items-end p-4 gap-[10px]"
          style={{
            background: 'rgba(255, 255, 255, 0.25)',
            border: '1.25px dashed #DADADA',
            borderRadius: '16px'
          }}
        >
          <textarea 
            value={formData.instructions}
            onChange={(e) => setFormData({ instructions: e.target.value })}
            placeholder="e.g. Generate a question paper for 3 hour exam duration..."
            className="flex-1 h-full bg-transparent resize-none border-none focus:outline-none placeholder-gray-400"
            style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 500, fontSize: '14px', color: 'rgba(48, 48, 48, 0.6)', letterSpacing: '-0.04em' }}
          />
          <button 
            type="button"
            className="w-9 h-9 bg-[#F0F0F0] rounded-full flex items-center justify-center flex-shrink-0 hover:bg-gray-200 transition"
            style={{ boxShadow: '0px 10px 32px rgba(0,0,0,0.12), 0px 21px 32px rgba(0,0,0,0.2)' }}
          >
            <Mic className="w-[16px] h-[16px]" style={{ color: '#303030' }} />
          </button>
        </div>
      </div>
    </>
  );
}
