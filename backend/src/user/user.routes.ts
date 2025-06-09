import  {Router} from 'express';
import user from './user.controllers';
import { validate } from '../middleware/validate';
import { signInSchema, signUpSchema } from '../validations/user.validations';

const router = Router();

router.post("/register",validate(signUpSchema) ,user.registerUser);
router.post("/signin", validate(signInSchema), user.signInUser)

export default router;