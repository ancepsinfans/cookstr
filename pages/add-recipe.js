import React from 'react'
import { useImmerReducer } from 'use-immer';
import { formAndSignEvent, sendEventToRelay } from '@/utils';
import { UserContext } from '@/components/context/UserProvider';
import { useRouter } from 'next/router';
import TagInput from '@/components/TagInput/TagInput';


const recipe = {
    name: 'Chocolate Chip Cookies',
    tags: ['chocolate', 'cookies', 'dessert'],
    ingredients: [
        {
            amount: .75,
            unit: 'cup',
            ingredient: 'butter'
        },
        {
            amount: .75,
            unit: 'cup',
            ingredient: 'brown sugar'
        },
        {
            amount: .25,
            unit: 'cup',
            ingredient: 'granulated sugar'
        },
        {
            amount: 1,
            unit: null,
            ingredient: 'egg'
        },
        {
            amount: 2,
            unit: 'cup',
            ingredient: 'flour'
        },
        {
            amount: 1,
            unit: 'tsp',
            ingredient: 'baking soda'
        },
        {
            amount: .5,
            unit: 'tsp',
            ingredient: 'salt'
        },
        {
            amount: 1.25,
            unit: 'cup',
            ingredient: 'chocolate chips'
        },

    ],
    instructions: [
        "Beat butter, brown sugar, and sugar together until combined and creamy.",
        "Beat in egg.",
        "Whisk together flour, baking soda, and salt.",
        "Add dry ingredients into wet ingredients, combine.",
        "Mix in chocolate chips.",
        "Chill in refrigerator 1hr - 3 days.",
        "Preheat oven to 350°F/177°C.",
        "Form cookies in .25 cup portions, and place on the cookie sheet.",
        "Bake for 11 minutes, until golden brown on the edges."
    ]
}
const OPTIONS = [
    'cup(s)',
    'gram(s)',
    'oz(s)',
    'ml',
    'tsp(s)',
    'tbl(s)',
    'pinch(es)',
    'stick(s)',
    'clove(s)',

];

function reducer(draftState, action) {
    switch (action.type) {
        case 'add-ingredient': {
            draftState.ingredients.push({
                amount: action.amount,
                unit: action.unit,
                ingredient: action.ingredient
            })
            return;
        }
        case 'name': {
            draftState.name = action.name
            return
        }
        case 'add-step': {
            draftState.instructions.push(action.step)
            return;
        }

        case 'ADD_TAG': {
            if (!draftState.tags.includes(action.payload)) {

                draftState.tags.push(action.payload)
            }

            return
        }

        case 'REMOVE_TAG': {
            const idx = draftState.tags.indexOf(action.payload)
            if (idx !== -1) {
                draftState.tags.splice(idx, 1)
            }
            return
        }
        case 'SET_TAGS':
            return action.payload;

        case 'reset': {
            draftState.ingredients = []
            draftState.instructions = []
            draftState.name = ''
            draftState.tags = []
            return;
        }
    }
}


export default function Recipe() {
    const { privateKey } = React.useContext(UserContext)
    const [state, dispatch] = useImmerReducer(reducer, {
        name: '',
        tags: [],
        ingredients: [],
        instructions: [],

    })
    const [unit, setUnit] = React.useState('')
    const [amount, setAmount] = React.useState('')
    const [ingredient, setIngredient] = React.useState('')
    const [step, setStep] = React.useState('')

    const router = useRouter()

    return (
        <main >
            <article id='add'>
                <fieldset>
                    <div >
                        <h2>
                            Recipe for
                        </h2>
                        <label>
                            <input type='text' value={state.name} onChange={(e) => {
                                dispatch({
                                    'type': 'name',
                                    name: e.target.value
                                })
                            }} />
                        </label>
                        <br />

                        <TagInput tags={state.tags} dispatch={dispatch} />


                        <h4>Ingredients</h4>
                        <ul>
                            {state.ingredients.map((e, idx) => {
                                return (
                                    <li key={idx}>{`${e.amount} ${e.unit ? e.unit : ''} ${e.ingredient}`}</li>
                                )
                            })}
                        </ul>
                        <form onSubmit={(e) => {

                            e.preventDefault()
                            dispatch({
                                type: 'add-ingredient',
                                amount,
                                unit,
                                ingredient
                            })
                            setAmount('')
                            setIngredient('')
                            setUnit('')
                        }}>
                            <fieldset >
                                <legend>Add ingredient</legend>
                                <label htmlFor="amount">
                                    amount:{'\t'}
                                    <input
                                        id="amount"
                                        type='number'
                                        min={0}
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}

                                    />
                                </label>
                                <br />

                                <label htmlFor="unit">
                                    units:{' '}

                                    <input
                                        id="unit"
                                        type='text'
                                        list='units'
                                        onChange={event => {
                                            setUnit(event.target.value)
                                        }}
                                    />
                                    <datalist id='units'>
                                        {OPTIONS.map(option => (
                                            <option
                                                key={option}
                                                value={option}
                                            >
                                                {option}
                                            </option>
                                        ))}
                                    </datalist>
                                </label>
                                <br />
                                <label htmlFor="ingredient">
                                    ingredient:{' '}
                                    <input
                                        id="ingredient"
                                        required
                                        value={ingredient}
                                        onChange={(e) => setIngredient(e.target.value)}

                                    />
                                </label>
                                <br />
                                <button
                                    type='submit'
                                >
                                    +
                                </button>
                            </fieldset>
                        </form>
                        <h4>Instructions</h4>
                        <ol>
                            {state.instructions.map((e, idx) => {
                                return (
                                    <li key={idx}>{e}</li>
                                )
                            })}
                        </ol>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            dispatch({ type: 'add-step', step })
                            setStep('')
                        }}>
                            <fieldset >
                                <legend>Add step</legend>
                                <label htmlFor="step">
                                    step:
                                    <input
                                        id="step"
                                        value={step}
                                        onChange={(e) => setStep(e.target.value)}

                                    />
                                </label>
                                <br />
                                <button
                                    type='submit'
                                >
                                    +
                                </button>
                            </fieldset>
                        </form>
                    </div>
                    <button onClick={() => {
                        if (privateKey === '') {
                            if (confirm('Login first?')) {

                                router.push('/login')
                            }
                            return
                        }
                        sendEventToRelay(formAndSignEvent(privateKey, 99, state))
                        dispatch({
                            type: 'reset'
                        })
                        setAmount('')
                        setIngredient('')
                        setUnit('')
                        setStep('')
                        window.alert('Recipe added!')
                    }}>
                        post it
                    </button>
                </fieldset>
            </article>

        </main >
    )
}