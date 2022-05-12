require('dotenv').config();

import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';

const app = express();
const PORT = process.env.port || 5000;

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded())

app.get('/', (_req, res) => res.send('hello world'));

app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`SERVER STARTED ON ${PORT}`);
});
