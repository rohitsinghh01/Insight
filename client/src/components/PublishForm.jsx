import React, { useContext } from 'react';
import PageAnimation from './../common/PageAnimation';
import { toast, Toaster } from 'react-hot-toast';
import { EditorContext } from '../pages/editorPages';
export default function PublishForm() {
  let { setEditorState } = useContext(EditorContext);

  const handleClose = () => {
    setEditorState('editor');
  };
  return (
    <PageAnimation>
      <section>
        <Toaster />
        <button>
          <button
            className='w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]'
            onClick={handleClose}
          >
            <i className='fi fi-br-cross'></i>
          </button>
        </button>
      </section>
    </PageAnimation>
  );
}
