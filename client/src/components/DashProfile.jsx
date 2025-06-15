import {
  Alert,
  Button,
  Label,
  Modal,
  ModalBody,
  TextInput,
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from '../redux/user/userSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const DEFAULT_AVATAR = 'https://www.svgrepo.com/show/382106/default-avatar.svg';

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [validImageUrl, setValidImageUrl] = useState('');
  const [imageError, setImageError] = useState(false);

  const dispatch = useDispatch();

  const handleImagePreview = (url) => {
    const img = new Image();
    img.onload = () => {
      setImageError(false);
      setValidImageUrl(url);
    };
    img.onerror = () => {
      setImageError(true);
      setValidImageUrl('');
    };
    img.src = url;
  };

  const handleSaveImageUrl = () => {
    if (!imageError && validImageUrl) {
      setFormData({ ...formData, profilePicture: validImageUrl });
      setShowImageModal(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <Label>Profile Picture</Label>
        <div className='w-32 h-32 self-center overflow-hidden rounded-full border-4 border-gray-300'>
          <img
            src={
              formData.profilePicture ||
              currentUser.profilePicture ||
              DEFAULT_AVATAR
            }
            alt='user'
            className='w-full h-full object-cover'
            onError={(e) => (e.target.src = DEFAULT_AVATAR)}
          />
        </div>

        <Button
          type='button'
          gradientDuoTone='cyanToBlue'
          onClick={() => {
            setTempImageUrl(formData.profilePicture || currentUser.profilePicture || '');
            setValidImageUrl('');
            setShowImageModal(true);
          }}
        >
          Change Profile Picture
        </Button>

        <div>
          <Label htmlFor='username'>Username</Label>
          <TextInput
            type='text'
            id='username'
            placeholder='Enter username'
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor='email'>Email</Label>
          <TextInput
            type='email'
            id='email'
            placeholder='Enter email'
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor='password'>Password</Label>
          <TextInput
            type='password'
            id='password'
            placeholder='Enter new password'
            onChange={handleChange}
          />
        </div>

        <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </Button>

        {currentUser.isAdmin && (
          <Link to={'/create-post'}>
            <Button
              type='button'
              gradientDuoTone='purpleToPink'
              className='w-full'
            >
              Create a Post
            </Button>
          </Link>
        )}
      </form>

      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>
          Delete Account
        </span>
        <span onClick={handleSignout} className='cursor-pointer'>
          Sign Out
        </span>
      </div>

      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}

      {/* Delete confirmation modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Profile image modal */}
      <Modal show={showImageModal} onClose={() => setShowImageModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='flex flex-col gap-4'>
            <h3 className='text-center text-lg font-semibold'>Update Profile Picture</h3>
            <Label htmlFor='profileImageUrl'>Paste Image URL</Label>
            <TextInput
              id='profileImageUrl'
              type='url'
              value={tempImageUrl}
              onChange={(e) => {
                setTempImageUrl(e.target.value);
                handleImagePreview(e.target.value);
              }}
              placeholder='https://example.com/image.jpg'
            />
            <div className='w-24 h-24 self-center overflow-hidden rounded-full border'>
              <img
                src={validImageUrl || DEFAULT_AVATAR}
                onError={(e) => (e.target.src = DEFAULT_AVATAR)}
                className='w-full h-full object-cover'
                alt='Preview'
              />
            </div>
            {imageError && <Alert color='failure'>Invalid image URL</Alert>}
            <div className='flex justify-center gap-4 mt-4'>
              <Button color='success' onClick={handleSaveImageUrl} disabled={imageError || !validImageUrl}>
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
