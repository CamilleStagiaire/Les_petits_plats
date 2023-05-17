class SelectedItems {
  /**
   * @param {string} item - L'élément sélectionné
   * @param {HTMLElement} selectedItemsContainer - conteneur des éléments 
   * @param {Array} selectedItems - liste des éléments sélectionnés
   * @param {function} onSelect - fonction appelée lorsque l'élément est supprimé
   * @param {string} color - La couleur à appliquer au bouton d'élément sélectionné
   */
  constructor(item, selectedItemsContainer, selectedItems, onSelect, element) {
    this.item = item;
    this.selectedItemsContainer = selectedItemsContainer;
    this.selectedItems = selectedItems;
    this.onSelect = onSelect;
    this.color = this.getColor(element);
    this.selectedItem = this.createSelectedItem();
  }

  /**
   * @param {HTMLElement} element
   * @returns {string}
   */
  getColor(element) {
    if (element === document.getElementById('ingredients-dropdown')) {
      return "primary";
    } else if (element === document.getElementById('appareils-dropdown')) {
      return "success";
    } else if (element === document.getElementById('ustensiles-dropdown')) {
      return "danger";
    }
  }

  /**
   * Crée un élément
   * @returns {HTMLElement} - Le bouton de l'élément sélectionné
   */
  createSelectedItem() {
    const selectedItem = document.createElement('button');
    selectedItem.classList.add('parent-container');
    selectedItem.setAttribute('data-value', this.item);
    selectedItem.classList.add('btn', 'me-2');
    selectedItem.classList.add(`btn-${this.color}`);
    selectedItem.textContent = this.item;
   
    const icon = document.createElement('i');
    icon.classList.add('bi', 'bi-x-circle', 'ms-1', 'created-icon');
    icon.setAttribute('data-value', this.item)
    selectedItem.appendChild(icon);
    icon.addEventListener('click', (e) => {
      e.stopPropagation(); // Empêche la propagation de l'événement au bouton
      this.onSelect(this.item);
      
    });
    
    this.selectedItemsContainer.appendChild(selectedItem);
    this.selectedItems.push(this.item);

    return selectedItem;
  }
}

export { SelectedItems }