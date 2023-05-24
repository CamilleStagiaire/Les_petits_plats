class Search {

  /**
   * @param {*} recipes 
   */
  constructor(recipes) {
    this.recipes = recipes;
    this.originalItems = null;
  }

  /**
   * Recherche dans la barre de recherche
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

  /**
   * Recherche par tags
   * @param {*} items 
   * @param {*} recipes 
   * @returns 
   */
  searchByItems(items, recipes) {
    return recipes.filter((recipe) => {
      return items.every(item => {
        const lowerCaseItem = item.toLowerCase();
        const { name, ingredients, description } = recipe;
        return (
          name.toLowerCase().includes(lowerCaseItem) ||
          ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(lowerCaseItem)) ||
          description.toLowerCase().includes(lowerCaseItem)
          
        );
      });
    });
  }

  /**
    * Recherche de tags dans les drodowns
    * @param {string} searchString 
    * @param {Array} items 
    * @returns {Array}
    */
  searchInDropdown(searchString, items) {
    const filteredItems = [];
    searchString = this.removeAccents(searchString).toLowerCase();
    const searchWords = searchString.split(" "); // diviser searchString en mots individuels

    if (!this.originalItems) {
      this.originalItems = [...items];
    }
    
    items.forEach(item => {
      const itemName = this.removeAccents(item).toLowerCase();

      if (searchWords.every(word => itemName.includes(word))) {
        filteredItems.push(item);
      }
    });
    return filteredItems;
  }
}

export { Search }