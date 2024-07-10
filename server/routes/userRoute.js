import express from 'express';
import {
  getProfile,
  searchUsers,
} from '../Controllers/UserController.js'
import { verifyToken } from '../middleware/verifyUser.js';

const userRouter = express.Router();

userRouter.post('/search-users', searchUsers);
userRouter.post('/get-profile', getProfile);


export default userRouter;
