import React from 'react';
import { useSubscribe } from 'nostr-hooks';
import IconHolder from '../IconHolder/IconHolder';
import styled from "@emotion/styled";




function Display() {

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
    ], filters: [{ kinds: [99] }],
  });
  const newEvents = events.reduce((accumulator, currentObject) => {
    if (!accumulator.some(({ content }) => content === currentObject.content)) {
      accumulator.push(currentObject);
    }
    return accumulator;
  }, []);
  const recipes = newEvents.map(obj => {
    const { content, ...rest } = obj;
    return { ...rest, content: JSON.parse(content) };
  });
  if (!events && !eose) return <p>Loading...</p>;

  return (
    <main >
      <article>
        {recipes.map((recipe) => {

          return (

            <fieldset key={recipe.id}  >
              <div >
                {/* <IconHolder /> */}
                <>
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
                </>
              </div>
            </fieldset>
          )
        })
        }
      </article>
    </main >
  )
}

export default Display;
