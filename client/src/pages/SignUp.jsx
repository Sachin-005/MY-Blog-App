import { Alert, Button, Label, TextInput, Spinner } from 'flowbite-react';
import { useState } from 'react';
import {Link, useNavigate} from  'react-router-dom';
import OAuth from '../components/OAuth';
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,[e.target.id]: e.target.value});
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    if(!formData.username || !formData.email || !formData.password) {
      setLoading(false);
      return setErrorMessage('All fields are required');
    } 
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setLoading(false);
        console.log(data.message);
        navigate('/sign-in');
      } else {
        // Handle non-OK responses
        const errorText = await res.text();
        setLoading(false);
        try {
          const errorData = JSON.parse(errorText);
          setErrorMessage(errorData.message || 'Signup failed');
        } catch (parseError) {
          setErrorMessage('Signup failed. Please try again.');
        }
      }
      
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message || 'Something went wrong');
      console.log('Signup error:', error);
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
              <Label value='Your username' />
              <TextInput type='text' placeholder='Username' id='username'onChange={handleChange} />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput type='email' placeholder='name@company.com' id='email'onChange={handleChange} />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput type='password' placeholder='Password' id='password'onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
             
              {loading ? (
                <>
                <Spinner size ='sm'/>
                <span className='pl-3'>Loading...</span>
                </>
              ) : 'Sign Up'}
              
              
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
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