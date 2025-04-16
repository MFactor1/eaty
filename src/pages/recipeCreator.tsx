import { useState } from 'react';

export default function recipeCreator() {
  const [text, setText] = useState("");

  const addRecipe = async (
    name: string,
    ingredients: string[],
    quantities: number[],
    units: string[],
    instructions: string,
    calories: number
  ) => {
    await window.database.createRecipe(name, ingredients, quantities, units, instructions, calories);
  }

  const getAllRecipes = async () => {
    return await window.database.getAllRecipes();
  }

  async function printRecipes() {
    const recipes = await window.database.getAllRecipes();
    console.log(`num recipes: ${recipes.length}`);
    for (let recipe of recipes) {
      console.log(`Recipe ${recipe.id}: ${recipe.name}, ${recipe.instructions}, ${recipe.calories}`);
      for (let ingredient of recipe.ingredients) {
        console.log(ingredient);
      }
    }
  }

  return (
    <div>
      <p>
        Recipe Creator
        <button onClick={async () => {addRecipe(
          "button recipe",
          ["button ingredient #1", "button ingredient #2"],
          [3, 5],
          ["g", "mL"],
          "button instructions",
          123
        )}}>Create Recipe</button>
        <button onClick={async () => {addRecipe(
          "blah recipe",
          ["blah ingredient #1", "blah ingredient #2"],
          [6, 9],
          ["cup", "lbs"],
          "blah instructions",
          69
        )}}>Create Recipe</button>
        <button onClick={async () => {await printRecipes()}}>View Recipes</button>
      </p>
      <form>
        <input
          placeholder="Recipe Name"
          className="styled-input"
        />
        <textarea
          placeholder="Recipe Ingredients"
          rows={3}
          className="styled-input"
        />
        <textarea
          placeholder="Recipe Instructions"
          rows={15}
          className="styled-input"
        />
      </form>
    </div>
  );
}
