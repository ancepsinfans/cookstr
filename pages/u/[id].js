import React from 'react'
import { useSubscribe } from 'nostr-hooks';


export default function User({ params }) {

    const { id } = params
    const { events, eose } = useSubscribe({
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
        filters: [{ authors: [id], kinds: [99] }],
    })


    let recipes

    if (!events && !eose) {
        return <p>Loading...</p>;
    } else {
        const newEvents = events.reduce((accumulator, currentObject) => {
            if (!accumulator.some(({ content }) => content === currentObject.content)) {
                accumulator.push(currentObject);
            }
            return accumulator;
        }, []);
        recipes = newEvents.map(obj => {
            const { content, ...rest } = obj;
            return { ...rest, content: JSON.parse(content) };
        });

    }
    const trunc = id?.slice(0, 5)
    return (
        <main >
            <h3>Recipes from {trunc}...</h3>
            <article>
                {recipes.map((recipe) => {


                    return (

                        <fieldset key={recipe.id} style={{ width: '50wv' }} >
                            <h2>
                                <a href={`/r/${recipe.id}`}>{recipe.content.name}</a>
                            </h2>

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