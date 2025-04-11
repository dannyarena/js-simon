//  1. Recupero tutti gli elementi HTML utili
const numbersList = document.getElementById('numbers-list');         // <ul> dove mostro i numeri
const countdownElement = document.getElementById('countdown');       // <div> del countdown numerico
const form = document.getElementById('answers-form');                // <form> con i 5 input numerici
const inputGroup = document.getElementById('input-group');           // contenitore dei 5 input
const message = document.getElementById('message');                  // <p> dove scrivo i messaggi di errore/successo

//  2. Genero 5 numeri casuali unici tra 1 e 50
const randomNumbers = generateRandomNumbers(5, 1, 50);
console.log("Numeri generati:", randomNumbers); // Per controllo in console

//  3. Mostro i numeri casuali dentro la lista <ul>
randomNumbers.forEach(num => {
  const li = document.createElement('li'); // Creo un <li>
  li.textContent = num;                    // Imposto il testo con il numero
  numbersList.appendChild(li);             // Aggiungo il <li> alla lista
});

//  4. Countdown di 30 secondi
let seconds = 30;
countdownElement.textContent = seconds; // Mostra subito il numero iniziale

const countdown = setInterval(() => {
  seconds--;                                // Scala di 1 ogni secondo
  countdownElement.textContent = seconds;   // Aggiorna il testo

  if (seconds === 0) {
    clearInterval(countdown);                                   // Ferma il countdown
    numbersList.classList.add('d-none');                        // Nasconde i numeri
    countdownElement.classList.add('d-none');                   // Nasconde il timer
    document.getElementById('instructions').textContent = "Inserisci i numeri che ricordi";
    form.classList.remove('d-none');                            // Mostra il form
  }
}, 1000); // ogni 1000ms = 1 secondo

//  5. Funzione che genera numeri casuali unici in un intervallo
function generateRandomNumbers(count, min, max) {
  const numbers = [];

  while (numbers.length < count) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min; // num casuale tra min e max inclusi
    if (!numbers.includes(num)) {
      numbers.push(num); // Aggiunge solo se il numero è unico
    }
  }

  return numbers;
}

// 6. Gestione dell'invio del form (convalidazione e confronto)
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Evita che la pagina si ricarichi

  const userNumbers = []; // Qui salveremo i numeri inseriti
  let isValid = true;     // Controlla se tutti gli input sono validi
  message.textContent = ''; // Svuota eventuali messaggi precedenti

  //  Rimuove eventuali classi d'errore (visive)
  [...inputGroup.children].forEach(input => input.classList.remove('is-invalid'));

  //  Controlla ogni input
  [...inputGroup.children].forEach(input => {
    const value = parseInt(input.value); // Prende il valore e lo converte in numero

    // Verifica: è un numero? è nel range? è unico?
    if (isNaN(value) || value < 1 || value > 50 || userNumbers.includes(value)) {
      input.classList.add('is-invalid'); // Mostra bordo rosso se c'è un errore
      isValid = false;
    } else {
      userNumbers.push(value); // Altrimenti lo salva nell'array
    }
  });

  //  Se c'è un errore, mostra messaggio e blocca
  if (!isValid) {
    message.textContent = 'Inserisci solo numeri validi e diversi tra loro (da 1 a 50)';
    message.classList.remove('text-success');
    message.classList.add('text-danger');
    return;
  }

  //  Confronta numeri inseriti con quelli generati
  const guessed = userNumbers.filter(num => randomNumbers.includes(num));

  //  Mostra il risultato
  message.classList.remove('text-danger');
  message.classList.add('text-success');
  message.textContent = `Hai indovinato ${guessed.length} numero/i: ${guessed.join(', ')}`;
});
