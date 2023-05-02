class Recipe {
    /**
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
      this.ingredients = ingredients.map(
          (ingredient) => new Ingredient(ingredient.ingredient, ingredient.quantity, ingredient.unit)
      );
      this.time = time;
      this.description = description;
      this.appliance = appliance;
      this.utensils = utensils;
    }

    /**
     * @param {Array<Object>} recipesData 
     * @returns {Array<Recipe>}
     */
    static createRecipesFromData(recipesData) {
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

    /**
     * Récupère tous les ingrédients de toutes les recettes
     * @param {Array<Recipe>} recipeObjects
     * @returns {Array<Ingredient>}
     */
    // static getAllIngredients(recipeObjects) {
    //     const allIngredients = [];
    //     recipeObjects.forEach((recipe) => {
    //         recipe.ingredients.forEach((ingredient) => {
    //             allIngredients.push(ingredient);
    //         });
    //     });
    //     return allIngredients;
    // }
}

class Ingredient {
    /**
     * @param {string} ingredient
     * @param {number} quantity
     * @param {string=} unit
     */
    constructor(ingredient, quantity, unit = "") {
        this.ingredient = ingredient;
        this.quantity = quantity;
        this.unit = unit;
    }
}

export { Recipe, Ingredient };