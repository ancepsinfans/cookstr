import React from 'react'
import { useSubscribe } from 'nostr-hooks';


export default function User({ params }) {

    const { id } = params
    const { events, eose } = useSubscribe({
        relays: ['ws://localhost:8182', 'wss://relay.damus.io'],
        filters: [{ authors: [id], kinds: [99] }],
    })


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

        </main >
    )
}

export function getServerSideProps(context) {
    return {
        props: { params: context.params }
    };
}