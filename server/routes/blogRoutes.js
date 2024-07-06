import express from 'express';
import {
  createBlog
} from '../Controllers/BlogController.js';
import { latestBlog } from '../Controllers/BlogController.js';
import { verifyToken } from '../middleware/verifyUser.js';


const BlogRouter = express.Router();


BlogRouter.post('/create-blog', verifyToken, createBlog);
BlogRouter.get('/latest-blog', latestBlog);


export default BlogRouter;