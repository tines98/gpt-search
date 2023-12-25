function getText(conversation) {
  const child = conversation.childNodes.item(0);
  if (!child) return null;

  const grandChild = child.childNodes.item(0);
  if (!grandChild) return null;

  const greatGrandChild = grandChild.childNodes.item(0);
  if (!greatGrandChild) return null;

  return greatGrandChild.textContent.toLowerCase();
}

function DoFilter(match, conversations, searchQuery) {
  return Array.from(conversations).filter((conversation) => {
    const text = getText(conversation);
    if (text) {
      if (match) return text.includes(searchQuery);
      else return !text.includes(searchQuery);
    }
    return false;
  });
}

function resetSearch(conversations) {
  Array.from(conversations).forEach((conversation) => {
    conversation.style.display = "block";
  });
}

function hideNonMatching(nonMatching) {
  Array.from(nonMatching).forEach((conversation) => {
    conversation.style.display = "none";
  });
}

async function search() {
  const searchBar = document.getElementById("searchBar");
  const searchQuery = searchBar.value.toLowerCase();

  const conversations = document.getElementsByTagName("li");
  resetSearch(conversations);

  const nonMatching = DoFilter(false, conversations, searchQuery);

  hideNonMatching(nonMatching);
}

async function addSearchBar() {
  const container = document.getElementById("searchContainer");
  const searchBar = document.createElement("input");
  searchBar.setAttribute("type", "text");
  searchBar.setAttribute("id", "searchBar");
  searchBar.setAttribute("placeholder", "Search for a conversation");
  container.appendChild(searchBar);

  searchBar.addEventListener("keyup", search);
}

async function addSearchContainer() {
  const navBar = document.getElementsByTagName("nav")[0];
  const searchContainer = document.createElement("div");
  searchContainer.setAttribute("id", "searchContainer");
  navBar.appendChild(searchContainer);
}

async function addSearchBarAndButton() {
  await addSearchContainer();
  await addSearchBar();
}

console.log("script.js loaded");
addSearchBarAndButton();
