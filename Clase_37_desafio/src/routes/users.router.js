import express from 'express';
import {authToken} from '../utils.js';

// importo un controller
import { getAll, createUser, getById, findByUsername,updateUser, updateByFilter, getRandomUser  } from '../controllers/user.controller.js';

const router = express.Router();

// get
router.get('/', getAll);
router.get('/:userId', authToken, getById);
router.get('/:username',authToken, findByUsername);
router.get('/random', getRandomUser);

// post
router.post('/', createUser);
// put
router.put('/:uid', updateUser);
router.put('/filter', updateByFilter);
 

export default router;