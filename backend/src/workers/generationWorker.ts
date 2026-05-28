import { Worker } from 'bullmq';
import Redis from 'ioredis';
import { Assignment } from '../models/Assignment';
import { QuestionPaper } from '../models/QuestionPaper';
import { generateQuestionPaperData } from '../services/aiService';
import { broadcastStatus } from '../websocket/wsServer';
import { env } from '../config/env';

const connection = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

export const generationWorker = new Worker(
  'generation-queue',
  async (job) => {
    const { assignmentId } = job.data;
    console.log(`Processing job for assignment: ${assignmentId}`);

    try {
      // 1. Update assignment status -> "processing"
      await Assignment.findByIdAndUpdate(assignmentId, { status: 'processing' });
      
      // 2. Broadcast WS event
      broadcastStatus(assignmentId, { type: 'STATUS_UPDATE', status: 'processing', message: 'Starting AI generation...' });

      // 3. Fetch assignment
      const assignment = await Assignment.findById(assignmentId);
      if (!assignment) throw new Error('Assignment not found');

      // 4. Generate AI response and parse
      broadcastStatus(assignmentId, { type: 'STATUS_UPDATE', status: 'processing', message: 'Generating questions (this might take a minute)...' });
      const questionPaperData = await generateQuestionPaperData(assignment);

      // 7. Save QuestionPaper
      const paper = new QuestionPaper({
        assignmentId: assignment._id,
        ...questionPaperData
      });
      await paper.save();

      // 8. Update assignment status -> "completed"
      await Assignment.findByIdAndUpdate(assignmentId, { 
        status: 'completed',
        resultId: paper._id 
      });

      // 9. Broadcast WS event
      broadcastStatus(assignmentId, { type: 'GENERATION_COMPLETE', resultId: paper._id.toString() });

      console.log(`Successfully completed job for assignment: ${assignmentId}`);
    } catch (error: any) {
      console.error(`Job failed for assignment ${assignmentId}:`, error);
      
      await Assignment.findByIdAndUpdate(assignmentId, { status: 'failed' });
      broadcastStatus(assignmentId, { type: 'GENERATION_FAILED', error: error.message });
      throw error; // Rethrow so BullMQ knows it failed
    }
  },
  { connection }
);

generationWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed with error:`, err);
});
