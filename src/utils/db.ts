import Database, { Database as SQLiteDatabase, Statement } from 'better-sqlite3';
import path from 'path';

const dbPath: string = path.resolve(__dirname, '../../db/recipes.db');
const db: SQLiteDatabase = new Database(dbPath, { verbose: console.log });

export const Attrs: Record<string, string> = {
  ID: "id",
  NAME: "name",
  INGREDIENTS: "ingredients",
  INSTRUCTIONS: "instructions",
  CALORIES: "calories",
  ALL: "*"
};

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
  calories: string;
}

export function addRecipe(name: string, ingredients: string, instructions: string, calories: number) {
  const stmt: Statement<[string, string, string, number]> = db.prepare(`
    INSERT INTO recipes (name, ingredients, instructions, calories)
    VALUES (?, ?, ?, ?)
  `);
  return stmt.run(name, ingredients, instructions, calories);
}

export function getAllRecipes(attrs: string) {
  const stmt: Statement<string> = db.prepare(`
    SELECT ? FROM recipes
  `);
  return stmt.all(attrs);
}

export function searchRecipes(keyword: string) {
  const stmt: Statement<string> = db.prepare(`
    SELECT * FROM recipes WHERE name LIKE ?
  `);
  return stmt.all(`%${keyword}%`);
}

export function getRecipe(id: number) {
  const stmt: Statement<number> = db.prepare(`
    SELECT * FROM recipes WHERE id = ?
  `);
  return stmt.all(id);
}

export default db;
