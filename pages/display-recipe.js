import React from 'react'

import { useSubscribe } from 'nostr-hooks';

export default function Recipe() {

    const { events, eose } = useSubscribe({
        relays: ['ws://localhost:8182', 'wss://relay.damus.io/'],
        filters: [{ kinds: [99] }],
    });
    const recipes = events.map(obj => {
        const { content, ...rest } = obj;
        return { ...rest, content: JSON.parse(content) };
    });

    console.log(recipes)
    if (!events && !eose) return <p>Loading...</p>;

    return (
        <main >
            {recipes.map((recipe) => {

                return (

                    <fieldset key={recipe.id} style={{ width: '50wv' }} >
                        <h2>
                            <a href={`/r/${recipe.id}`}>{recipe.content.name}</a>
                        </h2>
                        <h4>

                            by <a href={`/u/${recipe.pubkey}`}>{recipe?.pubkey.slice(0, 5)}...</a>
                        </h4>
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

        </main >
    )
}
