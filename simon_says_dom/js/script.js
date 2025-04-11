const numbersList = document.getElementById('numbers-list');
const countdownElement = document.getElementById('countdown');
const form = document.getElementById('answers-form');
const inputGroup = document.getElementById('input-group');
const message = document.getElementById('message');


const randomNumbers = generateRandomNumbers(5, 1, 50);
console.log("Numeri generati:", randomNumbers);

randomNumbers.forEach(num => {
    const li = document.createElement('li');  // crea un <li>
    li.textContent = num;                     // ci scrive dentro il numero
    numbersList.appendChild(li);              // lo aggiunge alla lista
  });
  


  let seconds = 30;
countdownElement.textContent = seconds;

const countdown = setInterval(() => {
    seconds--;
    countdownElement.textContent = seconds;

    if (seconds === 0) {
        clearInterval(countdown);
        numbersList.classList.add('d-none');
        countdownElement.classList.add('d-none');
        document.getElementById('instructions').textContent = "Inserisci i numeri che ricordi";
        form.classList.remove('d-none');
      }
    }, 1000);


    // Funzione per generare numeri casuali unici
function generateRandomNumbers(count, min, max) {
    const numbers = [];
    while (numbers.length < count) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers;
  }
  

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita il refresh della pagina
  
    // Prendo tutti i valori inseriti
    const userNumbers = [];
    let isValid = true;
    message.textContent = ''; // Svuota messaggio
  
    // Reset input con classi d'errore (visivo)
    [...inputGroup.children].forEach(input => input.classList.remove('is-invalid'));
  
    [...inputGroup.children].forEach(input => {
      const value = parseInt(input.value);
      
      // Validazione base: è un numero? tra 1 e 50?
      if (isNaN(value) || value < 1 || value > 50 || userNumbers.includes(value)) {
        input.classList.add('is-invalid'); // Aggiunge bordo rosso
        isValid = false;
      } else {
        userNumbers.push(value);
      }
    });
  
    // Se non valido, mostra errore e blocca
    if (!isValid) {
      message.textContent = 'Inserisci solo numeri validi e diversi tra loro (da 1 a 50)';
      return;
    }
  
    // Confronto con i numeri originali
    const guessed = userNumbers.filter(num => randomNumbers.includes(num));
  
    // Mostro il risultato
    message.classList.remove('text-danger');
    message.classList.add('text-success');
    message.textContent = `Hai indovinato ${guessed.length} numero/i: ${guessed.join(', ')}`;
  });
  