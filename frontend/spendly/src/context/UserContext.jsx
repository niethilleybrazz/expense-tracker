import { createContext, useState } from "react";

export const UserContext = createContext()
const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    
    // Atuliza dados do usuario
    const updateUser = (userData) => {
        setUser(userData)
    }

    // Limpa os dados
    const clearUser = () => {
        setUser(null)
    }

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