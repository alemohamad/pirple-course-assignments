// global variables
let database = [];
let loggedInUser = null;
let loggedInUserEmail = null;
let selectedList = null;

// read sections
const introDiv = document.getElementById("intro");
const loggedDiv = document.getElementById("logged");
const signupDiv = document.getElementById("signup");
const loginDiv = document.getElementById("login");
const dashboardDiv = document.getElementById("dashboard");
const listDiv = document.getElementById("list");
const settingsDiv = document.getElementById("settings");

// check status
function checkStatus() {
  if (loggedInUser === null) {
    logoutUser();
  } else {
    loginUser(loggedInUser);
  }
}

function loginUser(user) {
  loggedInUser = user;
  loggedInUserEmail = user.user.email;
  hideAllSections();
  displayLoggedinButtons();
  displayDashboard();

  updateLocalStorage();
}

function logoutUser() {
  loggedInUser = null;
  loggedInUserEmail = null;
  selectedList = null;
  hideAllSections();
  displayIntro();

  updateLocalStorage();
}

function showSelectedList(title) {
  if (title === undefined) {
    title = "New list";
  }

  hideAllSections();
  displayLoggedinButtons();
  displayList(title);
  document.getElementById("list").getElementsByTagName("h3")[0].innerText = title;
  document.getElementById("list-title").value = title;
}

// user json
function checkIfUserExists(email, password) {
  for (const user of database) {
    if (user.user.email === email && user.user.password === hashCode(password)) {
      hideAllErrors();
      loginUser(user);
      return;
    }
  }

  showError("login-errors", "No user match the email and password. Try again.");
}

// errors management
function hideAllErrors() {
  document.getElementById("signup-errors").classList.add("hide");
  document.getElementById("login-errors").classList.add("hide");
  document.getElementById("list-title-errors").classList.add("hide");
  document.getElementById("new-item-errors").classList.add("hide");
  document.getElementById("settings-errors").classList.add("hide");
}

function showError(errorId, message) {
  const loginErrors = document.getElementById(errorId);
  loginErrors.innerText = message;
  loginErrors.classList.remove("hide");

  setTimeout(() => {
    hideAllErrors();
  }, 5000);
}

// Display & hide sections
function displayIntro() {
  introDiv.classList.remove("hide");
}

function displayLoggedinButtons() {
  loggedDiv.classList.remove("hide");

  displayLoggedInName();
}

function displayLoggedInName() {
  // display user name
  const firstName = document.getElementById("loggedin-user-firstname");
  const lastName = document.getElementById("loggedin-user-lastname");
  firstName.innerText = loggedInUser.user.first;
  lastName.innerText = loggedInUser.user.last;
}

function displaySignup() {
  document.getElementById("signup-form").reset();
  signupDiv.classList.remove("hide");
}

function displayLogin() {
  document.getElementById("login-form").reset();
  loginDiv.classList.remove("hide");
}

function displayDashboard() {
  dashboardDiv.classList.remove("hide");

  const todoListUL = document.getElementById("dashboard-todo-lists");
  todoListUL.innerHTML = "";

  for (const list of loggedInUser.lists) {
    const newListLI = document.createElement("li");
    const newTitleA = document.createElement("a");
    newTitleA.href = "#";
    newTitleA.innerText = list.title;
    newListLI.append(newTitleA);
    newListLI.innerHTML += " (" + list.items.length + ")";
    todoListUL.appendChild(newListLI);
  }
}

function displayList(title) {
  listDiv.classList.remove("hide");

  displayListItemsBy(title);
}

function displayListItemsBy(title) {
  for (const list of loggedInUser.lists) {
    if (list.title === title) {
      displayTodoItems(list.items);
      selectedList = list;
      return;
    }
  }

  displayTodoItems(null);
}

function displayTodoItems(items) {
  const todoItemsUL = document.getElementById("todo-list-items");
  todoItemsUL.innerHTML = "";

  if (items === null) {
    return;
  }

  for (const listItem of items) {
    const newItem = document.createElement("li");
    newItem.innerText = listItem.text;
    if (listItem.done) {
      newItem.classList.add("done");
    }
    todoItemsUL.append(newItem);
  }
}

