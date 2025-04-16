// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import { Recipe } from './utils/db';

contextBridge.exposeInMainWorld('database', {
  createRecipe: (
    name: string,
    ingredients: string[],
    quantities: number[],
    units: string[],
    instructions: string,
    calories: number = null,
  ) => ipcRenderer.invoke('createRecipe', name, ingredients, quantities, units, instructions, calories),
  getAllRecipeIds: () => ipcRenderer.invoke('getAllRecipeIds'),
  getAllRecipes: () => ipcRenderer.invoke('getAllRecipes'),
  searchRecipes: (keyword: string) => ipcRenderer.invoke('searchRecipes', keyword),
  getRecipe: (id: number) => ipcRenderer.invoke('getRecipe', id),
  rmRecipe: (id: number) => ipcRenderer.invoke('rmRecipe', id),
  getRandRecipe: () => ipcRenderer.invoke('getRandRecipe'),
});
