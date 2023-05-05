import React from 'react'
import RecipeCard from '@/components/RecipeCard';
import { getRecipes } from '@/utils/getRecipes';
import { UserContext } from '@/components/context/UserProvider';
import { getBookmarks } from '@/utils/getBookmarks';
import styled from '@emotion/styled';

const MenuItem = styled.h3`
    flex-basis: 50%;
    text-align: center; 
    text-decoration: ${p => p.bk ? null : 'underline 4px solid var(--black30)'};
    cursor: pointer;
`


export default function User({ params }) {
    const { publicKey } = React.useContext(UserContext)
    const { id } = params
    const [lookAtBookmarks, setLookAtBookmarks] = React.useState(false)

    return (
        <main >
            {
                publicKey !== id ?
                    <h3>Recipes from {id?.slice(0, 5)}...</h3> :
                    <div style={{ display: 'flex', marginTop: '10px' }}>
                        <MenuItem
                            onClick={() => {
                                setLookAtBookmarks(true)
                            }}
                            bk={!lookAtBookmarks}
                        >Your bookmarks</MenuItem>
                        <MenuItem
                            onClick={() => {
                                setLookAtBookmarks(false)
                            }}
                            bk={lookAtBookmarks}
                        >Your recipes</MenuItem>
                    </div>
            }
            {
                lookAtBookmarks ?
                    <Bookmarks /> :
                    <UserInfo params={params} />
            }
        </main >
    )
}

function UserInfo({ params }) {
    const { id } = params
    const { recipes } = getRecipes({ authors: [id] })
    console.log({ authors: [id] })
    return (
        <>
            <article>
                {recipes.map((recipe) => {
                    return (
                        <RecipeCard key={recipe.id} recipe={recipe} page='user' />
                    )
                })
                }
                {recipes.length === 0 ?
                    <fieldset>
                        <h4>
                            Go write a recipe!
                        </h4>
                    </fieldset>
                    :
                    null}
            </article>
        </>
    )
}


function Bookmarks() {
    const { publicKey } = React.useContext(UserContext)
    const { bookmarks } = getBookmarks(publicKey)
    const booktags = []
    booktags.push(bookmarks.map(obj => obj.tags.find(tag => tag[0] === 'e')[1]))
    console.log({ bookmarks })
    const { recipes } = getRecipes({ ids: booktags })
    return (
        <>
            <article>
                {recipes.map((recipe) => {
                    return (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    )
                })
                }
                {recipes.length === 0 ?
                    <fieldset>
                        <h4>
                            Bookmark a recipe! (or maybe wait a second for it to load)
                        </h4>
                    </fieldset>
                    :
                    null}
            </article>
        </>
    )
}


export function getServerSideProps(context) {
    return {
        props: { params: context.params }
    };
}