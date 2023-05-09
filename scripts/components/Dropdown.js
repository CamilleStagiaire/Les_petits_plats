import { DropdownItem } from './DropdownItem.js';
import { SelectedItems } from './SelectedItems.js';

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

    this.selectedItemsContainer = document.querySelector('.container-selected');
    this.selectedItems = [];

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
   * Gère l'état d'ouverture / fermeture des dropdowns
   * @returns {boolean}
   */
  dropdownStatus() {
    const isActive = this.toggle.classList.contains('active');

    // vérifier si un autre dropdown a la classe active
    const otherDropdowns = document.querySelectorAll('.dropdown-toggle.active');
    if (otherDropdowns.length > 0) {
      otherDropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
        dropdown.closest('.container-dropdown').classList.remove('active');
        dropdown.querySelector('.bi-chevron-up').classList.replace('bi-chevron-up', 'bi-chevron-down');
        dropdown.querySelector('.search-input').style.display = 'none';
        const defaultText = dropdown.getAttribute('data-text');
        dropdown.childNodes[0].nodeValue = defaultText;
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

  // gère les événements associés au menu déroulant
  onChangeDropdown() {
    // Gère le clic sur le bouton du menu déroulant
    this.toggle.addEventListener('click', () => {
      this.dropdownStatus();
    });

    // Gère le clic en dehors du dropdown
    document.addEventListener('click', (e) => {
      if (!this.containerDropdown.contains(e.target)) {
        this.updateButton('bi-chevron-down', this.defaultText, 'none');
        this.toggle.classList.remove('active');
        this.resetStyles();
      }
    });

    // Gère la fermeture du dropdown lors du clic sur un élément du menu déroulant ou sur le champ de recherche
    this.containerDropdown.addEventListener('hide.bs.dropdown', (event) => {
      if (event.clickEvent && (event.clickEvent.target.classList.contains('dropdown-item') || this.searchInput.contains(event.clickEvent.target))) {
        event.preventDefault();
        event.stopPropagation();
      }
    });

    // Gère l'affichage du dropdown et ferme les autres dropdowns ouverts
    this.containerDropdown.addEventListener('show.bs.dropdown', () => {
      const otherDropdowns = document.querySelectorAll('.dropdown.show');
      otherDropdowns.forEach(dropdown => {
        if (dropdown !== this.containerDropdown) {
          let bsDropdown = new bootstrap.Dropdown(dropdown.querySelector('.dropdown-toggle'));
          bsDropdown.hide();
        }
      });
    });
  }

  /**
   * Gère la sélection d'un élément dans le menu déroulant
   * @param {*} item - L'élément sélectionné
   * @param {*} dropdown - Le dropdown sélectionné
   */
  onSelectItem(item, dropdown) {
    /**
     * Ajoute un élément dans une liste déroulante en ordre alphabétique
     * @param {*} parentElement - l'élément parent de la liste déroulante
     * @param {*} listItem - l'élément à ajouter
     */
    function alphabeticOrder(parentElement, listItem) {
      const listItems = parentElement.querySelectorAll('li');
      const itemText = listItem.querySelector('.dropdown-item').textContent;

      for (let i = 0; i < listItems.length; i++) {
        const currentItemText = listItems[i].querySelector('.dropdown-item').textContent;

        if (itemText.localeCompare(currentItemText) < 0) {
          parentElement.insertBefore(listItem, listItems[i]);
          return;
        }
      }
      parentElement.appendChild(listItem);
    }

    const ingredientsDropdown = document.getElementById('ingredients-dropdown');
    const ustensilsDropdown = document.getElementById('ustensiles-dropdown');
    const appliancesDropdown = document.getElementById('appareils-dropdown');
    const dropdownItem = dropdown.querySelector(`.dropdown-item[data-value="${item}"]`);

    let color = "";
    if (this.element === ingredientsDropdown) {
      color = "primary";
    } else if (this.element === appliancesDropdown) {
      color = "success";
    } else if (this.element === ustensilsDropdown) {
      color = "danger";
    }

    const selectedItem = new SelectedItems(item, this.selectedItemsContainer, this.selectedItems, () => {
      // Supprimer le bouton et le retirer du tableau selectedItems
      this.selectedItemsContainer.removeChild(selectedItem.selectedItem);
      this.selectedItems.splice(this.selectedItems.indexOf(selectedItem.item), 1);

      // Réintégrer le <li> dans la liste déroulante par ordre alphabétique
      alphabeticOrder(dropdown.querySelector('.dropdown-menu'), dropdownItem.parentNode);
    }, color);
  }


  /**
   * Insère les éléments du menu déroulant
   * @param {*} items - Les éléments à insérer dans le menu déroulant
   */
  insertDropdown(items) {
    const list = this.element.querySelector('.dropdown-menu');
    items.forEach(item => {
      const dropdownItem = new DropdownItem(item, this.onSelectItem.bind(this));
      const listItem = dropdownItem.createDropdownItem();
      list.appendChild(listItem);
    });
  }
}

export { Dropdown }