import { Router } from 'express';
import { authController } from './main';

const router = Router();
router.get('/validate', (req, res) => authController.getUserRole(req, res));
router.post('/', (req, res) => authController.login(req, res));

export default router;
