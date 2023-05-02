import React from 'react'
import { getRecipes } from '@/utils/getRecipes';
import RecipeCard from '@/components/RecipeCard/RecipeCard';

export default function Home() {
    const { recipes, eose } = getRecipes()

    if (!recipes && !eose) return <p>Loading...</p>;

    return (
        <main >
            <article>
                {recipes.map((recipe) => {

                    return (

                        <RecipeCard recipe={recipe} />
                    )
                })
                }
            </article>
        </main >
    )
}
