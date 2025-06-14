import { Alert, Button, Label, TextInput, Spinner } from 'flowbite-react';
import { useState } from 'react';
import {Link, useNavigate} from  'react-router-dom';
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice';  
import {useDispatch, useSelector} from 'react-redux';
import Oauth from '../components/OAuth';
export default function SignIn() {
  const [formData, setFormData] = useState({});

  // const [errorMessage, setErrorMessage] = useState('');
  // const [loading, setLoading] = useState(false);
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,[e.target.id]: e.target.value});
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    if(!formData.email || !formData.password) {
      return dispatch(signInFailure('All fields are required'));
    } 

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        dispatch(signInSuccess(data));
        navigate('/');
      } else {
        // Handle non-OK responses
        const errorText = await res.text();
        try {
          const errorData = JSON.parse(errorText);
          dispatch(signInFailure(errorData.message || 'Signin failed'));
        } catch (parseError) {
          dispatch(signInFailure('Signin failed. Please try again.'));
        }
      }
      
    } catch (error) {
      dispatch(signInFailure(error.message || 'Something went wrong'));
      console.log('Signin error:', error);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Sachin's
            </span>
            Blog
          </Link>
         <p className='text-sm mt-5'>
          Start your blogging journey with Sachin's Blog! Create an account in seconds 
          using your email – no spam, just stories.
        </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your email' />
              <TextInput type='email' placeholder='name@gmail.com' id='email'onChange={handleChange} />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput type='password' placeholder='**********' id='password'onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
             
              {loading ? (
                <>
                <Spinner size ='sm'/>
                <span className='pl-3'>Loading...</span>
                </>
              ) : 'Sign In'}
              
              
            </Button>
            <Oauth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
}