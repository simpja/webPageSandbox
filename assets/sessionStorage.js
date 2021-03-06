// Here follows functions that let you use the sessionStorage to set and retrieve a parameter name to demo this functionality

async function updateNameOnPage() {
  var name = await sessionStorage.getItem("name");
  if (document.getElementById("span-name") === null) {
    return;
  } else if (name != null) {
    document.getElementById("span-name").innerHTML = name;
    return;
  } else {
    document.getElementById("span-name").innerHTML = "anonym";
  }
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
