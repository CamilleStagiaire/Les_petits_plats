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

    this.selectedItems = [];

    this.searchInput = document.querySelector('.search-input');

    
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

    document.addEventListener('dropdownItemSelected', (event) => {
      setTimeout(() => {
        this.updateRecipes(document.querySelector(".search-input").value, event.detail);
        this.searchInput.value = '';
        this.searchInput.focus();
      }, 0);
    });

    document.addEventListener('buttonItemSelected', (event) => {
      setTimeout(() => {
        const selectedItem = event.detail;
        const index = this.selectedItems.indexOf(selectedItem);
        if (index > -1) {
          this.selectedItems.splice(index, 1);
        }
        this.updateRecipes(document.getElementById("search").value);
      }, 0);
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
  * Filtrer et afficher les recettes en fonction de la recherche 
  * @param {string} searchString
  * @param {string} selectedItem
  */
  updateRecipes(searchString = "", selectedItem = "") {
    const MIN_CHARACTERS = 3;
    let filteredRecipes = this.recipes;

    if (selectedItem !== "") {
      this.selectedItems.push(selectedItem);
    }

    // Filtrer les recettes par les mots dans la barre de recherche
    if (searchString.length >= MIN_CHARACTERS) {
      filteredRecipes = this.search.search(searchString);
    }

    // Filtrer par les tags sélectionnés
    if (this.selectedItems.length > 0) {
      filteredRecipes = this.search.searchByItems(this.selectedItems, filteredRecipes);
    }

    const uniqueIngredients = Recipe.getAllIngredients(filteredRecipes);
    const uniqueAppliances = Recipe.getAllAppliances(filteredRecipes);
    const uniqueUstensils = Recipe.getAllUstensils(filteredRecipes);
    

    // Mettre à jour les éléments de chaque dropdown avec les nouvelles listes
    this.ingredientsDropdown.insertDropdown(uniqueIngredients);
    this.ustensilsDropdown.insertDropdown(uniqueUstensils);
    this.appliancesDropdown.insertDropdown(uniqueAppliances);
    console.log(uniqueIngredients);
   
    const container = document.getElementById("recipe-container");
    container.innerHTML = "";
    this.displayRecipes(filteredRecipes);
    console.log(filteredRecipes.length);
    
  }
}

const app = new App(recipes);
app.main();
