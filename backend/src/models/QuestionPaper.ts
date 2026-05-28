import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Question {
  questionNumber: number;
  text: string;
  type: string;
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
  options?: string[];
  answer?: string;
}

export interface PaperSection {
  name: string;
  instruction: string;
  totalMarks: number;
  questions: Question[];
}

export interface QuestionPaperDocument extends Document {
  assignmentId: Types.ObjectId;
  metadata: {
    title: string;
    subject: string;
    totalMarks: number;
    duration: string;
    gradeLevel: string;
  };
  sections: PaperSection[];
  generatedAt: Date;
}

const QuestionPaperSchema = new Schema<QuestionPaperDocument>({
  assignmentId: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
  metadata: {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    totalMarks: { type: Number, required: true },
    duration: { type: String, required: true },
    gradeLevel: { type: String, required: true },
  },
  sections: [
    {
      name: { type: String, required: true },
      instruction: { type: String, required: true },
      totalMarks: { type: Number, required: true },
      questions: [
        {
          questionNumber: { type: Number, required: true },
          text: { type: String, required: true },
          type: { type: String, required: true },
          difficulty: { type: String, required: true },
          marks: { type: Number, required: true },
          options: [{ type: String }],
          answer: { type: String },
        },
      ],
    },
  ],
  generatedAt: { type: Date, default: Date.now },
});

export const QuestionPaper = mongoose.model<QuestionPaperDocument>('QuestionPaper', QuestionPaperSchema);
