import express from 'express';
import { getKnowledgeGraph } from '../controllers/GraphController.js';
import validateUser from '../Middlewares/authMiddlewares/validateUser.js';


const GraphRouter = express.Router();

GraphRouter.get('/getGraph', validateUser, getKnowledgeGraph);


export default GraphRouter;
