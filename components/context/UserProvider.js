import React from 'react';

export const UserContext = React.createContext();

function UserProvider({ children }) {
    const [iv, setIv] = React.useState('')
    const [encryptedPrivateKey, setEncryptedPrivateKey] = React.useState('')
    const [publicKey, setPublicKey] = React.useState('')


    return (
        <UserContext.Provider
            value={{ iv, encryptedPrivateKey, publicKey }}
        >
            (encryptedPrivateKey === '' ?
            <Login /> :
            {children}
            )
        </UserContext.Provider >
    );
}

export default UserProvider;