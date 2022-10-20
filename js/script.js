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

//funzione che resetta alle impostazioni iniziali del gioco
function retry(){
    //resetta i timer delle funzione con delay
    clearTimeout(fun1);
    clearTimeout(fun2);
    //tolgo il div
    const result = document.querySelector('.result');
    game.removeChild(result);
    //nascondo mostro e resetto i vari campi
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
        //prendo l'input
        const numbersToBeGenerated = parseInt(userInput.value);

        //controllo sull'input
        if(isNaN(numbersToBeGenerated) || numbersToBeGenerated>80){
            showElement(message);
            message.classList.add('text-danger');
            message.innerHTML = 'Devi inserire un numero minore di 80!'
            return;
        }
        //creo e appendo il div su cui faccio apparire i numeri
        const result = addElementClassHTML('div', 'result my-d-none', game);

        //in caso non venga premuto retry per resettare
        message.classList.remove('text-white');
        message.classList.remove('text-danger');
        message.innerHTML = '';
        result.innerHTML = '';

        // genero la lista di numeri casuali diversi
        const minRandom = 0;
        const maxRandom = 100;
        while(numbersGenerated.length < numbersToBeGenerated){
            const randomNumber = getRandomNumber(minRandom, maxRandom);
            if(!numbersGenerated.includes(randomNumber)){
                numbersGenerated.push(randomNumber);
            }
        }
        //nascondo e mostro gli elementi
        hiddenElement(userInput);
        hiddenElement(btnPlay);
        hiddenElement(title);
        showElement(result);
        showElement(btnRetry);

        //debug
        console.log(numbersGenerated);
        //stampo i numeri in HTMl lentamente
        let i = 0;
        const time = 2000;
        myLoop(numbersGenerated,i,time,result);
    
        const timeLoop = (time * (numbersToBeGenerated + 1) + 500);

        this.value = 'Enter';
        userInput.value = '';
        //mostro gli elementi al timing giusto
        fun1 = setTimeout( showElement , timeLoop, userInput);
        fun2 = setTimeout( showElement , timeLoop, btnPlay);
    }else if(this.value == 'Enter'){
        message.innerHTML = ''
        const userNumber = parseInt(userInput.value);
        //controllo l'input
        if(isNaN(userNumber)){
            showElement(message);
            message.classList.add('text-danger');
            message.innerHTML = 'Devi inserire un numero!'
            return;
        }
        userInput.value = '';
        //salvo l'input
        userNumbers.push(userNumber);
        //quando l'utente inserisce la quantità di numeri mostro la verifica
        if(userNumbers.length == numbersGenerated.length){
            hiddenElement(userInput);
            btnPlay.value = 'Verify';
        }
    }else if(this.value == 'Verify'){
        hiddenElement(btnPlay);
        checkVictory();
    }

}

function checkVictory(){
    //prendo e mostro il messaggio di vittoria
    const result = document.querySelector('.result');
    result.classList.add('opacity-1');

    //mostro le due liste
    showElement(message);
    message.classList.remove('text-danger');
    message.classList.add('text-white');

    //controllo vittoria e stampo i messaggi
    let victory = true;
    for(let i = 0; i < userNumbers.length && victory; i++){
        if(!numbersGenerated.includes(userNumbers[i])){
            victory = false;
        }
    }
    message.innerHTML = `Lista inserita: ${userNumbers.toString()} <br> Lista generata: ${numbersGenerated.toString()} <br>` 
    if(victory){
        result.innerHTML = 'Hai Vinto!'
    }else{
        result.innerHTML = 'Hai Perso!'
    }
}