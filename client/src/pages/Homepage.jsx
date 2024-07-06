import React, { useEffect, useState } from 'react';
import PageAnimation from '../common/PageAnimation';
import InPageNavigaion, { activeTabRef } from '../components/Inpage-navigation';
import BlogPostCard from '../components/BlogPostCard';
import MinimalBlogPostCard from '../components/MinimalBlogPostCard';
import Loader from '../components/Loader';
import axios from 'axios';

const Home = () => {
  let [pageState, setPageState] = useState('home');
  let [blogs, setBlogs] = useState(null);
  let [trendingBlogs, setTrendingBlogs] = useState(null);
  
  
  const fetchLatestBlogs = ({ page = 1 }) => {
    axios
      .get(import.meta.env.VITE_FRONTEND_URL + '/latest-blog', { page })
      .then(async ({ data }) => {
        // console.log(data.blogs)

        // console.log(formateData)
        setBlogs(data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const fetchTrendingBlogs = () => {
    axios
      .get(import.meta.env.VITE_FRONTEND_URL + '/trending-blog')
      .then(({ data }) => {
        // console.log(data.blogs);
        setTrendingBlogs(data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  useEffect(() => {
    activeTabRef.current.click();
    if (pageState === 'home') fetchLatestBlogs({ page: 1 });
    else {
      //  fetchBlogByCategory({ page: 1 });
    }
    if (!trendingBlogs) fetchTrendingBlogs();
  }, [pageState]);



  return (
    <PageAnimation>
      <section className='h-cover flex justify-center gap-10'>
        {/* latest blog */}
        <div className='w-full'>
          <InPageNavigaion
            routes={[pageState, 'trending blog']}
            defaultHidden={['trending blog']}
          >
            <>
              {blogs === null ? (
                <Loader />
              ) : (
                blogs.map((blog, i) => {
                  return (
                    <PageAnimation
                      key={i}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    >
                      <BlogPostCard
                        content={blog}
                        author={blog.author.personal_info}
                      />
                    </PageAnimation>
                  );
                })
              )}
            </>
            <>
              {trendingBlogs === null ? (
                <Loader />
              ) : (
                trendingBlogs.map((blog, i) => {
                  return (
                    <PageAnimation
                      key={i}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    >
                      <MinimalBlogPostCard blog={blog} index={i} />
                    </PageAnimation>
                  );
                })
              )}
            </>
          </InPageNavigaion>
        </div>
        {/* filter and trending */}
      </section>
    </PageAnimation>
  );
};

export default Home;
