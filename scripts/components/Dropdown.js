class Dropdown {

  /**
   * @param {HTMLElement} element 
   */
  constructor(element) {
    this.element = element;
    this.onChangeDropdown();
  }

  // innitialisation des dropdowns
  static initDropdowns() {
    const dropdownElements = document.querySelectorAll('.container-dropdown-btn');
    dropdownElements.forEach((element) => {
      new Dropdown(element);
    });
  }

  onChangeDropdown() {
    const toggle = this.element.querySelector('.dropdown-toggle');
    const chevron = toggle.querySelector('.bi');
    const searchInput = this.element.querySelector('.search-input');
    const defaultText = toggle.getAttribute('data-text');

    /**
     * Met à jour le bouton du dropdown
     * @param {string} icon classe de l'icône
     * @param {string} text texte à afficher
     * @param {string} display valeur de la propriété display pour afficher ou cacher l'input
     */
    const updateButton = (icon, text, display) => {
      chevron.classList.remove('bi-chevron-down', 'bi-chevron-up');
      chevron.classList.add(icon);
      toggle.childNodes[0].nodeValue = text;
      searchInput.style.display = display;
    };

    // Gère le clic sur le bouton
    toggle.addEventListener('click', (e) => {
      if (toggle.classList.contains('active')) {
        updateButton('bi-chevron-down', defaultText, 'none');
        toggle.classList.remove('active');

      } else {
        updateButton('bi-chevron-up', '', 'inline-block');
        toggle.classList.add('active');
        searchInput.focus();
      }
    });

    // Gère le clic en dehors du dropdown
    document.addEventListener('click', (e) => {
      if (!this.element.contains(e.target)) {
        updateButton('bi-chevron-down', defaultText, 'none');
        toggle.classList.remove('active');
      }
    });
  }
}

export { Dropdown }