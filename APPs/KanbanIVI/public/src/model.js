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
class User {
    constructor(firstName, lastName, gender, userName, password, email, id = "", boardList = []) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.id = id;
        this.boardList = boardList;
    }
    static getCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield fetch(`${usersAPI}/getUser`)
                    .then((res) => res.json())
                    .then(({ user }) => user)
                    .catch((error) => console.error(error));
                if (!user)
                    return false;
                currentUser = new User(user.firstName, user.lastName, user.gender, user.userName, user.password, user.email, user._id);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
let currentUser;
class Board {
    constructor(name, imageSrc, id = "", listArray = []) {
        this.name = name;
        this.imageSrc = imageSrc;
        this.id = id;
        this.listArray = listArray;
    }
    static setCurrentBoard(boardId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(`${boardsAPI}/${boardId}`, {
                method: "POST",
                body: JSON.stringify({ boardId }),
            }).catch((error) => console.error(error));
        });
    }
    static assignCurrentBoard() {
        return __awaiter(this, void 0, void 0, function* () {
            const board = yield fetch(`${boardsAPI}/getBoard`)
                .then((res) => res.json())
                .then(({ board }) => board)
                .catch((error) => console.error(error));
            const boardLists = yield fetch(`${listsAPI}/${board._id}`)
                .then((res) => res.json())
                .then(({ lists }) => lists)
                .catch((error) => console.error(error));
            const listArrayNew = boardLists.map((list) => new List(list.listName, list.cardsArray, list._id));
            currentBoard = new Board(board.boardName, board.imageSrc, board._id, listArrayNew);
        });
    }
    static deleteBoard(boardId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(`${boardsAPI}/${boardId}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then(({ boards }) => boards)
                .catch((error) => console.error(error));
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            this.listArray = [];
            const boardId = this.id;
            const listElements = boardContainer.querySelectorAll(".boardContainer__main__list");
            listElements.forEach((list) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const listName = (_a = list.querySelector("h2")) === null || _a === void 0 ? void 0 : _a.innerHTML;
                const cardsArray = [];
                const _id = list.id;
                list
                    .querySelectorAll("p")
                    .forEach((card) => cardsArray.push(card.innerHTML));
                const newList = new List(listName, cardsArray, _id);
                this.listArray.push(newList);
                const updateList = yield fetch(`${listsAPI}/${_id}`, {
                    method: "PATCH",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ listName, cardsArray, boardId }),
                })
                    .then((res) => res.json())
                    .then(({ list }) => list)
                    .catch((error) => console.error(error));
            }));
        });
    }
    edit(boardName, imageSrc, boardId, listArray) {
        return __awaiter(this, void 0, void 0, function* () {
            this.name = boardName;
            this.imageSrc = imageSrc;
            this.listArray = [...listArray];
            yield fetch(`${boardsAPI}/${boardId}`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ boardName, imageSrc, boardId }),
            });
            this.listArray.forEach((list) => __awaiter(this, void 0, void 0, function* () {
                yield fetch(`${listsAPI}/${list.id}`, {
                    method: "PATCH",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        listName: list.name,
                        cardsArray: list.cards,
                        boardId,
                    }),
                });
            }));
            boardTitle.textContent = boardName;
            boardContainer.style.background = `url(${imageSrc}) no-repeat center / cover`;
        });
    }
}
let currentBoard;
class List {
    constructor(name, cards = [], id = "", backColor = `#${randomColor()}`) {
        this.name = name;
        this.cards = cards;
        this.id = id;
        this.backColor = backColor;
    }
    static createList(listName, boardId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newListInput.value == "")
                return;
            const createdList = yield fetch(`${listsAPI}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ listName, boardId }),
            })
                .then((res) => res.json())
                .then(({ list }) => list)
                .catch((error) => console.error(error));
            const newList = new List(listName, [], createdList._id);
            boardContainer.insertBefore(newList.createListElement(), trashCanDiv);
            newListInput.value = "";
        });
    }
    createListElement() {
        const listContainer = document.createElement("div");
        listContainer.classList.add("boardContainer__main__list");
        listContainer.setAttribute("draggable", "true");
        listContainer.setAttribute("id", `${this.id}`);
        // listContainer.setAttribute("ondragstart", `drag(event)`);
        const header = document.createElement("div");
        header.classList.add("boardContainer__main__list__header");
        header.setAttribute("id", `${this.name}_header`);
        header.innerHTML = `
    <div class="listTitle">
      <h2>${this.name}</h2>
      <i class="fa-regular fa-pen-to-square editListBtn"></i>
      </div>
      <div class="boardContainer__main__list__header--addCard">
        <textarea maxlength="50" class="newCardTextArea" cols="30" rows="2" placeholder="Task..."></textarea>
        <button class="newCardBtn">New Card</button>
      </div>
    `;
        listContainer.appendChild(header);
        header.style.backgroundColor = this.backColor;
        makeListFunctional(listContainer);
        boardContainer.insertBefore(listContainer, trashCanDiv);
        currentBoard.update();
        return listContainer;
    }
}
// ---------------------- pre made users ---------------------- //
const preMadeUserList = [
    new User("Vladislav", "Bykanov", "male", "vladb89", "12345678", "vladi@gmail.com"),
    new User("Itai", "Gelberg", "male", "itaiG", "87654321", "itaiGel@gmail.com"),
    new User("Itay", "Amosi", "male", "itayz1e", "144322144", "itayAmosi@gmail.com"),
];
const preMadeBoardList = [
    new Board("Golden Board", "./img/NASA.jpg"),
    new Board("Cyan Board", "./img/pink-sea.jpg"),
    new Board("Magenta Board", "./img/purple-flower.jpg"),
    new Board("Salmon Board", "./img/sea.jpg"),
    new Board("SlateBlue Board", "./img/wall-painting.jpg"),
];
const preMadeListList = [
    new List("To Do", ["buy chocolate", "write a song", "go for a jog"]),
    new List("Design", ["Design html page", "Create logo"]),
    new List("Backlog", ["Register", "Accessibility", "CRUD Lists", "Login"]),
    new List("Finish", [
        "open repo",
        "Create Main Page",
        "Create Login Page",
        "Create Sign Up page",
    ]),
];
if (!localStorage.getItem("signedUpUsers")) {
    preMadeBoardList[0].listArray.push(...preMadeListList);
    preMadeUserList[0].boardList.push(...preMadeBoardList);
    preMadeUserList[1].boardList.push(...preMadeBoardList);
    preMadeUserList[2].boardList.push(...preMadeBoardList);
    localStorage.setItem("signedUpUsers", JSON.stringify(preMadeUserList));
}
