class Dropdown {

  /**
   * @param {HTMLElement} element
   * @param {Array} items - éléments du menu déroulant
   */
  constructor(element, items = []) {
    this.element = element;
    this.items = items;
    this.toggle = this.element.querySelector('.dropdown-toggle');
    this.chevron = this.toggle.querySelector('.bi');
    this.searchInput = this.element.querySelector('.search-input');
    this.defaultText = this.toggle.getAttribute('data-text');
    this.containerDropdown = this.element.closest(".container-dropdown");
    this.appareilsButton = document.getElementById('appareilsButton').closest('.container-dropdown-btn');
    this.ustensilesButton = document.getElementById('ustensilesButton').closest('.container-dropdown-btn');

    this.insertDropdown(items);
    this.onChangeDropdown();
  }

  /**
   * @param {*} ingredients 
   * @param {*} ustensils 
   * @param {*} appliances 
   */
  static initDropdowns(ingredients, ustensils, appliances) {
    const ingredientsDropdown = document.getElementById('ingredients-dropdown');
    const ustensilsDropdown = document.getElementById('ustensiles-dropdown');
    const appliancesDropdown = document.getElementById('appareils-dropdown');
    new Dropdown(ingredientsDropdown, ingredients);
    new Dropdown(ustensilsDropdown, ustensils);
    new Dropdown(appliancesDropdown, appliances);
  }

  /**
   * mise à jour du bouton de dropdown
   * @param {string} icon - classe de l'icône à afficher
   * @param {string} text - texte à afficher
   * @param {string} display - valeur de la propriété CSS "display" pour afficher ou masquer l'input 
   */
  updateButton(icon, text, display) {
    this.chevron.classList.remove('bi-chevron-down', 'bi-chevron-up');
    this.chevron.classList.add(icon);
    this.toggle.childNodes[0].nodeValue = text;
    this.searchInput.style.display = display;
  }

  /**
   * Gère l'état d'ouverure / fermeture des dropdowns
   * @returns {boolean}
   */
  toggleActiveStatus() {
    const isActive = this.toggle.classList.contains('active');

    // vérifier si un autre dropdown a la classe active
    const otherDropdowns = document.querySelectorAll('.dropdown-toggle.active');
    if (otherDropdowns.length > 0) {
      otherDropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
        this.resetStyles();
      });
    }

    if (isActive) {
      this.updateButton('bi-chevron-down', this.defaultText, 'none');
      this.containerDropdown.classList.remove('active');
      this.resetStyles();
    } else {
      this.updateButton('bi-chevron-up', '', 'inline-block');
      this.toggle.classList.add('active');
      this.searchInput.focus();
      this.containerDropdown.classList.add('active');
      this.applyStyles();
    }
    return !isActive;
  }


  // applique les styles aux boutons
  applyStyles() {
    if (this.element.id === 'ingredients-dropdown') {
      this.appareilsButton.classList.add('margins');
    } else if (this.element.id === 'appareils-dropdown') {
      this.ustensilesButton.classList.add('margins');
    }
  }

  // réinitialise les styles initianx des boutons
  resetStyles() {
    this.appareilsButton.classList.remove('margins');
    this.ustensilesButton.classList.remove('margins');
  }

  onChangeDropdown() {
    // Gère le clic sur le bouton du menu déroulant
    this.toggle.addEventListener('click', () => {
      this.toggleActiveStatus();
    });

    // Gère le clic en dehors du dropdown
    document.addEventListener('click', (e) => {
      if (!this.containerDropdown.contains(e.target)) {
        this.updateButton('bi-chevron-down', this.defaultText, 'none');
        this.toggle.classList.remove('active');

        this.resetStyles();
      }
    });
  }

  /**
   * Gère la sélection d'un élément dans le menu déroulant
   * @param {*} item - L'élément sélectionné
   */
  onSelectItem(item) {
    console.log("Élément sélectionné :", item);
    if (this.toggleActiveStatus()) {
      this.updateButton('bi-chevron-down', this.defaultText, 'none');
    }
  }

  /**
   * Insère les éléments du menu déroulant
   * @param {*} items - Les éléments à insérer dans le menu déroulant
   */
  insertDropdown(items) {
    const list = this.element.querySelector('.dropdown-menu');
    items.forEach(item => {
      const listItem = document.createElement('li');
      const listItemLink = document.createElement('a');
      listItemLink.classList.add('dropdown-item');
      listItemLink.textContent = item;
      listItem.appendChild(listItemLink);
      list.appendChild(listItem);

      // Gère le clic sur un élément du menu déroulant
      listItemLink.addEventListener("click", () => {
        this.onSelectItem(item);
      });
    });
  }
}

export { Dropdown }