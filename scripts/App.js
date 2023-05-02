import { Recipe, Ingredient } from "./models/Recipe.js";
import { RecipeCard } from "./template/index.js";
import recipes from "../data/recipes.js";

class App {
    async main() {
        // Transformer les données en tableau d'objets
        const recipeObjects = Recipe.createRecipesFromData(recipes);

        // Afficher les cartes de recette
        this.displayRecipes(recipeObjects);
        console.log(recipeObjects);
    }

    /**
     * @param {Array<Recipe>} recipeObjects
     */
    displayRecipes(recipeObjects) {
        const container = document.getElementById("recipe-container");

        // Créer des cartes pour chaque recette
        recipeObjects.forEach((recipe) => {
            const recipeCard = new RecipeCard(recipe);
            const card = recipeCard.createRecipeCard();
            container.appendChild(card);
        });
    }
}

const app = new App();
app.main();
