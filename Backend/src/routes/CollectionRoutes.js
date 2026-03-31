import express from 'express';
import { getCollectionItems, getCollections } from '../controllers/collectionController.js';
import validateUser from '../Middlewares/authMiddlewares/validateUser.js';

const CollectionRouter = express.Router();

CollectionRouter.get('/getCollections', validateUser, getCollections);

CollectionRouter.get('/:collectionId/items', validateUser, getCollectionItems);

export default CollectionRouter;
