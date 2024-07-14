import List from '@editorjs/list';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import Embed from '@editorjs/embed';
import InlineCode from '@editorjs/inline-code';
import CustomImageTool from './CustomImageTool';
import { uploadImage, uploadImageByUrl } from '../common/cloudinary';

const uploadImageByURL = async (url) => {
  try {
    const imageUrl = await uploadImageByUrl(url);
    return {
      success: 1,
      file: { url: imageUrl },
    };
  } catch (error) {
    console.error('Error uploading image by URL:', error);
    return {
      success: 0,
      file: { url: '' },
    };
  }
};

const uploadImageByFile = async (file) => {
  try {
    const url = await uploadImage(file);
    return {
      success: 1,
      file: { url },
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return {
      success: 0,
      file: { url: '' },
    };
  }
};

export const tools = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
  },
  image: {
    class: CustomImageTool,
    config: {
      uploader: {
        uploadByFile: uploadImageByFile,
        uploadByUrl: uploadImageByURL,
      },
    },
  },
  marker: Marker,
  header: {
    class: Header,
    config: {
      placeholder: 'Type Heading ....',
      levels: [2, 3, 4],
      defaultLevel: 2,
    },
  },
  inlineCode: InlineCode,
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
};

