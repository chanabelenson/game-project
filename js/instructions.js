const dynamicTextElement = document.getElementById("dynamicText");
let currentSentenceIndex = 0;
let currentCharIndex = 0;
function typeText() {
    const textToWrite = [
        "An ancient legend speaks of a hidden safe containing a great secret. Only those who solve the code can unlock the treasure within. You have four digits and infinite possibilities. Can you succeed?",
        "# % $ & ~ * % % % & *\n& $ #\n$$ %*",
        "In a game where you have a four-digit code, you have ten attempts to crack the code. Pay attention to work according to the feedback. The sign is good, but not in the right place.wel-scored!Pay attention to be accurate, everything depends only on you",
        "",
        "BEGINNERS-note,\n in the code each symbol is found only once\n!!ADVANCEING-Caution, confusingEach!!\n symbol can appear several times freely in the codeYou have exactly four minutes to try to crack the code!!"
    ];

    if (currentSentenceIndex >= textToWrite.length) {
        return;
    }

    const currentSentence = textToWrite[currentSentenceIndex];
    if (currentCharIndex < currentSentence.length) {
        dynamicTextElement.innerHTML += currentSentence[currentCharIndex];
        currentCharIndex++;
        setTimeout(typeText, 50);
    } else {
        currentCharIndex = 0;
        currentSentenceIndex++;
        if (currentSentenceIndex < textToWrite.length) {
            setTimeout(() => {
                dynamicTextElement.innerHTML = "";
                typeText();
            }, 1000);
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    typeText();
});


