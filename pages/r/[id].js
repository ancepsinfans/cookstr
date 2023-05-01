import React from 'react'
import { useSubscribe } from 'nostr-hooks';
import { formAndSignEvent, sendEventToRelay } from '@/utils';
import { UserContext } from '@/components/context/UserProvider';
import { useRouter } from 'next/router';

export default function User({ params }) {
    const { loggedIn, publicKey, privateKey } = React.useContext(UserContext);
    const router = useRouter()
    const { id } = params

    const { events } = useSubscribe({
        relays: [
            'ws://localhost:8182',
            'wss://relay.damus.io',
            'wss://relay.snort.social',
            'wss://eden.nostr.land',
            'wss://relay.nostr.info',
            'wss://offchain.pub',
            'wss://nostr-pub.wellorder.net',
            'wss://nostr.fmt.wiz.biz',
            'wss://nos.lol',
        ],
        filters: [{ ids: [id.toString()], kinds: [99] }],
    })

    let recipes

    if (!events) {
        return <p>Loading...</p>;
    } else {
        recipes = events.map(obj => {
            const { content, ...rest } = obj;
            return { ...rest, content: JSON.parse(content) };
        });

    }
    const trunc = recipes[0]?.pubkey.slice(0, 5)
    return (
        <main >
            <article>
                {recipes.map((recipe) => {

                    return (

                        <fieldset key={recipe.id} style={{ width: '50wv' }} >
                            <h2> {recipe.content.name}</h2>
                            <aside>by <a href={`/u/${recipe.pubkey}`}>{trunc}...</a></aside>

                            <h4>Ingredients</h4>
                            <ul>
                                {recipe.content.ingredients.map((e, idx) => {
                                    return (
                                        <li key={idx}>{`${e.amount} ${e.unit ? e.unit : ''} ${e.ingredient}`}</li>
                                    )
                                })}
                            </ul>
                            <h4>Instructions</h4>
                            <ol>
                                {recipe.content.instructions.map((e, idx) => {
                                    return (
                                        <li key={idx}>{e}</li>
                                    )
                                })}
                            </ol>
                            {(loggedIn && publicKey === recipe.pubkey) ?
                                <button
                                    onClick={() => {
                                        sendEventToRelay(formAndSignEvent(privateKey, 5, 'removing test', [['e', `${recipe.id}`]]))
                                        router.push('/')
                                    }}
                                >delete</button>
                                :
                                null
                            }
                        </fieldset>
                    )
                })
                }
            </article>
        </main >
    )
}

export function getServerSideProps(context) {
    return {
        props: { params: context.params }
    };
}