const inputEl = document.getElementById('input-el')
const convertBtn = document.getElementById('convert-btn')
const displayedInput = document.querySelectorAll('.displayed-input')
const outputPounds = document.getElementById('output-pounds')
const outputfeet = document.getElementById('output-feet')
const outputmeters = document.getElementById('output-meters')
const outputgallons = document.getElementById('output-gallons')
const outputliters = document.getElementById('output-liters')
const outputkilograms = document.getElementById('output-kilograms')


document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        var inputValue = parseInt(inputEl.textContent)
        inputEl.textContent = ""
        if (isNaN(inputValue))
        {
            return alert('Not a number')
        }
        //Placing user input at base Unit
        for (let i = 0; i < displayedInput.length; i++){
            displayedInput[i].textContent = inputValue
        }

        outputfeet.textContent = (inputValue * 3.281).toFixed(3)
        outputmeters.textContent = (inputValue / 3.281).toFixed(3)
        outputgallons.textContent = (inputValue * 0.264).toFixed(3)
        outputliters.textContent = (inputValue / 0.264).toFixed(3)
        outputkilograms.textContent = (inputValue / 2.204).toFixed(3)
        outputPounds.textContent = (inputValue * 2.204).toFixed(3);
    }
});

convertBtn.addEventListener('click', function(){
    var inputValue = parseInt(inputEl.textContent)
    inputEl.textContent = ""
    if (isNaN(inputValue))
    {
        return alert('Not a number')
    }
    //Placing user input at base Unit
    for (let i = 0; i < displayedInput.length; i++){
        displayedInput[i].textContent = inputValue
    }

    outputfeet.textContent = (inputValue * 3.281).toFixed(3)
    outputmeters.textContent = (inputValue / 3.281).toFixed(3)
    outputgallons.textContent = (inputValue * 0.264).toFixed(3)
    outputliters.textContent = (inputValue / 0.264).toFixed(3)
    outputkilograms.textContent = (inputValue / 2.204).toFixed(3)
    outputPounds.textContent = (inputValue * 2.204).toFixed(3);
})
