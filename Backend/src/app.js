import express from 'express';
import cookieParser from 'cookie-parser';
import CollectionRouter from './routes/collectionRoutes.js';
import path from 'path'
import cors from 'cors';
import { fileURLToPath } from "url";

import ItemRouter from './routes/itemRoutes.js';
import GraphRouter from './routes/graphRoutes.js';
import authRoutes from './routes/authRoutes.js';
import IntegrationRouter from './routes/integrationRoute.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const publicFile = path.join(__dirname, "../", "public/dist")

app.use(express.static(publicFile))

app.use(express.json());
app.use(cors({
    origin: 'https://second-brain-td6n.onrender.com',
    credentials: true
}));

app.use(cookieParser());

app.use('/', IntegrationRouter);
app.use('/api/auth', authRoutes);
app.use('/api/items', ItemRouter);
app.use('/api/collections', CollectionRouter);
app.use('/api/knowledgeGraph', GraphRouter);

export default app;