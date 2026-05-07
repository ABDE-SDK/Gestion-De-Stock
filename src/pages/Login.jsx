import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../Slices/authSlice';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    dispatch(loginUser({ email, password })).then(() => {
      navigate('/');
    });
  };

  useEffect(() => {
    if (error) {
      setErrorMessage('mot de passe ou email incorrect');
    }
  }, [error]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className='flex items-center justify-center min-h-screen bg-blue-50'>
  <div className='bg-white p-8 shadow-lg w-full max-w-md'>
    <h1 className='text-2xl font-bold mb-6 text-center text-gray-800'>Connexion</h1>
    <form className='flex flex-col gap-4' onSubmit={handleLogin}>
      <div>
        <label className='block text-sm font-medium mb-1 text-gray-700'>Email</label>
        <input ref={inputRef} type='email' name='email' placeholder='votre@email.com' className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500' required />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1 text-gray-700'>Mot de passe</label>
        <input type='password' name='password' placeholder='Mot de passe' className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500' required />
      </div>
      {error && <p className='text-sm text-red-600 bg-red-50 p-2 rounded text-center w-full'>{errorMessage}</p>}
      <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition-colors'>Se connecter</button>
    </form>
    <p className='text-sm text-gray-600 text-center mt-4'>Pas de compte ? <Link to='/register' className='text-blue-600 hover:text-blue-700 font-medium'>S'inscrire</Link></p>
  </div>
</div>
  );
};

export default Login;
 