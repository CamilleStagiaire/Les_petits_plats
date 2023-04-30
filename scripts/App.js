import { RecipesApi } from "./api/RecipesApi.js";
import { Recipe } from "./models/Recipe.js";
import { RecipeCard } from "./templates/index.js";
import recipes from "../data/recipes.js";

class App {
    
    constructor() {
        this.recipesApi = new RecipesApi(recipes);
    }

    async main() {
        // Récupération des données
        const recipesData = await this.recipesApi.getRecipes();

        // Création des objets Recipe à partir des données récupérées
        const recipeObjects = Recipe.createRecipeObjects(recipesData);

        // Créer et afficher les cartes de recette
        this.displayRecipes(recipeObjects);
    }

    /**
     * @param {Array<Recipe>} recipeObjects - Un tableau d'objets Recipe.
     */
    displayRecipes(recipeObjects) {
        const container = document.getElementById("recipe-container");

        // Créer des cartes pour chaque recette
        recipeObjects.forEach((recipe) => {
            const recipeCard = new RecipeCard(recipe);
            const h1 = recipeCard.createRecipeCard();
            container.appendChild(h1);
        });
    }
}

const app = new App();
app.main();

