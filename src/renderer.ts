/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './app.tsx';
import './styles.css';

const getAllRecipes = async () => {
  return await window.database.getAllRecipes();
}

(async () => {
  const recipes = await getAllRecipes();
  console.log(`num recipes: ${recipes.length}`);
  for (let recipe of recipes) {
    console.log(`removing recipe: ${recipe.id} - ${recipe.name}`);
    await window.database.rmRecipe(recipe.id);
  }
  const recipes_after = await getAllRecipes();
  console.log(`num remaining recipes: ${recipes_after.length}`);
})();

