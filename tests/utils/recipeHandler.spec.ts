import * as db from '@utils/db';
import { getRandRecipe, createRecipe, getAllRecipes } from '@utils/recipeHandler';

jest.mock('@utils/db');
const mockedDb = db as jest.Mocked<typeof db>

describe('recipeHandler', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('createRecipe calls addRecipe, addIngredient, addRecipeIngredient correctly', async () => {

    const name = 'Soup';
    const ingredients = ['milk', 'salt'];
    const quantities = [600, 1];
    const units = ['mL', 'tsp'];
    const instructions = "soup123 456";
    const calories = 123;
    const id = 55;
    mockedDb.addRecipe.mockReturnValue({ id: id });

    const result = createRecipe(name, ingredients, quantities, units, instructions, calories);

    expect(mockedDb.addRecipe).toHaveBeenCalledWith({ name: name, instructions: instructions, calories: calories });
    expect(mockedDb.addIngredient).toHaveBeenCalledWith(ingredients[0]);
    expect(mockedDb.addRecipeIngredient).toHaveBeenCalledWith(id, { name: ingredients[0], quantity: quantities[0], unit: units[0] });
    expect(mockedDb.addIngredient).toHaveBeenCalledWith(ingredients[1]);
    expect(mockedDb.addRecipeIngredient).toHaveBeenCalledWith(id, { name: ingredients[1], quantity: quantities[1], unit: units[1] });
    expect(result).toBe(true);
  });

  it('createRecipe called with no calorie value', async () => {

    const name = 'Soup';
    const ingredients = ['milk', 'salt'];
    const quantities = [600, 1];
    const units = ['mL', 'tsp'];
    const instructions = "soup123 456";
    const id = 55;
    mockedDb.addRecipe.mockReturnValue({ id: id });

    const result = createRecipe(name, ingredients, quantities, units, instructions);

    expect(mockedDb.addRecipe).toHaveBeenCalledWith({ name: name, instructions: instructions, calories: null });
    expect(mockedDb.addIngredient).toHaveBeenCalledWith(ingredients[0]);
    expect(mockedDb.addRecipeIngredient).toHaveBeenCalledWith(id, { name: ingredients[0], quantity: quantities[0], unit: units[0] });
    expect(mockedDb.addIngredient).toHaveBeenCalledWith(ingredients[1]);
    expect(mockedDb.addRecipeIngredient).toHaveBeenCalledWith(id, { name: ingredients[1], quantity: quantities[1], unit: units[1] });
    expect(result).toBe(true);
  });

  it('createRecipe called with no quantity or units', async () => {

    const name = 'Soup';
    const ingredients = ['milk', 'salt'];
    const quantities: number[] = [null, null];
    const units: string[] = [null, null];
    const instructions = "soup123 456";
    const calories = 123;
    const id = 55;
    mockedDb.addRecipe.mockReturnValue({ id: id });

    const result = createRecipe(name, ingredients, quantities, units, instructions, calories);

    expect(mockedDb.addRecipe).toHaveBeenCalledWith({ name: name, instructions: instructions, calories: calories });
    expect(mockedDb.addIngredient).toHaveBeenCalledWith(ingredients[0]);
    expect(mockedDb.addRecipeIngredient).toHaveBeenCalledWith(id, { name: ingredients[0] });
    expect(mockedDb.addIngredient).toHaveBeenCalledWith(ingredients[1]);
    expect(mockedDb.addRecipeIngredient).toHaveBeenCalledWith(id, { name: ingredients[1] });
    expect(result).toBe(true);
  });

  it('createRecipe called with no ingredients', async () => {

    const name = 'Soup';
    const ingredients: string[] = [];
    const quantities: number[] = [];
    const units: string[] = [];
    const instructions = "soup123 456";
    const calories = 123;
    const id = 55;
    mockedDb.addRecipe.mockReturnValue({ id: id });

    const result = createRecipe(name, ingredients, quantities, units, instructions, calories);

    expect(mockedDb.addRecipe).toHaveBeenCalledWith({ name: name, instructions: instructions, calories: calories });
    expect(mockedDb.addIngredient).not.toHaveBeenCalled();
    expect(mockedDb.addRecipeIngredient).not.toHaveBeenCalled();
    expect(result).toBe(true);
  });
});
