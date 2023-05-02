class RecipeCard {
  constructor(recipe) {
    this.recipe = recipe;
  }

  /**
   * Création des cartes de recette
   * @returns {HTMLElement}
   */
  createRecipeCard() {
    const card = document.createElement('article');
    card.classList.add('col-4', 'gy-5');

    const recipeCard = `
    <div class="card justify-content-center">
      <img src="http://via.placeholder.com/380x178.png?text" class="card-img-top" alt="...">
      <div class="card-body">
        <div class="row">
          <div class="col-9">
            <p class="card-text">${this.recipe.name}</p>
          </div>
          <div class="col-3">
          <p class="card-text">${this.recipe.time}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <ul class="card-text">
              ${this.recipe.ingredients.map((ingredient) => `
                <li>
                  ${ingredient.ingredient}
                  ${ingredient.quantity ? ingredient.quantity : ''} 
                  ${ingredient.unit ? ingredient.unit : ''}
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="col-6">
            <p>${this.recipe.description}</p>
          </div>
        </div>
      </div>
    </div>
    `
    card.innerHTML = recipeCard
    return card;
  }
}

export { RecipeCard };
