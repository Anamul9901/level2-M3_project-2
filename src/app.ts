import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlwares/globalErrorHandler';
import notFound from './app/middlwares/notFound';
import router from './app/routes';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routers
// router.use('/api/v1/users', UserRoutes)
// router.use('/api/v1/students', StudentRoutes);
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  // Promise.reject()   // server theke rejection error handle kora ase
  const a = 10;
  res.send(a);
};

app.get('/', test);

app.use(globalErrorHandler);

//not Found
app.use(notFound);

export default app;
