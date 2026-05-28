import { Request, Response, NextFunction } from 'express';
import { Assignment } from '../models/Assignment';
import { addGenerationJob } from '../queues/generationQueue';

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    next(error);
  }
};

export const createAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    
    if (!data.title || !data.subject || !data.gradeLevel || !data.dueDate || !data.questionConfig?.sections?.length) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const assignment = new Assignment({
      ...data,
      status: 'pending',
    });
    await assignment.save();

    const jobId = await addGenerationJob(assignment._id.toString());
    
    assignment.jobId = jobId;
    await assignment.save();

    res.status(201).json({
      assignmentId: assignment._id,
      jobId,
      status: 'pending'
    });
  } catch (error) {
    next(error);
  }
};

export const getAssignments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error) {
    next(error);
  }
};

export const getAssignmentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(assignment);
  } catch (error) {
    next(error);
  }
};

export const deleteAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
