import { Router } from 'express';
import { matchController } from './main';

const router = Router();
router.patch('/:id/finish', (req, res) => matchController.update(req, res));
router.post('/', (req, res) => matchController.create(req, res));
router.get('/', (req, res) => matchController.list(req, res));

export default router;
