import { createContext, useState, useCallback } from "react";

export const UserContext = createContext()
const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    
    // Atuliza dados do usuario
    const updateUser = useCallback((userData) => {
        setUser(userData)
    }, [])

    const clearUser = useCallback(() => {
        setUser(null)
    }, [])

    return (
        <UserContext.Provider
        value={{
            user,
            updateUser,
            clearUser,
        }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider