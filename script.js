"use strict";
const userInfo = document.querySelector("#user-info-container");
// login El's
const usernameInput = document.querySelector("#usernameInput");
const passwordInput = document.querySelector("#passwordInput");
const loginBtn = document.querySelector("#loginBtn");
const accountOutput = document.querySelector("#accountNumber");
const amountOutput = document.querySelector("#amount");
// main section El's
const name = document.querySelector("#name");
const sendMoneyBtn = document.querySelector("#sendMoneyBtn");
const requestMoneyBtn = document.querySelector("#requestMoneyBtn");
const depositMoneyBtn = document.querySelector("#depositMoneyBtn");
const accountList = document.querySelector("#accountList");
const requestList = document.querySelector("#requestList");
const cancelBtns = document.querySelectorAll("#cancel");
const sendBtns = document.querySelectorAll("#send");
const sendAmount = document.querySelector("#amountOfMoney");
const userReciever = document.querySelector("#userReciever");
const amountSend = document.querySelector("#amountOfMoney");
const logoutBtn = document.querySelector("#logoutBtn");
// Sections
const loginSection = document.querySelector("#loginSection");
const mainSection = document.querySelector("#mainSection");
const sendForm = document.querySelector("#sendMoneyForm");
const transList = document.querySelector("#transaction-list");

//
const depositForm = document.querySelector("#depositMoneyForm");
const depositAmount = document.querySelector("#depositAmount");
// extras
const showInfoBtn = document.querySelector("#info-btn");
showInfoBtn.addEventListener("click", function () {
  InfoBtnChanger(userInfo);
});
let username = "";
let user = "";
let password = "";
let ID = 0;

let accountNums = 8610000100;

class Account {
  constructor(name, username, password) {
    this.name = name;
    this.firstName = name.split(" ")[0];
    this.username = username;
    this.password = password;
    this.balance = 100;
    this.transactions = [];
    this.accountNum = accountNums += 1;
  }

  getTransactions() {
    return this.transactions;
  }

  appendTransaction(amount) {
    this.transactions.push(amount);
  }

  getFirstName() {
    return this.name.split(" ")[0];
  }

  depositMoney(amount) {
    if (amount > 0) {
      this.balance += amount;
    } else {
      throw "You can't deposit negative Money!";
    }
  }

  sendMoney(amount, userReciever) {
    if (amount > 0) {
      userReciever.depositMoney(amount);
      this.balance -= amount;
    } else {
      throw "You can't send negative Money!";
    }
  }

  formatBalance() {
    return "$" + Number.parseFloat(this.balance).toFixed(2);
  }
}

const tony = new Account("Tony Wiseman", "tonywiseman", "1234abc");
const jason = new Account("Jason Williams", "jwilliams97", "9999bbb");

let users = [tony, jason];

const initInformation = function (ID, users) {
  name.textContent = users[ID].firstName;
  accountOutput.textContent = users[ID].accountNum;
  amountOutput.textContent = users[ID].formatBalance();
  depositAmount.value = 0;
  for (let i = 0; i < users[ID].getTransactions().length; i++) {
    let string = "$" + users[ID].transactions[i];
    const content = document.createTextNode(string);
    // transList.appendChild(content);
  }
};

const InfoBtnChanger = function (userInfo) {
  const hiddenInfo = document.querySelector("#information");
  hiddenInfo.classList.toggle("hidden");
  if (showInfoBtn.textContent === "Hide information") {
    showInfoBtn.textContent = "Show information";
  } else {
    showInfoBtn.textContent = "Hide information";
  }
};

const checkLogin = function (users, username, password) {
  return users.some(
    (user) => user.username === username && user.password === password
  );
};

const getId = function (users, username) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      return i;
    }
  }
};

const toggleHidden = function (element) {
  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
};

sendMoneyBtn.addEventListener("click", () => toggleHidden(sendForm));
depositMoneyBtn.addEventListener("click", () => toggleHidden(depositForm));

for (let i = 0; i < cancelBtns.length; i++) {
  cancelBtns[i].addEventListener("click", () =>
    toggleHidden(cancelBtns[i].parentElement)
  );
}

for (let i = 0; i < sendBtns.length; i++) {
  sendBtns[i].addEventListener("click", function () {
    if (sendBtns[i].parentElement.id === "sendMoneyForm") {
      const userSend = userReciever.value;
      let amount = Number(amountSend.value);
      const recieverID = getId(users, userSend);
      users[ID].sendMoney(amount, users[recieverID]);
      users[recieverID].appendTransaction(amount);
      users[ID].appendTransaction(-1 * amount);
      initInformation(ID, users);
      toggleHidden(sendForm);
    } else {
      let amount = Number(depositAmount.value);
      users[ID].depositMoney(amount);
      initInformation(ID, users);
      toggleHidden(depositForm);
    }
  });
}

const loginAttempt = loginBtn.addEventListener("click", function () {
  username = usernameInput.value;
  password = passwordInput.value;
  let loginResult = checkLogin(users, username, password);
  if (loginResult) {
    loginSection.classList.add("hidden");
    mainSection.classList.remove("hidden");
    ID = getId(users, username);
    initInformation(ID, users);
  } else {
    throw "That was invalid information please try again.";
  }
});

const logout = logoutBtn.addEventListener("click", function () {
  mainSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
});
