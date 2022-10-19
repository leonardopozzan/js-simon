function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function hiddenElement(elemento){
    if(!elemento.classList.contains('my-d-none')){
        elemento.classList.add('my-d-none');
    }
}
function showElement(elemento){
    if(elemento.classList.contains('my-d-none')){
        elemento.classList.remove('my-d-none');
    }
}

function cancelResult(){
    const result = document.querySelector('.result');
    result.innerHTML = '';
}

function myLoop(array,i,time,div) {         
    setTimeout(function() {   
        div.innerHTML = `${array[i]}`;  
        i++;                  
        if (i < array.length) {          
            myLoop(array,i,time,div);             
        }
        if (i == array.length){
            setTimeout(cancelResult,time);
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