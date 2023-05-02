import React from 'react'
import { UserContext } from '@/components/context/UserProvider';
import RecipeCard from '@/components/RecipeCard/RecipeCard';
import { getRecipes } from '@/utils/getRecipes';

export default function User({ params }) {
    const { loggedIn, publicKey, privateKey } = React.useContext(UserContext);
    const { id } = params
    const { recipes } = getRecipes({ ids: [id.toString()] })

    if (!recipes) {
        return <p>Loading...</p>;
    }

    return (
        <main >
            <article>
                {recipes.map((recipe) => {
                    return (
                        <RecipeCard
                            page='recipe'
                            recipe={recipe}
                            deleteable={(loggedIn && publicKey === recipe.pubkey)}
                            privateKey={privateKey}
                        />
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