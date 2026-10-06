const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

let inputTextEl = document.querySelectorAll("input");
let canCopy = false;
let passwords = [];

for (let i = 0; i < inputTextEl.length; i++) {
    inputTextEl[i].addEventListener("click", function(){
        if (!canCopy) return;
        navigator.clipboard.writeText(inputTextEl[i].value);
    });
    inputTextEl[i].addEventListener("mouseenter", function() {
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

function generatePasswords() {
    passwords = [];
    for (let i = 0; i < inputTextEl.length; i++) {
        passwords.push(getPasswords());
        inputTextEl[i].value = passwords[i];
    }
    canCopy = true;
}

function getPasswords() {
    let password = "";
    for (let i = 0; i < Math.floor(Math.random() * 10) + 10; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }
    return password;
}