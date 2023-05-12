import { Recipe, Ingredient } from "./models/Recipe.js";
import { RecipeCard } from "./template/index.js";
import { DisplayRecipe } from "./components/DisplayRecipe.js";
import { Dropdown } from "./components/Dropdown.js";
import { Search } from "./components/Search.js";
import recipes from "../data/recipes.js";

class App {
  /**
   * @param {Array<Recipe>} recipes - Tableau des recettes
   */
  constructor(recipes) {
    this.recipes = recipes;
    this.search = new Search(this.recipes);
    this.ingredientsDropdown = null;
    this.ustensilsDropdown = null;
    this.appliancesDropdown = null;
  }

  async main() {
    // Transformer les données en tableau d'objets
    const recipeObjects = Recipe.createRecipesFromData(recipes);

    // Afficher les cartes de recette
    this.displayRecipes(recipeObjects);

    // Récupérer les ingrédients uniques
    const uniqueIngredients = Recipe.getAllIngredients(recipeObjects);
    const uniqueAppliances = Recipe.getAllAppliances(recipeObjects);
    const uniqueUstensils = Recipe.getAllUstensils(recipeObjects);

    // Initialiser les dropdowns
    const dropdownInstances = Dropdown.initDropdowns(uniqueIngredients, uniqueAppliances, uniqueUstensils);
    this.ingredientsDropdown = dropdownInstances.ingredientsDropdown;
    this.ustensilsDropdown = dropdownInstances.ustensilsDropdown;
    this.appliancesDropdown = dropdownInstances.appliancesDropdown;

    // affichage de la recette dans une modale
    const recipeContainer = document.getElementById("recipe-container");
    recipeContainer.addEventListener('click', (e) => {
      const recipeDisplay = e.target.closest('.article');
      if (recipeDisplay) {
        const recipeId = parseInt(recipeDisplay.getAttribute('data-id'));
        const recipe = recipeObjects.find((r) => r.id === recipeId);
        const display = new DisplayRecipe(recipe);
        display.openModal();
      }
    });

    // Mettre à jour les recettes affichées en fonction de la recherche
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", () => {
      const searchString = searchInput.value;
      this.updateRecipes(searchString);
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

  /**
  * Filtrer et afficher les recettes en fonction de la chaîne de recherche 
  * @param {string} searchString
  */
  updateRecipes(searchString) {
    const MIN_CHARACTERS = 3;
    if (searchString.length >= MIN_CHARACTERS) {
      const filteredRecipes = this.search.search(searchString);
      const uniqueIngredients = Recipe.getAllIngredients(filteredRecipes);
      const uniqueAppliances = Recipe.getAllAppliances(filteredRecipes);
      const uniqueUstensils = Recipe.getAllUstensils(filteredRecipes);

      this.ingredientsDropdown.insertDropdown(uniqueIngredients);
      this.ustensilsDropdown.insertDropdown(uniqueUstensils);
      this.appliancesDropdown.insertDropdown(uniqueAppliances);
      console.log(uniqueIngredients);
      console.log(uniqueUstensils);
      console.log(uniqueAppliances);

      const container = document.getElementById("recipe-container");
      container.innerHTML = "";
      this.displayRecipes(filteredRecipes);
    }
  }
}

const app = new App(recipes);
app.main();
