import {
  Alert,
  Button,
  Label,
  Modal,
  TextInput,
  Select
} from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageError, setImageError] = useState(false);

  const navigate = useNavigate();

  const handleImagePreview = (url) => {
    const img = new Image();
    img.onload = () => {
      setImageError(false);
      setPreviewUrl(url);
    };
    img.onerror = () => {
      setImageError(true);
      setPreviewUrl('');
    };
    img.src = url;
  };

  const handleSaveImage = () => {
    if (!imageError && previewUrl) {
      setFormData({ ...formData, image: previewUrl });
      setShowImageModal(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </Select>
        </div>

        <div className='flex items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            outline
            onClick={() => {
              setImageUrlInput(formData.image || '');
              setPreviewUrl('');
              setShowImageModal(true);
            }}
          >
            Paste Image URL
          </Button>
        </div>

        {imageError && <Alert color='failure'>Invalid image URL</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='uploaded preview'
            className='w-full h-72 object-cover'
          />
        )}

        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>

      {/* Image URL modal */}
      <Modal show={showImageModal} onClose={() => setShowImageModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='flex flex-col gap-4'>
            <h3 className='text-center text-lg font-semibold'>Paste Image URL</h3>
            <Label htmlFor='imageUrl'>Image URL</Label>
            <TextInput
              id='imageUrl'
              type='url'
              value={imageUrlInput}
              onChange={(e) => {
                setImageUrlInput(e.target.value);
                handleImagePreview(e.target.value);
              }}
              placeholder='https://example.com/image.jpg'
            />
            <div className='w-24 h-24 self-center overflow-hidden rounded border'>
              <img
                src={previewUrl}
                alt='Preview'
                className='w-full h-full object-cover'
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '';
                }}
              />
            </div>
            {imageError && <Alert color='failure'>Invalid image URL</Alert>}
            <div className='flex justify-center gap-4 mt-4'>
              <Button color='success' onClick={handleSaveImage} disabled={imageError || !previewUrl}>
                Save
              </Button>
              <Button color='gray' onClick={() => setShowImageModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
