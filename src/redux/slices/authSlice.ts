import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { login, register } from './authAPI';
import { AuthState, User, UserCredentials, AuthResponse } from '../../types/authType';

const initialState: AuthState = {
    user: null,
    token: null,
    status: 'idle',
    error: null,
};

export const registerUser = createAsyncThunk<AuthResponse, UserCredentials>(
    'auth/register',
    async (userCredentials: UserCredentials) => {
        const response = await register(userCredentials);
        return response;
    }
);

export const loginUser = createAsyncThunk<AuthResponse, UserCredentials>(
    'auth/login',
    async (userCredentials: UserCredentials) => {
        const response = await login(userCredentials);
        console.log(response);
        return response;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload;
        },
        setStatus(state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) {
            state.status = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.status = 'succeeded';
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Registration failed';
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.status = 'succeeded';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Login failed';
            });
    },
});

export const { setUser, setToken, setStatus, setError } = authSlice.actions;
export default authSlice.reducer;