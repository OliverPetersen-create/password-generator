const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

let inputTextEl = document.querySelectorAll("input");
let canCopy = false;
let passwords = [];
let animations = {};

for (let i = 0; i < inputTextEl.length; i++) {
    inputTextEl[i].addEventListener("click", function(){
        if (!canCopy) return;
        navigator.clipboard.writeText(passwords[i]);
        inputTextEl[i].value = "Kopieret";
    });
    inputTextEl[i].addEventListener("mouseenter", function() {
        if (Object.hasOwn(animations, i)) {
            delete animations[i];
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

const sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const uid = function() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 12).padStart(12, 0);
}

const passwordAnimation = async function(index) {
    let shown = "";
    let animationUid = uid();
    animations[index] = animationUid;
    for (let i = 0; i < passwords[index].length; i++) {
        if (animations[index] !== animationUid) {
            return;
        }
        for (let frames = 0; frames < 3; frames++) {
            if (animations[index] !== animationUid) {
                return;
            }
            inputTextEl[index].value = shown + generatePassword(passwords[index].length - i);
            await sleep(25);
        }
        shown += passwords[index].at(i);
    }
    if (animations[index] === animationUid) {
        delete animations[index];
    }
    inputTextEl[index].value = passwords[index];
}

const setPasswords = function() {
    passwords = [];
    animations = {};
    for (let i = 0; i < inputTextEl.length; i++) {
        passwords.push(generatePassword());
        passwordAnimation(i);
    }
    canCopy = true;
}

const generatePassword = function(length) {
    let password = "";
    for (let i = 0; i < (length === undefined ? Math.floor(Math.random() * 10) + 10 : length); i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }
    return password;
}