import { AssignmentDocument } from '../models/Assignment';
import { QuestionPaperDocument, PaperSection, Question } from '../models/QuestionPaper';

export function buildPrompt(assignment: AssignmentDocument): string {
  const sectionsText = assignment.questionConfig.sections.map(s => `
- ${s.name}: ${s.numberOfQuestions} ${s.questionType} questions, ${s.marksPerQuestion} marks each.`).join('');

  return `You are an expert educator creating a formal examination paper.

Subject: ${assignment.subject}
Grade Level: ${assignment.gradeLevel}
Additional Instructions: ${assignment.instructions || 'None'}
${assignment.uploadedFileText ? `Reference Material:\n${assignment.uploadedFileText}` : ""}

Generate a complete question paper with the following sections:${sectionsText}

Return ONLY a valid JSON object. No markdown, no explanation, no extra text.

Required JSON structure:
{
  "metadata": {
    "title": "...",
    "subject": "...",
    "totalMarks": <number>,
    "duration": "...",
    "gradeLevel": "..."
  },
  "sections": [
    {
      "name": "Section A",
      "instruction": "Attempt all questions",
      "totalMarks": <number>,
      "questions": [
        {
          "questionNumber": 1,
          "text": "...",
          "type": "MCQ",
          "difficulty": "easy",
          "marks": 2,
          "options": ["A. ...", "B. ...", "C. ...", "D. ..."]
        }
      ]
    }
  ]
}

Rules:
- questionNumber must be sequential per section
- difficulty must be exactly "easy", "medium", or "hard"
- Ensure a balanced mix of "easy", "medium", and "hard" questions across the paper unless instructed otherwise
- For MCQ always include options array
- For True/False include options: ["True", "False"]
- Do not include answers unless specified`;
}

export function parseResponse(rawAI: string): any {
  // Strip markdown code fences if present
  let cleanJson = rawAI.trim();
  if (cleanJson.startsWith('\`\`\`')) {
    const firstNewline = cleanJson.indexOf('\n');
    const lastBackticks = cleanJson.lastIndexOf('\`\`\`');
    if (firstNewline !== -1 && lastBackticks !== -1) {
      cleanJson = cleanJson.substring(firstNewline + 1, lastBackticks).trim();
    }
  }

  try {
    const parsed = JSON.parse(cleanJson);
    
    // Validate basics
    if (!parsed.metadata || !parsed.sections || !Array.isArray(parsed.sections)) {
      throw new Error('Invalid schema: Missing metadata or sections array');
    }

    // Normalize and calculate totals
    let totalMarks = 0;
    parsed.sections.forEach((section: any) => {
      let sectionTotal = 0;
      section.questions.forEach((q: any) => {
        // Normalize difficulty
        if (q.difficulty) {
          q.difficulty = q.difficulty.toLowerCase();
          if (!['easy', 'medium', 'hard'].includes(q.difficulty)) {
            q.difficulty = 'medium';
          }
        }
        sectionTotal += (Number(q.marks) || 0);
      });
      section.totalMarks = sectionTotal;
      totalMarks += sectionTotal;
    });

    parsed.metadata.totalMarks = totalMarks;
    return parsed;
  } catch (error) {
    throw new Error('Failed to parse AI response as valid JSON: ' + (error as Error).message);
  }
}
