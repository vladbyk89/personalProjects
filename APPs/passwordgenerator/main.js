const alphabetical = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"]

//assiging variables to password location
const optionOne = document.getElementById('option-1');
const optionTwo = document.getElementById('option-2');

//reseting password array not to include numeric and symbols
function reset(){
    return ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",];
}

let chars;
let charNum = 0;


function generatePasswords(){
    charNum = getInputValue();

    if (charNum == 0)
    {
        optionOne.textContent = 'XXXXXXXX'
        optionTwo.textContent = 'XXXXXXXX'
        return document.getElementById('message').textContent = 'Type in password length';
    }
    else if (charNum < 8 || charNum > 15)
    {
        optionOne.textContent = 'XXXXXXXX'
        optionTwo.textContent = 'XXXXXXXX'
        return document.getElementById('message').textContent = 'Password length should be 8 to 15';
    }
    else
    {
        document.getElementById('message').textContent = 'Click to Copy';
    }
    
    chars = reset();

    if (document.getElementById('use-num').checked)
    {
        chars.push(...numbers)
    }
    if (document.getElementById('use-symb').checked)
    {
        chars.push(...symbols)
    }

    let x = "";
    let y = "";

    for (var i = 0; i < charNum; i++){
        x += chars[Math.floor(Math.random()*chars.length)]
        y += chars[Math.floor(Math.random()*chars.length)]
    }

    optionOne.textContent = x;
    optionTwo.textContent = y;

    console.log('success')
    console.log(optionOne.innerText)
    console.log(optionTwo.textContent)
}

// grabinguser input number for password length (8 to 15)
function getInputValue() {
    return document.getElementById("input-id").value;
}

function copyToClipBoard1(){
    navigator.clipboard.writeText(optionOne.textContent).then(() => {
        alert('Content copied to clipboard');
        /* Resolved - text copied to clipboard successfully */
      },() => {
        alert('Failed to copy');
        /* Rejected - text failed to copy to the clipboard */
      });
}

function copyToClipBoard2(){
    navigator.clipboard.writeText(optionTwo.textContent).then(() => {
        alert('Content copied to clipboard');
        /* Resolved - text copied to clipboard successfully */
      },() => {
        alert('Failed to copy');
        /* Rejected - text failed to copy to the clipboard */
      });
}