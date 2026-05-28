import mongoose, { Schema, Document, Types } from 'mongoose';

export interface SectionConfig {
  name: string;
  questionType: 'MCQ' | 'Short Answer' | 'Long Answer' | 'True/False';
  numberOfQuestions: number;
  marksPerQuestion: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
}

export interface AssignmentDocument extends Document {
  title: string;
  subject: string;
  gradeLevel: string;
  dueDate: Date;
  instructions?: string;
  uploadedFileText?: string;
  questionConfig: {
    sections: SectionConfig[];
  };
  status: 'pending' | 'processing' | 'completed' | 'failed';
  jobId?: string;
  resultId?: Types.ObjectId;
  createdAt: Date;
}

const AssignmentSchema = new Schema<AssignmentDocument>({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  gradeLevel: { type: String, required: true },
  dueDate: { type: Date, required: true },
  instructions: { type: String, default: '' },
  uploadedFileText: { type: String, default: '' },
  questionConfig: {
    sections: [
      {
        name: { type: String, required: true },
        questionType: { type: String, required: true },
        numberOfQuestions: { type: Number, required: true },
        marksPerQuestion: { type: Number, required: true },
        difficulty: { type: String, required: true },
      },
    ],
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending',
  },
  jobId: { type: String },
  resultId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper' },
  createdAt: { type: Date, default: Date.now },
});

export const Assignment = mongoose.model<AssignmentDocument>('Assignment', AssignmentSchema);
