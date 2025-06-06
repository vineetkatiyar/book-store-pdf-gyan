import  {Router} from 'express';
import user from './user.controllers';
import { validate } from '../middleware/validate';
import { signUpSchema } from '../validations/user.validations';

const router = Router();

router.post("/register",validate(signUpSchema) ,user.registerUser)

export default router;