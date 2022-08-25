import { Router } from 'express';
import { leaderController } from './main';

const router = Router();
router.get('/home', (req, res) => leaderController.list(req, res));

export default router;
