import { Recipe, Ingredient } from './db'
import * as db from './db'

var recipeIds: Pick<Recipe, "id">[];
recipeIds = [];

export function initializeRecipeIds() {
  console.log("Initializing recipe ids");
  recipeIds = db.getAllRecipeIds();
}

export function getRandRecipe(): Recipe | null {
  if (recipeIds.length > 0) {
    const idx = Math.floor(Math.random() * (recipeIds.length));
    const recipe = db.getRecipe(recipeIds[idx].id);
    const ingredients = db.getRecipeIngredients(recipeIds[idx].id);
    return {...recipe, ...ingredients} as Recipe;
  } else {
    return null;
  }
}

export function createRecipe(
  name: string,
  ingredients: string[],
  quantities: number[],
  units: string[],
  instructions: string,
  calories: number = null
): boolean {

  let ingredient_list: Ingredient[] = [];

  for (let i = 0; i < ingredients.length; i++) {
    let quantity = {}
    let unit = {}
    if (quantities[i]) { quantity = { quantity: quantities[i] } }
    if (units[i]) { unit = { unit: units[i] } }
    ingredient_list.push({ name: ingredients[i] , ...quantity, ...unit });
  }

  const newId = db.addRecipe({
    name: name,
    instructions: instructions,
    calories: calories
  });

  for (let ingredient of ingredient_list) {
    db.addIngredient(ingredient.name);
    db.addRecipeIngredient(newId.id, ingredient);
  }

  if (newId) {
    recipeIds.push(newId);
    return true;
  } else {
    console.error("No recipe id returned");
    return false;
  }
}

export function getAllRecipes(): Recipe[] {
  const recipes: Omit<Recipe, "ingredient">[] = db.queryAllRecipes();
  let recipes_complete: Recipe[] = [];

  for (let i = 0; i < recipes.length; i++) {
    const ingredients = db.getRecipeIngredients(recipes[i].id)
    recipes_complete.push({ ...recipes[i], ingredients: ingredients });
  }

  return recipes_complete;
}
