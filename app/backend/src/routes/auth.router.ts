import { Router } from "express";
import authController from './main';

const router = Router();
router.post('/', (req, res)=> authController.login(req, res))

export default router;