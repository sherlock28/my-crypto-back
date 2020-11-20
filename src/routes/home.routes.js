import { Router } from 'express';
import { homeCtrl } from '../controllers/home.ctrl';
import { TokenValidation } from '../middlewares/verify.auth';

const router = Router();

router.post('/calculate', homeCtrl.calculate);
router.get('/quotes', homeCtrl.showQuotes);

export default router;