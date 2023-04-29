// all windows event listener
window.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("profileIcon")) {
    displayProfile(currentUser);
  }
  if (target.classList.contains("notificationsIcon")) {
    // nothing yet...
  }

  if (target.classList.contains("signOutbtn")) {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  }

  if (target.classList.contains("exitProfilePage")) {
    profileWindow.style.display = "none";
  }
  if (target.classList.contains("backToMainIcon")) {
    localStorage.removeItem("currentBoard");
    window.location.href = "/main";
  }
  if (target.classList.contains("editBoardIcon")) {
    editBoardWindow.style.display = "flex";
    nameInputEle.value = currentBoard.name;
    imageDisplayedInEdit.src = currentBoard.backgroundImage

  }
});
