class RecipeCard {
  constructor(recipe) {
    this.recipe = recipe;
  }

  /**
   * Création des cartes de recette
   * @returns {HTMLElement}
   */
  createRecipeCard() {
    const card = document.createElement("h1");
    card.textContent = this.recipe.name;
    return card;
  }
}

export { RecipeCard };
