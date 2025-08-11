function calculateAge() { // birthday is a date
    var birthday = new Date(2005,11,7)
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

var age = document.getElementById("age");
age.innerHTML=calculateAge();
var hoje = new Date(Date.now())
age.title="Calculado em "+hoje.getDate()+"/"+(hoje.getMonth()+1)+"/"+hoje.getFullYear();

const plangs = document.querySelectorAll(".clickable");

plangs.forEach(plang => {
  plang.addEventListener('click', function(event) {
    plang.classList.toggle("big");
    var which = plang.title;
    which=which.toLowerCase();
    var item = document.getElementById(which);
    var dis = item.style.display;
    if (dis=="none"){
      item.style.display="block";
    } else {
      item.style.display="none";
    }
  });
});

const icons = document.querySelectorAll(".itemicon");

icons.forEach(icon => {
  icon.addEventListener('click', function(event) {
    icon.classList.toggle("active");
  });
});