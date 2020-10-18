import path from 'path';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import 'express-async-errors';

import './database/connection';
import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(cors());
// Em produção colocar a prop "origin" e definir o endereço do nosso front-end

app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
// dirname -> server.ts
app.use(errorHandler);

app.listen(process.env.PORT || 3333);