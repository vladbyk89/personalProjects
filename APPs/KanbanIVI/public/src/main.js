"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// if user is in index.html run this
if (window.location.pathname.endsWith("/")) {
    window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
        currentUser = yield User.setCurrentUser();
        if (currentUser) {
            // window.location.href = "/main";
        }
    }));
    signUpPanelBtn.addEventListener("click", () => {
        entryPageMainContainer.classList.add("active");
    });
    signInPanelBtn.addEventListener("click", () => {
        entryPageMainContainer.classList.remove("active");
    });
}
// ---------------------- forgotPassword.html ----------------------
if (window.location.pathname.endsWith("/passwordRecovery")) {
    // recoveryForm.addEventListener("submit", handleRecovery);
}
// ---------------------- main.html ----------------------
if (window.location.pathname.endsWith("/main")) {
    window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
        currentUser = yield User.setCurrentUser();
        if (!currentUser) {
            window.location.href = "/";
        }
        const boards = yield getUserBoards(currentUser._id);
        renderBoardsToMain(boards);
    }));
    createBoardWindowBtn.addEventListener("click", () => (newBoardWindow.style.display = "flex"));
    cancelCreateBoardBtn.addEventListener("click", () => (newBoardWindow.style.display = "none"));
    boardImageBtn.addEventListener("click", () => {
        backgroundImageSelectionDiv.style.display = "grid";
        const backgroundImages = document.querySelectorAll(".backgroundImage");
        backgroundImages.forEach((img) => {
            img.addEventListener("click", () => {
                imageDisplayedInCreate.src = img.src;
                backgroundImageSelectionDiv.style.display = "none";
            });
        });
    });
    createBoardBtn.addEventListener("click", () => createBoard(newBoardName.value, imageDisplayedInCreate.src.toString(), currentUser._id));
    searchBar.addEventListener("keyup", () => __awaiter(void 0, void 0, void 0, function* () {
        const boards = yield getUserBoards(currentUser._id);
        if (searchBar.value != "") {
            boardArea.innerHTML = "";
            const listToDisplay = boards.filter((ele) => ele.boardName.toLowerCase().includes(searchBar.value));
            if (listToDisplay) {
                renderBoardsToMain(listToDisplay);
            }
        }
        else {
            renderBoardsToMain(boards);
        }
    }));
    boardArea.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        const target = e.target;
        if (target.dataset.name) {
            const check = confirm("Are you sure you want to delete?");
            if (check) {
                yield Board.deleteBoard(target.dataset.name);
                const boards = yield getUserBoards(currentUser._id);
                renderBoardsToMain(boards);
            }
        }
        if (target.classList.contains("boardClick")) {
            const board = target.parentElement;
            if (board)
                console.log(board.id);
            Board.setCurrentBoard(board.id);
            window.location.href = "/board";
        }
    }));
}
//---------------------- board.html ----------------------
if (window.location.pathname.endsWith("/board")) {
    window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
        const currentBoard = yield Board.getCurrentBoard();
        if (!currentBoard) {
            window.location.href = "/";
        }
    }));
    // renderBoardInBoardPage();
    addListBtn.addEventListener("click", () => List.createList(newListInput.value));
    editBoardBtn.addEventListener("click", () => {
        currentBoard.edit(nameInputEle.value, imageDisplayedInEdit.src);
        editBoardWindow.style.display = "none";
    });
    updatedBoardImageBtn.addEventListener("click", () => {
        backgroundImageSelectionDiv.style.display = "grid";
        const backgroundImages = document.querySelectorAll(".backgroundImage");
        backgroundImages.forEach((img) => {
            img.addEventListener("click", () => {
                imageDisplayedInEdit.src = img.src;
                backgroundImageSelectionDiv.style.display = "none";
            });
        });
    });
    boardContainer.addEventListener("dragover", ({ clientX }) => {
        let cardIsDragged = false;
        cards.forEach((card) => {
            if (card.classList.contains("isDragging")) {
                cardIsDragged = true;
            }
        });
        if (cardIsDragged)
            return;
        const leftList = insertLeftOfLisk(boardContainer, clientX);
        const curList = boardContainer.querySelector(".isDragging");
        if (!leftList) {
            boardContainer.insertBefore(curList, trashCanDiv);
        }
        else {
            boardContainer.insertBefore(curList, leftList);
        }
        currentBoard.update();
    });
    window.addEventListener("click", (e) => {
        const target = e.target;
        if (target.className === "newCardBtn") {
            const listElement = target.closest(".boardContainer__main__list");
            const newCardTextArea = listElement.querySelector(".newCardTextArea");
            if (newCardTextArea.value == "")
                return;
            createCardElement(newCardTextArea.value, listElement);
            newCardTextArea.value = "";
        }
        if (target.classList.contains("cancelEditBoardBtn")) {
            editBoardWindow.style.display = "none";
        }
    });
    boardContainer.addEventListener("keyup", () => {
        currentBoard.update();
    });
    newListInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            List.createList(newListInput.value);
        }
    });
    trashCan.addEventListener("drop", () => {
        const confirmDelete = confirm("Are you sure you want to delete?");
        if (confirmDelete) {
            const element = document.querySelector(".isDragging");
            element.remove();
            currentBoard.update();
        }
    });
    document.addEventListener("dragover", (event) => {
        event.preventDefault();
    });
}
