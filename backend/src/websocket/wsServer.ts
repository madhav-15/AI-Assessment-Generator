import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer;

export function initWebSocketServer(server: HttpServer) {
  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    const { assignmentId } = socket.handshake.query;
    
    if (assignmentId) {
      // Join a room specific to this assignment
      socket.join(assignmentId as string);
      console.log(`Socket ${socket.id} joined room ${assignmentId}`);
    }

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
  });
}

export function broadcastStatus(assignmentId: string, event: { type: string; [key: string]: any }) {
  if (io) {
    io.to(assignmentId).emit('statusUpdate', event);
  }
}
