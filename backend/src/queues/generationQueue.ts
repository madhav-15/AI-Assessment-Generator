import { Queue } from 'bullmq';
import dotenv from 'dotenv';
dotenv.config();

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
};

export const generationQueue = new Queue('generation-queue', {
  connection,
});

export async function addGenerationJob(assignmentId: string) {
  const job = await generationQueue.add('generate', { assignmentId });
  return job.id;
}
