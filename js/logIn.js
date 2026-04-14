let users = JSON.parse(localStorage.getItem("users")) || [];
let userName;
let userEmail;
let userPassword;
let signUpBTN = document.getElementById("signBtn").addEventListener('click', funSignUp);
let logInBTN = document.getElementById("logBtn").addEventListener('click', funLogIn);

var hideLog = document.getElementById("signUp");
let hideSign = document.getElementById("logIn");
hideSign.style.display = "none";

document.getElementById('sign').addEventListener("click", function () {
    hideLogIn();
});

document.getElementById('log').addEventListener("click", function () {
    hideSignUp();
});

localStorage.clear();

function hideSignUp() {
    hideLog.style.display = "none";
    hideSign.style.display = "block";
}
function hideLogIn() {
    hideLog.style.display = "block";
    hideSign.style.display = "none";
}



function funSignUp(e) {
    e.preventDefault();
    document.getElementById("emptyFillsInSign").innerHTML = "";
    document.getElementById('passwordError').innerText = "";
    document.getElementById('emailError').innerText = ""
    userName = document.getElementById('userName').value;
    userEmail = document.getElementById('signEmail').value;
    userPassword = document.getElementById('signPassword').value;
    if (!checkSignUp()) {
        return;
    }
    else {
        window.location.href = "../html/menu.html";
    }
    let user = {
        name: userName,
        email: userEmail,
        password: userPassword
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "../html/menu.html";
}

function checkSignUp() {
    let valid = true;

    for (let i = 0; i < users.length; i++) {
        if (!userName || !userEmail || !userPassword) {
            document.getElementById("emptyFillsInSign").innerHTML = "You didnt fill all details";
            return;
        }
        if (users) {
            if (users[i].email === userEmail) {
                document.getElementById('emailError').innerText = "An account with this email already exists!";
                return false;
            }
            if (users[i].password === userPassword) {
                document.getElementById('passwordError').innerText = "This password is taken, please try again!";
                return false;;
            }
        }
    }
    return true;
}

function funLogIn(e) {
    e.preventDefault();
    document.getElementById("emptyFillsInLog").innerHTML = "";
    document.getElementById("wrongDetails").innerText = "";
    userEmail = document.getElementById('logEmail').value;
    userPassword = document.getElementById('logPassword').value;
    if (!checkLogIn()) {
        return;
    }
    else {
        window.location.href = "../html/menu.html";
    }
}

function checkLogIn() {
    for (let i = 0; i < users.length; i++) {
        if (!userEmail || !userPassword) {
            document.getElementById("emptyFillsInLog").innerHTML = "You didnt fill all details";
            return false;
        }
        if (users) {
            if (users[i].email === userEmail && users[i].password === userPassword) {
                return true;
            }
            else {
                document.getElementById("wrongDetails").innerHTML = "The details are incorrect. Please try again";
                return false;
            }
        }
    }
}
