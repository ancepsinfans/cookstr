import React from 'react'
import { useSubscribe } from 'nostr-hooks';
import { formAndSignEvent, sendEventToRelay } from '@/utils';

export default function User({ params }) {
    const { id } = params

    const { events } = useSubscribe({
        relays: ['ws://localhost:8182', 'wss://relay.damus.io'],
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
            {recipes.map((recipe) => {

                return (

                    <fieldset key={recipe.id} style={{ width: '50wv' }} >
                        <h2> {recipe.content.name}</h2>
                        <aside>by <a href={`/u/${recipe.pubkey}`}>{trunc}</a></aside>

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
                        <button
                            onClick={() => {
                                sendEventToRelay(formAndSignEvent('5463aeaacb9b172b66f94d9928bf9d1e806b61ad346c169a3e76aaf814992b60', 5, 'removing test', [['e', `${recipe.id}`]]))
                            }}
                        >delete</button>
                    </fieldset>
                )
            })
            }

        </main >
    )
}

export function getServerSideProps(context) {
    return {
        props: { params: context.params }
    };
}