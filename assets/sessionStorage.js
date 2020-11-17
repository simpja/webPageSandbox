// make a list of 10 names:
async function updateNameOnPage() {
  var name = await sessionStorage.getItem("name");
  if (name != null) {
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
