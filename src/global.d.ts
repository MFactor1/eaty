export {};

declare global {
  interface Window {
    database: {
      createRecipe: (
        name: string,
        ingredients: string[],
        quantities: number[],
        units: string[],
        instructions: string,
        calories: number = null
      ) => Promise<boolean>;
      getAllRecipeIds: () => Promise<Pick<Recipe, "id">[]>;
      getAllRecipes: () => Promise<Recipe[]>;
      searchRecipes: (keyword: string) => Promise<Recipe[]>;
      getRecipe: (id: number) => Promise<Recipe>;
      rmRecipe: (id: number) => Promise<boolean>;
      getRandRecipe: () => Promise<Recipe>;
    }
  }
}
