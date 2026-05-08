import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register ,loginUser} from '../app/Slices/authSlice';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*?])(?=.*\d).{8,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const [invalidUsername, setInvalidUsername] = useState('');
  const [invalidEmail, setInvalidEmail] = useState('');
  const [invalidPass, setInvalidPass] = useState('');
  const [inequalPass, setInequalPass] = useState('');
  
  const validateUsername = (e) => {
    const value = e.target.value;
    if (value && !usernameRegex.test(value)) {
      setInvalidUsername('Username doit contenir 3-20 caractères (lettres, chiffres, _)');
    } else {
      setInvalidUsername('');
    }
  };
  
  const validateEmail = (e) => {
    const value = e.target.value;
    if (value && !emailRegex.test(value)) {
      setInvalidEmail('Email non valide');
    } else {
      setInvalidEmail('');
    }
  };
  
  const validatePass = (e) => {
    const value = e.target.value;
    if (value && !passRegex.test(value)) {
      setInvalidPass('Le mot de passe doit contenir au minimum 8 caractères avec 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial (!@#$%&*?)');
    } else {
      setInvalidPass('');
    }
  };
  
  const verifyEqualPass = (e) => {
    const confirmPass = e.target.value;
    const password = document.getElementById('password').value;
    if (confirmPass && confirmPass !== password) {
      setInequalPass('Les mots de passe ne correspondent pas');
    } else {
      setInequalPass('');
    }
  };
 async function handleRegister(e) {
  e.preventDefault();
  const username = e.target.username.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  try {
    await dispatch(register({ username, email, password })).unwrap();
    await dispatch(loginUser({ email, password })).unwrap();
    navigate('/');
  } catch (error) {
    console.error("Erreur lors du processus :", error);
  }
}
  return (
    <div className='flex items-center justify-center min-h-screen bg-green-50'>
      <div className='bg-white p-6 shadow-lg w-full max-w-sm'>
        <h1 className='text-2xl font-bold mb-4 text-center text-gray-800'>S'inscrire</h1>

        <form className='space-y-2' onSubmit={(e)=>handleRegister(e)}>
          <div>
            <label className='block text-sm font-medium mb-0.5 text-gray-700'>Nom d'utilisateur</label>
            <input
              type='text'
              placeholder='votre_username'
              className={`w-full border rounded px-3 py-1.5 text-sm focus:outline-none ${
                invalidUsername ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
              }`}
              id="username"
              name="username"
              onChange={validateUsername}
              required
            />
            <div className='min-h-4 mt-1'>{invalidUsername && <span className='text-red-600 text-xs block leading-tight'>{invalidUsername}</span>}</div>
          </div>

          <div>
            <label className='block text-sm font-medium mb-0.5 text-gray-700'>Email</label>
            <input
              type='email'
              placeholder='votre@email.com'
              className={`w-full border rounded px-3 py-1.5 text-sm focus:outline-none ${
                invalidEmail ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
              }`}
              id="email"
              name="email"
              onChange={validateEmail}
              required
            />
            <div className='min-h-4 mt-1'>{invalidEmail && <span className='text-red-600 text-xs block leading-tight'>{invalidEmail}</span>}</div>
          </div>

          <div>
            <label className='block text-sm font-medium mb-0.5 text-gray-700'>Mot de passe</label>
            <input
              type='password'
              placeholder='Min 8 caractères'
              className={`w-full border rounded px-3 py-1.5 text-sm focus:outline-none ${
                invalidPass ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
              }`}
              id="password"
              name="password"
              onChange={validatePass}
              required
            />
            <div className='min-h-4 mt-1'>{invalidPass && <span className='text-red-600 text-xs block leading-tight'>{invalidPass}</span>}</div>
          </div>

          <div>
            <label className='block text-sm font-medium mb-0.5 text-gray-700'>Confirmer</label>
            <input
              type='password'
              placeholder='Confirmer'
              className={`w-full border rounded px-3 py-1.5 text-sm focus:outline-none ${
                inequalPass ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
              }`}
              id="confirm_pass"
              name='confirm_pass'
              onChange={verifyEqualPass}
              required
            />
            <div className='min-h-4 mt-1'>{inequalPass && <span className='text-red-600 text-xs block leading-tight'>{inequalPass}</span>}</div>
          </div>

          <div className='pt-1'>
            <button
              type='submit'
              className='w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium text-sm'
            >
              S'inscrire
            </button>
          </div>
        </form>
        
        <p className='text-sm text-gray-600 text-center mt-4'>
          Déjà inscrit ?{' '}
          <Link to="/login" className='text-green-600 hover:text-green-700 font-medium'>
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;