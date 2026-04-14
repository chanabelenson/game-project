let codeCards = [
    {
        model: "tilde",
        char: "~",
        number: 1,
    },
    {
        model: "percent",
        char: "%",
        number: 2,
    },
    {
        model: "and",
        char: "&",
        number: 3,
    },
    {
        model: "dollar",
        char: "$",
        number: 4,
    },
    {
        model: "ladder",
        char: "#",
        number: 5,
    },
    {
        model: "asterisk",
        char: "*",
        number: 6,
    }
];
let options = [1, 2, 3, 4, 5, 6];
let temp = [];
let code = [0, 0, 0, 0];
let flag = true;
let userArray1 = new Array(40);
let start = 0;
let end = 3;
let sum = 0;
const allCards = document.querySelectorAll('.card');
allCards.forEach(card => {
    card.draggable = true;
    card.addEventListener('dragstart', drag);
});

function coderLotteryBeginnerPlayer() {
    for (let i = 0; i < 4; i++) {
        flag = true;
        while (flag) {
            code[i] = Math.floor(Math.random() * 6) + 1;
            flag = temp.includes(code[i]);
            if (!(flag)) {
                temp.push(code[i]);
                flag = false;
            }
        }
    }
    // for (let j = 0; j < 4; j++) {//  אם ירצו לעקוב אחר נכונות הלוגיקה תוך כדי ההגשה!!!
    //     console.log(code[j]);
    // }
    return;
}

coderLotteryBeginnerPlayer();

function creatingDivs() {
    const container = document.querySelector("#container");
    for (let i = 0; i < 40; i++) {
        let creatingDiv = document.createElement("div");
        creatingDiv.id = i;
        creatingDiv.className = "square";
        creatingDiv.setAttribute("ondrop", "drop(event)");
        creatingDiv.setAttribute("ondragover", "allowDrop(event)");
        container.appendChild(creatingDiv);
        userArray1.push(creatingDiv);
    }
}
creatingDivs();
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("cardId", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();

    if (ev.target.id >= start && ev.target.id <= end
        || ev.target.parentElement.id >= start && ev.target.parentElement.id < end) {
        cardSound.play();
        var data = ev.dataTransfer.getData("cardId");
        const cardElement = document.getElementById(data);
        const cardData = codeCards.find(card => card.model === data);
        const targetDiv = ev.target.classList.contains("square") ? ev.target : ev.target.parentElement;
        const targetIndex = targetDiv.id;
        if (!userArray1[targetIndex]) { 
            sum++;
        }
        if (cardData) {
            while (targetDiv.firstChild) {
                targetDiv.removeChild(targetDiv.firstChild);
            }
            userArray1[targetIndex] = cardData.number;
            let copyOfSelected = cardElement.cloneNode(true);
            copyOfSelected.removeAttribute("id");
            targetDiv.appendChild(copyOfSelected);
        }
    }
}

document.getElementById('send').addEventListener('click', function () {
    if (sum != 4) {
        errorSound.play();
    } else {
        const { white, checked } = checkWhites();
        const black = checkBlacks(checked);

        if (white >= 4) {
            winner();
            return;
        }

        start += 4;
        end += 4;
        sum = 0;

        const para = document.createElement("p");
        para.innerText = `well: ${white}  good: ${black}`;
        document.getElementById('100').appendChild(para);

        if (start === 40) {
            gameOver();
        }
    }
});


function checkWhites() {
    let white = 0;
    const checked = [];
    for (let i = 0; i < 4; i++) {
        if (userArray1[i + start] === code[i]) {
            white++;
            checked.push(i);
        }
    }
    return { white, checked };
}

function checkBlacks(checked) {
    let black = 0;

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (!checked.includes(j) && userArray1[i + start] === code[j] && i !== j) {
                black++;
                checked.push(j);
                break;
            }
        }
    }
    return black;
}

function winner() {
    window.location.href = '../html/winner.html';
}


function gameOver() {
    window.location.href = '../html/gameOver.html';
}















