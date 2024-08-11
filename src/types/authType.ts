export interface UserCredentials {
    username: string;
    password: string;
}

export interface User {
    username: string;
    roles: string[];
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}


export interface UserCredentials {
    username: string;
    password: string;
}
