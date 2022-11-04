import { createContext } from 'react';
import { User } from '../../types/user';

export type AuthContextType = {
    user: User | null;
    login: (login: string, password: string) => Promise<boolean>;
    logout: () => void;
}
export const AuthContext = createContext<AuthContextType>(null!);