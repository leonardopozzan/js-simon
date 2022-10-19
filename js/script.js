// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi i numeri scompaiono e l'utente deve inserire, uno alla volta, 
// i numeri che ha visto precedentemente, tramite una casella di input e un bottone
// Dopo che sono stat i inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

const btnPlay = document.querySelector('#play');
const game = document.querySelector('.game');
const btnRetry = document.querySelector('#retry');
const message = document.querySelector('.message');
const title = document.querySelector('#title');
const userInput = document.querySelector('#user-number');


btnPlay.addEventListener('click', handleClick);
btnRetry.addEventListener('click', retry);

let numbersGenerated = [];
let userNumbers = [];

function retry(){
    clearTimeout(fun1);
    clearTimeout(fun2);
    const result = document.querySelector('.result');
    result.remove();
    showElement(userInput);
    showElement(btnPlay);
    showElement(title);
    hiddenElement(btnRetry);
    hiddenElement(message);
    btnPlay.value = 'Play';
    numbersGenerated = [];
    userNumbers = [];
    userInput.value = '';
    message.innerHTML = '';
    message.classList.remove('text-white');
    message.classList.remove('text-danger');
    
}

function handleClick(){

    if(this.value == 'Play'){
        const result = addElementClassHTML('div', 'result my-d-none', game);
        message.classList.remove('text-white');
        message.classList.remove('text-danger');
        message.innerHTML = '';
        result.innerHTML = '';
        const numbersToBeGenerated = parseInt(userInput.value);
        if(isNaN(numbersToBeGenerated) || numbersToBeGenerated>80){
            showElement(message);
            message.classList.add('text-danger');
            message.innerHTML = 'Devi inserire un numero minore di 80!'
            return;
        }
        // let numbersToBeGenerated = 5;
        const minRandom = 0;
        const maxRandom = 100;
    
        while(numbersGenerated.length < numbersToBeGenerated){
            const randomNumber = getRandomNumber(minRandom, maxRandom);
            if(!numbersGenerated.includes(randomNumber)){
                numbersGenerated.push(randomNumber);
            }
        }
        hiddenElement(userInput);
        hiddenElement(btnPlay);
        hiddenElement(title);
        showElement(result);
        showElement(btnRetry);
        console.log(numbersGenerated);
        let i = 0;
        const time = 1500;
        // const time = 250;
        myLoop(numbersGenerated,i,time,result);
    
        const timeLoop = (time * (numbersToBeGenerated + 1) + 500);

        this.value = 'Enter';
        userInput.value = '';
        fun1 = setTimeout( showElement , timeLoop, userInput);
        fun2 = setTimeout( showElement , timeLoop, btnPlay);
    }else if(this.value == 'Enter'){
        message.innerHTML = ''
        const userNumber = parseInt(userInput.value);
        if(isNaN(userNumber)){
            showElement(message);
            message.classList.add('text-danger');
            message.innerHTML = 'Devi inserire un numero!'
            return;
        }
        userInput.value = '';
        userNumbers.push(userNumber);

        if(userNumbers.length == numbersGenerated.length){
            hiddenElement(userInput);
            btnPlay.value = 'Verify';
        }
    }else if(this.value == 'Verify'){
        btnPlay.classList.add('btn-dark');
        btnPlay.classList.remove('btn-success');
        hiddenElement(btnPlay);
        checkVictory();
    }

}

function checkVictory(){
    const result = document.querySelector('.result');
    showElement(message);
    message.classList.add('text-white')
    let victory = true;
    for(let i = 0; i < userNumbers.length && victory; i++){
        if(!numbersGenerated.includes(userNumbers[i])){
            victory = false;
        }
    }
    message.innerHTML = `Lista generata: ${numbersGenerated.toString()} <br> Lista inserita: ${userNumbers.toString()} <br>` 
    if(victory){
        result.innerHTML = 'Hai Vinto!'
    }else{
        result.innerHTML = 'Hai Perso!'
    }
}