import { Router } from 'express';
import { teamController } from './main';

const router = Router();
router.get('/', (req, res) => teamController.list(req, res));

export default router;
