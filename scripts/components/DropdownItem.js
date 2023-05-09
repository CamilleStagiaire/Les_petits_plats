class DropdownItem {
  /**
   * @param {string} item - L'élément du menu déroulant à créer
   * @param {function} onSelectItem - fonction à exécuter quand un élément est sélectionné.
   */
  constructor(item, onSelectItem) {
    this.item = item;
    this.onSelectItem = onSelectItem;
  }

  /**
   * Crée et retourne un élément dans les listes déroulantes.
   * @returns {HTMLElement} - L'élément de liste déroulante créé.
   */
  createDropdownItem() {
    const listItem = document.createElement('li');
    const listItemLink = document.createElement('a');
    listItemLink.classList.add('dropdown-item');
    listItemLink.textContent = this.item;

    // Ajoute l'attribut data-value avec la valeur de l'item
    listItemLink.setAttribute('data-value', this.item);
    listItem.appendChild(listItemLink);

    // Gère le clic sur un élément du menu déroulant
    listItemLink.addEventListener("click", (e) => {
      e.stopPropagation(); // Empêche la fermeture du menu déroulant
      this.onSelectItem(this.item, e.currentTarget.parentNode.parentNode.parentNode);
      listItem.parentNode.removeChild(listItem);
    });

    return listItem;
  }
}

export { DropdownItem }