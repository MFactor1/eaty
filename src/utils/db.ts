import Database, { Database as SQLiteDatabase, Statement,  } from 'better-sqlite3';
import path from 'path';

let _db: SQLiteDatabase | null = null;

function getDb() {
  if (!_db) {
    const dbPath: string = path.resolve(__dirname, '../../db/recipes.db');
    _db = new Database(dbPath, { verbose: console.log });
    initTables(_db);
  }
  return _db;
}

function initTables(db: SQLiteDatabase) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      instructions TEXT NOT NULL,
      calories INTEGER NOT NULL
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS ingredients (
      name TEXT PRIMARY KEY
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS recipeIngredients (
      recipeId INTEGER NOT NULL,
      ingredient TEXT NOT NULL,
      quantity INTEGER,
      unit TEXT,
      PRIMARY KEY (recipeId, ingredient),
      FOREIGN KEY (recipeId) REFERENCES recipes(id) ON DELETE CASCADE,
      FOREIGN KEY (ingredient) REFERENCES ingredients(name) ON DELETE CASCADE
    );
  `);
}

export interface Ingredient {
  name: string;
  quantity?: number;
  unit?: string;
}

export interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[],
  instructions: string;
  calories: number;
}

export function addRecipe(recipe: Omit<Recipe, "id" | "ingredients">): Pick<Recipe, "id"> | null {
  try {
    const stmt: Statement<[string, string, number]> = getDb().prepare(`
      INSERT INTO recipes (name, instructions, calories)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(recipe.name, recipe.instructions, recipe.calories);

    // Checking before BigInt conversion to number
    if (result.lastInsertRowid > Number.MAX_SAFE_INTEGER) {
      throw Error("Too many items in database");
    } else {
      return {id: Number(result.lastInsertRowid)}
    }

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error while adding recipe: " + error.message);
    }
    return null;
  }
}

export function getAllRecipeIds(): Pick<Recipe, "id">[] {
  const stmt: Statement = getDb().prepare(`
    SELECT id FROM recipes
  `);
  return stmt.all() as Pick<Recipe, "id">[];
}

export function queryAllRecipes(): Omit<Recipe, "ingredients">[] {
  const stmt: Statement = getDb().prepare(`
    SELECT * FROM recipes
  `);
  return stmt.all() as Omit<Recipe, "ingredients">[];
}

export function searchRecipes(keyword: string): Omit<Recipe, "ingredients">[] {
  const stmt: Statement<string> = getDb().prepare(`
    SELECT * FROM recipes WHERE name LIKE ?
  `);
  return stmt.all(`%${keyword}%`) as Omit<Recipe, "ingredients">[];
}

export function getRecipe(id: number): Recipe {
  const stmt: Statement<number> = getDb().prepare(`
    SELECT * FROM recipes WHERE id = ?
  `);
  return stmt.get(id) as Recipe;
}

export function rmRecipe(id: number): boolean {
  try {
    const stmt: Statement<number> = getDb().prepare(`
      DELETE FROM recipes WHERE id = ?
    `);
    stmt.run(id);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error while removing recipe: " + error.message);
    }
    return false;
  }
}

export function addIngredient(name: string): boolean {
  try {
    const stmt: Statement<string> = getDb().prepare(`
      INSERT or IGNORE INTO ingredients (name)
      VALUES (?)
    `);
    stmt.run(name);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error while adding ingredient: " + error.message);
    }
    return false;
  }
}

export function getAllIngredients(): Ingredient[] {
  const stmt: Statement = getDb().prepare(`
    SELECT * FROM ingredients
  `);
  return stmt.all() as Ingredient[];
}

export function addRecipeIngredient(recipeId: number, ingredient: Ingredient) {
  try {
    const stmt: Statement<[number, string, number, string]> = getDb().prepare(`
      INSERT INTO recipeIngredients (recipeId, ingredient, quantity, unit)
      VALUES (?, ?, ?, ?)
    `);
    stmt.run(
      recipeId,
      ingredient.name,
      "quantity" in ingredient ? ingredient.quantity : null,
      "unit" in ingredient ? ingredient.unit : null,
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error while adding recipe ingredient: " + error.message);
    }
    return false;
  }
}

export function getRecipeIngredients(recipeId: number): Ingredient[] {
  const stmt: Statement<number> = getDb().prepare(`
    SELECT ingredient, quantity, unit FROM recipeIngredients
    WHERE recipeId = ?
  `);
  return stmt.all(recipeId) as Ingredient[];
}

