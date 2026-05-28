import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAssessmentStore } from '../store/assessmentStore';
import { getResult } from '../services/api.service';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:4000';

export function useWebSocket(assignmentId: string | null) {
  const socketRef = useRef<Socket | null>(null);
  const setJobState = useAssessmentStore((state) => state.setJobState);
  const setQuestionPaper = useAssessmentStore((state) => state.setQuestionPaper);

  useEffect(() => {
    if (!assignmentId) return;

    // Connect to WebSocket with assignmentId as query param
    socketRef.current = io(WS_URL, {
      query: { assignmentId },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Connected to WS for assignment:', assignmentId);
    });

    socket.on('statusUpdate', async (event: any) => {
      console.log('WS Event:', event);

      if (event.type === 'STATUS_UPDATE') {
        setJobState({ jobStatus: event.status, jobMessage: event.message || '' });
      } else if (event.type === 'GENERATION_COMPLETE') {
        setJobState({ jobStatus: 'completed', jobMessage: 'Generation completed!' });
        
        try {
          // Fetch the generated paper
          const paper = await getResult(assignmentId);
          setQuestionPaper(paper);
        } catch (error) {
          console.error('Failed to fetch result after generation:', error);
        }
      } else if (event.type === 'GENERATION_FAILED') {
        setJobState({ jobStatus: 'failed', jobMessage: event.error || 'Generation failed' });
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [assignmentId, setJobState, setQuestionPaper]);
}
