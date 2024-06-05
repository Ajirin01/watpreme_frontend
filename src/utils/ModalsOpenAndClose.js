export function openModalById(modalId) {
  console.log("Modal", modalId, "is opening");
  const modal = document.getElementById(modalId);

  console.log(modal);
  if (modal) {
    modal.classList.add("show"); // Apply CSS class to show the modal
    // console.log("Modal", modalId, "is opening")
  }
}

export function closeModalById(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("show"); // Remove CSS class to hide the modal
  }
}
