import { useEffect, useState } from "react"
import { useApi } from "../../hooks/useApi";
import { User } from "../../types/user"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({children}: {children: JSX.Element}) => {
    const [user, setUser] = useState<User | null>(null);
    const api = useApi();
    
    const login = async (login: string, password: string) => {
        return api.login(login, password).then((data) => {
            console.log(data);
            if (data.data) {
                setUser(data);
                setToken(data.data);
                return true;
            }
            return false;
        }).finally(() => {
            return false;
        })
    }

    const logout = async () => {
        setUser(null);
        setToken('');
        await api.logout();
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token);
    }
    return (
        <AuthContext.Provider value= {{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}