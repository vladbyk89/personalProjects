const pageButtons = document.querySelectorAll(
  ".control"
) as NodeListOf<HTMLElement>;

pageButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    console.log(btn.title);
    const section = document.querySelector(`.${btn.id}`) as HTMLElement;
    scroll(section);
    section.classList.add("active");
    toggleMainPage();
  })
);

function scroll(element: HTMLElement) {
  moveToOriginalPosition();
  setTimeout(() => {
    element.style.transform = `translate(0)`;
  }, 300);
}

function moveToOriginalPosition() {
  pageButtons.forEach((btn) => {
    const section = document.querySelector(`.${btn.id}`) as HTMLElement;
    section.style.transform = `${btn.dataset.pos}`;
    section.classList.remove("active");
  });
}

function toggleMainPage() {
  const main = document.querySelector(".main") as HTMLElement;
  if (main.classList.contains("active")) {
    setTimeout(() => {
      main.style.border = "0px solid black";
    }, 300);
  } else {
    main.style.border = "20vh solid black";
  }
}
