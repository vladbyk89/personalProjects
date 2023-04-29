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
const insertLeftOfLisk = (zone, mouseX) => {
    const staticLists = zone.querySelectorAll(".boardContainer__main__list:not(.isDragging)");
    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;
    staticLists.forEach((list) => {
        const cardBoundaries = list.getBoundingClientRect();
        const offset = mouseX - cardBoundaries.left - cardBoundaries.width / 2;
        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = list;
        }
    });
    return closestTask;
};
const insertAboveTask = (zone, mouseY) => {
    const staticCards = zone.querySelectorAll(".boardContainer__main__list__card:not(.isDragging)");
    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;
    staticCards.forEach((card) => {
        const cardBoundaries = card.getBoundingClientRect();
        const offset = mouseY - cardBoundaries.top - cardBoundaries.height / 2;
        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = card;
        }
    });
    return closestTask;
};
function userListFromStorage() {
    const getLocalStorage = localStorage.getItem("signedUpUsers");
    if (getLocalStorage) {
        const userList = JSON.parse(getLocalStorage);
        return userList;
    }
    return [];
}
function uid() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
function checkIfEmailExists(email) {
    const userList = userListFromStorage();
    const findEmail = userList.find((user) => user.email === email);
    if (findEmail)
        return true;
    return false;
}
const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);
function getUserBoards(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetch(`${boardsAPI}/${userId}`)
            .then((res) => res.json())
            .then(({ boards }) => boards)
            .catch((error) => console.error(error));
    });
}
