export const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append('image', image);
    const res = await fetch(
      `${import.meta.env.VITE_FRONTEND_URL}/upload-image`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await res.json();
    return data.url;
  } catch (err) {
    return err;
  }
};


export const uploadImageByUrl = async (imageUrl) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_FRONTEND_URL}/upload-image-url`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      }
    );
    const data = await res.json();
    return data.url;
  } catch (err) {
    return err;
  }
};
