import React from 'react'
import { useSubscribe } from 'nostr-hooks';
import { UserContext } from '@/components/context/UserProvider';
import { nip57 } from 'nostr-tools';

export default function User() {
    const { publicKey } = React.useContext(UserContext)
    nip57
    const { events, eose } = useSubscribe({
        relays: [
            'wss://relay.damus.io',
            'wss://relay.snort.social',
            'wss://eden.nostr.land',
            // 'wss://relay.nostr.info',
            'wss://offchain.pub',
            'wss://nostr-pub.wellorder.net',
            'wss://nostr.fmt.wiz.biz',
            'wss://nos.lol',
        ],
        filters: [
            {
                kinds: [0],
                authors: [publicKey]
            },
            {
                kinds: [3],
                authors: [publicKey]
            },
            {
                kinds: [8],
                authors: [publicKey]
            },
            {
                kinds: [9735],
                authors: [publicKey]
            },
            {
                kinds: [30008],
                authors: [publicKey]
            },
            {
                kinds: [30001],
                authors: [publicKey]
            },
        ],
    })
    console.log({ events, eose })

    // if (!events && !eose) {
    //     return <p>Loading...</p>;
    // } else {
    //     recipes = events.map(obj => {
    //         const { content, ...rest } = obj;
    //         return { ...rest, content: JSON.parse(content) };
    //     });

    // }
    return (
        <main >

            <article>
                {events.map((e, i) => {
                    return (
                        <p key={i}>{JSON.stringify(e)}</p>
                    )
                })}
            </article>
        </main >
    )
}

