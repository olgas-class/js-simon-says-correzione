// Descrizione:
// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

// VISUALIZZAZIONE DEI NUMERI
const minNumber = 1;
const maxNumber = 99;
const numbersQuantity = 5;
const numbersShowTime = 3000;

const numbersContainer = document.getElementById("numbers");

// Generare l'array di numeri casuali
const numbersArray = generateRndNumbersArray(
  numbersQuantity,
  minNumber,
  maxNumber
);
console.log(numbersArray);

// Mostrare i numeri nella pagina
numbersContainer.innerHTML = numbersArray;

// Far partire il timer per nascondere i numeri
setTimeout(function() {
    // Alla scadenza del tempo nascondere i numeri visualizzati
    numbersContainer.innerHTML = "";
}, numbersShowTime);

// GESTIONE DEI NUMERI MEMORIZZATI DALL'UTENTE
setTimeout(function() {
    // Chiedere all'utente i numeri memorizzati e salvarli nell'array
    const userNumbers = getUserNumbers(numbersQuantity);
    console.log(userNumbers);

    // Verificare quali numeri sono stati indovinati, salvare i numeri indovinati un un'array
    const guessedNumbers = findCommonElements(numbersArray, userNumbers);
    console.log(guessedNumbers);

    // Stampare l'output con la quantità di numeri indovinati e i numeri stessi
    printResult(guessedNumbers);

}, numbersShowTime + 1000);



// FUNCTIONS
/**
 * Description: Funzione che genera un array di numeri random non dupplicati in un range dato
 * @param {number} arrayLength: la lunghezza dell'array finale
 * @param {number} min: il limite minimo
 * @param {number} max: il limite massimo
 * @returns {Array} array di numeri generato
 */
function generateRndNumbersArray(arrayLength, min, max) {
  const rndNumbers = [];
  while (rndNumbers.length < arrayLength) {
    const newNumber = getRndInteger(min, max);
    if (!rndNumbers.includes(newNumber)) {
        rndNumbers.push(newNumber);
    }
  }
  return rndNumbers;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Description: funzione che chiede i numeri dall'utente e li salva in un array
 * @param {number} numbersQty - numero di tentativi dati all'utente
 * @returns {Array} numeri inseriti dall'utente
 */
function getUserNumbers(numbersQty) {
    const userArray = [];
    for (let i = 0; i < numbersQty; i++) {
        const userNumber = parseInt(prompt("Dimmi un numero"));
        userArray.push(userNumber);
    }
    return userArray;
}

/**
 * Description: restituisce array con gli elementi in comune dei due array
 * @param {Array} firstArray - primo array da confrontare
 * @param {Array} secondArray - il secondo array da confrontare
 * @returns {Array} l'array di numeri in comune
 */
function findCommonElements(firstArray, secondArray) {
    const result = [];
    // Ciclare il primo array, per ogni elemento dell'array
    for (let i = 0; i < firstArray.length; i++) {
        // Se questo elemento è incluso nel secondo array
        const thisElement = firstArray[i];
        if (secondArray.includes(thisElement)) {
            // Lo pusho nell'array risultante
            result.push(thisElement);
        }
    }
    return result;
}

/**
 * Description: Stampa i numeri indovinati e la loro quantità
 * @param {any} resultArray - array di numeri da stampare
 */
function printResult(resultArray) {
    document.getElementById("result").innerHTML = `Hai indovinato ${resultArray.length} numeri: ${resultArray}`;
}