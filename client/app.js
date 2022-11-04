// Bringing the register buttons from HTML

var btnWorshop1 = document.getElementById("work-1");
var btnWorshop2 = document.getElementById("work-2");
var btnWorshop3 = document.getElementById("work-3");

// __________________________________________________________________

var URL = "http://localhost:3000";

btnWorshop1.addEventListener("click", function (e) {
  e.preventDefault();

  location.href = URL+"/workshop1";
});
btnWorshop2.addEventListener("click", function (e) {
  e.preventDefault();

  location.href = URL+"/workshop2";
});
btnWorshop3.addEventListener("click", function (e) {
  e.preventDefault();

  location.href = URL+"/workshop3";
});
