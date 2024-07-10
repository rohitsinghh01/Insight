import express from 'express';
import {
  searchUsers,
} from '../Controllers/UserController.js'
import { verifyToken } from '../middleware/verifyUser.js';

const userRouter = express.Router();

userRouter.post('/search-users', searchUsers);


export default userRouter;
