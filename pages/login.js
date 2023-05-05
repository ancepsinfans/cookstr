import React from "react";
import { UserContext } from "@/components/context/UserProvider";
import { useRouter } from "next/router";
import Image from "next/image";
import { generatePrivateKey, getPublicKey } from "nostr-tools";

export default function LoginPage() {
    const [keys, setKeys] = React.useState({ pub: '', priv: '' })
    const { toggleLogin, privateKey, savePrivateKey } = React.useContext(UserContext);
    const router = useRouter()

    function genKey() {
        const priv = generatePrivateKey()
        const pub = getPublicKey(priv)
        setKeys({ pub, priv })
    }

    return (
        <main>
            <div>
                <form onSubmit={(e) => {

                    e.preventDefault()
                    toggleLogin()
                    router.push('/')
                }}>
                    <fieldset>
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
                    </fieldset>
                </form>
                <fieldset>
                    <h3>Don't have a key?</h3>
                    <aside>Generate one here</aside>
                    <button onClick={genKey}>
                        <Image height={25} width={25} src={'/images/running-nostr.gif'} />
                    </button>
                    {keys.pub !== '' ?
                        <>
                            <p>Private key: {keys.priv}</p>
                            <p>Public key: {keys.pub}</p>
                            <p>Save your private key somewhere safe, and don't share it with anyone!</p>
                        </>
                        : null
                    }
                </fieldset>
            </div>
        </main>
    )

}