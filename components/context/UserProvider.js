import { getPublicKey, nip19 } from 'nostr-tools';
import React from 'react';
export const UserContext = React.createContext();

function UserProvider({ children }) {
    // const [iv, setIv] = React.useState('')
    // const [encryptedPrivateKey, setEncryptedPrivateKey] = React.useState('')
    const [privateKey, setPrivateKey] = React.useState('')
    const [publicKey, setPublicKey] = React.useState('')
    // const [secret, setSecret] = React.useState('')
    const [loggedIn, setLoggedIn] = React.useState(false)

    React.useEffect(() => {
        // Check if the user is already logged in
        const storedLoggedIn = localStorage.getItem('loggedIn')
        if (storedLoggedIn) {
            setLoggedIn(true)
        }
    }, [])

    function toggleLogin() {
        setLoggedIn(!loggedIn)
        localStorage.setItem('loggedIn', (!loggedIn).toString())
    }


    React.useEffect(() => {
        // Check if the user is already logged in
        const storedPrivateKey = localStorage.getItem('privateKey')
        if (storedPrivateKey) {
            setPrivateKey(storedPrivateKey)
            setPublicKey(getPublicKey(storedPrivateKey))
        }
    }, [])

    function savePrivateKey(val) {
        let v = val
        if (val.includes('nsec')) {
            let { data } = nip19.decode(val)
            v = data
            console.log(v)
        }
        console.log(v)
        setPrivateKey(v)
        localStorage.setItem('privateKey', v.toString())
        if (v.length === 64) {
            setPublicKey(getPublicKey(v))
        }

    }



    return (
        <UserContext.Provider
            value={{
                privateKey,
                savePrivateKey,
                loggedIn,
                publicKey,
                toggleLogin
            }}
        >

            {children}

        </UserContext.Provider >
    );
}

export default UserProvider;