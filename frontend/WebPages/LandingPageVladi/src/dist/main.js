var pageButtons = document.querySelectorAll(".control");
pageButtons.forEach(function (btn) {
    return btn.addEventListener("click", function () {
        console.log(btn.title);
        var section = document.querySelector("." + btn.id);
        scroll(section);
        section.classList.add("active");
        toggleMainPage();
    });
});
function scroll(element) {
    moveToOriginalPosition();
    setTimeout(function () {
        element.style.transform = "translate(0)";
    }, 300);
}
function moveToOriginalPosition() {
    pageButtons.forEach(function (btn) {
        var section = document.querySelector("." + btn.id);
        section.style.transform = "" + btn.dataset.pos;
        section.classList.remove("active");
    });
}
function toggleMainPage() {
    var main = document.querySelector(".main");
    if (main.classList.contains("active")) {
        setTimeout(function () {
            main.style.border = "0px solid black";
        }, 300);
    }
    else {
        main.style.border = "20vh solid black";
    }
}
