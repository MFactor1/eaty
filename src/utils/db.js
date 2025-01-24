const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '../../db/recipes.db');
const db = new Database(dbPath, { verbose: console.log });

export const Attrs = {
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

module.exports = db;

function addRecipe(name, ingredients, instructions, calories) {
  const stmt = db.prepare(`
    INSERT INTO recipes (name, ingredients, instructions, calories)
    VALUES (?, ?, ?, ?)
  `);
  return stmt.run(name, ingredients, instructions, calories);
}

function getAllRecipes(attrs) {
  const stmt = db.prepare(`
    SELECT ? FROM recipes
  `);
  return stmt.all(attrs);
}

function searchRecipes(keyword) {
  const stmt = db.prepare(`
    SELECT * FROM recipes WHERE name LIKE ?
  `);
  return stmt.all(`%?%`, keyword);
}

function getRecipe(id) {
  const stmt = db.prepare(`
    SELECT * FROM recipes WHERE id = ?
  `);
  return stmt.all(id);
}

module.exports = {
  addRecipe,
  getAllRecipes,
  searchRecipes,
  getRecipe,
}
