import React, {useState, createContext} from 'react';
import { UserDetails } from './typeContext';

interface AuthContextInterface {
    auth: UserDetails | undefined;
    login: (userData: UserDetails) => void;
    logout: () => void;
  }

export const AuthContext = createContext<AuthContextInterface>({
    auth: undefined,
    login: () => {},
    logout: () => {},
});

export function AuthProvider(props : any) {
    const {children} = props;

    const [auth, setAuth] = useState<UserDetails | undefined>(undefined);

    const login = (userData : UserDetails ) => {
        if(userData){
            setAuth(userData)
        }
        
    };

    const logout = () => {
        setAuth(undefined)
    }

    const valueContext = {
        auth,
        login,
        logout
    };


    return (
        <AuthContext.Provider value={valueContext}>
            {children}
        </AuthContext.Provider>
    )
}