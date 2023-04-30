class RecipesApi {
    /**
     * @param {Array} data
     */
    constructor(data) {
      this._data = data;
    }
  
    /**
     * @returns {Promise}
     */
    async getRecipes() {
      return this._data;
    }
  }

  export { RecipesApi };
  
