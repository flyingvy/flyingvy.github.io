let code = [], //Sequence the player needs to guess
    guess = [], //Sequence of player's guesses
    removeClass = [], //Color class of player's guess
    color = document.getElementsByClassName("color"),
    secretContainer = document.getElementsByClassName("secret-code"),
    guessContainer = document.getElementsByClassName("guess"),
    hintContainer = document.getElementsByClassName("hint"),
    overlay = document.getElementById("overlay"),

    rowIncrement = guessContainer.length - 1,
    hintIncrement = hintContainer.length - 1,

    secretCode = secretContainer[0].getElementsByClassName("peg"),
    currentRow = guessContainer[rowIncrement].getElementsByClassName("peg"),
    currentHint = hintContainer[hintIncrement].getElementsByClassName("hint-peg"),
    currentHintSocket = 0;
    currentSocket = 0;

let isMatch,

    overlayOff = true;

    pegs = {
    1: "green",
    2: "purple",
    3: "yellow",
    4: "blue",
    5: "red",
    6: "brown"
    };
    
function gameSetup() {
    generateSecretCode(1, 7);

    //Add event listener to every color button
    let l = color.length;
    for (let i = 0; i < l; i++){
        color[i].addEventListener("click", insertColor, false);
    }

    document.getElementById("newGame").onclick = newGame;
    document.getElementById("check").onclick = compare;
    document.getElementById("arrowBack").onclick = removeLast;

    guessContainer[rowIncrement].style.backgroundColor = "white";
}

function generateSecretCode (min, max) {
    for (let i = 0; i < 4; i++) {
        code[i] = Math.floor(Math.random() * (max - min)) + min;
    }
}

function insertColor() {
    if (rowIncrement >= 0  && overlayOff) {
        if (guess.length < 4) {
            let colorValue = parseInt(this.getAttribute("value"));
            let colorClass = pegs[colorValue];

            guess.push(colorValue);
            currentRow[currentSocket].classList.add(colorClass);
            currentSocket++;
            removeClass.push(colorClass);
        }
    }
}

function removeLast() {
    if (guess.length !== 0) {
        currentSocket--;
        currentRow[currentSocket].classList.remove(removeClass[removeClass.length-1]);
        removeClass.pop();
        guess.pop();
    }
}

function compare() {
    if (rowIncrement >= 0) {
        if (guess.length === 4) {

            isMatch = true;
            let codeCopy = code.slice(0);
            let l = code.length;

            for (let i = 0; i < l; i++) {
                if (guess[i] === code[i]) {
                    updateHint("gotIt");
                    codeCopy[i] = "matched already";
                    guess[i] = "exact match";
                } else {
                    isMatch = false;
                }
            }
            for (let j = 0; j < l; j++) {
                if (codeCopy.indexOf(guess[j]) !== -1) {
                    updateHint("almost");
                    codeCopy[codeCopy.indexOf(guess[j])] = "almost match";
                }
            }

            guess = [];
            currentSocket = 0;
            currentHintSocket = 0;
            rowIncrement--;
            hintIncrement--;
            if (rowIncrement !== -1) {
            currentHint = hintContainer[rowIncrement].getElementsByClassName("hint-peg");
            currentRow = guessContainer[rowIncrement].getElementsByClassName("peg");
            guessContainer[rowIncrement+1].style.backgroundColor = "";
            guessContainer[rowIncrement].style.backgroundColor = "white";
            }
            console.log(hintIncrement);

            gameEnd();
        }
    }
}

function updateHint(status) {
    currentHint[currentHintSocket].classList.add(status);
    currentHintSocket++;
}

function newGame() {
    
    if (rowIncrement !== guessContainer.length - 1){
        guessContainer[rowIncrement+1].style.backgroundColor = "";
    }
       
    guess = [];
    removeClass = [];
    rowIncrement = guessContainer.length - 1,
    hintIncrement = hintContainer.length - 1,
    currentHintSocket = 0;
    currentSocket = 0;
    isMatch = "";
    overlayOff = true;
    overlay.style.display = "none";
    guessContainer[rowIncrement].style.backgroundColor = "white";
    currentRow = guessContainer[rowIncrement].getElementsByClassName("peg");
    currentHint = hintContainer[hintIncrement].getElementsByClassName("hint-peg");
    
    for(let i = 0; i < 8; i++){
        let removeHint = hintContainer[i].getElementsByTagName("div");
        for(let j = 0; j < 4; j++){
            removeHint[j].className = "hint-peg";
        }
    }
    for(let i = 0; i < 8; i++){
        let removeGuess = guessContainer[i].getElementsByTagName("div");
        for(let j = 0; j < 4; j++){
            removeGuess[j].className = "peg";
        }
    }
    for (let i = 0; i < 1; i++) {
        let removeSecret = secretContainer[i].getElementsByTagName("div");
        for (let j = 0 ; j < 4; j++) {
            removeSecret[j].innerHTML="?";
            removeSecret[j].className = "peg";
        }
            
    }

    generateSecretCode(1,7);

    console.log("new secret code:" + code);
}

function gameEnd() {
    
    if (isMatch) {
        overlay.style.display = "block";
        overlay.style.backgroundColor = "lightgoldenrodyellow";
        overlay.innerHTML = "you &#128516 win";
        showSecretCode();
        overlayOff = false;
        if (rowIncrement !== -1) {
            guessContainer[rowIncrement].style.backgroundColor = "";
        }
        guessContainer[rowIncrement+1].style.backgroundColor = "white";
        

    } else if (rowIncrement ===-1) {
        overlay.style.display = "block";
        overlay.style.backgroundColor = "pink";
        overlay.innerHTML = "game &#128533 over";
        showSecretCode();
        overlayOff = false;
    }
    
}

function showSecretCode() {
    for (let i = 0; i < 4; i++) {
        let secretValue = pegs[code[i]];
        secretCode[i].classList.add(secretValue);
        secretCode[i].innerHTML="";
    }
}

gameSetup();

console.log(code);