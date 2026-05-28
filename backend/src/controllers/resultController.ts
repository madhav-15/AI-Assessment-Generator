import { Request, Response, NextFunction } from 'express';
import { QuestionPaper } from '../models/QuestionPaper';
import { generatePDF } from '../services/pdfService';
import { env } from '../config/env';

export const getResultByAssignmentId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const paper = await QuestionPaper.findOne({ assignmentId: req.params.assignmentId });
    if (!paper) {
      return res.status(404).json({ error: 'Result not found' });
    }
    res.json(paper);
  } catch (error) {
    next(error);
  }
};

export const getPdfByAssignmentId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { assignmentId } = req.params;
    
    // We can also extract this FRONTEND_URL to env schema, but let's just default it
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resultUrl = `${frontendUrl}/result/${assignmentId}?print=true`;
    
    const pdfBuffer = await generatePDF(resultUrl);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=assessment-${assignmentId}.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    next(error);
  }
};
