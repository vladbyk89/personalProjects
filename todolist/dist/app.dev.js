"use strict";

var ulEl = document.getElementById('ul-el');
var inputField = document.getElementById('input-field');
var clearBtn = document.getElementById('clear-btn');
var myTasks = [];
var emptyList = [];
var leadsFromLocalStorage = JSON.parse(localStorage.getItem('myTasks'));

if (leadsFromLocalStorage) {
  myTasks = leadsFromLocalStorage;
  renderArr(myTasks);
} // main function to save tasks


inputField.addEventListener('keypress', function (e) {
  if (e.key == 'Enter') {
    // console.log('Enter pressed')
    var inputValue = inputField.value;
    inputField.value = ' ';
    myTasks.push(inputValue); // console.log(myTasks)

    localStorage.setItem("myTasks", JSON.stringify(myTasks));
    renderTask(inputValue, myTasks.length);
  }
});

function renderArr(tasks) {
  if (tasks.length == 0) {
    ulEl.replaceChildren();
  }

  for (var i = 0; i < tasks.length; i++) {
    renderTask(tasks[i], i + 1);
  }
}

function renderTask(task, index) {
  var liEl = document.createElement('li');
  liEl.textContent = task;
  var btn = document.createElement('button');
  liEl.setAttribute('id', index);
  btn.addEventListener("click", function () {
    return removeSingleTask(task);
  });
  btn.textContent = 'Remove';
  liEl.appendChild(btn);
  ulEl.append(liEl); // console.log(myTasks)
}

clearBtn.addEventListener('click', function () {
  localStorage.clear();
  myTasks = [];
  renderArr(myTasks);
});

function removeSingleTask(task) {
  var index = myTasks.indexOf(task);
  myTasks.splice(index, 1);
  renderArr(emptyList);
  renderArr(myTasks);
  localStorage.setItem("myTasks", JSON.stringify(myTasks)); // let link = document.getElementById(index + 1)
  // console.log(link)
  // link.remove()
}