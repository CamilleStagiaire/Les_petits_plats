import { Recipe, Ingredient } from "./models/Recipe.js";
import { RecipeCard } from "./template/index.js";
import { DisplayRecipe } from "./components/DisplayRecipe.js";
import { Dropdown } from "./components/Dropdown.js";
import recipes from "../data/recipes.js";

class App {

  async main() {
    // Transformer les données en tableau d'objets
    const recipeObjects = Recipe.createRecipesFromData(recipes);

    // Afficher les cartes de recette
    this.displayRecipes(recipeObjects);
    
    // Récupérer les ingrédients uniques
    const uniqueIngredients = Recipe.getAllIngredients(recipeObjects);
    const uniqueAppliances = Recipe.getAllAppliances(recipeObjects);
    const uniqueUstensils = Recipe.getAllUstensils(recipeObjects);
    console.log(uniqueIngredients);
    console.log(uniqueAppliances);
    console.log(uniqueUstensils);

    // Initialiser les dropdowns
    Dropdown.initDropdowns(uniqueIngredients, uniqueAppliances, uniqueUstensils);

    // affichage de la recette dans une modale
    const recipeDisplays = document.querySelectorAll('.article');
    recipeDisplays.forEach((recipeDisplay) => {
      recipeDisplay.addEventListener('click', () => {
        const recipeId = parseInt(recipeDisplay.getAttribute('data-id')); 
        const recipe = recipeObjects.find((r) => r.id === recipeId); 
        const display = new DisplayRecipe(recipe);
        display.openModal();
      });
    });
  }

  /**
   * Création des cartes de recettes
   * @param {Array<Recipe>} recipeObjects
   */
  displayRecipes(recipeObjects) {
    const container = document.getElementById("recipe-container");
    recipeObjects.forEach((recipe) => {
      const recipeCard = new RecipeCard(recipe);
      const card = recipeCard.createRecipeCard();
      container.appendChild(card);
    });
  }
}

const app = new App();
app.main();