function displaySettings() {
  settingsDiv.classList.remove("hide");

  // complete user info
  document.getElementById("settings-first").value = loggedInUser.user.first;
  document.getElementById("settings-last").value = loggedInUser.user.last;
  document.getElementById("settings-email").value = loggedInUser.user.email;
}

function hideAllSections() {
  introDiv.classList.add("hide");
  loggedDiv.classList.add("hide");
  signupDiv.classList.add("hide");
  loginDiv.classList.add("hide");
  dashboardDiv.classList.add("hide");
  listDiv.classList.add("hide");
  settingsDiv.classList.add("hide");
}

// hash password
function hashCode(word) {
  var hash = 0, i, chr;
  if (word.length === 0) return hash;
  for (i = 0; i < word.length; i++) {
    chr   = word.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
};

// Navigation logic
document.getElementById("signup-button").addEventListener("click", function(e) {
  e.preventDefault();
  hideAllSections();
  displayIntro();
  displaySignup();
});

document.getElementById("login-button").addEventListener("click", function(e) {
  e.preventDefault();
  hideAllSections();
  displayIntro();
  displayLogin();
});

document.getElementById("logout-button").addEventListener("click", function(e) {
  e.preventDefault();
  logoutUser();
});

document.getElementById("settings-button").addEventListener("click", function(e) {
  e.preventDefault();
  hideAllSections();
  displayLoggedinButtons();
  displaySettings();
});

document.getElementById("dashboard-button").addEventListener("click", function(e) {
  e.preventDefault();
  hideAllSections();
  displayLoggedinButtons();
  displayDashboard();
});

// display list detail
const dashboardListUL = dashboardDiv.querySelector("ul");
dashboardListUL.addEventListener("click", function(e) {
  e.preventDefault();

  if (e.target.nodeName !== "A") {
    return;
  }

  showSelectedList(e.target.innerText);
});

// mark/unmark item of list as done
const listItemsUL = listDiv.querySelector("ul");
listItemsUL.addEventListener("click", function(e) {
  e.target.classList.toggle("done");

  updateListInDB();
});

function updateListInDB() {
  let newSelectedList = [];

  for (const item of listItemsUL.querySelectorAll("li")) {
    let doneStatus = (item.className === "done") ? true : false;

    let updatedItem = {
      text: item.innerText,
      done: doneStatus,
    };

    newSelectedList.push(updatedItem);
  }

  selectedList.items = newSelectedList;
  updateLocalStorage();
}

// add new item to list
document.getElementById("new-item-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const newValue = document.getElementById("list-new-item").value;
  if (newValue === "") {
    return;
  }

  const listTitle = document.getElementById("title-list").innerText;
  if (listTitle === "New list") {
    showError("new-item-errors", "First you have to add a custom title to your list.");
    return;
  }

  // add new value to list
  selectedList.items.push({text: newValue, done: false});
  console.log(selectedList.items);

  const newLI = document.createElement("li");
  newLI.innerText = newValue;
  listItemsUL.appendChild(newLI);
  e.target.reset();

  updateLocalStorage();
});

function checkIfTitleAlreadyExists(title) {
  for (const list of loggedInUser.lists) {
    if (list.title === title) {
      return true;
    }
    
    return false;
  }
}

document.getElementById("change-title").addEventListener("submit", function(e) {
  e.preventDefault();
  const newTitle = document.getElementById("list-title").value;

  if (newTitle === "") {
    showError("list-title-errors", "The title can't be empty.");
    return;
  }

  if (newTitle === "New list") {
    showError("list-title-errors", "Use another name for the list.");
    return;
  }

  if (checkIfTitleAlreadyExists(newTitle) && newTitle !== selectedList.title) {
    showError("list-title-errors", "There's already a list with this name.");
    return;
  }

  document.getElementById("title-list").innerText = newTitle;

  // if it's a new list, add to the database
  if (selectedList === null) {
    const newList = {
      title: newTitle,
      items: [],
    };

    loggedInUser.lists.push(newList);
    selectedList = newList;
  } else {
    selectedList.title = newTitle;
  }

  updateLocalStorage();
});

