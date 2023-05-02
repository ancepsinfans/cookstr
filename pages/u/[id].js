import React from 'react'
import RecipeCard from '@/components/RecipeCard';
import { getRecipes } from '@/utils/getRecipes';

export default function User({ params }) {

    const { id } = params
    const { recipes, eose } = getRecipes({ authors: [id] })


    if (!recipes && !eose) {
        return <p>Loading...</p>;
    }

    return (
        <main >
            <h3>Recipes from {id?.slice(0, 5)}...</h3>
            <article>
                {recipes.map((recipe) => {


                    return (

                        <RecipeCard recipe={recipe} page='user' />
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