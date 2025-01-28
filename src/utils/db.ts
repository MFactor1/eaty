import Database, { Database as SQLiteDatabase, Statement,  } from 'better-sqlite3';
import path from 'path';

const dbPath: string = path.resolve(__dirname, '../../db/recipes.db');
const db: SQLiteDatabase = new Database(dbPath, { verbose: console.log });

db.exec(`
  CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    calories INTEGER NOT NULL
  );
`);

export interface Recipe {
  id?: number;
  name: string;
  ingredients: string;
  instructions: string;
  calories: number;
}

export function addRecipe(recipe: Omit<Recipe, "id">): boolean {
  try {
    const stmt: Statement<[string, string, string, number]> = db.prepare(`
      INSERT INTO recipes (name, ingredients, instructions, calories)
      VALUES (?, ?, ?, ?)
    `);
    stmt.run(recipe.name, recipe.ingredients, recipe.instructions, recipe.calories);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return false;
    }
  }
}

export function getAllRecipes(): Recipe[] {
  const stmt: Statement = db.prepare(`
    SELECT * FROM recipes
  `);
  return stmt.all() as Recipe[];
}

export function searchRecipes(keyword: string): Recipe[] {
  const stmt: Statement<string> = db.prepare(`
    SELECT * FROM recipes WHERE name LIKE ?
  `);
  return stmt.all(`%${keyword}%`) as Recipe[];
}

export function getRecipe(id: number): Recipe {
  const stmt: Statement<number> = db.prepare(`
    SELECT * FROM recipes WHERE id = ?
  `);
  return stmt.get(id) as Recipe;
}

export function rmRecipe(id: number): boolean {
  try {
    const stmt: Statement<number> = db.prepare(`
      DELETE FROM recipes WHERE id = ?
    `);
    stmt.run(id);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return false;
    }
  }
}

export default db;
