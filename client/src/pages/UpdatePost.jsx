import {
  Alert,
  Button,
  Label,
  Modal,
  TextInput,
  Select,
} from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdatePost() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    content: '',
  });
  const [publishError, setPublishError] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageError, setImageError] = useState(false);

  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  // ✅ Fetch post on mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message || 'Failed to fetch post');
          return;
        }

        const post = data.posts[0];
        setFormData({
          title: post.title || '',
          category: post.category || '',
          image: post.image || '',
          content: post.content || '',
        });
      } catch (error) {
        setPublishError('Something went wrong while fetching the post');
      }
    };

    fetchPost();
  }, [postId]);

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
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message || 'Update failed');
        return;
      }
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError('Something went wrong while updating the post');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update Post</h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {/* Title & Category */}
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          >
            <option value=''>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </Select>
        </div>

        {/* Paste Image URL */}
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

        {/* Image Preview */}
        {imageError && <Alert color='failure'>Invalid image URL</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='Uploaded preview'
            className='w-full h-72 object-cover rounded'
          />
        )}

        {/* Rich Text Content */}
        <ReactQuill
          theme='snow'
          value={formData.content}
          onChange={(value) =>
            setFormData({ ...formData, content: value })
          }
          placeholder='Write something...'
          className='h-72 mb-12'
          required
        />

        {/* Submit */}
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Update Post
        </Button>

        {/* Error Alert */}
        {publishError && (
          <Alert color='failure' className='mt-5'>
            {publishError}
          </Alert>
        )}
      </form>

      {/* Paste Image Modal */}
      <Modal
        show={showImageModal}
        onClose={() => setShowImageModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='flex flex-col gap-4'>
            <h3 className='text-center text-lg font-semibold'>
              Paste Image URL
            </h3>
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
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt='Preview'
                  className='w-full h-full object-cover'
                />
              )}
            </div>
            {imageError && <Alert color='failure'>Invalid image URL</Alert>}
            <div className='flex justify-center gap-4 mt-4'>
              <Button
                color='success'
                onClick={handleSaveImage}
                disabled={imageError || !previewUrl}
              >
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
