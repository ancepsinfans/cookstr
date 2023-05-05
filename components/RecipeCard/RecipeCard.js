import React from 'react';
import { formAndSignEvent, sendEventToRelay } from '@/utils';
import { useRouter } from 'next/router';
import IconHolder from '../IconHolder/IconHolder';
import { UserContext } from '../context/UserProvider';
import Link from 'next/link';

function RecipeCard({
  recipe,
  page = 'home',
  deleteable = false,
}) {
  const router = useRouter()

  return (

    <fieldset key={recipe.id}  >
      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <div style={{ display: 'block', margin: '0 0 0 15px', flexBasis: '95%' }}>
          <h2>
            <Link href={`/r/${recipe.id}`}>{recipe.content.name}</Link>
          </h2>

          {
            page !== 'user' ?
              <aside>
                by <Link href={`/u/${recipe.pubkey}`}>{recipe?.pubkey.slice(0, 5)}...</Link>
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
        <IconHolder recipe={recipe} size={30} />
      </div>
    </fieldset >
  )


}

export default RecipeCard;
