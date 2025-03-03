import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input 
        type="text" 
        id="name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <label htmlFor="email">Email:</label>
      <input 
        type="email" 
        id="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <label htmlFor="password">Password:</label>
      <input 
        type="password" 
        id="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
