import React from 'react'
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./ingredientsList"
import { getRecipeFromChefClaude } from "./api";


function Main(){
    const [ingredients, setIngredients] = React.useState(
        ["all the main spices", "pasta", "ground beef", "tomato paste"]

    )
    


    // const [recipe, setRecipe] = React.useState("")

    // async function getRecipe() {
    //     const recipeMarkdown = await getRecipeFromChefClaude(ingredients)
    //     setRecipe(recipeMarkdown)
    // }

    const [recipeShown, setRecipeShown] = React.useState("")

    async function resipeDisply(){
        const recipeMarkdown = await getRecipeFromChefClaude(ingredients)
        setRecipeShown(recipeMarkdown )
            
    
    }

    // const [recipe, setRecipe] = React.useState("");


    // async function resipeDisply() {
    //     try {
    //         const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
    //         setRecipe(recipeMarkdown);
    //     } catch (error) {
    //         console.error("Failed to fetch recipe:", error);
    //     }
    // }
    

  

    function handleSubmit(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }


    return (
        <div className="main">
            <form action={handleSubmit} className="form-content">
                
                    <input
                        type="text"
                        placeholder="e.g. oregano"
                        aria-label="Add ingredient"
                        name="ingredient"/>
                    <button> Add ingredient</button>
            </form>

     { ingredients.length > 0 && <IngredientsList
                    ingredients={ingredients}
                    resipeDisply={resipeDisply}
                />    }

{recipeShown && <ClaudeRecipe recipeShown={recipeShown} />}

 
        </div>

    )

}
export default Main;