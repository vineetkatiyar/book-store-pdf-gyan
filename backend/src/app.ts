import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import createHttpError, { HttpError } from 'http-errors';
import { errorHandler } from './middleware/globalErrorHndler';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World!' });
});


app.use(errorHandler);

export default app;
