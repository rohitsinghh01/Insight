import express from 'express';
import {
  createBlog,
  searchBlog,
  latestBlog,
  trendingBlog,
  searchBlogsCount,
  AllLatestBlogCount,
  getBlog,
} from '../Controllers/BlogController.js';
import { verifyToken } from '../middleware/verifyUser.js';



const BlogRouter = express.Router();


BlogRouter.post('/create-blog', verifyToken, createBlog);
BlogRouter.post('/latest-blog', latestBlog);
BlogRouter.get('/trending-blog', trendingBlog);
BlogRouter.post('/search-blogs', searchBlog);
BlogRouter.post('/all-latest-blogs-count', AllLatestBlogCount);
BlogRouter.post('/all-search-blogs-count', searchBlogsCount);
BlogRouter.post('/get-blog', getBlog);

export default BlogRouter;
