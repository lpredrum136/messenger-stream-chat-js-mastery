import { ChangeEvent, FormEvent, useState } from 'react';
import authImg from '../assets/signup.jpg';
import {
  CHAT_TOKEN,
  CHAT_USERNAME,
  CHAT_USER_AVATAR_URL,
  CHAT_USER_FULL_NAME,
  CHAT_USER_ID,
  CHAT_USER_PHONE_NUMBER,
} from '../constants';
import Input from './auth/Input';

const initialForm = {
  fullName: '',
  username: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  avatarURL: '',
};

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [form, setForm] = useState(initialForm);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const switchAuthMode = () => {
    setIsRegister(!isRegister);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const { fullName, username, password, phoneNumber, avatarURL } = form;
      const serverURL = `http://localhost:5000/auth/${
        isRegister ? 'register' : 'login'
      }`;

      const response = await fetch(serverURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const responseData = await response.json();

      if (responseData) {
        const { token, userId } = responseData;

        localStorage.setItem(CHAT_TOKEN, token);
        localStorage.setItem(CHAT_USER_ID, userId);
        localStorage.setItem(CHAT_USERNAME, username);

        if (isRegister) {
          localStorage.setItem(CHAT_USER_FULL_NAME, fullName);
          localStorage.setItem(CHAT_USER_PHONE_NUMBER, phoneNumber);
          localStorage.setItem(CHAT_USER_AVATAR_URL, avatarURL);
        }

        window.location.reload();
      }
    } catch (error) {
      console.log(`ERROR ${isRegister ? 'REGISTER' : 'LOGIN'}`, error);
    }
  };

  return (
    <div className='flex h-screen'>
      <div className='flex flex-col justify-center p-8 bg-[#005fff] min-w-[40%]'>
        <div className='flex flex-col justify-start p-8 shadow-[0_1px_5px_rgba(0,0,0,0.1)] rounded-md transition duration-700 bg-white'>
          <p className='text-2xl text-[#05245a] font-black'>
            {isRegister ? 'Register' : 'Login'}
          </p>
          <form onSubmit={handleSubmit}>
            <Input
              name='username'
              placeholder='Username'
              label='Username'
              onChange={handleChange}
            />
            <Input
              name='password'
              placeholder='Password'
              label='Password'
              onChange={handleChange}
              type='password'
            />

            {isRegister && (
              <>
                <Input
                  name='confirmPassword'
                  placeholder='Confirm Password'
                  label='Confirm Password'
                  onChange={handleChange}
                  type='password'
                />
                <Input
                  label='Full Name'
                  name='fullName'
                  placeholder='Full Name'
                  onChange={handleChange}
                />
                <Input
                  label='Phone Number'
                  name='phoneNumber'
                  placeholder='Phone Number'
                  onChange={handleChange}
                />
                <Input
                  label='Avatar URL'
                  name='avatarURL'
                  placeholder='Avatar URL'
                  onChange={handleChange}
                />
              </>
            )}
            <div className='mt-4 flex justify-start'>
              <button className='rounded-md bg-[#005fff] border border-solid border-[#005fff] text-white font-medium px-5 py-3 outline-none cursor-pointer transition-all duration-300 hover:bg-[#004ec3]'>
                {isRegister ? 'Register' : 'Login'}
              </button>
            </div>
          </form>
          <div className='flex items-center mt-2'>
            <p className='text-sm text-black font-medium'>
              {isRegister
                ? 'Already have an account? '
                : "Don't have an account? "}
              <span
                onClick={switchAuthMode}
                className='text-[#05245a] cursor-pointer font-bold'
              >
                {isRegister ? 'Login' : 'Register'}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className='flex shadow-[1px_0_5px_rgba(0,0,0,0.05)]'>
        <img src={authImg} alt='auth-img' className='object-cover' />
      </div>
    </div>
  );
};

export default Auth;
