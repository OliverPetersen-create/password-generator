const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

let inputTextEl = document.querySelectorAll("input");
let canCopy = false;
let passwords = [];
let cancelAnimation = [];

for (let i = 0; i < inputTextEl.length; i++) {
    inputTextEl[i].addEventListener("click", function(){
        if (!canCopy) return;
        navigator.clipboard.writeText(passwords[i]);
        inputTextEl[i].value = "Kopieret";
    });
    inputTextEl[i].addEventListener("mouseenter", function() {
        if (!isCancelled(i)) {
            cancelAnimation.push(i);
        }
        if (canCopy) {
            inputTextEl[i].style.cursor = "pointer";
            inputTextEl[i].value = "Klik for at kopier";
            inputTextEl[i].style.background = "rgb(46, 76, 110)";
        } else inputTextEl[i].style.cursor = "default";
    });
    inputTextEl[i].addEventListener("mouseleave", function() {
        if (canCopy) {
            inputTextEl[i].value = passwords[i];
            inputTextEl[i].style.background = "rgb(31, 59, 90)";
        }
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function passwordAnimation(index) {
    let shown = "";
    let cancel = false;
    for (let i = 0; i < passwords[index].length; i++) {
        cancel = isCancelled(index);
        if (cancel) {
            cancelAnimation.splice(cancel - 1, 0);
            return;
        }
        for (let frames = 0; frames < 3; frames++) {
            cancel = isCancelled(index);
            if (cancel) {
                cancelAnimation.splice(cancel - 1, 0);
                return;
            }
            inputTextEl[index].value = shown + getPassword(passwords[index].length - i);
            await sleep(50);
        }
        shown += passwords[index].at(i);
    }
    inputTextEl[index].value = passwords[index];
}

function generatePasswords() {
    passwords = [];
    cancelAnimation = [];
    for (let i = 0; i < inputTextEl.length; i++) {
        passwords.push(getPassword());
        passwordAnimation(i);
    }
    canCopy = true;
}

function getPassword(length) {
    let password = "";
    for (let i = 0; i < (length == null ? Math.floor(Math.random() * 10) + 10 : length); i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }
    return password;
}

function isCancelled(animation) {
    for (let i = 0; i < cancelAnimation.length; i++) {
        if (cancelAnimation[i] === animation) return i + 1;
    }
    return false;
}