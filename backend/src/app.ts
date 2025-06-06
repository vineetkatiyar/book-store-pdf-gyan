import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { errorHandler } from './middleware/globalErrorHndler';
import userRouter from './user/user.routes';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.use('/api/v1/users', userRouter);

app.use(errorHandler);

export default app;
