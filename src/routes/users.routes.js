import { Router } from 'express';
import { usersCtrl } from '../controllers/users.ctrl';
import { TokenValidation } from '../middlewares/verify.auth';
import { ValidateFieldUser } from '../middlewares/verify.users';

const router = Router();

router.post('/signup', ValidateFieldUser, usersCtrl.signup);
router.post('/signin', usersCtrl.signin);
router.post('/logout', TokenValidation, usersCtrl.logout);

export default router;