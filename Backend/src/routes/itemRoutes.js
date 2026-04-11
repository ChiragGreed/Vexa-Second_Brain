import express from 'express';
import { saveItem, getItems, getRelatedItems, semanticSearchItems, getSingleItem, resurfaceItems } from '../controllers/itemControllers.js';
import validateUser from '../Middlewares/authMiddlewares/validateUser.js';

const ItemRouter = express.Router();


ItemRouter.post('/save', validateUser, saveItem);

ItemRouter.get('/getItems', validateUser, getItems);

ItemRouter.get("/searchItems", validateUser, semanticSearchItems);

ItemRouter.get("/resurfacing", validateUser, resurfaceItems);

ItemRouter.get('/getRelatedItems/:itemId', validateUser, getRelatedItems);

ItemRouter.get('/:itemId', validateUser, getSingleItem);



export default ItemRouter;

