class SelectedItems {
  /**
   * @param {string} item - L'élément sélectionné
   * @param {HTMLElement} selectedItemsContainer - conteneur des éléments 
   * @param {Array} selectedItems - liste des éléments sélectionnés
   * @param {function} onSelect - fonction appelée lorsque l'élément est supprimé
   * @param {string} color - La couleur à appliquer au bouton d'élément sélectionné
   */
  constructor(item, selectedItemsContainer, selectedItems, onSelect, color) {
    this.item = item;
    this.selectedItemsContainer = selectedItemsContainer;
    this.selectedItems = selectedItems;
    this.onSelect = onSelect;
    this.color = color;
    this.selectedItem = this.createSelectedItem();

  }

  /**
   * Crée un élément
   * @returns {HTMLElement} - Le bouton de l'élément sélectionné
   */
  createSelectedItem() {
    const selectedItem = document.createElement('button');
    selectedItem.setAttribute('data-value', this.item);
    selectedItem.classList.add('btn', 'me-2');
    selectedItem.classList.add(`btn-${this.color}`);
    selectedItem.textContent = this.item;

    const icon = document.createElement('i');
    icon.classList.add('bi', 'bi-x-circle', 'ms-1');
    selectedItem.appendChild(icon);
    icon.addEventListener('click', (e) => {
      e.stopPropagation(); // Empêche la propagation de l'événement au bouton
      this.onSelect();
    });

    this.selectedItemsContainer.appendChild(selectedItem);
    this.selectedItems.push(this.item);

    return selectedItem;
  }
}

export { SelectedItems }