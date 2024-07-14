import ImageTool from '@editorjs/image';

class CustomImageTool extends ImageTool {
  constructor({ data, config, api, readOnly }) {
    super({ data, config, api, readOnly });

    this.data = {
      url: data.url || '',
      caption: data.caption || '',
      withBorder: data.withBorder !== undefined ? data.withBorder : false,
      withBackground:
        data.withBackground !== undefined ? data.withBackground : false,
    };
  }

  render() {
    this.wrapper = document.createElement('div');

    const urlInput = document.createElement('input');
    urlInput.placeholder = 'Paste an image URL...';
    urlInput.classList.add('cdx-input');
    urlInput.style.marginBottom = '10px';

    urlInput.addEventListener('change', (event) => {
      this.uploadByUrl(event.target.value);
    });

    this.wrapper.appendChild(urlInput);
    this.wrapper.appendChild(super.render());

    if (this.data.url) {
      this.showImage();
    }

    return this.wrapper;
  }

  async uploadByUrl(url) {
    try {
      const response = await this.config.uploader.uploadByUrl(url);

      if (response.success && response.file && response.file.url) {
        this.data.url = response.file.url;
        this.data.caption = '';
        this.data.withBorder = false;
        this.data.withBackground = false;

        this.showImage();
      } else {
        console.error('Image upload by URL failed:', response);
      }
    } catch (error) {
      console.error('Error uploading image by URL:', error);
    }
  }

  showImage() {
    if (this.data.url) {
      this.wrapper.innerHTML = '';

      const imageElement = document.createElement('img');
      imageElement.src = this.data.url;
      imageElement.alt = 'Image';
      imageElement.style.maxWidth = '100%';

      this.wrapper.appendChild(imageElement);

      const caption = document.createElement('div');
      caption.contentEditable = true;
      caption.innerHTML = this.data.caption;
      caption.classList.add('cdx-input', 'cdx-input--caption');
      this.wrapper.appendChild(caption);
    }
  }

  save(blockContent) {
    const image = blockContent.querySelector('img');
    const caption = blockContent.querySelector('[contenteditable]');

    const data = {
      file: {
        url: image ? image.src : '',
      },
      caption: caption ? caption.innerHTML : '',
      withBorder: this.data.withBorder,
      withBackground: this.data.withBackground,
      stretched: this.data.stretched,
    };

    // console.log('Saving image data:', data);
    return data;
  }
}

export default CustomImageTool;
