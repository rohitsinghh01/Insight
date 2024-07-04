import { useContext, useState,createContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';
import BlogEditor from '../components/BlogEditor';
import PublishForm from '../components/PublishForm';

const blogStructure = {
  title: '',
  banner: '',
  content: [],
  tags: [],
  des: '',
  author: { personal_info: {} },
};

export const EditorContext = createContext({});

const Editor = () => {
  const [blog, setBlog] = useState(blogStructure);
  const [editorState, setEditorState] = useState('editor');
  let {
    userAuth: { access_token },
  } = useContext(UserContext);
  // console.log(access_token)
  return (
    <EditorContext.Provider
      value={{
        blog,
        setBlog,
        editorState,
        setEditorState,
        // textEditor,
        // setTextEditor,
      }}
    >
      {access_token === null ? (
        <Navigate to='/signin' />
      ) : editorState == 'editor' ? (
        <BlogEditor />
      ) : (
        <PublishForm />
      )}
    </EditorContext.Provider>
  );
};
export default Editor;
