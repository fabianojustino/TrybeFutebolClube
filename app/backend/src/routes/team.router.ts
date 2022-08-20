import { Router } from 'express';
import { teamController } from './main';

const router = Router();
router.get('/', (req, res) => teamController.list(req, res));
router.get('/:id', (req, res) => teamController.getById(req, res));

export default router;
