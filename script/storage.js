"use strict";
//1 Bổ sung Animation cho sidebar
const nav = document.getElementById("sidebar");

nav.addEventListener("click", function () {
  nav.classList.toggle("active");
});

//localstorage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
function getFromStorage(key) {
  return localStorage.getItem(key);
}
