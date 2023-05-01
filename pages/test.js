import React from 'react'
import { useSubscribe } from 'nostr-hooks';
import { UserContext } from '@/components/context/UserProvider';

export default function User({ params }) {
    const { privateKey } = React.useContext(UserContext)




    const id = params
    console.log(id)
    const { events, eose } = useSubscribe({
        relays: [
            'wss://relay.damus.io',
            'wss://relay.snort.social',
            'wss://eden.nostr.land',
            'wss://relay.nostr.info',
            'wss://offchain.pub',
            'wss://nostr-pub.wellorder.net',
            'wss://nostr.fmt.wiz.biz',
            'wss://nos.lol',
        ],
        filters: [{
            kinds: [10002],
            authors: [id]
        }],
    })

    console.log(events)
    let recipes

    if (!events && !eose) {
        return <p>Loading...</p>;
    } else {
        recipes = events.map(obj => {
            const { content, ...rest } = obj;
            return { ...rest, content: JSON.parse(content) };
        });

    }
    const trunc = id?.slice(0, 5)
    return (
        <main >
            <h3>Recipes from {trunc}...</h3>
            <article>

            </article>
        </main >
    )
}

export function getServerSideProps(context) {
    return {
        props: { params: '9f869a838d650d83cbcf15b8f2e366b84b3b7f66f9789af7194f60a0bfd7ec7e' }
    };
}

