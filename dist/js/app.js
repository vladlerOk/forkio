
var btn = document.getElementById("toggle-btn");
var list = document.querySelector("nav");

btn.onclick = function(){
  list.classList.toggle("menu-mobile-active");
};

console.log(list);
