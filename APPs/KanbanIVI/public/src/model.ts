interface UserTemplate {
  firstName: string;
  lastName: string;
  gender: string;
  userName: string;
  password: string;
  email: string;
  boardList: [BoardTemplate];
  _id: string;
}

class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public gender: string,
    public userName: string,
    public password: string,
    public email: string,
    public id: string = "",
    public boardList: Board[] = []
  ) {}

  static async getCurrentUser() {
    try {
      const user = await fetch(`${usersAPI}/getUser`)
        .then((res) => res.json())
        .then(
          ({ user }) =>
            new User(
              user.firstName,
              user.lastName,
              user.gender,
              user.userName,
              user.password,
              user.email,
              user._id
            )
        )
        .catch((error) => console.error(error));
      if (user) return user
    } catch (error) {
      console.error(error);
    }
  }
}

let currentUser: User;

interface BoardTemplate {
  boardName: string;
  imageSrc: string;
  userArray: [UserTemplate];
  listArray: [ListTemplate];
  _id: string;
}

class Board {
  constructor(
    public name: string,
    public backgroundImage: string,
    public lists: List[] = [],
    public uid: string = ""
  ) {}

  static async setCurrentBoard(boardId: string) {
    await fetch(`${boardsAPI}/${boardId}`, {
      method: "POST",
      body: JSON.stringify({ boardId }),
    }).catch((error) => console.error(error));
  }

  static async getCurrentBoard() {
    currentBoard = await fetch(`${boardsAPI}/getBoard`)
      .then((res) => res.json())
      .then(({ board }) => board)
      .catch((error) => console.error(error));
  }

  static async deleteBoard(boardId: string) {
    await fetch(`${boardsAPI}/${boardId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(({ boards }) => boards)
      .catch((error) => console.error(error));
  }

  update() {
    this.lists = [];
    const listElements = boardContainer.querySelectorAll(
      ".boardContainer__main__list"
    );
    listElements.forEach((list) => {
      const listName = list.querySelector("h2")?.innerHTML as string;
      const cardsArr: string[] = [];
      list
        .querySelectorAll("p")
        .forEach((card) => cardsArr.push(card.innerHTML));
      const newList = new List(listName, Array.from(cardsArr));
      this.lists.push(newList);
    });
    localStorage.setItem("currentBoard", JSON.stringify(this));
    // updateUserBoardList(currentUser, this);
  }

  static async edit(boardName: string, imageSrc: string, boardId: string) {
    // this.name = newName;
    // this.backgroundImage = imageSrc;
    await fetch(`${boardsAPI}/${boardId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ boardName, imageSrc, boardId }),
    });
    boardTitle.textContent = boardName;
    boardContainer.style.background = `url(${imageSrc}) no-repeat center / cover`;
    // updateUserBoardList(currentUser, this);
  }
}

let currentBoard: BoardTemplate;

interface ListTemplate {
  name: string;
  cardsArray: [string];
  _id: string;
}

class List {
  constructor(
    public name: string,
    public cards: string[] = [],
    public uid = Math.random().toString(36).slice(2),
    public backColor: string = `#${randomColor()}`
  ) {}

  static async createList(listName: string, boardId: string) {
    if (newListInput.value == "") return;

    await fetch(`${listsAPI}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listName }),
    }).catch((error) => console.error(error));

    const newList = new List(listName);
    boardContainer.insertBefore(newList.createListElement(), trashCanDiv);
    newListInput.value = "";
  }

  createListElement() {
    const listContainer = document.createElement("div");
    listContainer.classList.add("boardContainer__main__list");
    listContainer.setAttribute("draggable", "true");
    listContainer.setAttribute("id", `${this.uid}`);
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
    // currentBoard.update();
    return listContainer;
  }
}

// ---------------------- pre made users ---------------------- //
const preMadeUserList: User[] = [
  new User(
    "Vladislav",
    "Bykanov",
    "male",
    "vladb89",
    "12345678",
    "vladi@gmail.com"
  ),
  new User("Itai", "Gelberg", "male", "itaiG", "87654321", "itaiGel@gmail.com"),
  new User(
    "Itay",
    "Amosi",
    "male",
    "itayz1e",
    "144322144",
    "itayAmosi@gmail.com"
  ),
];

const preMadeBoardList: Board[] = [
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
  preMadeBoardList[0].lists.push(...preMadeListList);
  preMadeUserList[0].boardList.push(...preMadeBoardList);
  preMadeUserList[1].boardList.push(...preMadeBoardList);
  preMadeUserList[2].boardList.push(...preMadeBoardList);
  localStorage.setItem("signedUpUsers", JSON.stringify(preMadeUserList));
}
