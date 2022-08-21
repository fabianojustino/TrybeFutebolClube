import { Router } from 'express';
import { matchController } from './main';

const router = Router();
router.get('/', (req, res) => matchController.list(req, res));

export default router;
