export {};

declare global {
  interface Window {
    database: {
      addRecipe: (
        name: string,
        ingredients: string,
        instructions: string,
        calories: number
      ) => Promise<boolean>;
      getAllRecipeIds: () => Promise<Pick<Recipe, "id">[]>;
      getAllRecipes: () => Promise<Recipe[]>;
      searchRecipes: (keyword: string) => Promise<Recipe[]>;
      getRecipe: (id: number) => Promise<Recipe>;
      rmRecipe: (id: number) => Promise<boolean>;
    }
  }
}
