import Blog from '../models/Blog.js';
import User from '../models/User.js';
import { nanoid } from 'nanoid';
import ErrorHanlder from '../utils/ErrorHandler.js';


export const createBlog = async (req, res, next) => {
  try {
    let authorId = req.user;
    let { title, des, banner, tags, content, draft, id } = req.body;
    if (!title.length)
      return res
        .status(403)
        .json({
          error: `You must provide a title to ${
            draft === true ? 'Publish' : 'Save'
          } a blog`,
        });
    if (!draft) {
      if (!content)
        return next(
          new ErrorHanlder(
            403,
            'You must proivide some content to publish your blog'
          )
        );
      if (!des.length || des.length > 200)
        return res
          .status(403)
          .json({
            error: 'You must provide description under 200 charactors long',
          });
      if (!banner.length) {
        return res
          .status(403)
          .json({ error: 'You must Provide blog banner to publish it' });
      }
      if (!content.blocks.length) {
        return next(
          new ErrorHanlder(403, 'There must be some content to publish blog')
        );
      }
      if (!tags.length || tags.length > 10) {
        return next(
          new ErrorHanlder(
            403,
            'Provide tags in order to publish the blog, maximum 10'
          )
        );
      }
    }
    tags = tags.map((tag) => tag.toLowerCase());

    let blog_id =
      id ||
      title
        .replace(/[^a-zA-Z0-9]/g, ' ')
        .replace(/\s+/g, '-')
        .trim() + nanoid();

    if (id) {
      Blog.findOneAndUpdate(
        { blog_id },
        { title, des, banner, content, tags, draft: draft ? draft : false }
      )
        .then((blog) => {
          return res.status(200).json({ id: blog_id });
        })
        .catch((err) => {
          return res.status(500).json({ error: err.message });
        });
    } else {
      let blog = new Blog({
        title,
        des,
        banner,
        content,
        tags,
        author: authorId,
        blog_id,
        draft: Boolean(draft),
      });
      blog
        .save()
        .then((blog) => {
          let incrementVal = draft ? 0 : 1;
          User.findOneAndUpdate(
            { _id: authorId },
            {
              $inc: { 'account_info.total_posts': incrementVal },
              $push: { blogs: blog._id },
            }
          )
            .then((user) => {
              return res.status(200).json({ id: blog.blog_id });
            })
            .catch((err) => {
              return next(
                new ErrorHanlder(500, 'Failed to update total posts number')
              );
            });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  } catch (error) {
    return next(new ErrorHanlder(500, error.message));
  }
};
