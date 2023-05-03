class DisplayRecipe {
    constructor(recipe) {
      this.recipe = recipe;
    }
  
    openModal() {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
          <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${this.recipe.name}</h2>
            <p>${this.recipe.description}</p>
            ...
          </div>
        `;
      
        document.body.appendChild(modal);
      
        // Gérer la fermeture de la modale
        const closeButton = modal.querySelector('.close');
        closeButton.addEventListener('click', () => {
          document.body.removeChild(modal);
        });
      }
  }
  
export { DisplayRecipe }