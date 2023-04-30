// all windows event listener
window.addEventListener("click", async (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("profileIcon")) {
    displayProfile(currentUser);
  }
  if (target.classList.contains("notificationsIcon")) {
    // nothing yet...
  }

  if (target.classList.contains("signOutbtn")) {
    await fetch(`${usersAPI}/removeCookie`, {
      method: "DELETE",
    });
    window.location.href = "/";
  }

  if (target.classList.contains("exitProfilePage")) {
    profileWindow.style.display = "none";
  }
  if (target.classList.contains("backToMainIcon")) {
    await fetch(`${boardsAPI}/removeCookie`, {
      method: "DELETE",
    });
    window.location.href = "/main";
  }
  if (target.classList.contains("editBoardIcon")) {
    editBoardWindow.style.display = "flex";
    nameInputEle.value = currentBoard.boardName;
    imageDisplayedInEdit.src = currentBoard.imageSrc;
  }
});
