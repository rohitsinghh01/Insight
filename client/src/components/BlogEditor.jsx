import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import logo from '../images/logo.png';
import PageAnimation from '../common/PageAnimation';
import blogbanner from '../images/blogBanner.png';
import { EditorContext } from '../pages/editorPages';
import toast, { Toaster } from 'react-hot-toast';
import { uploadImage } from '../common/cloudinary';
import EditorJS from '@editorjs/editorjs';
import { tools } from '../components/Tools';
import axios from 'axios';
import { UserContext } from '../App';

export default function BlogEditor() {
  const navigate = useNavigate();
  let { blog_id } = useParams();
  let {
    userAuth: { access_token },
  } = useContext(UserContext);
  let {
    blog,
    blog: { title, banner, content, tags, ref, des },
    setBlog,
    textEditor,
    setTextEditor,
    setEditorState,
  } = useContext(EditorContext);

  useEffect(() => {
    if (!textEditor.isReady) {
      setTextEditor(
        new EditorJS({
          holderId: 'textEditor',
          data: Array.isArray(content) ? content[0] : content,
          tools: tools,
          placeholder: "Let's write an awesome story",
        })
      );
    }
  }, []);

  const handleChange = (e) => {
    let img = e.target.files[0];

    if (img) {
      let loadingToast = toast.loading('Uploading...');

      uploadImage(img)
        .then((url) => {
          if (url) {
            toast.dismiss(loadingToast);
            toast.success('Uploaded successfully');
            setBlog({ ...blog, banner: url });
          }
        })
        .catch((err) => {
          toast.dismiss(loadingToast);
          return toast.error(err);
        });
    }
  };

  const handleKeyDown = (e) => {
    // console.log(e);
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleError = (e) => {
    let img = e.target;
    img.src = blogbanner;
  };

  const handleTitleChange = (e) => {
    let input = e.target;
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';

    setBlog({ ...blog, title: input.value });
  };

  const handlePublishEvent = () => {
    if (!banner.length) {
      return toast.error('Upload a blog banner to publish it');
    }
    if (!title.length) {
      return toast.error('Write blog title to publish it');
    }

    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          // console.log(data)
          if (data.blocks.length) {
            setBlog({ ...blog, content: data });
            setEditorState('publish');
          } else {
            return toast.error('Write something in your blog to publish it.');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSaveDraft = (e) => {
    if (e.target.className.includes('disable')) {
      return;
    }
    if (!title.length) {
      return toast.error('Write Blog Title before saving it as draft');
    }

    let loadingToast = toast.loading('Saving Draft...');
    e.target.classList.add('disable');
    if (textEditor.isReady) {
      textEditor.save().then((content) => {
        let blogObj = {
          title,
          banner,
          des,
          content,
          tags,
          draft: true,
        };
        axios
          .post(
            import.meta.env.VITE_FRONTEND_URL + '/create-blog',
            { ...blogObj, id: blog_id },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          )
          .then(() => {
            e.target.classList.remove('disable');
            toast.dismiss(loadingToast);
            toast.success('Saved successfully');
            setTimeout(() => {
              navigate('/dashboard/blogs?tab=draft');
            }, 5000);
          })
          .catch(({ response }) => {
            e.target.classList.remove('disable');
            toast.dismiss(loadingToast);
            return toast.error(response.data.error);
          });
      });
    }
  };
  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='flex-none'>
          <img src={logo} alt='logo img' className='h-30 w-36' />
        </Link>

        <p className='max-md:hidden text-black line-clamp-1 w-full'>
          {title.length ? title : 'New Blog'}
        </p>

        <div className='flex gap-4 ml-auto'>
          <button
            className='btn-dark py-2 bg-primary'
            onClick={handlePublishEvent}
          >
            Publish
          </button>
          <button className='btn-light py-2' onClick={handleSaveDraft}>
            Save Draft
          </button>
        </div>
      </nav>
      <Toaster />
      <PageAnimation>
        <section>
          <div className='mx-auto max-w-[90%] w-full'>
            <div className='relative aspect-video hover:opacity-80 bg-white border-4 border-grey'>
              <label htmlFor='uploadBanner'>
                <img
                  src={banner}
                  alt='Blog Banner'
                  className='z-20'
                  onError={handleError}
                />
                <input
                  type='file'
                  id='uploadBanner'
                  accept='.jpg,.png,.jpeg'
                  hidden
                  onChange={handleChange}
                />
              </label>
            </div>
            <textarea
              defaultValue={title}
              placeholder='Blog Title'
              className='text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40 bg-white'
              onKeyDown={handleKeyDown}
              onChange={handleTitleChange}
            ></textarea>

            <hr className='w-full opacity-10 m-5' />

            <div id='textEditor' className='font-gelasio'></div>
          </div>
        </section>
      </PageAnimation>
    </>
  );
}
