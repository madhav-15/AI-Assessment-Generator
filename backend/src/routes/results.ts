import { Router } from 'express';
import * as resultController from '../controllers/resultController';

const router = Router();

router.get('/:assignmentId', resultController.getResultByAssignmentId);
router.all('/:assignmentId/pdf', resultController.getPdfByAssignmentId);

export default router;
