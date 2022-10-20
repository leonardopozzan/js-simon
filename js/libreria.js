//genera un numero random
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

//nasconde un elemento se non  già nascosto
function hiddenElement(elemento){
    if(!elemento.classList.contains('my-d-none')){
        elemento.classList.add('my-d-none');
    }
}

//mostro un elemento se non è già in mostra
function showElement(elemento){
    if(elemento.classList.contains('my-d-none')){
        elemento.classList.remove('my-d-none');
    }
}

//resetto l'inerno di un div
function cancelResult(div){
    div.innerHTML = '';
}

//funzione che a loop con un timer printa del contenuto in HTML e gli attribuisce opacità
function myLoop(array,i,time,div) {         
    setTimeout(function() {   
        div.innerHTML = `${array[i]}`;  
        i++;                  
        if (i < array.length) { 
            div.classList.add('opacity-1');
            setTimeout(function(){div.classList.remove('opacity-1')},time*0.7);
            myLoop(array,i,time,div);             
        }
        if (i == array.length){
            div.classList.add('opacity-1');
            setTimeout(function(){div.classList.remove('opacity-1')},time*0.7);
            setTimeout(cancelResult,time,div);
        }
    }, time)
}

//funzione che crea un tag html a scelta con una classe lo ritorna e lo appende ad un elemento
function addElementClassHTML(tagElement, className, fatherElement){
    const tag = document.createElement(tagElement);
    tag.className = className;
    fatherElement.append(tag);
    return tag;
}