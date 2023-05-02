import React from 'react';
import { formAndSignEvent, sendEventToRelay } from '@/utils';
import { useRouter } from 'next/router';
import IconHolder from '../IconHolder/IconHolder';

function RecipeCard({
  recipe,
  page = 'home',
  deleteable = false,
  privateKey = ''
}) {

  const router = useRouter()
  return (

    <fieldset key={recipe.id}  >
      <div style={{ display: 'flex', justifyContent: 'start' }}>
        {/* <IconHolder size={30} /> */}
        <div style={{ display: 'block', margin: '0 0 0 15px' }}>
          <h2>
            <a href={`/r/${recipe.id}`}>{recipe.content.name}</a>
          </h2>

          {
            page !== 'user' ?
              <aside>
                by <a href={`/u/${recipe.pubkey}`}>{recipe?.pubkey.slice(0, 5)}...</a>
              </aside>
              : null
          }

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
          {deleteable ?
            <button
              onClick={() => {
                sendEventToRelay(formAndSignEvent(privateKey, 5, 'removing test', [['e', `${recipe.id}`]]))
                router.push('/')
              }}
            >delete</button>
            :
            null
          }
        </div>
      </div>
    </fieldset >
  )


}

export default RecipeCard;
