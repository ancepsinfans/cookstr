import React from "react";
import { UserContext } from "@/components/context/UserProvider";
import { useRouter } from "next/router";

export default function LoginPage() {
    const { toggleLogin, privateKey, savePrivateKey } = React.useContext(UserContext);
    const router = useRouter()


    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault()
                toggleLogin()
                router.push('/')
            }}>
                <label>
                    private key hex:{' '}
                    <input
                        required
                        type='password'
                        value={privateKey}
                        onChange={(e) => {
                            savePrivateKey(e.target.value)
                        }}
                    />
                </label>
                <br />
                <button type='submit'>Login</button>
            </form>
        </>
    )

}