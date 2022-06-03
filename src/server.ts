import express, { Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import cors from 'cors';
import 'dotenv/config';

import { router } from './routes';
import connectDB from './database';


// configuração do express
const app = express();
app.use(express.json());
app.use(cors());

//conect com db
connectDB();

app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
  if(err instanceof Error){
    //Se é instancia do tipo erro
    return res.status(400).json({
      error: err.message
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
});

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'not request'});
})

app.use(router);

app.listen(process.env.API_PORT || 1333, () => console.log('Server Online'));