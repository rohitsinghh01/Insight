import express from 'express';
import {
  changePassword,
  getProfile,
  searchUsers,
} from '../Controllers/UserController.js'
import { verifyToken } from '../middleware/verifyUser.js';

const userRouter = express.Router();

userRouter.post('/search-users', searchUsers);
userRouter.post('/get-profile', getProfile);
userRouter.post('/change-password', verifyToken, changePassword);


export default userRouter;
