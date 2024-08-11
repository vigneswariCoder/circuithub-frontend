// AuthForm.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { registerUser, loginUser } from '../redux/slices/authSlice';
import { TextField, Button, Container, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const AuthForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSignup, setIsSignup] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await dispatch(registerUser({ username, password }) as any);
        toast.success('Registered successfully. Sign in to see content.');
      } else {
        const result = await dispatch(loginUser({ username, password }) as any);
        console.log(result, 'result');
        if (result.payload) {
          const { token, username, roles } = result.payload;
          console.log(token, username, roles, 'token,username,roles');

          localStorage.setItem('authToken', token);
          localStorage.setItem('username', username || '');
          localStorage.setItem('roles', JSON.stringify(roles || []));


          toast.success('Sign in successful!');
          navigate('/');
        } else {
          toast.error(result.error.message || 'Unexpected response format!');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  return (
    <Container>
      <Typography variant="h4">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? 'Switch to Sign In' : 'Switch to Sign Up'}
        </Button>
      </form>
    </Container>
  );
};

export default AuthForm;
