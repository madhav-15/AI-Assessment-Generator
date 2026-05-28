import { create } from 'zustand';

export interface SectionConfig {
  id: string; // for UI tracking
  name: string;
  questionType: string;
  numberOfQuestions: number;
  marksPerQuestion: number;
  difficulty: string;
}

export interface AssignmentFormData {
  title: string;
  subject: string;
  gradeLevel: string;
  dueDate: string;
  instructions: string;
  uploadedFileText: string;
  sections: SectionConfig[];
}

interface AssessmentStore {
  formData: AssignmentFormData;
  setFormData: (data: Partial<AssignmentFormData>) => void;
  
  currentJobId: string | null;
  currentAssignmentId: string | null;
  jobStatus: 'idle' | 'pending' | 'processing' | 'completed' | 'failed';
  jobMessage: string;
  
  questionPaper: any | null;
  assignmentsCount: number;
  
  setJobState: (state: Partial<AssessmentStore>) => void;
  setQuestionPaper: (paper: any) => void;
  resetForm: () => void;
}

const defaultFormData: AssignmentFormData = {
  title: '',
  subject: '',
  gradeLevel: '',
  dueDate: '',
  instructions: '',
  uploadedFileText: '',
  sections: [
    { id: '1', name: 'Section A', questionType: 'MCQ', numberOfQuestions: 5, marksPerQuestion: 2, difficulty: 'mixed' }
  ]
};

export const useAssessmentStore = create<AssessmentStore>((set) => ({
  formData: defaultFormData,
  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  
  currentJobId: null,
  currentAssignmentId: null,
  jobStatus: 'idle',
  jobMessage: '',
  
  questionPaper: null,
  assignmentsCount: 0,
  
  setJobState: (state) => set(state),
  setQuestionPaper: (paper) => set({ questionPaper: paper }),
  resetForm: () => set({ formData: defaultFormData, currentJobId: null, currentAssignmentId: null, jobStatus: 'idle', jobMessage: '', questionPaper: null, assignmentsCount: 0 })
}));
