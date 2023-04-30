class Recipe {
    /**
     * 
     * @param {number} id 
     * @param {string} name 
     * @param {number} servings 
     * @param {Array<Object>} ingredients 
     * @param {number} time 
     * @param {string} description 
     * @param {string} appliance 
     * @param {Array<string>} utensils 
     */
    constructor(
      id,
      name,
      servings,
      ingredients,
      time,
      description,
      appliance,
      utensils
    ) {
      this.id = id;
      this.name = name;
      this.servings = servings;
      this.ingredients = ingredients;
      this.time = time;
      this.description = description;
      this.appliance = appliance;
      this.utensils = utensils;
    }
  
    /**
     * Crée une liste d'objets Recipe à partir des données fournies
     * @param {Array<Object>} recipesData 
     * @returns {Array<Recipe>}
     */
    static createRecipeObjects(recipesData) {
      return recipesData.map(
        (recipeData) =>
          new Recipe(
            recipeData.id,
            recipeData.name,
            recipeData.servings,
            recipeData.ingredients,
            recipeData.time,
            recipeData.description,
            recipeData.appliance,
            recipeData.utensils
          )
      );
    }
  }

  export { Recipe };
  