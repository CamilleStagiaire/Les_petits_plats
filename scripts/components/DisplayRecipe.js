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
            <div class="d-flex-column justify-content-between">
              <h2>${this.recipe.name}</h2>
              <div class="md-text-end mb-2">
                <i class="bi bi-clock">
                <span></i>${this.recipe.time} min</span>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <ul class="card-text-overflow">
                  ${this.recipe.ingredients.map((ingredient) => `
                    <li class="card-text-li">
                    ${ingredient.ingredient} :
                    ${ingredient.quantity ? ingredient.quantity : ''} 
                    ${ingredient.unit ? ingredient.unit : ''}
                    </li>
                  `).join('')}
                </ul>
              </div>
              <div class="col-md-6">
                <p>${this.recipe.description}</p>
              </div>
            </div>
          </div>
        `;

    document.body.appendChild(modal);

    setTimeout(() => {
      modal.classList.add('show');
    }, 0);

    const closeButton = modal.querySelector('.close');
    closeButton.addEventListener('click', () => {
      modal.classList.remove('show');
      //modal.classList.add('hide');
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 500);
    });
  }
}

export { DisplayRecipe }