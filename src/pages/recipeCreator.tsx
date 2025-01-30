import React from 'react';

export default function recipeCreator() {
  const addRecipe = async (name: string, ingredients: string, instructions: string, calories: number) => {
  await window.database.addRecipe(name, ingredients, instructions, calories);
  }

  const getAllRecipes = async () => {
    return await window.database.getAllRecipes();
  }

  async function printRecipes() {
    const recipes = await window.database.getAllRecipes();
    console.log(`num recipes: ${recipes.length}`);
    for (let recipe of recipes) {
      console.log(`Recipe ${recipe.id}: ${recipe.name}, ${recipe.ingredients}, ${recipe.instructions}, ${recipe.calories}`);
    }
  }

  return (
    <div>
      <p>
        Recipe Creator
        <button onClick={async () => {addRecipe("button recipe", "button ingredients", "button instructions", 123)}}>Create Recipe</button>
        <button onClick={async () => {await printRecipes()}}>View Recipes</button>
      </p>
    </div>
  );
}