document.getElementById("create-new-list").addEventListener("click", function(e) {
  e.preventDefault();
  showSelectedList();
});

document.getElementById("login-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const loginEmail = this.querySelector("#login-email").value;
  const loginPassword = this.querySelector("#login-password").value;
  checkIfUserExists(loginEmail, loginPassword);
});

document.getElementById("signup-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const signupFirst = this.querySelector("#signup-first").value;
  const signupLast = this.querySelector("#signup-last").value;
  const signupEmail = this.querySelector("#signup-email").value;
  const signupPassword = this.querySelector("#signup-password").value;
  const signupTerms = this.querySelector("#signup-terms").checked;

  let signupError = "There are some errors:";
  let errors = false;

  if (signupFirst === "") {
    signupError += " First name is empty.";
    errors = true;
  }

  if (signupLast === "") {
    signupError += " Last name is empty.";
    errors = true;
  }

  if (signupEmail === "") {
    signupError += " Email is empty.";
    errors = true;
  }

  if (signupPassword === "") {
    signupError += " Password is empty.";
    errors = true;
  }

  if (signupTerms === false) {
    signupError += " You must agree with our terms of use.";
    errors = true;
  }

  for (const user of database) {
    if (user.user.email === signupEmail) {
      signupError += " The email you are using already is on our database.";
      errors = true;
    }
  }

  if (errors) {
    showError("signup-errors", signupError);
    return;
  } else {
    hideAllErrors();
    const newUser = createUser(signupFirst, signupLast, signupEmail, signupPassword);
    addNewUser2DB(newUser);
    loginUser(newUser);
    this.reset();
  }
});

function createUser(first, last, email, password) {
  const newUser = {
    user: {
      first: first,
      last: last,
      email: email,
      password: hashCode(password),
    },
    lists: []
  };

  return newUser;
}

function addNewUser2DB(user) {
  database.push(user);
  updateLocalStorage();
}

document.getElementById("settings-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const first = document.getElementById("settings-first").value;
  const last = document.getElementById("settings-last").value;
  const email = document.getElementById("settings-email").value;
  let password = document.getElementById("settings-password").value;

  loggedInUser.user.first = first;
  loggedInUser.user.last = last;
  loggedInUser.user.email = email;
  loggedInUserEmail = email;

  if (password !== "") {
    loggedInUser.user.password = hashCode(password);
  }

  resetAccountForm();

  displayLoggedInName();

  updateLocalStorage();
});

function resetAccountForm() {
  document.getElementById("settings-password").value = "";
}

// save DB in Local Storage
function updateLocalStorage() {
  localStorage.setItem('database', JSON.stringify(database));
  localStorage.setItem('loggedInEmail', JSON.stringify(loggedInUserEmail));
}

function readLocalStorage() {
  if (localStorage.getItem('database')) {
    database = JSON.parse(localStorage.getItem('database'));
  }

  if (localStorage.getItem('loggedInEmail')) {
    loggedInUserEmail = JSON.parse(localStorage.getItem('loggedInEmail'));

    for (const user of database) {
      if (user.user.email === loggedInUserEmail) {
        loggedInUser = user;
      }
    }
  }

  // clear all localstorage
  // localStorage.clear();
}

function startProjectCode() {
  readLocalStorage();

  checkStatus();
}

/*
let database = [
  {
    user: {
      first: "Alejandro",
      last: "Mohamad",
      email: "user@server.com",
      password: 1216985755, // password
    },
    lists: [
      {
        title: "Chores list",
        items: [
          {
            text: "Take out the trash",
            done: false,
          },
          {
            text: "Do the homework",
            done: true,
          },
        ]
      },
      {
        title: "TV Shows to binge",
        items: [
          {
            text: "Lost",
            done: true,
          },
          {
            text: "Mad Men",
            done: false,
          },
          {
            text: "The Good Place",
            done: true,
          },
        ]
      },
    ]
  },
];
*/
