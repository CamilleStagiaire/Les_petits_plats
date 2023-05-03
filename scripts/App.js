import { Recipe, Ingredient } from "./models/Recipe.js";
import { RecipeCard } from "./template/index.js";
import { DisplayRecipe } from "./components/DisplayRecipe.js";
import recipes from "../data/recipes.js";

class App {


  async main() {
    // Transformer les données en tableau d'objets
    const recipeObjects = Recipe.createRecipesFromData(recipes);

    // Afficher les cartes de recette
    this.displayRecipes(recipeObjects);
    //console.log(recipeObjects);


    // document.addEventListener('DOMContentLoaded', function () {

    //   const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    //   dropdownToggles.forEach((toggle) => {
    //     toggle.addEventListener('click', function (event) {
    //       // Trouvez l'élément <i> qui contient l'icône du chevron
    //       const chevron = event.target.querySelector('.bi');

    //       // Vérifiez si le dropdown est actuellement ouvert ou fermé
    //       const isOpen = event.target.parentElement.classList.contains('show');

    //       // Changez l'icône en fonction de l'état du dropdown
    //       if (isOpen) {
    //         chevron.classList.remove('bi-chevron-up');
    //         chevron.classList.add('bi-chevron-down');
    //       } else {
    //         chevron.classList.remove('bi-chevron-down');
    //         chevron.classList.add('bi-chevron-up');
    //       }
    //     });
    //   });
    // });



    const recipeDisplays = document.querySelectorAll('.article');
    recipeDisplays.forEach((recipeDisplay) => {
      recipeDisplay.addEventListener('click', () => {
        const recipeId = parseInt(recipeDisplay.getAttribute('data-id')); // Récupère l'id de la recette à partir de l'attribut 'data-id'
        const recipe = recipeObjects.find((r) => r.id === recipeId); // Trouve la recette correspondante
        const display = new DisplayRecipe(recipe);
        display.openModal();
        console.log(recipeId);
      });
    });
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
