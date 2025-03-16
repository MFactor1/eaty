// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('database', {
  addRecipe: (
    name: string,
    ingredients: string,
    instructions: string,
    calories: string
  ) => ipcRenderer.invoke('addRecipe', name, ingredients, instructions, calories),
  getAllRecipeIds: () => ipcRenderer.invoke('getAllRecipeIds'),
  getAllRecipes: () => ipcRenderer.invoke('getAllRecipes'),
  searchRecipes: (keyword: string) => ipcRenderer.invoke('searchRecipes', keyword),
  getRecipe: (id: number) => ipcRenderer.invoke('getRecipe', id),
  rmRecipe: (id: number) => ipcRenderer.invoke('rmRecipe', id)
});
