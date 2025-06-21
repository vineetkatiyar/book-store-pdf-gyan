import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { errorHandler } from './middleware/globalErrorHndler';
import userRouter from './user/user.routes';
import bookRouter from './books/book.router';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.use('/api/v1/users', userRouter);
app.use("/api/books", bookRouter)

app.use(errorHandler);

export default app;
