class Search {
  constructor(recipes) {
    this.recipes = recipes;
  }

  /**
   * Recherche dans les recettes en fonction de la chaîne de recherche
   * @param {string} searchString 
   * @returns {Array} -  recettes filtrée
   */
  search(searchString) {
    const filteredRecipes = [];
    let i = 0;
    searchString = this.removeAccents(searchString).toLowerCase();
    const searchWords = searchString.split(" "); // diviser searchString en mots individuels
  
    while (i < this.recipes.length) {
      const recipe = this.recipes[i];
      const recipeName = this.removeAccents(recipe.name).toLowerCase();
      const recipeIngredients = recipe.ingredients
        .map((ingredient) => this.removeAccents(ingredient.ingredient).toLowerCase())
        .join(" ");
      const recipeDescription = this.removeAccents(recipe.description).toLowerCase();
  
      if (
        searchWords.every(word => // chaque mot doit être présent dans l'un des champs
          recipeName.includes(word) ||
          recipeIngredients.includes(word) ||
          recipeDescription.includes(word)
        )
      ) {
        filteredRecipes.push(recipe);
      }
      i++;
    }
    return filteredRecipes;
  }

  /**
   * Supprimer les accents 
   * @param {string} str 
   * @returns {string}
   */
  removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}

export { Search }