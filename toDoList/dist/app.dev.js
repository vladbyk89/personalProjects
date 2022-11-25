"use strict";

var ulEl = document.getElementById('ul-el');
var inputField = document.getElementById('input-field');
var clearBtn = document.getElementById('clear-btn');
var myTasks = [];
var leadsFromLocalStorage = JSON.parse(localStorage.getItem('myTasks'));

if (leadsFromLocalStorage) {
  myTasks = leadsFromLocalStorage;
  renderArr(myTasks);
} // main function to save tasks


inputField.addEventListener('keypress', function (e) {
  if (e.key == 'Enter') {
    console.log('Enter pressed');
    var inputValue = inputField.value;
    inputField.value = ' ';
    myTasks.push(inputValue);
    console.log(myTasks);
    localStorage.setItem("myTasks", JSON.stringify(myTasks));
    renderTask(inputValue);
  }
});

function renderArr(tasks) {
  if (myTasks.length == 0) {
    ulEl.replaceChildren();
  }

  for (var i = 0; i < tasks.length; i++) {
    renderTask(tasks[i]);
  }
}

function renderTask(task) {
  var liEl = document.createElement('li');
  liEl.textContent = task;
  var btn = document.createElement('button');
  liEl.setAttribute('id', myTasks.length);
  btn.addEventListener("click", function () {
    return liEl.remove();
  });
  btn.textContent = 'Remove';
  liEl.appendChild(btn);
  ulEl.append(liEl);
  console.log(myTasks);
}

clearBtn.addEventListener('click', function () {
  localStorage.clear();
  myTasks = [];
  renderArr(myTasks);
});