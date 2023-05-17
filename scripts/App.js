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
    this.selectedIngredients = [];
    this.selectedUstensils = [];
    this.selectedAppliances = [];
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


    this.addDropdownEventListeners();
  }

  addDropdownEventListeners() {
    const selectedItemsContainer = document.querySelector(".container-selected");
    const searchDropdownItems = document.querySelectorAll(".dropdown-item");

    searchDropdownItems.forEach((dropdownItem) => {
      dropdownItem.addEventListener("click", (event) => {
        const selectedItem = event.target.getAttribute("data-value");
       // console.log(selectedItem);
        const parentContainer = selectedItemsContainer.querySelector(".parent-container");
        const parentContainerIcon = parentContainer.querySelector("i");

        this.filterRecipes(selectedItem);

        parentContainerIcon.addEventListener("click", (e) => {
          const iconDataValue = parentContainerIcon.getAttribute("data-value");

          console.log("Clic sur l'icône du parent-container avec la valeur :", iconDataValue);
          this.filterRecipes(""); // Supprimer le filtrage 
        });
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

  /**
  * Filtrer et afficher les recettes en fonction de la chaîne de recherche 
  * @param {string} searchString
  */
  updateRecipes(searchString) {
    const MIN_CHARACTERS = 3;
    if (searchString.length < MIN_CHARACTERS) {
      return;
    }

    const filteredRecipes = this.search.search(searchString);
    const uniqueIngredients = Recipe.getAllIngredients(filteredRecipes);
    const uniqueAppliances = Recipe.getAllAppliances(filteredRecipes);
    const uniqueUstensils = Recipe.getAllUstensils(filteredRecipes);

    // Mettre à jour les éléments de chaque dropdown avec les nouvelles listes
    this.ingredientsDropdown.insertDropdown(uniqueIngredients);
    this.ustensilsDropdown.insertDropdown(uniqueUstensils);
    this.appliancesDropdown.insertDropdown(uniqueAppliances);
    console.log(uniqueIngredients);
    console.log(uniqueUstensils);
    console.log(uniqueAppliances);

    const container = document.getElementById("recipe-container");
    container.innerHTML = "";
    this.displayRecipes(filteredRecipes);

    if (selectedItem !== "") {
      const filteredRecipesByItem = filteredRecipes.filter((recipe) => {
        const { name, ingredients, description } = recipe;
        const lowerCaseSelectedItem = selectedItem.toLowerCase();

        return (
          name.toLowerCase().includes(lowerCaseSelectedItem) ||
          ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(lowerCaseSelectedItem)) ||
          description.toLowerCase().includes(lowerCaseSelectedItem)
        );
      });

      container.innerHTML = "";
      this.displayRecipes(filteredRecipesByItem);
    }
  }

  /**
   * Filtre les recettes en fonction de l'élément sélectionné.
   * @param {string} selectedItem 
   */
  filterRecipes(selectedItem) {
    const filteredRecipes = this.recipes.filter((recipe) => {
      const { name, ingredients, description } = recipe;
      const lowerCaseSelectedItem = selectedItem.toLowerCase();

      return (
        name.toLowerCase().includes(lowerCaseSelectedItem) ||
        ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(lowerCaseSelectedItem)) ||
        description.toLowerCase().includes(lowerCaseSelectedItem)
      );
    });

    const container = document.getElementById("recipe-container");
    container.innerHTML = "";
    this.displayRecipes(filteredRecipes);

    // Mettre à jour les éléments de chaque dropdown avec les nouvelles listes
    const uniqueIngredients = Recipe.getAllIngredients(filteredRecipes);
    const uniqueAppliances = Recipe.getAllAppliances(filteredRecipes)
    const uniqueUstensils = Recipe.getAllUstensils(filteredRecipes)

    // Mettre à jour les éléments de chaque dropdown avec les nouvelles listes
    this.ingredientsDropdown.insertDropdown(uniqueIngredients);
    this.ustensilsDropdown.insertDropdown(uniqueUstensils);
    this.appliancesDropdown.insertDropdown(uniqueAppliances);
  }
}

const app = new App(recipes);
app.main();
