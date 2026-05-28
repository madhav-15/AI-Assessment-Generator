import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { env } from '../config/env';

const connection = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

export const generationQueue = new Queue('generation-queue', {
  connection,
});

export async function addGenerationJob(assignmentId: string) {
  const job = await generationQueue.add('generate', { assignmentId });
  return job.id;
}
