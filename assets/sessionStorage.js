// make a list of 10 names:
names = [
  "Live",
  "KjellO",
  "Michelle",
  "Andreas",
  "Bjørn",
  "Karoline",
  "Vasuki",
  "Marcus",
  "Ida",
  "Simen",
];

// Take a random number between 0 and 9
randomInt = Math.floor(Math.random() * 10);

// check the value of sessionStorage before it is set:
currentSession = sessionStorage.getItem("name");
console.log(currentSession);

// Fetch one of these names, and set it as sessionStorage.name
// Store item:
// sessionStorage.setItem("name", names[randomInt]);
// retrieve:
function updateNameOnPage() {
  document.getElementById("span-name").innerHTML = sessionStorage.getItem(
    "name"
  );
}

function setName(name) {
  sessionStorage.setItem("name", name);
}
function getName() {
  return sessionStorage.getItem("name");
}
function nameUpdate() {
  var name = document.getElementById("myName").value;
  setName(name);
  updateNameOnPage();
}

window.onload = () => {
  updateNameOnPage();
};
// testing
/*
console.log(names[2]);

console.log(
  `the number isiisiisiiiss: ${randomInt}, and the name: ${names[randomInt]}`
);
*/
