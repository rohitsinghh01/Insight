import express from 'express';
import {
  createBlog
} from '../Controllers/BlogController.js';
import { verifyToken } from '../middleware/verifyUser.js';


const BlogRouter = express.Router();
BlogRouter.post('/create-blog', verifyToken, createBlog);
export default BlogRouter;